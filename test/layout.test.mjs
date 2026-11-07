// Narrow widths: the rules that keep the header and the mini card readable at their smallest declared size
// (6 columns of a Sections view, about 160-250 px). The rendering itself was measured in Chromium (see the PR).
import assert from "node:assert/strict";
import { test } from "node:test";
import { loadCard } from "./load.mjs";

const { HomeConnectWasherCard, customElements } = loadCard("smart-appliance-card.js", ["HomeConnectWasherCard"]);

const css = new HomeConnectWasherCard()._styles();

// The declarations of a top-level rule (outside any @container / @media block) whose selector list is exactly `sel`.
function rule(sel, source = css) {
  const esc = sel.replace(/[.()*+?[\]]/g, "\\$&");
  const m = source.match(new RegExp(`(?:^|[}>])\\s*${esc} \\{([^{}]*)\\}`));
  assert.ok(m, `no "${sel}" rule`);
  return m[1];
}

// The body of an @container block, with its condition.
function containers() {
  return [...css.matchAll(/@container \(max-width: (\d+)px\) \{((?:[^{}]*\{[^{}]*\})*)\s*\}/g)].map((m) => ({ px: Number(m[1]), body: m[2] }));
}

test("the card is a size container, so its layout follows its own width (Sections columns, mini card)", () => {
  assert.match(rule("ha-card"), /container-type: inline-size/);
});

test("size container: the card keeps a natural width with no minimum (intrinsic-width hosts, 1fr 1fr grids)", () => {
  // Inline-size containment makes the card's own content width 0: it fell to its 24 px of padding in layout-card,
  // button-card or an `auto` grid column. contain-intrinsic-inline-size fixed that but became the card's min-content
  // width: wrapped in a div (hui-card) in a `1fr 1fr` grid, it overflowed its column by 112-292 px. An empty
  // zero-height grid gives the natural width without a minimum (rendering checked in Chromium below).
  assert.doesNotMatch(css, /contain-intrinsic-/);
  const m = rule(":host::before").match(/grid-template-columns: minmax\(0, (\d+)px\)/);
  assert.ok(m, "no zero-minimum natural width on :host::before");
  assert.ok(Number(m[1]) >= 240 && Number(m[1]) <= 320, `natural width ${m[1]} px`);
  assert.match(rule(":host::before"), /height: 0/);
});

test("size container: the natural width never stops the card from shrinking in a `1fr 1fr` grid or a flex row", () => {
  // A px minimum on the host would keep two cards in a `1fr 1fr` grid (layout-card, grid card) or a horizontal
  // stack at 300 px each and overflow a 320-500 px row.
  const host = rule(":host");
  assert.match(host, /min-width: 0;/);
  assert.doesNotMatch(host, /min-width: [1-9]\d*px/, "a px min-width on the host overflows narrow rows");
});

test("header: the title block shrinks with an ellipsis but always keeps a few characters", () => {
  const t = rule(".titles");
  // flex-basis 0: the title takes what is left once the pill and the buttons are laid out, so it no longer
  // squeezes the pill ("Ready" cut to "Re…" on a 320 px card); its min-width keeps a few characters.
  assert.match(t, /flex: 1 1 0(px)?;/);
  assert.match(t, /min-width: \d+(\.\d+)?ch/);
  const n = rule(".name");
  for (const d of [/overflow: hidden/, /text-overflow: ellipsis/, /white-space: nowrap/]) assert.match(n, d);
});

test("header: the status pill shrinks (at most half the header) and truncates its text", () => {
  const s = rule(".st");
  assert.match(s, /flex: 0 1 auto/);
  assert.match(s, /min-width: 0/);
  assert.match(s, /max-width: 50%/);
  assert.match(s, /overflow: hidden/);
  assert.doesNotMatch(s, /flex-shrink: 0/);
  const stt = rule(".stt");
  for (const d of [/overflow: hidden/, /text-overflow: ellipsis/, /white-space: nowrap/]) assert.match(stt, d);
  assert.match(rule(".dot"), /flex: none/);
});

test("header and mini card: icon buttons never shrink", () => {
  for (const sel of [".logo", ".power", ".zoom", ".round"]) assert.match(rule(sel), /flex: none/, `${sel} can shrink`);
});

test("mini card: the header icon keeps the full card's size (only narrow cards shrink it)", () => {
  assert.match(rule(".logo"), /width: 40px; height: 40px/);
  assert.match(rule(".logo ha-icon"), /--mdc-icon-size: 24px/);
  const top = css.replace(/@container[^{]*\{(?:[^{}]*\{[^{}]*\})*\s*\}/g, "");
  assert.doesNotMatch(top, /ha-card\.mini \.logo/, "a mini-only header icon size");
  assert.match(containers().filter((b) => b.px === 230).map((b) => b.body).join("\n"), /\.logo \{ width: 28px; height: 28px; \}/);
});

test("narrow card: the pill only shows its dot, the logo steps aside, the mini card's buttons go under its text", () => {
  const blocks = containers();
  assert.ok(blocks.length >= 2, "no @container breakpoints");
  const all = blocks.map((b) => b.body).join("\n");
  // The pill's text is hidden visually only: it stays in the accessibility tree (and in the pill's title).
  const hidden = all.match(/\.stt \{([^}]*)\}/);
  assert.ok(hidden, "the pill text never hides");
  assert.match(hidden[1], /clip-path: inset\(50%\)|clip: rect\(0/);
  assert.doesNotMatch(hidden[1], /display: none/);
  assert.match(all, /\.logo \{[^}]*display: none/);
  // Mini card: the state is spelt out in the text column instead (hidden from screen readers, which read the pill).
  assert.match(rule(".mstate"), /display: none/);
  assert.match(all, /ha-card\.mini \.mstate \{[^}]*display: flex/);
  // Mini card: the round buttons take their own row, so the info column gets the card's width back.
  assert.match(all, /ha-card\.mini \.content \{[^}]*flex-wrap: wrap/);
  assert.match(all, /ha-card\.mini \.mcontrols \{[^}]*flex: 1 1 100%/);
});

test("values wrap instead of being cut: state, finish time, program (6 columns on a phone, and 280-364 px)", () => {
  // Measured in Chromium: "Wymagane działanie" / "Niedostępne" ended in "…" on a 156-280 px full card, and the
  // mini card's finish time ("Koniec o 10:56 · zostało 2 h 12") on a 364 px one.
  for (const sel of [".big .state", ".state-big", ".line span"]) {
    const r = rule(sel);
    assert.doesNotMatch(r, /white-space: nowrap|text-overflow: ellipsis/, `${sel} is cut`);
    assert.match(r, /min-width: 0/, `${sel} can't shrink`);
    assert.match(r, /overflow-wrap: (break-word|anywhere)/, `${sel}: a long word overflows`);
  }
});

test("option pills never get wider than the card: a long label wraps inside the pill", () => {
  const t = rule(".toggle");
  assert.match(t, /max-width: 100%/);
  assert.match(t, /box-sizing: border-box/);
  assert.match(t, /overflow-wrap: anywhere/);
});

test("mini card: the minimum width stays 6 columns (it is readable there now), its height follows its content", () => {
  const Mini = customElements.get("home-connect-washer-mini-card");
  assert.deepEqual({ ...new Mini().getGridOptions() }, { columns: 6, min_columns: 6, rows: "auto" });
});

// Rendered in Chromium (skipped when it can't start): the card in hosts that size it from its content
// (inline-block, `auto` grid column: button-card, layout-card) or squeeze it (`1fr 1fr` grid: grid card,
// horizontal-stack, layout-card), placed directly or wrapped in a <div> (HA's hui-card, whose min-width stays
// auto). It keeps a usable width in the first two and never overflows its column nor collapses in the last.
test("in an inline-block, an auto grid column or a 1fr 1fr grid, direct or in a div, the card neither collapses nor overflows", { timeout: 120000 }, async (t) => {
  let browser;
  try {
    const { chromium } = await import("playwright");
    browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  } catch (e) {
    return t.skip(`Chromium unavailable: ${e.message.split("\n")[0]}`);
  }
  const { readFileSync } = await import("node:fs");
  const src = readFileSync(new URL("../src/smart-appliance-card.js", import.meta.url), "utf8");
  const entities = {};
  const states = {};
  const add = (id, key, state, attributes = {}) => {
    entities[id] = { entity_id: id, device_id: "dev", translation_key: key };
    states[id] = { entity_id: id, state, attributes: { friendly_name: id, ...attributes } };
  };
  for (const [kind, prog] of [["w", "laundry_care_washer_program_cotton"], ["d", "dishcare_dishwasher_program_eco_50"]]) {
    add(`sensor.${kind}_operation_state`, "operation_state", "run", { options: ["ready", "run", "pause", "finished"] });
    add(`select.${kind}_active_program`, "active_program", prog, { options: [prog] });
    add(`switch.${kind}_power`, "power", "on");
    add(`button.${kind}_stop_program`, "stop_program", "unknown");
    add(`button.${kind}_pause_program`, "pause_program", "unknown");
    add(`sensor.${kind}_program_progress`, "program_progress", "45", { unit_of_measurement: "%" });
  }
  const failures = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    await page.setContent("<!doctype html><body style='margin:0;font-family:Arial,sans-serif'></body>");
    await page.addScriptTag({
      content:
        'customElements.define("ha-card", class extends HTMLElement { constructor() { super(); this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block;border:1px solid #888;border-radius:12px}</style><slot></slot>"; } });' +
        'customElements.define("ha-icon", class extends HTMLElement { connectedCallback() { this.style.display = "inline-flex"; this.innerHTML = "<svg viewBox=\'0 0 24 24\' style=\'width:24px;height:24px\'></svg>"; } });',
    });
    await page.addScriptTag({ content: src });
    const results = await page.evaluate(
      ({ states, entities }) => {
        const out = [];
        const contexts = [
          ["inline-block", "display:inline-block", 1],
          ["grid auto", "display:grid;grid-template-columns:auto", 1],
          ...[320, 360, 500].map((w) => [`grid 1fr 1fr ${w}px`, `display:grid;grid-template-columns:1fr 1fr;gap:8px;width:${w}px`, 2]),
        ];
        const types = ["washer-card", "washer-mini-card", "dishwasher-card", "dishwasher-mini-card"].map((s) => `home-connect-${s}`);
        for (const type of types)
          for (const wrapped of [false, true])
            for (const [name, css, n] of contexts) {
              const box = document.createElement("div");
              box.style.cssText = css;
              document.body.appendChild(box);
              const cards = [];
              for (let i = 0; i < n; i++) {
                const el = document.createElement(type);
                el.setConfig({ type: `custom:${type}` });
                el.hass = { states, entities, devices: { dev: { name: "Appliance" } }, language: "en", callService: async () => {} };
                if (wrapped) {
                  const div = document.createElement("div");
                  div.appendChild(el);
                  box.appendChild(div);
                } else box.appendChild(el);
                cards.push(el);
              }
              const b = box.getBoundingClientRect();
              const rects = cards.map((el) => el.shadowRoot.querySelector("ha-card").getBoundingClientRect());
              const overflow = Math.max(
                box.scrollWidth - box.clientWidth,
                ...rects.map((r, i) => r.right - (n === 2 ? b.left + ((i + 1) * (b.width - 8)) / 2 + i * 8 : b.right)),
              );
              out.push({ label: `${type} ${wrapped ? "in a div" : "direct"} ${name}`, n, box: b.width, widths: rects.map((r) => r.width), overflow });
              box.remove();
            }
        return out;
      },
      { states, entities },
    );
    for (const r of results) {
      const ws = r.widths.map((w) => w.toFixed(0)).join("/");
      if (r.overflow > 0.5) failures.push(`${r.label}: overflows by ${r.overflow.toFixed(0)} px (widths ${ws})`);
      else if (r.n === 1 ? r.widths[0] < 240 : r.widths.some((w) => w < (r.box - 8) / 2 - 0.5)) failures.push(`${r.label}: ${ws} px in ${r.box} px`);
    }
  } finally {
    await browser.close();
  }
  assert.deepEqual(failures, []);
});
