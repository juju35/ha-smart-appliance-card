import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import { loadCard } from "./load.mjs";

const { HomeConnectWasherCard, HC_STATE_COLORS, customElements } = loadCard("smart-appliance-card.js", ["HomeConnectWasherCard", "HC_STATE_COLORS"]);

const st = (state, attributes = {}) => ({ state, attributes });

// A washer, running or waiting to start with two option switches (one on, one off).
function mockHass({ opState = "run", power = "on" } = {}) {
  const states = {
    "select.wm_selected_program": st("laundry_care_washer_program_cotton", {
      options: ["laundry_care_washer_program_cotton", "laundry_care_washer_program_mix"],
    }),
    "select.wm_active_program": st(opState === "run" ? "laundry_care_washer_program_cotton" : "unknown", {
      options: ["laundry_care_washer_program_cotton", "laundry_care_washer_program_mix"],
    }),
    "sensor.wm_operation_state": st(opState, { options: ["inactive", "ready", "run", "pause", "finished"] }),
    "switch.wm_power": st(power),
    "button.wm_pause_program": st("unknown"),
    "button.wm_resume_program": st("unknown"),
    "button.wm_stop_program": st("unknown"),
    "switch.wm_vario_perfect": st("on", { friendly_name: "Washer VarioPerfect" }),
    "switch.wm_prewash": st("off", { friendly_name: "Washer Prewash" }),
  };
  const keys = {
    "select.wm_selected_program": "selected_program",
    "select.wm_active_program": "active_program",
    "sensor.wm_operation_state": "operation_state",
    "switch.wm_power": "power",
    "button.wm_pause_program": "pause_program",
    "button.wm_resume_program": "resume_program",
    "button.wm_stop_program": "stop_program",
  };
  const entities = {};
  for (const id of Object.keys(states)) entities[id] = { entity_id: id, device_id: "d2", translation_key: keys[id] };
  const calls = [];
  return {
    language: "en",
    states,
    entities,
    devices: { d2: { name: "Washer" } },
    calls,
    callService(domain, service, data) {
      calls.push({ domain, service, data });
      return Promise.resolve();
    },
  };
}

function card(hass, Card = HomeConnectWasherCard) {
  const c = new Card();
  c.setConfig({ device_id: "d2" });
  c.hass = hass;
  return c;
}

// Stands in for the browser's focus handling: the element focused before a render, and the
// freshly rendered controls the card can find with querySelectorAll.
// The options of each focus() call made by the card.
const focusOptions = [];
function focusable(c, dataset) {
  const focused = [];
  focusOptions.length = 0;
  const node = (ds) => ({ tagName: "BUTTON", dataset: ds, focus: (opts) => { focused.push(ds); focusOptions.push(opts); } });
  c.shadowRoot.activeElement = node(dataset);
  c.shadowRoot.querySelectorAll = () =>
    [...c.shadowRoot.innerHTML.matchAll(/data-(action|toggle|select)="([^"]*)"/g)].map((m) => node({ [m[1]]: m[2] }));
  return focused;
}

beforeEach(() => mock.timers.enable({ apis: ["setTimeout"] }));
afterEach(() => mock.timers.reset());

test("keyboard: Stop keeps the focus once armed, so a second Enter confirms it", () => {
  const hass = mockHass();
  const c = card(hass);
  const focused = focusable(c, { action: "stop" });
  c._onClick({ composedPath: () => [{ dataset: { action: "stop" }, disabled: false }] });
  assert.match(c.shadowRoot.innerHTML, /data-action="stop"><ha-icon icon="mdi:stop"><\/ha-icon>Confirm\?/);
  assert.deepEqual(focused.map((d) => ({ ...d })), [{ action: "stop" }]);
});

test("keyboard: an option pill keeps the focus when its switch changes", () => {
  const hass = mockHass({ opState: "ready" });
  const c = card(hass);
  const focused = focusable(c, { toggle: "switch.wm_prewash" });
  hass.states["switch.wm_prewash"] = st("on", { friendly_name: "Washer Prewash" });
  c.hass = { ...hass };
  assert.deepEqual(focused.map((d) => ({ ...d })), [{ toggle: "switch.wm_prewash" }]);
});

test("focus: giving the focus back after a render never scrolls the page to the card", () => {
  // A clicked button keeps the focus; each later render (hass update, 30 s tick) gives it back, which
  // must not bring the dashboard back to the card while the user has scrolled away.
  const hass = mockHass();
  const c = card(hass);
  const focused = focusable(c, { action: "pause" });
  hass.states["switch.wm_prewash"] = st("on", { friendly_name: "Washer Prewash" });
  c.hass = { ...hass };
  c._onClick({ composedPath: () => [{ dataset: { action: "stop" }, disabled: false }] });
  assert.equal(focused.length, 2, "no refocus");
  for (const o of focusOptions) assert.deepEqual({ ...o }, { preventScroll: true });
});

test("focus: nothing is focused when the focus wasn't in the card, or the control is gone", () => {
  const hass = mockHass();
  const c = card(hass);
  // Focus elsewhere (no control under focus): the re-render doesn't steal it.
  const focused = focusable(c, {});
  c.shadowRoot.activeElement = null;
  hass.states["sensor.wm_operation_state"] = st("pause", hass.states["sensor.wm_operation_state"].attributes);
  c.hass = { ...hass };
  assert.deepEqual(focused, []);
  // Pause focused, then the program pauses: Pause is replaced by Resume, nothing to refocus (no throw).
  const again = focusable(c, { action: "pause" });
  hass.states["sensor.wm_operation_state"] = st("run", hass.states["sensor.wm_operation_state"].attributes);
  c.hass = { ...hass };
  assert.deepEqual(again.map((d) => ({ ...d })), [{ action: "pause" }]);
  const gone = focusable(c, { action: "pause" });
  hass.states["sensor.wm_operation_state"] = st("finished", hass.states["sensor.wm_operation_state"].attributes);
  c.hass = { ...hass };
  assert.deepEqual(gone, []);
});

test("option pills and the power button expose their on/off state to screen readers", () => {
  const html = card(mockHass({ opState: "ready" })).shadowRoot.innerHTML;
  assert.match(html, /<button class="toggle on" data-toggle="switch\.wm_vario_perfect" aria-pressed="true"/);
  assert.match(html, /<button class="toggle" data-toggle="switch\.wm_prewash" aria-pressed="false"/);
  assert.match(html, /<button class="power on" data-action="power"[^>]* aria-pressed="true"/);
  const off = card(mockHass({ opState: "inactive", power: "off" })).shadowRoot.innerHTML;
  assert.match(off, /<button class="power" data-action="power"[^>]* aria-pressed="false"/);
});

// WCAG 2.x contrast of the state texts, with Home Assistant's default colours (the fallbacks in the card).
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, p) => a.map((v, i) => v * p + b[i] * (1 - p));
const lum = (c) => {
  const [r, g, b] = c.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const THEMES = { light: { bg: "#ffffff", text: "#212121" }, dark: { bg: "#1c1c1c", text: "#e1e1e1" } };

test("state colours come from the theme (no hard-coded colour without a variable)", () => {
  for (const [state, color] of Object.entries(HC_STATE_COLORS)) assert.match(color, /^var\(--/, `${state}: ${color}`);
});

test("state, warning, error and primary texts reach 4.5:1 in light and dark themes, on the card and on their tinted pills", () => {
  const css = new HomeConnectWasherCard()._styles();
  const colors = { ...Object.fromEntries(Object.entries(HC_STATE_COLORS)), primary: "var(--primary-color, #03a9f4)" };
  // Each text colour is the state colour mixed with the theme's text colour.
  for (const [name, source] of [
    ["--hc-text", "var(--hc-color)"],
    ["--hc-warning-text", "var(--warning-color, #ffa600)"],
    ["--hc-error-text", "var(--error-color, #db4437)"],
    ["--hc-primary-text", "var(--primary-color, #03a9f4)"],
  ]) {
    const re = new RegExp(`${name}: color-mix\\(in srgb, ${source.replace(/[()]/g, "\\$&")} (\\d+)%, var\\(--primary-text-color\\)\\)`);
    const m = css.match(re);
    assert.ok(m, `${name} isn't defined as a mix of ${source} and the text colour`);
    const p = Number(m[1]) / 100;
    const sources = name === "--hc-text" ? Object.values(colors) : [source];
    for (const s of sources) {
      const c = hex(s.match(/#[0-9a-f]{6}/i)[0]);
      for (const [theme, t] of Object.entries(THEMES)) {
        const bg = hex(t.bg);
        const text = mix(c, hex(t.text), p);
        assert.ok(ratio(text, bg) >= 4.5, `${name} ${s} on the ${theme} card: ${ratio(text, bg).toFixed(2)}`);
        const pill = mix(c, bg, 0.24); // the strongest tint used (armed Stop, hovered primary button)
        assert.ok(ratio(text, pill) >= 4.5, `${name} ${s} on its ${theme} pill: ${ratio(text, pill).toFixed(2)}`);
      }
    }
  }
  // And the texts use them (the state colour stays on dots, bars, borders and the illustration).
  for (const [sel, v] of [
    [".big .state", "--hc-text"],
    [".state-big", "--hc-text"],
    [".st", "--hc-text"],
    [".chip.warn", "--hc-warning-text"],
    [".error", "--hc-error-text"],
    [".btn.danger", "--hc-error-text"],
    [".btn.primary, .round.primary", "--hc-primary-text"],
    [".toggle.on", "--hc-primary-text"],
    [".link", "--hc-primary-text"],
  ]) {
    const rule = css.match(new RegExp(`(?:^|[}>])\\s*${sel.replace(/[.()]/g, "\\$&")} \\{([^}]*)\\}`));
    assert.ok(rule, `no ${sel} rule`);
    assert.match(rule[1], new RegExp(`(?:^|;|\\s)color: var\\(${v}\\)`), `${sel} text isn't var(${v})`);
  }
  assert.match(css, /\.dot \{[^}]*background: var\(--hc-color\)/);
  assert.match(css, /\.fill \{[^}]*background: var\(--hc-color\)/);
});

test("the mini card's status pill keeps its text in a title (and for screen readers) for when only its dot shows", () => {
  const Mini = customElements.get("home-connect-washer-mini-card");
  // Illustrated header: the pill right after the title (the subtitle no longer repeats the state).
  const banner = card(mockHass(), Mini).shadowRoot.innerHTML;
  assert.match(banner, /<div class="trow"><div class="name">[^<]*<\/div><span class="st" title="Running"><span class="dot"><\/span><span class="stt">Running<\/span><\/span><\/div><div class="sub"/);
  assert.doesNotMatch(banner, /<div class="sub">Running<\/div>/);
  // The state line is there too, shown only on a card so narrow that the banner's pill keeps just its dot.
  assert.match(banner, /<div class="info"><div class="line mstate" aria-hidden="true"><span>Running<\/span><\/div>/);
  // The full card too.
  const Full = customElements.get("home-connect-washer-card");
  assert.match(card(mockHass(), Full).shadowRoot.innerHTML, /<div class="trow"><div class="name">[^<]*<\/div><span class="st" title="Running">/);
  const el = new Mini();
  el.setConfig({ illustration: false });
  el.hass = mockHass();
  const html = el.shadowRoot.innerHTML;
  assert.match(html, /<div class="info"><div class="line mstate" aria-hidden="true"><span>Running<\/span><\/div>/);
  assert.match(html, /<span class="st" title="Running"><span class="dot"><\/span><span class="stt">Running<\/span><\/span>/);
});
