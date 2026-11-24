# Changelog

## 2.13.0 - 2026-11-24

### Features
- **Entities of your own** ([#116](https://github.com/juju35/ha-smart-appliance-card/issues/116)): three YAML options bring entities that are not the appliance's into the card.
  - `sensors`: chips with the state (and unit) of other sensors — a smart plug, a room sensor, a template sensor —, a `name` and `icon` each if wanted; on the mini card too, a click opens the entity.
  - `commands`: a *Commands* section under the program options (full card, whatever the appliance does) — `select` / `input_select` as drop-downs, `switch` / `input_boolean` / `light` / `fan` / `automation` as on / off pills, `button` / `input_button` / `script` / `scene` as buttons.
  - `entities.watts`: the power chip from a sensor of your choice (a smart plug the appliance is plugged into), now listed with the other overrides in the visual editor (*Power draw*), next to `entities.energy` for the energy per cycle.

## 2.12.1 - 2026-11-24

### Maintenance
- The card source is split into ES modules: `src/` (entry `src/index.js`), cut at its sections, with the translations in one file per language (`i18n/<lang>.js`). `scripts/bundle.mjs` concatenates them back, in their original order, into the same single file and per-language files as before; the tests evaluate that bundle.

## 2.12.0 - 2026-11-22

### Features
- **hOn support** ([#109](https://github.com/juju35/ha-smart-appliance-card/issues/109), thanks @Skifou): Haier, Candy and Hoover appliances through the [hOn](https://github.com/gvigroux/hon) custom integration — washing machines, washer-dryers, tumble dryers, dishwashers, fridges and wine cabinets, the type read from its entities. The card shows the machine mode (folded into its states, a dishwasher's numbered its own way), the program phase while it runs, the program, the finish time and the progress against the program duration, the door, the remote control, the salt and rinse aid alerts and the temperatures, with a Haier, Candy or Hoover badge. hOn has no start or stop button (it starts programs with its `hon.start_program` action), so the card has none either; its ovens, hobs, air conditioners, purifiers and water heaters are left out.

## 2.11.3 - 2026-11-22

### Performance
- Card picker: the previews are back (`preview: true`), and light. Each card's preview is drawn only once it scrolls into view of Home Assistant's card picker, which otherwise builds the preview of every card at once: until then it holds Home Assistant's state (no render, no history request, no animation). On a dashboard or in the card editor the card is drawn as before.

## 2.11.2 - 2026-11-22

### Performance
- Card picker: the cards no longer ask Home Assistant for a live preview (`preview: false` in `window.customCards`). The picker drew every card at once (history requests, animations), which made the list slow to open; it now shows each card's description instead.

## 2.11.1 - 2026-11-21

### Fixes
- **Home Connect Local**: a delayed start no longer shows the program's duration as the time left with a wrong finish time. The card reads the *Start in* countdown and shows *Starts at 01:00 · in 1 hr 51 min*, then *Ends at* the start plus the program's duration, instead of a bar at 0 % — on the mini card too.

## 2.11.0 - 2026-11-21

### Features
- **Fridges and freezers** (#101): each compartment's temperature is shown with its setpoint, *6 °C → 4 °C* (the setpoint in the chip's tooltip), instead of two chips that looked the same.
- **− / + on the setpoint** (#101): a *Temperature* section on the full card, one row per setpoint (`number`), within its min / max and by its step.
- **Too warm alert** (#101): a compartment above 8 °C (fridge) or −12 °C (freezer) gets a *Too warm* alert chip, on the mini card too; `temperature_alert` and `freezer_temperature_alert` set the thresholds (`false` turns one off), both in the visual editor. A compartment set below zero counts as a freezer one.
- Support for the core [Liebherr](https://www.home-assistant.io/integrations/liebherr/) integration: fridges, freezers and fridge-freezers, temperature and setpoint per zone, SuperCool / SuperFrost as the super mode, party and night mode and the other switches and selects as settings; Liebherr brand colour.

## 2.10.0 - 2026-11-21

### Features
- **i-Dos fill level alerts** (#102): washers with i-Dos show *i-Dos 1 low* / *i-Dos 2 low* while the Home Connect event of the detergent container is `present` or `confirmed`, like the salt and rinse aid alerts of the dishwasher.
- **Coffee machine maintenance alerts** (#102): *Descaling recommended* and *Cleaning recommended* chips from the Home Connect events `device_should_be_descaled` / `device_should_be_cleaned`, next to the bean container, water tank and drip tray ones.
- **Alerts of your own** (#102): the `alerts` option (YAML only) shows alert chips, in the same style as the built-in ones and on the mini card too, from entities of your own (a template sensor, a helper, a leak sensor…): while the entity is on (`on`, `present`, `problem`, `low`…) or in one of the states listed under `state`, with its own `name` and `icon`.

## 2.9.2 - 2026-11-20

### Fixes
- Mini cards: the detail view folds back on a tap elsewhere on iOS too (Safari and the companion app send no click for a tap on something that is not clickable): caught on the pointer, as on the other cards; and it is back to the compact view when the card leaves the page (another view, a conditional card hidden).
- Mini cards: the dashboard lays the card out again when it unfolds or folds back; a pending header measurement is cancelled when the card leaves the page.
- README: the options table says which card each option applies to (`both`, `mini`), as on the other cards.
- The page no longer moves by itself on state updates: the card is patched in place instead of being rewritten (icons and illustration stay the same nodes, animations no longer restart), and the icons of chips, lines, toggles, messages and buttons keep their size while they load — a rewrite made the card lose 1 to 4 px for a frame on every update of its entities. The status pill is measured again once Home Assistant's card frame has drawn its content, so that it is in its place from the first frame.

### Performance
- An update of another entity no longer serialises the appliance's states again: the same state objects reuse the text of the last update.

### Maintenance
- The unit tests report the card's own coverage.

## 2.9.1 - 2026-11-19

### Fixes
- **Home Connect Local**: the power state select (*Power state*) is no longer listed among the program options when the appliance also has the power switch the card shows as its On/Off button (two power states). With more power states there is no switch, and the select stays.

## 2.9.0 - 2026-11-18

### Features
- Support for [LocalThings](https://github.com/mbillow/localthings), Samsung appliances on the local network: machine state with the oven's cavity state or the laundry step, progress and finish time, cycle or oven mode picker, Start / Pause / Resume / Stop buttons, remote control, power and door; the type is read from the device name. An oven cooking without a timer shows no percentage.

## 2.8.2 - 2026-11-18

### Fixes
- Illustrated header: `auto` now follows the Home Assistant theme alone — a light theme keeps the day picture after sunset, a dark theme still shows the night one.

## 2.8.1 - 2026-11-17

### Fixes
- Illustrated header in Safari (WebKit): the appliance no longer lands on the title and the status pill — its box gets an explicit width instead of the SVG's default 300 px, so it stays at the banner's right.

## 2.8.0 - 2026-11-17

### Features
- **Illustrated header** on the full and the mini card (90 px): the appliance's own animated illustration stands in its room (a laundry room for washers, dryers and the Styler, a kitchen for the others) on a 10 px tiled floor strip, with the title and the subtitle on the left. The round icon is tinted by the state (at work, warning, fault, done; neutral grey when idle or off) and carries the brand's logo (or its initial) as a badge.
- Night picture after sunset (`sun.sun`) or with Home Assistant's dark theme, forced with `illustration_theme: day | night`; `illustration: false` keeps the classic header. Both options are in the visual editor, the mini card's included.
- The classic header's icon follows the state colours too.
- Status pill on every header (full and mini card, illustrated or classic): a dot and the state, in the icon's colour, on the title row right after the title only when the whole title and its whole label fit there (measured, in every language); otherwise on its own line under the subtitle (then kept to one line), and only its dot when even that does not fit in the banner above the floor strip or on a card 200 px wide or less. The mini card's subtitle names the program instead of repeating the state.
- The mini card's expand / collapse button sits in the banner's top right corner (24 px, frosted), like the other cards.
- Night picture with the dark theme even while the sun is up (a day picture would glare on a dark dashboard); `illustration_theme: day | night` still forces one.

### Fixes
- Hob: the body no longer shows only its state — a **Cooking zones** section lists each zone in its tile (LG ThinQ per-location power level out of its maximum, state and timer left; Miele plates), with how many are on; the chips add remote control (LG ThinQ), child lock, the power drawn when the integration reports it, and a wine cabinet's light.
- The body no longer repeats the header pill word for word: beside the percentage, the time left instead of "Running" (the finish time under the bar); the big idle / ready state is left to the pill. On a card so narrow that the banner's pill keeps only its dot, the state is written in the body again (full and mini card). On that narrow card the running state also comes back beside the percentage, above the time left.

## 2.7.1 - 2026-11-14

### Fixes
- The mini card's visual editor offers `energy_price` and `energy_price_entity` again: the energy chip of the compact view shows the cycle's cost too, and so does the full card it unfolds into.
- README: `entity`, the alternative to `device_id`, is marked YAML only.

## 2.7.0 - 2026-11-12

### Features
- `show_title` and `show_subtitle` options (also in the visual editor) hide the header's title and its subtitle, separately, for a card placed under a section heading of its own (asked in juju35/ha-vehicle-card#72).

## 2.6.0 - 2026-11-10

### Features
- **Home Connect hob**: a hob on the built-in Home Connect integration is now detected. It has no program and its device model is the VIB, so it is told apart by its event sensors: it is the only appliance with both the favorite keys (also on hoods) and the preheat / alarm clock events (also on ovens). Thanks @FredM67 (#79, #80).

## 2.5.2 - 2026-11-10

### Improvements
- Energy per cycle: with `energy_price` (per kWh) or `energy_price_entity` (a price sensor: current tariff, Tempo…), the chip adds the cycle's cost in Home Assistant's currency (*This cycle: 0.58 kWh · ≈ €0.12*). Both in the editor (full card), 22 languages.

## 2.5.1 - 2026-11-09

### Maintenance
- No code change: released again to check the installation from the Marketplace.

## 2.5.0 - 2026-11-09

### Features
- **Energy per cycle**: with an energy meter among the appliance's entities (`device_class: energy`, Miele, SmartThings, LG ThinQ…) or one set as `entities.energy` (a smart plug), a chip shows *This cycle: 0.6 kWh* while a program runs and *Last cycle: 0.9 kWh* once it ended (within 24 h). Worked out from the recorder's history of the operation state and the meter, read again when the state changes and every 5 minutes while a cycle runs; a meter that drops (Miele's per-program one) counts as a reset. `show_energy` (default `true`) in the editor; 22 languages.

## 2.4.1 - 2026-11-09

### Fixes
- Translations: the cards are defined once the page's language file has arrived (at most 1.5 s; Home Assistant builds a card when its element gets defined), so the first render is already translated instead of English then redrawn; until a language file is in, a missing text reads the English one wherever the card has no fallback of its own.

## 2.4.0 - 2026-11-09

### Performance
- **Translations load on demand**: the bundle keeps English only (263 KB → 179 KB) and each other language is its own `smart-appliance-card.i18n.<lang>.js` file next to it, fetched the first time a card needs it. Home Assistant loads every dashboard resource on every dashboard, so each page used to download and parse all 22 languages to use one. Until a language file has arrived (a few milliseconds), texts fall back to English, and the cards redraw once it is there.

### Maintenance
- Build: `scripts/i18n-split.mjs` splits the built bundle and rebuilds every table from the split files to check them (the build fails on any difference); `src/` keeps every language as before.
- Release: every file of `dist/` is attached. Manual installation copies the translation files too.

## 2.3.0 - 2026-11-09

### What's new
- Support for [Home Connect Local](https://github.com/chris-mc1/homeconnect_local_hass) (`homeconnect_ws`), which talks to Bosch, Siemens, Neff, Gaggenau and Constructa appliances on the local network: the card finds its operation state, door (binary sensor), progress, time left, program picker and options, Start / Pause / Resume / Stop buttons, power switch, salt and rinse aid levels and coffee machine tanks, and reads the appliance type from the device model (#48).
- The visual editor accepts a binary sensor for the door, salt and rinse aid, and a sensor for the active program.

### Fixes
- The time left and elapsed time follow the unit of their sensor (seconds, minutes, hours or days) instead of always reading minutes.

## 2.2.1 - 2026-11-08

### Fixes
- A fridge, freezer or wine cabinet temperature chip no longer shows "0 °" or "NaN °" when the climate entity is unavailable or reports no temperature; it shows the number in the card's language with Home Assistant's unit (°C or °F).
- The "door still closed" reminder no longer appears after a Home Assistant restart for a program that ended long ago with the door opened since: it uses the operation state's last change and, when that and the door changed together, checks the recorder history.
- After a restart, a program that ended before the 48 hours of history the card reads shows no reminder instead of one dated from the start of that history.
- The illustration's animations pause while the card is off screen or the browser tab is hidden, and the 30 s refresh only updates the time texts instead of redrawing the card, so the animations no longer restart every 30 seconds.
- The mini card's header icon keeps its 40 px at every width; only the full card's icon shrinks on narrow cards.
- The visual editor's language list starts with an "Automatic" entry, which follows the Home Assistant language.

## 2.2.0 - 2026-11-07

### What's new
- A reminder chip shows when a program has finished and the door hasn't been opened since, with the time since it ended ("Finished 25 minutes ago, door still closed"), on the full and mini cards.

### Fixes
- The power button and the option pills turn the switch on or off from the state shown instead of toggling it, and stay disabled while the command runs, so a double click no longer cancels itself.
- The time left uses the hour and minute units of the card's language instead of a hard-coded "h" and "min".

## 2.1.0 - 2026-11-07

### What's new
- A click on a chip (door, temperature, fan, light, alert) opens the more-info dialog of its entity, also with Enter or Space from the keyboard.
- Mini cards take the height of their content in sections dashboards (`rows: 'auto'`).

## 2.0.4 - 2026-11-04

### Documentation
- README: images and links use absolute URLs, so the screenshots, icons, badges and links display in HACS (relative paths broke there).
- README: screenshots get a display size, so cards no longer show oversized in HACS and on GitHub.

## 2.0.3 - 2026-11-04

### Fixes
- Microwave picture while cooking: the plate and the food no longer flip and squash to a line. The inside lights up warm, the bowl circles the turntable, steam rises and microwaves flicker at the sides.

## 2.0.2 - 2026-11-04

### Changes
- Added Romanian, Danish, Swedish, Bulgarian, Russian, Ukrainian, Hungarian, Slovak, Czech, Slovenian, Latvian and Greek translations: `ro`, `da`, `sv`, `bg`, `ru`, `uk`, `hu`, `sk`, `cs`, `sl`, `lv` and `el`, for the cards and the visual editor, whose language picker offers Română, Dansk, Svenska, Български, Русский, Українська, Magyar, Slovenčina, Čeština, Slovenščina, Latviešu and Ελληνικά.

## 2.0.1 - 2026-11-03

### Fixes
- Upgrading from ha-home-connect-card: the README says where HACS installs the file after the rename (the former `ha-home-connect-card` folder for an install updated in place) and which resource URL to use, so the card is no longer reported missing (`Custom element doesn't exist`). The releases also carry a `home-connect-card.js` copy for manual installs.

## 2.0.0 - 2026-11-03

### Changes
- Renamed **ha-smart-appliance-card** (formerly ha-home-connect-card): one card, `smart-appliance-card`, and its mini version `smart-appliance-mini-card`, for every appliance. The file is now `smart-appliance-card.js` (HACS updates it; a resource added by hand must point to the new file). The `home-connect-dishwasher-card`, `home-connect-washer-card` and mini card types still work in existing dashboards.
- Brand: the logo of Bosch, Siemens, Neff, Gaggenau, Miele, Samsung, LG, Whirlpool and KitchenAid appliances next to the title (on a white tile, readable in both themes); other brands get a badge with their initial on the header icon. The Home Connect logo is gone: Home Connect appliances show their own brand (Bosch, Siemens…). The main buttons take the brand's colour. Logos are embedded by the build from `logos/`.

### Features
- New appliances, each with its own animated illustration: tumble dryer, washer-dryer, oven, microwave, hob, coffee machine, cooker hood, fridge, freezer, wine cabinet and LG Styler.
- New integrations: Miele, SmartThings, LG ThinQ, Whirlpool and Matter, next to Home Connect. Their states are shown like Home Connect's, with the program step when they report it, and Start / Pause / Resume / Stop go through their buttons or operation selects.
- The appliance type is detected from the device (programs, model, entities); the new `kind` option sets it when it can't be. The new `brand` option sets the brand when the integration doesn't give it (Maytag or KitchenAid through Whirlpool).
- Progress worked out from the elapsed and remaining times, or the finish time and total duration, for integrations without a percentage.
- Temperatures on fridges, freezers and wine cabinets, and on ovens while cooking; fan stage and light on cooker hoods; super modes and other settings shown on appliances without programs.
- Coffee machine alerts: bean container empty, water tank empty, drip tray full.
- Visual editor: appliances of every supported integration, appliance type and brand fields.
- Screenshots and animation GIFs of every new appliance, in light and dark themes.

## 1.12.0 - 2026-11-03

### Features
- Header: the Home Connect logo is back as a badge on the round appliance icon (dishwasher or washing machine), on the full cards and the mini cards. The logo is embedded.

## 1.11.9 - 2026-11-02

### Fixes
- Mini cards: the header icon keeps its full size (40 px, 24 px icon) in the compact view, like the full card.

## 1.11.8 - 2026-11-02

### Changes
- Cards: the `show_logo` option is removed: the appliance icon is always shown (still left out on very narrow cards). An existing `show_logo` line is ignored.

## 1.11.7 - 2026-11-02

### Changes
- Cards: the header shows the tinted round appliance icon of the project's showcase page (blue `mdi:dishwasher` or `mdi:washing-machine`, by card) instead of the Home Connect logo, like the generic icons of the other cards. The `show_logo` option still hides it.

## 1.11.6 - 2026-11-01
### Fixes
- Mini cards at their default size (half a section of a Sections view) are readable again: the appliance name no longer disappears and the power button no longer sticks out of the card. On a narrow card the round buttons move under the text, the finish time wraps instead of being cut, the status pill shows only its coloured dot and the state is written above the program instead. Below about 200 px the Home Connect logo steps aside. The full card's buttons, percentage and door chip wrap at that width too.
- The status pill no longer squeezes the appliance name: it takes at most half the header and shortens its text. The name now gives way first, so at ordinary widths the pill shows its whole label ("Ready" was cut to "Re…" on a 320 px card).
- Keyboard: the focused button keeps the focus after the card redraws, so pressing Enter on Stop and then Enter again confirms it, and Pause, Resume, the option pills and the power button no longer send the focus back to the top of the page. Giving the focus back never scrolls the page: after tapping Pause or the zoom button and scrolling away, the dashboard no longer jumps back to the card on every update (every 30 s during a program).
- Long states ("Wymagane działanie", "Niedostępne"), the program and the finish time wrap instead of ending in "…" on a narrow card, and a long option label wraps inside its pill instead of sticking out of the card.
- The card keeps a usable width in containers that size it from its content (layout-card, button-card, an `auto` grid column) instead of shrinking to its padding, and it still shrinks to fit two per row in a grid card, layout-card `1fr 1fr` grid or horizontal stack instead of overflowing it, including when the dashboard wraps each card in its own element.
- Screen readers announce whether an option pill or the power button is on or off.
- Better contrast: the door, salt and rinse aid warnings, the state texts, error messages and the blue/red button labels are now readable on light and dark themes (at least 4.5:1). The delayed start purple follows the theme (`--purple-color`) and is no longer too dark on a dark card.

### Maintenance
- Screenshots: a capture is only rewritten when its pixels change, so a re-render that looks the same no longer shows up in the screenshots commit.

## 1.11.5 - 2026-11-01
### Changes
- Added Italian, Dutch, European Portuguese and Polish translations: `it`, `nl`, `pt` and `pl`, for the cards and the visual editor, whose language picker offers Italiano, Nederlands, Português (Portugal) and Polski. Home Assistant in `pt-BR` gets the European Portuguese texts.

## 1.11.4 - 2026-11-01
### Changes
- Added Serbian (Cyrillic and Latin) translations: `sr` and `sr-Latn`, for the cards and the visual editor, whose language picker offers Српски and Srpski (latinica). With Home Assistant in `sr-Latn` the card picks the Latin script automatically.

## 1.11.3 - 2026-10-29
### Fixes
- Masonry dashboards balance their columns better: the card now reports its real height (from 3 to about 8 rows depending on the program picker, options and buttons shown) instead of a fixed size.
- Every button (Pause, option pills, power, Load options) now reacts when hovered and shows a clear focus ring when reached with the keyboard.

### Maintenance
- Screenshots: the animated GIFs are now identical from one run to the next (the card's animations were not paused while recording), so pull requests no longer get a needless screenshots commit.
- CI: Dependabot also updates the pre-commit hooks, and the Biome lint job reads its version from `.pre-commit-config.yaml`.

## 1.11.2 - 2026-10-29
### Fixes
- Leaving the view right after tapping Stop no longer leaves the button armed: back on the view it shows Stop again, so a single tap can't stop the program. An error message no longer stays on screen either.
- On touch screens, closing a drop-down without picking anything no longer freezes the progress, state and finish time until the next tap elsewhere.

## 1.11.1 - 2026-10-29
### Fixes
- An option switch whose entity id ends in `_etat` is no longer mistaken for the power switch (it stays in the options).
- Renaming the appliance or switching Home Assistant between 12 h and 24 h now updates the card right away.
- Translations: the Spanish power button reads "Encendido/apagado", the German delayed-start badge is shorter ("Verzögerter Start") so the mini card keeps room for the appliance name, and the German editor uses Home Assistant's "Konnektivität".

### Maintenance
- CI: screenshots checkout no longer falls back to a ref fork PRs cannot resolve; the Chromium download is time-boxed and retried, and the browser deps step fails explicitly after three failed attempts.
- CI: after pushing refreshed screenshots to a pull request, the Screenshots workflow re-runs Lint, Validate and HACS on that commit (via `workflow_dispatch`, which a `GITHUB_TOKEN` push can trigger); Lint gains a `workflow_dispatch` trigger.

## 1.11.0 - 2026-10-28
### Changes
- Spanish translation (cards and visual editor); the editor's language picker offers Español.

## 1.10.0 - 2026-10-28
### Changes
- German translation (cards and visual editor), contributed by domwu0001.

## 1.9.0 - 2026-10-28
### Changes
- Option toggles / selects, Pause, Resume, Stop and the program select now retry and show their errors in the card (like Start) instead of Home Assistant's toast.
- The finish time follows the Home Assistant locale's 12 h / 24 h preference.
- Faster updates: entity role matching and appliance detection are cached instead of being recomputed on every state change in Home Assistant.

### Fixes
- The visual editor's Appliance field shows its label and helper instead of the raw `ed_device_id` key.
- A focused drop-down no longer freezes the card's updates until a click elsewhere: Escape or leaving the card releases it.

### Maintenance
- README: new GIFs of the running, paused, delayed-start and finished animations for both appliances; all screenshots regenerated.
- CI: fork-safe screenshots workflow, release gated on the tests, Dependabot also watches npm.

## 1.8.0 - 2026-10-26
### Changes
- The mini card's progress bar is now built with a template literal instead of string concatenation, matching the rest of the file. No change to the rendered output or behavior.

## 1.7.0 - 2026-10-26
### Changes
- The Options section title has a leading 16px icon, like the other cards' section titles.
- Start / Resume buttons (and the mini card's round play button) are tinted with the primary color instead of filled; Stop keeps its error tint, and its confirm step is a stronger tint with a ring instead of a solid red fill.
- Header geometry: the body starts 8 px under the header (was 10 px); logo 12 px from the card's top and left edges, power / detail button at the right edge as before.

## 1.6.4 - 2026-10-25

### Changes
- Door open: the washer shows its porthole swung open on the empty drum, the dishwasher its lowered door on the loaded racks.

## 1.6.3 - 2026-10-25

### Changes
- Reverted the read-only options shown while a program runs (1.6.2): Home Connect doesn't expose them once a program has started.

## 1.6.2 - 2026-10-25

### Changes
- While a program runs, the options in use are listed read-only (temperature, spin speed… and the switched-on extras); the mini card adds them after the program name.

## 1.6.1 - 2026-10-25

### Fixes
- The illustration, default name and subtitle follow the appliance's own programs: a washing machine shown with the dishwasher card type now gets the washer illustration and its animations.

## 1.6.0 - 2026-10-25

### Changes
- New mini cards `home-connect-dishwasher-mini-card` and `home-connect-washer-mini-card`, like the Roborock mini card: appliance, state, program, progress, alerts and round buttons; the detail button (`zoom`, on by default) unfolds the full card and a click elsewhere folds it back.
- New header like the Roborock card: Home Connect logo on the left (links to home-connect.com, hide it with `show_logo: false`), program as subtitle.
- Appliance illustration next to the state: while a program runs, the washer shakes, its drum tumbles the laundry and bubbles rise, and the dishwasher steams, sprays and lights the floor; the display blinks. A badge marks a paused appliance (pause, breathing), a delayed start (turning clock) and a finished program (check mark drawn in, with sparkles); no animation with reduced motion; the display takes the state color. Progress now shows as a large percentage with the state and finish time. Setting `icon` puts the icon back instead of the illustration.
- New `show_power` option (default `true`, also in the visual editor) to hide the power button, e.g. for a washing machine that can't be turned on / off remotely.

## 1.5.3 - 2026-10-25

### Fixes
- **Start** no longer fails on a momentary refusal from the appliance (`BadRequest`, `WrongOperationState`): the card retries once after 3 seconds, with a disabled "Starting…" button meanwhile. If it still fails, a short translated message shows in the card (technical detail in its tooltip) instead of Home Assistant's raw error; it goes away on the next state change or after 10 seconds.
- While a program is being set on the appliance itself (*Remote control* off), the options section says so and **Load options** is disabled until remote control is back; the card never reloads the options by itself. A failed reload shows a message in the card and the original program is always restored.
- An appliance that refuses to be turned off gets a message in the card instead of a raw error, and its power button stays disabled while it's on; turning it on still works.

### Changes
- New `remote_control` entity override (auto-detected, documented in the README and offered in the editor).

## 1.5.2 - 2026-10-25

### Maintenance
- Lint warnings on the editor and card-picker lookups silenced so an automatic Biome fix cannot give the washer card the dishwasher profile again; duplication checks run on Node 22. Nothing changes for users.

## 1.5.1 - 2026-10-24

### Maintenance
- Deterministic screenshots (fixed clock and time zone), each rendered in a fresh page; duplication checks no longer scan the tests. Nothing changes for users.

## 1.5.0 - 2026-10-24

### Changes
- The visual editor follows the card's `language` option.
- `connectivity`, `salt` and `rinse_aid` entity overrides documented in the README and offered in the editor (salt and rinse aid on the dishwasher card only).

### Fixes
- A washer card added from the card picker gets a washer instead of the first dishwasher, and its editor keeps the `pause` / `resume` overrides.
- The Pause button shows from the start: a button entity never pressed yet (`unknown`) no longer hides it; it still hides when `unavailable`.
- The 30 s refresh only redraws the card while a program with a finish time runs, instead of rebuilding it every 30 s when idle.
- Lighter updates: the appliance's entities are no longer looked up in the whole entity registry on every Home Assistant update.
- The status text and the config values (icon, entity ids) are HTML-escaped.

### Maintenance
- CI hardening: actions pinned by commit SHA, read-only workflow token, monthly Dependabot updates, duplication findings annotated in pull requests.
- Unit tests (`npm test`) run in CI; `package-lock.json` version synced. Nothing changes for users.

## 1.4.1 - 2026-10-22

### Maintenance
- Tooling only, no functional change: Biome linting, pre-commit and a Lint CI (duplication checks). Card source modernized (optional chaining, template literals), identical behavior.

## 1.4.0 - 2026-10-22

### Changes
- More compact layout with the same information, like the other ha-* cards: 12 px card padding, 36 px header icon, 16 px name and 12 px subtitle, 11 px pills, tighter tiles and sections.
- Appliance icon and power button 40 → 36 px, lower program selector, options and buttons, 4 px progress bar.

## 1.3.3 - 2026-10-21

### Changes
- HACS now asks for Home Assistant 2024.8 or later, the version that brought the sections view the card supports; the README says so under **Prerequisites**.

## 1.3.2 - 2026-10-21

### Maintenance
- Merged branches are deleted automatically (new `cleanup-branches` workflow). Nothing changes for users.

## 1.3.1 - 2026-10-21

### Development
- The built card is no longer committed in `dist/`: CI builds it on every push, and the release workflow builds it and attaches it to the release, which is where HACS downloads it from. Nothing changes for users.

## 1.3.0 - 2026-10-21

### Changes
- State colors come from the Home Assistant theme (`--info-color` running, `--warning-color` paused or action required, `--success-color` finished, `--error-color` error) with the Home Assistant defaults as fallbacks; the Stop button and the open-door chip follow them too.
- Header aligned with the other ha-* cards: 40px badge, name 18px.
- Chips, toggles, fields and the progress bar use the shared sizes and radii (12px pills, 10px fields, 6px bar).

### Development
- The card source moves to `src/home-connect-card.js`; `npm run build` stamps the version from `package.json` into `dist/home-connect-card.js`, and CI checks that `dist/` is up to date.
- `npm run screenshots` renders the README screenshots with mock Home Connect devices.
- Releases are published when `version` in `package.json` has no tag yet.

## 1.2.0 - 2026-10-20

### What's new
- Home Connect logo next to the appliance name.

## 1.1.0 - 2026-10-19

### Fixes
- Program options (intensive zone, brilliance dry, speed perfect, hygiene plus…) no longer disappear when Home Connect hasn't loaded them: they stay visible, greyed out, until they're available.

### What's new
- **Load options** button when no option is loaded yet, for example after a Home Assistant restart. It switches to another program and back, which makes Home Connect send the options.
- New README screenshot of the dishwasher with its program options.

## 1.0.0 - 2026-10-18

First public release.

### What's new
- Two cards for the Home Connect integration: `home-connect-dishwasher-card` and `home-connect-washer-card`.
- Pick the appliance once: every entity (state, door, progress, finish time, programs, power, stop/pause/resume, alerts) is found automatically from the device, and any of them can be overridden.
- Status with color, progress bar, finish time and time left while a program runs.
- Program picker and Start button (when remote start is enabled on the appliance), Pause/Resume for washers, Stop with a confirmation tap.
- Program options before starting: temperature, spin speed, Vario Perfect, intensive zone, hygiene and so on, whatever the appliance exposes.
- Door state, salt and rinse aid alerts.
- Visual editor in the dashboard UI, labels in English and French.
- Light and dark theme compatible, installable via HACS.
