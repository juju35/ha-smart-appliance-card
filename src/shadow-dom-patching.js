// ── Shadow DOM patching ───────────────────────────────────────────────────────
// A render is applied to the nodes already there (text, attributes and classes updated in place) instead of
// replacing the whole shadow root: replaced nodes made the card lose a few pixels of height for a frame on every state
// update (icons empty until loaded, illustration rebuilt, animations restarted), and the dashboard's scroll anchoring
// then moved the page. Form controls get their live value too (an attribute alone no longer moves a used <select>).
// A custom element (ha-icon, ha-card…) may set attributes on itself (a style, a state): it only loses those the
// previous render gave it (hcTplAttrs) and are no longer in this one.
import { HC_CYCLE_ACTIVE, HC_CYCLE_HISTORY, HC_CYCLE_REFRESH, HC_DOOR_GRACE, HC_DOOR_HISTORY, HC_ERROR_TIMEOUT, HC_NO_POWER_OFF, HC_RETRYABLE, HC_RETRY_DELAY, hcCycleEnergy, hcDelay, hcErrText, hcEsc, hcLang, hcLocale, hcNoPowerOff, hcSince, hcT } from "./i18n-helpers.js";
import { HC_ALERT_ON, HC_ALL_ROLES, HC_ART, HC_ART_OPEN, HC_BRAND_LOGOS, HC_CMD_PRESS, HC_CMD_SELECTS, HC_CMD_TOGGLES, HC_COLD, HC_CUSTOM_ALERT_ON, HC_FREEZER_WORDS, HC_HOT, HC_OPERATION_OPTIONS, HC_PROFILES, HC_PX, HC_STATE_COLORS, HC_TOO_WARM, hcBrand, hcChip, hcCustomAlerts, hcDeviceRoles, hcFindDevice, hcFocusKey, hcHumanize, hcKindOf, hcMinutes, hcNormState, hcOwnEntities, hcPicture, hcRows, hcTempPairs } from "./appliance-profiles.js";
import { HC_BANNER_DROP, HC_BANNER_STYLE, HC_ICON_COLORS, HC_LAUNDRY, HC_SCENES, PILL_GAP_PX, PILL_GROUND_PX, hcIsNight } from "./illustrated-header.js";

export var hcUid = 0;

export function hcIsCustom(el) { return el.localName.includes('-'); }
export const hcTplAttrs = new WeakMap();
export function hcMarkTemplate(n) {
  if (n.nodeType !== 1) return;
  for (const el of [n, ...n.querySelectorAll('*')]) if (hcIsCustom(el)) hcTplAttrs.set(el, new Set(el.getAttributeNames()));
}
export function hcPatchAttrs(cur, next) {
  const custom = hcIsCustom(cur);
  const owned = custom ? hcTplAttrs.get(cur) || new Set() : null;
  for (const name of cur.getAttributeNames()) if (!next.hasAttribute(name) && (!custom || owned.has(name))) cur.removeAttribute(name);
  for (const { name, value } of next.attributes) if (cur.getAttribute(name) !== value) cur.setAttribute(name, value);
  if (custom) hcTplAttrs.set(cur, new Set(next.getAttributeNames()));
  if (cur.localName === 'option' && cur.selected !== next.hasAttribute('selected')) cur.selected = next.hasAttribute('selected');
}
export function hcKeyOf(n) { return n.nodeType === 1 ? n.getAttribute('data-key') : null; }
export function hcSameNode(a, b) { return !!a && a.nodeType === b.nodeType && a.nodeName === b.nodeName; }
export function hcPatchChildren(cur, next) {
  const old = [...cur.childNodes];
  const fresh = [...next.childNodes];
  const byKey = new Map();
  for (const o of old) {
    const k = hcKeyOf(o);
    if (k !== null && !byKey.has(k)) byKey.set(k, o);
  }
  const used = new Set();
  fresh.forEach((n, i) => {
    const k = hcKeyOf(n);
    let o = k !== null ? byKey.get(k) : old[i];
    if (!hcSameNode(o, n) || used.has(o) || (k === null && hcKeyOf(o) !== null)) o = null;
    const ref = cur.childNodes[i] ?? null;
    if (!o) {
      hcMarkTemplate(n);
      cur.insertBefore(n, ref);
      return;
    }
    used.add(o);
    if (o !== ref) cur.insertBefore(o, ref);
    if (n.nodeType === 1) {
      hcPatchAttrs(o, n);
      // A custom element the template leaves empty (ha-icon) draws its own children: they are kept.
      if (n.childNodes.length || !hcIsCustom(o)) hcPatchChildren(o, n);
    } else if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
  });
  while (cur.childNodes.length > fresh.length) cur.removeChild(cur.lastChild);
}
// Without a DOM (the unit tests' stand-in shadow root), the HTML is only written.
export function hcMorph(root, html) {
  if (!root.childNodes) {
    root.innerHTML = html;
    return;
  }
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  hcPatchChildren(root, tpl.content);
}

export class HomeConnectBaseCard extends HTMLElement {
  static get kind() { return 'dishwasher'; }

  constructor() {
    super();
    // Switches (power, option pills) with a command on its way: their button stays disabled until it is answered.
    this._pending = new Set();
  }

  static getConfigElement() {
    var el = document.createElement('smart-appliance-card-editor');
    // biome-ignore lint/complexity/noThisInStatic: subclasses override static kind
    el.kind = this.kind;
    return el;
  }

  static getStubConfig(hass) {
    // biome-ignore lint/complexity/noThisInStatic: subclasses override static kind
    var id = hcFindDevice(hass, this.kind);
    return id ? { device_id: id } : {};
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this._config = Object.assign({
      show_program: true, show_controls: true, show_options: true, show_alerts: true, show_power: true, show_energy: true,
    }, config);
    // show_title / show_subtitle: the header's title / subtitle, hidden by the stylesheet
    this.toggleAttribute?.("hide-title", config.show_title === false);
    this.toggleAttribute?.("hide-subtitle", config.show_subtitle === false);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.addEventListener('click', (ev) => this._onClick(ev));
      this.shadowRoot.addEventListener('change', (ev) => this._onChange(ev));
      // A focused <select> blocks re-renders (see _update): Escape or leaving the card releases it.
      var unfreeze = () => {
        var a = this.shadowRoot.activeElement;
        if (a && a.tagName === 'SELECT') {
          a.blur();
          this._update();
        }
      };
      this.shadowRoot.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') unfreeze();
        var id = ev.composedPath()[0]?.dataset?.entity;
        if (id && (ev.key === 'Enter' || ev.key === ' ')) {
          ev.preventDefault();
          this._moreInfo(id);
        }
      });
      this.addEventListener('mouseleave', unfreeze);
      // Touch: a drop-down closed without a change only loses focus. Re-check once focus has moved.
      this.shadowRoot.addEventListener('focusout', () => setTimeout(() => this._update()));
    }
    this._sig = null;
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  connectedCallback() {
    Promise.resolve().then(() => this._fitAfterCard());
    // Refresh the remaining time every 30 s while a program with a finish time runs and the card is on screen.
    clearInterval(this._timer);
    this._timer = setInterval(() => this._tick(), 30000);
    // The illustration's animations pause while the card is off screen or the browser tab hidden.
    if (!this._onVisibility) this._onVisibility = () => this._setPaused();
    document.addEventListener('visibilitychange', this._onVisibility);
    if (typeof IntersectionObserver === 'function') {
      this._io?.disconnect();
      this._io = new IntersectionObserver((entries) => {
        this._offscreen = !entries[entries.length - 1].isIntersecting;
        this._setPaused();
      });
      this._io.observe(this);
    }
    this._watchPill();
    // Back on screen: redraw now (state reset on disconnect) instead of waiting for the next hass update.
    this._update();
  }

  disconnectedCallback() {
    clearInterval(this._timer);
    document.removeEventListener('visibilitychange', this._onVisibility);
    this._io?.disconnect();
    this._io = null;
    this._unwatchPill();
    clearTimeout(this._confirmTimer);
    clearTimeout(this._errorTimer);
    // The cancelled timers would have reset these: an armed Stop or an old error must not survive leaving the view.
    this._confirming = null;
    this._error = null;
    this._sig = null;
  }

  _setPaused() { this.toggleAttribute('paused', !!(this._offscreen || document.hidden)); }

  // The 30 s tick only rewrites the time texts in place: rebuilding the card would restart its animations. A progress
  // worked out from the clock (finish time and total duration) still needs the bar redrawn.
  _tick() {
    var i = this._tickInfo;
    if (!this._ticking || !i || !this.shadowRoot) return;
    if (i.clockProgress) {
      this._sig = null;
      this._update();
      return;
    }
    this.shadowRoot.querySelectorAll('[data-tick]').forEach((el) => {
      if (el.dataset.tick === 'zone') {
        var left = this._leftText(new Date(el.dataset.finish));
        if (el.lastChild && el.lastChild.nodeValue !== left) el.lastChild.nodeValue = left;
        return;
      }
      var fmt = { left: this._leftText, ends: this._endsAt, time: this._timeLine }[el.dataset.tick] || this._timeLine;
      var txt = el.dataset.tick === 'waiting'
        ? (i.waiting && this._t('door_waiting').replace('{t}', this._ago(i.waiting)))
        : el.dataset.tick === 'start' ? (i.start && this._startsText(i.start))
          : (i.finish && fmt.call(this, i.finish));
      if (txt && el.textContent !== txt) el.textContent = txt;
    });
  }

  // Masonry columns are balanced on this: the height of the blocks last drawn, in 50 px rows.
  getCardSize() { return this._rows || (this._compact() ? 3 : 4); }

  getGridOptions() { return { columns: 12, min_columns: 6 }; }

  _lang() {
    return hcLang((this._config?.language) || (this._hass?.language) || document.documentElement.lang);
  }

  _t(k) { return hcT(this._lang(), k); }

  _locale() { return hcLocale(this._lang(), this._hass, !!this._config?.language); }

  _deviceId() {
    var hass = this._hass, c = this._config;
    if (c.device_id) return c.device_id;
    if (c.entity && hass.entities?.[c.entity]) return hass.entities[c.entity].device_id;
    return hcFindDevice(hass, c.kind || this.constructor.kind);
  }

  _resolve() {
    var deviceId = this._deviceId();
    var found = hcDeviceRoles(this._hass, deviceId);
    var over = this._config.entities || {};
    var ent = {};
    HC_ALL_ROLES.forEach((role) => {
      ent[role] = over[role] || found.roles[role];
    });
    // Super modes and the hood's fan level stay settings the card offers.
    var used = HC_ALL_ROLES.filter((role) => role !== 'boost' && role !== 'venting' && role !== 'child_lock').map((role) => ent[role]);
    // Everything else the integration exposes as a switch or select is a program option.
    ent.option_switches = found.switches.filter((id) => used.indexOf(id) < 0);
    ent.option_selects = found.selects.filter((id) => used.indexOf(id) < 0);
    ent.temps = found.temps || [];
    ent.zones = found.zones || [];
    return { deviceId: deviceId, ent: ent, platform: found.platform };
  }

  _st(id) { return id && this._hass.states[id]; }

  _val(id) { var s = this._st(id); return s ? s.state : undefined; }

  _avail(id) { var v = this._val(id); return v !== undefined && v !== 'unavailable' && v !== 'unknown'; }

  _fmt(id, value) {
    var s = this._st(id);
    if (!s) return hcHumanize(value);
    var v = value === undefined ? s.state : value;
    if (this._hass.formatEntityState) {
      var out = this._hass.formatEntityState(s, v);
      // Without a translation HA echoes the raw key back.
      if (out && out !== v) return out;
    }
    return hcHumanize(v);
  }

  _entityLabel(id, deviceName) {
    var s = this._st(id);
    var name = (s?.attributes.friendly_name) || id;
    if (deviceName && name.indexOf(deviceName) === 0) name = name.slice(deviceName.length).trim();
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  _update() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    var r = this._resolve();
    var ids = HC_ALL_ROLES.map((role) => r.ent[role]).concat(r.ent.option_switches, r.ent.option_selects, r.ent.temps,
      ...r.ent.zones.map((z) => z.ids), hcCustomAlerts(this._config).map((a) => a.entity));
    var hass = this._hass;
    // Home Assistant replaces a state object when it changes: the same objects as last time give the same text, so
    // an update of another entity costs a comparison instead of a serialisation.
    var refs = ids.map((id) => id && hass.states[id]);
    var prev = this._stRefs;
    var states = prev && prev.length === refs.length && refs.every((s, i) => s === prev[i]) ? this._stText : JSON.stringify(refs.map((s, i) =>
      // Climate temperatures and the fan's speed live in attributes.
      s ? [ids[i], s.state, s.attributes.options, s.attributes.current_temperature, s.attributes.percentage] : null));
    this._stRefs = refs;
    this._stText = states;
    // An error message goes away as soon as the appliance's state changes.
    if (this._error) {
      if (this._error.states == null) this._error.states = states;
      else if (this._error.states !== states) this._clearError();
    }
    // The device name and the 12/24 h preference are drawn too: a rename or a locale change redraws at once.
    var dev = r.deviceId && hass.devices ? hass.devices[r.deviceId] : null;
    var sig = JSON.stringify([this._lang(), r.deviceId, dev ? [dev.name_by_user, dev.name] : null,
      hass.locale?.time_format, this._zoomed, this._confirming, this._reloading, this._starting,
      this._error ? [this._error.key, this._error.detail] : null, this._config.illustration !== false && hcIsNight(hass, this._config), hcNoPowerOff.has(this._powerKey(r)), Array.from(this._pending), states]);
    if (sig === this._sig) return;
    // Don't rebuild while a dropdown is open in the card.
    var active = this.shadowRoot.activeElement;
    if (active && active.tagName === 'SELECT') return;
    this._sig = sig;
    this._r = r;
    // A control the patch could not keep (another layout): the one that had the keyboard focus gets it back (an armed Stop
    // must stay focused for a second Enter to confirm it).
    var focus = hcFocusKey(active);
    this._render(r);
    this._fitPill();
    this._fitAfterCard();
    if (focus) this._refocus(focus);
  }

  // The status pill goes on the title row, right after the title, only when the whole title and the pill's whole
  // label fit there; otherwise it takes its own line under the subtitle (the subtitle then on one line). In the
  // banner, when title, subtitle and pill still do not fit above the ground strip (or the pill's label runs past the
  // text, over the picture), the pill keeps its dot only.
  // Measured after each render and on every new width (or once the web font is loaded), never by a fixed width.
  _fitPill() {
    for (const t of this.shadowRoot?.querySelectorAll?.(".titles") || []) {
      const row = t.querySelector?.(".trow");
      const name = row?.querySelector(".name");
      const chips = row ? [...row.children].filter((n) => n.classList.contains("st")) : [];
      if (!name?.getBoundingClientRect || !chips.length) continue;
      t.classList.remove("pill-below", "pill-dot");
      // The title's whole width (scrollWidth is rounded: 1 px more, so that a title that fits is never cut).
      const need = chips.reduce((w, c) => w + PILL_GAP_PX + c.getBoundingClientRect().width, name.scrollWidth + 1);
      if (need <= row.getBoundingClientRect().width + 0.5) continue;
      t.classList.add("pill-below");
      const banner = t.closest(".banner");
      if (!banner) continue;
      const box = banner.getBoundingClientRect();
      const ground = box.bottom - PILL_GROUND_PX;
      const right = t.getBoundingClientRect().right;
      const out = [name, ...t.querySelectorAll(".sub"), ...chips].some((n) => {
        const r = n.getBoundingClientRect();
        return r.height > 0 && (r.top < box.top - 0.5 || r.bottom > ground + 0.5 || r.right > right + 0.5);
      });
      if (out) t.classList.add("pill-dot");
    }
  }

  // <ha-card> (Lit) draws its slot a microtask after it is created: until then the card's content has no size, and the
  // status pill measured then would take the wrong line (the card then changed height once measured again). A new
  // <ha-card> is measured once more as soon as it has rendered, before the frame is painted.
  // Rendered before the card is on the page, <ha-card> is only upgraded once connected: called again then (see
  // connectedCallback).
  _fitAfterCard() {
    const card = this.shadowRoot?.querySelector?.('ha-card');
    if (!card?.updateComplete || card === this._fitCard) return;
    this._fitCard = card;
    card.updateComplete?.then?.(() => this._fitPill());
  }

  _watchPill() {
    if (typeof ResizeObserver !== "function") return;
    this._pillResize ??= new ResizeObserver((entries) => {
      const w = Math.round(entries.at(-1).contentRect.width);
      if (w === this._pillWidth) return;
      this._pillWidth = w;
      cancelAnimationFrame(this._pillFrame);
      this._pillFrame = requestAnimationFrame(() => this._fitPill());
    });
    this._pillResize.observe(this);
    document.fonts?.ready?.then(() => this._fitPill());
  }

  _unwatchPill() {
    this._pillResize?.disconnect();
    this._pillWidth = null;
    if (typeof cancelAnimationFrame === "function") cancelAnimationFrame(this._pillFrame);
  }

  _refocus(focus) {
    var el = Array.from(this.shadowRoot.querySelectorAll(`[data-${focus[0]}]`)).find((n) => n.dataset[focus[0]] === focus[1]);
    // preventScroll: a button clicked earlier keeps the focus, and every later render (hass update, 30 s tick)
    // gives it back; that must not scroll the dashboard back to the card.
    if (el) el.focus({ preventScroll: true });
  }

  _powerKey(r) { return r.deviceId || r.ent.power; }

  // Overridden by the mini cards.
  _compact() { return false; }

  _zoomButton() { return ''; }

  // "Ends at 10:32 · 1 hr 5 min left", shared between the full and mini layouts. The 12 h / 24 h
  // preference follows the Home Assistant locale; the card language picks the words and the unit names.
  _timeLine(finish) {
    return `${this._endsAt(finish)} · ${this._leftText(finish)}`;
  }

  // "Ends at 10:32": the full card's line under the bar, the time left being beside the percentage.
  _endsAt(finish) {
    return `${this._t('ends_at')} ${this._clock(finish)}`;
  }

  // "Starts at 01:00 · in 1 hr 51 min": a delayed start's line.
  _startsText(start) {
    return `${this._t('starts_at')} ${this._clock(start)} · ${this._t('starts_in').replace('{t}', this._until(start))}`;
  }

  // A time of day, 12 h or 24 h as the Home Assistant locale says.
  _clock(date) {
    var opts = { hour: '2-digit', minute: '2-digit' };
    var tf = this._hass.locale?.time_format;
    if (tf === '12' || tf === '24') opts.hour12 = tf === '12';
    return date.toLocaleTimeString(this._locale(), opts);
  }

  // "25 minutes ago", "3 hours ago", "yesterday", in the card's language.
  _ago(date) {
    var rtf = new Intl.RelativeTimeFormat(this._locale(), { numeric: 'auto' });
    var mins = Math.max(1, Math.round((Date.now() - date.getTime()) / 60000));
    if (mins < 60) return rtf.format(-mins, 'minute');
    var h = Math.round(mins / 60);
    return h < 48 ? rtf.format(-h, 'hour') : rtf.format(-Math.round(h / 24), 'day');
  }

  // When a finished program still waits behind a closed door: the time it ended (the operation state's last change),
  // if the door hasn't moved since (or only as the appliance unlocked it). Null otherwise, or when the states carry
  // no times.
  _doorWaiting(ent, door) {
    if (door !== 'closed' && door !== 'locked') return null;
    var opId = ent.operation_state || ent.phase;
    var op = this._st(opId), d = this._st(ent.door);
    var ended = op?.last_changed ? Date.parse(op.last_changed) : Number.NaN;
    var moved = d?.last_changed ? Date.parse(d.last_changed) : Number.NaN;
    if (Number.isNaN(ended) || Number.isNaN(moved)) return null;
    // Both changed within a minute: the appliance unlocked its door as the program ended, or Home Assistant restarted
    // and gave every state a new last_changed. The recorder's history tells them apart; no reminder until it answers.
    if (Math.abs(moved - ended) <= HC_DOOR_GRACE) {
      var h = this._doorHistory(opId, ent.door, op, d);
      if (!h) return null;
      ended = h.ended;
      moved = h.moved;
      // Ended before the history window (the door unchanged as long, or not): too old to tell, no reminder.
      if (!Number.isFinite(ended)) return null;
    }
    if (moved > ended + HC_DOOR_GRACE) return null;
    return new Date(ended);
  }

  // When the operation state and the door really took their current values, from the recorder (fetched once per
  // pair of states). Falls back to last_changed for an entity the recorder doesn't keep, or without history.
  _doorHistory(opId, doorId, op, d) {
    var key = JSON.stringify([opId, doorId, op.state, op.last_changed, d.state, d.last_changed]);
    var h = this._doorHist;
    if (h && h.key === key) return h.done ? h : null;
    h = this._doorHist = { key: key };
    var done = (res) => Object.assign(h, {
      done: true,
      ended: hcSince(res?.[opId], op.state) ?? Date.parse(op.last_changed),
      moved: hcSince(res?.[doorId], d.state) ?? Date.parse(d.last_changed),
    });
    if (!this._hass.callWS) return done(null);
    this._hass.callWS({
      type: 'history/history_during_period', start_time: new Date(Date.now() - HC_DOOR_HISTORY).toISOString(),
      entity_ids: [opId, doorId], minimal_response: true, no_attributes: true, significant_changes_only: false,
    }).then(done, () => done(null)).then(() => {
      if (this._doorHist !== h) return;
      this._sig = null;
      this._update();
    });
    return null;
  }

  // Energy of the running or last cycle, from the recorder (history of the operation state and the meter), read again
  // when the operation state changes and every few minutes while a cycle runs. Null until it answers.
  _cycleEnergy(ent, platform) {
    var opId = ent.operation_state, meterId = ent.energy;
    var op = this._st(opId), meter = this._st(meterId);
    if (!op || !meter || !this._hass.callWS) return null;
    var now = Date.now();
    var key = JSON.stringify([opId, meterId, op.state, op.last_changed]);
    var h = this._cycleHist;
    var running = HC_CYCLE_ACTIVE.indexOf(hcNormState(platform, op.state)) >= 0;
    if (!h || h.key !== key || (running && h.done && now - h.at > HC_CYCLE_REFRESH)) {
      h = this._cycleHist = { key: key, at: now, rows: h?.key === key ? h.rows : null };
      this._hass.callWS({
        type: 'history/history_during_period', start_time: new Date(now - HC_CYCLE_HISTORY).toISOString(),
        entity_ids: [opId, meterId], minimal_response: true, no_attributes: true, significant_changes_only: false,
      }).then((res) => res, () => null).then((res) => {
        if (this._cycleHist !== h) return;
        h.done = true;
        h.rows = res;
        this._sig = null;
        this._update();
      });
    }
    if (!h.rows) return null;
    return hcCycleEnergy(h.rows[opId], h.rows[meterId], platform, Number(meter.state), now);
  }

  _energyChip(ent, platform) {
    if (!this._config.show_energy || !ent.energy) return '';
    var cycle = this._cycleEnergy(ent, platform);
    if (!cycle) return '';
    var unit = this._st(ent.energy).attributes.unit_of_measurement || 'kWh';
    var value = `${new Intl.NumberFormat(this._locale(), { maximumFractionDigits: unit === 'Wh' ? 0 : 2 }).format(cycle.used)} ${unit}`;
    var cost = this._cycleCost(unit === 'Wh' ? cycle.used / 1000 : unit === 'MWh' ? cycle.used * 1000 : cycle.used);
    if (cost) value += ` · ≈ ${cost}`;
    return hcChip('chip extra', 'mdi:lightning-bolt', hcEsc(this._t(cycle.active ? 'cycle_energy' : 'last_cycle_energy').replace('{e}', value)), ent.energy);
  }

  // What `kwh` costs at `energy_price_entity` (a sensor in currency/kWh) or else `energy_price`, in Home Assistant's
  // currency; '' without a price.
  _cycleCost(kwh) {
    var c = this._config;
    var st = c.energy_price_entity && this._st(c.energy_price_entity);
    var price = st ? Number(st.state) : Number(c.energy_price);
    if (!(price > 0) || !(kwh >= 0)) return '';
    var currency = this._hass.config?.currency;
    var fmt = currency
      ? new Intl.NumberFormat(this._locale(), { style: 'currency', currency: currency, maximumFractionDigits: 2 })
      : new Intl.NumberFormat(this._locale(), { maximumFractionDigits: 2 });
    return fmt.format(kwh * price);
  }

  // Start / Pause / Resume, drawn as labelled bars (full card) or round icons (mini card).
  _actionButtons(ent, state, running, round) {
    var btn = (action, icon, labelKey, primary, disabled, title) => {
      var label = this._t(labelKey);
      return round
        ? `<button class="round${primary ? ' primary' : ''}" data-action="${action}" title="${hcEsc(title || label)}" aria-label="${hcEsc(label)}"${disabled ? ' disabled' : ''}><ha-icon icon="${icon}"></ha-icon></button>`
        : `<button class="btn${primary ? ' primary' : ''}" data-action="${action}"${disabled ? ' disabled' : ''}${title ? ` title="${hcEsc(title)}"` : ''}><ha-icon icon="${icon}"></ha-icon>${hcEsc(label)}</button>`;
    };
    var btns = [];
    var remoteOk = !ent.remote_start || this._val(ent.remote_start) === 'on';
    if (!running && this._cmd('start')) {
      btns.push(btn('start', 'mdi:play', this._starting ? 'starting' : 'start', true,
        !remoteOk || this._starting || this._reloading, remoteOk ? '' : this._t('remote_start_off')));
    }
    if (state === 'run' && this._cmd('pause')) btns.push(btn('pause', 'mdi:pause', 'pause', false, false, ''));
    if (state === 'pause' && this._cmd('resume')) btns.push(btn('resume', 'mdi:play', 'resume', true, false, ''));
    return { btns: btns, remoteOk: remoteOk };
  }

  // How an action reaches the appliance: a button to press, an option of its operation select, or, for a Home
  // Connect start, the selected program put on the active program select. Null when the appliance can't.
  _cmd(action) {
    var r = this._r, ent = r.ent;
    if (action === 'start' && r.platform === 'home_connect') {
      return ent.active_program && this._avail(ent.selected_program)
        ? { domain: 'select', service: 'select_option', data: { entity_id: ent.active_program, option: this._val(ent.selected_program) } } : null;
    }
    // Miele and LocalThings resume with their Start button.
    var btnId = ent[action] || (action === 'resume' && (r.platform === 'miele' || r.platform === 'localthings') ? ent.start : undefined);
    // A button entity stays `unknown` until first pressed: only `unavailable` (or no state at all) rules it out.
    var v = this._val(btnId);
    if (btnId && v !== undefined && v !== 'unavailable') return { domain: 'button', service: 'press', data: { entity_id: btnId } };
    var sel = this._st(ent.operation), want = HC_OPERATION_OPTIONS[r.platform]?.[action];
    if (sel && want && this._avail(ent.operation)) {
      var opt = want.find((o) => (sel.attributes.options || []).indexOf(o) >= 0);
      if (opt) return { domain: 'select', service: 'select_option', data: { entity_id: ent.operation, option: opt } };
    }
    return null;
  }

  _render(r) {
    var c = this._config, ent = r.ent, hass = this._hass;
    // The appliance itself decides the look (its programs, its type), then the `kind` option, then the card type.
    var kind = (r.deviceId && hcKindOf(hass, r.deviceId)) || c.kind || this.constructor.kind || 'dishwasher';
    if (!HC_PROFILES[kind]) kind = 'dishwasher';
    var profile = HC_PROFILES[kind];
    var dev = r.deviceId && hass.devices ? hass.devices[r.deviceId] : null;
    var deviceName = dev ? String(dev.name_by_user || dev.name || '').trim() : '';
    var name = c.name || deviceName || this._t(kind);
    var icon = c.icon || profile.icon;
    this._brand = hcBrand(dev, c.brand);
    this._ticking = false;

    if (!r.deviceId && !c.entities) {
      this._rows = 1;
      hcMorph(this.shadowRoot, `${this._styles()}<ha-card><div class="empty"><ha-icon icon="${hcEsc(icon)}"></ha-icon>${this._t('no_device')}</div></ha-card>`);
      return;
    }

    var raw = this._val(ent.operation_state);
    var opState = hcNormState(r.platform, raw, this._val(ent.phase), kind);
    // Without a state sensor (a fridge, a hood) the appliance is online while any of its entities is.
    var online = ent.connectivity ? this._val(ent.connectivity) === 'on'
      : (ent.operation_state ? this._avail(ent.operation_state) && opState !== 'unavailable'
        : HC_ALL_ROLES.concat(['temps']).some((role) => [].concat(ent[role] || []).some((id) => this._avail(id))));
    var powerOn = ent.power ? this._val(ent.power) === 'on' : (opState ? opState !== 'inactive' && opState !== 'off' : !!profile.simple);
    var state = !online ? 'unavailable'
      : (!powerOn && (!opState || opState === 'inactive' || opState === 'off') ? 'off' : (opState || (profile.simple ? 'ready' : 'off')));
    // Appliances without a program are at work while a super mode, the hood's fan or a hob zone is on.
    if (profile.simple && online && state === 'ready' && this._busy(ent)) state = 'run';
    // A hob whose state sensor is one of its zones (LG ThinQ reports a state per location) cooks while any zone is on.
    if (profile.simple && online && state === 'off' && ent.zones.some((z) => this._zoneOn(z))) state = 'run';
    var running = !profile.simple && (state === 'run' || state === 'pause' || state === 'delayedstart' || state === 'actionrequired');
    var color = HC_STATE_COLORS[state] || 'var(--disabled-text-color, #9e9e9e)';
    this._iconColor = HC_ICON_COLORS[state] || '';
    this._illustrated = c.illustration !== false;
    // A wine cabinet's inside light glows in the illustration while it is on.
    this._lit = kind === 'wine_cooler' && online && this._val(ent.light) === 'on';

    // Program shown: the running one if any, else the selected one, else the program the integration reports.
    var progId = this._avail(ent.active_program) ? ent.active_program : ent.selected_program;
    var progLabel = this._avail(progId) ? this._fmt(progId) : '';
    var progVal = this._val(ent.program);
    // hOn says "No program" when none runs.
    if (!progLabel && this._avail(ent.program) && progVal !== 'no_program' && progVal !== 'No program') progLabel = this._fmt(ent.program);

    // Progress and finish time: given by the integration, or worked out from the time left, elapsed or in total.
    var num = (id) => (this._avail(id) && !Number.isNaN(Number(this._val(id))) ? Number(this._val(id)) : null);
    var progress = num(ent.progress);
    var finish = this._avail(ent.finish_time) ? new Date(this._val(ent.finish_time)) : null;
    if (finish && Number.isNaN(finish.getTime())) finish = null;
    // A LocalThings oven cooking without a timer still reports a percentage (stuck at 0 or 1): no finish, no progress.
    if (r.platform === 'localthings' && !finish && hcMinutes(this._st(ent.remaining)) == null) progress = null;
    // Times left and elapsed in minutes, converted from the unit the sensor is shown in.
    var mins = (id) => (this._avail(id) ? hcMinutes(this._st(id)) : null);
    var left = mins(ent.remaining), elapsed = mins(ent.elapsed), total = num(ent.total);
    // A delayed start with its countdown (Home Connect Local): the program starts then, and the time left is its
    // whole duration, so it ends that much after the start.
    var startIn = state === 'delayedstart' ? mins(ent.start_in) : null;
    var startAt = startIn != null && startIn > 0 ? new Date(Date.now() + startIn * 60000) : null;
    if (!finish && running && left != null && left > 0) finish = new Date((startAt ? startAt.getTime() : Date.now()) + left * 60000);
    var clockProgress = false;
    if (progress == null && running) {
      if (left != null && elapsed != null && left + elapsed > 0) progress = (100 * elapsed) / (left + elapsed);
      else if (finish && total) {
        progress = 100 * (1 - (finish.getTime() - Date.now()) / 60000 / total);
        clockProgress = true;
      }
    }
    if (progress != null) progress = Math.max(0, Math.min(100, progress));
    var timeLine = running && finish ? this._timeLine(finish) : '';
    this._ticking = !!(running && finish);
    // A hob's zones (after the line above: a zone timer keeps the tick running too).
    var zonesHtml = this._compact() ? '' : this._zonesHtml(ent, deviceName, online);
    this._nSetpoints = 0;
    var setpointsHtml = this._compact() ? '' : this._setpointsHtml(ent, kind, deviceName, online);

    // While a program runs, integrations that report its step say more than "Running" (spinning, drying…).
    var statusText = this._t(`st_${state}`);
    var runKey = `st_run_${kind}`;
    if (state === 'run' && profile.simple && this._t(runKey) !== runKey) statusText = this._t(runKey);
    else if (state === 'run' && r.platform !== 'home_connect') {
      // hOn's phase 0 is "Ready", between two steps.
      var detail = this._avail(ent.phase) && ['none', 'not_running'].indexOf(this._val(ent.phase)) < 0 && !(r.platform === 'hon' && this._val(ent.phase) === '0')
        ? ent.phase : ent.operation_state;
      if (this._avail(detail) && hcNormState(r.platform, this._val(detail)) !== this._val(detail)) statusText = this._fmt(detail);
    }
    if (statusText === `st_${state}`) statusText = this._fmt(ent.operation_state);

    // Header chips: door + alerts.
    var chips = [];
    var door = this._val(ent.door);
    // Doors other integrations report as binary sensors: on is open.
    if (ent.door && ent.door.indexOf('binary_sensor.') === 0) door = door === 'on' ? 'open' : (door === 'off' ? 'closed' : undefined);
    // Finished but not emptied: the door chip turns into a reminder, with the time since the program ended.
    var waiting = c.show_alerts && online && state === 'finished' ? this._doorWaiting(ent, door) : null;
    this._tickInfo = { finish: running ? finish : null, start: startAt, waiting: waiting, clockProgress: clockProgress };
    if (waiting) {
      chips.push(hcChip('chip warn', 'mdi:bell-ring-outline', `<span data-tick="waiting">${hcEsc(this._t('door_waiting').replace('{t}', this._ago(waiting)))}</span>`, ent.door));
      this._ticking = true;
    } else if (online && door && ['open', 'closed', 'locked'].indexOf(door) >= 0) {
      var dIcon = door === 'open' ? 'mdi:door-open' : (door === 'locked' ? 'mdi:door-closed-lock' : 'mdi:door-closed');
      chips.push(hcChip(`chip${door === 'open' ? ' warn' : ''}`, dIcon, this._t(`door_${door}`), ent.door));
    }
    if (online) chips = chips.concat(this._infoChips(ent, kind, state, deviceName));
    chips = chips.concat(this._ownSensorChips());
    if (online && !profile.simple) {
      var energyChip = this._energyChip(ent, r.platform);
      if (energyChip) chips.push(energyChip);
    }
    if (c.show_alerts) {
      [['salt', 'mdi:shaker-outline'], ['rinse_aid', 'mdi:water-alert-outline'], ['bean_container', 'mdi:coffee-off-outline'],
        ['water_tank', 'mdi:cup-water'], ['drip_tray', 'mdi:tray-full'], ['descale', 'mdi:water-opacity'], ['clean', 'mdi:spray-bottle'],
        ['idos_1', 'mdi:cup-outline'], ['idos_2', 'mdi:cup-outline']].forEach((a) => {
        var v = this._val(ent[a[0]]);
        if (v === 'full' ? a[0] === 'drip_tray' : HC_ALERT_ON.indexOf(v) >= 0) chips.push(hcChip('chip warn', a[1], this._t(a[0]), ent[a[0]]));
      });
      if (online) chips = chips.concat(this._tempAlerts(ent, kind, deviceName));
      chips = chips.concat(this._customAlerts());
    }
    if (!online) chips.push(`<span class="chip"><ha-icon icon="mdi:cloud-off-outline"></ha-icon>${this._t('offline')}</span>`);

    // Program picker.
    var programHtml = '';
    if (c.show_program && online && powerOn) {
      if (!running && this._st(ent.selected_program)) {
        var sel = this._st(ent.selected_program);
        var opts = (sel.attributes.options || []).map((o) =>
          `<option value="${hcEsc(o)}"${o === sel.state ? ' selected' : ''}>${hcEsc(this._fmt(ent.selected_program, o))}</option>`).join('');
        var placeholder = this._avail(ent.selected_program) ? '' : `<option value="" selected disabled>${this._t('no_program')}</option>`;
        programHtml = `<label class="field"><span>${this._t('program')}</span><select data-select="${hcEsc(ent.selected_program)}">${placeholder}${opts}</select></label>`;
      } else if (progLabel && !running) {
        programHtml = `<div class="field"><span>${this._t('program')}</span><div class="prog">${hcEsc(progLabel)}</div></div>`;
      }
    }

    // Program options: selects (temperature, spin…) and switches (intensive zone, hygiene…).
    var optionsHtml = '', optPx = 0;
    // Options can't be changed once a program runs, so they're only shown before starting.
    if (c.show_options && online && powerOn && !running) {
      // Options the selected program doesn't support (or not loaded yet) stay visible, greyed out.
      var optIds = ent.option_selects.concat(ent.option_switches).filter((id) => this._st(id));
      var anyAvail = optIds.some((id) => this._avail(id));
      var selects = ent.option_selects.filter((id) => this._st(id)).map((id) => {
        var s = this._st(id), ok = this._avail(id);
        var o = ok
          ? (s.attributes.options || []).map((v) =>
            `<option value="${hcEsc(v)}"${v === s.state ? ' selected' : ''}>${hcEsc(this._fmt(id, v))}</option>`).join('')
          : '<option selected>—</option>';
        return `<label class="field small"><span>${hcEsc(this._entityLabel(id, deviceName))}</span><select data-select="${hcEsc(id)}"${ok ? '' : ' disabled'}>${o}</select></label>`;
      }).join('');
      var toggles = ent.option_switches.filter((id) => this._st(id)).map((id) => {
        var ok = this._avail(id), on = ok && this._val(id) === 'on';
        return '<button class="toggle' + (on ? ' on' : '') + '" data-toggle="' + hcEsc(id) + '" aria-pressed="' + on + '"' + (ok && !this._pending.has(id) ? '' : ' disabled') + '>' +
          '<ha-icon icon="' + (on ? 'mdi:checkbox-marked-circle' : 'mdi:checkbox-blank-circle-outline') + '"></ha-icon>' + hcEsc(this._entityLabel(id, deviceName)) + '</button>';
      }).join('');
      // Home Connect only loads options when the selected program changes, so after
      // a Home Assistant restart they all stay unavailable until then.
      var reload = '';
      if (optIds.length && !anyAvail) {
        var canReload = this._avail(ent.selected_program) && (this._st(ent.selected_program).attributes.options || []).length > 1;
        // While someone turns the dial on the appliance, Home Assistant can't read the options and
        // switching programs from here is refused: the button waits for remote control to come back.
        var local = this._localControl(ent);
        var reloadOff = this._reloading || this._starting || local;
        reload = '<div class="reload"><span>' + this._t(local ? 'options_local' : 'options_not_loaded') + '</span>' +
          (canReload ? `<button class="link" data-action="reload_options"${reloadOff ? ' disabled' : ''}${local ? ` title="${hcEsc(this._t('options_local'))}"` : ''}><ha-icon icon="mdi:refresh"></ha-icon>${this._t('reload_options')}</button>` : '') + '</div>';
      }
      if (selects || toggles) {
        // Drop-downs sit three to a row at the usual card width, the option pills about three to a row too.
        var nSel = ent.option_selects.filter((id) => this._st(id)).length;
        var nTog = ent.option_switches.filter((id) => this._st(id)).length;
        optPx = HC_PX.section + Math.ceil(nSel / 3) * HC_PX.selectRow + Math.ceil(nTog / 3) * HC_PX.toggleRow + (reload ? HC_PX.reload : 0);
        optionsHtml = '<div class="section"><div class="section-title"><ha-icon icon="mdi:tune-variant"></ha-icon>' + this._t('options') + '</div>' +
          (selects ? `<div class="grid">${selects}</div>` : '') +
          (toggles ? `<div class="toggles">${toggles}</div>` : '') + reload + '</div>';
      }
    }

    // Commands of your own (`commands`): drop-downs, pills and buttons of other entities, whatever the appliance does.
    var own = this._compact() ? { html: '', px: 0 } : this._commandsHtml();

    // Controls.
    var controls = '';
    if (c.show_controls && online && powerOn) {
      var ab = this._actionButtons(ent, state, running, false);
      var btns = ab.btns;
      if (running && this._cmd('stop')) {
        var confirming = this._confirming === 'stop';
        btns.push(`<button class="btn danger${confirming ? ' armed' : ''}" data-action="stop"><ha-icon icon="mdi:stop"></ha-icon>${this._t(confirming ? 'confirm' : 'stop')}</button>`);
      }
      if (btns.length) controls = `<div class="controls">${btns.join('')}</div>`;
      if (!running && !ab.remoteOk && btns.length) controls += `<div class="hint"><ha-icon icon="mdi:information-outline"></ha-icon>${this._t('remote_start_off')}</div>`;
    }

    // Once an appliance refused to turn off, the button only serves to turn it on.
    var noOff = powerOn && hcNoPowerOff.has(this._powerKey(r));
    var powerBusy = this._pending.has(ent.power);
    var powerTitle = this._t(noOff ? 'power_off_unsupported' : 'power');
    var powerBtn = c.show_power && ent.power && online
      ? `<button class="power${powerOn ? ' on' : ''}" data-action="power" title="${hcEsc(powerTitle)}" aria-label="${this._t('power')}" aria-pressed="${!!powerOn}"${noOff || powerBusy ? ' disabled' : ''}><ha-icon icon="mdi:power"></ha-icon></button>`
      : '';

    var errorHtml = this._error
      ? `<div class="error" role="alert" title="${hcEsc(this._error.detail)}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>${hcEsc(this._t(this._error.key))}</span></div>`
      : '';

    // Hero: the appliance next to its state (and progress while a program runs).
    var big = '';
    // Other integrations may give no progress at all (Whirlpool): the state then stands alone, with the finish time.
    var noPct = this._noPct = running && progress == null && r.platform !== 'home_connect';
    if (startAt) {
      // Waiting for a delayed start: when it starts, and when it will end, rather than a bar still at 0 %.
      big = `<div class="big pill-echo"><span class="state-big">${hcEsc(statusText)}</span></div>` +
        `<div class="time" data-tick="start">${hcEsc(this._startsText(startAt))}</div>` +
        (finish ? `<div class="time" data-tick="ends">${hcEsc(this._endsAt(finish))}</div>` : '');
    } else if ((running && !noPct) || state === 'finished') {
      var pct = state === 'finished' ? 100 : (progress == null ? 0 : progress);
      // The state is in the header pill: beside the percentage, the time left instead (the finish time under the bar).
      // Without a finish time, the state stays there only for a card so narrow that the pill keeps just its dot.
      var label = `<span class="state pill-echo">${hcEsc(statusText)}</span>` +
        (running && finish ? `<span class="state" data-tick="left">${hcEsc(this._leftText(finish))}</span>` : '');
      big = '<div class="big"><span class="pct">' + Math.round(pct) + '<small> %</small></span>' + label + '</div>' +
        '<div class="bar"><div class="fill" style="width:' + pct + '%"></div></div>' +
        (running && finish ? `<div class="time" data-tick="ends">${hcEsc(this._endsAt(finish))}</div>` : '');
    } else {
      // Idle, ready, delayed: the state is the pill's; written big again only when the pill keeps just its dot.
      big = `<div class="big pill-echo"><span class="state-big">${hcEsc(statusText)}</span></div>${timeLine ? `<div class="time" data-tick="time">${hcEsc(timeLine)}</div>` : ''}`;
    }
    var art = c.icon
      ? `<div class="badge"><ha-icon icon="${hcEsc(icon)}"></ha-icon></div>`
      : ((door === 'open' && HC_ART_OPEN[kind]) || HC_ART[kind] || HC_ART.dishwasher);
    var infoHtml = '<div class="info">' + big + (chips.length ? `<div class="chips">${chips.join('')}</div>` : '') + '</div>';
    // Illustrated header: the appliance stands in the banner, the state and its chips fill the row under it.
    var heroHtml = this._illustrated ? `<div class="hero">${infoHtml}${powerBtn}</div>`
      : `<div class="hero">${hcPicture(art, state, !c.icon, this._lit)}${infoHtml}</div>`;

    var logo = `<div class="logo" aria-hidden="true"><ha-icon icon="${hcEsc(profile.icon)}"></ha-icon>${this._badge()}</div>`;
    var sub = progLabel || this._t(kind);
    // The banner always shows the appliance (a custom `icon` only replaces the classic layout's illustration).
    var illus = (door === 'open' && HC_ART_OPEN[kind]) || HC_ART[kind] || HC_ART.dishwasher;
    // The state is in the pill next to the title: the subtitle names the program (else the appliance).
    var banner = () => this._banner({ name, sub, status: statusText, icon: profile.icon, art: illus, state, kind });

    if (this._compact()) {
      this._rows = hcRows(HC_PX.miniBase + (this._error ? HC_PX.error : 0));
      hcMorph(this.shadowRoot, this._miniHtml({ c, ent, name, color, state, statusText, running, online, powerOn, progress,
        finish, startAt, progLabel, chips: chips.filter((x) => x.indexOf('chip warn') >= 0 || x.indexOf('chip extra') >= 0 || !online), art, logo, powerBtn,
        banner: this._illustrated ? banner() : '' }));
      return;
    }

    // With the illustrated header the state row holds no picture: its own lines set its height.
    var base = this._illustrated ? HC_PX.bannerBase + (timeLine ? HC_PX.bannerTime : 0) + (chips.length ? HC_PX.bannerChips : 0) : HC_PX.base;
    var nZones = zonesHtml ? ent.zones.length : 0;
    this._rows = hcRows(base + (nZones ? HC_PX.section + Math.ceil(nZones / 2) * HC_PX.zoneRow : 0) +
      (this._nSetpoints ? HC_PX.section + this._nSetpoints * HC_PX.stepRow : 0) + (programHtml ? HC_PX.program : 0) + optPx + own.px + (errorHtml ? HC_PX.error : 0) +
      (controls ? HC_PX.controls : 0) + (controls.indexOf('class="hint"') >= 0 ? HC_PX.hint : 0));
    hcMorph(this.shadowRoot, this._styles(color) + '<ha-card>' +
      (this._illustrated ? banner() : '<div class="header">' + logo +
        '<div class="titles"><div class="trow"><div class="name">' + hcEsc(name) + '</div>' + this._pill(statusText) + '</div>' +
          '<div class="sub" title="' + hcEsc(sub) + '">' + this._brandLogo() + hcEsc(sub) + '</div></div>' +
        powerBtn + this._zoomButton() +
      '</div>') +
      heroHtml + zonesHtml + setpointsHtml + programHtml + optionsHtml + own.html + errorHtml + controls +
    '</ha-card>');
  }

  // A program-less appliance at work: a super mode on, the hood's fan turning or venting, a hob zone on, its light aside.
  _busy(ent) {
    if (this._val(ent.boost) === 'on') return true;
    if ((ent.zones || []).some((z) => this._zoneOn(z))) return true;
    if (this._val(ent.fan) === 'on') return true;
    var v = this._val(ent.venting);
    return !!(v && this._avail(ent.venting) && !/fan_off$|_off$/.test(v));
  }

  // A zone's power level: a number (LG ThinQ, `max` from the number entity), Miele's `plate_step_<n>` (`plate_step_1_5`
  // is level 1.5), or a named step (warming, boost); null when the zone only reports a state.
  _zoneLevel(z) {
    if (!this._avail(z.level)) return null;
    var v = String(this._val(z.level));
    var m = /^(?:plate_step_)?(\d+)(?:[_.](\d+))?$/.exec(v);
    if (m) return { n: Number(m[2] ? `${m[1]}.${m[2]}` : m[1]), max: Number(this._st(z.level).attributes.max) || null };
    return { n: null, text: v.indexOf('plate_step_') === 0 ? hcHumanize(v.slice(11)) : this._fmt(z.level) };
  }

  _zoneOn(z) {
    var lv = this._zoneLevel(z);
    if (lv) return lv.n == null ? true : lv.n > 0;
    var st = this._val(z.state);
    return !!(st && this._avail(z.state) && ['power_off', 'off', 'initial', 'standby', 'sleep'].indexOf(st) < 0);
  }

  // A zone's timer as a finish time: a timestamp, or a duration left counted from its last change.
  _zoneFinish(z) {
    var s = this._st(z.timer);
    if (!s || !this._avail(z.timer)) return null;
    if (s.attributes.device_class === 'timestamp') {
      var d = new Date(s.state);
      return Number.isNaN(d.getTime()) || d.getTime() <= Date.now() ? null : d;
    }
    var m = hcMinutes(s);
    if (!m || m <= 0) return null;
    var from = Date.parse(s.last_changed || '');
    return new Date((Number.isNaN(from) ? Date.now() : from) + m * 60000);
  }

  // "12 min left", "1 hr 5 min left".
  _leftText(finish) {
    return this._t('remaining').replace('{t}', this._until(finish));
  }

  // "12 min", "1 hr 5 min" from now until `date`.
  _until(date) {
    var mins = Math.max(0, Math.round((date.getTime() - Date.now()) / 60000));
    var h = Math.floor(mins / 60), m = mins % 60;
    var unit = (u, n) => new Intl.NumberFormat(this._locale(), { style: 'unit', unit: u, unitDisplay: 'short' }).format(n);
    return h && m ? `${unit('hour', h)} ${unit('minute', m)}` : (h ? unit('hour', h) : unit('minute', m));
  }

  // A zone's label: what its entities' names share once the device name is cut ("Left front" from "Left front power
  // level" and "Left front remaining time"), as leading or trailing words; a lone entity keeps its whole name.
  _zoneLabel(z, deviceName) {
    var names = z.ids.map((id) => this._entityLabel(id, deviceName).split(/\s+/));
    if (names.length < 2) return names[0].join(' ');
    var lead = 0, tail = 0, a = names[0];
    while (lead < a.length && names.every((w) => w[lead] && w[lead].toLowerCase() === a[lead].toLowerCase())) lead++;
    while (tail < a.length && names.every((w) => w.length > tail && w[w.length - 1 - tail].toLowerCase() === a[a.length - 1 - tail].toLowerCase())) tail++;
    var words = lead >= tail ? a.slice(0, lead) : a.slice(a.length - tail);
    if (!words.length) return a.join(' ');
    var t = words.join(' ');
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  // The hob's cooking zones, two or three to a row: each in its tile, its level (or state) and the time its timer has left.
  _zonesHtml(ent, deviceName, online) {
    var zones = ent.zones || [];
    if (!online || !zones.length) return '';
    var on = zones.filter((z) => this._zoneOn(z)).length;
    var tiles = zones.map((z) => {
      var active = this._zoneOn(z), lv = this._zoneLevel(z);
      var value;
      if (lv && lv.n != null && active) {
        var n = new Intl.NumberFormat(this._locale(), { maximumFractionDigits: 1 }).format(lv.n);
        value = hcEsc(n) + (lv.max ? `<small> / ${hcEsc(String(lv.max))}</small>` : '');
      } else if (lv && lv.text) value = hcEsc(lv.text);
      else if (!active) value = hcEsc(this._t('st_off'));
      else value = hcEsc(this._fmt(z.state));
      var finish = active ? this._zoneFinish(z) : null;
      if (finish) this._ticking = true;
      var sub = finish
        ? `<span class="zt" data-tick="zone" data-finish="${finish.toISOString()}"><ha-icon icon="mdi:timer-outline"></ha-icon>${hcEsc(this._leftText(finish))}</span>`
        : (lv && z.state && this._avail(z.state) && active ? `<span class="zt">${hcEsc(this._fmt(z.state))}</span>` : '');
      var id = z.level || z.state;
      return `<div class="zone${active ? ' on' : ''}" role="button" tabindex="0" data-entity="${hcEsc(id)}">` +
        `<span class="zic"><ha-icon icon="${active ? 'mdi:circle-slice-8' : 'mdi:circle-outline'}"></ha-icon></span>` +
        `<span class="ztx"><span class="zn">${hcEsc(this._zoneLabel(z, deviceName))}</span><span class="zv">${value}</span>${sub}</span></div>`;
    }).join('');
    return '<div class="section"><div class="section-title"><ha-icon icon="mdi:grid-large"></ha-icon><span>' + hcEsc(this._t('zones')) + '</span>' +
      `<span class="aside">${hcEsc(this._t('zones_on').replace('{n}', on).replace('{t}', zones.length))}</span></div>` +
      `<div class="zones">${tiles}</div></div>`;
  }

  // A temperature as shown on its chip (unit included), or '' when unavailable or not reported (null would read as 0 °):
  // climate entities give the number in the card's locale with Home Assistant's unit, the others Home Assistant's text.
  _tempText(id) {
    var s = this._st(id);
    if (!s || !this._avail(id)) return '';
    if (id.indexOf('climate.') === 0) {
      var n = this._tempNum(id);
      return n == null ? '' : `${new Intl.NumberFormat(this._locale(), { maximumFractionDigits: 1 }).format(n)} ${this._hass.config?.unit_system?.temperature || '°'}`;
    }
    return this._hass.formatEntityState ? this._hass.formatEntityState(s) : `${s.state} ${s.attributes.unit_of_measurement || ''}`.trim();
  }

  _tempNum(id) {
    var s = this._st(id);
    if (!s || !this._avail(id)) return null;
    var v = id.indexOf('climate.') === 0 ? s.attributes.current_temperature : s.state;
    var n = v == null || v === '' ? Number.NaN : Number(v);
    return Number.isFinite(n) ? n : null;
  }

  // A freezer compartment: named so, or set below zero.
  _freezerZone(p, label) {
    var id = p.temp || p.setpoint;
    if (HC_FREEZER_WORDS.test(`${id} ${p.setpoint || ''} ${label}`)) return true;
    var sp = p.setpoint ? this._tempNum(p.setpoint) : null;
    return sp != null && sp < 0;
  }

  // "Too warm" alerts: a compartment of a cold appliance above `temperature_alert` (fridge compartments) or
  // `freezer_temperature_alert` (freezer compartments), 8 °C / −12 °C by default; `false` turns one off. A wine cabinet
  // only alerts when told a threshold.
  _tempAlerts(ent, kind, deviceName) {
    if (HC_COLD.indexOf(kind) < 0) return [];
    var c = this._config;
    return hcTempPairs(ent.temps).filter((p) => p.temp).map((p) => {
      var n = this._tempNum(p.temp);
      if (n == null) return '';
      var freezer = kind === 'freezer' || this._freezerZone(p, this._entityLabel(p.temp, deviceName));
      var opt = c[freezer ? 'freezer_temperature_alert' : 'temperature_alert'];
      if (opt === false) return '';
      var s = this._st(p.temp);
      var unit = p.temp.indexOf('climate.') === 0 ? this._hass.config?.unit_system?.temperature : s.attributes.unit_of_measurement;
      var limit = opt != null && opt !== '' ? Number(opt)
        : (kind === 'wine_cooler' && !freezer ? Number.NaN : HC_TOO_WARM[freezer ? 'freezer' : 'fridge'][unit === '°F' ? '°F' : '°C']);
      if (!Number.isFinite(limit) || n <= limit) return '';
      return hcChip('chip warn', 'mdi:thermometer-alert', hcEsc(`${this._t('too_warm')} · ${this._tempText(p.temp)}`), p.temp);
    }).filter(Boolean);
  }

  // − / + for each setpoint (`number`) of a cold appliance, within its min / max, by its step.
  _setpointsHtml(ent, kind, deviceName, online) {
    if (!online || HC_COLD.indexOf(kind) < 0) return '';
    var rows = ent.temps.filter((id) => id.indexOf('number.') === 0 && this._tempNum(id) != null).map((id) => {
      var a = this._st(id).attributes, v = this._tempNum(id), busy = this._pending.has(id);
      var btn = (dir, icon, key) => {
        var end = dir < 0 ? a.min : a.max;
        var off = busy || (end != null && (dir < 0 ? v <= Number(end) : v >= Number(end)));
        return `<button class="sb" data-step="${hcEsc(id)}" data-dir="${dir}" title="${hcEsc(this._t(key))}" aria-label="${hcEsc(this._t(key))}"${off ? ' disabled' : ''}><ha-icon icon="${icon}"></ha-icon></button>`;
      };
      return `<div class="stepper"><span class="sl" title="${hcEsc(this._entityLabel(id, deviceName))}">${hcEsc(this._entityLabel(id, deviceName))}</span>` +
        `${btn(-1, 'mdi:minus', 'temp_down')}<span class="sv">${hcEsc(this._tempText(id))}</span>${btn(1, 'mdi:plus', 'temp_up')}</div>`;
    });
    this._nSetpoints = rows.length;
    return rows.length ? `<div class="section"><div class="section-title"><ha-icon icon="mdi:thermometer"></ha-icon>${this._t('temperature')}</div><div class="steppers">${rows.join('')}</div></div>` : '';
  }

  _stepSetpoint(id, dir) {
    var s = this._st(id), cur = this._tempNum(id);
    if (!s || cur == null || !dir) return;
    var a = s.attributes, step = Number(a.step) > 0 ? Number(a.step) : 1;
    var digits = (String(step).split('.')[1] || '').length;
    var v = Number((Math.round((cur + dir * step) / step) * step).toFixed(digits));
    if (a.min != null) v = Math.max(Number(a.min), v);
    if (a.max != null) v = Math.min(Number(a.max), v);
    if (v === cur) return;
    this._guard(id, () => this._option('number', 'set_value', { entity_id: id, value: v }));
  }

  // Chips of the `sensors` option: the state of each (with its unit), its name first when one is given.
  _ownSensorChips() {
    return hcOwnEntities(this._config, 'sensors').filter((a) => this._st(a.entity)).map((a) => {
      var s = this._st(a.entity);
      var value = this._hass.formatEntityState ? this._hass.formatEntityState(s) : `${s.state} ${s.attributes.unit_of_measurement || ''}`.trim();
      var name = a.name || s.attributes.friendly_name || a.entity;
      return hcChip('chip extra', a.icon || s.attributes.icon || 'mdi:information-outline', hcEsc(a.name ? `${a.name} ${value}` : value), a.entity, name);
    });
  }

  // The `commands` section: selects and input selects as drop-downs, switches (helpers, lights, fans, automations) as
  // pills, buttons, scripts and scenes as buttons. Returns its markup and height.
  _commandsHtml() {
    var list = hcOwnEntities(this._config, 'commands').filter((a) => this._st(a.entity));
    var sel = [], tog = [], btn = [];
    list.forEach((a) => {
      var id = a.entity, d = id.split('.')[0], s = this._st(id), ok = this._avail(id);
      var label = hcEsc(a.name || s.attributes.friendly_name || id);
      if (HC_CMD_SELECTS.indexOf(d) >= 0) {
        var o = ok
          ? (s.attributes.options || []).map((v) => `<option value="${hcEsc(v)}"${v === s.state ? ' selected' : ''}>${hcEsc(this._fmt(id, v))}</option>`).join('')
          : '<option selected>—</option>';
        sel.push(`<label class="field small"><span>${label}</span><select data-select="${hcEsc(id)}"${ok ? '' : ' disabled'}>${o}</select></label>`);
      } else if (HC_CMD_TOGGLES.indexOf(d) >= 0) {
        var on = ok && s.state === 'on';
        tog.push(`<button class="toggle${on ? ' on' : ''}" data-cmd-toggle="${hcEsc(id)}" aria-pressed="${on}"${ok && !this._pending.has(id) ? '' : ' disabled'}>` +
          `<ha-icon icon="${hcEsc(a.icon || (on ? 'mdi:checkbox-marked-circle' : 'mdi:checkbox-blank-circle-outline'))}"></ha-icon>${label}</button>`);
      } else if (HC_CMD_PRESS[d]) {
        // A button never pressed is `unknown`: only `unavailable` disables it.
        var off = s.state === 'unavailable' || this._pending.has(id);
        btn.push(`<button class="btn" data-cmd-press="${hcEsc(id)}"${off ? ' disabled' : ''}><ha-icon icon="${hcEsc(a.icon || HC_CMD_PRESS[d][1])}"></ha-icon>${label}</button>`);
      }
    });
    if (!sel.length && !tog.length && !btn.length) return { html: '', px: 0 };
    return {
      html: '<div class="section"><div class="section-title"><ha-icon icon="mdi:gesture-tap-button"></ha-icon>' + this._t('commands') + '</div>' +
        (sel.length ? `<div class="grid">${sel.join('')}</div>` : '') +
        (tog.length ? `<div class="toggles">${tog.join('')}</div>` : '') +
        (btn.length ? `<div class="cmd-buttons">${btn.join('')}</div>` : '') + '</div>',
      px: HC_PX.section + Math.ceil(sel.length / 3) * HC_PX.selectRow + Math.ceil(tog.length / 3) * HC_PX.toggleRow + (btn.length ? HC_PX.controls : 0),
    };
  }

  // A command pill: turn_on or turn_off from the state shown; a button, script or scene runs.
  _ownCommand(id, press) {
    var d = id.split('.')[0];
    if (press) return this._guard(id, () => this._option(d, HC_CMD_PRESS[d][0], { entity_id: id }));
    return this._guard(id, () => this._option(d, this._val(id) === 'on' ? 'turn_off' : 'turn_on', { entity_id: id }));
  }

  // Chips of the `alerts` option, while their entity is in one of their states.
  _customAlerts() {
    return hcCustomAlerts(this._config).filter((a) => {
      var v = this._val(a.entity);
      var on = a.state == null ? HC_CUSTOM_ALERT_ON : [].concat(a.state).map(String);
      return v !== undefined && on.indexOf(v) >= 0;
    }).map((a) => hcChip('chip warn', a.icon || 'mdi:alert-circle-outline',
      hcEsc(a.name || this._st(a.entity).attributes.friendly_name || a.entity), a.entity));
  }

  // Temperatures (cold appliances always, ovens while cooking) and the hood's fan and light.
  _infoChips(ent, kind, state, deviceName) {
    var chips = [];
    var chip = (icon, text, id, title) => hcChip('chip extra', icon, hcEsc(text), id, title);
    if (HC_COLD.indexOf(kind) >= 0 || (HC_HOT.indexOf(kind) >= 0 && state === 'run')) {
      // A cold appliance's compartment: its temperature and the setpoint it is set to, as "6 °C → 4 °C".
      var pairs = HC_COLD.indexOf(kind) >= 0 ? hcTempPairs(ent.temps) : ent.temps.map((id) => ({ temp: id }));
      pairs.forEach((p) => {
        var id = p.temp || p.setpoint;
        var value = this._tempText(id);
        if (!value) return;
        var label = this._entityLabel(id, deviceName);
        var target = p.temp && p.setpoint ? this._tempText(p.setpoint) : '';
        var text = target ? `${value} → ${target}` : value;
        var title = target ? `${label} · ${this._t('setpoint')} ${target}` : label;
        chips.push(chip(this._freezerZone(p, label) ? 'mdi:snowflake' : 'mdi:thermometer', text, id, title));
      });
    }
    if (kind === 'hood') {
      var fan = this._st(ent.fan);
      if (fan && fan.state === 'on' && fan.attributes.percentage != null) chips.push(chip('mdi:fan', `${Math.round(fan.attributes.percentage)} %`, ent.fan));
      else if (this._avail(ent.venting) && this._busy({ venting: ent.venting })) chips.push(chip('mdi:fan', this._fmt(ent.venting), ent.venting));
    }
    // The light of a hood or a wine cabinet.
    if ((kind === 'hood' || kind === 'wine_cooler') && this._val(ent.light) === 'on') chips.push(chip('mdi:lightbulb-on-outline', this._t('light_on'), ent.light));
    // What the appliance draws now, while it draws something.
    var w = this._st(ent.watts);
    if (w && this._avail(ent.watts) && Number(w.state) > 0) {
      chips.push(chip('mdi:flash', this._hass.formatEntityState ? this._hass.formatEntityState(w) : `${w.state} ${w.attributes.unit_of_measurement || ''}`.trim(), ent.watts));
    }
    if (this._val(ent.child_lock) === 'on') chips.push(chip('mdi:lock', this._t('child_lock'), ent.child_lock));
    // A program-less hob says whether it can be driven from Home Assistant (LG ThinQ's remote control).
    if (kind === 'hob' && this._val(ent.remote_start) === 'on') chips.push(chip('mdi:remote', this._t('remote_on'), ent.remote_start));
    return chips;
  }

  // Badge on the header icon: the appliance's brand, its initial on the brand's colour; none without a brand.
  // A brand with its logo shows it next to the title instead (_brandLogo): wordmarks don't fit the badge.
  _badge() {
    var b = this._brand;
    if (!b || HC_BRAND_LOGOS[b.key]) return '';
    var initials = b.key === 'lg' ? 'LG' : b.name.charAt(0).toUpperCase();
    return `<span class="hc-badge brand" style="background:${b.color}" title="${hcEsc(b.name)}">${hcEsc(initials)}</span>`;
  }

  // The illustrated header: the room and the appliance's own illustration on the right, the round icon (tinted by the
  // state, the brand's logo or initial in a badge on it), the title and the subtitle on the left.
  _banner(o) {
    var c = this._config, night = hcIsNight(this._hass, c);
    if (!this._uid) this._uid = ++hcUid;
    var scene = HC_LAUNDRY.indexOf(o.kind) >= 0 ? 'laundry' : 'kitchen';
    var art = String(o.art).replace(/(id="|url\(#)hc-/g, `$1hc${this._uid}-`);
    var drop = HC_BANNER_DROP[o.kind] ? ` style="--hc-drop: ${HC_BANNER_DROP[o.kind]}px"` : '';
    var zoom = this._zoomButton();
    return `<div class="banner sc-${scene}${night ? ' night' : ''}${zoom ? ' has-zoom' : ''}">` +
      `<svg class="scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">${HC_SCENES[scene](night)}</svg>` +
      '<div class="ground"></div>' +
      `<div class="htext"><div class="logo" aria-hidden="true"><ha-icon icon="${hcEsc(c.icon || o.icon)}"></ha-icon>${this._bannerBadge()}</div>` +
      `<div class="titles"><div class="trow"><div class="name">${hcEsc(o.name)}</div>${this._pill(o.status)}</div><div class="sub" title="${hcEsc(o.sub)}">${hcEsc(o.sub)}</div></div></div>` +
      `<div class="bart"${drop}>${hcPicture(art, o.state, true, this._lit)}</div>` + zoom +
    '</div>';
  }

  // The status pill: a dot and the state, in the header icon's colour; its text stays in its title when only the dot shows.
  _pill(text) {
    return `<span class="st" title="${hcEsc(text)}"><span class="dot"></span><span class="stt">${hcEsc(text)}</span></span>`;
  }

  // Badge on the banner's icon: the brand's logo on a white tile, else its initial on the brand's colour.
  _bannerBadge() {
    var b = this._brand, svg = b && HC_BRAND_LOGOS[b.key];
    if (!svg) return this._badge();
    return `<span class="hc-badge logo-b" role="img" aria-label="${hcEsc(b.name)}" title="${hcEsc(b.name)}">${svg}</span>`;
  }

  _brandLogo() {
    var b = this._brand, svg = b && HC_BRAND_LOGOS[b.key];
    return svg ? `<span class="brand-logo" role="img" aria-label="${hcEsc(b.name)}" title="${hcEsc(b.name)}">${svg}</span>` : '';
  }

  _styles(color) {
    return '<style>' +
      // min-width 0: the natural width below is only a preferred size; in a `1fr 1fr` grid or a flex row the
      // card must still shrink to its track instead of overflowing it.
      ':host { display: block; height: 100%; min-width: 0; --hc-color: ' + (color || 'var(--disabled-text-color, #9e9e9e)') + ';' +
        // Main buttons in the brand's colour (Bosch red, Miele burgundy…), the theme's primary colour otherwise.
        (this._brand && this._brand.key !== 'other' ? ` --primary-color: ${this._brand.color};` : '') +
      // State, warning, error and primary colours stay on dots, bars, tints and the illustration; texts get them
      // mixed with the theme's text colour so they read at 4.5:1 or more on light and dark cards alike.
        ' --hc-text: color-mix(in srgb, var(--hc-color) 45%, var(--primary-text-color));' +
        ' --hc-warning-text: color-mix(in srgb, var(--warning-color, #ffa600) 45%, var(--primary-text-color));' +
        ' --hc-error-text: color-mix(in srgb, var(--error-color, #db4437) 45%, var(--primary-text-color));' +
        ' --hc-primary-text: color-mix(in srgb, var(--primary-color, #03a9f4) 45%, var(--primary-text-color));' +
        // The header icon's colour: the state's (at work, waiting, warning, fault, done), neutral grey when idle or off.
        ' --hc-icon: ' + (this._iconColor || 'var(--state-inactive-color, var(--disabled-text-color, #9e9e9e))') + '; }' +
      // A size container: narrow layouts (6 columns of a Sections view, the mini card) follow the card's own width.
      'ha-card { container-name: hc-card; height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 10px;' +
        ' container-type: inline-size; }' +
      // Containment drops the content's own width: hosts that size the card from it (layout-card, button-card, an
      // `auto` grid column, an inline-block) would shrink it to its 24 px of padding. This empty, zero-height grid
      // gives the card a natural (max-content) width of 300 px with no minimum (its min-content width is 0), so in
      // a `1fr 1fr` grid (grid card, horizontal-stack, layout-card), wrapped in a <div> such as hui-card or not, the
      // card still shrinks to its column. contain-intrinsic-inline-size or a px min-width would be a minimum there.
      ':host::before { content: ""; display: grid; grid-template-columns: minmax(0, 300px); height: 0; }' +
      '.empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }' +
      // The body starts 8px under the header (the card gap is 10px between body blocks).
      '.header { display: flex; align-items: center; gap: 10px; margin-bottom: -2px; }' +
      '.logo { position: relative; width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center;' +
        ' color: var(--hc-icon); background: color-mix(in srgb, var(--hc-icon) 16%, transparent); }' +
      '.logo ha-icon { --mdc-icon-size: 24px; }' +
      '.hc-badge { position: absolute; right: -4px; bottom: -4px; width: 18px; height: 18px; border-radius: 5px; padding: 1px; box-sizing: border-box;' +
        ' display: grid; place-items: center; background: #fff;' +
        ' box-shadow: 0 0 0 1px var(--divider-color, rgba(0,0,0,.12)), 0 0 0 3px var(--card-background-color, #fff); }' +
      '.hc-badge svg { width: 100%; height: 100%; }' +
      // The brand's logo before the subtitle, at the subtitle's height.
      // On a white tile, like the Home Connect badge: the brand's own colours stay readable on a dark card.
      '.brand-logo { display: inline-flex; vertical-align: -3px; box-sizing: content-box; height: 10px; max-width: 64px; padding: 2px 4px;' +
        ' margin-right: 6px; border-radius: 4px; background: #fff; box-shadow: 0 0 0 1px var(--divider-color, rgba(0,0,0,.12)); }' +
      '.brand-logo svg, .brand-logo img { height: 100%; width: auto; max-width: 100%; }' +
      '.hc-badge.brand { padding: 0; color: #fff; font: 700 9px/1 var(--ha-font-family-body, system-ui, sans-serif); letter-spacing: -0.02em; }' +
      // The title takes the room the pill and the buttons leave (basis 0, so it doesn't squeeze the pill at
      // ordinary widths); it shrinks with an ellipsis but keeps about four characters.
      '.titles { flex: 1 1 0; min-width: 5ch; font-size: 16px; display: flex; flex-direction: column; }' +
      ':host([hide-title]) .titles .name, :host([hide-subtitle]) .titles > .sub { display: none; }' +
      // The status pill on the title row, 8 px after the title, only when the whole title and the pill's whole label
      // fit there; otherwise on its own line under the subtitle (then kept to one line); its dot alone at 200 px or
      // less, or when the banner has no room left for its label. Measured after each render (_fitPill), in every
      // language, never by a fixed width.
      '.trow { display: flex; align-items: center; gap: 8px; min-width: 0; }' +
      '.trow .name { flex: 0 1 auto; min-width: 0; }' +
      '.trow .st { flex: none; }' +
      '.titles.pill-below .trow { display: contents; }' +
      '.titles.pill-below .sub { order: 1; }' +
      '.titles.pill-below .st { order: 2; align-self: flex-start; margin-top: 3px; }' +
      '.titles.pill-dot .stt { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }' +
      '@container hc-card (max-width: 200px) { .st { padding: 4px; }' +
        ' .stt { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); } }' +
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.hero { display: flex; align-items: center; gap: 14px; }' +
      '.picture { width: 72px; height: 84px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }' +
      '.picture svg { width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.18)); }' +
      '.picture .led { fill: var(--hc-color); }' +
      '.picture { position: relative; }' +
      '.pbadge { position: absolute; right: -4px; bottom: 2px; width: 30%; aspect-ratio: 1; min-width: 20px; border-radius: 50%; display: grid; place-items: center;' +
        ' background: var(--hc-color); fill: #fff; box-shadow: 0 0 0 2px var(--card-background-color, #fff), 0 2px 6px rgba(0,0,0,0.25);' +
        ' animation: hc-pop 0.35s cubic-bezier(.3,1.6,.6,1) both; }' +
      '.pbadge svg { width: 72%; height: 72%; filter: none; overflow: visible; }' +
      '.st-pause .pbadge { animation: hc-pop 0.35s cubic-bezier(.3,1.6,.6,1) both, hc-breathe 2s ease-in-out 0.4s infinite; }' +
      '.pbadge .hand-h, .pbadge .hand-m { transform-box: view-box; transform-origin: 12px 12px; }' +
      '.st-delayedstart .pbadge .hand-m { animation: hc-spin 3s linear infinite; }' +
      '.st-delayedstart .pbadge .hand-h { animation: hc-spin 36s linear infinite; }' +
      '.pbadge .check { stroke-dasharray: 20; stroke-dashoffset: 0; animation: hc-draw 0.5s ease-out 0.2s both; }' +
      '.picture .sparkles { position: absolute; inset: 0; width: 100%; height: 100%; fill: var(--hc-color); pointer-events: none; filter: none; }' +
      '.sparkles path { transform-box: fill-box; transform-origin: center; animation: hc-twinkle 1.8s ease-in-out infinite; }' +
      '.sparkles path:nth-child(2) { animation-delay: 0.6s; } .sparkles path:nth-child(3) { animation-delay: 1.2s; }' +
      '.st-pause svg:not(.sparkles):first-child, .st-delayedstart svg:first-child { opacity: 0.85; }' +
      '@keyframes hc-pop { from { transform: scale(0); } to { transform: scale(1); } }' +
      '@keyframes hc-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(0.88); } }' +
      '@keyframes hc-draw { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }' +
      '@keyframes hc-twinkle { 0%, 100% { opacity: 0; transform: scale(0.4) rotate(0); } 50% { opacity: 1; transform: scale(1) rotate(45deg); } }' +
      '.picture .floor { opacity: 0; transition: opacity 0.6s; } .picture .floor-c { stop-color: var(--hc-color); }' +
      '.picture.running .floor { opacity: 1; }' +
      '.picture .drum, .picture .wave { transform-box: view-box; }' +
      '.picture .drum { transform-origin: 40px 55px; }' +
      '.picture .shake, .picture .steam path, .picture .drops, .picture .bubbles { transform-box: view-box; }' +
      '.picture .shake { transform-origin: 40px 92px; }' +
      '.picture .steam path, .picture .drops, .picture .bubbles { opacity: 0; }' +
      '.picture .bubbles { fill: #fff; }' +
      '.picture.running .drum { animation: hc-spin 1.2s linear infinite; }' +
      '.picture.running .wave { animation: hc-wave 0.8s ease-in-out infinite alternate; }' +
      '.picture.running .shake { animation: hc-shake 0.3s ease-in-out infinite; }' +
      '.picture.running .bubbles { animation: hc-rise 1.6s ease-in infinite; }' +
      '.picture.running .led { animation: hc-blink 1.6s ease-in-out infinite; }' +
      '.picture.running .floor { animation: hc-glow 2.2s ease-in-out infinite alternate; }' +
      '.picture.running .steam path { animation: hc-steam 2.4s ease-out infinite; }' +
      '.picture.running .steam path:nth-child(2) { animation-delay: 0.8s; }' +
      '.picture.running .steam path:nth-child(3) { animation-delay: 1.6s; }' +
      '.picture.running .drops { animation: hc-spray 1.1s ease-in-out infinite; }' +
      '@keyframes hc-spin { to { transform: rotate(360deg); } }' +
      '@keyframes hc-wave { from { transform: translateX(-6px); } to { transform: translateX(6px); } }' +
      '@keyframes hc-shake { 0%, 100% { transform: translateX(0) rotate(0); } 25% { transform: translateX(-0.6px) rotate(-0.5deg); } 75% { transform: translateX(0.6px) rotate(0.5deg); } }' +
      '@keyframes hc-rise { 0% { opacity: 0; transform: translateY(4px); } 30% { opacity: 0.8; } 100% { opacity: 0; transform: translateY(-14px); } }' +
      '@keyframes hc-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }' +
      '@keyframes hc-glow { from { opacity: 0.45; } to { opacity: 1; } }' +
      '@keyframes hc-steam { 0% { opacity: 0; transform: translateY(2px); } 30% { opacity: 0.7; } 100% { opacity: 0; transform: translateY(-10px); } }' +
      '@keyframes hc-spray { 0%, 100% { opacity: 0; transform: translateY(6px); } 40% { opacity: 0.85; } 70% { opacity: 0.5; transform: translateY(-4px); } }' +
      // New appliances: tumbling laundry, heat, oven glow and fan, coffee pour, hood air and light, frost and cold air,
      // glowing hob zones, microwave light and plate, the Styler's swaying shirt.
      '.picture .tumble, .picture .heat, .picture .fan, .picture .air, .picture .pour, .picture .frost path, .picture .cold, .picture .smoke { transform-box: view-box; }' +
      '.picture .tumble { transform-origin: 40px 55px; } .picture .fan { transform-origin: 40px 54px; transform-box: view-box; }' +
      '.picture .heat path, .picture .air path, .picture .cold, .picture .pour, .picture .smoke { opacity: 0; }' +
      '.picture .ovglow { opacity: .15; transition: opacity .6s; } .picture .beam { opacity: 0; transition: opacity .6s; }' +
      '.picture .frost path { opacity: .35; transform-box: fill-box; transform-origin: center; } .picture .cupfill { transform-box: fill-box; transform-origin: bottom; transform: scaleY(.4); }' +
      '.picture.running .tumble { animation: hc-tumble 2.4s cubic-bezier(.45,0,.55,1) infinite; }' +
      '.picture.running .heat path { animation: hc-steam 1.8s ease-out infinite; }' +
      '.picture.running .heat path:nth-child(2) { animation-delay: .6s; } .picture.running .heat path:nth-child(3) { animation-delay: 1.2s; }' +
      '.picture.running .ovglow { animation: hc-glow 1.8s ease-in-out infinite alternate; opacity: 1; }' +
      '.picture.running .fan { animation: hc-spin 1.4s linear infinite; }' +
      '.picture.running .pour { animation: hc-pour 1.2s ease-in-out infinite; } .picture.running .cupfill { animation: hc-fill 4s ease-in-out infinite; }' +
      '.picture.running .air path { animation: hc-rise 1.4s ease-in infinite; }' +
      '.picture.running .air path:nth-child(2) { animation-delay: .45s; } .picture.running .air path:nth-child(3) { animation-delay: .9s; }' +
      '.picture.running .smoke { animation: hc-rise 1.6s ease-in infinite; }' +
      '.picture.running .beam { opacity: 1; animation: hc-glow 2.2s ease-in-out infinite alternate; }' +
      '.picture.running .frost path { animation: hc-twinkle 2s ease-in-out infinite; }' +
      '.picture.running .frost path:nth-child(2) { animation-delay: .7s; } .picture.running .frost path:nth-child(3) { animation-delay: 1.4s; }' +
      '.picture.running .cold { animation: hc-wave 1.6s ease-in-out infinite alternate, hc-glow 1.6s ease-in-out infinite alternate; opacity: .8; }' +
      '@keyframes hc-tumble { 0% { transform: rotate(0); } 45% { transform: rotate(200deg); } 55% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }' +
      '@keyframes hc-pour { 0%, 100% { opacity: 0; } 20%, 80% { opacity: 1; } }' +
      '@keyframes hc-fill { 0% { transform: scaleY(.4); } 70%, 100% { transform: scaleY(3.4); } }' +
      '.picture .zones { opacity: 0; transition: opacity .6s; } .picture .mwlight { opacity: 0; transition: opacity .6s; }' +
      '.picture .food, .picture .mark, .picture .sway { transform-box: view-box; } .picture .food, .picture .mark { transform-origin: 32px 58px; } .picture .sway { transform-origin: 40px 16px; }' +
      '.picture .waves path { opacity: 0; }' +
      '.picture.running .zones { opacity: 1; animation: hc-glow 1.6s ease-in-out infinite alternate; }' +
      '.picture.running .mwlight { opacity: 1; animation: hc-hum 2.4s ease-in-out infinite alternate; }' +
      '.picture.running .food { animation: hc-orbit 4s linear infinite; } .picture.running .mark { animation: hc-mark 4s linear infinite; }' +
      '.picture.running .waves path { animation: hc-zap 1.2s ease-in-out infinite; } .picture.running .waves path:nth-child(2) { animation-delay: .6s; }' +
      '.picture.running .sway { animation: hc-sway 2.4s ease-in-out infinite; }' +
      // The bowl sits off-centre on the turntable: it circles a flattened ellipse, a little smaller at the back.
      '@keyframes hc-orbit { 0.0% { transform: translate(0.00px, -1.10px) scale(0.950); } 8.33% { transform: translate(1.75px, -0.95px) scale(0.957); } 16.67% { transform: translate(3.03px, -0.55px) scale(0.975); } 25.0% { transform: translate(3.50px, -0.00px) scale(1.000); } 33.33% { transform: translate(3.03px, 0.55px) scale(1.025); } 41.67% { transform: translate(1.75px, 0.95px) scale(1.043); } 50.0% { transform: translate(0.00px, 1.10px) scale(1.050); } 58.33% { transform: translate(-1.75px, 0.95px) scale(1.043); } 66.67% { transform: translate(-3.03px, 0.55px) scale(1.025); } 75.0% { transform: translate(-3.50px, 0.00px) scale(1.000); } 83.33% { transform: translate(-3.03px, -0.55px) scale(0.975); } 91.67% { transform: translate(-1.75px, -0.95px) scale(0.957); } 100.0% { transform: translate(-0.00px, -1.10px) scale(0.950); } }' +
      '@keyframes hc-mark { 0.0% { transform: translate(0.00px, -2.60px); opacity: 0.80; } 8.33% { transform: translate(7.00px, -2.25px); opacity: 0.77; } 16.67% { transform: translate(12.12px, -1.30px); opacity: 0.69; } 25.0% { transform: translate(14.00px, -0.00px); opacity: 0.57; } 33.33% { transform: translate(12.12px, 1.30px); opacity: 0.46; } 41.67% { transform: translate(7.00px, 2.25px); opacity: 0.38; } 50.0% { transform: translate(0.00px, 2.60px); opacity: 0.35; } 58.33% { transform: translate(-7.00px, 2.25px); opacity: 0.38; } 66.67% { transform: translate(-12.12px, 1.30px); opacity: 0.46; } 75.0% { transform: translate(-14.00px, 0.00px); opacity: 0.57; } 83.33% { transform: translate(-12.12px, -1.30px); opacity: 0.69; } 91.67% { transform: translate(-7.00px, -2.25px); opacity: 0.77; } 100.0% { transform: translate(-0.00px, -2.60px); opacity: 0.80; } }' +
      '@keyframes hc-hum { from { opacity: .9; } to { opacity: 1; } }' +
      '@keyframes hc-zap { 0%, 100% { opacity: 0; } 50% { opacity: .55; } }' +
      '@keyframes hc-sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }' +
      ':host([paused]) * { animation-play-state: paused !important; }' +
      '@media (prefers-reduced-motion: reduce) { .picture.running *, .pbadge, .pbadge *, .sparkles path { animation: none !important; } .sparkles path { opacity: 1; } .picture.running .floor { opacity: 1; } }' +
      '.badge { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
        ' background: color-mix(in srgb, var(--hc-color) 15%, transparent); color: var(--hc-color); }' +
      '.badge ha-icon { --mdc-icon-size: 32px; }' +
      '.info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }' +
      '.big { display: flex; align-items: baseline; gap: 8px; min-width: 0; }' +
      '.big .pct { font-size: 30px; font-weight: 400; line-height: 1.1; color: var(--primary-text-color); }' +
      '.big .pct small { font-size: 15px; color: var(--secondary-text-color); }' +
      // The state wraps rather than ending in "…" (long Polish / Serbian states on a narrow card).
      '.big .state { min-width: 0; font-size: 13px; font-weight: 500; color: var(--hc-text); overflow-wrap: break-word; }' +
      '.state-big { min-width: 0; font-size: 22px; font-weight: 400; line-height: 1.2; color: var(--hc-text); overflow-wrap: break-word; }' +
      '.time { font-size: 12px; color: var(--secondary-text-color); }' +
      // What the header pill already says is not repeated under it, unless the banner's pill keeps only its dot.
      '.pill-echo { display: none !important; }' +
      'ha-card:has(.banner .titles.pill-dot) .hero .big.pill-echo { display: flex !important; }' +
      'ha-card:has(.banner .titles.pill-dot) .hero .state.pill-echo { display: inline !important; }' +
      '@container hc-card (max-width: 200px) { .banner ~ .hero .big.pill-echo { display: flex !important; }' +
        ' .banner ~ .hero .state.pill-echo { display: inline !important; } ha-card.mini .banner ~ .content .mstate { display: flex; } }' +
      'button { font: inherit; cursor: pointer; border: none; }' +
      'button:disabled { cursor: default; opacity: 0.5; }' +
      '.power { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.power.on { background: color-mix(in srgb, var(--hc-color) 15%, transparent); color: var(--hc-color); }' +
      '.chips { display: flex; flex-wrap: wrap; gap: 6px; }' +
      '.chip { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; box-sizing: border-box; overflow-wrap: anywhere; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.chip ha-icon { --mdc-icon-size: 13px; flex: none; width: 13px; height: 13px; }' +
      '.chip.clickable { cursor: pointer; }' +
      '.chip.clickable:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }' +
      '.chip.warn { background: color-mix(in srgb, var(--warning-color, #ffa600) 15%, transparent); color: var(--hc-warning-text); }' +
      '.bar { height: 4px; border-radius: 3px; background: var(--secondary-background-color, rgba(128,128,128,0.15)); overflow: hidden; }' +
      '.fill { height: 100%; border-radius: 3px; background: var(--hc-color); transition: width 0.6s ease; }' +
      '.field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }' +
      '.field > span { font-size: 11px; color: var(--secondary-text-color); }' +
      '.prog { font-size: 13px; font-weight: 500; color: var(--primary-text-color); padding: 6px 10px; border-radius: 10px;' +
        ' background: var(--secondary-background-color, rgba(127,127,127,.08)); }' +
      'select { font: inherit; font-size: 13px; color: var(--primary-text-color); padding: 6px 30px 6px 10px; border-radius: 10px; width: 100%;' +
        ' border: 1px solid var(--divider-color, rgba(128,128,128,0.25)); appearance: none; -webkit-appearance: none; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23888\' d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E") no-repeat right 8px center / 20px; }' +
      'select:disabled { opacity: 0.6; cursor: default; }' +
      '.field.small select { font-size: 13px; padding: 7px 28px 7px 10px; }' +
      '.section { display: flex; flex-direction: column; gap: 6px; }' +
      '.section-title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; text-transform: uppercase;' +
        ' letter-spacing: .04em; color: var(--secondary-text-color); }' +
      '.section-title ha-icon { --mdc-icon-size: 16px; }' +
      '.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 6px; }' +
      '.toggles { display: flex; flex-wrap: wrap; gap: 6px; }' +
      '.cmd-buttons { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }' +
      '.toggles + .cmd-buttons, .grid + .cmd-buttons { margin-top: 10px; }' +
      '.steppers { display: flex; flex-direction: column; gap: 6px; }' +
      '.stepper { display: flex; align-items: center; gap: 8px; min-width: 0; }' +
      '.stepper .sl { flex: 1; min-width: 0; font-size: 13px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.stepper .sv { min-width: 56px; text-align: center; font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }' +
      '.sb { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; flex: none; border-radius: 50%;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--primary-text-color); }' +
      '.sb ha-icon { --mdc-icon-size: 18px; width: 18px; height: 18px; }' +
      '.sb:disabled { opacity: 0.4; }' +
      '.section-title .aside { margin-left: auto; text-transform: none; letter-spacing: 0; font-weight: 400; font-size: 11px; }' +
      // A hob's zones: tiles two (or more) to a row, a 40 px round icon tinted by the state while the zone heats.
      '.zones { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }' +
      '.zone { display: flex; align-items: center; gap: 10px; min-width: 0; padding: 8px 10px; border-radius: 12px; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.zone:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }' +
      '.zic { width: 40px; height: 40px; border-radius: 50%; flex: none; display: grid; place-items: center;' +
        ' background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent); color: var(--secondary-text-color); }' +
      '.zic ha-icon { --mdc-icon-size: 22px; }' +
      '.zone.on .zic { background: color-mix(in srgb, var(--hc-color) 16%, transparent); color: var(--hc-color); }' +
      '.ztx { display: flex; flex-direction: column; min-width: 0; }' +
      '.zn { font-size: 12px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.zv { font-size: 16px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.zv small { font-size: 11px; font-weight: 400; color: var(--secondary-text-color); }' +
      '.zone:not(.on) .zv { font-size: 13px; font-weight: 400; color: var(--secondary-text-color); }' +
      '.zt { display: inline-flex; align-items: center; gap: 3px; font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.zt ha-icon { --mdc-icon-size: 13px; flex: none; width: 13px; height: 13px; }' +
      // A narrow card: smaller icons and gaps, then (6 columns of the Sections view) the zones one under the other.
      '@container hc-card (max-width: 300px) { .zone { gap: 8px; padding: 8px; } .zic { width: 32px; height: 32px; } .zic ha-icon { --mdc-icon-size: 18px; } .zt ha-icon { display: none; } }' +
      '@container hc-card (max-width: 240px) { .zones { grid-template-columns: minmax(0, 1fr); } }' +
      '.toggle { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; box-sizing: border-box; overflow-wrap: anywhere; text-align: start;' +
        ' font-size: 11px; font-weight: 500; padding: 3px 8px 3px 5px; border-radius: 12px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.toggle ha-icon { --mdc-icon-size: 16px; flex: none; width: 16px; height: 16px; }' +
      '.toggle:disabled { opacity: 0.45; }' +
      '.reload { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; font-size: 12px; color: var(--secondary-text-color); }' +
      '.link { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 500; padding: 4px 8px; border-radius: 10px; background: none; color: var(--hc-primary-text); }' +
      '.link ha-icon { --mdc-icon-size: 16px; }' +
      '.toggle.on { background: color-mix(in srgb, var(--primary-color, #03a9f4) 15%, transparent); color: var(--hc-primary-text); }' +
      '.controls { display: flex; gap: 6px; }' +
      '.btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; font-weight: 500;' +
        ' padding: 7px 10px; border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--primary-text-color); }' +
      '.btn ha-icon { --mdc-icon-size: 18px; flex: none; width: 18px; height: 18px; }' +
      // Hover: a light veil over whatever the button's own tint is (neutral, on, primary, danger), so the state colour stays.
      '.btn:hover:not(:disabled), .round:hover:not(:disabled), .toggle:hover:not(:disabled), .power:hover:not(:disabled), .link:hover:not(:disabled) {' +
        ' background-image: linear-gradient(color-mix(in srgb, var(--primary-text-color) 8%, transparent), color-mix(in srgb, var(--primary-text-color) 8%, transparent)); }' +
      '.btn:focus-visible, .round:focus-visible, .toggle:focus-visible, .power:focus-visible, .link:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 2px; }' +
      '.btn.primary, .round.primary { background: color-mix(in srgb, var(--primary-color, #03a9f4) 16%, transparent); color: var(--hc-primary-text); }' +
      '.btn.primary:hover:not(:disabled), .round.primary:hover:not(:disabled) { background: color-mix(in srgb, var(--primary-color, #03a9f4) 24%, transparent); }' +
      '.btn.danger { background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent); color: var(--hc-error-text); }' +
      '.btn.danger:hover { background: color-mix(in srgb, var(--error-color, #db4437) 24%, transparent); }' +
      // Armed (second click confirms): stronger tint and an inner ring, still no solid fill.
      '.btn.danger.armed { background: color-mix(in srgb, var(--error-color, #db4437) 24%, transparent); box-shadow: inset 0 0 0 1px var(--error-color, #db4437); }' +
      '.hint { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); margin-top: -6px; }' +
      '.hint ha-icon { --mdc-icon-size: 16px; }' +
      '.error { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--hc-error-text); }' +
      '.error ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; width: 16px; height: 16px; }' +
      '.zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); }' +
      '.zoom ha-icon { --mdc-icon-size: 16px; }' +
      '.zoom:hover { background: color-mix(in srgb, var(--secondary-text-color) 16%, transparent); color: var(--primary-text-color); }' +
      '.zoom:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }' +
      // The status pill keeps its whole label (see .trow); on a narrow card only its dot shows.
      '.st { display: inline-flex; align-items: center; gap: 4px; flex: none; box-sizing: border-box;' +
        ' padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;' +
        ' background: color-mix(in srgb, var(--hc-color) 15%, transparent); color: var(--hc-text); }' +
      '.stt { white-space: nowrap; }' +
      '.dot { width: 6px; height: 6px; flex: none; border-radius: 50%; background: var(--hc-color); }' +
      '.content { display: flex; align-items: center; gap: 12px; }' +
      'ha-card.mini .picture { width: 56px; height: 66px; }' +
      '.mbar { display: flex; align-items: center; gap: 8px; font-size: 13px; }' +
      '.mbar .bar { flex: 1; }' +
      '.mbar .v { font-weight: 500; min-width: 40px; text-align: right; color: var(--primary-text-color); }' +
      '.line { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }' +
      '.line ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; width: 14px; height: 14px; }' +
      // Program and finish time wrap rather than being cut.
      '.line span { min-width: 0; overflow-wrap: break-word; }' +
      '.mstate { display: none; font-weight: 500; color: var(--hc-text); }' +
      '.mcontrols { display: flex; gap: 6px; flex-shrink: 0; }' +
      '.round { width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--primary-text-color); }' +
      '.round ha-icon { --mdc-icon-size: 20px; }' +
      'ha-card.mini .power { width: 40px; height: 40px; }' +
      // Narrow card (6 columns of a Sections view): the mini card's round buttons get their own row under the
      // text, which wraps instead of being cut; the full card's buttons and percentage wrap too.
      '@container (max-width: 320px) {' +
        ' ha-card.mini .content { flex-wrap: wrap; row-gap: 8px; }' +
        ' ha-card.mini .mcontrols { flex: 1 1 100%; justify-content: flex-end; }' +
      ' }' +
      // When the mini card's pill is a dot (its text stays in its title and for screen readers), the state is spelt
      // out above the program instead, where it has room to wrap.
      '@container (max-width: 200px) { ha-card.mini .header ~ .content .mstate { display: flex; } }' +
      'ha-card.mini:has(.titles.pill-dot) .content .mstate { display: flex; }' +
      // The full card's header icon shrinks, then steps aside; the mini card's keeps its 40 px at every width (its
      // title, pill and picture give way instead).
      '@container (max-width: 230px) {' +
        ' .header { gap: 8px; }' +
        ' ha-card:not(.mini) .logo { width: 28px; height: 28px; }' +
        ' ha-card:not(.mini) .logo ha-icon { --mdc-icon-size: 16px; }' +
        ' ha-card:not(.mini) .hc-badge { width: 13px; height: 13px; right: -3px; bottom: -3px; border-radius: 4px; }' +
        ' .hero { gap: 10px; }' +
        ' .picture { width: 56px; height: 66px; }' +
        ' .big { flex-wrap: wrap; row-gap: 0; }' +
        ' .time { overflow-wrap: anywhere; }' +
        ' .controls { flex-wrap: wrap; }' +
        ' .btn { flex: 1 1 auto; }' +
      ' }' +
      // Very narrow (about 200 px): no logo on the full card.
      '@container (max-width: 180px) {' +
        ' ha-card:not(.mini) .logo { display: none; }' +
        ' ha-card.mini .picture { width: 44px; height: 52px; }' +
        ' ha-card.mini .content { column-gap: 8px; }' +
      ' }' +
    '</style>' + (this._illustrated ? HC_BANNER_STYLE : '');
  }

  _onClick(ev) {
    var btn = ev.composedPath().find((n) => n.dataset && (n.dataset.action || n.dataset.toggle || n.dataset.cmdToggle || n.dataset.cmdPress || n.dataset.step || n.dataset.entity));
    if (!btn || btn.disabled) return;
    if (btn.dataset.cmdToggle || btn.dataset.cmdPress) {
      this._ownCommand(btn.dataset.cmdToggle || btn.dataset.cmdPress, !!btn.dataset.cmdPress);
      return;
    }
    if (btn.dataset.step) {
      this._stepSetpoint(btn.dataset.step, Number(btn.dataset.dir));
      return;
    }
    if (btn.dataset.entity) {
      this._moreInfo(btn.dataset.entity);
      return;
    }
    if (btn.dataset.toggle) {
      this._optionSwitch(btn.dataset.toggle);
      return;
    }
    switch (btn.dataset.action) {
      case 'zoom':
        this._toggleZoom();
        break;
      case 'power':
        this._power();
        break;
      case 'start':
        this._start();
        break;
      case 'reload_options':
        this._reloadOptions();
        break;
      case 'pause':
      case 'resume':
        this._send(btn.dataset.action);
        break;
      case 'stop':
        if (this._confirming !== 'stop') {
          this._confirming = 'stop';
          clearTimeout(this._confirmTimer);
          this._confirmTimer = setTimeout(() => { this._confirming = null; this._update(); }, 3000);
        } else {
          this._confirming = null;
          clearTimeout(this._confirmTimer);
          this._send('stop');
        }
        this._update();
        break;
    }
  }

  _moreInfo(entityId) {
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }));
  }

  _localControl(ent) { return !!ent.remote_control && this._val(ent.remote_control) === 'off'; }

  _showError(key, err) {
    clearTimeout(this._errorTimer);
    this._error = { key: key, detail: hcErrText(err), states: null };
    this._errorTimer = setTimeout(() => { this._clearError(); this._update(); }, HC_ERROR_TIMEOUT);
  }

  _clearError() {
    clearTimeout(this._errorTimer);
    this._error = null;
  }

  // Service call without Home Assistant's raw toast: the card shows its own message.
  _call(domain, service, data) {
    return this._hass.callService(domain, service, data, undefined, false);
  }

  // Retries once after a short delay when the appliance rejects the command for a moment
  // (or on any error with `always`).
  async _callRetry(domain, service, data, always) {
    try {
      return await this._call(domain, service, data);
    } catch (err) {
      if (!always && !HC_RETRYABLE.test(hcErrText(err))) throw err;
      await hcDelay(HC_RETRY_DELAY);
      return this._call(domain, service, data);
    }
  }

  // Pause / resume / stop and the option controls go through the same retry and in-card message
  // as Start: appliances reject them just as readily for a moment (WrongOperationState).
  async _send(action) {
    var cmd = this._cmd(action);
    if (!cmd) return;
    try {
      await this._callRetry(cmd.domain, cmd.service, cmd.data);
    } catch (err) {
      this._showError('command_failed', err);
      this._update();
    }
  }

  async _option(domain, service, data) {
    try {
      await this._callRetry(domain, service, data);
    } catch (err) {
      this._showError('option_failed', err);
      this._update();
    }
  }

  // Runs `fn` for a switch with nothing else on its way, its button disabled meanwhile: a second click can't
  // send the opposite command before the first is answered.
  async _guard(id, fn) {
    if (!id || this._pending.has(id)) return;
    this._pending.add(id);
    this._update();
    try {
      await fn();
    } finally {
      this._pending.delete(id);
      this._update();
    }
  }

  // An option pill: turn_on or turn_off from the state shown, never a blind toggle.
  _optionSwitch(id) {
    return this._guard(id, () => this._option('switch', this._val(id) === 'on' ? 'turn_off' : 'turn_on', { entity_id: id }));
  }

  // Selecting an option on the "active program" select starts it.
  async _start() {
    var cmd = this._cmd('start');
    if (this._starting || this._reloading || !cmd) return;
    this._starting = true;
    this._clearError();
    this._update();
    try {
      await this._callRetry(cmd.domain, cmd.service, cmd.data);
    } catch (err) {
      this._showError(HC_RETRYABLE.test(hcErrText(err)) ? 'start_rejected' : 'start_failed', err);
    } finally {
      this._starting = false;
      this._update();
    }
  }

  _power() {
    var r = this._r, key = this._powerKey(r), id = r.ent.power;
    var on = this._val(id) === 'on';
    if (on && hcNoPowerOff.has(key)) return;
    return this._guard(id, async () => {
      try {
        await this._call('switch', on ? 'turn_off' : 'turn_on', { entity_id: id });
      } catch (err) {
        var noOff = on && HC_NO_POWER_OFF.test(hcErrText(err));
        if (noOff) hcNoPowerOff.add(key);
        this._showError(noOff ? 'power_off_unsupported' : 'power_failed', err);
      }
    });
  }

  // Switch to another program and back: that's what makes Home Connect send the options.
  async _reloadOptions() {
    var ent = this._r.ent, id = ent.selected_program, s = this._st(id);
    if (!s || this._reloading || this._starting || this._localControl(ent)) return;
    var current = s.state;
    var other = (s.attributes.options || []).find((o) => o !== current);
    if (!other) return;
    this._reloading = true;
    this._clearError();
    this._update();
    try {
      await this._callRetry('select', 'select_option', { entity_id: id, option: other });
    } catch (err) {
      // Nothing changed on the appliance.
      this._showError('reload_failed', err);
      this._endReload();
      return;
    }
    try {
      // The appliance must get its program back, so any error is retried once.
      await this._callRetry('select', 'select_option', { entity_id: id, option: current }, true);
    } catch (err) {
      this._showError('restore_failed', err);
    }
    this._endReload();
  }

  _endReload() {
    this._reloading = false;
    this._sig = null;
    this._update();
  }

  _onChange(ev) {
    var el = ev.target;
    if (!el?.dataset?.select) return;
    // A `commands` drop-down may be a helper (input_select).
    var domain = el.dataset.select.indexOf('input_select.') === 0 ? 'input_select' : 'select';
    this._option(domain, 'select_option', { entity_id: el.dataset.select, option: el.value });
    el.blur();
  }
}

export class HomeConnectDishwasherCard extends HomeConnectBaseCard {
  static get kind() { return 'dishwasher'; }
}

export class HomeConnectWasherCard extends HomeConnectBaseCard {
  static get kind() { return 'washer'; }
}

// The card for any appliance: its type comes from the device picked (or the `kind` option).
export class SmartApplianceCard extends HomeConnectBaseCard {
  static get kind() { return null; }
}
