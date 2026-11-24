// Layout shift on state updates, in a real browser (Chromium through Playwright; CHROMIUM_PATH, or skipped without
// one): Home Assistant pushes a new hass on every state change of the instance. An update of an entity the card does
// not show changes nothing in its shadow DOM; an update of its own entities is patched in place (no node replaced:
// icons and the illustration stay the same nodes, so nothing reloads or restarts) and the card keeps its height on
// every frame, so that the dashboard does not move.
import assert from "node:assert/strict";
import { after, test } from "node:test";
import { source } from "./source.mjs";


let browser = null;
try {
  const { chromium } = await import("playwright");
  browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
} catch {}
after(() => browser?.close());

// ha-card as in Home Assistant (Lit): its slot is only drawn a microtask after it is connected, so that its content has
// no size until then. ha-icon: empty (no size) until its icon is loaded, a little later.
const STUBS = `customElements.define("ha-card", class extends HTMLElement { constructor() { super(); this.attachShadow({ mode: "open" });
  this.updateComplete = new Promise((res) => { this._done = res; }); }
  connectedCallback() { if (this._drawn) return; this._drawn = true; Promise.resolve().then(() => {
    this.shadowRoot.innerHTML = "<style>:host{display:block;border:1px solid #ddd}</style><slot></slot>"; this._done(true); }); } });
customElements.define("ha-icon", class extends HTMLElement { constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { setTimeout(() => { this.shadowRoot.innerHTML = '<span style="display:inline-block;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px)"></span>'; }, 16); } });`;

// A Home Connect dishwasher running a program.
const entities = {};
const states = {};
const add = (id, key, state, attributes = {}) => {
  entities[id] = { entity_id: id, device_id: "dw", translation_key: key, platform: "home_connect" };
  states[id] = { entity_id: id, state, attributes: { friendly_name: id, ...attributes } };
};
const programs = { options: ["dishcare_dishwasher_program_eco_50", "dishcare_dishwasher_program_auto_2"] };
add("sensor.dishwasher_operation_state", "operation_state", "run", { options: ["inactive", "ready", "run", "pause", "finished"] });
add("sensor.dishwasher_door", "door", "closed", { options: ["open", "closed", "locked"] });
add("sensor.dishwasher_program_progress", "program_progress", "62", { unit_of_measurement: "%" });
add("sensor.dishwasher_program_finish_time", "program_finish_time", new Date(Date.now() + 48 * 60000).toISOString(), { device_class: "timestamp" });
add("select.dishwasher_active_program", "active_program", "dishcare_dishwasher_program_eco_50", programs);
add("select.dishwasher_selected_program", "selected_program", "dishcare_dishwasher_program_eco_50", programs);
add("switch.dishwasher_power", "power", "on");
add("binary_sensor.dishwasher_connectivity", "connectivity", "on", { device_class: "connectivity" });
add("sensor.dishwasher_rinse_aid_nearly_empty", "rinse_aid_nearly_empty", "present");
add("button.dishwasher_stop_program", "stop_program", "unknown");
add("switch.dishwasher_extra_dry", "extra_dry", "on", { friendly_name: "Dishwasher Extra dry" });
const devices = { dw: { id: "dw", name: "Dishwasher", manufacturer: "BSH", model: "SMV6ECX51E" } };

// Own entities changed one after another (progress, door, state, an option).
const CHANGES = [
  ["sensor.dishwasher_program_progress", "63"],
  ["sensor.dishwasher_door", "locked"],
  ["sensor.dishwasher_operation_state", "pause"],
  ["switch.dishwasher_extra_dry", "off"],
  ["sensor.dishwasher_program_progress", "64"],
];
const CARDS = [
  ["smart-appliance-card", {}],
  ["smart-appliance-card", { illustration: false }],
  ["smart-appliance-mini-card", {}],
  ["home-connect-dishwasher-mini-card", {}],
];

for (const [type, extra] of CARDS) {
  test(`${type}${extra.illustration === false ? " (classic header)" : ""}: state updates neither replace nodes nor change the height`, { skip: !browser && "no Chromium" }, async () => {
    const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
    try {
      await page.setContent('<!doctype html><body style="margin:0;font-family:Arial,sans-serif"></body>');
      await page.addScriptTag({ content: STUBS });
      await page.addScriptTag({ content: source });
      const r = await page.evaluate(
        async ({ type, extra, data, CHANGES }) => {
          const frame = () => new Promise((res) => requestAnimationFrame(res));
          const hassOf = (s) => ({ states: s, entities: data.entities, devices: data.devices, language: "en", locale: { language: "en" }, themes: {}, callService() {}, callWS: async () => ({}) });
          const outer = document.body.appendChild(document.createElement("div"));
          outer.style.width = "400px";
          const card = document.createElement(type);
          card.setConfig({ type: `custom:${type}`, device_id: "dw", ...extra });
          let s = { ...data.states };
          card.hass = hassOf(s);
          outer.appendChild(card);
          await new Promise((res) => setTimeout(res, 300));
          for (let i = 0; i < 5; i++) await frame();
          let count = { removed: 0, other: 0 };
          const tally = (ms) => {
            for (const m of ms) m.type === "childList" ? (count.removed += m.removedNodes.length) : count.other++;
          };
          const mo = new MutationObserver(tally);
          mo.observe(card.shadowRoot, { subtree: true, childList: true, attributes: true, characterData: true });
          const heights = new Set();
          let on = true;
          (async () => {
            while (on) {
              heights.add(Math.round(card.getBoundingClientRect().height));
              await frame();
            }
          })();
          const settle = async () => {
            for (let i = 0; i < 3; i++) await frame();
            tally(mo.takeRecords());
            const c = count;
            count = { removed: 0, other: 0 };
            return c;
          };
          const unrelated = [];
          const own = [];
          for (const [id, state] of CHANGES) {
            s = { ...s, "sensor.unrelated": { entity_id: "sensor.unrelated", state: String(Math.random()), attributes: {} } };
            card.hass = hassOf(s);
            unrelated.push(await settle());
            s = { ...s, [id]: { ...s[id], state } };
            card.hass = hassOf(s);
            own.push(await settle());
          }
          on = false;
          mo.disconnect();
          return { unrelated, own, heights: [...heights] };
        },
        { type, extra, data: { states, entities, devices }, CHANGES },
      );
      assert.deepEqual(r.unrelated, CHANGES.map(() => ({ removed: 0, other: 0 })), "an unrelated update mutated the card");
      assert.ok(r.own.some((c) => c.other), "the card's own updates were not shown");
      assert.deepEqual(r.own.map((c) => c.removed), CHANGES.map(() => 0), "an update replaced nodes instead of patching them");
      assert.equal(r.heights.length, 1, `the height changed: ${r.heights}`);
    } finally {
      await page.close();
    }
  });
}
