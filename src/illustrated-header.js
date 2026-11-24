// ── Illustrated header ("banner") ────────────────────────────────────────────
// The appliance in its room: a laundry room for washers, dryers and the Styler, a kitchen for the others. The room is
// a 200 × 80 picture drawn at the banner's right, over a 10 px tiled floor strip edge to edge; the appliance's own
// illustration (HC_ART, with its animations) stands on the strip at the right.
import { HC_STATE_COLORS } from "./appliance-profiles.js";

export var hcWin = (x, y, w, h, n) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${n ? '#1b2f52' : '#bfe0f7'}" stroke="${n ? '#4a5568' : '#fff'}" stroke-width="1.6"/>` +
  (n ? `<circle cx="${x + w * 0.7}" cy="${y + h * 0.3}" r="2.4" fill="#f3eed2"/>` : `<circle cx="${x + w * 0.7}" cy="${y + h * 0.35}" r="3" fill="#ffd65a"/>`) +
  `<line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${n ? '#4a5568' : '#fff'}" stroke-width="1.2"/>`;
export var hcLines = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
export var HC_SCENES = {
  kitchen: (n) => `<rect width="200" height="80" fill="${n ? '#283040' : '#eef3f4'}"/><g stroke="${n ? '#343d4f' : '#dfe7ea'}" stroke-width=".6">` +
    hcLines(20, (i) => `<line x1="${i * 10}" y1="30" x2="${i * 10}" y2="80"/>`) +
    [40, 50, 60, 70].map((y) => `<line x1="0" y1="${y}" x2="200" y2="${y}"/>`).join('') +
    `</g><rect x="0" y="0" width="200" height="28" fill="${n ? '#323b4e' : '#ffffff'}"/><g fill="${n ? '#3d475c' : '#e8eef1'}" stroke="${n ? '#4a5568' : '#cfd9de'}" stroke-width=".6">` +
    [4, 48, 92].map((x) => `<rect x="${x}" y="2" width="40" height="24" rx="1.5"/>`).join('') + `</g>${hcWin(150, 6, 34, 22, n)}`,
  laundry: (n) => `<rect width="200" height="80" fill="${n ? '#25313a' : '#e9f3f7'}"/><g stroke="${n ? '#2f3d48' : '#d4e6ee'}" stroke-width=".6">` +
    hcLines(20, (i) => `<line x1="${i * 10}" y1="0" x2="${i * 10}" y2="80"/>`) + hcLines(8, (i) => `<line x1="0" y1="${i * 10}" x2="200" y2="${i * 10}"/>`) +
    `</g><rect x="90" y="20" width="60" height="2.4" fill="${n ? '#4a5568' : '#b9c4cc'}"/><rect x="96" y="8" width="8" height="12" rx="2" fill="#2f80ed"/>` +
    '<rect x="108" y="10" width="7" height="10" rx="2" fill="#d4537e"/><rect x="119" y="9" width="8" height="11" rx="2" fill="#1d9e75"/>' +
    `<g transform="translate(100 76)"><path d="M-12 0 L-14 -16 H14 L12 0Z" fill="${n ? '#6b5a40' : '#d9b778'}"/><g stroke="${n ? '#5a4a34' : '#c09a5a'}" stroke-width=".8">` +
    [-10, -5, 0, 5, 10].map((x) => `<line x1="${x}" y1="-15" x2="${x * 0.9}" y2="-1"/>`).join('') +
    '</g><path d="M-10 -16 q4 -6 10 -2 q6 -5 10 2" fill="#86b9de"/></g>' +
    `<path d="M30 6 V0 M30 6 h40" stroke="${n ? '#4a5568' : '#9aa3ae'}" stroke-width=".8"/>` +
    '<g class="hc-swing" style="transform-origin:44px 6px"><path d="M40 6 l-4 12 h10 l-2 -12" fill="#f5b400"/></g>' +
    '<g class="hc-swing r" style="transform-origin:60px 6px"><path d="M56 6 l-3 10 h8 l-1 -10" fill="#e5484d"/></g>',
};
export var HC_LAUNDRY = ['washer', 'dryer', 'washer_dryer', 'styler'];
// Appliances that stand on a counter or hang on the wall rather than on the floor: lowered (in px of the 72 px
// picture) so that they rest on the strip.
export var HC_BANNER_DROP = { microwave: 15 };

// The header icon's colour follows the state: at work in the state's colour, waiting or warning in amber, a fault in
// red, done in green, idle or off in neutral grey.
export var HC_ICON_COLORS = {
  run: HC_STATE_COLORS.run,
  delayedstart: HC_STATE_COLORS.delayedstart,
  finished: HC_STATE_COLORS.finished,
  pause: HC_STATE_COLORS.pause,
  actionrequired: HC_STATE_COLORS.actionrequired,
  error: HC_STATE_COLORS.error,
  aborting: HC_STATE_COLORS.aborting,
};
// Shadow DOM already keeps ids apart between cards; each card still numbers its own, so a picture copied out of it
// (or two banners in one root) never share one.

// Night picture: forced by illustration_theme, else Home Assistant's dark theme alone (a light theme keeps the day picture after sunset).
export function hcIsNight(hass, config) {
  var theme = config?.illustration_theme;
  if (theme === 'night') return true;
  if (theme === 'day') return false;
  return !!hass?.themes?.darkMode;
}

// The banner, 90 px high on the full and the mini card, edge to edge at the top of the card (over its 12 px padding).
// The room fills the right (at most 250 px, faded in on its left), the text sits on the wall colour at the left, and
// the appliance (72 px high) stands on the floor strip. Narrow cards keep the appliance and drop the room.
export var HC_BANNER_STYLE = '<style>' +
  '.banner { position: relative; flex: none; height: 90px; margin: -12px -12px 0; overflow: hidden;' +
    ' border-radius: var(--ha-card-border-radius, 12px) var(--ha-card-border-radius, 12px) 0 0;' +
    ' --sky-text: #0d2a45; --sky-muted: #3b5b78; color: var(--sky-text); background: #eef3f4; }' +
  '.banner.sc-laundry { background: #e9f3f7; } .banner.night { --sky-text: #fff; --sky-muted: rgba(255,255,255,.78); background: #283040; }' +
  '.banner.night.sc-laundry { background: #25313a; }' +
  '.banner .scene { position: absolute; right: 0; bottom: 10px; height: 80px; width: min(250px, 62%);' +
    ' -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 14%); mask-image: linear-gradient(90deg, transparent 0, #000 14%); }' +
  // The floor: a 10 px strip of tiles, edge to edge.
  '.banner .ground { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; box-shadow: inset 0 2px 0 #b8c0c6;' +
    ' background: repeating-linear-gradient(90deg, #d9dfe3 0 18px, #c6cdd2 18px 19px); }' +
  '.banner.night .ground { background: repeating-linear-gradient(90deg, #3a4250 0 18px, #2e3542 18px 19px); box-shadow: inset 0 2px 0 #4a5466; }' +
  // The text runs up to the appliance: the room behind it is faded out on its left.
  '.banner .htext { position: absolute; z-index: 1; left: 0; top: 0; bottom: 10px; right: 74px; box-sizing: border-box;' +
    ' display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 14px; min-width: 0; }' +
  // Title row: the title, then the status pill 8 px after it (see .trow and _fitPill); the subtitle under them.
  '.banner .htext .titles { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; justify-content: center; }' +
  '.banner .st { --c: var(--hc-icon); padding: 1px 8px; line-height: 16px;' +
    ' background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--c) 45%, #0d2a45); }' +
  '.banner.night .st { background: color-mix(in srgb, var(--c) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--c) 35%, #ffffff); }' +
  '.banner .st .dot { width: 7px; height: 7px; background: var(--c); }' +
  '.banner .titles.pill-dot .st { padding: 4px; }' +
  '@container hc-card (max-width: 200px) { .banner .st { padding: 4px; } }' +
  '.banner .htext .name { color: var(--sky-text); }' +
  '.banner .htext .sub { font-size: 13px; color: var(--sky-muted); }' +
  // The round icon on the wall, in the state's colour; the brand on a white tile at its bottom right.
  '.banner .htext .logo { display: grid; width: 40px; height: 40px; color: var(--hc-icon); background: rgba(255,255,255,.62);' +
    ' box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hc-icon) 22%, transparent); }' +
  '.banner.night .htext .logo { color: color-mix(in srgb, var(--hc-icon) 72%, #fff); background: rgba(255,255,255,.12);' +
    ' box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }' +
  '.banner .htext .logo ha-icon { --mdc-icon-size: 24px; }' +
  '.banner .htext .hc-badge { width: 18px; height: 18px; right: -4px; bottom: -4px; border-radius: 5px;' +
    ' box-shadow: 0 0 0 1px rgba(13,42,69,.16), 0 1px 3px rgba(13,42,69,.18); }' +
  '.banner .htext .hc-badge.logo-b { padding: 2px; background: #fff; }' +
  '.banner .bart { position: absolute; right: 6px; bottom: calc(10px - var(--hc-drop, 0px)); height: 72px; }' +
  // The detail button keeps the top right corner: the appliance steps aside so that nothing covers it.
  '.banner.has-zoom .bart { right: 36px; }' +
  // Explicit widths (72 × 80 / 94): WebKit sizes an absolute box from its SVG's default 300 px width otherwise, and
  // the appliance then lands on the title at the left of a 300 px wide box.
  '.banner .bart { width: 61.3px; } .banner .bart .picture { width: 100%; height: 72px; }' +
  '.banner .bart .picture svg:first-child { filter: drop-shadow(0 2px 3px rgba(0,0,0,.2)); }' +
  // The expand / collapse button: 24 px, round, frosted, in the banner's top right corner.
  '.banner .zoom { position: absolute; z-index: 2; top: 5px; right: 5px; margin: 0; color: #33506b; background: rgba(255,255,255,.55);' +
    ' box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }' +
  '.banner .zoom:hover { color: #33506b; background: rgba(255,255,255,.75); }' +
  '.banner.night .zoom { color: #fff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }' +
  '.banner.night .zoom:hover { color: #fff; background: rgba(255,255,255,.22); }' +
  '.hc-swing { transform-box: view-box; animation: hc-flag 2s ease-in-out infinite; } .hc-swing.r { animation-direction: reverse; }' +
  '@keyframes hc-flag { 0%, 100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }' +
  '.banner.has-zoom .htext { right: 102px; }' +
  '@container (max-width: 360px) { .banner .scene { display: none; } }' +
  // A narrow card: a smaller appliance leaves the title and the whole pill their room.
  '@container hc-card (max-width: 260px) { .banner .bart, .banner .bart .picture { height: 56px; } .banner .bart { right: 4px; width: 47.7px; }' +
    ' .banner.has-zoom .bart { right: 34px; } .banner .htext { right: 58px; } .banner.has-zoom .htext { right: 86px; } }' +
  '@media (prefers-reduced-motion: reduce) { .hc-swing { animation: none; } }' +
'</style>';

// The banner's ground strip (the floor), that the title block keeps clear of, and the gap between the title and the
// status pill on its row (.trow).
export const PILL_GROUND_PX = 10;
export const PILL_GAP_PX = 8;
