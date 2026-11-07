import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import { loadCard } from "./load.mjs";

const { HomeConnectWasherCard } = loadCard("smart-appliance-card.js", ["HomeConnectWasherCard"]);

const st = (state, attributes = {}) => ({ state, attributes });
const BAD_REQUEST =
  "Error starting program LaundryCare.Washer.Program.Cotton: HomeAppliance reported an error (BSH.Common.Error.400.BadRequest)";

// A washer waiting to start, as the Home Connect integration exposes it (French entity ids, like on a French install).
function mockHass({ deviceId = "d2", power = "on", remoteControl = "on", options = "on", responses = [] } = {}) {
  const states = {
    "select.wm_programme_selectionne": st("laundry_care_washer_program_cotton", {
      options: ["laundry_care_washer_program_cotton", "laundry_care_washer_program_mix"],
    }),
    "select.wm_programme_actif": st("unknown", { options: ["laundry_care_washer_program_cotton", "laundry_care_washer_program_mix"] }),
    "sensor.wm_etat": st("ready", { options: ["inactive", "ready", "run", "pause", "finished"] }),
    "switch.wm_alimentation": st(power),
    "binary_sensor.wm_demarrage_a_distance": st("on"),
    "binary_sensor.wm_controle_a_distance": st(remoteControl),
    "select.wm_temperature": st(options === "on" ? "laundry_care_washer_enum_type_temperature_g_c_40" : "unavailable", {
      options: ["laundry_care_washer_enum_type_temperature_g_c_30", "laundry_care_washer_enum_type_temperature_g_c_40"],
    }),
    "switch.wm_vario_perfect": st(options === "on" ? "off" : "unavailable"),
  };
  const keys = {
    "select.wm_programme_selectionne": "selected_program",
    "select.wm_programme_actif": "active_program",
    "sensor.wm_etat": "operation_state",
    "switch.wm_alimentation": "power",
    "binary_sensor.wm_demarrage_a_distance": "remote_start",
    "binary_sensor.wm_controle_a_distance": "remote_control",
  };
  const entities = {};
  for (const id of Object.keys(states)) entities[id] = { entity_id: id, device_id: deviceId, translation_key: keys[id] };
  const calls = [];
  return {
    language: "fr",
    states,
    entities,
    devices: { [deviceId]: { name: "Lave-linge" } },
    calls,
    callService(domain, service, data, target, notifyOnError) {
      calls.push({ domain, service, data, target, notifyOnError });
      const next = responses.shift();
      return next ? Promise.reject({ code: "home_assistant_error", message: next }) : Promise.resolve();
    },
  };
}

function card(hass) {
  const c = new HomeConnectWasherCard();
  c.setConfig({ device_id: Object.keys(hass.devices)[0] });
  c.hass = hass;
  return c;
}

// Clicks a button by its data-action, as the shadow root listener receives it, unless the rendered button is disabled.
function click(c, action) {
  const m = c.shadowRoot.innerHTML.match(new RegExp(`<button[^>]*data-action="${action}"[^>]*>`));
  assert.ok(m, `no ${action} button`);
  c._onClick({ composedPath: () => [{ dataset: { action }, disabled: / disabled[ >]/.test(m[0]) }] });
}

// Lets pending service call promises settle (setImmediate isn't mocked).
const flush = () => new Promise((resolve) => setImmediate(resolve));

beforeEach(() => mock.timers.enable({ apis: ["setTimeout"] }));
afterEach(() => mock.timers.reset());

test("start: a transient BadRequest is retried once after 3 s, without an error message", async () => {
  const hass = mockHass({ responses: [BAD_REQUEST] });
  const c = card(hass);
  click(c, "start");
  await flush();
  assert.equal(hass.calls.length, 1);
  assert.equal(hass.calls[0].notifyOnError, false);
  assert.deepEqual({ ...hass.calls[0].data }, { entity_id: "select.wm_programme_actif", option: "laundry_care_washer_program_cotton" });
  // Waiting for the retry: the button says so and doesn't send twice.
  assert.match(c.shadowRoot.innerHTML, /data-action="start" disabled>.*Démarrage…/);
  c._onClick({ composedPath: () => [{ dataset: { action: "start" }, disabled: false }] });
  mock.timers.tick(2999);
  await flush();
  assert.equal(hass.calls.length, 1);
  mock.timers.tick(1);
  await flush();
  assert.equal(hass.calls.length, 2);
  assert.deepEqual({ ...hass.calls[1].data }, { ...hass.calls[0].data });
  assert.doesNotMatch(c.shadowRoot.innerHTML, /class="error"/);
  assert.match(c.shadowRoot.innerHTML, /data-action="start">.*Démarrer</);
});

test("start: two rejections show a readable error in the card after exactly 2 calls", async () => {
  const hass = mockHass({ responses: [BAD_REQUEST, BAD_REQUEST] });
  const c = card(hass);
  click(c, "start");
  await flush();
  mock.timers.tick(3000);
  await flush();
  assert.equal(hass.calls.length, 2);
  const html = c.shadowRoot.innerHTML;
  assert.match(html, /class="error"[^>]*title="[^"]*BSH\.Common\.Error\.400\.BadRequest\)"/);
  assert.match(html, /L&#39;appareil a refusé le démarrage/);
  assert.ok(html.indexOf('class="error"') < html.indexOf('class="controls"'));
  mock.timers.tick(10000);
  await flush();
  assert.equal(hass.calls.length, 2);
  assert.doesNotMatch(c.shadowRoot.innerHTML, /class="error"/);
});

test("start: any other error is shown without a retry, and goes away when the state changes", async () => {
  const hass = mockHass({ responses: ["Program not found"] });
  const c = card(hass);
  click(c, "start");
  await flush();
  mock.timers.tick(3000);
  await flush();
  assert.equal(hass.calls.length, 1);
  assert.match(c.shadowRoot.innerHTML, /Le programme n&#39;a pas pu démarrer/);
  hass.states["sensor.wm_etat"] = st("run", hass.states["sensor.wm_etat"].attributes);
  c.hass = { ...hass, states: { ...hass.states } };
  assert.doesNotMatch(c.shadowRoot.innerHTML, /class="error"/);
});

test("options: while the appliance is set locally, Load options is disabled and nothing reloads on its own", async () => {
  const hass = mockHass({ remoteControl: "off", options: "unavailable" });
  const c = card(hass);
  let html = c.shadowRoot.innerHTML;
  assert.match(html, /Réglage en cours sur l&#39;appareil : options indisponibles/);
  assert.match(html, /data-action="reload_options" disabled/);
  click(c, "reload_options");
  await flush();
  assert.equal(hass.calls.length, 0);
  // Remote control is back but the options are still unavailable: the button comes back, no automatic reload.
  hass.states["binary_sensor.wm_controle_a_distance"] = st("on");
  c.hass = { ...hass, states: { ...hass.states } };
  html = c.shadowRoot.innerHTML;
  assert.match(html, /Options non chargées pour ce programme/);
  assert.match(html, /data-action="reload_options">/);
  await flush();
  assert.equal(hass.calls.length, 0);
});

test("options: a failed reload restores the original program and shows a message", async () => {
  const hass = mockHass({ options: "unavailable", responses: [null, "Timeout", "Timeout"] });
  const c = card(hass);
  click(c, "reload_options");
  await flush();
  mock.timers.tick(3000);
  await flush();
  const options = hass.calls.map((x) => x.data.option);
  assert.deepEqual(options, ["laundry_care_washer_program_mix", "laundry_care_washer_program_cotton", "laundry_care_washer_program_cotton"]);
  assert.ok(hass.calls.every((x) => x.notifyOnError === false));
  assert.match(c.shadowRoot.innerHTML, /Le programme d&#39;origine n&#39;a pas pu être rétabli/);
});

test("power: an appliance that can't be turned off gets a message, then a disabled button while on", async () => {
  const hass = mockHass({ deviceId: "d-power", responses: ["Lave-linge does not support turning off or entering standby mode"] });
  const c = card(hass);
  click(c, "power");
  await flush();
  assert.equal(hass.calls.length, 1);
  let html = c.shadowRoot.innerHTML;
  assert.match(html, /Cet appareil ne peut pas être éteint à distance\./);
  assert.match(html, /data-action="power"[^>]* disabled>/);
  click(c, "power");
  await flush();
  assert.equal(hass.calls.length, 1);
  // Turning it on still works.
  hass.states["switch.wm_alimentation"] = st("off");
  c.hass = { ...hass, states: { ...hass.states } };
  html = c.shadowRoot.innerHTML;
  assert.doesNotMatch(html, /data-action="power"[^>]* disabled/);
  click(c, "power");
  await flush();
  assert.equal(hass.calls.length, 2);
  assert.deepEqual({ ...hass.calls[1] }, { domain: "switch", service: "turn_on", data: hass.calls[1].data, target: undefined, notifyOnError: false });
  assert.equal(hass.calls[1].data.entity_id, "switch.wm_alimentation");
});

// A service call that stays pending until the test settles it.
function pendingCall(hass) {
  let settle;
  hass.callService = (domain, service, data) => {
    hass.calls.push({ domain, service, data });
    return new Promise((resolve) => {
      settle = resolve;
    });
  };
  return () => settle();
}

test("power: turn_off / turn_on from the state shown, the button disabled until the appliance answers", async () => {
  const hass = mockHass({ deviceId: "d-power-guard" });
  const done = pendingCall(hass);
  const c = card(hass);
  click(c, "power");
  assert.deepEqual(hass.calls.map((x) => [x.service, x.data.entity_id]), [["turn_off", "switch.wm_alimentation"]]);
  assert.match(c.shadowRoot.innerHTML, /data-action="power"[^>]* disabled>/);
  // A second click while the first is on its way sends nothing (a toggle would have undone it).
  c._power();
  assert.equal(hass.calls.length, 1);
  done();
  await flush();
  assert.doesNotMatch(c.shadowRoot.innerHTML, /data-action="power"[^>]* disabled/);
});

test("option pills: turn_on / turn_off from the state shown, disabled while the command runs", async () => {
  const hass = mockHass();
  const done = pendingCall(hass);
  const c = card(hass);
  const id = "switch.wm_vario_perfect";
  const pill = () => c.shadowRoot.innerHTML.match(new RegExp(`<button[^>]*data-toggle="${id}"[^>]*>`))[0];
  c._onClick({ composedPath: () => [{ dataset: { toggle: id }, disabled: false }] });
  assert.deepEqual(hass.calls.map((x) => [x.domain, x.service, x.data.entity_id]), [["switch", "turn_on", id]]);
  assert.match(pill(), / disabled>/);
  c._optionSwitch(id);
  assert.equal(hass.calls.length, 1);
  done();
  await flush();
  assert.doesNotMatch(pill(), / disabled/);
  hass.states[id] = st("on");
  c.hass = { ...hass, states: { ...hass.states } };
  c._onClick({ composedPath: () => [{ dataset: { toggle: id }, disabled: false }] });
  assert.equal(hass.calls[1].service, "turn_off");
});
