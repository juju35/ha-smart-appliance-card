// ── smart-appliance-card-editor (visual editor, built on HA's ha-form) ──────────
import { SMART_APPLIANCE_CARD_VERSION, pickerDefine } from "./card-picker.js";
import { hcLang, hcT } from "./i18n-helpers.js";
import { HC_BRANDS, HC_COLD, HC_KINDS, HC_OVERRIDABLE, HC_PLATFORMS, HC_ROLES } from "./appliance-profiles.js";
import { HomeConnectDishwasherCard, HomeConnectWasherCard, SmartApplianceCard } from "./shadow-dom-patching.js";
import { HomeConnectDishwasherMiniCard, HomeConnectWasherMiniCard, SmartApplianceMiniCard } from "./mini-cards.js";

export var HC_EDITOR_DEFAULTS = { illustration: true, illustration_theme: 'auto', show_title: true, show_subtitle: true, show_program: true, show_controls: true, show_options: true, show_alerts: true, show_power: true, show_energy: true, zoom: true };

export class HomeConnectCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    var prevLang = this._hass?.language;
    this._hass = hass;
    if (this._form && prevLang === (hass?.language)) {
      this._form.hass = hass;
    } else {
      this._render();
    }
  }

  _lang() {
    return hcLang((this._config?.language) || (this._hass?.language));
  }

  _schema() {
    var t = (k) => hcT(this._lang(), k);
    // The former per-appliance card types fix the kind; the single card follows the appliance picked.
    var kind = this.kind || this._config.kind || HC_KINDS.find((k) => new RegExp(`-${k.replace(/_/g, '-')}-(mini-)?card$`).test(this._config.type || '')) || null;
    // Doors and alerts may be binary sensors (Home Connect Local, Miele…), the running program a sensor.
    var domains = { operation_state: 'sensor', door: ['sensor', 'binary_sensor'], progress: 'sensor', finish_time: 'sensor',
      selected_program: 'select', active_program: ['select', 'sensor'], power: 'switch', stop: 'button',
      pause: 'button', resume: 'button', remote_start: 'binary_sensor', remote_control: 'binary_sensor', connectivity: 'binary_sensor',
      salt: ['sensor', 'binary_sensor'], rinse_aid: ['sensor', 'binary_sensor'], energy: 'sensor', watts: 'sensor' };
    // Pause / resume only exist on washers, salt / rinse aid only on dishwashers.
    var only = { pause: 'washer', resume: 'washer', salt: 'dishwasher', rinse_aid: 'dishwasher' };
    var roles = HC_OVERRIDABLE.filter((r) => !only[r] || !kind || only[r] === kind);
    var kinds = HC_KINDS.map((k) => ({ value: k, label: t(k) }));
    var brands = Object.keys(HC_BRANDS).map((k) => ({ value: k, label: HC_BRANDS[k].name }));
    return [
      { name: 'device_id', selector: { device: { filter: HC_PLATFORMS.map((i) => ({ integration: i })) } } },
      {
        type: 'grid', name: '', schema: [
          { name: 'kind', selector: { select: { mode: 'dropdown', options: kinds } } },
          { name: 'brand', selector: { select: { mode: 'dropdown', options: brands } } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'name', selector: { text: {} } },
          { name: 'icon', selector: { icon: {} } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'illustration', selector: { boolean: {} } },
          { name: 'illustration_theme', selector: { select: { mode: 'dropdown', options: ['auto', 'day', 'night'].map((v) => ({ value: v, label: t(`theme_${v}`) })) } } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'show_title', selector: { boolean: {} } },
          { name: 'show_subtitle', selector: { boolean: {} } },
          { name: 'show_program', selector: { boolean: {} } },
          { name: 'show_controls', selector: { boolean: {} } },
          { name: 'show_options', selector: { boolean: {} } },
          { name: 'show_alerts', selector: { boolean: {} } },
          { name: 'show_power', selector: { boolean: {} } },
          { name: 'show_energy', selector: { boolean: {} } },
        ].concat(this.mini || /-mini-card$/.test(this._config.type || '') ? [{ name: 'zoom', selector: { boolean: {} } }] : []),
      },
      // "Too warm" thresholds of the cold appliances.
    ].concat(!kind || HC_COLD.indexOf(kind) >= 0 ? [{
      type: 'grid', name: '', schema: [
        { name: 'temperature_alert', selector: { number: { min: -40, max: 40, step: 0.5, mode: 'box' } } },
        { name: 'freezer_temperature_alert', selector: { number: { min: -40, max: 20, step: 0.5, mode: 'box' } } },
      ],
    }] : []).concat([
      // The cost of a cycle next to its energy (the energy chip, on the mini card too).
      {
        type: 'grid', name: '', schema: [
          { name: 'energy_price', selector: { number: { min: 0, step: 0.0001, mode: 'box' } } },
          { name: 'energy_price_entity', selector: { entity: { domain: 'sensor' } } },
        ],
      },
    ], [
      {
        name: 'language',
        selector: { select: { mode: 'dropdown', options: [{ value: '', label: t('ed_language_auto') }, { value: 'fr', label: 'Français' }, { value: 'en', label: 'English' }, { value: 'de', label: 'Deutsch' }, { value: 'es', label: 'Español' }, { value: 'sr', label: 'Српски' }, { value: 'sr-Latn', label: 'Srpski (latinica)' }, { value: 'it', label: 'Italiano' }, { value: 'nl', label: 'Nederlands' }, { value: 'pt', label: 'Português (Portugal)' }, { value: 'pl', label: 'Polski' }, { value: 'ro', label: 'Română' }, { value: 'da', label: 'Dansk' }, { value: 'sv', label: 'Svenska' }, { value: 'bg', label: 'Български' }, { value: 'ru', label: 'Русский' }, { value: 'uk', label: 'Українська' }, { value: 'hu', label: 'Magyar' }, { value: 'sk', label: 'Slovenčina' }, { value: 'cs', label: 'Čeština' }, { value: 'sl', label: 'Slovenščina' }, { value: 'lv', label: 'Latviešu' }, { value: 'el', label: 'Ελληνικά' }] } },
      },
      {
        type: 'expandable', name: 'entities', title: t('ed_entities'), flatten: false,
        schema: roles.map((r) => ({ name: r, selector: { entity: { domain: domains[r] } } })),
      },
    ]);
  }

  _render() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.addEventListener('value-changed', (ev) => this._valueChanged(ev));
      this.appendChild(this._form);
    }
    var lang = this._lang();
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.computeLabel = (s) => {
      if (HC_ROLES[s.name] || HC_OVERRIDABLE.indexOf(s.name) >= 0) return hcT(lang, `en_${s.name}`);
      return hcT(lang, `ed_${s.name}`);
    };
    this._form.computeHelper = (s) => {
      var key = `ed_${s.name}_helper`;
      var txt = hcT(lang, key);
      return txt === key ? undefined : txt;
    };
    // No language set shows as Automatic (picking it removes the option again, see _valueChanged).
    this._form.data = Object.assign({}, HC_EDITOR_DEFAULTS, { language: '' }, this._config);
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left empty or at their default.
    Object.keys(value).forEach((key) => {
      if (value[key] === '' || value[key] === null || value[key] === undefined) delete value[key];
    });
    Object.keys(HC_EDITOR_DEFAULTS).forEach((key) => {
      if (value[key] === HC_EDITOR_DEFAULTS[key]) delete value[key];
    });
    if (value.entities) {
      var e = Object.assign({}, value.entities);
      Object.keys(e).forEach((k) => { if (!e[k]) delete e[k]; });
      if (Object.keys(e).length) value.entities = e; else delete value.entities;
    }
    if (this._config.type) value = Object.assign({ type: this._config.type }, value);
    var lang = this._lang();
    this._config = value;
    // A new language option relabels the form.
    if (lang !== this._lang()) this._render();
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('smart-appliance-card-editor')) {
  pickerDefine('smart-appliance-card-editor', HomeConnectCardEditor);
}

window.customCards = window.customCards || [];
export var HC_DOCS = 'https://github.com/juju35/ha-smart-appliance-card';
[
  ['smart-appliance-card', SmartApplianceCard, 'Smart Appliance Card',
    'Animated card for washers, dryers, dishwashers, ovens, coffee machines, hoods, fridges… (Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool, Matter)'],
  ['smart-appliance-mini-card', SmartApplianceMiniCard, 'Smart Appliance Mini Card', 'Compact appliance card that unfolds into the full card'],
].forEach(([type, cls, name, description]) => {
  if (customElements.get(type)) return;
  pickerDefine(type, cls);
  window.customCards.push({ type, name, description, preview: true, documentationURL: HC_DOCS });
});
// The former Home Connect card types keep working in existing dashboards; they are no longer offered in the card picker.
[
  ['home-connect-dishwasher-card', HomeConnectDishwasherCard],
  ['home-connect-washer-card', HomeConnectWasherCard],
  ['home-connect-dishwasher-mini-card', HomeConnectDishwasherMiniCard],
  ['home-connect-washer-mini-card', HomeConnectWasherMiniCard],
].forEach(([type, cls]) => {
  if (!customElements.get(type)) pickerDefine(type, cls);
});

console.info(`%c SMART-APPLIANCE-CARD %c v${SMART_APPLIANCE_CARD_VERSION} `, 'color:#fff;background:#1e88e5;font-weight:700', 'color:#1e88e5;background:#fff');
