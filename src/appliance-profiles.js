// ── Appliance profiles ───────────────────────────────────────────────────────
import { hcEsc } from "./i18n-helpers.js";

export var HC_STATE_COLORS = {
  run: 'var(--info-color, #039be5)',
  ready: 'var(--info-color, #039be5)',
  // HA's purple, lighter than the old #8e24aa, which was hard to read on a dark card (texts mix it with the text colour).
  delayedstart: 'var(--hc-delayed-color, var(--purple-color, #926bc7))',
  pause: 'var(--warning-color, #ffa600)',
  actionrequired: 'var(--warning-color, #ffa600)',
  finished: 'var(--success-color, #43a047)',
  error: 'var(--error-color, #db4437)',
  aborting: 'var(--error-color, #db4437)',
};

// One profile per appliance type. `prefix`: the Home Connect program prefix the type is recognised by
// (washer-dryer before washer, whose prefix is a part of it). `simple`: no program to run (hob, hood,
// cold appliances): the card shows what the appliance is doing and its settings instead of a program.
export var HC_PROFILES = {
  washer_dryer: { icon: 'mdi:washing-machine', prefix: 'laundry_care_washer_dryer_program_' },
  dishwasher: { icon: 'mdi:dishwasher', prefix: 'dishcare_dishwasher_program_' },
  washer: { icon: 'mdi:washing-machine', prefix: 'laundry_care_washer_program_' },
  dryer: { icon: 'mdi:tumble-dryer', prefix: 'laundry_care_dryer_program_' },
  microwave: { icon: 'mdi:microwave', prefix: 'cooking_oven_program_microwave_' },
  oven: { icon: 'mdi:stove', prefix: 'cooking_oven_program_' },
  coffee_maker: { icon: 'mdi:coffee-maker', prefix: 'consumer_products_coffee_maker_program_' },
  hood: { icon: 'mdi:fan-chevron-up', prefix: 'cooking_common_program_hood_', simple: true },
  hob: { icon: 'mdi:induction', simple: true },
  fridge: { icon: 'mdi:fridge', simple: true },
  freezer: { icon: 'mdi:snowflake-thermometer', simple: true },
  wine_cooler: { icon: 'mdi:bottle-wine', simple: true },
  styler: { icon: 'mdi:hanger' },
};
export var HC_KINDS = ['dishwasher', 'washer', 'dryer', 'washer_dryer', 'oven', 'microwave', 'hob', 'coffee_maker', 'hood', 'fridge',
  'freezer', 'wine_cooler', 'styler'];
// Temperatures are shown on these: always for the cold ones, while cooking for the others.
export var HC_COLD = ['fridge', 'freezer', 'wine_cooler'];
export var HC_HOT = ['oven', 'microwave'];

// Roles the card looks for on the device. Each matcher tries the entity registry
// translation_key first, then the entity_id suffix (French and English slugs),
// then attributes, so it works whatever language the entities were created in.
export var HC_ROLES = {
  operation_state: { domain: 'sensor', keys: ['operation_state'], id: /(_etat|_operation_state|_state)$/,
    test: (s) => { var o = s.attributes.options || []; return o.indexOf('run') >= 0 && o.indexOf('finished') >= 0; } },
  door: { domain: 'sensor', keys: ['door'], id: /(_porte|_door)$/,
    test: (s) => { var o = s.attributes.options || []; return o.indexOf('open') >= 0 && o.indexOf('closed') >= 0; } },
  progress: { domain: 'sensor', keys: ['program_progress'], id: /progress|progression/,
    test: (s) => s.attributes.unit_of_measurement === '%' },
  finish_time: { domain: 'sensor', keys: ['program_finish_time', 'finish_time'], id: /(finish_time|heure_de_fin)/,
    test: (s) => s.attributes.device_class === 'timestamp' },
  selected_program: { domain: 'select', keys: ['selected_program'], id: /(selected_program|programme_selectionne)$/ },
  active_program: { domain: 'select', keys: ['active_program'], id: /(active_program|programme_actif)$/ },
  power: { domain: 'switch', keys: ['power'], id: /(_power|_alimentation)$/ },
  stop: { domain: 'button', keys: ['stop_program'], id: /(stop_program|arreter_le_programme)$/ },
  pause: { domain: 'button', keys: ['pause_program'], id: /(pause_program|mettre_en_pause.*)$/ },
  resume: { domain: 'button', keys: ['resume_program'], id: /(resume_program|reprendre_le_programme)$/ },
  remote_start: { domain: 'binary_sensor', keys: ['remote_start', 'remote_start_allowed'], id: /(remote_start|demarrage_a_distance)$/ },
  remote_control: { domain: 'binary_sensor', keys: ['remote_control'], id: /(_remote_control|_controle_a_distance)$/ },
  connectivity: { domain: 'binary_sensor', keys: ['connectivity'], id: /(connectivity|connectivite)$/,
    test: (s) => s.attributes.device_class === 'connectivity' },
  salt: { domain: 'sensor', keys: ['salt_nearly_empty'], id: /(salt_nearly_empty|sel_presque_vide)$/ },
  rinse_aid: { domain: 'sensor', keys: ['rinse_aid_nearly_empty'], id: /(rinse_aid_nearly_empty|liquide_de_rincage_presque_vide)$/ },
};

// Coffee machine alerts (Home Connect events: `present` or `confirmed` while they last).
HC_ROLES.bean_container = { domain: 'sensor', keys: ['bean_container_empty'] };
HC_ROLES.water_tank = { domain: 'sensor', keys: ['water_tank_empty'] };
HC_ROLES.drip_tray = { domain: 'sensor', keys: ['drip_tray_full'] };
HC_ROLES.descale = { domain: 'sensor', keys: ['device_should_be_descaled'] };
HC_ROLES.clean = { domain: 'sensor', keys: ['device_should_be_cleaned'] };
// Washers with i-Dos: one event per detergent container, `present` while it runs low.
HC_ROLES.idos_1 = { domain: 'sensor', keys: ['poor_i_dos_1_fill_level'] };
HC_ROLES.idos_2 = { domain: 'sensor', keys: ['poor_i_dos_2_fill_level'] };

// Roles found the same way whatever the integration: the hood fan and its lights, the super modes of cold
// appliances (and anything else that shows the appliance at work without a program).
export var hcIsDoor = (s) => s.attributes.device_class === 'door' || s.attributes.device_class === 'opening';
export var hcIsTimestamp = (s) => s.attributes.device_class === 'timestamp';
export var HC_COMMON_ROLES = {
  boost: { domain: 'switch', keys: ['refrigerator_super_mode', 'freezer_super_mode', 'supercooling', 'superfreezing', 'power_cool',
    'power_freeze', 'rapid_freeze', 'express_mode', 'express_fridge', 'super_cool', 'super_frost'] },
  fan: { domain: 'fan', keys: ['fan', 'hood', 'fan_speed'], test: () => true },
  venting: { domain: 'select', keys: ['venting_level'] },
  light: { domain: 'light', keys: ['cooking_lighting', 'light', 'oven_light'], test: () => true },
  // The appliance's energy meter (kWh / Wh, total_increasing): what a cycle used.
  energy: { domain: 'sensor', keys: ['energy', 'energy_consumption', 'total_energy'], test: (s) => s.attributes.device_class === 'energy' },
  // What the appliance draws now (W / kW), and its child lock (a setting: it stays among the option switches too).
  watts: { domain: 'sensor', keys: ['power', 'power_consumption', 'current_power'], test: (s) => s.attributes.device_class === 'power' },
  child_lock: { domain: 'switch', keys: ['child_lock', 'switch_child_lock'] },
};

// The other integrations, role by role. They name things differently and some have no translation key at
// all (doors, a few temperatures), so attributes do the rest. The registry the frontend gets has no
// unique_id, so the entity_id suffix is the last resort.
export var HC_PLATFORM_ROLES = {
  home_connect: HC_ROLES,
  miele: {
    operation_state: { domain: 'sensor', keys: ['status'], test: (s) => (s.attributes.options || []).indexOf('in_use') >= 0 },
    program: { domain: 'sensor', keys: ['program_id'] },
    phase: { domain: 'sensor', keys: ['program_phase'] },
    remaining: { domain: 'sensor', keys: ['remaining_time'] },
    elapsed: { domain: 'sensor', keys: ['elapsed_time'] },
    finish_time: { domain: 'sensor', keys: ['finish'], test: hcIsTimestamp },
    door: { domain: 'binary_sensor', keys: [], test: hcIsDoor },
    start: { domain: 'button', keys: ['start'] },
    stop: { domain: 'button', keys: ['stop'] },
    pause: { domain: 'button', keys: ['pause'] },
    power: { domain: 'switch', keys: ['power'] },
    remote_start: { domain: 'binary_sensor', keys: ['mobile_start'] },
    remote_control: { domain: 'binary_sensor', keys: ['remote_control'] },
  },
  smartthings: {
    operation_state: { domain: 'sensor', keys: ['washer_machine_state', 'dryer_machine_state', 'dishwasher_machine_state',
      'oven_machine_state', 'oven_machine_state_cavity_01'] },
    phase: { domain: 'sensor', keys: ['washer_job_state', 'dryer_job_state', 'dishwasher_job_state', 'oven_job_state',
      'oven_job_state_cavity_01'] },
    progress: { domain: 'sensor', keys: ['washer_progress', 'dryer_progress'] },
    finish_time: { domain: 'sensor', keys: ['completion_time', 'oven_completion_time_cavity_01'], test: hcIsTimestamp },
    operation: { domain: 'select', keys: ['operating_state'] },
    selected_program: { domain: 'select', keys: ['dishwasher_washing_course'] },
    start: { domain: 'button', keys: ['start'] },
    pause: { domain: 'button', keys: ['pause'] },
    resume: { domain: 'button', keys: ['resume'] },
    stop: { domain: 'button', keys: ['cancel', 'stop'] },
    remote_start: { domain: 'binary_sensor', keys: ['remote_control'] },
    door: { domain: 'binary_sensor', keys: ['door'], test: hcIsDoor },
  },
  lg_thinq: {
    operation_state: { domain: 'sensor', keys: ['current_state', 'current_state_for_location'] },
    program: { domain: 'sensor', keys: ['current_dish_washing_course'] },
    finish_time: { domain: 'sensor', keys: ['remain'], test: hcIsTimestamp },
    total: { domain: 'sensor', keys: ['total'] },
    operation: { domain: 'select', keys: ['operation_mode', 'operation_mode_for_location'] },
    power: { domain: 'switch', keys: ['operation_power'] },
    remote_start: { domain: 'binary_sensor', keys: ['remote_control_enabled', 'remote_control_enabled_for_location'] },
    door: { domain: 'binary_sensor', keys: [], id: /_door(_state)?$/, test: hcIsDoor },
  },
  whirlpool: {
    operation_state: { domain: 'sensor', keys: ['washer_state', 'dryer_state', 'oven_state', 'oven_state_upper'] },
    finish_time: { domain: 'sensor', keys: ['end_time'], test: hcIsTimestamp },
    operation: { domain: 'select', keys: ['oven_cook_mode', 'oven_cook_mode_upper'] },
    stop: { domain: 'button', keys: ['oven_stop', 'oven_stop_upper'] },
    door: { domain: 'binary_sensor', keys: [], test: hcIsDoor },
  },
  matter: {
    operation_state: { domain: 'sensor', keys: ['operational_state'] },
    phase: { domain: 'sensor', keys: ['current_phase'] },
    finish_time: { domain: 'sensor', keys: ['estimated_end_time'], test: hcIsTimestamp },
    start: { domain: 'button', keys: ['start'] },
    stop: { domain: 'button', keys: ['stop'] },
    pause: { domain: 'button', keys: ['pause'] },
    resume: { domain: 'button', keys: ['resume'] },
    power: { domain: 'switch', keys: ['power'] },
    door: { domain: 'binary_sensor', keys: ['alarm_door'] },
  },
  // Home Connect Local (chris-mc1/homeconnect_local_hass): the same appliances and states as Home Connect, reached on
  // the local network, with its own keys. Its program select has the Home Connect program names; the running program
  // is a sensor; durations come in the unit the user picked (hours by default).
  homeconnect_ws: {
    operation_state: { domain: 'sensor', keys: ['sensor_operation_state'] },
    door: { domain: 'binary_sensor', keys: ['binary_sensor_door_state'], test: hcIsDoor },
    progress: { domain: 'sensor', keys: ['sensor_program_progress'] },
    remaining: { domain: 'sensor', keys: ['sensor_remaining_program_time'] },
    start_in: { domain: 'sensor', keys: ['sensor_start_in'] },
    elapsed: { domain: 'sensor', keys: ['sensor_elapsed_program_time'] },
    selected_program: { domain: 'select', keys: ['select_program'] },
    active_program: { domain: 'sensor', keys: ['sensor_active_program'] },
    start: { domain: 'button', keys: ['button_start_program'] },
    stop: { domain: 'button', keys: ['button_abort_program'] },
    pause: { domain: 'button', keys: ['button_pause_program'] },
    resume: { domain: 'button', keys: ['button_resume_program'] },
    power: { domain: 'switch', keys: ['switch_power_state'] },
    remote_start: { domain: 'binary_sensor', keys: ['binary_remote_start_allowed'] },
    salt: { domain: 'sensor', keys: ['sensor_salt'] },
    rinse_aid: { domain: 'sensor', keys: ['sensor_rinse_aid'] },
    bean_container: { domain: 'binary_sensor', keys: ['binary_sensor_bean_container_empty'] },
    water_tank: { domain: 'sensor', keys: ['sensor_water_tank'] },
    drip_tray: { domain: 'sensor', keys: ['sensor_drip_tray'] },
    boost: { domain: 'switch', keys: ['switch_super_refrigerator', 'switch_super_freezer'] },
    light: { domain: 'light', keys: ['light_cooking_lighting', 'light_internal'], test: () => true },
  },
  // Liebherr (built in): fridges and freezers, a temperature sensor and a setpoint number per zone, SuperCool / SuperFrost
  // per zone (the super mode), party and night mode switches (settings). Nothing else to find: the common roles do.
  liebherr: {},
  // LocalThings (mbillow/localthings): Samsung appliances over the local network. Its machine state is already
  // idle / active / pause; the step is the oven's cavity state or the laundry progress. A washer or dryer cycle select
  // is keyed by its course table (washer_cycle_table_02…).
  localthings: {
    operation_state: { domain: 'sensor', keys: ['machine_state'] },
    phase: { domain: 'sensor', keys: ['oven_state', 'progress'] },
    progress: { domain: 'sensor', keys: ['progress_percentage'] },
    finish_time: { domain: 'sensor', keys: ['finish_time'], test: hcIsTimestamp },
    remaining: { domain: 'sensor', keys: ['completion_minutes'] },
    selected_program: { domain: 'select', keys: ['cycle', 'oven_mode'], tk: /^(washer|dryer)_cycle_table_/ },
    start: { domain: 'button', keys: ['start', 'start_cooking'] },
    pause: { domain: 'button', keys: ['pause'] },
    stop: { domain: 'button', keys: ['stop'] },
    power: { domain: 'switch', keys: ['power_switch'] },
    remote_start: { domain: 'binary_sensor', keys: ['remote_control'] },
    door: { domain: 'binary_sensor', keys: ['door_open', 'door'], test: hcIsDoor },
  },
  // hOn (gvigroux/hon): Haier, Candy and Hoover appliances through the hOn cloud. Its entities are named after the
  // appliance ("Washing Machine Mode"), only some have a translation key, none has a start or stop button (programs
  // are started with its hon.start_program action): the state is the machine mode (numbered), the step the program
  // phase, the finish time its End time sensor and the progress the clock against the program duration.
  hon: {
    operation_state: { domain: 'sensor', keys: ['wash_mode', 'dishwasher_mode', 'tumbledryer_mode'],
      id: /(?<!_holiday|_intelligence|_quick)_mode$/ },
    phase: { domain: 'sensor', keys: ['wash_program_phase', 'tumbledryer_program_phase'], id: /_program_phase$/ },
    program: { domain: 'sensor', keys: [], tk: /^programs_/, id: /_program_name$/ },
    remaining: { domain: 'sensor', keys: [], id: /_remaining_time$/ },
    finish_time: { domain: 'sensor', keys: [], id: /_end_time$/, test: hcIsTimestamp },
    total: { domain: 'sensor', keys: [], id: /_program_duration$/ },
    door: { domain: 'binary_sensor', keys: [], id: /_door_status$/, test: hcIsDoor },
    remote_control: { domain: 'binary_sensor', keys: [], id: /_remote_control$/ },
    // On while the salt or the rinse aid runs low.
    salt: { domain: 'binary_sensor', keys: [], id: /_salt$/ },
    rinse_aid: { domain: 'binary_sensor', keys: [], id: /_rinse_aid$/ },
  },
};
export var HC_PLATFORMS = Object.keys(HC_PLATFORM_ROLES);
// Switches of Home Connect Local that are appliance settings, not program options.
export var HC_NOT_OPTIONS = ['switch_child_lock'];
// Values of an alert entity (salt, rinse aid, coffee machine tanks) that call for a chip; `full` only on the drip tray.
export var HC_ALERT_ON = ['present', 'confirmed', 'on', 'empty', 'nearly_empty', 'not_inserted'];
// States of a user's own alert entity that call for its chip, when the alert lists none: an on/off entity on, an event
// present, a problem or a low level.
export var HC_CUSTOM_ALERT_ON = HC_ALERT_ON.concat(['problem', 'low', 'open', 'detected', 'wet']);
// The `alerts` option: entities of the user's own (a template sensor, a helper, a leak sensor…) shown as alert chips,
// each `{ entity, name?, icon?, state? }` (`state` a value or a list); a bare entity id is one too.
export function hcCustomAlerts(config) {
  return [].concat(config?.alerts || []).map((a) => (typeof a === 'string' ? { entity: a } : a)).filter((a) => a && typeof a.entity === 'string');
}

// A duration sensor's value in minutes, whatever unit it is shown in (Home Connect Local defaults to hours).
export var HC_MINUTES = { s: 1 / 60, min: 1, h: 60, d: 1440 };
export function hcMinutes(s) {
  var v = Number(s?.state);
  if (!s || s.state === '' || Number.isNaN(v)) return null;
  return v * (HC_MINUTES[s.attributes.unit_of_measurement] ?? 1);
}

// Commands sent as an option of the appliance's operation select, where an integration has no buttons.
export var HC_OPERATION_OPTIONS = {
  smartthings: { start: ['run'], pause: ['pause'], resume: ['run'], stop: ['stop'] },
  lg_thinq: { start: ['start'], stop: ['stop', 'cancel'] },
  whirlpool: { stop: ['standby'] },
};

// Each integration's states, folded into the Home Connect ones the card is drawn from (inactive, ready,
// delayedstart, run, pause, actionrequired, finished, error, aborting), plus `off` and `unavailable`.
// `phase` is the detailed job state some integrations report next to the machine state.
export var HC_STATE_MAPS = {
  miele: {
    off: 'off', on: 'ready', idle: 'ready', programmed: 'ready', reserved: 'ready', waiting_to_start: 'delayedstart',
    in_use: 'run', autocleaning: 'run', superheating: 'run', supercooling: 'run', superfreezing: 'run', supercooling_superfreezing: 'run',
    pause: 'pause', rinse_hold: 'actionrequired', service: 'actionrequired', program_ended: 'finished',
    program_interrupted: 'aborting', failure: 'error', not_connected: 'unavailable',
  },
  lg_thinq: {
    power_off: 'off', sleep: 'off', initial: 'ready', standby: 'ready', power_on: 'ready', initializing: 'ready', preference: 'ready',
    reserved: 'delayedstart', reservation: 'delayedstart', pause: 'pause', paused: 'pause', rinse_hold: 'actionrequired',
    end: 'finished', complete: 'finished', done: 'finished', cook_complete: 'finished', running_end: 'finished', cleaning_is_done: 'finished',
    preheat_complete: 'run', preheating_is_done: 'run', error: 'error', power_fail: 'error', cancel: 'aborting',
  },
  whirlpool: {
    standby: 'ready', setting: 'ready', system_initialize: 'ready', cancelled: 'ready', delay_countdown: 'delayedstart',
    smart_delay: 'delayedstart', delay_paused: 'pause', smart_grid_pause: 'pause', pause: 'pause', complete: 'finished',
    exception: 'error', power_failure: 'error', hard_stop_or_error: 'error', service_diagnostic_mode: 'actionrequired',
    factory_diagnostic_mode: 'actionrequired', life_test: 'actionrequired', customer_focus_mode: 'actionrequired', demo_mode: 'actionrequired',
  },
  matter: { stopped: 'ready', running: 'run', paused: 'pause', error: 'error' },
  // hOn's machine mode (machMode) of washing machines, washer-dryers and tumble dryers.
  hon: { 0: 'off', 1: 'ready', 2: 'run', 3: 'pause', 4: 'delayedstart', 5: 'delayedstart', 6: 'error', 7: 'finished', 8: 'run', 9: 'run' },
};
// A hOn dishwasher numbers its modes its own way: 3 is a delayed start, 5 a delayed start cancelled.
export var HC_HON_DISHWASHER = { 0: 'off', 1: 'ready', 2: 'run', 3: 'delayedstart', 5: 'ready', 6: 'error', 7: 'finished' };
// Unknown values of these integrations are steps of a running program (LG "spinning", Whirlpool "cycle_rinsing"…).
export var HC_STATE_DEFAULT = { lg_thinq: 'run', whirlpool: 'run', matter: 'run', miele: 'ready', hon: 'ready' };

// `kind`: the appliance type, for the integrations that number their states per type (hOn).
export function hcNormState(platform, raw, phase, kind) {
  if (raw === undefined || raw === 'unavailable' || raw === 'unknown') return undefined;
  if (platform === 'smartthings') {
    // Machine state (run / pause / stop, or the oven's ready / running / paused) and the job it is on.
    if (raw === 'run' || raw === 'running') return phase === 'delay_wash' || phase === 'scheduled_start' ? 'delayedstart' : 'run';
    if (raw === 'pause' || raw === 'paused') return 'pause';
    return phase === 'finish' || phase === 'finished' ? 'finished' : 'ready';
  }
  if (platform === 'localthings') {
    // The cavity state and the laundry progress hold `finish` a few minutes after the machine goes back to idle.
    if (raw === 'active') return phase === 'delaywash' ? 'delayedstart' : 'run';
    if (raw === 'pause') return 'pause';
    return phase === 'finish' ? 'finished' : 'ready';
  }
  var map = platform === 'hon' && kind === 'dishwasher' ? HC_HON_DISHWASHER : HC_STATE_MAPS[platform];
  if (!map) return raw;
  return map[raw] || HC_STATE_DEFAULT[platform] || raw;
}

// The integration a device belongs to, read from its entities.
export function hcPlatform(list) {
  var e = list.find((x) => HC_PLATFORMS.indexOf(x.platform) >= 0);
  return e ? e.platform : 'home_connect';
}

export var HC_OVERRIDABLE = ['operation_state', 'door', 'progress', 'finish_time', 'selected_program',
  'active_program', 'power', 'stop', 'pause', 'resume', 'remote_start', 'remote_control', 'connectivity', 'salt', 'rinse_aid', 'energy'];
// Every role, overridable or not.
export var HC_ALL_ROLES = HC_OVERRIDABLE.concat(['bean_container', 'water_tank', 'drip_tray', 'descale', 'clean', 'idos_1', 'idos_2', 'program', 'phase', 'remaining', 'start_in', 'elapsed',
  'total', 'operation', 'start'], Object.keys(HC_COMMON_ROLES).filter((r) => HC_OVERRIDABLE.indexOf(r) < 0));

// Registry entries grouped by device, built once per `hass.entities` object (it only changes with the registry).
export var hcRegistryIndex = new WeakMap();
export function hcRegistryByDevice(reg) {
  var index = hcRegistryIndex.get(reg);
  if (!index) {
    index = new Map();
    Object.values(reg).forEach((e) => {
      if (!e.device_id || e.hidden) return;
      if (!index.has(e.device_id)) index.set(e.device_id, []);
      index.get(e.device_id).push(e);
    });
    hcRegistryIndex.set(reg, index);
  }
  return index;
}

export function hcDeviceEntities(hass, deviceId) {
  if (!hass?.entities || !deviceId) return [];
  return (hcRegistryByDevice(hass.entities).get(deviceId) || []).filter((e) => hass.states[e.entity_id]);
}

// Role matching for a device, cached per `hass.entities` object like the registry index above:
// the result only depends on the registry and on which entities have a state yet (hence the
// count guard), not on the states themselves, so it isn't redone on every state change.
export var hcRoleIndex = new WeakMap();
export var HC_NO_ROLES = { count: 0, platform: 'home_connect', roles: {}, switches: [], selects: [] };
export function hcDeviceRoles(hass, deviceId) {
  if (!hass?.entities || !deviceId) return HC_NO_ROLES;
  var byDevice = hcRoleIndex.get(hass.entities);
  if (!byDevice) hcRoleIndex.set(hass.entities, (byDevice = new Map()));
  var list = hcDeviceEntities(hass, deviceId);
  var cached = byDevice.get(deviceId);
  if (cached && cached.count === list.length) return cached;
  var platform = hcPlatform(list);
  var table = Object.assign({}, HC_COMMON_ROLES, HC_PLATFORM_ROLES[platform]);
  var roles = {};
  Object.keys(table).forEach((role) => { roles[role] = hcFindRole(hass, list, table[role]); });
  // Home Connect lists every switch and select as a program option; elsewhere diagnostics are left out (and, for
  // Home Connect Local, the appliance settings too). Home Connect Local's power state select repeats its power switch
  // (the On/Off button) when the appliance has only two power states; with more, there is no switch and the select
  // stays, as the only way to set them.
  var powerDup = (e) => e.translation_key === 'select_power_state' && Boolean(roles.power);
  var opts = platform === 'home_connect' ? list : list.filter((e) => e.entity_category !== 'diagnostic' &&
    (platform !== 'homeconnect_ws' || (e.entity_category !== 'config' && HC_NOT_OPTIONS.indexOf(e.translation_key) < 0 && !powerDup(e))) &&
    (platform !== 'localthings' || e.entity_category !== 'config'));
  var ids = opts.map((e) => e.entity_id);
  cached = {
    count: list.length,
    platform: platform,
    roles: roles,
    switches: ids.filter((id) => id.indexOf('switch.') === 0),
    selects: ids.filter((id) => id.indexOf('select.') === 0),
    temps: hcTempIds(hass, list),
    zones: hcZoneIds(hass, list),
  };
  byDevice.set(deviceId, cached);
  return cached;
}

export function hcFindRole(hass, list, m) {
  var inDomain = list.filter((e) => e.entity_id.split('.')[0] === m.domain);
  var hit = inDomain.find((e) => m.keys.indexOf(e.translation_key) >= 0);
  if (!hit && m.tk) hit = inDomain.find((e) => m.tk.test(e.translation_key || ''));
  if (!hit && m.id) hit = inDomain.find((e) => m.id.test(e.entity_id));
  if (!hit && m.test) hit = inDomain.find((e) => m.test(hass.states[e.entity_id]));
  return hit ? hit.entity_id : undefined;
}

// Temperatures worth a chip: measured ones (sensors, climate entities) first, then setpoints (numbers).
export function hcTempIds(hass, list) {
  var unit = (s) => /°[CF]/.test(s.attributes.unit_of_measurement || '');
  var pick = (domain, test) => list.filter((e) => e.entity_id.split('.')[0] === domain && e.entity_category !== 'diagnostic' &&
    test(hass.states[e.entity_id])).map((e) => e.entity_id);
  return pick('climate', (s) => s.attributes.current_temperature != null)
    .concat(pick('sensor', (s) => s.attributes.device_class === 'temperature' || unit(s)))
    .concat(pick('number', unit)).slice(0, 6);
}

// The measured temperatures of a cold appliance, each with the setpoint (a `number`) of its compartment when there is one:
// the setpoint whose entity_id shares strictly the most with it (`sensor.fridge_top_zone` with
// `number.fridge_top_zone_setpoint`), or the only one beside a single temperature. Setpoints left over stand alone.
export function hcTempPairs(ids) {
  var obj = (id) => id.split('.')[1];
  var shared = (a, b) => { var n = 0; while (n < a.length && a[n] === b[n]) n++; return n; };
  var measured = ids.filter((id) => id.indexOf('number.') !== 0);
  var setpoints = ids.filter((id) => id.indexOf('number.') === 0);
  var pairs = measured.map((id) => ({ temp: id, setpoint: undefined }));
  setpoints.forEach((sp) => {
    var best = -1, at = -1, tie = false;
    pairs.forEach((p, i) => {
      if (p.setpoint) return;
      var n = shared(obj(sp), obj(p.temp));
      if (n > best) { best = n; at = i; tie = false; } else if (n === best) tie = true;
    });
    var lone = measured.length === 1 && setpoints.length === 1;
    if (at >= 0 && (lone || (!tie && best > 0))) pairs[at].setpoint = sp;
    else pairs.push({ temp: undefined, setpoint: sp });
  });
  return pairs;
}

// Above this a compartment is too warm, by default: 8 °C in a fridge, −12 °C in a freezer (46 / 10 °F).
export var HC_TOO_WARM = { fridge: { '°C': 8, '°F': 46 }, freezer: { '°C': -12, '°F': 10 } };
export var HC_FREEZER_WORDS = /freez|congel|gefrier|congela|vries|zamra/i;

// A hob's cooking zones: one per power level (LG ThinQ's per-location power level, Miele's plates), else one per
// per-location state; each zone's state and timer joined to it by the longest shared entity_id start (the location's
// slug: `number.hob_left_front_power_level` with `sensor.hob_left_front_remaining_time`). At most 8 zones.
export var HC_ZONE_LEVEL = /^(power_level|plate)(_for_location)?$/;
export function hcZoneIds(hass, list) {
  var key = (e) => e.translation_key || '';
  var isTimer = (s) => ['timestamp', 'duration'].indexOf(s.attributes.device_class) >= 0 || HC_MINUTES[s.attributes.unit_of_measurement] != null;
  var levels = list.filter((e) => /^(sensor|number)\./.test(e.entity_id) && (HC_ZONE_LEVEL.test(key(e)) ||
    (!e.translation_key && /_(power_level|plate_\d+)$/.test(e.entity_id))));
  var loc = list.filter((e) => e.entity_id.indexOf('sensor.') === 0 && /_for_location$/.test(key(e)) && !HC_ZONE_LEVEL.test(key(e)));
  var states = loc.filter((e) => !isTimer(hass.states[e.entity_id]));
  var timers = loc.filter((e) => isTimer(hass.states[e.entity_id]));
  var zones = (levels.length ? levels : states).slice(0, 8).map((e) => ({ level: levels.length ? e.entity_id : undefined,
    state: levels.length ? undefined : e.entity_id, timer: undefined, ids: [e.entity_id] }));
  var shared = (a, b) => { var n = 0; while (n < a.length && a[n] === b[n]) n++; return n; };
  var obj = (id) => id.split('.')[1];
  // Joined only to the zone it shares strictly the most with: a tie (no location in the id) joins nothing.
  var join = (e, role) => {
    var best = -1, at = -1, tie = false;
    zones.forEach((z, i) => {
      var n = shared(obj(e.entity_id), obj(z.ids[0]));
      if (n > best) { best = n; at = i; tie = false; } else if (n === best) tie = true;
    });
    if (at >= 0 && !tie && !zones[at][role]) { zones[at][role] = e.entity_id; zones[at].ids.push(e.entity_id); }
  };
  if (levels.length) for (var e of states) join(e, 'state');
  for (var t of timers) join(t, 'timer');
  return zones;
}

// Appliance type, from the device itself where the integration says it (Miele's model, LG's device type), else
// from what its entities are: the Home Connect programs, then the keys only one kind of appliance has.
export var HC_MIELE_MODELS = [
  [/washer dryer/i, 'washer_dryer'], [/washing machine/i, 'washer'], [/tumble dryer|dryer/i, 'dryer'], [/dishwasher/i, 'dishwasher'],
  [/^microwave/i, 'microwave'], [/oven|steam/i, 'oven'], [/coffee/i, 'coffee_maker'], [/hood/i, 'hood'], [/hob/i, 'hob'],
  [/wine/i, 'wine_cooler'], [/fridge|refrigerator/i, 'fridge'], [/freezer/i, 'freezer'],
];
export var HC_LG_TYPES = {
  WASHER: 'washer', DRYER: 'dryer', WASHTOWER: 'washer_dryer', WASHTOWER_WASHER: 'washer', WASHTOWER_DRYER: 'dryer',
  WASHCOMBO_MAIN: 'washer_dryer', WASHCOMBO_MINI: 'washer', DISH_WASHER: 'dishwasher', OVEN: 'oven', MICROWAVE_OVEN: 'microwave',
  COOKTOP: 'hob', HOOD: 'hood', REFRIGERATOR: 'fridge', KIMCHI_REFRIGERATOR: 'fridge', WINE_CELLAR: 'wine_cooler', STYLER: 'styler',
};
export var HC_WS_TYPES = {
  Dishwasher: 'dishwasher', Washer: 'washer', Dryer: 'dryer', WasherDryer: 'washer_dryer', Oven: 'oven', Microwave: 'microwave',
  CoffeeMaker: 'coffee_maker', Hood: 'hood', Hob: 'hob', Cooktop: 'hob', Refrigerator: 'fridge', FridgeFreezer: 'fridge',
  Freezer: 'freezer', WineCooler: 'wine_cooler',
};
// LocalThings names the device after its type: "Samsung Oven (NV7B4445VAK)".
export var HC_LOCALTHINGS_TYPES = {
  Washer: 'washer', Dryer: 'dryer', Dishwasher: 'dishwasher', Oven: 'oven', Range: 'oven', Microwave: 'microwave',
  Cooktop: 'hob', 'Range Hood': 'hood', Refrigerator: 'fridge', 'Air Dresser': 'styler',
};
// [kind, translation keys any one of which gives it away], in order.
export var HC_KEY_KINDS = [
  ['washer_dryer', (k) => k.washer_machine_state && k.dryer_machine_state],
  ['washer', ['washer_machine_state', 'washer_state', 'laundry_washer_spin_speed', 'laundry_washer_number_of_rinses']],
  ['dryer', ['dryer_machine_state', 'dryer_state', 'drying_target']],
  ['dishwasher', ['dishwasher_machine_state', 'dishwasher_alarm_inflow', 'salt_nearly_empty', 'rinse_aid_nearly_empty']],
  ['microwave', ['power_level', 'cook_time']],
  ['oven', ['oven_machine_state', 'oven_machine_state_cavity_01', 'oven_state', 'oven_state_upper', 'oven_current_cavity_temperature']],
  ['coffee_maker', ['bean_container_empty', 'coffee_counter']],
  ['hood', ['venting_level', 'hood', 'hood_fan_speed', 'hood_filter_usage']],
  // A Home Connect hob has no program: it is the only appliance with both the favorite keys (also on hoods) and the
  // preheat / alarm clock events (also on ovens), sensors the integration creates from the appliance type.
  ['hob', (k) => (k.favorite_short_press || k.favorite_long_press) && (k.preheat_finished || k.alarm_clock_elapsed)],
  ['wine_cooler', ['wine_compartment_setpoint_temperature']],
  ['fridge', ['refrigerator_setpoint_temperature', 'refrigerator_super_mode', 'cooler_temperature', 'power_cool',
    'refrigerator_temperature_level', 'refrigerator_door', 'super_cool', 'bio_fresh_plus', 'hydro_breeze']],
  ['freezer', ['freezer_setpoint_temperature', 'freezer_super_mode', 'freezer_temperature', 'power_freeze', 'super_frost', 'ice_maker']],
  // A Liebherr appliance with no super mode: a fridge until told otherwise (`kind`).
  ['fridge', (k) => k.setpoint_temperature || k.setpoint_temperature_top_zone],
];

// hOn: the type from the translation key of the program name or machine mode sensor (programs_wm…, wash_mode…), else
// from the entities only one type has. Its ovens and hobs (no state the card can read), air conditioners, purifiers and
// water heaters are left out.
export var HC_HON_TYPES = {
  programs_wm: 'washer', programs_wd: 'washer_dryer', programs_td: 'dryer', programs_dw: 'dishwasher', programs_ref: 'fridge', programs_wc: 'wine_cooler', dishwasher_mode: 'dishwasher', tumbledryer_mode: 'dryer',
  tumbledryer_program_phase: 'dryer',
};
export var HC_HON_IDS = [
  [/^sensor\..+_dry_level$/, 'dryer'], [/^binary_sensor\..+_(salt|rinse_aid)$/, 'dishwasher'], [/^sensor\..+_spin_speed$/, 'washer'],
];
export function hcHonKind(list) {
  var key = list.map((e) => e.translation_key).find((k) => HC_HON_TYPES[k]);
  if (key) return HC_HON_TYPES[key];
  var wd = list.some((e) => /^sensor\..+_dry_level$/.test(e.entity_id)) && list.some((e) => /^sensor\..+_spin_speed$/.test(e.entity_id));
  if (wd) return 'washer_dryer';
  if (list.some((e) => e.translation_key === 'wash_mode')) return 'washer';
  var hit = HC_HON_IDS.find((m) => list.some((e) => m[0].test(e.entity_id)));
  return hit ? hit[1] : null;
}

export var hcKindIndex = new WeakMap();
export function hcKindOf(hass, deviceId) {
  var list = hcDeviceEntities(hass, deviceId);
  if (!list.length) return null;
  var byDevice = hcKindIndex.get(hass.entities);
  if (!byDevice) hcKindIndex.set(hass.entities, (byDevice = new Map()));
  var cached = byDevice.get(deviceId);
  // Program options can show up after the first look: a miss is looked at again on the next update.
  if (cached && cached.count === list.length && cached.kind) return cached.kind;
  var kind = hcDetectKind(hass, deviceId, list);
  byDevice.set(deviceId, { count: list.length, kind: kind });
  return kind;
}

export function hcDetectKind(hass, deviceId, list) {
  var platform = hcPlatform(list);
  if (platform !== 'home_connect' && !list.some((e) => e.platform === platform)) return null;
  var dev = hass.devices?.[deviceId] || {};
  if (platform === 'miele') {
    var hit = HC_MIELE_MODELS.find((m) => m[0].test(dev.model || ''));
    if (hit) return hit[1];
  }
  if (platform === 'lg_thinq') {
    var t = String(dev.model || '').match(/\((?:DEVICE_)?([A-Z_]+)\)\s*$/);
    if (t && HC_LG_TYPES[t[1]]) return HC_LG_TYPES[t[1]];
  }
  // Home Connect Local names the device model after the appliance type (Dishwasher, WasherDryer…).
  if (platform === 'homeconnect_ws' && HC_WS_TYPES[dev.model]) return HC_WS_TYPES[dev.model];
  if (platform === 'localthings') {
    var lt = String(dev.name || '').match(/^Samsung (.+?)(?: \(.*\))?$/);
    if (lt && HC_LOCALTHINGS_TYPES[lt[1]]) return HC_LOCALTHINGS_TYPES[lt[1]];
  }
  if (platform === 'hon') {
    var hon = hcHonKind(list);
    if (hon) return hon;
  }
  // Home Connect programs.
  var progs = list.filter((e) => e.entity_id.indexOf('select.') === 0)
    .map((e) => ((hass.states[e.entity_id]?.attributes.options) || []).join(' ')).join(' ');
  if (progs) {
    // The microwave's programs are oven programs whose names say microwave; the oven has some of those too.
    var p = Object.keys(HC_PROFILES).find((k) => HC_PROFILES[k].prefix && progs.indexOf(HC_PROFILES[k].prefix) >= 0);
    if (p === 'microwave' && progs.replace(/cooking_oven_program_microwave_/g, '').indexOf('cooking_oven_program_') >= 0) p = 'oven';
    if (p) return p;
  }
  var keys = {};
  list.forEach((e) => { if (e.translation_key) keys[e.translation_key] = true; });
  var k = HC_KEY_KINDS.find((x) => (typeof x[1] === 'function' ? x[1](keys) : x[1].some((n) => keys[n])));
  if (k) return k[0];
  return null;
}

// The device found for a kind — or the miss — is remembered per `hass.devices` object, so a card
// without an appliance doesn't rescan every device on each state change. A miss is still retried
// every 30 s: the select options a kind is detected from may simply not be loaded yet. Without a
// kind (the single card picking any appliance), the first device of a supported type is taken.
export var hcFoundDevices = new WeakMap();
export var HC_MISS_RETRY = 30000;
export function hcFindDevice(hass, kind) {
  if (!hass?.devices) return undefined;
  var found = hcFoundDevices.get(hass.devices);
  if (!found) hcFoundDevices.set(hass.devices, (found = {}));
  var key = kind || 'any';
  var ok = (d) => (kind ? hcKindOf(hass, d) === kind : !!hcKindOf(hass, d));
  var id = found[key];
  if (id && hass.devices[id] && ok(id)) return id;
  if (id === null && Date.now() < found[`retry_${key}`]) return undefined;
  id = Object.keys(hass.devices).find(ok);
  found[key] = id || null;
  if (!id) found[`retry_${key}`] = Date.now() + HC_MISS_RETRY;
  return id;
}

// Brand of the appliance, for its badge and the colour of its main buttons: the device's manufacturer
// (Home Connect gives the brand, SmartThings and LG the maker), or the `brand` option (Whirlpool always
// says Whirlpool, even for a Maytag).
export var HC_BRANDS = {
  bosch: { name: 'Bosch', color: '#e20015' }, siemens: { name: 'Siemens', color: '#009999' }, neff: { name: 'Neff', color: '#b3123a' },
  gaggenau: { name: 'Gaggenau', color: '#3a3a3a' }, constructa: { name: 'Constructa', color: '#00589b' }, miele: { name: 'Miele', color: '#8c0014' },
  samsung: { name: 'Samsung', color: '#1428a0', match: /samsung/i }, lg: { name: 'LG', color: '#a50034', match: /^(lg|lge|lg electronics)$/i },
  whirlpool: { name: 'Whirlpool', color: '#8a6a00' }, maytag: { name: 'Maytag', color: '#002d72' }, kitchenaid: { name: 'KitchenAid', color: '#c8102e' },
  consul: { name: 'Consul', color: '#0067b1' }, liebherr: { name: 'Liebherr', color: '#4d5257' },
  haier: { name: 'Haier', color: '#005eb8' }, candy: { name: 'Candy', color: '#e2001a' }, hoover: { name: 'Hoover', color: '#c8102e' },
};
// Brand logos (SVG or PNG files in logos/, named after the HC_BRANDS key), embedded by the build; brands without one keep
// the initial on their colour.
export var HC_BRAND_LOGOS = {}; // __BRAND_LOGOS__
export function hcBrand(dev, option) {
  var m = String(option || dev?.manufacturer || '').trim();
  if (!m) return null;
  var key = Object.keys(HC_BRANDS).find((k) => (HC_BRANDS[k].match ? HC_BRANDS[k].match.test(m) : m.toLowerCase().replace(/[\s-]/g, '') === k));
  return key ? Object.assign({ key: key }, HC_BRANDS[key]) : { key: 'other', name: m, color: '#55606d' };
}

// Fallback label for a Home Connect enum value when HA has no translation for it:
// "laundry_care_washer_enum_type_spin_speed_r_p_m_1200" → "1200 rpm".
export function hcHumanize(value) {
  var v = String(value || '');
  var m = v.match(/_g_c_(\d+)$/);
  if (m) return `${m[1]} °C`;
  m = v.match(/_r_p_m_(\d+)$/);
  if (m) return `${m[1]} rpm`;
  v = v.replace(/^.*_program_/, '')
    .replace(/^.*_enum_type_(temperature|spin_speed|vario_perfect|drying_target|[a-z]+)_/, '')
    .replace(/^ul_/, '');
  v = v.replace(/_/g, ' ').trim();
  return v.charAt(0).toUpperCase() + v.slice(1);
}


// Appliance illustrations (front view). The state color lights the display; when running the
// washer drum turns and the dishwasher projects its floor light, like the real appliances.
// Heights (px, with the 10 px gap above each block) used for getCardSize, measured in Chromium on the README captures.
export var HC_PX = {
  base: 158, // padding, header and illustration
  miniBase: 142, // padding, header and the illustration row of a mini card
  bannerBase: 150, // illustrated header, the state row under it (one line and the power button) and the padding
  bannerMini: 154, // illustrated header, the mini card's state row and the padding
  bannerTime: 20, // the finish time under the state, with the illustrated header
  bannerChips: 24, // the chips under the state, with the illustrated header
  program: 58,
  section: 26,
  selectRow: 56,
  toggleRow: 28,
  zoneRow: 62, // a row of hob zone tiles
  stepRow: 38, // a setpoint's − / + row
  reload: 30,
  error: 26,
  controls: 44,
  hint: 20,
};

// The control under focus, as [data attribute, value], to find its replacement after a render.
export function hcFocusKey(el) {
  var ds = el?.dataset;
  if (!ds) return null;
  var k = ['action', 'toggle', 'select', 'entity'].find((a) => ds[a]);
  return k ? [k, ds[k]] : null;
}

// A header chip: a click (or Enter / Space) opens the more-info dialog of `entity`, when it has one.
export function hcChip(cls, icon, text, entity, title) {
  var more = entity ? ` role="button" tabindex="0" data-entity="${hcEsc(entity)}"` : '';
  return `<span class="${cls}${entity ? ' clickable' : ''}"${more}${title ? ` title="${hcEsc(title)}"` : ''}><ha-icon icon="${icon}"></ha-icon>${text}</span>`;
}

export function hcRows(px) { return Math.max(1, Math.round(px / 50)); }

export var HC_ART = {
  washer: '<svg viewBox="0 0 80 94" aria-hidden="true">' +
    '<defs><linearGradient id="hc-wb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2e6eb"/></linearGradient>' +
    '<linearGradient id="hc-wr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dfe4ea"/><stop offset="1" stop-color="#97a2ae"/></linearGradient>' +
    '<radialGradient id="hc-wg" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#9edbff"/><stop offset=".55" stop-color="#3b8fe0"/><stop offset="1" stop-color="#1c4c97"/></radialGradient>' +
    '<clipPath id="hc-wc"><circle cx="40" cy="55" r="17"/></clipPath></defs><g class="shake">' +
    '<rect x="10" y="88" width="9" height="4" rx="1.5" fill="#8f9aa6"/><rect x="61" y="88" width="9" height="4" rx="1.5" fill="#8f9aa6"/>' +
    '<rect x="4" y="2" width="72" height="87" rx="9" fill="url(#hc-wb)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M4.6 21H75.4" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="10" y="8" width="17" height="8" rx="2" fill="#fff" stroke="#c3cad2"/><path d="M13 12h11" stroke="#c3cad2" stroke-linecap="round"/>' +
    '<rect x="33" y="8.5" width="17" height="7" rx="2" fill="#1d2632"/><rect class="led" x="35.5" y="11" width="9" height="2" rx="1"/>' +
    '<circle cx="64" cy="12" r="5.2" fill="#fff" stroke="#aeb7c2" stroke-width="1.2"/><path d="M64 12V8.6" stroke="#7d8894" stroke-width="1.4" stroke-linecap="round"/>' +
    '<circle cx="40" cy="55" r="25" fill="url(#hc-wr)"/><circle cx="40" cy="55" r="21" fill="#eef2f6"/><circle cx="40" cy="55" r="17" fill="url(#hc-wg)"/>' +
    '<g clip-path="url(#hc-wc)"><path class="wave" d="M14 58q6.5-4 13 0t13 0 13 0 13 0V80H14Z" fill="#7fd0ff" opacity=".55"/>' +
      '<g class="drum"><circle cx="33" cy="61" r="5.5" fill="#ff8a65" opacity=".9"/><circle cx="46" cy="63" r="4.5" fill="#fff59d" opacity=".9"/>' +
      '<circle cx="41" cy="47" r="3.5" fill="#ffffff" opacity=".55"/><circle cx="31" cy="50" r="3" fill="#80cbc4" opacity=".9"/><circle cx="40" cy="55" r="12" fill="none" stroke="#fff" stroke-opacity=".25" stroke-dasharray="2 4"/></g></g>' +
    '<g class="bubbles"><circle cx="34" cy="62" r="1.6"/><circle cx="44" cy="64" r="1.2"/><circle cx="39" cy="60" r="1"/></g>' +
    '<path d="M28 44a16 16 0 0 1 12-6" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>' +
    '<rect x="62.5" y="50" width="3" height="10" rx="1.5" fill="#aeb7c2"/></g></svg>',
  dishwasher: '<svg viewBox="0 0 80 94" aria-hidden="true">' +
    '<defs><linearGradient id="hc-db" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f8fa"/><stop offset=".6" stop-color="#e3e7ec"/><stop offset="1" stop-color="#cfd5dc"/></linearGradient>' +
    '<linearGradient id="hc-dp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#36404d"/><stop offset="1" stop-color="#1b222b"/></linearGradient>' +
    '<linearGradient id="hc-dh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset="1" stop-color="#9aa5b1"/></linearGradient>' +
    '<radialGradient id="hc-df" cx=".5" cy=".5" r=".5"><stop offset="0" class="floor-c" stop-opacity=".55"/><stop offset="1" class="floor-c" stop-opacity="0"/></radialGradient></defs>' +
    '<ellipse class="floor" cx="40" cy="90" rx="30" ry="4" fill="url(#hc-df)"/>' +
    '<g class="steam" fill="none" stroke="#b0bec5" stroke-width="2.2" stroke-linecap="round">' +
      '<path d="M26 0q-3-4 0-8t0-8"/><path d="M40 0q-3-4 0-8t0-8"/><path d="M54 0q-3-4 0-8t0-8"/></g>' +
    '<rect x="4" y="2" width="72" height="86" rx="7" fill="url(#hc-db)" stroke="#bac2cb" stroke-width="1.2"/>' +
    '<path d="M11 2h58a7 7 0 0 1 7 7v9H4V9a7 7 0 0 1 7-7Z" fill="url(#hc-dp)"/>' +
    '<rect x="10" y="7.5" width="16" height="6" rx="2" fill="#0d1218"/><rect class="led" x="12" y="9.5" width="8" height="2" rx="1"/>' +
    '<circle cx="45" cy="10.5" r="1.6" fill="#7d8894"/><circle cx="52" cy="10.5" r="1.6" fill="#7d8894"/><circle cx="59" cy="10.5" r="1.6" fill="#7d8894"/><circle cx="67" cy="10.5" r="2.2" fill="none" stroke="#9aa5b1" stroke-width="1.2"/>' +
    '<rect x="14" y="23" width="52" height="5" rx="2.5" fill="url(#hc-dh)" stroke="#9aa5b1" stroke-width=".8"/>' +
    '<rect x="10" y="33" width="60" height="44" rx="4" fill="none" stroke="#fff" stroke-opacity=".75"/>' +
    '<path d="M18 36l20 38M30 36l20 38" stroke="#fff" stroke-width="5" stroke-opacity=".22" stroke-linecap="round"/>' +
    '<g class="drops" fill="#64b5f6"><circle cx="24" cy="50" r="1.4"/><circle cx="40" cy="44" r="1.4"/><circle cx="56" cy="50" r="1.4"/>' +
      '<circle cx="32" cy="62" r="1.2"/><circle cx="48" cy="62" r="1.2"/></g>' +
    '<rect x="4.6" y="80" width="70.8" height="7.4" rx="0" fill="#c3cad2" opacity=".6"/></svg>',
  // Tumble dryer: the laundry tumbles in the warm drum while heat rises.
  dryer: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-yb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/>' +
    '<stop offset="1" stop-color="#e2e6eb"/></linearGradient><linearGradient id="hc-yr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dfe4ea"/>' +
    '<stop offset="1" stop-color="#97a2ae"/></linearGradient><radialGradient id="hc-yg" cx=".4" cy=".32" r=".8"><stop offset="0" stop-color="#ffe0b2"/>' +
    '<stop offset=".55" stop-color="#ff9e40"/><stop offset="1" stop-color="#a24b0c"/></radialGradient><clipPath id="hc-yc"><circle cx="40" cy="55" r="17"/>' +
    '</clipPath></defs><g class="shake"><rect x="10" y="88" width="9" height="4" rx="1.5" fill="#8f9aa6"/>' +
    '<rect x="61" y="88" width="9" height="4" rx="1.5" fill="#8f9aa6"/>' +
    '<rect x="4" y="2" width="72" height="87" rx="9" fill="url(#hc-yb)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M4.6 21H75.4" stroke="#c3cad2" stroke-width="1.2"/><circle cx="16" cy="12" r="5.2" fill="#fff" stroke="#aeb7c2" stroke-width="1.2"/>' +
    '<path d="M16 12l2.6-2.2" stroke="#7d8894" stroke-width="1.4" stroke-linecap="round"/>' +
    '<rect x="30" y="8.5" width="20" height="7" rx="2" fill="#1d2632"/><rect class="led" x="32.5" y="11" width="10" height="2" rx="1"/>' +
    '<circle cx="58" cy="12" r="1.8" fill="#aeb7c2"/><circle cx="65" cy="12" r="1.8" fill="#aeb7c2"/><circle cx="72" cy="12" r="1.8" fill="#aeb7c2"/>' +
    '<circle cx="40" cy="55" r="25" fill="url(#hc-yr)"/><circle cx="40" cy="55" r="21" fill="#eef2f6"/><circle cx="40" cy="55" r="17" fill="url(#hc-yg)"/>' +
    '<g clip-path="url(#hc-yc)"><g class="tumble">' +
    '<rect x="28" y="56" width="12" height="7" rx="3.5" fill="#ff8a65" opacity=".9" transform="rotate(-18 34 59)"/>' +
    '<rect x="40" y="58" width="11" height="6" rx="3" fill="#fff59d" opacity=".9" transform="rotate(14 45 61)"/>' +
    '<rect x="34" y="46" width="10" height="6" rx="3" fill="#80cbc4" opacity=".9" transform="rotate(8 39 49)"/></g>' +
    '<g class="heat" fill="none" stroke="#fff3e0" stroke-width="1.4" stroke-linecap="round" opacity=".8"><path d="M33 66q-2-3 0-6t0-6"/>' +
    '<path d="M40 66q-2-3 0-6t0-6"/><path d="M47 66q-2-3 0-6t0-6"/></g></g>' +
    '<path d="M28 44a16 16 0 0 1 12-6" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>' +
    '<rect x="62.5" y="50" width="3" height="10" rx="1.5" fill="#aeb7c2"/><rect x="26" y="83" width="28" height="3" rx="1.5" fill="#d5dbe2"/></g></svg>',
  // Washer-dryer: half wash water, half warm air in the porthole.
  washer_dryer: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-xb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/>' +
    '<stop offset="1" stop-color="#e2e6eb"/></linearGradient><linearGradient id="hc-xr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dfe4ea"/>' +
    '<stop offset="1" stop-color="#97a2ae"/></linearGradient><linearGradient id="hc-xg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9edbff"/>' +
    '<stop offset=".48" stop-color="#3b8fe0"/><stop offset=".52" stop-color="#e8873a"/><stop offset="1" stop-color="#a24b0c"/></linearGradient>' +
    '<clipPath id="hc-xc"><circle cx="40" cy="55" r="17"/></clipPath></defs><g class="shake">' +
    '<rect x="10" y="88" width="9" height="4" rx="1.5" fill="#8f9aa6"/><rect x="61" y="88" width="9" height="4" rx="1.5" fill="#8f9aa6"/>' +
    '<rect x="4" y="2" width="72" height="87" rx="9" fill="url(#hc-xb)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M4.6 21H75.4" stroke="#c3cad2" stroke-width="1.2"/><circle cx="16" cy="12" r="5.2" fill="#fff" stroke="#aeb7c2" stroke-width="1.2"/>' +
    '<path d="M16 12l2.6-2.2" stroke="#7d8894" stroke-width="1.4" stroke-linecap="round"/>' +
    '<rect x="30" y="8.5" width="20" height="7" rx="2" fill="#1d2632"/><rect class="led" x="32.5" y="11" width="10" height="2" rx="1"/>' +
    '<circle cx="58" cy="12" r="1.8" fill="#aeb7c2"/><circle cx="65" cy="12" r="1.8" fill="#aeb7c2"/><circle cx="72" cy="12" r="1.8" fill="#aeb7c2"/>' +
    '<path d="M53 9.5l2 3h-4Z M59 9.5q2 2 0 4" fill="none" stroke="#7d8894" stroke-width=".9"/><circle cx="40" cy="55" r="25" fill="url(#hc-xr)"/>' +
    '<circle cx="40" cy="55" r="21" fill="#eef2f6"/><circle cx="40" cy="55" r="17" fill="url(#hc-xg)"/><g clip-path="url(#hc-xc)"><g class="drum">' +
    '<circle cx="33" cy="61" r="5.5" fill="#ff8a65" opacity=".9"/><circle cx="46" cy="63" r="4.5" fill="#fff59d" opacity=".9"/>' +
    '<circle cx="31" cy="50" r="3" fill="#80cbc4" opacity=".9"/>' +
    '<circle cx="40" cy="55" r="12" fill="none" stroke="#fff" stroke-opacity=".25" stroke-dasharray="2 4"/></g>' +
    '<g class="heat" fill="none" stroke="#fff3e0" stroke-width="1.4" stroke-linecap="round" opacity=".8"><path d="M36 66q-2-3 0-6t0-6"/>' +
    '<path d="M43 66q-2-3 0-6t0-6"/><path d="M50 66q-2-3 0-6t0-6"/></g></g>' +
    '<path d="M28 44a16 16 0 0 1 12-6" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>' +
    '<rect x="62.5" y="50" width="3" height="10" rx="1.5" fill="#aeb7c2"/></g></svg>',
  // Oven: the cavity glows, the fan turns and heat shimmers over the dish.
  oven: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-ob" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f8fa"/>' +
    '<stop offset=".6" stop-color="#e3e7ec"/><stop offset="1" stop-color="#cfd5dc"/></linearGradient>' +
    '<linearGradient id="hc-op" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#36404d"/><stop offset="1" stop-color="#1b222b"/></linearGradient>' +
    '<linearGradient id="hc-ow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a323c"/><stop offset="1" stop-color="#11161c"/></linearGradient>' +
    '<radialGradient id="hc-og" cx=".5" cy=".55" r=".65"><stop offset="0" stop-color="#ffcc80"/><stop offset=".6" stop-color="#ff8f00" stop-opacity=".75"/>' +
    '<stop offset="1" stop-color="#ff6f00" stop-opacity="0"/></radialGradient><clipPath id="hc-oc"><rect x="12" y="34" width="56" height="44" rx="4"/>' +
    '</clipPath></defs><rect x="4" y="4" width="72" height="84" rx="7" fill="url(#hc-ob)" stroke="#bac2cb" stroke-width="1.2"/>' +
    '<path d="M11 4h58a7 7 0 0 1 7 7v9H4v-9a7 7 0 0 1 7-7Z" fill="url(#hc-op)"/>' +
    '<circle cx="14" cy="12" r="3.6" fill="#55606d" stroke="#9aa5b1" stroke-width=".8"/>' +
    '<circle cx="66" cy="12" r="3.6" fill="#55606d" stroke="#9aa5b1" stroke-width=".8"/><rect x="29" y="8.5" width="22" height="7" rx="2" fill="#0d1218"/>' +
    '<rect class="led" x="31.5" y="11" width="12" height="2" rx="1"/>' +
    '<rect x="14" y="24" width="52" height="4.5" rx="2.25" fill="#d5dbe2" stroke="#9aa5b1" stroke-width=".8"/>' +
    '<rect x="12" y="34" width="56" height="44" rx="4" fill="url(#hc-ow)"/><g clip-path="url(#hc-oc)">' +
    '<rect class="ovglow" x="12" y="34" width="56" height="44" fill="url(#hc-og)"/><g class="fan" opacity=".35" fill="#cfd6de">' +
    '<path d="M40 52l-2-7a2 2 0 0 1 4 0Z"/><path d="M40 52l7 2a2 2 0 0 1 0 4Z" transform="rotate(-90 40 56)"/><path d="M40 56l2 7a2 2 0 0 1-4 0Z"/>' +
    '<path d="M40 56l-7-2a2 2 0 0 1 0-4Z" transform="rotate(-90 40 52)"/></g><path d="M14 64h52" stroke="#7d8894" stroke-width="1"/>' +
    '<ellipse cx="40" cy="62" rx="12" ry="3" fill="#8d6e63"/><path d="M30 62q10-9 20 0" fill="#bf8a5a"/>' +
    '<g class="heat" fill="none" stroke="#fff3e0" stroke-width="1.4" stroke-linecap="round" opacity=".8"><path d="M33 58q-2-3 0-6t0-6"/>' +
    '<path d="M40 58q-2-3 0-6t0-6"/><path d="M47 58q-2-3 0-6t0-6"/></g></g>' +
    '<path d="M15 38l9 12" stroke="#fff" stroke-width="3" stroke-opacity=".12" stroke-linecap="round"/>' +
    '<rect x="8" y="82" width="64" height="3" rx="1.5" fill="#c3cad2" opacity=".7"/></svg>',
  // Coffee machine: coffee pours from the spout into the cup, which fills and steams.
  coffee_maker: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-cb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a4350"/>' +
    '<stop offset=".5" stop-color="#4b5563"/><stop offset="1" stop-color="#2a313b"/></linearGradient>' +
    '<linearGradient id="hc-cs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfd6de"/><stop offset=".5" stop-color="#f4f6f8"/>' +
    '<stop offset="1" stop-color="#aab4bf"/></linearGradient></defs>' +
    '<g class="steam" fill="none" stroke="#b0bec5" stroke-width="1.8" stroke-linecap="round"><path d="M35 62q-2-3 0-6t0-6"/><path d="M40 62q-2-3 0-6t0-6"/>' +
    '<path d="M45 62q-2-3 0-6t0-6"/></g><rect x="12" y="4" width="56" height="84" rx="9" fill="url(#hc-cb)" stroke="#232a33" stroke-width="1"/>' +
    '<rect x="18" y="10" width="44" height="16" rx="3" fill="#0d1218"/><rect class="led" x="22" y="16" width="16" height="2.4" rx="1.2"/>' +
    '<circle cx="48" cy="18" r="2" fill="#7d8894"/><circle cx="55" cy="18" r="2" fill="#7d8894"/>' +
    '<rect x="18" y="30" width="44" height="46" rx="4" fill="#1b222b"/><rect x="30" y="32" width="20" height="8" rx="2" fill="url(#hc-cs)"/>' +
    '<rect x="34" y="40" width="3" height="4" rx="1" fill="#aab4bf"/><rect x="43" y="40" width="3" height="4" rx="1" fill="#aab4bf"/>' +
    '<g class="pour" stroke="#8d5a3b" stroke-width="1.6" stroke-linecap="round"><path d="M35.5 44V66"/><path d="M44.5 44V66"/></g>' +
    '<path d="M29 63h22l-2 11a3 3 0 0 1-3 2.5H34a3 3 0 0 1-3-2.5Z" fill="#fff" stroke="#cfd6de"/>' +
    '<path d="M51 66h2.5a3 3 0 0 1 0 6H50" fill="none" stroke="#fff" stroke-width="1.6"/>' +
    '<rect class="cupfill" x="32" y="73" width="16" height="3" rx="1" fill="#6d4c41"/><rect x="20" y="77" width="40" height="4" rx="2" fill="url(#hc-cs)"/>' +
    '<path d="M22 6h8" stroke="#fff" stroke-opacity=".25" stroke-width="2" stroke-linecap="round"/></svg>',
  // Cooker hood: air is drawn up the chimney and the lights fall on the hob.
  hood: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-hb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#aab4bf"/>' +
    '<stop offset=".45" stop-color="#f4f6f8"/><stop offset="1" stop-color="#9aa5b1"/></linearGradient>' +
    '<linearGradient id="hc-hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="floor-c" stop-opacity=".5"/>' +
    '<stop offset="1" class="floor-c" stop-opacity="0"/></linearGradient></defs>' +
    '<g class="air" fill="none" stroke="#b0bec5" stroke-width="1.8" stroke-linecap="round"><path d="M33 34v-10"/><path d="M40 36v-12"/>' +
    '<path d="M47 34v-10"/></g><rect x="29" y="2" width="22" height="36" rx="1.5" fill="url(#hc-hb)" stroke="#9aa5b1" stroke-width="1"/>' +
    '<path d="M29 38h22l23 16H6Z" fill="url(#hc-hb)" stroke="#9aa5b1" stroke-width="1" stroke-linejoin="round"/>' +
    '<rect x="6" y="54" width="68" height="5" rx="1" fill="#cfd6de" stroke="#9aa5b1" stroke-width="1"/>' +
    '<rect x="12" y="55.5" width="6" height="2" rx="1" fill="#1d2632"/><rect class="led" x="13" y="56" width="4" height="1" rx=".5"/>' +
    '<circle cx="62" cy="56.5" r="1.1" fill="#7d8894"/><circle cx="67" cy="56.5" r="1.1" fill="#7d8894"/>' +
    '<path class="beam" d="M16 59h48l8 24H8Z" fill="url(#hc-hl)"/><rect x="4" y="84" width="72" height="5" rx="1.5" fill="#55606d"/><g fill="#1b222b">' +
    '<ellipse cx="22" cy="84" rx="9" ry="1.4"/><ellipse cx="58" cy="84" rx="9" ry="1.4"/></g>' +
    '<path d="M24 82q-2-3 0-5M56 82q-2-3 0-5" class="smoke" fill="none" stroke="#b0bec5" stroke-width="1.2" stroke-linecap="round"/></svg>',
  // Fridge-freezer: frost sparkles and cold air flows under the door while super mode runs.
  fridge: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-fb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e3e7ec"/>' +
    '<stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#d5dbe2"/></linearGradient></defs>' +
    '<g class="cold" fill="none" stroke="#81d4fa" stroke-width="1.6" stroke-linecap="round"><path d="M18 91q4-3 8 0t8 0"/><path d="M38 91q4-3 8 0t8 0"/>' +
    '</g><rect x="14" y="2" width="52" height="86" rx="6" fill="url(#hc-fb)" stroke="#bac2cb" stroke-width="1.2"/>' +
    '<path d="M14.6 54H65.4" stroke="#bac2cb" stroke-width="1.2"/><rect x="20" y="16" width="3" height="28" rx="1.5" fill="#aab4bf"/>' +
    '<rect x="20" y="60" width="3" height="20" rx="1.5" fill="#aab4bf"/><rect x="36" y="10" width="20" height="10" rx="2.5" fill="#1d2632"/>' +
    '<rect class="led" x="39" y="14" width="10" height="2" rx="1"/><g class="frost" fill="#4fc3f7">' +
    '<path d="M46 34l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9Z"/><path d="M56 42l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7Z"/>' +
    '<path d="M50 68l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9Z"/></g>' +
    '<path d="M28 6v42" stroke="#fff" stroke-width="4" stroke-opacity=".6" stroke-linecap="round"/>' +
    '<rect x="17" y="88" width="7" height="3" rx="1.2" fill="#8f9aa6"/><rect x="56" y="88" width="7" height="3" rx="1.2" fill="#8f9aa6"/></svg>',
  // Hob: two cooking zones glow and heat rises from them.
  hob: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-kb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a323c"/>' +
    '<stop offset="1" stop-color="#11161c"/></linearGradient><radialGradient id="hc-kz" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff7043"/>' +
    '<stop offset=".7" stop-color="#e64a19" stop-opacity=".7"/><stop offset="1" stop-color="#bf360c" stop-opacity="0"/></radialGradient></defs>' +
    '<rect x="6" y="64" width="68" height="20" rx="3" fill="#cfd6de" stroke="#9aa5b1"/><rect x="10" y="84" width="60" height="6" fill="#aab4bf"/>' +
    '<path d="M14 30h52l10 34H4Z" fill="url(#hc-kb)" stroke="#55606d" stroke-width="1" stroke-linejoin="round"/>' +
    '<g fill="none" stroke="#55606d" stroke-width="1.2"><ellipse cx="25" cy="39" rx="8" ry="3.6"/><ellipse cx="53" cy="39" rx="8" ry="3.6"/>' +
    '<ellipse cx="22" cy="54" rx="11" ry="5"/><ellipse cx="57" cy="54" rx="10" ry="4.6"/></g><g class="zones">' +
    '<ellipse cx="22" cy="54" rx="11" ry="5" fill="url(#hc-kz)"/><ellipse cx="53" cy="39" rx="8" ry="3.6" fill="url(#hc-kz)"/></g>' +
    '<path d="M30 60h20" stroke="#7d8894" stroke-width="1.4" stroke-linecap="round"/><rect class="led" x="36" y="59" width="8" height="2" rx="1"/>' +
    '<g class="heat" fill="none" stroke="#ffccbc" stroke-width="1.3" stroke-linecap="round" opacity=".8"><path d="M18 48q-2-3 0-6t0-6"/>' +
    '<path d="M24 48q-2-3 0-6t0-6"/><path d="M53 34q-2-3 0-6t0-6"/></g>' +
    '<path d="M16 32h20" stroke="#fff" stroke-opacity=".18" stroke-width="2" stroke-linecap="round"/></svg>',
  // Microwave: the inside lights up warm, the bowl turns on the plate and steams.
  microwave: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-mb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f8fa"/>' +
    '<stop offset="1" stop-color="#cfd5dc"/></linearGradient><radialGradient id="hc-mg" cx=".5" cy=".62" r=".75"><stop offset="0" stop-color="#fffbea"/>' +
    '<stop offset=".55" stop-color="#fff0c2"/><stop offset="1" stop-color="#ffd27a"/></radialGradient>' +
    '<pattern id="hc-mm" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".45" fill="#8a6a2a" opacity=".12"/></pattern>' +
    '<clipPath id="hc-mc"><rect x="9" y="27" width="46" height="40" rx="3"/></clipPath></defs>' +
    '<rect x="4" y="22" width="72" height="50" rx="6" fill="url(#hc-mb)" stroke="#bac2cb" stroke-width="1.2"/>' +
    '<rect x="9" y="27" width="46" height="40" rx="3" fill="#1b222b"/><g clip-path="url(#hc-mc)">' +
    '<rect class="mwlight" x="9" y="27" width="46" height="40" fill="url(#hc-mg)"/>' +
    '<g class="waves" fill="none" stroke="#e0a83a" stroke-width="1" stroke-linecap="round"><path d="M14 34q2 2 0 4t0 4"/><path d="M50 34q2 2 0 4t0 4"/></g>' +
    '<ellipse cx="32" cy="61" rx="17" ry="3.6" fill="#e9edf1" stroke="#c4ccd5" stroke-width=".8"/>' +
    '<ellipse class="mark" cx="32" cy="61" rx="2" ry=".7" fill="#aab4bf"/><g class="food">' +
    '<path d="M24 53.5h16q-.6 6.5-8 6.5t-8-6.5z" fill="#fff" stroke="#d3d9e0" stroke-width=".6"/>' +
    '<ellipse cx="32" cy="53.5" rx="8" ry="1.7" fill="#ff8a65"/>' +
    '<path d="M26.5 56.5q5.5 1.6 11 0" stroke="#4fc3f7" stroke-width="1.1" fill="none" stroke-linecap="round"/></g>' +
    '<g class="heat" fill="none" stroke="#d9a441" stroke-width="1.2" stroke-linecap="round"><path d="M29 49q-1.6-2.2 0-4.4t0-4.4"/>' +
    '<path d="M32.5 48q-1.6-2.2 0-4.4t0-4.4"/><path d="M36 49q-1.6-2.2 0-4.4t0-4.4"/></g><rect x="9" y="27" width="46" height="40" fill="url(#hc-mm)"/>' +
    '<path d="M12 30l12 17" stroke="#fff" stroke-opacity=".16" stroke-width="3.5" stroke-linecap="round"/></g>' +
    '<rect x="9" y="27" width="46" height="40" rx="3" fill="none" stroke="#9aa5b1" stroke-width="1"/>' +
    '<rect x="60" y="28" width="11" height="6" rx="1.5" fill="#1d2632"/><rect class="led" x="61.5" y="30" width="6" height="2" rx="1"/>' +
    '<circle cx="65.5" cy="44" r="4" fill="#fff" stroke="#aeb7c2" stroke-width="1.2"/>' +
    '<path d="M65.5 44l1.8-2" stroke="#7d8894" stroke-width="1" stroke-linecap="round"/><g fill="#aeb7c2"><circle cx="62" cy="54" r="1.4"/>' +
    '<circle cx="66" cy="54" r="1.4"/><circle cx="70" cy="54" r="1.4"/><circle cx="62" cy="59" r="1.4"/><circle cx="66" cy="59" r="1.4"/>' +
    '<circle cx="70" cy="59" r="1.4"/></g><rect x="10" y="72" width="8" height="3" rx="1" fill="#8f9aa6"/>' +
    '<rect x="62" y="72" width="8" height="3" rx="1" fill="#8f9aa6"/></svg>',
  // Freezer: frost sparkles and cold air flows while super freeze runs.
  freezer: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-zb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e3e7ec"/>' +
    '<stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#d5dbe2"/></linearGradient></defs>' +
    '<g class="cold" fill="none" stroke="#81d4fa" stroke-width="1.6" stroke-linecap="round"><path d="M18 91q4-3 8 0t8 0"/><path d="M38 91q4-3 8 0t8 0"/>' +
    '</g><rect x="14" y="2" width="52" height="86" rx="6" fill="url(#hc-zb)" stroke="#bac2cb" stroke-width="1.2"/>' +
    '<rect x="20" y="20" width="3" height="40" rx="1.5" fill="#aab4bf"/><rect x="36" y="10" width="20" height="10" rx="2.5" fill="#1d2632"/>' +
    '<rect class="led" x="39" y="14" width="10" height="2" rx="1"/><g fill="#4fc3f7">' +
    '<path d="M46 28v12M40 34h12M42 30l8 8M50 30l-8 8" stroke="#4fc3f7" stroke-width="1.4" stroke-linecap="round" opacity=".55"/></g>' +
    '<g class="frost" fill="#4fc3f7"><path d="M56 48l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z"/>' +
    '<path d="M40 60l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9Z"/><path d="M54 72l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7Z"/></g>' +
    '<path d="M28 6v78" stroke="#fff" stroke-width="4" stroke-opacity=".6" stroke-linecap="round"/>' +
    '<rect x="17" y="88" width="7" height="3" rx="1.2" fill="#8f9aa6"/><rect x="56" y="88" width="7" height="3" rx="1.2" fill="#8f9aa6"/></svg>',
  // Wine cabinet: the soft inside light, tinted by the state.
  wine_cooler: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-vb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a313b"/>' +
    '<stop offset=".5" stop-color="#3a4350"/><stop offset="1" stop-color="#232a33"/></linearGradient>' +
    '<linearGradient id="hc-vl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="floor-c" stop-opacity=".45"/>' +
    '<stop offset="1" class="floor-c" stop-opacity=".05"/></linearGradient></defs>' +
    '<rect x="14" y="2" width="52" height="86" rx="6" fill="url(#hc-vb)" stroke="#1b222b"/>' +
    '<rect x="19" y="8" width="42" height="74" rx="3" fill="#11161c" stroke="#7d8894" stroke-width="1.2"/>' +
    '<rect class="beam" x="19" y="8" width="42" height="74" rx="3" fill="url(#hc-vl)"/><g stroke="#55606d" stroke-width="1">' +
    '<path d="M20 26h40M20 44h40M20 62h40"/></g><g fill="#7b1f2b"><circle cx="25" cy="20" r="3"/><circle cx="33" cy="20" r="3"/>' +
    '<circle cx="41" cy="20" r="3"/><circle cx="49" cy="20" r="3"/><circle cx="55" cy="20" r="3"/><circle cx="25" cy="38" r="3"/>' +
    '<circle cx="33" cy="38" r="3"/><circle cx="41" cy="38" r="3"/><circle cx="49" cy="38" r="3"/><circle cx="55" cy="38" r="3"/>' +
    '<circle cx="25" cy="56" r="3"/><circle cx="33" cy="56" r="3"/><circle cx="41" cy="56" r="3"/><circle cx="49" cy="56" r="3"/>' +
    '<circle cx="55" cy="56" r="3"/><circle cx="25" cy="74" r="3"/><circle cx="33" cy="74" r="3"/><circle cx="41" cy="74" r="3"/>' +
    '<circle cx="49" cy="74" r="3"/><circle cx="55" cy="74" r="3"/></g><g fill="#c9a227" opacity=".9"><circle cx="25" cy="20" r="1"/>' +
    '<circle cx="33" cy="20" r="1"/><circle cx="41" cy="20" r="1"/><circle cx="49" cy="20" r="1"/><circle cx="55" cy="20" r="1"/>' +
    '<circle cx="25" cy="38" r="1"/><circle cx="33" cy="38" r="1"/><circle cx="41" cy="38" r="1"/><circle cx="49" cy="38" r="1"/>' +
    '<circle cx="55" cy="38" r="1"/><circle cx="25" cy="56" r="1"/><circle cx="33" cy="56" r="1"/><circle cx="41" cy="56" r="1"/>' +
    '<circle cx="49" cy="56" r="1"/><circle cx="55" cy="56" r="1"/><circle cx="25" cy="74" r="1"/><circle cx="33" cy="74" r="1"/>' +
    '<circle cx="41" cy="74" r="1"/><circle cx="49" cy="74" r="1"/><circle cx="55" cy="74" r="1"/></g>' +
    '<rect class="led" x="34" y="84" width="12" height="1.6" rx=".8"/>' +
    '<path d="M24 10l12 70" stroke="#fff" stroke-opacity=".08" stroke-width="5" stroke-linecap="round"/>' +
    '<rect x="17" y="88" width="7" height="3" rx="1.2" fill="#55606d"/><rect x="56" y="88" width="7" height="3" rx="1.2" fill="#55606d"/></svg>',
  // LG Styler: the shirt sways in the steam.
  styler: '<svg viewBox="0 0 80 94" aria-hidden="true"><defs><linearGradient id="hc-sb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a4350"/>' +
    '<stop offset=".5" stop-color="#55606d"/><stop offset="1" stop-color="#2a313b"/></linearGradient>' +
    '<linearGradient id="hc-sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b222b" stop-opacity=".55"/>' +
    '<stop offset="1" stop-color="#11161c" stop-opacity=".75"/></linearGradient></defs>' +
    '<rect x="18" y="2" width="44" height="88" rx="5" fill="url(#hc-sb)" stroke="#1b222b"/>' +
    '<rect x="22" y="6" width="36" height="78" rx="3" fill="#cfd6de"/><g class="sway">' +
    '<path d="M40 14v4" stroke="#7d8894" stroke-width="1.4" stroke-linecap="round"/>' +
    '<path d="M29 24l11-6 11 6" fill="none" stroke="#7d8894" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M30 24l-4 10 5 2v32h18V36l5-2-4-10-6 3q-4 4-8 0Z" fill="#5c8fd6"/><path d="M40 27v41" stroke="#3f6fb3" stroke-width=".8"/></g>' +
    '<g class="steam" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"><path d="M32 82q-2-3 0-6t0-6"/><path d="M40 82q-2-3 0-6t0-6"/>' +
    '<path d="M48 82q-2-3 0-6t0-6"/></g><rect x="22" y="6" width="36" height="78" rx="3" fill="url(#hc-sg)"/>' +
    '<rect x="34" y="86" width="12" height="2" rx="1" fill="#11161c"/><rect class="led" x="36" y="86.4" width="8" height="1.2" rx=".6"/></svg>',
};

// Door open: the washer's porthole swung aside on the empty drum, the dishwasher's door lowered on its racks.
export var HC_ART_OPEN = {
  washer: '<svg viewBox="0 0 80 94" aria-hidden="true">' +
    '<defs><linearGradient id="hc-wbo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2e6eb"/></linearGradient>' +
    '<radialGradient id="hc-wd" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#cfd6de"/><stop offset=".7" stop-color="#8d98a5"/><stop offset="1" stop-color="#5d6874"/></radialGradient>' +
    '<linearGradient id="hc-wro" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#97a2ae"/><stop offset="1" stop-color="#e3e8ee"/></linearGradient>' +
    '<linearGradient id="hc-wgo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f6fc0"/><stop offset="1" stop-color="#9edbff"/></linearGradient></defs>' +
    '<rect x="10" y="88" width="9" height="4" rx="1.5" fill="#8f9aa6"/><rect x="61" y="88" width="9" height="4" rx="1.5" fill="#8f9aa6"/>' +
    '<rect x="4" y="2" width="72" height="87" rx="9" fill="url(#hc-wbo)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M4.6 21H75.4" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="10" y="8" width="17" height="8" rx="2" fill="#fff" stroke="#c3cad2"/><path d="M13 12h11" stroke="#c3cad2" stroke-linecap="round"/>' +
    '<rect x="33" y="8.5" width="17" height="7" rx="2" fill="#1d2632"/><rect class="led" x="35.5" y="11" width="9" height="2" rx="1"/>' +
    '<circle cx="64" cy="12" r="5.2" fill="#fff" stroke="#aeb7c2" stroke-width="1.2"/><path d="M64 12V8.6" stroke="#7d8894" stroke-width="1.4" stroke-linecap="round"/>' +
    '<circle cx="40" cy="55" r="22" fill="#d5dbe2"/><circle cx="40" cy="55" r="19" fill="url(#hc-wd)"/>' +
    '<g fill="#5d6874" opacity=".55"><circle cx="40" cy="44" r="1"/><circle cx="31" cy="50" r="1"/><circle cx="49" cy="50" r="1"/><circle cx="34" cy="61" r="1"/><circle cx="46" cy="61" r="1"/><circle cx="40" cy="66" r="1"/></g>' +
    '<path d="M40 38l3 6h-6Z" fill="#aeb7c2"/>' +
    '<ellipse cx="11" cy="55" rx="8" ry="24" fill="url(#hc-wro)" stroke="#8f9aa6" stroke-width=".8"/>' +
    '<ellipse cx="11.5" cy="55" rx="5" ry="18" fill="url(#hc-wgo)" opacity=".85"/>' +
    '<path d="M9.5 42q-1.5 6 0 12" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/>' +
    '<rect x="16.5" y="52" width="3" height="7" rx="1.5" fill="#aeb7c2"/></svg>',
  dishwasher: '<svg viewBox="0 0 80 94" aria-hidden="true">' +
    '<defs><linearGradient id="hc-dbo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f8fa"/><stop offset=".6" stop-color="#e3e7ec"/><stop offset="1" stop-color="#cfd5dc"/></linearGradient>' +
    '<linearGradient id="hc-dpo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#36404d"/><stop offset="1" stop-color="#1b222b"/></linearGradient>' +
    '<linearGradient id="hc-dio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d8894"/><stop offset="1" stop-color="#b6bfc9"/></linearGradient>' +
    '<linearGradient id="hc-ddo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d0d8"/><stop offset="1" stop-color="#eef1f4"/></linearGradient></defs>' +
    '<rect x="4" y="2" width="72" height="62" rx="7" fill="url(#hc-dbo)" stroke="#bac2cb" stroke-width="1.2"/>' +
    '<path d="M11 2h58a7 7 0 0 1 7 7v9H4V9a7 7 0 0 1 7-7Z" fill="url(#hc-dpo)"/>' +
    '<rect x="10" y="7.5" width="16" height="6" rx="2" fill="#0d1218"/><rect class="led" x="12" y="9.5" width="8" height="2" rx="1"/>' +
    '<circle cx="45" cy="10.5" r="1.6" fill="#7d8894"/><circle cx="52" cy="10.5" r="1.6" fill="#7d8894"/><circle cx="59" cy="10.5" r="1.6" fill="#7d8894"/><circle cx="67" cy="10.5" r="2.2" fill="none" stroke="#9aa5b1" stroke-width="1.2"/>' +
    '<rect x="9" y="20" width="62" height="44" fill="url(#hc-dio)"/>' +
    '<path d="M11 36h58M11 58h58" stroke="#e3e7ec" stroke-width="1.4"/>' +
    '<g fill="#ffffff" stroke="#b6bfc9" stroke-width=".6"><rect x="16" y="27" width="7" height="9" rx="2"/><rect x="27" y="27" width="7" height="9" rx="2"/><rect x="38" y="25" width="5" height="11" rx="2.5"/><rect x="47" y="27" width="7" height="9" rx="2"/><rect x="58" y="25" width="5" height="11" rx="2.5"/></g>' +
    '<g fill="#ffffff" stroke="#b6bfc9" stroke-width=".6"><ellipse cx="17" cy="49" rx="3" ry="9.5"/><ellipse cx="24" cy="49" rx="3" ry="9.5"/><ellipse cx="31" cy="49" rx="3" ry="9.5"/><ellipse cx="38" cy="49" rx="3" ry="9.5"/>' +
      '<ellipse cx="50" cy="51" rx="2.6" ry="7.5"/><ellipse cx="56" cy="51" rx="2.6" ry="7.5"/><ellipse cx="62" cy="51" rx="2.6" ry="7.5"/></g>' +
    '<path d="M4 64h72l3.5 22H.5Z" fill="url(#hc-ddo)" stroke="#bac2cb" stroke-width="1.2" stroke-linejoin="round"/>' +
    '<path d="M9 67h62l2.4 15H6.6Z" fill="#dfe4ea" stroke="#fff" stroke-opacity=".8"/>' +
    '<rect x="14" y="86.5" width="52" height="4" rx="2" fill="#aab4bf"/></svg>',
};
// Dryers open on the same empty drum as the washer.
HC_ART_OPEN.dryer = HC_ART_OPEN.washer;
HC_ART_OPEN.washer_dryer = HC_ART_OPEN.washer;

// State badge over the illustration: paused, waiting for a delayed start, or done.
export var HC_STATE_BADGE = {
  pause: '<svg viewBox="0 0 24 24"><rect x="7" y="6" width="3.6" height="12" rx="1.2"/><rect x="13.4" y="6" width="3.6" height="12" rx="1.2"/></svg>',
  delayedstart: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff" stroke-width="2"/>' +
    '<path class="hand-h" d="M12 12V8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>' +
    '<path class="hand-m" d="M12 12h4" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
  finished: '<svg viewBox="0 0 24 24"><path class="check" d="M6.5 12.5l3.6 3.6 7.4-8" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
// Sparkles around a finished appliance.
export var HC_SPARKLES = '<svg class="sparkles" viewBox="0 0 80 94" aria-hidden="true">' +
  '<path d="M8 14l1.6 4 4 1.6-4 1.6L8 25.2l-1.6-4-4-1.6 4-1.6Z"/><path d="M72 30l1.2 3 3 1.2-3 1.2L72 38.4l-1.2-3-3-1.2 3-1.2Z"/>' +
  '<path d="M68 2l1 2.4 2.4 1-2.4 1L68 8.8l-1-2.4-2.4-1 2.4-1Z"/></svg>';

// The illustration with its state: animated while running, a badge when paused, delayed or done.
// `lit`: animated without running (a wine cabinet with its light on).
export var hcPicture = (art, state, illustrated, lit) => {
  var badge = illustrated && HC_STATE_BADGE[state]
    ? `<span class="pbadge">${HC_STATE_BADGE[state]}</span>${state === 'finished' ? HC_SPARKLES : ''}` : '';
  return `<div class="picture st-${hcEsc(state)}${state === 'run' || lit ? ' running' : ''}">${art}${badge}</div>`;
};
