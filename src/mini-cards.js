// ── Mini cards ───────────────────────────────────────────────────────────────
// A mini card is a full card drawn compact, like ha-roborock-card: its detail button (top right, `zoom: false`
// removes it) switches it to the full card and back, and a click anywhere else on the page folds it again.
import { hcEsc } from "./i18n-helpers.js";
import { HC_PX, hcPicture, hcRows } from "./appliance-profiles.js";
import { HomeConnectDishwasherCard, HomeConnectWasherCard, SmartApplianceCard } from "./shadow-dom-patching.js";

export var hcInDialog = (ev) => ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].indexOf(n.localName) >= 0);

export var hcMini = (Base) => class extends Base {
  static get mini() { return true; }

  static getConfigElement() {
    var el = Base.getConfigElement();
    el.mini = true;
    return el;
  }

  constructor() {
    super();
    var outside = (ev) => !ev.composedPath().includes(this) && !hcInDialog(ev);
    this._onUnzoom = (ev) => {
      if (this._zoomed && outside(ev)) this._setZoom(false);
    };
    // "A click elsewhere" is caught on the pointer, as on the other cards: on iOS (Safari and the companion app) a
    // tap on something that is not clickable (the background, an empty spot) sends no click to the page. It counts
    // when the press and the release are both outside the card (a scroll cancels the pointer); keyboard clicks
    // (no click count) still go through the click event.
    var downOutside = false;
    this._onUnzoomDown = (ev) => { downOutside = outside(ev); };
    this._onUnzoomUp = (ev) => {
      if (downOutside) this._onUnzoom(ev);
      downOutside = false;
    };
    this._onUnzoomKey = (ev) => {
      if (ev.detail === 0) this._onUnzoom(ev);
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('pointerdown', this._onUnzoomDown, true);
    document.addEventListener('pointerup', this._onUnzoomUp, true);
    document.addEventListener('click', this._onUnzoomKey, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('pointerdown', this._onUnzoomDown, true);
    document.removeEventListener('pointerup', this._onUnzoomUp, true);
    document.removeEventListener('click', this._onUnzoomKey, true);
    // Back to the compact view once off the screen (another view, a conditional card hidden), as on the other cards.
    this._zoomed = false;
  }

  getGridOptions() { return this._zoomed ? { ...super.getGridOptions(), rows: 'auto' } : { columns: 6, min_columns: 6, rows: 'auto' }; }

  _compact() { return !this._zoomed; }

  _zoomButton() {
    if (this._config.zoom === false) return '';
    var z = !!this._zoomed;
    var label = hcEsc(this._t(z ? 'zoom_out' : 'zoom_in'));
    return `<button class="zoom" data-action="zoom" title="${label}" aria-label="${label}"><ha-icon icon="${z ? 'mdi:arrow-collapse' : 'mdi:arrow-expand'}"></ha-icon></button>`;
  }

  _setZoom(on) {
    this._zoomed = on;
    this._update();
    // Masonry and sections lay the card out again at its new height.
    this.dispatchEvent(new CustomEvent('iron-resize', { bubbles: true, composed: true }));
  }

  // The focus follows to the button that replaced this one (see _update).
  _toggleZoom() {
    this._setZoom(!this._zoomed);
  }

  _miniHtml(m) {
    // The state also as the first line: on a narrow card it stands in for the pill, which then only shows its dot.
    var c = m.c, ent = m.ent, lines = [];
    var mstate = `<div class="line mstate" aria-hidden="true"><span>${hcEsc(m.statusText)}</span></div>`;
    var bar = '';
    // Waiting for a delayed start: no bar still at 0 %, but when it starts (then when it ends, below).
    if (m.startAt) {
      lines.push(`<div class="line"><ha-icon icon="mdi:timer-outline"></ha-icon><span data-tick="start">${hcEsc(this._startsText(m.startAt))}</span></div>`);
    } else if ((m.running && !this._noPct) || m.state === 'finished') {
      var pct = m.state === 'finished' ? 100 : (m.progress == null ? 0 : m.progress);
      bar = `<div class="mbar"><div class="bar"><div class="fill" style="width:${pct}%"></div></div><span class="v">${Math.round(pct)} %</span></div>`;
    }
    if (m.progLabel && m.online && m.powerOn && !m.banner) lines.push(`<div class="line"><ha-icon icon="mdi:tune-variant"></ha-icon><span>${hcEsc(m.progLabel)}</span></div>`);
    if (m.running && m.finish) {
      var tick = m.startAt ? 'ends' : 'time';
      var when = m.startAt ? this._endsAt(m.finish) : this._timeLine(m.finish);
      lines.push(`<div class="line"><ha-icon icon="mdi:clock-outline"></ha-icon><span data-tick="${tick}">${hcEsc(when)}</span></div>`);
    }
    if (m.chips.length) lines.push(`<div class="chips">${m.chips.join('')}</div>`);

    // Round buttons: start (or pause / resume) and power.
    var btns = c.show_controls && m.online && m.powerOn ? this._actionButtons(ent, m.state, m.running, true).btns : [];
    if (m.powerBtn) btns.push(m.powerBtn);

    var errorHtml = this._error
      ? `<div class="error" role="alert" title="${hcEsc(this._error.detail)}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>${hcEsc(this._t(this._error.key))}</span></div>`
      : '';

    if (m.banner) this._rows = hcRows(HC_PX.bannerMini + (this._error ? HC_PX.error : 0));
    return this._styles(m.color) + '<ha-card class="mini">' + (m.banner ||
      '<div class="header">' + m.logo +
        '<div class="titles"><div class="trow"><div class="name">' + hcEsc(m.name) + '</div>' + this._pill(m.statusText) + '</div>' +
          (this._brandLogo() ? `<div class="sub">${this._brandLogo()}</div>` : '') + '</div>' +
        this._zoomButton() +
      '</div>') +
      '<div class="content">' + (m.banner ? '' : hcPicture(m.art, m.state, !c.icon, this._lit)) +
        '<div class="info">' + mstate + bar + lines.join('') + '</div>' +
        (btns.length ? `<div class="mcontrols">${btns.join('')}</div>` : '') +
      '</div>' + errorHtml +
    '</ha-card>';
  }
};

export class HomeConnectDishwasherMiniCard extends hcMini(HomeConnectDishwasherCard) {}

export class HomeConnectWasherMiniCard extends hcMini(HomeConnectWasherCard) {}

export class SmartApplianceMiniCard extends hcMini(SmartApplianceCard) {}
