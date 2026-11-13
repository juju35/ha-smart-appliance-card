import assert from "node:assert/strict";
import { test } from "node:test";
import { loadCard } from "./load.mjs";

const { HomeConnectWasherCard, HomeConnectDishwasherCard, HomeConnectCardEditor, hcFindDevice, hcEsc, customElements } = loadCard("smart-appliance-card.js", [
  "HomeConnectWasherCard",
  "HomeConnectCardEditor",
  "HomeConnectDishwasherCard",
  "hcFindDevice",
  "hcEsc",
]);

const st = (state, attributes = {}) => ({ state, attributes });

// One dishwasher (d1) and one washer (d2), as the Home Connect integration exposes them.
function mockHass({ washerState = "run", pauseState = "unknown", opState } = {}) {
  const states = {
    "select.dw_selected_program": st("dishcare_dishwasher_program_eco_50", { options: ["dishcare_dishwasher_program_eco_50"] }),
    "select.wm_selected_program": st("laundry_care_washer_program_cotton", {
      options: ["laundry_care_washer_program_cotton", "laundry_care_washer_program_mix"],
    }),
    "select.wm_active_program": st("laundry_care_washer_program_cotton", { options: ["laundry_care_washer_program_cotton"] }),
    "sensor.wm_operation_state": st(opState || washerState, { options: ["inactive", "ready", "run", "pause", "finished"] }),
    "switch.wm_power": st("on"),
    "button.wm_pause_program": st(pauseState),
    "button.wm_resume_program": st("unknown"),
    "button.wm_stop_program": st("unknown"),
  };
  const entities = {};
  for (const id of Object.keys(states)) entities[id] = { entity_id: id, device_id: id.includes(".dw_") ? "d1" : "d2" };
  entities["select.wm_selected_program"].translation_key = "selected_program";
  entities["select.wm_active_program"].translation_key = "active_program";
  entities["switch.wm_power"].translation_key = "power";
  entities["button.wm_pause_program"].translation_key = "pause_program";
  entities["button.wm_resume_program"].translation_key = "resume_program";
  entities["button.wm_stop_program"].translation_key = "stop_program";
  return {
    language: "en",
    states,
    entities,
    devices: { d1: { name: "Dishwasher" }, d2: { name: "Washer" } },
    callService: () => Promise.resolve(),
  };
}

function render(Card, hass, config = {}) {
  const card = new Card();
  card.setConfig(config);
  card.hass = hass;
  return card.shadowRoot.innerHTML;
}

test("washer card: stub config and editor use the washer profile", () => {
  const hass = mockHass();
  assert.deepEqual({ ...HomeConnectWasherCard.getStubConfig(hass) }, { device_id: "d2" });
  assert.deepEqual({ ...HomeConnectDishwasherCard.getStubConfig(hass) }, { device_id: "d1" });
  assert.equal(HomeConnectWasherCard.getConfigElement().kind, "washer");
  assert.equal(HomeConnectDishwasherCard.getConfigElement().kind, "dishwasher");
});

test("hcFindDevice follows registry changes", () => {
  const hass = mockHass();
  assert.equal(hcFindDevice(hass, "washer"), "d2");
  const devices = { d1: hass.devices.d1 };
  assert.equal(hcFindDevice({ ...hass, devices }, "washer"), undefined);
});

test("Pause shows for a never-pressed (unknown) button, not for an unavailable one", () => {
  assert.match(render(HomeConnectWasherCard, mockHass({ pauseState: "unknown" })), /data-action="pause"/);
  assert.match(render(HomeConnectWasherCard, mockHass({ pauseState: "2026-10-01T10:00:00+00:00" })), /data-action="pause"/);
  assert.doesNotMatch(render(HomeConnectWasherCard, mockHass({ pauseState: "unavailable" })), /data-action="pause"/);
});

test("show_power: false hides the power button", () => {
  assert.match(render(HomeConnectWasherCard, mockHass()), /data-action="power"/);
  assert.doesNotMatch(render(HomeConnectWasherCard, mockHass(), { show_power: false }), /data-action="power"/);
});

test("header always shows the appliance icon, and the appliance illustration", () => {
  const html = render(HomeConnectWasherCard, mockHass());
  assert.match(html, /class="logo"[^>]*><ha-icon icon="mdi:washing-machine"/);
  // No Home Connect logo: the brand's badge, or nothing when the manufacturer isn't known.
  assert.match(html, /<ha-icon icon="mdi:washing-machine"><\/ha-icon><\/div>/);
  const siemens = mockHass();
  siemens.devices.d2.manufacturer = "SIEMENS";
  assert.match(render(HomeConnectWasherCard, siemens), /class="hc-badge brand"[^>]*title="Siemens">S</);
  assert.match(render(HomeConnectDishwasherCard, mockHass()), /<ha-icon icon="mdi:dishwasher"/);
  assert.match(html, /class="drum"/);
  assert.match(render(HomeConnectWasherCard, mockHass(), { show_logo: false }), /class="logo"/);
  assert.match(render(HomeConnectWasherCard, mockHass(), { icon: "mdi:washing-machine" }), /class="badge"/);
});

test("mini card: compact view, detail button toggles the full card", () => {
  const Mini = customElements.get("home-connect-washer-mini-card");
  const card = new Mini();
  card.setConfig({});
  card.hass = mockHass();
  assert.match(card.shadowRoot.innerHTML, /ha-card class="mini"/);
  assert.match(card.shadowRoot.innerHTML, /data-action="zoom"[^>]*><ha-icon icon="mdi:arrow-expand"/);
  assert.doesNotMatch(card.shadowRoot.innerHTML, /data-select=/);
  assert.deepEqual({ ...card.getGridOptions() }, { columns: 6, min_columns: 6, rows: "auto" });
  card._setZoom(true);
  assert.deepEqual({ ...card.getGridOptions() }, { columns: 12, min_columns: 6, rows: "auto" });
  assert.doesNotMatch(card.shadowRoot.innerHTML, /ha-card class="mini"/);
  assert.match(card.shadowRoot.innerHTML, /mdi:arrow-collapse/);
  card._setZoom(false);
  assert.match(card.shadowRoot.innerHTML, /ha-card class="mini"/);
  const noZoom = new Mini();
  noZoom.setConfig({ zoom: false });
  noZoom.hass = mockHass();
  assert.doesNotMatch(noZoom.shadowRoot.innerHTML, /data-action="zoom"/);
  assert.equal(Mini.getConfigElement().mini, true);
  assert.equal(Mini.getConfigElement().kind, "washer");
});

test("state badge on the illustration when paused, delayed or finished", () => {
  assert.match(render(HomeConnectWasherCard, mockHass({ washerState: "pause" })), /class="picture st-pause"[\s\S]*class="pbadge"/);
  assert.match(render(HomeConnectWasherCard, mockHass({ washerState: "finished" })), /class="sparkles"/);
  assert.doesNotMatch(render(HomeConnectWasherCard, mockHass({ washerState: "run" })), /class="pbadge"/);
  assert.doesNotMatch(render(HomeConnectWasherCard, mockHass({ washerState: "pause" }), { icon: "mdi:washing-machine" }), /class="pbadge"/);
});

test("the washer gets the washer illustration even in a dishwasher card", () => {
  const html = render(HomeConnectDishwasherCard, mockHass(), { device_id: "d2" });
  assert.match(html, /class="drum"/);
  assert.doesNotMatch(html, /class="steam"/);
});

test("door open: open-door illustration", () => {
  const hass = mockHass({ washerState: "ready" });
  hass.states["sensor.wm_door"] = st("open", { options: ["open", "closed", "locked"] });
  hass.entities["sensor.wm_door"] = { entity_id: "sensor.wm_door", device_id: "d2", translation_key: "door" };
  assert.match(render(HomeConnectWasherCard, hass), /url\(#hc-wro\)/);
  hass.states["sensor.wm_door"] = st("closed", { options: ["open", "closed", "locked"] });
  assert.doesNotMatch(render(HomeConnectWasherCard, hass), /hc-wro/);
});

test("chips open the more-info dialog of their entity (click, Enter or Space)", () => {
  const hass = mockHass({ washerState: "ready" });
  hass.states["sensor.wm_door"] = st("open", { options: ["open", "closed", "locked"] });
  hass.entities["sensor.wm_door"] = { entity_id: "sensor.wm_door", device_id: "d2", translation_key: "door" };
  const card = new HomeConnectWasherCard();
  const fired = [];
  card.dispatchEvent = (ev) => fired.push(ev);
  card.setConfig({});
  card.hass = hass;
  assert.match(card.shadowRoot.innerHTML, /<span class="chip warn clickable" role="button" tabindex="0" data-entity="sensor.wm_door">/);
  card._onClick({ composedPath: () => [{ dataset: { entity: "sensor.wm_door" } }] });
  for (const key of ["Enter", " ", "a"]) {
    for (const fn of card.shadowRoot.listeners.keydown) fn({ key, composedPath: () => [{ dataset: { entity: "sensor.wm_door" } }], preventDefault() {} });
  }
  assert.equal(fired.length, 3);
  for (const ev of fired) {
    assert.equal(ev.type, "hass-more-info");
    assert.deepEqual({ ...ev.detail }, { entityId: "sensor.wm_door" });
  }
  // The offline chip has no entity: not clickable.
  hass.states["sensor.wm_operation_state"] = st("unavailable");
  card.hass = { ...hass };
  assert.match(card.shadowRoot.innerHTML, /<span class="chip"><ha-icon icon="mdi:cloud-off-outline">/);
});

test("an unknown operation state is escaped in the status line", () => {
  const html = render(HomeConnectWasherCard, mockHass({ opState: '<img src=x onerror="alert(1)">' }));
  assert.doesNotMatch(html, /<img src=x/);
  assert.match(html, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
});

test("hcEsc escapes HTML text and attributes", () => {
  assert.equal(hcEsc(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  assert.equal(hcEsc(null), "");
});

test("entity ids from the config are escaped in data attributes", () => {
  const hass = mockHass({ washerState: "ready" });
  const bad = 'select.x"><img src=x>';
  hass.states[bad] = st("a", { options: ["a"] });
  const html = render(HomeConnectWasherCard, hass, { device_id: "d2", entities: { selected_program: bad } });
  assert.doesNotMatch(html, /<img src=x>/);
  assert.match(html, /data-select="select\.x&quot;&gt;&lt;img src=x&gt;"/);
});

function editor(kind, config, language = "en") {
  const ed = new HomeConnectCardEditor();
  ed.kind = kind;
  ed.setConfig(config);
  ed.hass = { language };
  return ed;
}

test("editor labels follow the language option", () => {
  assert.equal(editor("washer", {})._form.computeLabel({ name: "name" }), "Name");
  assert.equal(editor("washer", { language: "fr" })._form.computeLabel({ name: "name" }), "Nom");
  assert.equal(editor("washer", { language: "en" }, "fr")._form.computeLabel({ name: "name" }), "Name");
});

test("editor labels the device field instead of leaking the raw key", () => {
  assert.equal(editor("washer", {})._form.computeLabel({ name: "device_id" }), "Appliance");
  assert.equal(editor("washer", { language: "fr" })._form.computeLabel({ name: "device_id" }), "Appareil");
  assert.equal(editor("washer", {})._form.computeHelper({ name: "device_id" }), "Appliance from Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool or Matter");
});

test("mini card editor: every full card option (energy price included), plus zoom; entity stays YAML only", () => {
  const names = (ed) => ed._schema().flatMap((s) => (s.type === "grid" ? s.schema : [s])).map((s) => s.name);
  const full = names(editor("washer", {}));
  const mini = editor("washer", {});
  mini.mini = true;
  const miniNames = names(mini);
  for (const n of full) assert.ok(miniNames.includes(n), n);
  for (const n of ["energy_price", "energy_price_entity", "zoom"]) assert.ok(miniNames.includes(n), n);
  assert.ok(!full.includes("zoom"));
  assert.ok(!miniNames.includes("entity"));
  assert.ok(names(editor(undefined, { type: "custom:smart-appliance-mini-card" })).includes("energy_price"));
  for (const language of ["en", "fr", "de"])
    for (const n of ["energy_price", "energy_price_entity"]) assert.notEqual(editor("washer", { language })._form.computeLabel({ name: n }), `ed_${n}`);
});

test("editor lists the connectivity, salt and rinse aid overrides where they apply", () => {
  const roles = (kind) => editor(kind, {})._schema().find((s) => s.name === "entities").schema.map((s) => s.name);
  assert.ok(roles("dishwasher").includes("connectivity"));
  assert.ok(roles("dishwasher").includes("salt"));
  assert.ok(roles("dishwasher").includes("rinse_aid"));
  assert.ok(!roles("dishwasher").includes("pause"));
  assert.ok(roles("washer").includes("connectivity"));
  assert.ok(roles("washer").includes("pause"));
  assert.ok(!roles("washer").includes("salt"));
});

const NEW_LANGS = ["ro", "da", "sv", "bg", "ru", "uk", "hu", "sk", "cs", "sl", "lv", "el"];
const LANGS = ["fr", "de", "es", "sr", "sr-Latn", "it", "nl", "pt", "pl", ...NEW_LANGS];

test("I18N parity: every language has exactly the English keys, array lengths and placeholders, and no empty value", () => {
  const { HcI18n } = loadCard("smart-appliance-card.js", ["HcI18n"]);
  const ref = Object.keys(HcI18n.en).sort();
  assert.deepEqual(Object.keys(HcI18n).sort(), ["en", ...LANGS].sort(), "dictionaries");
  for (const lang of LANGS) {
    assert.ok(HcI18n[lang], `${lang} dictionary`);
    assert.deepEqual(Object.keys(HcI18n[lang]).sort(), ref, `${lang} keys`);
    for (const k of ref) {
      const en = HcI18n.en[k];
      assert.equal(Array.isArray(HcI18n[lang][k]), Array.isArray(en), `${lang}.${k} type`);
      if (Array.isArray(en)) assert.equal(HcI18n[lang][k].length, en.length, `${lang}.${k} length`);
      const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort();
      assert.deepEqual(ph(HcI18n[lang][k]), ph(HcI18n.en[k]), `${lang}.${k} placeholders`);
      for (const v of [].concat(HcI18n[lang][k])) assert.ok(String(v).trim(), `${lang}.${k} not empty`);
    }
  }
});

test("Serbian: sr is all Cyrillic and sr-Latn all Latin, brand names and placeholders aside", () => {
  const { HcI18n } = loadCard("smart-appliance-card.js", ["HcI18n"]);
  const strip = (s) => String(s).replace(/Home Connect|Home Assistant|Miele|SmartThings|LG ThinQ|Whirlpool|Matter|Maytag|KitchenAid|Styler|kWh|Tempo|\{\w+\}/g, "");
  for (const [k, v] of Object.entries(HcI18n.sr)) assert.doesNotMatch(strip(v), /[A-Za-z]/, `sr.${k}`);
  for (const [k, v] of Object.entries(HcI18n["sr-Latn"])) assert.doesNotMatch(strip(v), /[\u0400-\u04FF]/, `sr-Latn.${k}`);
});

test("Bulgarian, Russian and Ukrainian are all Cyrillic, Greek all Greek, brand names and placeholders aside", () => {
  const { HcI18n } = loadCard("smart-appliance-card.js", ["HcI18n"]);
  const strip = (s) => String(s).replace(/Home Connect|Home Assistant|Miele|SmartThings|LG ThinQ|Whirlpool|Matter|Maytag|KitchenAid|Styler|kWh|Tempo|\{\w+\}/g, "");
  for (const lang of ["bg", "ru", "uk", "el"]) {
    for (const [k, v] of Object.entries(HcI18n[lang])) assert.doesNotMatch(strip(v), /[A-Za-z]/, `${lang}.${k}`);
  }
  for (const lang of ["bg", "ru", "uk"]) assert.match(HcI18n[lang].washer, /^[\u0400-\u04FF ]+$/, `${lang}.washer`);
  assert.match(HcI18n.el.washer, /^[\u0370-\u03FF\u1F00-\u1FFF ]+$/, "el.washer");
});

test("language resolution: full code if translated, else the base language, else English", () => {
  const lang = (code) => {
    const card = new HomeConnectWasherCard();
    card.setConfig({ language: code });
    return card._lang();
  };
  assert.equal(lang("fr-FR"), "fr");
  assert.equal(lang("sr-Latn"), "sr-Latn");
  assert.equal(lang("sr"), "sr");
  assert.equal(lang("it-IT"), "it");
  assert.equal(lang("nl-BE"), "nl");
  assert.equal(lang("pt"), "pt");
  // No Brazilian dictionary: pt-BR falls back to European Portuguese on purpose.
  assert.equal(lang("pt-BR"), "pt");
  assert.equal(lang("pl-PL"), "pl");
  for (const code of NEW_LANGS) assert.equal(lang(code), code);
  assert.equal(lang("ro-RO"), "ro");
  assert.equal(lang("sv-SE"), "sv");
  assert.equal(lang("cs-CZ"), "cs");
  assert.equal(lang("el-GR"), "el");
  assert.equal(lang("ja"), "en");
  // Without a language option the card follows Home Assistant, sr-Latn included.
  const card = new HomeConnectWasherCard();
  card.setConfig({});
  card.hass = { ...mockHass(), language: "sr-Latn" };
  assert.equal(card._lang(), "sr-Latn");
  assert.match(card.shadowRoot.innerHTML, /Mašina za veš|Radi/);
  assert.equal(editor("washer", {}, "sr-Latn")._lang(), "sr-Latn");
  assert.equal(editor("washer", {}, "fr-FR")._lang(), "fr");
  assert.equal(editor("washer", { language: "sr" }, "fr")._lang(), "sr");
  assert.equal(editor("washer", {}, "pt-BR")._lang(), "pt");
  assert.equal(editor("washer", {}, "pl-PL")._lang(), "pl");
  assert.equal(editor("washer", {}, "uk-UA")._lang(), "uk");
  assert.equal(editor("washer", {}, "hu")._lang(), "hu");
});

test("editor offers every language, from Français to Ελληνικά, and follows them", () => {
  const options = editor("washer", {})._schema().find((s) => s.name === "language").selector.select.options;
  assert.deepEqual(JSON.parse(JSON.stringify(options)), [
    { value: "", label: "Automatic" },
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "de", label: "Deutsch" },
    { value: "es", label: "Español" },
    { value: "sr", label: "Српски" },
    { value: "sr-Latn", label: "Srpski (latinica)" },
    { value: "it", label: "Italiano" },
    { value: "nl", label: "Nederlands" },
    { value: "pt", label: "Português (Portugal)" },
    { value: "pl", label: "Polski" },
    { value: "ro", label: "Română" },
    { value: "da", label: "Dansk" },
    { value: "sv", label: "Svenska" },
    { value: "bg", label: "Български" },
    { value: "ru", label: "Русский" },
    { value: "uk", label: "Українська" },
    { value: "hu", label: "Magyar" },
    { value: "sk", label: "Slovenčina" },
    { value: "cs", label: "Čeština" },
    { value: "sl", label: "Slovenščina" },
    { value: "lv", label: "Latviešu" },
    { value: "el", label: "Ελληνικά" },
  ]);
  const label = (language) => editor("washer", { language })._form.computeLabel({ name: "language" });
  assert.equal(label("it"), "Lingua");
  assert.equal(label("nl"), "Taal");
  assert.equal(label("pt"), "Idioma");
  assert.equal(label("pl"), "Język");
  assert.equal(label("ro"), "Limbă");
  assert.equal(label("da"), "Sprog");
  assert.equal(label("sv"), "Språk");
  assert.equal(label("bg"), "Език");
  assert.equal(label("ru"), "Язык");
  assert.equal(label("uk"), "Мова");
  assert.equal(label("hu"), "Nyelv");
  assert.equal(label("sk"), "Jazyk");
  assert.equal(label("cs"), "Jazyk");
  assert.equal(label("sl"), "Jezik");
  assert.equal(label("lv"), "Valoda");
  assert.equal(label("el"), "Γλώσσα");
  const card = new HomeConnectWasherCard();
  card.setConfig({});
  card.hass = { ...mockHass(), language: "pl" };
  assert.match(card.shadowRoot.innerHTML, /Pralka|Pracuje/);
  for (const [language, re] of [["ru", /Стиральная машина|Работает/], ["el", /Πλυντήριο ρούχων|Λειτουργεί/], ["cs", /Pračka|V provozu/]]) {
    const c = new HomeConnectWasherCard();
    c.setConfig({});
    c.hass = { ...mockHass(), language };
    assert.match(c.shadowRoot.innerHTML, re, language);
  }
});

test("editor offers Српски and Srpski (latinica) and follows them", () => {
  const options = editor("washer", {})._schema().find((s) => s.name === "language").selector.select.options;
  assert.deepEqual(
    JSON.parse(JSON.stringify(options.filter((o) => o.value.startsWith("sr")))),
    [
      { value: "sr", label: "Српски" },
      { value: "sr-Latn", label: "Srpski (latinica)" },
    ],
  );
  assert.equal(editor("washer", { language: "sr" })._form.computeLabel({ name: "name" }), "Назив");
  assert.equal(editor("washer", { language: "sr-Latn" })._form.computeLabel({ name: "name" }), "Naziv");
  assert.equal(editor("washer", {}, "sr-Latn")._form.computeLabel({ name: "language" }), "Jezik");
});

test("Intl gets pt-PT for Home Assistant's pt, keeps pt-BR, and the language option wins", () => {
  const locale = (config, hass) => {
    const card = new HomeConnectWasherCard();
    card.setConfig(config);
    card._hass = { ...mockHass(), ...hass };
    return card._locale();
  };
  assert.equal(locale({}, { language: "pt", locale: { language: "pt" } }), "pt-PT");
  assert.equal(locale({}, { language: "pt" }), "pt-PT");
  assert.equal(locale({}, { language: "pt-BR", locale: { language: "pt-BR" } }), "pt-BR");
  assert.equal(locale({}, { language: "de", locale: { language: "de-CH" } }), "de-CH");
  assert.equal(locale({ language: "pt" }, { language: "pt-BR", locale: { language: "pt-BR" } }), "pt-PT");
  assert.equal(locale({ language: "fr" }, { language: "pt", locale: { language: "pt" } }), "fr");
  assert.equal(locale({}, { language: "sr-Latn", locale: { language: "sr" } }), "sr-Latn");
});

test("finish time in sr-Latn is written in Latin script", () => {
  const card = new HomeConnectWasherCard();
  card.setConfig({ language: "sr-Latn" });
  card._hass = mockHass();
  const line = card._timeLine(new Date(Date.now() + 48 * 60000));
  assert.match(line, /^Završava se u .* · još 48 min$/);
  assert.doesNotMatch(line, /[\u0400-\u04FF]/);
});

test("editor offers Deutsch and Español and follows them", () => {
  assert.equal(editor("washer", { language: "de" })._form.computeLabel({ name: "name" }), "Name");
  assert.equal(editor("washer", { language: "es" })._form.computeLabel({ name: "name" }), "Nombre");
  assert.equal(editor("washer", {}, "es-ES")._form.computeLabel({ name: "name" }), "Nombre");
});

test("an option switch ending in _etat is never taken for the power switch", () => {
  const hass = mockHass();
  delete hass.states["switch.wm_power"];
  delete hass.entities["switch.wm_power"];
  hass.states["switch.wm_securite_enfants_etat"] = st("off");
  hass.entities["switch.wm_securite_enfants_etat"] = { entity_id: "switch.wm_securite_enfants_etat", device_id: "d2" };
  const card = new HomeConnectWasherCard();
  card.setConfig({ device_id: "d2" });
  card.hass = hass;
  assert.equal(card._resolve().ent.power, undefined);
  assert.doesNotMatch(card.shadowRoot.innerHTML, /data-action="power"/);
});

test("editor without a kind tells the dishwasher type from the washer type", () => {
  const kindOf = (type) => editor(undefined, { type })._schema().find((s) => s.name === "entities").schema.map((s) => s.name);
  assert.ok(kindOf("custom:home-connect-dishwasher-card").includes("salt"));
  assert.ok(kindOf("custom:home-connect-washer-card").includes("pause"));
  assert.ok(kindOf("custom:home-connect-washer-mini-card").includes("pause"));
});

test("renaming the device or switching 12/24 h redraws the card at once", () => {
  const hass = mockHass();
  const card = new HomeConnectWasherCard();
  card.setConfig({ device_id: "d2" });
  card.hass = hass;
  assert.match(card.shadowRoot.innerHTML, /Washer/);
  card.hass = { ...hass, devices: { ...hass.devices, d2: { name: "Washer", name_by_user: "Laundry" } } };
  assert.match(card.shadowRoot.innerHTML, /Laundry/);
  const before = card._sig;
  card.hass = { ...card._hass, locale: { time_format: "12" } };
  assert.notEqual(card._sig, before);
});

// A washer switched on, ready, with a program to pick and two option drop-downs and two option switches:
// the tallest layout (picker, options, Start).
function readyWithOptions() {
  const hass = mockHass({ washerState: "ready" });
  hass.states["select.wm_active_program"] = st("unavailable");
  const opt = (id, state, attributes) => {
    hass.states[id] = st(state, attributes);
    hass.entities[id] = { entity_id: id, device_id: "d2" };
  };
  opt("select.wm_temperature", "t40", { options: ["t30", "t40"] });
  opt("select.wm_spin_speed", "r1200", { options: ["r800", "r1200"] });
  opt("switch.wm_prewash", "off");
  opt("switch.wm_speed_perfect", "on");
  return hass;
}

test("getCardSize follows the blocks drawn (50 px rows, as measured on the captures)", () => {
  const sized = (Card, hass, config = {}) => {
    const card = new Card();
    card.setConfig(config);
    card.hass = hass;
    return card;
  };
  // Running: header, illustration and Pause / Stop, about 200 px (dishwasher.png): 4 rows.
  assert.equal(sized(HomeConnectWasherCard, mockHass()).getCardSize(), 4);
  // Ready with picker, two drop-downs, two switches and Start, about 364 px (washer.png): 7 rows.
  assert.equal(sized(HomeConnectWasherCard, readyWithOptions()).getCardSize(), 7);
  // Same appliance with the picker, options and controls hidden: back to the header and illustration.
  assert.equal(sized(HomeConnectWasherCard, readyWithOptions(), { show_program: false, show_options: false, show_controls: false }).getCardSize(), 3);
  // Mini, about 142 px (dishwasher-mini.png): 3 rows; zoomed, the full card's size.
  const Mini = customElements.get("home-connect-washer-mini-card");
  const mini = sized(Mini, readyWithOptions());
  assert.equal(mini.getCardSize(), 3);
  mini._setZoom(true);
  assert.equal(mini.getCardSize(), 7);
});

test("getCardSize before the first render (no hass yet) or for an unavailable appliance doesn't throw", () => {
  const card = new HomeConnectWasherCard();
  card.setConfig({ device_id: "d2" });
  assert.equal(card.getCardSize(), 4);
  const hass = readyWithOptions();
  for (const id of Object.keys(hass.states)) hass.states[id] = st("unavailable");
  card.hass = hass;
  assert.equal(card.getCardSize(), 3);
});

test("every kind of button has a hover and a keyboard focus style", () => {
  const css = new HomeConnectWasherCard()._styles();
  for (const cls of ["btn", "round", "toggle", "power", "link", "zoom"]) {
    assert.match(css, new RegExp(`\\.${cls}:hover`), `.${cls} has no :hover rule`);
    assert.match(css, new RegExp(`\\.${cls}:focus-visible`), `.${cls} has no :focus-visible rule`);
  }
});

test("time left: hours and minutes in the card's language, not a hard-coded h / min", () => {
  const line = (language, mins) => {
    const card = new HomeConnectWasherCard();
    card.setConfig({ language });
    card._hass = mockHass();
    return card._timeLine(new Date(Date.now() + mins * 60000));
  };
  assert.match(line("en", 65), /· 1 hr 5 min left$/);
  assert.match(line("en", 120), /· 2 hr left$/);
  assert.match(line("de", 65), /1 Std\. 5 Min\./);
  assert.match(line("sr", 65), /1 сат 5 мин/);
  assert.doesNotMatch(line("sr", 65), /[A-Za-z]/);
});

// A washer that finished 25 minutes ago, its door last moved at `doorAt` minutes ago.
function finishedWasher(door, doorAt) {
  const hass = mockHass({ washerState: "finished" });
  const ago = (m) => new Date(Date.now() - m * 60000).toISOString();
  hass.states["sensor.wm_operation_state"].last_changed = ago(25);
  hass.states["sensor.wm_door"] = { state: door, attributes: { options: ["open", "closed", "locked"] }, last_changed: ago(doorAt) };
  hass.entities["sensor.wm_door"] = { entity_id: "sensor.wm_door", device_id: "d2", translation_key: "door" };
  return hass;
}

test("finished, door not opened since: a reminder chip with the time since the end, on the full and mini cards", () => {
  // The door was closed before the end, or unlocked by the appliance as the program ended.
  for (const doorAt of [90, 24.5]) {
    const html = render(HomeConnectWasherCard, finishedWasher("closed", doorAt), { device_id: "d2" });
    assert.match(html, /class="chip warn clickable"[^>]*data-entity="sensor\.wm_door"[^>]*><ha-icon icon="mdi:bell-ring-outline"><\/ha-icon><span data-tick="waiting">Finished 25 minutes ago, door still closed</);
    assert.doesNotMatch(html, />Door closed</);
  }
  const Mini = customElements.get("home-connect-washer-mini-card");
  assert.match(render(Mini, finishedWasher("locked", 90), { device_id: "d2" }), /Finished 25 minutes ago, door still closed/);
  assert.match(render(HomeConnectWasherCard, finishedWasher("closed", 90), { device_id: "d2", language: "fr" }), /Terminé il y a 25 minutes, porte toujours fermée/);
});

test("no reminder once the door was opened, while it is open, without times, or with alerts off", () => {
  const html = (hass, config = {}) => render(HomeConnectWasherCard, hass, { device_id: "d2", ...config });
  assert.doesNotMatch(html(finishedWasher("closed", 10)), /door still closed/);
  assert.match(html(finishedWasher("closed", 10)), />Door closed</);
  assert.doesNotMatch(html(finishedWasher("open", 10)), /door still closed/);
  const noTimes = finishedWasher("closed", 90);
  delete noTimes.states["sensor.wm_door"].last_changed;
  assert.doesNotMatch(html(noTimes), /door still closed/);
  assert.doesNotMatch(html(finishedWasher("closed", 90), { show_alerts: false }), /door still closed/);
  const running = finishedWasher("closed", 90);
  running.states["sensor.wm_operation_state"].state = "run";
  assert.doesNotMatch(html(running), /door still closed/);
});

test("editor: the language dropdown starts with Automatic, shown while no language is set and removed when picked", () => {
  const ed = editor("washer", {});
  const options = ed._schema().find((s) => s.name === "language").selector.select.options;
  assert.deepEqual({ ...options[0] }, { value: "", label: "Automatic" });
  assert.equal(editor("washer", { language: "fr" })._schema().find((s) => s.name === "language").selector.select.options[0].label, "Automatique");
  let fired;
  ed.dispatchEvent = (ev) => {
    fired = ev.detail.config;
  };
  ed._valueChanged({ stopPropagation() {}, detail: { value: { type: "custom:smart-appliance-card", language: "" } } });
  assert.equal("language" in fired, false);
});

// A fridge whose climate entity reports its temperature (or not).
function fridge(state, current, unit) {
  const hass = mockHass();
  hass.states["climate.fr_fridge"] = st(state, current === undefined ? {} : { current_temperature: current });
  hass.entities["climate.fr_fridge"] = { entity_id: "climate.fr_fridge", device_id: "d3" };
  hass.devices.d3 = { name: "Fridge" };
  if (unit) hass.config = { unit_system: { temperature: unit } };
  return hass;
}

test("climate chip: no chip without a finite temperature, else the number in the card's locale and HA's unit", () => {
  const chip = (hass, config = {}) => {
    const m = render(HomeConnectWasherCard, hass, { device_id: "d3", kind: "fridge", ...config }).match(/data-entity="climate\.fr_fridge"[^>]*><ha-icon[^>]*><\/ha-icon>([^<]*)</);
    return m ? m[1] : null;
  };
  const card = new HomeConnectWasherCard();
  card.setConfig({ device_id: "d3", kind: "fridge" });
  card.hass = fridge("cool", 4.25, "°C");
  assert.ok(card._r.ent.temps.includes("climate.fr_fridge"), "the climate entity is not a temperature of the fridge");
  assert.equal(chip(fridge("cool", 4.25, "°C")), "4.3 °C");
  assert.equal(chip(fridge("cool", 4.25, "°C"), { language: "fr" }), "4,3 °C");
  assert.equal(chip(fridge("cool", -18, "°F")), "-18 °F");
  assert.equal(chip(fridge("cool", 5)), "5 °");
  for (const hass of [fridge("cool", null, "°C"), fridge("cool", undefined, "°C"), fridge("unavailable", 4, "°C"), fridge("cool", "abc", "°C")]) {
    assert.equal(chip(hass), null);
  }
});

test("door reminder after a Home Assistant restart: the recorder's history decides, fetched once", async () => {
  // Restart: every state got the same new last_changed. The history says the program ended 25 minutes ago and the
  // door was last closed 2 hours ago (a restart row repeats each value).
  const hass = finishedWasher("closed", 3);
  const now = Date.now() / 1000;
  hass.states["sensor.wm_operation_state"].last_changed = hass.states["sensor.wm_door"].last_changed;
  const calls = [];
  let rows = {
    "sensor.wm_operation_state": [{ s: "run", lu: now - 7200 }, { s: "finished", lu: now - 1500 }, { s: "finished", lu: now - 180 }],
    "sensor.wm_door": [{ s: "open", lu: now - 8000 }, { s: "closed", lu: now - 7200 }, { s: "closed", lu: now - 180 }],
  };
  hass.callWS = (msg) => {
    calls.push(msg);
    return Promise.resolve(rows);
  };
  const card = new HomeConnectWasherCard();
  card.setConfig({ device_id: "d2" });
  card.hass = hass;
  // No reminder until the history answers.
  assert.doesNotMatch(card.shadowRoot.innerHTML, /door still closed/);
  await new Promise((r) => setTimeout(r));
  assert.match(card.shadowRoot.innerHTML, /Finished 25 minutes ago, door still closed/);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].type, "history/history_during_period");
  assert.deepEqual([...calls[0].entity_ids], ["sensor.wm_operation_state", "sensor.wm_door"]);
  card.hass = { ...hass };
  assert.equal(calls.length, 1, "history fetched again for the same states");

  // The door was opened and closed again after the end, before the restart: no reminder.
  const again = finishedWasher("closed", 3);
  again.states["sensor.wm_operation_state"].last_changed = again.states["sensor.wm_door"].last_changed;
  rows = { ...rows, "sensor.wm_door": [{ s: "closed", lu: now - 7200 }, { s: "open", lu: now - 1200 }, { s: "closed", lu: now - 1100 }, { s: "closed", lu: now - 180 }] };
  again.callWS = () => Promise.resolve(rows);
  const c2 = new HomeConnectWasherCard();
  c2.setConfig({ device_id: "d2" });
  c2.hass = again;
  await new Promise((r) => setTimeout(r));
  assert.doesNotMatch(c2.shadowRoot.innerHTML, /door still closed/);
  assert.match(c2.shadowRoot.innerHTML, />Door closed</);
});

test("door reminder after a restart: no reminder when the program ended before the history window", async () => {
  const now = Date.now() / 1000;
  const start = now - 48 * 3600;
  // Both values held since before the window: the first row is the window start, not a change.
  const both = { "sensor.wm_operation_state": [{ s: "finished", lu: start }, { s: "finished", lu: now - 180 }], "sensor.wm_door": [{ s: "closed", lu: start }, { s: "closed", lu: now - 180 }] };
  // The door closed before the window, the program ended inside it: the reminder shows.
  const doorOld = { "sensor.wm_operation_state": [{ s: "run", lu: start }, { s: "finished", lu: now - 1500 }, { s: "finished", lu: now - 180 }], "sensor.wm_door": both["sensor.wm_door"] };
  const html = async (rows) => {
    const hass = finishedWasher("closed", 3);
    hass.states["sensor.wm_operation_state"].last_changed = hass.states["sensor.wm_door"].last_changed;
    hass.callWS = () => Promise.resolve(rows);
    const card = new HomeConnectWasherCard();
    card.setConfig({ device_id: "d2" });
    card.hass = hass;
    await new Promise((r) => setTimeout(r));
    return card.shadowRoot.innerHTML;
  };
  const old = await html(both);
  assert.doesNotMatch(old, /door still closed/);
  assert.match(old, />Door closed</);
  assert.match(await html(doorOld), /Finished 25 minutes ago, door still closed/);
});

test("door reminder: ended is the operation state's last change only, not the phase's", () => {
  const hass = finishedWasher("closed", 10);
  hass.states["sensor.wm_operation_state"].last_changed = new Date(Date.now() - 25 * 60000).toISOString();
  hass.states["sensor.wm_phase"] = { state: "finished", attributes: {}, last_changed: new Date(Date.now() - 2 * 60000).toISOString() };
  hass.entities["sensor.wm_phase"] = { entity_id: "sensor.wm_phase", device_id: "d2", translation_key: "phase" };
  assert.doesNotMatch(render(HomeConnectWasherCard, hass, { device_id: "d2", entities: { phase: "sensor.wm_phase" } }), /door still closed/);
});

test("30 s tick rewrites the time texts in place instead of rebuilding the card (animations keep running)", () => {
  const hass = finishedWasher("closed", 90);
  const card = new HomeConnectWasherCard();
  card.setConfig({ device_id: "d2" });
  card.hass = hass;
  const before = card.shadowRoot.innerHTML;
  const el = { dataset: { tick: "waiting" }, textContent: "Finished 25 minutes ago, door still closed" };
  card.shadowRoot.querySelectorAll = () => [el];
  card._tickInfo.waiting = new Date(Date.now() - 40 * 60000);
  card._tick();
  assert.equal(el.textContent, "Finished 40 minutes ago, door still closed");
  assert.equal(card.shadowRoot.innerHTML, before, "the card was rebuilt");
});

test("animations pause while the card is off screen or the tab hidden", () => {
  const css = new HomeConnectWasherCard()._styles();
  assert.match(css, /:host\(\[paused\]\) \* \{ animation-play-state: paused !important; \}/);
  const card = new HomeConnectWasherCard();
  card._offscreen = true;
  card._setPaused();
  assert.equal(card.attributes.paused, true);
  card._offscreen = false;
  card._setPaused();
  assert.equal(card.attributes.paused, false);
});

test("cycle energy: the running cycle's kWh from the meter, then the last cycle's once it ended", async () => {
  const now = Date.now() / 1000;
  const withMeter = (opState, meter) => {
    const hass = mockHass({ opState });
    hass.states["sensor.wm_energy"] = st(String(meter), { device_class: "energy", unit_of_measurement: "kWh" });
    hass.entities["sensor.wm_energy"] = { entity_id: "sensor.wm_energy", device_id: "d2" };
    return hass;
  };
  const show = async (hass, rows, config = {}) => {
    const calls = [];
    hass.callWS = (msg) => {
      calls.push(msg);
      return Promise.resolve(rows);
    };
    const card = new HomeConnectWasherCard();
    card.setConfig({ device_id: "d2", ...config });
    card.hass = hass;
    await new Promise((r) => setTimeout(r));
    const m = card.shadowRoot.innerHTML.match(/mdi:lightning-bolt"><\/ha-icon>([^<]*)/);
    return { text: m ? m[1].trim() : null, calls };
  };
  const running = await show(withMeter("run", 10.5), {
    "sensor.wm_operation_state": [{ s: "ready", lu: now - 9000 }, { s: "run", lu: now - 3600 }],
    "sensor.wm_energy": [{ s: "10.0", lu: now - 7200 }, { s: "10.3", lu: now - 1800 }],
  });
  assert.equal(running.text, "This cycle: 0.5 kWh");
  // With a price (fixed, or a price sensor that wins over it), the cost in Home Assistant's currency.
  const priced = withMeter("run", 10.5);
  priced.config = { currency: "EUR" };
  priced.states["sensor.tariff"] = st("0.25", { unit_of_measurement: "EUR/kWh" });
  const rows = {
    "sensor.wm_operation_state": [{ s: "ready", lu: now - 9000 }, { s: "run", lu: now - 3600 }],
    "sensor.wm_energy": [{ s: "10.0", lu: now - 7200 }, { s: "10.3", lu: now - 1800 }],
  };
  assert.equal((await show(priced, rows, { energy_price: 0.2 })).text, "This cycle: 0.5 kWh · ≈ €0.10");
  assert.equal((await show(priced, rows, { energy_price: 0.2, energy_price_entity: "sensor.tariff" })).text, "This cycle: 0.5 kWh · ≈ €0.13");
  assert.equal(running.calls.length, 1);
  assert.deepEqual([...running.calls[0].entity_ids], ["sensor.wm_operation_state", "sensor.wm_energy"]);

  const finished = await show(withMeter("finished", 6), {
    "sensor.wm_operation_state": [{ s: "run", lu: now - 7200 }, { s: "pause", lu: now - 5000 }, { s: "run", lu: now - 4800 }, { s: "finished", lu: now - 1200 }],
    "sensor.wm_energy": [{ s: "5.0", lu: now - 9000 }, { s: "5.4", lu: now - 3600 }, { s: "5.9", lu: now - 1300 }, { s: "6.0", lu: now - 600 }],
  });
  assert.equal(finished.text, "Last cycle: 0.9 kWh");

  // A per-program meter (Miele) starts again from 0: the drop is a reset, not a negative use.
  const reset = await show(withMeter("run", 0.6), {
    "sensor.wm_operation_state": [{ s: "ready", lu: now - 9000 }, { s: "run", lu: now - 3600 }],
    "sensor.wm_energy": [{ s: "1.2", lu: now - 9000 }, { s: "0.1", lu: now - 3000 }],
  });
  assert.equal(reset.text, "This cycle: 0.6 kWh");

  // No cycle in the history, no meter, or turned off: no chip.
  assert.equal((await show(withMeter("ready", 3), { "sensor.wm_operation_state": [{ s: "ready", lu: now - 9000 }], "sensor.wm_energy": [] })).text, null);
  const off = await show(withMeter("run", 10.5), {}, { show_energy: false });
  assert.equal(off.text, null);
  assert.equal(off.calls.length, 0);
  const none = await show(mockHass(), {});
  assert.equal(none.calls.length, 0);
});
