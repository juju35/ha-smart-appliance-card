# ha-smart-appliance-card

[![Marketplace](https://img.shields.io/badge/Marketplace-Custom-41BDF5.svg)](https://www.home-assistant.io/integrations/marketplace/)
[![HACS Validation](https://github.com/juju35/ha-smart-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/juju35/ha-smart-appliance-card/actions/workflows/hacs.yml)
[![Validate](https://github.com/juju35/ha-smart-appliance-card/actions/workflows/validate.yml/badge.svg)](https://github.com/juju35/ha-smart-appliance-card/actions/workflows/validate.yml)
[![Lint](https://github.com/juju35/ha-smart-appliance-card/actions/workflows/lint.yml/badge.svg)](https://github.com/juju35/ha-smart-appliance-card/actions/workflows/lint.yml)
[![Release](https://img.shields.io/github/v/release/juju35/ha-smart-appliance-card)](https://github.com/juju35/ha-smart-appliance-card/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/juju35/ha-smart-appliance-card/blob/main/LICENSE)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/julienstep9)

<p align="center">
  <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/bosch.svg" alt="Bosch" height="20">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/siemens.svg" alt="Siemens" height="15">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/neff.svg" alt="Neff" height="22">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/gaggenau.svg" alt="Gaggenau" height="14">
  <br><br>
  <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/miele.svg" alt="Miele" height="20">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/samsung.svg" alt="Samsung" height="15">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/lg.svg" alt="LG" height="26">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/whirlpool.svg" alt="Whirlpool" height="20">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/kitchenaid.svg" alt="KitchenAid" height="13">
</p>

Animated Lovelace cards for home appliances in Home Assistant: washing machines, tumble dryers, washer-dryers, dishwashers, ovens, microwaves, hobs, coffee machines, cooker hoods, fridges, freezers, wine cabinets and the LG Styler. They work with [Home Connect](https://www.home-assistant.io/integrations/home_connect/), [Miele](https://www.home-assistant.io/integrations/miele/), [SmartThings](https://www.home-assistant.io/integrations/smartthings/), [LG ThinQ](https://www.home-assistant.io/integrations/lg_thinq/), [Whirlpool](https://www.home-assistant.io/integrations/whirlpool/) and [Matter](https://www.home-assistant.io/integrations/matter/).

Pick the appliance: the card works out its type and its brand, and finds all its entities by itself.

[![Open your Home Assistant instance and open a repository inside the Marketplace.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=juju35&repository=ha-smart-appliance-card&category=plugin)

| <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/bosch.svg" alt="" height="14"> Dishwasher | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/siemens.svg" alt="" height="11"> Washing machine | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/miele.svg" alt="" height="14"> Tumble dryer |
|---|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher.png" alt="Dishwasher card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer.png" alt="Washing machine card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dryer.png" alt="Tumble dryer card" width="400"> |

> Formerly **ha-home-connect-card**. The `home-connect-dishwasher-card`, `home-connect-washer-card` and their mini card types still work in existing dashboards.

## Features

- One card, `smart-appliance-card`, and its compact version `smart-appliance-mini-card` (a detail button unfolds the full card)
- 13 appliance types, each with its own illustration animated by what it is doing: drum turning, laundry tumbling, water spraying, oven glowing, coffee pouring, hood drawing air, frost on a fridge in super mode…
- Type detected from the appliance (its programs, its model or its entities), or set with `kind`
- The appliance's brand next to its title: its logo (Bosch, Siemens, Neff, Gaggenau, Miele, Samsung, LG, Whirlpool, KitchenAid), or a badge with its initial on the header icon for the others (Constructa, Maytag…); main buttons in the brand's colour
- Status with colour, progress bar, finish time and time left, the program step when the integration reports it (spinning, drying…)
- Program picker and **Start** (when remote start is enabled), **Pause / Resume**, **Stop** with a confirmation tap, whatever the integration offers
- Program options before starting, and the settings of appliances without programs (super modes, fan stage…)
- Temperatures of fridges, freezers and wine cabinets, and of ovens while cooking
- Door state, salt and rinse aid alerts, coffee machine bean container, water tank and drip tray alerts
- A reminder chip when a program has finished and the door hasn't been opened since ("Finished 25 minutes ago, door still closed")
- A click on a chip (door, temperature, alert…) opens the more-info dialog of its entity
- Visual editor in the dashboard UI (no YAML needed)
- English, French, German, Spanish, Serbian (Cyrillic and Latin), Italian, Dutch, European Portuguese, Polish, Romanian, Danish, Swedish, Bulgarian, Russian, Ukrainian, Hungarian, Slovak, Czech, Slovenian, Latvian and Greek, follows the Home Assistant language
- Light and dark theme compatible
- Single file, no dependencies, ready for the Marketplace

## Supported integrations

| Integration | Appliances | What the cards show |
|---|---|---|
| [Home Connect](https://www.home-assistant.io/integrations/home_connect/) (built in) — Bosch, Siemens, Neff, Gaggenau, Constructa | Dishwashers, washing machines, tumble dryers, washer-dryers, ovens, microwaves, coffee machines, cooker hoods, fridges, freezers, wine cabinets | Status, progress, finish time, program picker with its options, **Start** (remote start enabled), **Pause / Resume**, **Stop**, door, salt and rinse aid alerts, coffee machine alerts, oven temperature, fridge setpoints and super modes, hood fan stage and light |
| [Home Connect Local](https://github.com/chris-mc1/homeconnect_local_hass) (custom, local network, no cloud) — Bosch, Siemens, Neff, Gaggenau, Constructa | Same appliances as Home Connect, type read from the device model | Status, progress, time left, program picker with its options, **Start**, **Pause / Resume**, **Stop**, power, door (binary sensor), salt and rinse aid levels, coffee machine tanks, fridge super modes, lights |
| [Miele](https://www.home-assistant.io/integrations/miele/) (built in) | Washing machines, tumble dryers, washer-dryers, dishwashers, ovens (steam and combi included), microwaves, hobs, coffee machines, cooker hoods, fridges, freezers, wine cabinets | Status and program phase, program, progress and finish time from the elapsed and remaining times, **Start**, **Pause**, **Stop**, power, door, zone temperatures, super cooling and super freezing |
| [SmartThings](https://www.home-assistant.io/integrations/smartthings/) (built in) — Samsung | Washing machines, tumble dryers, washer-dryers, dishwashers, ovens, cooker hoods, fridges, freezers | Machine and job state, progress, finish time, **Start / Pause / Resume / Stop** through the operating state, dishwasher course picker, door, temperatures, rapid cooling and freezing |
| [LG ThinQ](https://www.home-assistant.io/integrations/lg_thinq/) (built in) — LG | Washing machines, tumble dryers, WashTower and WashCombo, dishwashers, ovens, microwaves, hobs, cooker hoods, fridges, wine cabinets, Styler | Current state and step, progress and finish time, **Start** and **Stop** through the operation mode, power, remote start, door, temperatures, express modes |
| [Whirlpool](https://www.home-assistant.io/integrations/whirlpool/) (built in) — Whirlpool, Maytag, KitchenAid, Consul | Washing machines, tumble dryers, ovens, fridges | Washer and dryer state, finish time and door; oven state, temperature and **Stop** (set `brand` for a Maytag, KitchenAid or Consul: the integration doesn't say) |
| [Matter](https://www.home-assistant.io/integrations/matter/) (built in) | Dishwashers, washing machines, tumble dryers (Matter 1.2+) | Operational state and phase, finish time, **Start / Pause / Resume / Stop**, power, program options (set `kind` when the appliance type can't be told from its entities) |

Air conditioners, purifiers and robot vacuums are left out: they have their own cards.

### Appliance types

Each type is detected by itself; `kind` is the value to set when it can't be (a Matter appliance whose entities don't give it away, for instance).

| Appliance | `kind` | Home Connect | Miele | SmartThings | LG ThinQ | Whirlpool | Matter |
|---|---|---|---|---|---|---|---|
| Dishwasher | `dishwasher` | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| Washing machine | `washer` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tumble dryer | `dryer` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Washer-dryer | `washer_dryer` | ✅ | ✅ | ✅ | ✅ | — | — |
| Oven | `oven` | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Microwave | `microwave` | ✅ | ✅ | — | ✅ | — | — |
| Hob | `hob` | — | ✅ | — | ✅ | — | — |
| Coffee machine | `coffee_maker` | ✅ | ✅ | — | — | — | — |
| Cooker hood | `hood` | ✅ | ✅ | ✅ | ✅ | — | — |
| Fridge | `fridge` | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Freezer | `freezer` | ✅ | ✅ | ✅ | — | — | — |
| Wine cabinet | `wine_cooler` | ✅ | ✅ | — | ✅ | — | — |
| LG Styler | `styler` | — | — | — | ✅ | — | — |

## Prerequisites

- Home Assistant 2024.8 or later with one of the [supported integrations](#supported-integrations) set up
- To start a program from Home Assistant, **Remote start** (or the integration's equivalent) must be enabled on the appliance itself (the card shows a hint when it isn't)

## Installation

### Via the Marketplace (recommended)

Click the button below to add the repository directly:

[![Add to the Marketplace](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=juju35&repository=ha-smart-appliance-card&category=plugin)

Or manually:

1. Open **Settings → Marketplace → Add from link** (top right; this needs a GitHub account connected)
2. Add `https://github.com/juju35/ha-smart-appliance-card` — Type: **Dashboard**
3. Open **Smart Appliance Card** and click **Install**
4. Clear your browser cache and refresh

The Marketplace registers the dashboard resource for you.

### Manual

1. Download `smart-appliance-card.js` and the `smart-appliance-card.i18n.*.js` translation files from the [latest release](https://github.com/juju35/ha-smart-appliance-card/releases/latest)
2. Copy them all to `/config/www/` (without the translation files, the cards show in English)
3. Go to **Settings → Dashboards → Resources** → Add resource:
   - URL: `/local/smart-appliance-card.js`
   - Type: **JavaScript Module**
4. Clear your browser cache and refresh

### Upgrading from ha-home-connect-card (1.x)

The repository was renamed from `ha-home-connect-card` to `ha-smart-appliance-card` (GitHub redirects the former address, the Marketplace keeps updating it) and the file from `home-connect-card.js` to `smart-appliance-card.js`. The Marketplace may keep installing into the former folder until the repository is added again under its new name, so after the update check that **Settings → Dashboards → ⋮ → Resources** has exactly one resource for the card, pointing to the file that is really installed:

- `/local/community/ha-home-connect-card/smart-appliance-card.js` for an existing install updated in place,
- `/local/community/ha-smart-appliance-card/smart-appliance-card.js` for a new install (or after uninstalling the card and adding `https://github.com/juju35/ha-smart-appliance-card` again from a link in the Marketplace),

and remove the former `home-connect-card.js` resource. A resource pointing to a file that isn't there shows `Custom element doesn't exist: smart-appliance-card`. For a manual install, replace the file and the resource URL as above; the releases still carry a `home-connect-card.js` copy for the transition. Dashboards using `custom:home-connect-*-card` keep working: the former types stay registered (see [Legacy card types](#legacy-card-types)).

## Configuration

### Visual editor

Add the card from the dashboard (**Add card** → **Smart Appliance Card**). The first supported appliance is picked automatically; change it with the **Appliance** field, then set the name, icon and the sections to show. **Appliance type** and **Brand** are only needed when the integration doesn't give them away. The **Entities (advanced)** panel lets you force any entity if auto-detection picks the wrong one. Options left at their default are not written to the YAML.

### Minimal

```yaml
type: custom:smart-appliance-card
device_id: bad11e7fd00845a2fb485b38c97cf675
```

```yaml
type: custom:smart-appliance-card
entity: sensor.washing_machine_operation_state
```

### Mini cards

```yaml
type: custom:smart-appliance-mini-card
device_id: bad11e7fd00845a2fb485b38c97cf675
```

The mini card shows the appliance, its state, the program, the progress and finish time, the alerts, and round Start / Pause / Resume and power buttons. The detail button (top right) unfolds the full card with every option; a click anywhere else on the page folds it back. It takes the same options as the full card, which apply once unfolded, plus `zoom`. At its default size in a Sections view (6 columns), the round buttons sit under the text and the status pill shows only its coloured dot, the state being written above the program.

Use either `device_id` (what the visual editor writes) or `entity` (any entity of the appliance). With neither, the card uses the first supported appliance it finds (of the `kind` given, if any).

### Full options

```yaml
type: custom:smart-appliance-card
device_id: 5c3a4c7f80e0aa935477ebca6e7b915b
name: Washing machine
kind: washer
brand: maytag
show_program: true
show_options: true
show_controls: true
show_alerts: true
show_power: true
language: en
entities:
  operation_state: sensor.washing_machine_operation_state
  selected_program: select.washing_machine_selected_program
  active_program: select.washing_machine_active_program
```

### Options reference

| Option | Required | Default | Description |
|---|---|---|---|
| `device_id` | ❌* | Auto | Appliance device (*or `entity`; the first supported appliance is used if both are missing) |
| `entity` | ❌ | — | Any entity of the appliance, used to find the device |
| `name` | ❌ | Device name | Card title |
| `kind` | ❌ | Auto | Appliance type when it can't be detected: `dishwasher`, `washer`, `dryer`, `washer_dryer`, `oven`, `microwave`, `hob`, `coffee_maker`, `hood`, `fridge`, `freezer`, `wine_cooler`, `styler` |
| `brand` | ❌ | Auto | Brand for the badge and button colour when the integration doesn't give it: `bosch`, `siemens`, `neff`, `gaggenau`, `constructa`, `miele`, `samsung`, `lg`, `whirlpool`, `maytag`, `kitchenaid`, `consul` |
| `icon` | ❌ | Illustration | Replaces the appliance illustration with an icon |
| `show_program` | ❌ | `true` | Show the program picker |
| `show_options` | ❌ | `true` | Show program options (only before a program starts) |
| `show_controls` | ❌ | `true` | Show Start / Pause / Resume / Stop buttons |
| `show_alerts` | ❌ | `true` | Show salt, rinse aid and coffee machine alerts, and the reminder when a finished program's door hasn't been opened |
| `show_power` | ❌ | `true` | Show the power button (turn off for appliances that can't be switched on / off remotely) |
| `zoom` | ❌ | `true` | Mini cards only: detail button at the top right that unfolds the full card (a click elsewhere folds it back) |
| `language` | ❌ | Auto | Force language: `fr`, `en`, `de`, `es`, `sr`, `sr-Latn`, `it`, `nl`, `pt`, `pl`, `ro`, `da`, `sv`, `bg`, `ru`, `uk`, `hu`, `sk`, `cs`, `sl`, `lv` or `el` (auto-detects from HA settings) |
| `entities` | ❌ | Auto | Override detected entities (see below) |

### Entity overrides

Keys accepted under `entities`:

| Key | Domain | Used for |
|---|---|---|
| `operation_state` | `sensor` | Status (ready, running, finished…) |
| `door` | `sensor` or `binary_sensor` | Door chip |
| `progress` | `sensor` | Progress bar |
| `finish_time` | `sensor` | Finish time and time left |
| `selected_program` | `select` | Program picker |
| `active_program` | `select` | Running program, and Start |
| `power` | `switch` | Power button |
| `stop` | `button` | Stop |
| `pause` / `resume` | `button` | Pause / Resume |
| `remote_start` | `binary_sensor` | Enables the Start button |
| `remote_control` | `binary_sensor` | Detects a program being set on the appliance itself |
| `connectivity` | `binary_sensor` | Online / offline state |
| `salt` / `rinse_aid` | `sensor` | Salt and rinse aid alerts (dishwashers) |

Every other `switch` and `select` of the device is shown as a program option (or as a setting, on appliances without programs).

### Legacy card types

`home-connect-dishwasher-card`, `home-connect-washer-card`, `home-connect-dishwasher-mini-card` and `home-connect-washer-mini-card` are kept so that existing dashboards keep working. They are the same card with the appliance type fixed; new dashboards should use `smart-appliance-card`.

## Screenshots

### Animations

While an appliance is at work its illustration comes alive, and each one animates differently: the drum turns, the laundry tumbles, water sprays, the oven glows, coffee pours, the hood draws air, frost sparkles… (the card honours `prefers-reduced-motion` and falls back to a still image). Each brand below shows its appliances at work.

The other states animate the badge on the illustration, the same for every appliance. When a cycle finishes the motion stops, a tick is drawn into the badge and sparkles twinkle around the appliance; paused, the badge breathes in and out (Resume replaces Pause); waiting on a delayed start, the badge becomes a little clock whose hands turn:

| | Dishwasher | Washing machine |
|---|---|---|
| Finished | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-finished.gif" alt="dishwasher finished" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-finished.gif" alt="washer finished" width="400"> |
| Finished, dark | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-finished-dark.gif" alt="dishwasher finished dark" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-finished-dark.gif" alt="washer finished dark" width="400"> |
| Paused | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-paused.gif" alt="dishwasher paused" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-paused.gif" alt="washer paused" width="400"> |
| Paused, dark | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-paused-dark.gif" alt="dishwasher paused dark" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-paused-dark.gif" alt="washer paused dark" width="400"> |
| Delayed start | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-delayed.gif" alt="dishwasher delayed start" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-delayed.gif" alt="washer delayed start" width="400"> |
| Delayed start, dark | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-delayed-dark.gif" alt="dishwasher delayed start dark" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-delayed-dark.gif" alt="washer delayed start dark" width="400"> |

Door open, the dishwasher's door lowered on its racks, the washing machine's porthole swung aside; program options before starting; the mini card unfolded:

| | Light | Dark |
|---|---|---|
| Dishwasher, door open | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-open.png" alt="dishwasher door open" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-open-dark.png" alt="dishwasher door open dark" width="400"> |
| Washing machine, door open | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-open.png" alt="washer door open" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-open-dark.png" alt="washer door open dark" width="400"> |
| Dishwasher program options | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-options.png" alt="dishwasher with program options" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-options-dark.png" alt="dishwasher with program options dark" width="400"> |
| Mini card unfolded | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-mini-zoom.png" alt="washer mini card unfolded" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-mini-zoom-dark.png" alt="washer mini card unfolded dark" width="400"> |

### <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/bosch.svg" alt="" height="22"> Bosch

Home Connect: a dishwasher mid-cycle, spraying water and glowing on the floor, and a fridge-freezer in super cooling with its two setpoints.

| | Light | Dark |
|---|---|---|
| Dishwasher | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher.png" alt="dishwasher" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-dark.png" alt="dishwasher dark" width="400"> |
| Dishwasher, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-running.gif" alt="dishwasher, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-running-dark.gif" alt="dishwasher, at work dark" width="400"> |
| Fridge-freezer | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/fridge.png" alt="fridge-freezer" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/fridge-dark.png" alt="fridge-freezer dark" width="400"> |
| Fridge-freezer, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/fridge-running.gif" alt="fridge-freezer, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/fridge-running-dark.gif" alt="fridge-freezer, at work dark" width="400"> |
| Dishwasher mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-mini.png" alt="dishwasher mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dishwasher-mini-dark.png" alt="dishwasher mini card dark" width="400"> |
| Fridge-freezer mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-bosch.png" alt="fridge-freezer mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-bosch-dark.png" alt="fridge-freezer mini card dark" width="400"> |

### <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/siemens.svg" alt="" height="16"> Siemens

Home Connect: a washing machine ready with its program options, and a coffee machine pouring a cappuccino.

| | Light | Dark |
|---|---|---|
| Washing machine | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer.png" alt="washing machine" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-dark.png" alt="washing machine dark" width="400"> |
| Washing machine, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-running.gif" alt="washing machine, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-running-dark.gif" alt="washing machine, at work dark" width="400"> |
| Coffee machine | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/coffee-machine.png" alt="coffee machine" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/coffee-machine-dark.png" alt="coffee machine dark" width="400"> |
| Coffee machine, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/coffee-machine-running.gif" alt="coffee machine, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/coffee-machine-running-dark.gif" alt="coffee machine, at work dark" width="400"> |
| Washing machine mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-mini.png" alt="washing machine mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-mini-dark.png" alt="washing machine mini card dark" width="400"> |
| Coffee machine mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-siemens.png" alt="coffee machine mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-siemens-dark.png" alt="coffee machine mini card dark" width="400"> |

### <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/neff.svg" alt="" height="18"> Neff

Home Connect: an oven on hot air, its cavity temperature as a chip.

| | Light | Dark |
|---|---|---|
| Oven | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/oven.png" alt="oven" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/oven-dark.png" alt="oven dark" width="400"> |
| Oven, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/oven-running.gif" alt="oven, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/oven-running-dark.gif" alt="oven, at work dark" width="400"> |
| Oven mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-neff.png" alt="oven mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-neff-dark.png" alt="oven mini card dark" width="400"> |

### <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/gaggenau.svg" alt="" height="14"> Gaggenau

Home Connect: a cooker hood venting at stage 2 with its lights on.

| | Light | Dark |
|---|---|---|
| Cooker hood | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/hood.png" alt="cooker hood" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/hood-dark.png" alt="cooker hood dark" width="400"> |
| Cooker hood, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/hood-running.gif" alt="cooker hood, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/hood-running-dark.gif" alt="cooker hood, at work dark" width="400"> |
| Cooker hood mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-gaggenau.png" alt="cooker hood mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-gaggenau-dark.png" alt="cooker hood mini card dark" width="400"> |

### <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/miele.svg" alt="" height="22"> Miele

Miele integration: a tumble dryer drying (progress from the elapsed and remaining times), a freezer in super freezing and a two-zone wine cabinet with its light on.

| | Light | Dark |
|---|---|---|
| Tumble dryer | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dryer.png" alt="tumble dryer" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dryer-dark.png" alt="tumble dryer dark" width="400"> |
| Tumble dryer, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dryer-running.gif" alt="tumble dryer, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/dryer-running-dark.gif" alt="tumble dryer, at work dark" width="400"> |
| Freezer | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/freezer.png" alt="freezer" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/freezer-dark.png" alt="freezer dark" width="400"> |
| Freezer, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/freezer-running.gif" alt="freezer, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/freezer-running-dark.gif" alt="freezer, at work dark" width="400"> |
| Wine cabinet | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/wine-cabinet.png" alt="wine cabinet" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/wine-cabinet-dark.png" alt="wine cabinet dark" width="400"> |
| Wine cabinet, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/wine-cabinet-running.gif" alt="wine cabinet, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/wine-cabinet-running-dark.gif" alt="wine cabinet, at work dark" width="400"> |
| Tumble dryer mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-miele.png" alt="tumble dryer mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-miele-dark.png" alt="tumble dryer mini card dark" width="400"> |

### <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/samsung.svg" alt="" height="16"> Samsung

SmartThings: a washing machine rinsing, Pause and Stop sent through its operating state.

| | Light | Dark |
|---|---|---|
| Washing machine | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/samsung-washer.png" alt="washing machine" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/samsung-washer-dark.png" alt="washing machine dark" width="400"> |
| Washing machine, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/samsung-washer-running.gif" alt="washing machine, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/samsung-washer-running-dark.gif" alt="washing machine, at work dark" width="400"> |
| Washing machine mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-samsung.png" alt="washing machine mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-samsung-dark.png" alt="washing machine mini card dark" width="400"> |

### <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/lg.svg" alt="" height="28"> LG

LG ThinQ: a WashCombo drying (progress from the finish time and total duration), a microwave, a hob and a Styler.

| | Light | Dark |
|---|---|---|
| Washer-dryer | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-dryer.png" alt="washer-dryer" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-dryer-dark.png" alt="washer-dryer dark" width="400"> |
| Washer-dryer, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-dryer-running.gif" alt="washer-dryer, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/washer-dryer-running-dark.gif" alt="washer-dryer, at work dark" width="400"> |
| Microwave | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/microwave.png" alt="microwave" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/microwave-dark.png" alt="microwave dark" width="400"> |
| Microwave, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/microwave-running.gif" alt="microwave, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/microwave-running-dark.gif" alt="microwave, at work dark" width="400"> |
| Hob | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/hob.png" alt="hob" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/hob-dark.png" alt="hob dark" width="400"> |
| Hob, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/hob-running.gif" alt="hob, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/hob-running-dark.gif" alt="hob, at work dark" width="400"> |
| Styler | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/styler.png" alt="styler" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/styler-dark.png" alt="styler dark" width="400"> |
| Styler, at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/styler-running.gif" alt="styler, at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/styler-running-dark.gif" alt="styler, at work dark" width="400"> |
| Styler mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-lg.png" alt="styler mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-lg-dark.png" alt="styler mini card dark" width="400"> |

### <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/whirlpool.svg" alt="" height="18"> Whirlpool, Maytag, <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/logos/kitchenaid.svg" alt="" height="14"> KitchenAid

Whirlpool integration, which doesn't say the brand: `brand: maytag` on a dryer, `brand: kitchenaid` on a wall oven baking, Stop through its button. No progress from this integration: the state stands alone with the finish time.

| | Light | Dark |
|---|---|---|
| Tumble dryer (Maytag) | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/maytag-dryer.png" alt="tumble dryer (maytag)" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/maytag-dryer-dark.png" alt="tumble dryer (maytag) dark" width="400"> |
| Tumble dryer (Maytag), at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/maytag-dryer-running.gif" alt="tumble dryer (maytag), at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/maytag-dryer-running-dark.gif" alt="tumble dryer (maytag), at work dark" width="400"> |
| Wall oven (KitchenAid) | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/kitchenaid-oven.png" alt="wall oven (kitchenaid)" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/kitchenaid-oven-dark.png" alt="wall oven (kitchenaid) dark" width="400"> |
| Wall oven (KitchenAid), at work | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/kitchenaid-oven-running.gif" alt="wall oven (kitchenaid), at work" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/kitchenaid-oven-running-dark.gif" alt="wall oven (kitchenaid), at work dark" width="400"> |
| Wall oven mini card | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-whirlpool.png" alt="wall oven mini card" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-smart-appliance-card/main/screenshots/mini-whirlpool-dark.png" alt="wall oven mini card dark" width="400"> |

## How it works

The card reads the entity registry to list the entities of the chosen device and tells its integration from them. It then matches each role by its translation key, then by its entity ID (English and French slugs), then by its attributes (a door's device class, a timestamp…). Program and option labels use Home Assistant's own translations.

The appliance type comes from what the integration says about the device (Miele's model, LG's device type), else from its Home Connect programs, else from the entities only one kind of appliance has (a fridge's setpoints, a hood's fan stage). Each integration's states are folded into one set (ready, delayed start, running, paused, action required, finished, error), and when the integration reports the current step (rinse, spin, drying…), the card shows it instead of "Running". Commands go through what each integration offers: buttons (Home Connect, Miele, Matter, SmartThings dishwashers) or an operation select (SmartThings, LG ThinQ). The progress is computed from the elapsed and remaining times, or from the finish time and total duration, when the integration has no percentage.

Home Connect only sends program options when the selected program changes, so after a Home Assistant restart they all stay unavailable. The card then shows them greyed out with a **Load options** button, which switches to another program and back to load them. While someone turns the dial on the appliance (*Remote control* off), Home Assistant can't read the options: the card says so and disables the button until remote control is back. It never reloads them by itself, since that changes the program on the appliance. If loading fails, the original program is restored.

With Home Connect, **Start** selects the chosen program on the *Active program* entity, which is how that integration starts a program. Appliances sometimes reject a start for a moment (`BadRequest`, `WrongOperationState`): the card then retries once after 3 seconds, and if it fails again shows a short message in the card instead of Home Assistant's raw error (the technical detail is in its tooltip). **Stop** asks for a second tap within 3 seconds.

Some appliances can't be turned off remotely: after a first refusal, the card says so and keeps the power button disabled while the appliance is on (until the page is reloaded); turning it on still works. The power button and the option pills send an explicit turn on or turn off from the state shown, and stay disabled until the appliance answers, so a quick second click can't undo the first.

## Development

```bash
npm install
npm run build        # stamps the version of package.json into dist/smart-appliance-card.js and embeds logos/
npm run check        # builds and checks the card (run in CI)
npm run screenshots  # renders the cards (and the animation GIFs, needs ffmpeg) with mock devices into screenshots/
```

Brand logos live in `logos/`, one `<brand>.svg` or `.png` per key of the `brand` option; the build embeds them in the card, which stays a single file. A brand without a file gets the badge with its initial. The logos are the trademarks of their owners, shown only to identify the appliance's brand.

`dist/` is not committed: `npm run build` creates it locally, CI builds it on every push, and the release workflow attaches the built file to the release, which is where the Marketplace installs it from.

### Releasing

1. Bump `version` in `package.json`
2. Add a `## <version>` section at the top of [CHANGELOG.md](https://github.com/juju35/ha-smart-appliance-card/blob/main/CHANGELOG.md)
3. Push to `main`: the **Release** workflow builds the card, creates the tag and the GitHub release with the changelog section as notes, and attaches `smart-appliance-card.js`

## Translations

The card auto-detects the language from your Home Assistant settings. Currently supported:

| Language | Code |
|---|---|
| English | `en` |
| Français | `fr` |
| Deutsch | `de` |
| Español | `es` |
| Српски | `sr` |
| Srpski (latinica) | `sr-Latn` |
| Italiano | `it` |
| Nederlands | `nl` |
| Português (Portugal), also used for `pt-BR` | `pt` |
| Polski | `pl` |
| Română | `ro` |
| Dansk | `da` |
| Svenska | `sv` |
| Български | `bg` |
| Русский | `ru` |
| Українська | `uk` |
| Magyar | `hu` |
| Slovenčina | `sk` |
| Čeština | `cs` |
| Slovenščina | `sl` |
| Latviešu | `lv` |
| Ελληνικά | `el` |

Contributions for additional languages are welcome!

## License

[MIT](https://github.com/juju35/ha-smart-appliance-card/blob/main/LICENSE)

## Support

If you find this project useful, you can support its development:

<a href="https://buymeacoffee.com/julienstep9"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" height="50"></a>
