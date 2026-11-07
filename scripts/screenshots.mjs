// Renders the card with mock data and saves the README screenshots.
// Usage: npm run build && npm run screenshots
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { writeIfChanged } from "./pixels.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
// Fixed clock and time zone: "Ends at …" in the captures does not depend on when they are taken.
const NOW = Date.parse("2026-10-24T08:44:00Z");
const cardJs = readFileSync(`${root}dist/smart-appliance-card.js`, "utf8");

const THEMES = {
  light: {
    "--primary-background-color": "#e8eaed",
    "--secondary-background-color": "#ececec",
    "--card-background-color": "#ffffff",
    "--primary-text-color": "#212121",
    "--secondary-text-color": "#727272",
    "--divider-color": "rgba(0,0,0,.12)",
  },
  dark: {
    "--primary-background-color": "#111111",
    "--secondary-background-color": "#282828",
    "--card-background-color": "#1c1c1c",
    "--primary-text-color": "#e1e1e1",
    "--secondary-text-color": "#9b9b9b",
    "--divider-color": "rgba(225,225,225,.12)",
  },
};
const COMMON = {
  "--primary-color": "#03a9f4",
  "--info-color": "#039be5",
  "--success-color": "#43a047",
  "--warning-color": "#ffa600",
  "--error-color": "#db4437",
  "--text-primary-color": "#ffffff",
};

// Minimal stand-ins for Home Assistant's <ha-card> and <ha-icon> (Material Design Icons paths below).
const haElements = (icons) => `
const ICONS = ${JSON.stringify(icons)};
customElements.define("ha-card", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML =
      "<style>:host{display:block;background:var(--card-background-color);border-radius:12px;" +
      "border:1px solid var(--divider-color);color:var(--primary-text-color);overflow:hidden}</style><slot></slot>";
  }
});
customElements.define("ha-icon", class extends HTMLElement {
  static get observedAttributes() { return ["icon"]; }
  connectedCallback() { this._draw(); }
  attributeChangedCallback() { this._draw(); }
  _draw() {
    const path = ICONS[(this.getAttribute("icon") || "").replace("mdi:", "")] || "";
    this.style.display = "inline-flex";
    this.innerHTML = '<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor"><path d="' + path + '"/></svg>';
  }
});`;

const pageHtml = (theme, width) => `<!doctype html><html><head><meta charset="utf-8">
<style>
  :root { ${Object.entries({ ...THEMES[theme], ...COMMON }).map(([k, v]) => `${k}:${v};`).join("")} }
  body { margin: 0; padding: 16px; background: var(--primary-background-color); color: var(--primary-text-color);
         font-family: Roboto, "Segoe UI", Helvetica, Arial, sans-serif; width: ${width}px; }
</style></head><body><div id="root"></div></body></html>`;

// Opens one shot { file, type, theme, width, config, hass? } on a fresh page (re-running the scripts in the same
// realm would redeclare their globals) and mounts the card. extra: more stand-in elements, as script source.
async function openCard(browser, s, { icons = {}, hass = {}, extra = "" }) {
  const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1000, height: 2000 }, timezoneId: "UTC" });
  page.on("pageerror", (err) => console.error(`${s.file}: ${err.message}`));
  page.on("console", (msg) => msg.type() === "error" && console.error(`${s.file}: ${msg.text()}`));
  await page.clock.setFixedTime(NOW);
  await page.setContent(pageHtml(s.theme, s.width));
  await page.addScriptTag({ content: haElements(icons) + extra });
  await page.addScriptTag({ content: cardJs });
  await page.evaluate(
    ({ type, config, hass, dark }) => {
      const el = document.createElement(type);
      el.setConfig({ type: `custom:${type}`, ...config });
      el.hass = { states: {}, entities: {}, devices: {}, language: "en", locale: { language: "en" },
                  themes: { darkMode: dark }, callService: async () => {}, callWS: async () => ({}), ...hass };
      document.getElementById("root").appendChild(el);
    },
    { type: s.type, config: { ...(s.device ? { device_id: s.device } : {}), ...(s.config || {}) }, hass: { ...hass, ...(s.hass || {}) }, dark: s.theme === "dark" }
  );
  return page;
}

// Renders each shot { file, type, theme, width, config, hass?, after? } into screenshots/<file>.png.
export async function render(shots, { icons = {}, hass = {}, extra = "" } = {}) {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of shots) {
    const page = await openCard(browser, s, { icons, hass, extra });
    if (s.after) await s.after(page);
    await page.waitForTimeout(400);
    // The card plus the 16px page padding around it, on the theme background.
    const box = await page.locator("#root").boundingBox();
    const tmp = join(tmpdir(), `hc-${process.pid}-${s.file}.png`);
    await page.screenshot({
      path: tmp,
      clip: { x: 0, y: 0, width: s.width + 32, height: Math.ceil(box.height) + 32 },
      animations: "disabled",
    });
    const png = `screenshots/${s.file}.png`;
    console.log(writeIfChanged(tmp, `${root}${png}`) ? png : `${png} (unchanged)`);
    await page.close();
  }
  await browser.close();
}

// Records one shot as a looping GIF (screenshots/<file>.gif) — needs ffmpeg on PATH. Every animation is paused and
// stepped frame by frame, so the GIF is identical whatever the machine's speed. document.getAnimations() leaves out
// the card's own animations (they live in its shadow root), so every shadow root is walked as well: without that the
// animations ran freely and each run wrote different GIFs.
export async function animate(shot, { icons = {}, hass = {}, extra = "", fps = 20, seconds = 3 } = {}) {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await openCard(browser, shot, { icons, hass, extra });
  await page.waitForTimeout(300);
  const box = await page.locator("#root").boundingBox();
  const clip = { x: 0, y: 0, width: shot.width + 32, height: Math.ceil(box.height) + 32 };
  const dir = mkdtempSync(join(tmpdir(), "hc-frames-"));
  const frames = Math.round(fps * seconds);
  for (let i = 0; i < frames; i++) {
    await page.evaluate((t) => {
      const all = (root) => [
        ...root.getAnimations(),
        ...[...root.querySelectorAll("*")].flatMap((el) => (el.shadowRoot ? all(el.shadowRoot) : [])),
      ];
      for (const a of all(document)) {
        a.pause();
        a.currentTime = t;
      }
    }, (i * 1000) / fps);
    await page.screenshot({ path: join(dir, `f${String(i).padStart(3, "0")}.png`), clip });
  }
  await browser.close();
  const gif = `screenshots/${shot.file}.gif`;
  const tmp = join(dir, "out.gif");
  // Halve the retina capture and build a per-clip palette: the colours stay clean and the file stays small.
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-framerate", String(fps), "-i", join(dir, "f%03d.png"),
    "-vf", `scale=${clip.width}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer:bayer_scale=4`,
    "-loop", "0", tmp,
  ]);
  const written = writeIfChanged(tmp, `${root}${gif}`);
  rmSync(dir, { recursive: true });
  console.log(written ? gif : `${gif} (unchanged)`);
}

const icons = {
  "arrow-collapse": "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z",
  "arrow-expand": "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z",
  "clock-outline": "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",
  "tune-variant": "M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z",
  "checkbox-blank-circle-outline": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  "checkbox-marked-circle": "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  "cloud-off-outline": "M19.8 22.6L17.15 20H6.5Q4.2 20 2.6 18.4T1 14.5Q1 12.58 2.19 11.08 3.38 9.57 5.25 9.15 5.33 8.95 5.4 8.76 5.5 8.57 5.55 8.35L1.4 4.2L2.8 2.8L21.2 21.2M6.5 18H15.15L7.1 9.95Q7.05 10.23 7.03 10.5 7 10.73 7 11H6.5Q5.05 11 4.03 12.03 3 13.05 3 14.5 3 15.95 4.03 17 5.05 18 6.5 18M11.13 14M21.6 18.75L20.15 17.35Q20.58 17 20.79 16.54 21 16.08 21 15.5 21 14.45 20.27 13.73 19.55 13 18.5 13H17V11Q17 8.93 15.54 7.46 14.08 6 12 6 11.33 6 10.7 6.16 10.07 6.33 9.5 6.68L8.05 5.23Q8.93 4.63 9.91 4.31 10.9 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 16.5 22.63 17.31 22.25 18.15 21.6 18.75M14.83 12.03Z",
  "dishwasher": "M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33",
  "bell-ring-outline": "M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z",
  "door-closed": "M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z",
  "door-closed-lock": "M16 11H18V13H16V11M12 3H19A2 2 0 0 1 21 5V19H22V21H2V19H10V5A2 2 0 0 1 12 3M12 5V19H19V5M6.2 5H2.8V4.5A1.7 1.7 0 0 1 6.2 4.5M7 5V4.5A2.5 2.5 0 0 0 2 4.5V5A1 1 0 0 0 1 6V10A1 1 0 0 0 2 11H7A1 1 0 0 0 8 10V6A1 1 0 0 0 7 5",
  "door-open": "M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z",
  "information-outline": "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",
  "pause": "M14,19H18V5H14M6,19H10V5H6V19Z",
  "play": "M8,5.14V19.14L19,12.14L8,5.14Z",
  "power": "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",
  "refresh": "M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z",
  "shaker-outline": "M16.88 4L16.88 4L19.03 6.1L13.5 10.5L12.5 9.5L16.87 4L16.88 4M16.88 2C16.3 2 15.73 2.24 15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.9 2.19 17.39 2 16.88 2M9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5L10.5 14.6C10.71 14.8 10.96 14.89 11.22 14.89S11.73 14.8 11.93 14.6L12.63 13.9L9.1 10.36M6 15C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17C6.55 17 7 16.55 7 16C7 15.45 6.55 15 6 15M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18C9.55 18 10 17.55 10 17S9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20C4.55 20 5 19.55 5 19S4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21C7.55 21 8 20.55 8 20S7.55 19 7 19Z",
  "stop": "M18,18H6V6H18V18Z",
  "washing-machine": "M14.83,11.17C16.39,12.73 16.39,15.27 14.83,16.83C13.27,18.39 10.73,18.39 9.17,16.83L14.83,11.17M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z",
  "water-alert-outline": "M10 3.25C10 3.25 4 10 4 14C4 17.31 6.69 20 10 20S16 17.31 16 14C16 10 10 3.25 10 3.25M10 18C7.79 18 6 16.21 6 14C6 12.23 8 8.96 10 6.39C12 8.95 14 12.23 14 14C14 16.21 12.21 18 10 18M20 7V13H18V7H20M18 17H20V15H18V17Z",
  "tumble-dryer": "M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8M8.11,10.5H10C9.76,11.88 10,12.67 10.58,13.29C11.68,14.36 12.16,15.71 11.89,17.5H10C10.24,16.12 10,15.33 9.42,14.71C8.32,13.64 7.85,12.29 8.11,10.5M12.11,10.5H14C13.76,11.88 14,12.67 14.58,13.29C15.68,14.36 16.16,15.71 15.89,17.5H14C14.24,16.12 14,15.33 13.42,14.71C12.32,13.64 11.85,12.29 12.11,10.5Z",
  "stove": "M6,14H8L11,17H9L6,14M4,4H5V3A1,1 0 0,1 6,2H10A1,1 0 0,1 11,3V4H13V3A1,1 0 0,1 14,2H18A1,1 0 0,1 19,3V4H20A2,2 0 0,1 22,6V19A2,2 0 0,1 20,21V22H17V21H7V22H4V21A2,2 0 0,1 2,19V6A2,2 0 0,1 4,4M18,7A1,1 0 0,1 19,8A1,1 0 0,1 18,9A1,1 0 0,1 17,8A1,1 0 0,1 18,7M14,7A1,1 0 0,1 15,8A1,1 0 0,1 14,9A1,1 0 0,1 13,8A1,1 0 0,1 14,7M20,6H4V10H20V6M4,19H20V12H4V19M6,7A1,1 0 0,1 7,8A1,1 0 0,1 6,9A1,1 0 0,1 5,8A1,1 0 0,1 6,7M13,14H15L18,17H16L13,14Z",
  "microwave": "M4,5A2,2 0 0,0 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7A2,2 0 0,0 20,5H4M4,7H16V17H4V7M19,7A1,1 0 0,1 20,8A1,1 0 0,1 19,9A1,1 0 0,1 18,8A1,1 0 0,1 19,7M13,9V15H15V9H13M19,11A1,1 0 0,1 20,12A1,1 0 0,1 19,13A1,1 0 0,1 18,12A1,1 0 0,1 19,11Z",
  "induction": "M23 2C20.75 2 18.75 2.61 17.19 3.33C15.79 2.61 14 2 12 2S8.21 2.61 6.81 3.33C5.25 2.61 3.25 2 1 2V4C2.36 4 3.61 4.27 4.71 4.64C4.03 5.15 3.63 5.54 3.59 5.59C3.21 5.96 3 6.47 3 7V18C3 20.21 4.79 22 7 22S11 20.21 11 18V7C11 6.42 10.75 5.88 10.32 5.5C10.26 5.45 9.8 5.05 9 4.54C9.92 4.22 10.92 4 12 4S14.08 4.22 15 4.54C14.2 5.05 13.74 5.45 13.68 5.5C13.25 5.88 13 6.42 13 7V18C13 20.21 14.79 22 17 22S21 20.21 21 18V7C21 6.47 20.79 5.96 20.41 5.59C20.37 5.54 19.97 5.15 19.29 4.64C20.39 4.27 21.64 4 23 4V2M9 7V18C9 19.11 8.11 20 7 20S5 19.11 5 18V7C5 7 5.7 6.31 6.87 5.58C8.2 6.31 9 7 9 7M19 7V18C19 19.11 18.11 20 17 20S15 19.11 15 18V7C15 7 15.8 6.31 17.13 5.58C18.3 6.31 19 7 19 7Z",
  "coffee-maker": "M18 6V4H20V2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H20V20H15.97C17.2 19.09 18 17.64 18 16V11H8V16C8 17.64 8.81 19.09 10.03 20H6V4H8V6C8 6.55 8.45 7 9 7H17C17.55 7 18 6.55 18 6M13 8C13.55 8 14 8.45 14 9S13.55 10 13 10 12 9.55 12 9 12.45 8 13 8Z",
  "fan-chevron-up": "M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M19 17.83L15.83 21L14.41 19.59L19 15L23.59 19.59L22.17 21L19 17.83",
  "fridge": "M7,2H17A2,2 0 0,1 19,4V9H5V4A2,2 0 0,1 7,2M19,19A2,2 0 0,1 17,21V22H15V21H9V22H7V21A2,2 0 0,1 5,19V10H19V19M8,5V7H10V5H8M8,12V15H10V12H8Z",
  "snowflake-thermometer": "M14.46 9.41L11 7.38V5.12L12.71 3.41L11.29 2L10 3.29L8.71 2L7.29 3.41L9 5.12V7.38L6.5 8.82L4.5 7.69L3.92 5.36L2 5.88L2.47 7.65L.7 8.12L1.22 10.05L3.55 9.43L5.55 10.56V13.45L3.55 14.58L1.22 13.96L.7 15.89L2.47 16.36L2 18.12L3.93 18.64L4.55 16.31L6.55 15.18L9 16.62V18.88L7.29 20.59L8.71 22L10 20.71L11.29 22L12.7 20.59L11 18.88V16.62L14.46 14.61M7.5 10.56L10 9.11L12.5 10.56V13.44L10 14.89L7.5 13.44M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19S22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6",
  "bottle-wine": "M10,22A1,1 0 0,1 9,21V11C9,9 10,7.25 11,7V2.5A0.5,0.5 0 0,1 11.5,2H12.5A0.5,0.5 0 0,1 13,2.5V7C14,7.25 15,9 15,11V21A1,1 0 0,1 14,22H10Z",
  "hanger": "M12 4A3.5 3.5 0 0 0 8.5 7.5H10.5A1.5 1.5 0 0 1 12 6A1.5 1.5 0 0 1 13.5 7.5A1.5 1.5 0 0 1 12 9C11.45 9 11 9.45 11 10V11.75L2.4 18.2A1 1 0 0 0 3 20H21A1 1 0 0 0 21.6 18.2L13 11.75V10.85A3.5 3.5 0 0 0 15.5 7.5A3.5 3.5 0 0 0 12 4M12 13.5L18 18H6Z",
  "thermometer": "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",
  "snowflake": "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",
  "fan": "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",
  "lightbulb-on-outline": "M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M11,18H13V15.87C14.73,15.43 16,13.86 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13.86 9.27,15.43 11,15.87V18Z",
  "coffee-off-outline": "M2 3.27L4 5.27V13C4 15.21 5.79 17 8 17H14C14.5 17 15 16.89 15.44 16.71L17.73 19H2V21H19.73L20.72 22L22 20.72L3.27 2L2 3.27M8 15C6.9 15 6 14.1 6 13V7.27L13.73 15H8M20 3H6.81L8.81 5H16V12.19L17.85 14.04C17.94 13.7 18 13.36 18 13V10H20C21.1 10 22 9.1 22 8V5C22 3.9 21.1 3 20 3M20 8H18V5H20V8Z",
  "cup-water": "M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z",
  "tray-full": "M18 5H6V7H18M6 9H18V11H6M2 12H4V17H20V12H22V17A2 2 0 0 1 20 19H4A2 2 0 0 1 2 17M18 13H6V15H18Z"
};

// Mock devices: entity registry (device_id, integration, translation_key) and states. Home Connect unless listed here.
const entities = {};
const states = {};
const PLATFORMS = { dryer: "miele", wd: "lg_thinq", mw: "lg_thinq", hob: "lg_thinq", fz: "miele", wine: "miele", styler: "lg_thinq",
  stwm: "smartthings", wpdry: "whirlpool", kaov: "whirlpool" };
const add = (device, id, key, state, attributes = {}) => {
  entities[id] = { entity_id: id, device_id: device, translation_key: key, platform: PLATFORMS[device] || "home_connect" };
  states[id] = { entity_id: id, state, attributes: { friendly_name: id, ...attributes } };
};
const inMinutes = (m) => new Date(NOW + m * 60000).toISOString();

// Dishwasher, running Eco 50 °C.
add("dw", "sensor.dishwasher_operation_state", "operation_state", "run", { options: ["inactive", "ready", "run", "pause", "finished", "error"] });
add("dw", "sensor.dishwasher_door", "door", "closed", { options: ["open", "closed", "locked"] });
add("dw", "sensor.dishwasher_program_progress", "program_progress", "62", { unit_of_measurement: "%" });
add("dw", "sensor.dishwasher_program_finish_time", "program_finish_time", inMinutes(48), { device_class: "timestamp" });
add("dw", "select.dishwasher_active_program", "active_program", "dishcare_dishwasher_program_eco_50",
  { options: ["dishcare_dishwasher_program_eco_50", "dishcare_dishwasher_program_auto_2", "dishcare_dishwasher_program_quick_45"] });
add("dw", "select.dishwasher_selected_program", "selected_program", "dishcare_dishwasher_program_eco_50",
  { options: ["dishcare_dishwasher_program_eco_50", "dishcare_dishwasher_program_auto_2", "dishcare_dishwasher_program_quick_45"] });
add("dw", "switch.dishwasher_power", "power", "on");
add("dw", "binary_sensor.dishwasher_connectivity", "connectivity", "on", { device_class: "connectivity" });
add("dw", "sensor.dishwasher_rinse_aid_nearly_empty", "rinse_aid_nearly_empty", "present");
add("dw", "button.dishwasher_stop_program", "stop_program", "unknown");
add("dw", "switch.dishwasher_intensiv_zone", "intensiv_zone", "on", { friendly_name: "Dishwasher Intensive zone" });
add("dw", "switch.dishwasher_hygiene_plus", "hygiene_plus", "off", { friendly_name: "Dishwasher Hygiene plus" });
add("dw", "switch.dishwasher_extra_dry", "extra_dry", "on", { friendly_name: "Dishwasher Extra dry" });

// Washing machine, ready with a program selected.
add("wm", "sensor.washer_operation_state", "operation_state", "ready", { options: ["inactive", "ready", "run", "pause", "finished", "error"] });
add("wm", "sensor.washer_door", "door", "closed", { options: ["open", "closed", "locked"] });
add("wm", "select.washer_selected_program", "selected_program", "laundry_care_washer_program_cotton",
  { options: ["laundry_care_washer_program_cotton", "laundry_care_washer_program_mix", "laundry_care_washer_program_wool"] });
add("wm", "select.washer_active_program", "active_program", "unavailable",
  { options: ["laundry_care_washer_program_cotton", "laundry_care_washer_program_mix", "laundry_care_washer_program_wool"] });
add("wm", "select.washer_temperature", "temperature", "laundry_care_washer_enum_type_temperature_g_c_40",
  { friendly_name: "Washer Temperature", options: ["laundry_care_washer_enum_type_temperature_g_c_30", "laundry_care_washer_enum_type_temperature_g_c_40", "laundry_care_washer_enum_type_temperature_g_c_60"] });
add("wm", "select.washer_spin_speed", "spin_speed", "laundry_care_washer_enum_type_spin_speed_r_p_m_1200",
  { friendly_name: "Washer Spin speed", options: ["laundry_care_washer_enum_type_spin_speed_r_p_m_800", "laundry_care_washer_enum_type_spin_speed_r_p_m_1200", "laundry_care_washer_enum_type_spin_speed_r_p_m_1400"] });
add("wm", "switch.washer_power", "power", "on");
add("wm", "switch.washer_prewash", "prewash", "off", { friendly_name: "Washer Prewash" });
add("wm", "switch.washer_speed_perfect", "speed_perfect", "on", { friendly_name: "Washer SpeedPerfect" });
add("wm", "binary_sensor.washer_connectivity", "connectivity", "on", { device_class: "connectivity" });
add("wm", "button.washer_start_program", "start_program", "unknown");
add("wm", "button.washer_pause_program", "pause_program", "unknown");
add("wm", "button.washer_resume_program", "resume_program", "unknown");
add("wm", "button.washer_stop_program", "stop_program", "unknown");
add("wm", "sensor.washer_program_progress", "program_progress", "unavailable", { unit_of_measurement: "%" });
add("wm", "sensor.washer_program_finish_time", "program_finish_time", "unavailable", { device_class: "timestamp" });

// The other appliances, each shown at work, across the integrations: their badges show the brand.
const hot = { options: ["inactive", "ready", "run", "pause", "finished"] };
// Tumble dryer (Miele): drying, progress from the elapsed and remaining times.
add("dryer", "sensor.dryer", "status", "in_use", { options: ["off", "on", "programmed", "in_use", "pause", "program_ended"] });
add("dryer", "sensor.dryer_program", "program_id", "cottons", { friendly_name: "Dryer Program" });
add("dryer", "sensor.dryer_program_phase", "program_phase", "drying", { friendly_name: "Dryer Program phase" });
add("dryer", "sensor.dryer_remaining_time", "remaining_time", "38", { unit_of_measurement: "min" });
add("dryer", "sensor.dryer_elapsed_time", "elapsed_time", "62", { unit_of_measurement: "min" });
add("dryer", "binary_sensor.dryer_door", null, "off", { device_class: "door" });
add("dryer", "button.dryer_pause", "pause", "unknown");
add("dryer", "button.dryer_stop", "stop", "unknown");
add("dryer", "switch.dryer_power", "power", "on");
// Washer-dryer (LG WashCombo): drying, finish time and total duration from ThinQ.
add("wd", "sensor.washcombo_current_status", "current_state", "drying", { options: ["power_off", "initial", "running", "drying", "end"] });
add("wd", "sensor.washcombo_remaining_time", "remain", inMinutes(25), { device_class: "timestamp" });
add("wd", "sensor.washcombo_total_time", "total", "120", { unit_of_measurement: "min" });
add("wd", "select.washcombo_operation", "operation_mode", "start", { options: ["start", "stop", "power_off"] });
add("wd", "switch.washcombo_power", "operation_power", "on");
// Oven (Neff, Home Connect): hot air at 180 °C.
add("oven", "sensor.oven_operation_state", "operation_state", "run", hot);
add("oven", "sensor.oven_door", "door", "closed", { options: ["open", "closed", "locked"] });
add("oven", "sensor.oven_program_progress", "program_progress", "55", { unit_of_measurement: "%" });
add("oven", "sensor.oven_program_finish_time", "program_finish_time", inMinutes(41), { device_class: "timestamp" });
add("oven", "select.oven_active_program", "active_program", "cooking_oven_program_heating_mode_hot_air",
  { options: ["cooking_oven_program_heating_mode_hot_air", "cooking_oven_program_heating_mode_top_bottom_heating"] });
add("oven", "select.oven_selected_program", "selected_program", "cooking_oven_program_heating_mode_hot_air",
  { options: ["cooking_oven_program_heating_mode_hot_air", "cooking_oven_program_heating_mode_top_bottom_heating"] });
add("oven", "sensor.oven_current_oven_cavity_temperature", "oven_current_cavity_temperature", "176",
  { device_class: "temperature", unit_of_measurement: "°C", friendly_name: "Oven Cavity temperature" });
add("oven", "button.oven_stop_program", "stop_program", "unknown");
add("oven", "switch.oven_power", "power", "on");
add("oven", "binary_sensor.oven_connectivity", "connectivity", "on", { device_class: "connectivity" });
// Microwave (LG ThinQ): cooking.
add("mw", "sensor.microwave_current_status", "current_state", "cooking_in_progress", { options: ["power_off", "initial", "cooking_in_progress", "end"] });
add("mw", "sensor.microwave_remaining_time", "remain", inMinutes(3), { device_class: "timestamp" });
add("mw", "sensor.microwave_total_time", "total", "5", { unit_of_measurement: "min" });
// Hob (LG ThinQ): two zones on.
add("hob", "sensor.hob_current_status", "current_state", "cook", { options: ["power_off", "initial", "cook"] });
add("hob", "binary_sensor.hob_remote_start", "remote_control_enabled", "off");
// Coffee machine (Siemens, Home Connect): a cappuccino on its way.
add("cm", "sensor.coffee_machine_operation_state", "operation_state", "run", hot);
add("cm", "sensor.coffee_machine_program_progress", "program_progress", "60", { unit_of_measurement: "%" });
add("cm", "select.coffee_machine_active_program", "active_program", "consumer_products_coffee_maker_program_beverage_cappuccino",
  { options: ["consumer_products_coffee_maker_program_beverage_cappuccino", "consumer_products_coffee_maker_program_beverage_espresso"] });
add("cm", "select.coffee_machine_selected_program", "selected_program", "consumer_products_coffee_maker_program_beverage_cappuccino",
  { options: ["consumer_products_coffee_maker_program_beverage_cappuccino", "consumer_products_coffee_maker_program_beverage_espresso"] });
add("cm", "sensor.coffee_machine_water_tank_empty", "water_tank_empty", "off");
add("cm", "button.coffee_machine_stop_program", "stop_program", "unknown");
add("cm", "switch.coffee_machine_power", "power", "on");
add("cm", "binary_sensor.coffee_machine_connectivity", "connectivity", "on", { device_class: "connectivity" });
// Cooker hood (Gaggenau, Home Connect): fan stage 2, lights on.
add("hood", "select.hood_selected_program", "selected_program", "cooking_common_program_hood_venting", { options: ["cooking_common_program_hood_venting"] });
add("hood", "select.hood_venting_level", "venting_level", "cooking_hood_enum_type_stage_fan_stage_02",
  { friendly_name: "Hood Fan stage", options: ["cooking_hood_enum_type_stage_fan_off", "cooking_hood_enum_type_stage_fan_stage_01", "cooking_hood_enum_type_stage_fan_stage_02", "cooking_hood_enum_type_stage_fan_stage_03"] });
add("hood", "light.hood_functional_light", "cooking_lighting", "on");
add("hood", "switch.hood_power", "power", "on");
add("hood", "binary_sensor.hood_connectivity", "connectivity", "on", { device_class: "connectivity" });
// Fridge-freezer (Bosch, Home Connect): setpoints, super cooling on.
add("fr", "number.fridge_refrigerator_temperature", "refrigerator_setpoint_temperature", "4",
  { unit_of_measurement: "°C", friendly_name: "Fridge Refrigerator temperature" });
add("fr", "number.fridge_freezer_temperature", "freezer_setpoint_temperature", "-18", { unit_of_measurement: "°C", friendly_name: "Fridge Freezer temperature" });
add("fr", "switch.fridge_super_cooling", "refrigerator_super_mode", "on", { friendly_name: "Fridge Super cooling" });
add("fr", "switch.fridge_eco_mode", "eco_mode", "off", { friendly_name: "Fridge Eco mode" });
add("fr", "binary_sensor.fridge_door", "refrigerator_door", "off", { device_class: "door" });
add("fr", "binary_sensor.fridge_connectivity", "connectivity", "on", { device_class: "connectivity" });
// Freezer (Miele): super freezing, its climate zone.
add("fz", "sensor.freezer", "status", "superfreezing", { options: ["off", "on", "superfreezing"] });
add("fz", "climate.freezer", "freezer", "cool", { current_temperature: -21, friendly_name: "Freezer" });
add("fz", "switch.freezer_superfreezing", "superfreezing", "on", { friendly_name: "Freezer Superfreezing" });
add("fz", "binary_sensor.freezer_door", null, "off", { device_class: "door" });
// Wine cabinet (Miele): two zones, its light on.
add("wine", "sensor.wine_cabinet", "status", "on", { options: ["off", "on"] });
add("wine", "climate.wine_cabinet_zone_1", "zone_1", "cool", { current_temperature: 12, friendly_name: "Wine cabinet Zone 1" });
add("wine", "climate.wine_cabinet_zone_2", "zone_2", "cool", { current_temperature: 16, friendly_name: "Wine cabinet Zone 2" });
add("wine", "light.wine_cabinet_light", "light", "on");
// LG Styler: refreshing.
add("styler", "sensor.styler_current_status", "current_state", "refreshing", { options: ["power_off", "initial", "refreshing", "end"] });
add("styler", "sensor.styler_remaining_time", "remain", inMinutes(18), { device_class: "timestamp" });
add("styler", "sensor.styler_total_time", "total", "40", { unit_of_measurement: "min" });
add("styler", "switch.styler_power", "operation_power", "on");
// Washing machine (Samsung, SmartThings): rinsing, start / pause / stop through the operating state select.
add("stwm", "sensor.samsung_washer_machine_state", "washer_machine_state", "run", { options: ["pause", "run", "stop"] });
add("stwm", "sensor.samsung_washer_job_state", "washer_job_state", "rinse", { options: ["none", "wash", "rinse", "spin", "finish"] });
add("stwm", "sensor.samsung_washer_completion_time", "completion_time", inMinutes(34), { device_class: "timestamp" });
add("stwm", "sensor.samsung_washer_progress", "washer_progress", "68", { unit_of_measurement: "%" });
add("stwm", "select.samsung_washer", "operating_state", "run", { options: ["run", "pause", "stop"] });
add("stwm", "binary_sensor.samsung_washer_remote_control", "remote_control", "on");
add("stwm", "binary_sensor.samsung_washer_door", "door", "off", { device_class: "opening" });
// Tumble dryer (Maytag, Whirlpool): main cycle running, its end time.
add("wpdry", "sensor.maytag_dryer_state", "dryer_state", "running_maincycle", { options: ["standby", "running_maincycle", "complete"] });
add("wpdry", "sensor.maytag_dryer_end_time", "end_time", inMinutes(27), { device_class: "timestamp" });
add("wpdry", "binary_sensor.maytag_dryer_door", null, "off", { device_class: "door" });
// Oven (KitchenAid, Whirlpool): convection bake, its cavity temperature, Stop.
add("kaov", "sensor.kitchenaid_oven_state", "oven_state", "cooking", { options: ["standby", "preheating", "cooking"] });
add("kaov", "sensor.kitchenaid_oven_temperature", "oven_current_temperature", "190",
  { device_class: "temperature", unit_of_measurement: "°C", friendly_name: "KitchenAid oven Temperature" });
add("kaov", "select.kitchenaid_oven_cook_mode", "oven_cook_mode", "convection_bake",
  { friendly_name: "KitchenAid oven Cook mode", options: ["standby", "bake", "convection_bake", "broil"] });
add("kaov", "button.kitchenaid_oven_stop", "oven_stop", "unknown");
add("kaov", "light.kitchenaid_oven_light", "oven_light", "on");

const devices = {
  dw: { id: "dw", name: "Dishwasher", manufacturer: "BOSCH" },
  wm: { id: "wm", name: "Washer", manufacturer: "SIEMENS" },
  dryer: { id: "dryer", name: "Tumble dryer", manufacturer: "Miele", model: "Tumble dryer" },
  wd: { id: "wd", name: "WashCombo", manufacturer: "LGE", model: "WD-X1 (DEVICE_WASHCOMBO_MAIN)" },
  oven: { id: "oven", name: "Oven", manufacturer: "NEFF" },
  mw: { id: "mw", name: "Microwave", manufacturer: "LGE", model: "MW-1 (DEVICE_MICROWAVE_OVEN)" },
  hob: { id: "hob", name: "Hob", manufacturer: "LGE", model: "CT-1 (DEVICE_COOKTOP)" },
  cm: { id: "cm", name: "Coffee machine", manufacturer: "SIEMENS" },
  hood: { id: "hood", name: "Cooker hood", manufacturer: "GAGGENAU" },
  fr: { id: "fr", name: "Fridge", manufacturer: "BOSCH" },
  fz: { id: "fz", name: "Freezer", manufacturer: "Miele", model: "Freezer" },
  wine: { id: "wine", name: "Wine cabinet", manufacturer: "Miele", model: "Wine cabinet" },
  styler: { id: "styler", name: "Styler", manufacturer: "LGE", model: "S5 (DEVICE_STYLER)" },
  stwm: { id: "stwm", name: "Washing machine", manufacturer: "Samsung Electronics", model: "WW90T" },
  wpdry: { id: "wpdry", name: "Dryer", manufacturer: "Whirlpool" },
  kaov: { id: "kaov", name: "Wall oven", manufacturer: "Whirlpool" },
};
// The new appliances: one capture per theme and one GIF of their animation.
const NEW = [["dryer", "dryer"], ["washer-dryer", "wd"], ["oven", "oven"], ["microwave", "mw"], ["hob", "hob"], ["coffee-machine", "cm"],
  ["hood", "hood"], ["fridge", "fr"], ["freezer", "fz"], ["wine-cabinet", "wine"], ["styler", "styler"],
  // Whirlpool doesn't say the brand: the `brand` option gives it.
  ["samsung-washer", "stwm"], ["maytag-dryer", "wpdry", { brand: "maytag" }], ["kitchenaid-oven", "kaov", { brand: "kitchenaid" }]];
// One mini card per brand, light and dark.
const MINIS = [["bosch", "fr"], ["siemens", "cm"], ["neff", "oven"], ["gaggenau", "hood"], ["miele", "dryer"], ["samsung", "stwm"],
  ["lg", "styler"], ["whirlpool", "kaov", { brand: "kitchenaid" }]];
const hass = { states, entities, devices };

// Same dishwasher, switched on and waiting for a program: the options are shown.
const ready = structuredClone(states);
ready["sensor.dishwasher_operation_state"].state = "ready";
ready["select.dishwasher_active_program"].state = "unavailable";
ready["sensor.dishwasher_program_progress"].state = "unavailable";

// Washing machine mid-cycle: the drum turns, water waves behind the porthole and suds rise.
const washerRunning = structuredClone(states);
washerRunning["sensor.washer_operation_state"].state = "run";
washerRunning["sensor.washer_program_progress"].state = "45";
washerRunning["sensor.washer_program_finish_time"].state = inMinutes(72);
washerRunning["select.washer_active_program"].state = "laundry_care_washer_program_cotton";

// Washer paused mid-cycle: the badge breathes and Resume replaces Pause.
const washerPaused = structuredClone(washerRunning);
washerPaused["sensor.washer_operation_state"].state = "pause";

// Washer waiting on a delayed start: the badge's clock hands turn, no progress yet.
const washerDelayed = structuredClone(states);
washerDelayed["sensor.washer_operation_state"].state = "delayedstart";

// Washer at the end of its cycle: the tick is drawn in and sparkles twinkle around it.
const washerFinished = structuredClone(states);
washerFinished["sensor.washer_operation_state"].state = "finished";

// Dishwasher at the end of its cycle: the tick is drawn in and sparkles twinkle around it. It ended 25 minutes ago
// and its door hasn't been opened since: the door chip turns into the reminder.
const finished = structuredClone(states);
finished["sensor.dishwasher_operation_state"].state = "finished";
finished["sensor.dishwasher_operation_state"].last_changed = inMinutes(-25);
finished["sensor.dishwasher_door"].last_changed = inMinutes(-140);

// Dishwasher paused mid-cycle: the program badge pulses gently while it waits.
const dishwasherPaused = structuredClone(states);
dishwasherPaused["sensor.dishwasher_operation_state"].state = "pause";

// Dishwasher waiting on a delayed start: the badge's clock hands turn, no progress yet.
const dishwasherDelayed = structuredClone(states);
dishwasherDelayed["sensor.dishwasher_operation_state"].state = "delayedstart";
dishwasherDelayed["sensor.dishwasher_program_progress"].state = "unavailable";

// Each appliance idle with its door open: the dishwasher's door lowered on its racks, the washer's porthole swung aside.
const dishwasherOpen = structuredClone(states);
dishwasherOpen["sensor.dishwasher_operation_state"].state = "ready";
dishwasherOpen["sensor.dishwasher_door"].state = "open";
const washerOpen = structuredClone(states);
washerOpen["sensor.washer_door"].state = "open";

await render(
  [
    { file: "dishwasher", type: "smart-appliance-card", device: "dw", theme: "light", width: 460, config: {} },
    { file: "dishwasher-dark", type: "smart-appliance-card", device: "dw", theme: "dark", width: 460, config: {} },
    { file: "dishwasher-options", type: "smart-appliance-card", device: "dw", theme: "light", width: 460, config: {}, hass: { states: ready } },
    { file: "dishwasher-options-dark", type: "smart-appliance-card", device: "dw", theme: "dark", width: 460, config: {}, hass: { states: ready } },
    { file: "dishwasher-open", type: "smart-appliance-card", device: "dw", theme: "light", width: 460, config: {}, hass: { states: dishwasherOpen } },
    { file: "dishwasher-open-dark", type: "smart-appliance-card", device: "dw", theme: "dark", width: 460, config: {}, hass: { states: dishwasherOpen } },
    { file: "washer", type: "smart-appliance-card", device: "wm", theme: "light", width: 460, config: {} },
    { file: "washer-dark", type: "smart-appliance-card", device: "wm", theme: "dark", width: 460, config: {} },
    { file: "washer-open", type: "smart-appliance-card", device: "wm", theme: "light", width: 460, config: {}, hass: { states: washerOpen } },
    { file: "washer-open-dark", type: "smart-appliance-card", device: "wm", theme: "dark", width: 460, config: {}, hass: { states: washerOpen } },
    { file: "dishwasher-mini", type: "smart-appliance-mini-card", device: "dw", theme: "light", width: 380, config: {} },
    { file: "dishwasher-mini-dark", type: "smart-appliance-mini-card", device: "dw", theme: "dark", width: 380, config: {} },
    { file: "washer-mini", type: "smart-appliance-mini-card", device: "wm", theme: "light", width: 380, config: {} },
    { file: "washer-mini-dark", type: "smart-appliance-mini-card", device: "wm", theme: "dark", width: 380, config: {} },
    {
      file: "washer-mini-zoom", type: "smart-appliance-mini-card", device: "wm", theme: "light", width: 460, config: {},
      after: async (page) => {
        await page.locator("smart-appliance-mini-card .zoom").click();
        await page.mouse.move(0, 0);
      },
    },
    {
      file: "washer-mini-zoom-dark", type: "smart-appliance-mini-card", device: "wm", theme: "dark", width: 460, config: {},
      after: async (page) => {
        await page.locator("smart-appliance-mini-card .zoom").click();
        await page.mouse.move(0, 0);
      },
    },
    ...NEW.flatMap(([file, device, config = {}]) => ["light", "dark"].map((theme) => ({
      file: theme === "light" ? file : `${file}-dark`, type: "smart-appliance-card", device, theme, width: 460, config,
    }))),
    ...MINIS.flatMap(([brand, device, config = {}]) => ["light", "dark"].map((theme) => ({
      file: `mini-${brand}${theme === "light" ? "" : "-dark"}`, type: "smart-appliance-mini-card", device, theme, width: 380, config,
    }))),
  ],
  { icons, hass }
);

// One looping GIF per distinct animated state and per appliance — the two illustrations differ,
// so the paused / delayed / finished badges are recorded on both. The dishwasher mid-cycle (its
// default mock state is "run") sprays water, raises steam and glows its floor light; the washer
// running turns the drum and waves the water; a finished appliance draws its tick and twinkles
// sparkles; the paused badge breathes; the delayed-start badge turns its clock hands. Each
// reuses openCard through animate(), so no mount is duplicated.
const gifs = [
  { file: "dishwasher-running", type: "smart-appliance-card", device: "dw", theme: "light", width: 460, config: {} },
  { file: "washer-running", type: "smart-appliance-card", device: "wm", theme: "light", width: 460, config: {}, hass: { states: washerRunning } },
  { file: "dishwasher-finished", type: "smart-appliance-card", device: "dw", theme: "light", width: 460, config: {}, hass: { states: finished } },
  { file: "washer-finished", type: "smart-appliance-card", device: "wm", theme: "light", width: 460, config: {}, hass: { states: washerFinished } },
  { file: "dishwasher-paused", type: "smart-appliance-card", device: "dw", theme: "light", width: 460, config: {}, hass: { states: dishwasherPaused } },
  { file: "washer-paused", type: "smart-appliance-card", device: "wm", theme: "light", width: 460, config: {}, hass: { states: washerPaused } },
  { file: "dishwasher-delayed", type: "smart-appliance-card", device: "dw", theme: "light", width: 460, config: {}, hass: { states: dishwasherDelayed } },
  { file: "washer-delayed", type: "smart-appliance-card", device: "wm", theme: "light", width: 460, config: {}, hass: { states: washerDelayed } },
  ...NEW.map(([file, device, config = {}]) => ({ file: `${file}-running`, type: "smart-appliance-card", device, theme: "light", width: 460, config })),
];
// Every animation is also rendered in the other theme, with the exact same setup: X-dark.gif for a light X.gif,
// X-light.gif for a dark one.
const twin = (gif) => ({ ...gif, file: `${gif.file}-${gif.theme === "light" ? "dark" : "light"}`, theme: gif.theme === "light" ? "dark" : "light" });
for (const gif of gifs.flatMap((g) => [g, twin(g)])) await animate(gif, { icons, hass });
