// ── i18n ──────────────────────────────────────────────────────────────────────
import { hcNormState } from "./appliance-profiles.js";
import { HcI18n } from "./i18n/hci18n.js";

// Card language: the full code when the dictionary has it (sr-Latn), else the part before the dash (pt-BR gives
// European Portuguese), else English.
export function hcLang(code) {
  var l = String(code || 'en');
  if (HcI18n[l]) return l;
  l = l.split('-')[0];
  return HcI18n[l] ? l : 'en';
}

// Locale handed to Intl / toLocale*: the full Home Assistant locale (pt-BR, de-CH…) when it is the
// card's language, else the card's language. A `language:` option wins over Home Assistant, sr-Latn
// stays as is, and a bare `pt` (Home Assistant's code for European Portuguese) becomes pt-PT, since
// Intl reads `pt` as Brazilian Portuguese.
export function hcLocale(lang, hass, explicit) {
  if (lang === 'sr-Latn') return lang;
  var full = !explicit && (hass?.locale?.language || hass?.language);
  var l = full && String(full).split('-')[0] === lang.split('-')[0] ? String(full) : lang;
  return l === 'pt' ? 'pt-PT' : l;
}

export function hcT(lang, key) {
  var strings = HcI18n[lang] || HcI18n.en;
  return strings[key] || HcI18n.en[key] || key;
}

export function hcEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Service call errors from Home Assistant: a websocket error object ({ code, message }) or an Error.
export function hcErrText(err) {
  if (!err) return '';
  return String(err.message || err.error?.message || err.code || err);
}

// Rejections an appliance often sends for a moment (busy, just woken up): worth one retry.
export var HC_RETRYABLE = /BadRequest|WrongOperationState|\b40[09]\b/;
export var HC_RETRY_DELAY = 3000;
export var HC_ERROR_TIMEOUT = 10000;
export var HC_NO_POWER_OFF = /does not support turning off|standby/i;
// Appliances that refused to be turned off, remembered for this page only.
export var hcNoPowerOff = new Set();

// A door that moves this soon after the program ends is the appliance unlocking it, not someone opening it.
export var HC_DOOR_GRACE = 60000;
// How far back the door reminder looks in the recorder's history (see _doorHistory).
export var HC_DOOR_HISTORY = 48 * 3600000;

// The time (ms) an entity took its current value in recorder history rows (oldest first, compressed `s` / `lc` /
// `lu` in seconds), skipping the rows that only repeat it (a Home Assistant restart writes one). -Infinity when the
// value already held at the start of the window (its first row is that start, not a change). Null without rows.
export function hcSince(rows, state) {
  var at = null;
  for (var i = (rows || []).length - 1; i >= 0; i--) {
    var r = rows[i];
    if ((r.s ?? r.state) !== state) break;
    if (i === 0) return -Infinity;
    var t = r.lc ?? r.lu;
    at = t != null ? t * 1000 : Date.parse(r.last_changed);
  }
  return at != null && Number.isFinite(at) ? at : null;
}

// How far back the energy of a cycle is looked for (see _cycleEnergy), and how often it is read again while one runs.
export var HC_CYCLE_HISTORY = 24 * 3600000;
export var HC_CYCLE_REFRESH = 5 * 60000;
export var HC_CYCLE_ACTIVE = ['run', 'pause', 'actionrequired'];

// The energy the last cycle used, from recorder history rows (oldest first, compressed `s` / `lu` in seconds): the
// meter's increase from when the operation state last became active (run, pause, action required) to when it stopped
// being, or to `current` while it still is. A drop counts as a reset (total_increasing: Miele's per-program meter
// starts again from 0), its new value used since. { used, active, end } or null: no cycle in the rows, or no meter
// reading.
export function hcCycleEnergy(opRows, meterRows, platform, current, now) {
  var at = (r) => ((r.lu ?? r.lc) != null ? (r.lu ?? r.lc) * 1000 : Date.parse(r.last_updated || r.last_changed));
  var start = null, end = null;
  (opRows || []).forEach((r) => {
    var active = HC_CYCLE_ACTIVE.indexOf(hcNormState(platform, r.s ?? r.state)) >= 0;
    if (active && (start == null || end != null)) { start = at(r); end = null; }
    else if (!active && start != null && end == null) end = at(r);
  });
  if (start == null) return null;
  var readings = (meterRows || []).map((r) => ({ t: at(r), v: Number(r.s ?? r.state) })).filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v));
  if (end == null && Number.isFinite(current)) readings.push({ t: now, v: current });
  var prev = null, used = 0;
  readings.forEach((p) => {
    if (p.t <= start) prev = p.v;
    else if (end == null || p.t <= end) {
      if (prev != null) used += p.v >= prev ? p.v - prev : p.v;
      prev = p.v;
    }
  });
  if (prev == null) return null;
  return { used: used, active: end == null, end: end ?? now };
}

export function hcDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
