var SMART_APPLIANCE_CARD_VERSION = '__VERSION__';

// ── i18n ──────────────────────────────────────────────────────────────────────
var HcI18n = {
  fr: {
    dishwasher: 'Lave-vaisselle',
    washer: 'Lave-linge',
    dryer: 'Sèche-linge',
    washer_dryer: 'Lavante-séchante',
    oven: 'Four',
    microwave: 'Micro-ondes',
    hob: 'Plaque de cuisson',
    coffee_maker: 'Machine à café',
    hood: 'Hotte',
    fridge: 'Réfrigérateur',
    freezer: 'Congélateur',
    wine_cooler: 'Cave à vin',
    styler: 'Styler',
    st_run_hood: 'Ventilation',
    st_run_hob: 'Cuisson',
    st_run_fridge: 'Super froid',
    st_run_freezer: 'Super congélation',
    light_on: 'Éclairage allumé',
    bean_container: 'Bac à grains vide',
    water_tank: 'Réservoir d\'eau vide',
    drip_tray: 'Bac d\'égouttage plein',
    ed_kind: 'Type d\'appareil',
    ed_kind_helper: 'Laisser vide pour le détecter depuis l\'appareil',
    ed_brand: 'Marque',
    ed_brand_helper: 'Badge et couleur des boutons, à choisir quand l\'intégration ne donne pas la marque (Maytag ou KitchenAid via Whirlpool)',
    st_inactive: 'Inactif',
    st_ready: 'Prêt',
    st_delayedstart: 'Départ différé',
    st_run: 'En cours',
    st_pause: 'En pause',
    st_actionrequired: 'Action requise',
    st_finished: 'Terminé',
    st_error: 'Erreur',
    st_aborting: 'Annulation',
    st_off: 'Éteint',
    st_unavailable: 'Indisponible',
    door_open: 'Porte ouverte',
    door_closed: 'Porte fermée',
    door_locked: 'Porte verrouillée',
    door_waiting: 'Terminé {t}, porte toujours fermée',
    cycle_energy: 'Ce cycle : {e}',
    last_cycle_energy: 'Dernier cycle : {e}',
    program: 'Programme',
    no_program: 'Aucun programme',
    ends_at: 'Fin à',
    remaining: 'reste {t}',
    start: 'Démarrer',
    stop: 'Arrêter',
    confirm: 'Confirmer ?',
    pause: 'Pause',
    resume: 'Reprendre',
    power: 'Marche / arrêt',
    options: 'Options',
    options_not_loaded: 'Options non chargées pour ce programme',
    reload_options: 'Charger les options',
    options_local: 'Réglage en cours sur l\'appareil : options indisponibles',
    starting: 'Démarrage…',
    start_rejected: 'L\'appareil a refusé le démarrage. Vérifiez la porte et le démarrage à distance, puis réessayez.',
    start_failed: 'Le programme n\'a pas pu démarrer.',
    reload_failed: 'Les options n\'ont pas pu être chargées. Réessayez dans un instant.',
    restore_failed: 'Le programme d\'origine n\'a pas pu être rétabli : vérifiez-le sur l\'appareil.',
    power_off_unsupported: 'Cet appareil ne peut pas être éteint à distance.',
    power_failed: 'L\'appareil n\'a pas répondu à la commande marche / arrêt.',
    command_failed: 'L\'appareil a refusé la commande. Réessayez dans un instant.',
    option_failed: 'L\'option n\'a pas pu être modifiée. Réessayez dans un instant.',
    salt: 'Sel presque vide',
    rinse_aid: 'Liquide de rinçage presque vide',
    remote_start_off: 'Démarrage à distance désactivé',
    offline: 'Appareil hors ligne',
    no_device: 'Aucun appareil électroménager trouvé',
    ed_device_id: 'Appareil',
    ed_device_id_helper: 'Appareil de Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool ou Matter',
    ed_name: 'Nom',
    ed_name_helper: 'Laisser vide pour le nom de l\'appareil',
    ed_icon: 'Icône',
    ed_show_program: 'Choix du programme',
    ed_show_controls: 'Boutons de commande',
    ed_show_options: 'Options du programme',
    ed_show_alerts: 'Alertes',
    ed_show_power: 'Bouton marche / arrêt',
    ed_show_energy: 'Énergie du cycle',
    ed_energy_price: 'Prix de l\'énergie',
    ed_energy_price_helper: 'Par kWh, pour le coût d\'un cycle à côté de son énergie',
    ed_energy_price_entity: 'Capteur de prix de l\'énergie',
    ed_energy_price_entity_helper: 'À la place d\'un prix fixe : un capteur en devise/kWh (tarif du moment, Tempo…)',
    ed_zoom: 'Bouton détail',
    ed_zoom_helper: 'Bouton en haut à droite qui passe la mini-carte en carte complète et inversement',
    zoom_in: 'Afficher la carte complète',
    zoom_out: 'Revenir à la vue compacte',
    ed_language: 'Langue',
    ed_language_helper: 'Laisser vide pour suivre la langue de Home Assistant',
    ed_language_auto: 'Automatique',
    ed_entities: 'Entités (avancé)',
    ed_entities_helper: 'Détectées automatiquement depuis l\'appareil ; à renseigner seulement pour forcer une entité',
    en_operation_state: 'État de fonctionnement',
    en_door: 'Porte',
    en_progress: 'Progression',
    en_finish_time: 'Heure de fin',
    en_selected_program: 'Programme sélectionné',
    en_active_program: 'Programme actif',
    en_power: 'Alimentation',
    en_energy: 'Énergie',
    en_stop: 'Arrêter le programme',
    en_pause: 'Mettre en pause',
    en_resume: 'Reprendre le programme',
    en_remote_start: 'Démarrage à distance',
    en_remote_control: 'Contrôle à distance',
    en_connectivity: 'Connectivité',
    en_salt: 'Sel presque vide',
    en_rinse_aid: 'Liquide de rinçage presque vide',
  },
  en: {
    dishwasher: 'Dishwasher',
    washer: 'Washing machine',
    dryer: 'Tumble dryer',
    washer_dryer: 'Washer-dryer',
    oven: 'Oven',
    microwave: 'Microwave',
    hob: 'Hob',
    coffee_maker: 'Coffee machine',
    hood: 'Cooker hood',
    fridge: 'Fridge',
    freezer: 'Freezer',
    wine_cooler: 'Wine cabinet',
    styler: 'Styler',
    st_run_hood: 'Venting',
    st_run_hob: 'Cooking',
    st_run_fridge: 'Super cooling',
    st_run_freezer: 'Super freezing',
    light_on: 'Light on',
    bean_container: 'Bean container empty',
    water_tank: 'Water tank empty',
    drip_tray: 'Drip tray full',
    ed_kind: 'Appliance type',
    ed_kind_helper: 'Leave empty to detect it from the appliance',
    ed_brand: 'Brand',
    ed_brand_helper: 'Badge and button colour, for when the integration doesn\'t give the brand (Maytag or KitchenAid through Whirlpool)',
    st_inactive: 'Inactive',
    st_ready: 'Ready',
    st_delayedstart: 'Delayed start',
    st_run: 'Running',
    st_pause: 'Paused',
    st_actionrequired: 'Action required',
    st_finished: 'Finished',
    st_error: 'Error',
    st_aborting: 'Aborting',
    st_off: 'Off',
    st_unavailable: 'Unavailable',
    door_open: 'Door open',
    door_closed: 'Door closed',
    door_locked: 'Door locked',
    door_waiting: 'Finished {t}, door still closed',
    cycle_energy: 'This cycle: {e}',
    last_cycle_energy: 'Last cycle: {e}',
    program: 'Program',
    no_program: 'No program',
    ends_at: 'Ends at',
    remaining: '{t} left',
    start: 'Start',
    stop: 'Stop',
    confirm: 'Confirm?',
    pause: 'Pause',
    resume: 'Resume',
    power: 'Power',
    options: 'Options',
    options_not_loaded: 'Options not loaded for this program',
    reload_options: 'Load options',
    options_local: 'Being set on the appliance: options unavailable',
    starting: 'Starting…',
    start_rejected: 'The appliance refused to start. Check the door and remote start, then try again.',
    start_failed: 'The program couldn\'t start.',
    reload_failed: 'The options couldn\'t be loaded. Try again in a moment.',
    restore_failed: 'The original program couldn\'t be restored: check it on the appliance.',
    power_off_unsupported: 'This appliance can\'t be turned off remotely.',
    power_failed: 'The appliance didn\'t respond to the power command.',
    command_failed: 'The appliance refused the command. Try again in a moment.',
    option_failed: 'The option couldn\'t be changed. Try again in a moment.',
    salt: 'Salt nearly empty',
    rinse_aid: 'Rinse aid nearly empty',
    remote_start_off: 'Remote start disabled',
    offline: 'Appliance offline',
    no_device: 'No appliance found',
    ed_device_id: 'Appliance',
    ed_device_id_helper: 'Appliance from Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool or Matter',
    ed_name: 'Name',
    ed_name_helper: 'Leave empty to use the device name',
    ed_icon: 'Icon',
    ed_show_program: 'Program picker',
    ed_show_controls: 'Control buttons',
    ed_show_options: 'Program options',
    ed_show_power: 'Power button',
    ed_show_energy: 'Cycle energy',
    ed_energy_price: 'Energy price',
    ed_energy_price_helper: 'Per kWh, for a cycle\'s cost next to its energy',
    ed_energy_price_entity: 'Energy price sensor',
    ed_energy_price_entity_helper: 'Instead of a fixed price: a sensor in currency/kWh (current tariff, Tempo…)',
    ed_zoom: 'Detail button',
    ed_zoom_helper: 'Button at the top right that switches the mini card to the full card and back',
    zoom_in: 'Show the full card',
    zoom_out: 'Back to the compact view',
    ed_show_alerts: 'Alerts',
    ed_language: 'Language',
    ed_language_helper: 'Leave empty to follow the Home Assistant language',
    ed_language_auto: 'Automatic',
    ed_entities: 'Entities (advanced)',
    ed_entities_helper: 'Detected from the device automatically; only set one to override it',
    en_operation_state: 'Operation state',
    en_door: 'Door',
    en_progress: 'Progress',
    en_finish_time: 'Finish time',
    en_selected_program: 'Selected program',
    en_active_program: 'Active program',
    en_power: 'Power',
    en_energy: 'Energy',
    en_stop: 'Stop program',
    en_pause: 'Pause program',
    en_resume: 'Resume program',
    en_remote_start: 'Remote start',
    en_remote_control: 'Remote control',
    en_connectivity: 'Connectivity',
    en_salt: 'Salt nearly empty',
    en_rinse_aid: 'Rinse aid nearly empty',
  },
  de: {
    dishwasher: 'Geschirrspüler',
    washer: 'Waschmaschine',
    dryer: 'Wäschetrockner',
    washer_dryer: 'Waschtrockner',
    oven: 'Backofen',
    microwave: 'Mikrowelle',
    hob: 'Kochfeld',
    coffee_maker: 'Kaffeevollautomat',
    hood: 'Dunstabzugshaube',
    fridge: 'Kühlschrank',
    freezer: 'Gefrierschrank',
    wine_cooler: 'Weinklimaschrank',
    styler: 'Styler',
    st_run_hood: 'Lüftung',
    st_run_hob: 'Kochen',
    st_run_fridge: 'Superkühlen',
    st_run_freezer: 'Supergefrieren',
    light_on: 'Licht an',
    bean_container: 'Bohnenbehälter leer',
    water_tank: 'Wassertank leer',
    drip_tray: 'Tropfschale voll',
    ed_kind: 'Gerätetyp',
    ed_kind_helper: 'Leer lassen, um ihn am Gerät zu erkennen',
    ed_brand: 'Marke',
    ed_brand_helper: 'Badge und Tastenfarbe, wenn die Integration die Marke nicht liefert (Maytag oder KitchenAid über Whirlpool)',
    st_inactive: 'Inaktiv',
    st_ready: 'Bereit',
    st_delayedstart: 'Verzögerter Start',
    st_run: 'Läuft',
    st_pause: 'Pausiert',
    st_actionrequired: 'Aktion erforderlich',
    st_finished: 'Fertig',
    st_error: 'Fehler',
    st_aborting: 'Wird abgebrochen',
    st_off: 'Aus',
    st_unavailable: 'Nicht verfügbar',
    door_open: 'Tür offen',
    door_closed: 'Tür geschlossen',
    door_locked: 'Tür verriegelt',
    door_waiting: 'Fertig {t}, Tür noch zu',
    cycle_energy: 'Dieser Zyklus: {e}',
    last_cycle_energy: 'Letzter Zyklus: {e}',
    program: 'Programm',
    no_program: 'Kein Programm',
    ends_at: 'Endet um',
    remaining: 'Noch {t}',
    start: 'Starten',
    stop: 'Stoppen',
    confirm: 'Bestätigen?',
    pause: 'Pausieren',
    resume: 'Fortsetzen',
    power: 'Ein/Aus',
    options: 'Optionen',
    options_not_loaded: 'Für dieses Programm wurden keine Optionen geladen',
    reload_options: 'Optionen laden',
    options_local: 'Wird am Gerät eingestellt: Optionen nicht verfügbar',
    starting: 'Wird gestartet…',
    start_rejected: 'Das Gerät hat den Start abgelehnt. Überprüfe die Tür und den Fernstart und versuche es erneut.',
    start_failed: 'Das Programm konnte nicht gestartet werden.',
    reload_failed: 'Die Optionen konnten nicht geladen werden. Versuche es in Kürze erneut.',
    restore_failed: 'Das ursprüngliche Programm konnte nicht wiederhergestellt werden. Überprüfe es direkt am Gerät.',
    power_off_unsupported: 'Dieses Gerät kann nicht aus der Ferne ausgeschaltet werden.',
    power_failed: 'Das Gerät hat nicht auf den Ein-/Aus-Befehl reagiert.',
    command_failed: 'Das Gerät hat den Befehl abgelehnt. Versuche es in Kürze erneut.',
    option_failed: 'Die Option konnte nicht geändert werden. Versuche es in Kürze erneut.',
    salt: 'Salz fast leer',
    rinse_aid: 'Klarspüler fast leer',
    remote_start_off: 'Fernstart deaktiviert',
    offline: 'Gerät offline',
    no_device: 'Kein Haushaltsgerät gefunden',
    ed_device_id: 'Gerät',
    ed_device_id_helper: 'Gerät aus Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool oder Matter',
    ed_name: 'Name',
    ed_name_helper: 'Leer lassen, um den Gerätenamen zu verwenden',
    ed_icon: 'Symbol',
    ed_show_program: 'Programmauswahl',
    ed_show_controls: 'Steuerungsschaltflächen',
    ed_show_options: 'Programmoptionen',
    ed_show_power: 'Ein-/Aus-Schaltfläche',
    ed_show_energy: 'Energie pro Zyklus',
    ed_energy_price: 'Energiepreis',
    ed_energy_price_helper: 'Pro kWh, für die Kosten eines Zyklus neben seiner Energie',
    ed_energy_price_entity: 'Energiepreis-Sensor',
    ed_energy_price_entity_helper: 'Statt eines festen Preises: ein Sensor in Währung/kWh (aktueller Tarif, Tempo…)',
    ed_zoom: 'Detailansicht-Schaltfläche',
    ed_zoom_helper: 'Schaltfläche oben rechts zum Wechseln zwischen kompakter und vollständiger Kartenansicht',
    zoom_in: 'Vollständige Karte anzeigen',
    zoom_out: 'Zur kompakten Ansicht zurückkehren',
    ed_show_alerts: 'Warnmeldungen',
    ed_language: 'Sprache',
    ed_language_helper: 'Leer lassen, um die in Home Assistant eingestellte Sprache zu verwenden',
    ed_language_auto: 'Automatisch',
    ed_entities: 'Entitäten (erweitert)',
    ed_entities_helper: 'Automatisch anhand des Geräts erkannt; nur festlegen, wenn du eine Entität überschreiben möchtest',
    en_operation_state: 'Betriebsstatus',
    en_door: 'Tür',
    en_progress: 'Fortschritt',
    en_finish_time: 'Endzeit',
    en_selected_program: 'Ausgewähltes Programm',
    en_active_program: 'Aktives Programm',
    en_power: 'Ein/Aus',
    en_energy: 'Energie',
    en_stop: 'Programm stoppen',
    en_pause: 'Programm pausieren',
    en_resume: 'Programm fortsetzen',
    en_remote_start: 'Fernstart',
    en_remote_control: 'Fernsteuerung',
    en_connectivity: 'Konnektivität',
    en_salt: 'Salz fast leer',
    en_rinse_aid: 'Klarspüler fast leer',
  },
  es: {
    dishwasher: 'Lavavajillas',
    washer: 'Lavadora',
    dryer: 'Secadora',
    washer_dryer: 'Lavadora-secadora',
    oven: 'Horno',
    microwave: 'Microondas',
    hob: 'Placa de cocción',
    coffee_maker: 'Cafetera',
    hood: 'Campana extractora',
    fridge: 'Frigorífico',
    freezer: 'Congelador',
    wine_cooler: 'Vinoteca',
    styler: 'Styler',
    st_run_hood: 'Extracción',
    st_run_hob: 'Cocción',
    st_run_fridge: 'Superrefrigeración',
    st_run_freezer: 'Supercongelación',
    light_on: 'Luz encendida',
    bean_container: 'Depósito de café en grano vacío',
    water_tank: 'Depósito de agua vacío',
    drip_tray: 'Bandeja de goteo llena',
    ed_kind: 'Tipo de aparato',
    ed_kind_helper: 'Dejar vacío para detectarlo desde el aparato',
    ed_brand: 'Marca',
    ed_brand_helper: 'Insignia y color de los botones, cuando la integración no da la marca (Maytag o KitchenAid a través de Whirlpool)',
    st_inactive: 'Inactivo',
    st_ready: 'Listo',
    st_delayedstart: 'Inicio diferido',
    st_run: 'En marcha',
    st_pause: 'En pausa',
    st_actionrequired: 'Acción necesaria',
    st_finished: 'Terminado',
    st_error: 'Error',
    st_aborting: 'Cancelando',
    st_off: 'Apagado',
    st_unavailable: 'No disponible',
    door_open: 'Puerta abierta',
    door_closed: 'Puerta cerrada',
    door_locked: 'Puerta bloqueada',
    door_waiting: 'Terminado {t}, puerta aún cerrada',
    cycle_energy: 'Este ciclo: {e}',
    last_cycle_energy: 'Último ciclo: {e}',
    program: 'Programa',
    no_program: 'Sin programa',
    ends_at: 'Termina a las',
    remaining: 'Quedan {t}',
    start: 'Iniciar',
    stop: 'Detener',
    confirm: '¿Confirmar?',
    pause: 'Pausar',
    resume: 'Reanudar',
    power: 'Encendido/apagado',
    options: 'Opciones',
    options_not_loaded: 'Opciones no cargadas para este programa',
    reload_options: 'Cargar opciones',
    options_local: 'Se está configurando en el aparato: opciones no disponibles',
    starting: 'Iniciando…',
    start_rejected: 'El aparato ha rechazado el inicio. Comprueba la puerta y el inicio remoto, y vuelve a intentarlo.',
    start_failed: 'No se ha podido iniciar el programa.',
    reload_failed: 'No se han podido cargar las opciones. Vuelve a intentarlo en un momento.',
    restore_failed: 'No se ha podido restaurar el programa original: compruébalo en el aparato.',
    power_off_unsupported: 'Este aparato no se puede apagar a distancia.',
    power_failed: 'El aparato no ha respondido a la orden de encendido/apagado.',
    command_failed: 'El aparato ha rechazado la orden. Vuelve a intentarlo en un momento.',
    option_failed: 'No se ha podido cambiar la opción. Vuelve a intentarlo en un momento.',
    salt: 'Sal casi agotada',
    rinse_aid: 'Abrillantador casi agotado',
    remote_start_off: 'Inicio remoto desactivado',
    offline: 'Aparato sin conexión',
    no_device: 'No se ha encontrado ningún electrodoméstico',
    ed_device_id: 'Aparato',
    ed_device_id_helper: 'Aparato de Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool o Matter',
    ed_name: 'Nombre',
    ed_name_helper: 'Déjalo vacío para usar el nombre del dispositivo',
    ed_icon: 'Icono',
    ed_show_program: 'Selector de programa',
    ed_show_controls: 'Botones de control',
    ed_show_options: 'Opciones del programa',
    ed_show_power: 'Botón de encendido',
    ed_show_energy: 'Energía del ciclo',
    ed_energy_price: 'Precio de la energía',
    ed_energy_price_helper: 'Por kWh, para el coste de un ciclo junto a su energía',
    ed_energy_price_entity: 'Sensor de precio de la energía',
    ed_energy_price_entity_helper: 'En lugar de un precio fijo: un sensor en moneda/kWh (tarifa actual, Tempo…)',
    ed_zoom: 'Botón de detalle',
    ed_zoom_helper: 'Botón arriba a la derecha que cambia la mini tarjeta a la tarjeta completa y viceversa',
    zoom_in: 'Mostrar la tarjeta completa',
    zoom_out: 'Volver a la vista compacta',
    ed_show_alerts: 'Alertas',
    ed_language: 'Idioma',
    ed_language_helper: 'Déjalo vacío para seguir el idioma de Home Assistant',
    ed_language_auto: 'Automático',
    ed_entities: 'Entidades (avanzado)',
    ed_entities_helper: 'Se detectan automáticamente a partir del dispositivo; indica una solo para sustituirla',
    en_operation_state: 'Estado de funcionamiento',
    en_door: 'Puerta',
    en_progress: 'Progreso',
    en_finish_time: 'Hora de finalización',
    en_selected_program: 'Programa seleccionado',
    en_active_program: 'Programa activo',
    en_power: 'Encendido/apagado',
    en_energy: 'Energía',
    en_stop: 'Detener programa',
    en_pause: 'Pausar programa',
    en_resume: 'Reanudar programa',
    en_remote_start: 'Inicio remoto',
    en_remote_control: 'Control remoto',
    en_connectivity: 'Conectividad',
    en_salt: 'Sal casi agotada',
    en_rinse_aid: 'Abrillantador casi agotado',
  },
  sr: {
    dishwasher: 'Машина за судове',
    washer: 'Машина за веш',
    dryer: 'Машина за сушење веша',
    washer_dryer: 'Машина за прање и сушење',
    oven: 'Рерна',
    microwave: 'Микроталасна',
    hob: 'Плоча за кување',
    coffee_maker: 'Апарат за кафу',
    hood: 'Аспиратор',
    fridge: 'Фрижидер',
    freezer: 'Замрзивач',
    wine_cooler: 'Витрина за вино',
    styler: 'Styler',
    st_run_hood: 'Вентилација',
    st_run_hob: 'Кување',
    st_run_fridge: 'Супер хлађење',
    st_run_freezer: 'Супер замрзавање',
    light_on: 'Светло укључено',
    bean_container: 'Посуда за зрна празна',
    water_tank: 'Резервоар за воду празан',
    drip_tray: 'Посуда за капање пуна',
    ed_kind: 'Врста уређаја',
    ed_kind_helper: 'Оставите празно да се препозна са уређаја',
    ed_brand: 'Бренд',
    ed_brand_helper: 'Ознака и боја дугмади, када интеграција не даје бренд (Maytag или KitchenAid преко Whirlpool)',
    st_inactive: 'Неактивно',
    st_ready: 'Спремно',
    st_delayedstart: 'Одложени старт',
    st_run: 'Ради',
    st_pause: 'Паузирано',
    st_actionrequired: 'Потребна радња',
    st_finished: 'Завршено',
    st_error: 'Грешка',
    st_aborting: 'Прекидање',
    st_off: 'Искључено',
    st_unavailable: 'Недоступно',
    door_open: 'Врата отворена',
    door_closed: 'Врата затворена',
    door_locked: 'Врата закључана',
    door_waiting: 'Завршено {t}, врата још затворена',
    cycle_energy: 'Овај циклус: {e}',
    last_cycle_energy: 'Последњи циклус: {e}',
    program: 'Програм',
    no_program: 'Нема програма',
    ends_at: 'Завршава се у',
    remaining: 'још {t}',
    start: 'Покрени',
    stop: 'Заустави',
    confirm: 'Потврдити?',
    pause: 'Паузирај',
    resume: 'Настави',
    power: 'Укључи / искључи',
    options: 'Опције',
    options_not_loaded: 'Опције за овај програм нису учитане',
    reload_options: 'Учитај опције',
    options_local: 'Подешава се на уређају: опције нису доступне',
    starting: 'Покретање…',
    start_rejected: 'Уређај је одбио покретање. Проверите врата и даљинско покретање, па покушајте поново.',
    start_failed: 'Програм није могао да се покрене.',
    reload_failed: 'Опције нису могле да се учитају. Покушајте поново за тренутак.',
    restore_failed: 'Првобитни програм није могао да се врати: проверите га на уређају.',
    power_off_unsupported: 'Овај уређај не може да се искључи даљински.',
    power_failed: 'Уређај није одговорио на команду за укључивање / искључивање.',
    command_failed: 'Уређај је одбио команду. Покушајте поново за тренутак.',
    option_failed: 'Опција није могла да се промени. Покушајте поново за тренутак.',
    salt: 'Со скоро потрошена',
    rinse_aid: 'Средство за испирање скоро потрошено',
    remote_start_off: 'Даљинско покретање искључено',
    offline: 'Уређај ван мреже',
    no_device: 'Није пронађен ниједан кућни апарат',
    ed_device_id: 'Уређај',
    ed_device_id_helper: 'Уређај из Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool или Matter',
    ed_name: 'Назив',
    ed_name_helper: 'Оставите празно за назив уређаја',
    ed_icon: 'Икона',
    ed_show_program: 'Избор програма',
    ed_show_controls: 'Дугмад за контролу',
    ed_show_options: 'Опције програма',
    ed_show_power: 'Дугме за укључивање / искључивање',
    ed_show_energy: 'Енергија циклуса',
    ed_energy_price: 'Цена енергије',
    ed_energy_price_helper: 'По kWh, за цену циклуса поред његове енергије',
    ed_energy_price_entity: 'Сензор цене енергије',
    ed_energy_price_entity_helper: 'Уместо фиксне цене: сензор у валути/kWh (тренутна тарифа, Tempo…)',
    ed_zoom: 'Дугме за детаље',
    ed_zoom_helper: 'Дугме у горњем десном углу које пребацује мини картицу на пун приказ и назад',
    zoom_in: 'Прикажи целу картицу',
    zoom_out: 'Назад на компактни приказ',
    ed_show_alerts: 'Упозорења',
    ed_language: 'Језик',
    ed_language_helper: 'Оставите празно да бисте пратили језик Home Assistant-а',
    ed_language_auto: 'Аутоматски',
    ed_entities: 'Ентитети (напредно)',
    ed_entities_helper: 'Аутоматски препознати на основу уређаја; попуните само да бисте заменили ентитет',
    en_operation_state: 'Радно стање',
    en_door: 'Врата',
    en_progress: 'Напредак',
    en_finish_time: 'Време завршетка',
    en_selected_program: 'Изабрани програм',
    en_active_program: 'Активни програм',
    en_power: 'Напајање',
    en_energy: 'Енергија',
    en_stop: 'Заустави програм',
    en_pause: 'Паузирај програм',
    en_resume: 'Настави програм',
    en_remote_start: 'Даљинско покретање',
    en_remote_control: 'Даљинско управљање',
    en_connectivity: 'Повезаност',
    en_salt: 'Со скоро потрошена',
    en_rinse_aid: 'Средство за испирање скоро потрошено',
  },
  'sr-Latn': {
    dishwasher: 'Mašina za sudove',
    washer: 'Mašina za veš',
    dryer: 'Mašina za sušenje veša',
    washer_dryer: 'Mašina za pranje i sušenje',
    oven: 'Rerna',
    microwave: 'Mikrotalasna',
    hob: 'Ploča za kuvanje',
    coffee_maker: 'Aparat za kafu',
    hood: 'Aspirator',
    fridge: 'Frižider',
    freezer: 'Zamrzivač',
    wine_cooler: 'Vitrina za vino',
    styler: 'Styler',
    st_run_hood: 'Ventilacija',
    st_run_hob: 'Kuvanje',
    st_run_fridge: 'Super hlađenje',
    st_run_freezer: 'Super zamrzavanje',
    light_on: 'Svetlo uključeno',
    bean_container: 'Posuda za zrna prazna',
    water_tank: 'Rezervoar za vodu prazan',
    drip_tray: 'Posuda za kapanje puna',
    ed_kind: 'Vrsta uređaja',
    ed_kind_helper: 'Ostavite prazno da se prepozna sa uređaja',
    ed_brand: 'Brend',
    ed_brand_helper: 'Oznaka i boja dugmadi, kada integracija ne daje brend (Maytag ili KitchenAid preko Whirlpool)',
    st_inactive: 'Neaktivno',
    st_ready: 'Spremno',
    st_delayedstart: 'Odloženi start',
    st_run: 'Radi',
    st_pause: 'Pauzirano',
    st_actionrequired: 'Potrebna radnja',
    st_finished: 'Završeno',
    st_error: 'Greška',
    st_aborting: 'Prekidanje',
    st_off: 'Isključeno',
    st_unavailable: 'Nedostupno',
    door_open: 'Vrata otvorena',
    door_closed: 'Vrata zatvorena',
    door_locked: 'Vrata zaključana',
    door_waiting: 'Završeno {t}, vrata još zatvorena',
    cycle_energy: 'Ovaj ciklus: {e}',
    last_cycle_energy: 'Poslednji ciklus: {e}',
    program: 'Program',
    no_program: 'Nema programa',
    ends_at: 'Završava se u',
    remaining: 'još {t}',
    start: 'Pokreni',
    stop: 'Zaustavi',
    confirm: 'Potvrditi?',
    pause: 'Pauziraj',
    resume: 'Nastavi',
    power: 'Uključi / isključi',
    options: 'Opcije',
    options_not_loaded: 'Opcije za ovaj program nisu učitane',
    reload_options: 'Učitaj opcije',
    options_local: 'Podešava se na uređaju: opcije nisu dostupne',
    starting: 'Pokretanje…',
    start_rejected: 'Uređaj je odbio pokretanje. Proverite vrata i daljinsko pokretanje, pa pokušajte ponovo.',
    start_failed: 'Program nije mogao da se pokrene.',
    reload_failed: 'Opcije nisu mogle da se učitaju. Pokušajte ponovo za trenutak.',
    restore_failed: 'Prvobitni program nije mogao da se vrati: proverite ga na uređaju.',
    power_off_unsupported: 'Ovaj uređaj ne može da se isključi daljinski.',
    power_failed: 'Uređaj nije odgovorio na komandu za uključivanje / isključivanje.',
    command_failed: 'Uređaj je odbio komandu. Pokušajte ponovo za trenutak.',
    option_failed: 'Opcija nije mogla da se promeni. Pokušajte ponovo za trenutak.',
    salt: 'So skoro potrošena',
    rinse_aid: 'Sredstvo za ispiranje skoro potrošeno',
    remote_start_off: 'Daljinsko pokretanje isključeno',
    offline: 'Uređaj van mreže',
    no_device: 'Nije pronađen nijedan kućni aparat',
    ed_device_id: 'Uređaj',
    ed_device_id_helper: 'Uređaj iz Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool ili Matter',
    ed_name: 'Naziv',
    ed_name_helper: 'Ostavite prazno za naziv uređaja',
    ed_icon: 'Ikona',
    ed_show_program: 'Izbor programa',
    ed_show_controls: 'Dugmad za kontrolu',
    ed_show_options: 'Opcije programa',
    ed_show_power: 'Dugme za uključivanje / isključivanje',
    ed_show_energy: 'Energija ciklusa',
    ed_energy_price: 'Cena energije',
    ed_energy_price_helper: 'Po kWh, za cenu ciklusa pored njegove energije',
    ed_energy_price_entity: 'Senzor cene energije',
    ed_energy_price_entity_helper: 'Umesto fiksne cene: senzor u valuti/kWh (trenutna tarifa, Tempo…)',
    ed_zoom: 'Dugme za detalje',
    ed_zoom_helper: 'Dugme u gornjem desnom uglu koje prebacuje mini karticu na pun prikaz i nazad',
    zoom_in: 'Prikaži celu karticu',
    zoom_out: 'Nazad na kompaktni prikaz',
    ed_show_alerts: 'Upozorenja',
    ed_language: 'Jezik',
    ed_language_helper: 'Ostavite prazno da biste pratili jezik Home Assistant-a',
    ed_language_auto: 'Automatski',
    ed_entities: 'Entiteti (napredno)',
    ed_entities_helper: 'Automatski prepoznati na osnovu uređaja; popunite samo da biste zamenili entitet',
    en_operation_state: 'Radno stanje',
    en_door: 'Vrata',
    en_progress: 'Napredak',
    en_finish_time: 'Vreme završetka',
    en_selected_program: 'Izabrani program',
    en_active_program: 'Aktivni program',
    en_power: 'Napajanje',
    en_energy: 'Energija',
    en_stop: 'Zaustavi program',
    en_pause: 'Pauziraj program',
    en_resume: 'Nastavi program',
    en_remote_start: 'Daljinsko pokretanje',
    en_remote_control: 'Daljinsko upravljanje',
    en_connectivity: 'Povezanost',
    en_salt: 'So skoro potrošena',
    en_rinse_aid: 'Sredstvo za ispiranje skoro potrošeno',
  },
  it: {
    dishwasher: 'Lavastoviglie',
    washer: 'Lavatrice',
    dryer: 'Asciugatrice',
    washer_dryer: 'Lavasciuga',
    oven: 'Forno',
    microwave: 'Microonde',
    hob: 'Piano cottura',
    coffee_maker: 'Macchina da caffè',
    hood: 'Cappa',
    fridge: 'Frigorifero',
    freezer: 'Congelatore',
    wine_cooler: 'Cantinetta',
    styler: 'Styler',
    st_run_hood: 'Aspirazione',
    st_run_hob: 'Cottura',
    st_run_fridge: 'Super raffreddamento',
    st_run_freezer: 'Super congelamento',
    light_on: 'Luce accesa',
    bean_container: 'Contenitore caffè in grani vuoto',
    water_tank: 'Serbatoio dell\'acqua vuoto',
    drip_tray: 'Vaschetta raccogligocce piena',
    ed_kind: 'Tipo di apparecchio',
    ed_kind_helper: 'Lasciare vuoto per rilevarlo dall\'apparecchio',
    ed_brand: 'Marca',
    ed_brand_helper: 'Badge e colore dei pulsanti, quando l\'integrazione non indica la marca (Maytag o KitchenAid tramite Whirlpool)',
    st_inactive: 'Inattivo',
    st_ready: 'Pronto',
    st_delayedstart: 'Avvio ritardato',
    st_run: 'In funzione',
    st_pause: 'In pausa',
    st_actionrequired: 'Azione richiesta',
    st_finished: 'Terminato',
    st_error: 'Errore',
    st_aborting: 'Annullamento',
    st_off: 'Spento',
    st_unavailable: 'Non disponibile',
    door_open: 'Sportello aperto',
    door_closed: 'Sportello chiuso',
    door_locked: 'Sportello bloccato',
    door_waiting: 'Terminato {t}, sportello ancora chiuso',
    cycle_energy: 'Questo ciclo: {e}',
    last_cycle_energy: 'Ultimo ciclo: {e}',
    program: 'Programma',
    no_program: 'Nessun programma',
    ends_at: 'Fine alle',
    remaining: 'ancora {t}',
    start: 'Avvia',
    stop: 'Arresta',
    confirm: 'Confermare?',
    pause: 'Pausa',
    resume: 'Riprendi',
    power: 'Accensione / spegnimento',
    options: 'Opzioni',
    options_not_loaded: 'Opzioni non caricate per questo programma',
    reload_options: 'Carica opzioni',
    options_local: 'Impostazione in corso sull\'apparecchio: opzioni non disponibili',
    starting: 'Avvio…',
    start_rejected: 'L\'apparecchio ha rifiutato l\'avvio. Controlla lo sportello e l\'avvio remoto, poi riprova.',
    start_failed: 'Impossibile avviare il programma.',
    reload_failed: 'Impossibile caricare le opzioni. Riprova tra un momento.',
    restore_failed: 'Impossibile ripristinare il programma originale: controllalo sull\'apparecchio.',
    power_off_unsupported: 'Questo apparecchio non può essere spento da remoto.',
    power_failed: 'L\'apparecchio non ha risposto al comando di accensione / spegnimento.',
    command_failed: 'L\'apparecchio ha rifiutato il comando. Riprova tra un momento.',
    option_failed: 'Impossibile modificare l\'opzione. Riprova tra un momento.',
    salt: 'Sale quasi esaurito',
    rinse_aid: 'Brillantante quasi esaurito',
    remote_start_off: 'Avvio remoto disattivato',
    offline: 'Apparecchio offline',
    no_device: 'Nessun elettrodomestico trovato',
    ed_device_id: 'Apparecchio',
    ed_device_id_helper: 'Apparecchio di Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool o Matter',
    ed_name: 'Nome',
    ed_name_helper: 'Lascia vuoto per usare il nome del dispositivo',
    ed_icon: 'Icona',
    ed_show_program: 'Selettore del programma',
    ed_show_controls: 'Pulsanti di comando',
    ed_show_options: 'Opzioni del programma',
    ed_show_power: 'Pulsante di accensione',
    ed_show_energy: 'Energia del ciclo',
    ed_energy_price: 'Prezzo dell\'energia',
    ed_energy_price_helper: 'Per kWh, per il costo di un ciclo accanto alla sua energia',
    ed_energy_price_entity: 'Sensore del prezzo dell\'energia',
    ed_energy_price_entity_helper: 'Invece di un prezzo fisso: un sensore in valuta/kWh (tariffa attuale, Tempo…)',
    ed_zoom: 'Pulsante dettaglio',
    ed_zoom_helper: 'Pulsante in alto a destra che passa dalla mini scheda alla scheda completa e viceversa',
    zoom_in: 'Mostra la scheda completa',
    zoom_out: 'Torna alla vista compatta',
    ed_show_alerts: 'Avvisi',
    ed_language: 'Lingua',
    ed_language_helper: 'Lascia vuoto per seguire la lingua di Home Assistant',
    ed_language_auto: 'Automatica',
    ed_entities: 'Entità (avanzate)',
    ed_entities_helper: 'Rilevate automaticamente dal dispositivo; impostane una solo per sostituirla',
    en_operation_state: 'Stato di funzionamento',
    en_door: 'Sportello',
    en_progress: 'Avanzamento',
    en_finish_time: 'Ora di fine',
    en_selected_program: 'Programma selezionato',
    en_active_program: 'Programma attivo',
    en_power: 'Alimentazione',
    en_energy: 'Energia',
    en_stop: 'Arresta programma',
    en_pause: 'Metti in pausa il programma',
    en_resume: 'Riprendi programma',
    en_remote_start: 'Avvio remoto',
    en_remote_control: 'Controllo remoto',
    en_connectivity: 'Connettività',
    en_salt: 'Sale quasi esaurito',
    en_rinse_aid: 'Brillantante quasi esaurito',
  },
  nl: {
    dishwasher: 'Vaatwasser',
    washer: 'Wasmachine',
    dryer: 'Wasdroger',
    washer_dryer: 'Was-droogcombinatie',
    oven: 'Oven',
    microwave: 'Magnetron',
    hob: 'Kookplaat',
    coffee_maker: 'Koffiemachine',
    hood: 'Afzuigkap',
    fridge: 'Koelkast',
    freezer: 'Vriezer',
    wine_cooler: 'Wijnklimaatkast',
    styler: 'Styler',
    st_run_hood: 'Afzuigen',
    st_run_hob: 'Koken',
    st_run_fridge: 'Supercool',
    st_run_freezer: 'Supervries',
    light_on: 'Licht aan',
    bean_container: 'Bonenreservoir leeg',
    water_tank: 'Waterreservoir leeg',
    drip_tray: 'Lekbak vol',
    ed_kind: 'Apparaattype',
    ed_kind_helper: 'Leeg laten om het van het apparaat af te leiden',
    ed_brand: 'Merk',
    ed_brand_helper: 'Badge en knopkleur, als de integratie het merk niet geeft (Maytag of KitchenAid via Whirlpool)',
    st_inactive: 'Inactief',
    st_ready: 'Gereed',
    st_delayedstart: 'Uitgestelde start',
    st_run: 'Bezig',
    st_pause: 'Gepauzeerd',
    st_actionrequired: 'Actie vereist',
    st_finished: 'Klaar',
    st_error: 'Fout',
    st_aborting: 'Wordt afgebroken',
    st_off: 'Uit',
    st_unavailable: 'Niet beschikbaar',
    door_open: 'Deur open',
    door_closed: 'Deur dicht',
    door_locked: 'Deur vergrendeld',
    door_waiting: 'Klaar {t}, deur nog dicht',
    cycle_energy: 'Deze cyclus: {e}',
    last_cycle_energy: 'Vorige cyclus: {e}',
    program: 'Programma',
    no_program: 'Geen programma',
    ends_at: 'Klaar om',
    remaining: 'nog {t}',
    start: 'Starten',
    stop: 'Stoppen',
    confirm: 'Bevestigen?',
    pause: 'Pauzeren',
    resume: 'Hervatten',
    power: 'Aan / uit',
    options: 'Opties',
    options_not_loaded: 'Opties niet geladen voor dit programma',
    reload_options: 'Opties laden',
    options_local: 'Wordt op het apparaat ingesteld: opties niet beschikbaar',
    starting: 'Starten…',
    start_rejected: 'Het apparaat weigerde te starten. Controleer de deur en de afstandsstart en probeer het opnieuw.',
    start_failed: 'Het programma kon niet starten.',
    reload_failed: 'De opties konden niet worden geladen. Probeer het zo opnieuw.',
    restore_failed: 'Het oorspronkelijke programma kon niet worden hersteld: controleer het op het apparaat.',
    power_off_unsupported: 'Dit apparaat kan niet op afstand worden uitgeschakeld.',
    power_failed: 'Het apparaat reageerde niet op het aan/uit-commando.',
    command_failed: 'Het apparaat weigerde het commando. Probeer het zo opnieuw.',
    option_failed: 'De optie kon niet worden gewijzigd. Probeer het zo opnieuw.',
    salt: 'Zout bijna op',
    rinse_aid: 'Glansspoelmiddel bijna op',
    remote_start_off: 'Afstandsstart uitgeschakeld',
    offline: 'Apparaat offline',
    no_device: 'Geen huishoudapparaat gevonden',
    ed_device_id: 'Apparaat',
    ed_device_id_helper: 'Apparaat uit Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool of Matter',
    ed_name: 'Naam',
    ed_name_helper: 'Leeg laten om de apparaatnaam te gebruiken',
    ed_icon: 'Pictogram',
    ed_show_program: 'Programmakeuze',
    ed_show_controls: 'Bedieningsknoppen',
    ed_show_options: 'Programma-opties',
    ed_show_power: 'Aan/uit-knop',
    ed_show_energy: 'Energie per cyclus',
    ed_energy_price: 'Energieprijs',
    ed_energy_price_helper: 'Per kWh, voor de kosten van een cyclus naast de energie',
    ed_energy_price_entity: 'Energieprijssensor',
    ed_energy_price_entity_helper: 'In plaats van een vaste prijs: een sensor in valuta/kWh (huidig tarief, Tempo…)',
    ed_zoom: 'Detailknop',
    ed_zoom_helper: 'Knop rechtsboven die de minikaart omschakelt naar de volledige kaart en terug',
    zoom_in: 'Volledige kaart tonen',
    zoom_out: 'Terug naar de compacte weergave',
    ed_show_alerts: 'Waarschuwingen',
    ed_language: 'Taal',
    ed_language_helper: 'Leeg laten om de taal van Home Assistant te volgen',
    ed_language_auto: 'Automatisch',
    ed_entities: 'Entiteiten (geavanceerd)',
    ed_entities_helper: 'Automatisch gedetecteerd via het apparaat; stel er alleen een in om deze te overschrijven',
    en_operation_state: 'Bedrijfsstatus',
    en_door: 'Deur',
    en_progress: 'Voortgang',
    en_finish_time: 'Eindtijd',
    en_selected_program: 'Geselecteerd programma',
    en_active_program: 'Actief programma',
    en_power: 'Aan/uit',
    en_energy: 'Energie',
    en_stop: 'Programma stoppen',
    en_pause: 'Programma pauzeren',
    en_resume: 'Programma hervatten',
    en_remote_start: 'Afstandsstart',
    en_remote_control: 'Bediening op afstand',
    en_connectivity: 'Connectiviteit',
    en_salt: 'Zout bijna op',
    en_rinse_aid: 'Glansspoelmiddel bijna op',
  },
  pt: {
    dishwasher: 'Máquina de lavar loiça',
    washer: 'Máquina de lavar roupa',
    dryer: 'Máquina de secar roupa',
    washer_dryer: 'Máquina de lavar e secar',
    oven: 'Forno',
    microwave: 'Micro-ondas',
    hob: 'Placa',
    coffee_maker: 'Máquina de café',
    hood: 'Exaustor',
    fridge: 'Frigorífico',
    freezer: 'Congelador',
    wine_cooler: 'Garrafeira',
    styler: 'Styler',
    st_run_hood: 'Exaustão',
    st_run_hob: 'A cozinhar',
    st_run_fridge: 'Super refrigeração',
    st_run_freezer: 'Super congelação',
    light_on: 'Luz acesa',
    bean_container: 'Depósito de grãos vazio',
    water_tank: 'Depósito de água vazio',
    drip_tray: 'Tabuleiro de pingos cheio',
    ed_kind: 'Tipo de aparelho',
    ed_kind_helper: 'Deixar vazio para o detetar a partir do aparelho',
    ed_brand: 'Marca',
    ed_brand_helper: 'Emblema e cor dos botões, quando a integração não indica a marca (Maytag ou KitchenAid através da Whirlpool)',
    st_inactive: 'Inativo',
    st_ready: 'Pronto',
    st_delayedstart: 'Início diferido',
    st_run: 'A funcionar',
    st_pause: 'Em pausa',
    st_actionrequired: 'Ação necessária',
    st_finished: 'Concluído',
    st_error: 'Erro',
    st_aborting: 'A cancelar',
    st_off: 'Desligado',
    st_unavailable: 'Indisponível',
    door_open: 'Porta aberta',
    door_closed: 'Porta fechada',
    door_locked: 'Porta bloqueada',
    door_waiting: 'Concluído {t}, porta ainda fechada',
    cycle_energy: 'Este ciclo: {e}',
    last_cycle_energy: 'Último ciclo: {e}',
    program: 'Programa',
    no_program: 'Nenhum programa',
    ends_at: 'Fim às',
    remaining: 'faltam {t}',
    start: 'Iniciar',
    stop: 'Parar',
    confirm: 'Confirmar?',
    pause: 'Pausa',
    resume: 'Retomar',
    power: 'Ligar / desligar',
    options: 'Opções',
    options_not_loaded: 'Opções não carregadas para este programa',
    reload_options: 'Carregar opções',
    options_local: 'A ser definido no aparelho: opções indisponíveis',
    starting: 'A iniciar…',
    start_rejected: 'O aparelho recusou o início. Verifique a porta e o início remoto e tente novamente.',
    start_failed: 'Não foi possível iniciar o programa.',
    reload_failed: 'Não foi possível carregar as opções. Tente novamente dentro de momentos.',
    restore_failed: 'Não foi possível repor o programa original: verifique-o no aparelho.',
    power_off_unsupported: 'Este aparelho não pode ser desligado remotamente.',
    power_failed: 'O aparelho não respondeu ao comando de ligar / desligar.',
    command_failed: 'O aparelho recusou o comando. Tente novamente dentro de momentos.',
    option_failed: 'Não foi possível alterar a opção. Tente novamente dentro de momentos.',
    salt: 'Sal quase esgotado',
    rinse_aid: 'Abrilhantador quase esgotado',
    remote_start_off: 'Início remoto desativado',
    offline: 'Aparelho offline',
    no_device: 'Nenhum eletrodoméstico encontrado',
    ed_device_id: 'Aparelho',
    ed_device_id_helper: 'Aparelho do Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool ou Matter',
    ed_name: 'Nome',
    ed_name_helper: 'Deixe vazio para usar o nome do dispositivo',
    ed_icon: 'Ícone',
    ed_show_program: 'Seletor de programa',
    ed_show_controls: 'Botões de comando',
    ed_show_options: 'Opções do programa',
    ed_show_power: 'Botão ligar / desligar',
    ed_show_energy: 'Energia do ciclo',
    ed_energy_price: 'Preço da energia',
    ed_energy_price_helper: 'Por kWh, para o custo de um ciclo ao lado da sua energia',
    ed_energy_price_entity: 'Sensor de preço da energia',
    ed_energy_price_entity_helper: 'Em vez de um preço fixo: um sensor em moeda/kWh (tarifa atual, Tempo…)',
    ed_zoom: 'Botão de detalhe',
    ed_zoom_helper: 'Botão no canto superior direito que alterna entre o mini cartão e o cartão completo',
    zoom_in: 'Mostrar o cartão completo',
    zoom_out: 'Voltar à vista compacta',
    ed_show_alerts: 'Alertas',
    ed_language: 'Idioma',
    ed_language_helper: 'Deixe vazio para seguir o idioma do Home Assistant',
    ed_language_auto: 'Automático',
    ed_entities: 'Entidades (avançado)',
    ed_entities_helper: 'Detetadas automaticamente a partir do dispositivo; defina uma apenas para a substituir',
    en_operation_state: 'Estado de funcionamento',
    en_door: 'Porta',
    en_progress: 'Progresso',
    en_finish_time: 'Hora de fim',
    en_selected_program: 'Programa selecionado',
    en_active_program: 'Programa ativo',
    en_power: 'Alimentação',
    en_energy: 'Energia',
    en_stop: 'Parar programa',
    en_pause: 'Pausar programa',
    en_resume: 'Retomar programa',
    en_remote_start: 'Início remoto',
    en_remote_control: 'Controlo remoto',
    en_connectivity: 'Conectividade',
    en_salt: 'Sal quase esgotado',
    en_rinse_aid: 'Abrilhantador quase esgotado',
  },
  pl: {
    dishwasher: 'Zmywarka',
    washer: 'Pralka',
    dryer: 'Suszarka',
    washer_dryer: 'Pralko-suszarka',
    oven: 'Piekarnik',
    microwave: 'Kuchenka mikrofalowa',
    hob: 'Płyta grzewcza',
    coffee_maker: 'Ekspres do kawy',
    hood: 'Okap',
    fridge: 'Lodówka',
    freezer: 'Zamrażarka',
    wine_cooler: 'Chłodziarka do wina',
    styler: 'Styler',
    st_run_hood: 'Wentylacja',
    st_run_hob: 'Gotowanie',
    st_run_fridge: 'Super chłodzenie',
    st_run_freezer: 'Super zamrażanie',
    light_on: 'Światło włączone',
    bean_container: 'Pojemnik na ziarna pusty',
    water_tank: 'Zbiornik na wodę pusty',
    drip_tray: 'Tacka ociekowa pełna',
    ed_kind: 'Typ urządzenia',
    ed_kind_helper: 'Pozostaw puste, aby wykryć go z urządzenia',
    ed_brand: 'Marka',
    ed_brand_helper: 'Odznaka i kolor przycisków, gdy integracja nie podaje marki (Maytag lub KitchenAid przez Whirlpool)',
    st_inactive: 'Nieaktywne',
    st_ready: 'Gotowe',
    st_delayedstart: 'Opóźniony start',
    st_run: 'Pracuje',
    st_pause: 'Wstrzymane',
    st_actionrequired: 'Wymagane działanie',
    st_finished: 'Zakończone',
    st_error: 'Błąd',
    st_aborting: 'Przerywanie',
    st_off: 'Wyłączone',
    st_unavailable: 'Niedostępne',
    door_open: 'Drzwi otwarte',
    door_closed: 'Drzwi zamknięte',
    door_locked: 'Drzwi zablokowane',
    door_waiting: 'Zakończone {t}, drzwi wciąż zamknięte',
    cycle_energy: 'Ten cykl: {e}',
    last_cycle_energy: 'Ostatni cykl: {e}',
    program: 'Program',
    no_program: 'Brak programu',
    ends_at: 'Koniec o',
    remaining: 'zostało {t}',
    start: 'Uruchom',
    stop: 'Zatrzymaj',
    confirm: 'Potwierdzić?',
    pause: 'Wstrzymaj',
    resume: 'Wznów',
    power: 'Włącz / wyłącz',
    options: 'Opcje',
    options_not_loaded: 'Opcje dla tego programu nie zostały wczytane',
    reload_options: 'Wczytaj opcje',
    options_local: 'Ustawianie na urządzeniu: opcje niedostępne',
    starting: 'Uruchamianie…',
    start_rejected: 'Urządzenie odmówiło uruchomienia. Sprawdź drzwi i zdalny start, a następnie spróbuj ponownie.',
    start_failed: 'Nie udało się uruchomić programu.',
    reload_failed: 'Nie udało się wczytać opcji. Spróbuj ponownie za chwilę.',
    restore_failed: 'Nie udało się przywrócić pierwotnego programu: sprawdź go na urządzeniu.',
    power_off_unsupported: 'Tego urządzenia nie można wyłączyć zdalnie.',
    power_failed: 'Urządzenie nie odpowiedziało na polecenie włączenia / wyłączenia.',
    command_failed: 'Urządzenie odrzuciło polecenie. Spróbuj ponownie za chwilę.',
    option_failed: 'Nie udało się zmienić opcji. Spróbuj ponownie za chwilę.',
    salt: 'Sól prawie się skończyła',
    rinse_aid: 'Nabłyszczacz prawie się skończył',
    remote_start_off: 'Zdalny start wyłączony',
    offline: 'Urządzenie offline',
    no_device: 'Nie znaleziono urządzenia AGD',
    ed_device_id: 'Urządzenie',
    ed_device_id_helper: 'Urządzenie z Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool lub Matter',
    ed_name: 'Nazwa',
    ed_name_helper: 'Pozostaw puste, aby użyć nazwy urządzenia',
    ed_icon: 'Ikona',
    ed_show_program: 'Wybór programu',
    ed_show_controls: 'Przyciski sterowania',
    ed_show_options: 'Opcje programu',
    ed_show_power: 'Przycisk włączania / wyłączania',
    ed_show_energy: 'Energia cyklu',
    ed_energy_price: 'Cena energii',
    ed_energy_price_helper: 'Za kWh, dla kosztu cyklu obok jego energii',
    ed_energy_price_entity: 'Czujnik ceny energii',
    ed_energy_price_entity_helper: 'Zamiast stałej ceny: czujnik w walucie/kWh (bieżąca taryfa, Tempo…)',
    ed_zoom: 'Przycisk szczegółów',
    ed_zoom_helper: 'Przycisk w prawym górnym rogu przełączający minikartę na pełną kartę i z powrotem',
    zoom_in: 'Pokaż pełną kartę',
    zoom_out: 'Wróć do widoku kompaktowego',
    ed_show_alerts: 'Alerty',
    ed_language: 'Język',
    ed_language_helper: 'Pozostaw puste, aby używać języka Home Assistanta',
    ed_language_auto: 'Automatyczny',
    ed_entities: 'Encje (zaawansowane)',
    ed_entities_helper: 'Wykrywane automatycznie na podstawie urządzenia; ustaw tylko, aby zastąpić encję',
    en_operation_state: 'Stan pracy',
    en_door: 'Drzwi',
    en_progress: 'Postęp',
    en_finish_time: 'Godzina zakończenia',
    en_selected_program: 'Wybrany program',
    en_active_program: 'Aktywny program',
    en_power: 'Zasilanie',
    en_energy: 'Energia',
    en_stop: 'Zatrzymaj program',
    en_pause: 'Wstrzymaj program',
    en_resume: 'Wznów program',
    en_remote_start: 'Zdalny start',
    en_remote_control: 'Zdalne sterowanie',
    en_connectivity: 'Łączność',
    en_salt: 'Sól prawie się skończyła',
    en_rinse_aid: 'Nabłyszczacz prawie się skończył',
  },
  ro: {
    dishwasher: 'Mașină de spălat vase',
    washer: 'Mașină de spălat rufe',
    dryer: 'Uscător de rufe',
    washer_dryer: 'Mașină de spălat cu uscător',
    oven: 'Cuptor',
    microwave: 'Cuptor cu microunde',
    hob: 'Plită',
    coffee_maker: 'Espressor',
    hood: 'Hotă',
    fridge: 'Frigider',
    freezer: 'Congelator',
    wine_cooler: 'Răcitor de vin',
    styler: 'Styler',
    st_run_hood: 'Ventilare',
    st_run_hob: 'Gătire',
    st_run_fridge: 'Super răcire',
    st_run_freezer: 'Super congelare',
    light_on: 'Lumină aprinsă',
    bean_container: 'Recipient de boabe gol',
    water_tank: 'Rezervor de apă gol',
    drip_tray: 'Tavă de scurgere plină',
    ed_kind: 'Tip de aparat',
    ed_kind_helper: 'Lăsați gol pentru a-l detecta de pe aparat',
    ed_brand: 'Marcă',
    ed_brand_helper: 'Insignă și culoarea butoanelor, când integrarea nu indică marca (Maytag sau KitchenAid prin Whirlpool)',
    st_inactive: 'Inactiv',
    st_ready: 'Pregătit',
    st_delayedstart: 'Pornire întârziată',
    st_run: 'În funcțiune',
    st_pause: 'În pauză',
    st_actionrequired: 'Acțiune necesară',
    st_finished: 'Terminat',
    st_error: 'Eroare',
    st_aborting: 'Se anulează',
    st_off: 'Oprit',
    st_unavailable: 'Indisponibil',
    door_open: 'Ușă deschisă',
    door_closed: 'Ușă închisă',
    door_locked: 'Ușă blocată',
    door_waiting: 'Terminat {t}, ușa încă închisă',
    cycle_energy: 'Ciclul acesta: {e}',
    last_cycle_energy: 'Ultimul ciclu: {e}',
    program: 'Program',
    no_program: 'Niciun program',
    ends_at: 'Se termină la',
    remaining: 'mai sunt {t}',
    start: 'Pornește',
    stop: 'Oprește',
    confirm: 'Confirmați?',
    pause: 'Pauză',
    resume: 'Reia',
    power: 'Pornire / oprire',
    options: 'Opțiuni',
    options_not_loaded: 'Opțiunile nu sunt încărcate pentru acest program',
    reload_options: 'Încarcă opțiunile',
    options_local: 'Se setează pe aparat: opțiuni indisponibile',
    starting: 'Se pornește…',
    start_rejected: 'Aparatul a refuzat pornirea. Verificați ușa și pornirea de la distanță, apoi încercați din nou.',
    start_failed: 'Programul nu a putut porni.',
    reload_failed: 'Opțiunile nu au putut fi încărcate. Încercați din nou peste câteva momente.',
    restore_failed: 'Programul inițial nu a putut fi restabilit: verificați-l pe aparat.',
    power_off_unsupported: 'Acest aparat nu poate fi oprit de la distanță.',
    power_failed: 'Aparatul nu a răspuns la comanda de pornire / oprire.',
    command_failed: 'Aparatul a refuzat comanda. Încercați din nou peste câteva momente.',
    option_failed: 'Opțiunea nu a putut fi modificată. Încercați din nou peste câteva momente.',
    salt: 'Sare aproape epuizată',
    rinse_aid: 'Agent de clătire aproape epuizat',
    remote_start_off: 'Pornire de la distanță dezactivată',
    offline: 'Aparat offline',
    no_device: 'Niciun aparat găsit',
    ed_device_id: 'Aparat',
    ed_device_id_helper: 'Aparat din Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool sau Matter',
    ed_name: 'Nume',
    ed_name_helper: 'Lăsați gol pentru a folosi numele dispozitivului',
    ed_icon: 'Pictogramă',
    ed_show_program: 'Selector de program',
    ed_show_controls: 'Butoane de comandă',
    ed_show_options: 'Opțiunile programului',
    ed_show_power: 'Buton de pornire / oprire',
    ed_show_energy: 'Energia ciclului',
    ed_energy_price: 'Prețul energiei',
    ed_energy_price_helper: 'Pe kWh, pentru costul unui ciclu lângă energia lui',
    ed_energy_price_entity: 'Senzor de preț al energiei',
    ed_energy_price_entity_helper: 'În locul unui preț fix: un senzor în monedă/kWh (tariful curent, Tempo…)',
    ed_zoom: 'Buton de detalii',
    ed_zoom_helper: 'Buton din dreapta sus care comută mini-cardul în cardul complet și înapoi',
    zoom_in: 'Afișează cardul complet',
    zoom_out: 'Înapoi la vizualizarea compactă',
    ed_show_alerts: 'Alerte',
    ed_language: 'Limbă',
    ed_language_helper: 'Lăsați gol pentru a urma limba Home Assistant',
    ed_language_auto: 'Automată',
    ed_entities: 'Entități (avansat)',
    ed_entities_helper: 'Detectate automat de pe dispozitiv; completați doar pentru a forța o entitate',
    en_operation_state: 'Stare de funcționare',
    en_door: 'Ușă',
    en_progress: 'Progres',
    en_finish_time: 'Ora de finalizare',
    en_selected_program: 'Program selectat',
    en_active_program: 'Program activ',
    en_power: 'Alimentare',
    en_energy: 'Energie',
    en_stop: 'Oprește programul',
    en_pause: 'Pune programul în pauză',
    en_resume: 'Reia programul',
    en_remote_start: 'Pornire de la distanță',
    en_remote_control: 'Control de la distanță',
    en_connectivity: 'Conectivitate',
    en_salt: 'Sare aproape epuizată',
    en_rinse_aid: 'Agent de clătire aproape epuizat',
  },
  da: {
    dishwasher: 'Opvaskemaskine',
    washer: 'Vaskemaskine',
    dryer: 'Tørretumbler',
    washer_dryer: 'Vaske-tørremaskine',
    oven: 'Ovn',
    microwave: 'Mikrobølgeovn',
    hob: 'Kogeplade',
    coffee_maker: 'Kaffemaskine',
    hood: 'Emhætte',
    fridge: 'Køleskab',
    freezer: 'Fryser',
    wine_cooler: 'Vinkøleskab',
    styler: 'Styler',
    st_run_hood: 'Udsugning',
    st_run_hob: 'Madlavning',
    st_run_fridge: 'Superkøl',
    st_run_freezer: 'Superfrys',
    light_on: 'Lys tændt',
    bean_container: 'Bønnebeholder tom',
    water_tank: 'Vandtank tom',
    drip_tray: 'Drypbakke fuld',
    ed_kind: 'Apparattype',
    ed_kind_helper: 'Lad stå tomt for at registrere den fra apparatet',
    ed_brand: 'Mærke',
    ed_brand_helper: 'Mærkat og knapfarve, når integrationen ikke angiver mærket (Maytag eller KitchenAid via Whirlpool)',
    st_inactive: 'Inaktiv',
    st_ready: 'Klar',
    st_delayedstart: 'Udskudt start',
    st_run: 'Kører',
    st_pause: 'På pause',
    st_actionrequired: 'Handling påkrævet',
    st_finished: 'Færdig',
    st_error: 'Fejl',
    st_aborting: 'Afbryder',
    st_off: 'Slukket',
    st_unavailable: 'Utilgængelig',
    door_open: 'Låge åben',
    door_closed: 'Låge lukket',
    door_locked: 'Låge låst',
    door_waiting: 'Færdig {t}, lågen stadig lukket',
    cycle_energy: 'Denne cyklus: {e}',
    last_cycle_energy: 'Sidste cyklus: {e}',
    program: 'Program',
    no_program: 'Intet program',
    ends_at: 'Færdig kl.',
    remaining: '{t} tilbage',
    start: 'Start',
    stop: 'Stop',
    confirm: 'Bekræft?',
    pause: 'Pause',
    resume: 'Genoptag',
    power: 'Tænd / sluk',
    options: 'Indstillinger',
    options_not_loaded: 'Indstillingerne for dette program er ikke indlæst',
    reload_options: 'Indlæs indstillinger',
    options_local: 'Indstilles på apparatet: indstillinger utilgængelige',
    starting: 'Starter…',
    start_rejected: 'Apparatet afviste at starte. Tjek lågen og fjernstart, og prøv derefter igen.',
    start_failed: 'Programmet kunne ikke starte.',
    reload_failed: 'Indstillingerne kunne ikke indlæses. Prøv igen om et øjeblik.',
    restore_failed: 'Det oprindelige program kunne ikke gendannes: tjek det på apparatet.',
    power_off_unsupported: 'Dette apparat kan ikke slukkes via fjernbetjening.',
    power_failed: 'Apparatet svarede ikke på tænd / sluk-kommandoen.',
    command_failed: 'Apparatet afviste kommandoen. Prøv igen om et øjeblik.',
    option_failed: 'Indstillingen kunne ikke ændres. Prøv igen om et øjeblik.',
    salt: 'Salt næsten opbrugt',
    rinse_aid: 'Afspændingsmiddel næsten opbrugt',
    remote_start_off: 'Fjernstart deaktiveret',
    offline: 'Apparat offline',
    no_device: 'Intet apparat fundet',
    ed_device_id: 'Apparat',
    ed_device_id_helper: 'Apparat fra Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool eller Matter',
    ed_name: 'Navn',
    ed_name_helper: 'Lad stå tomt for at bruge enhedens navn',
    ed_icon: 'Ikon',
    ed_show_program: 'Programvælger',
    ed_show_controls: 'Betjeningsknapper',
    ed_show_options: 'Programindstillinger',
    ed_show_power: 'Tænd/sluk-knap',
    ed_show_energy: 'Energi pr. cyklus',
    ed_energy_price: 'Energipris',
    ed_energy_price_helper: 'Pr. kWh, til en cyklus\' pris ved siden af dens energi',
    ed_energy_price_entity: 'Energiprissensor',
    ed_energy_price_entity_helper: 'I stedet for en fast pris: en sensor i valuta/kWh (aktuel tarif, Tempo…)',
    ed_zoom: 'Detaljeknap',
    ed_zoom_helper: 'Knap øverst til højre, der skifter minikortet til det fulde kort og tilbage',
    zoom_in: 'Vis det fulde kort',
    zoom_out: 'Tilbage til kompakt visning',
    ed_show_alerts: 'Advarsler',
    ed_language: 'Sprog',
    ed_language_helper: 'Lad stå tomt for at følge Home Assistants sprog',
    ed_language_auto: 'Automatisk',
    ed_entities: 'Entiteter (avanceret)',
    ed_entities_helper: 'Registreres automatisk fra enheden; angiv kun en for at tilsidesætte den',
    en_operation_state: 'Driftstilstand',
    en_door: 'Låge',
    en_progress: 'Fremskridt',
    en_finish_time: 'Sluttidspunkt',
    en_selected_program: 'Valgt program',
    en_active_program: 'Aktivt program',
    en_power: 'Strøm',
    en_energy: 'Energi',
    en_stop: 'Stop program',
    en_pause: 'Sæt program på pause',
    en_resume: 'Genoptag program',
    en_remote_start: 'Fjernstart',
    en_remote_control: 'Fjernbetjening',
    en_connectivity: 'Forbindelse',
    en_salt: 'Salt næsten opbrugt',
    en_rinse_aid: 'Afspændingsmiddel næsten opbrugt',
  },
  sv: {
    dishwasher: 'Diskmaskin',
    washer: 'Tvättmaskin',
    dryer: 'Torktumlare',
    washer_dryer: 'Tvättmaskin med torktumlare',
    oven: 'Ugn',
    microwave: 'Mikrovågsugn',
    hob: 'Häll',
    coffee_maker: 'Kaffemaskin',
    hood: 'Köksfläkt',
    fridge: 'Kylskåp',
    freezer: 'Frys',
    wine_cooler: 'Vinkyl',
    styler: 'Styler',
    st_run_hood: 'Ventilation',
    st_run_hob: 'Matlagning',
    st_run_fridge: 'Superkyl',
    st_run_freezer: 'Superfrys',
    light_on: 'Belysning på',
    bean_container: 'Bönbehållaren är tom',
    water_tank: 'Vattentanken är tom',
    drip_tray: 'Droppbrickan är full',
    ed_kind: 'Apparattyp',
    ed_kind_helper: 'Lämna tomt för att identifiera den från apparaten',
    ed_brand: 'Märke',
    ed_brand_helper: 'Märkesbricka och knappfärg, när integrationen inte anger märket (Maytag eller KitchenAid via Whirlpool)',
    st_inactive: 'Inaktiv',
    st_ready: 'Redo',
    st_delayedstart: 'Fördröjd start',
    st_run: 'Körs',
    st_pause: 'Pausad',
    st_actionrequired: 'Åtgärd krävs',
    st_finished: 'Klar',
    st_error: 'Fel',
    st_aborting: 'Avbryter',
    st_off: 'Av',
    st_unavailable: 'Otillgänglig',
    door_open: 'Luckan öppen',
    door_closed: 'Luckan stängd',
    door_locked: 'Luckan låst',
    door_waiting: 'Klar {t}, luckan fortfarande stängd',
    cycle_energy: 'Den här cykeln: {e}',
    last_cycle_energy: 'Senaste cykeln: {e}',
    program: 'Program',
    no_program: 'Inget program',
    ends_at: 'Klar kl.',
    remaining: '{t} kvar',
    start: 'Starta',
    stop: 'Stoppa',
    confirm: 'Bekräfta?',
    pause: 'Pausa',
    resume: 'Återuppta',
    power: 'På / av',
    options: 'Alternativ',
    options_not_loaded: 'Alternativen för det här programmet har inte lästs in',
    reload_options: 'Läs in alternativ',
    options_local: 'Ställs in på apparaten: alternativ otillgängliga',
    starting: 'Startar…',
    start_rejected: 'Apparaten vägrade starta. Kontrollera luckan och fjärrstart och försök sedan igen.',
    start_failed: 'Programmet kunde inte starta.',
    reload_failed: 'Alternativen kunde inte läsas in. Försök igen om en stund.',
    restore_failed: 'Det ursprungliga programmet kunde inte återställas: kontrollera det på apparaten.',
    power_off_unsupported: 'Den här apparaten kan inte stängas av på distans.',
    power_failed: 'Apparaten svarade inte på på/av-kommandot.',
    command_failed: 'Apparaten avvisade kommandot. Försök igen om en stund.',
    option_failed: 'Alternativet kunde inte ändras. Försök igen om en stund.',
    salt: 'Saltet nästan slut',
    rinse_aid: 'Spolglansen nästan slut',
    remote_start_off: 'Fjärrstart inaktiverad',
    offline: 'Apparaten offline',
    no_device: 'Ingen apparat hittades',
    ed_device_id: 'Apparat',
    ed_device_id_helper: 'Apparat från Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool eller Matter',
    ed_name: 'Namn',
    ed_name_helper: 'Lämna tomt för att använda enhetens namn',
    ed_icon: 'Ikon',
    ed_show_program: 'Programväljare',
    ed_show_controls: 'Kontrollknappar',
    ed_show_options: 'Programalternativ',
    ed_show_power: 'På/av-knapp',
    ed_show_energy: 'Energi per cykel',
    ed_energy_price: 'Energipris',
    ed_energy_price_helper: 'Per kWh, för en cykels kostnad bredvid dess energi',
    ed_energy_price_entity: 'Energiprissensor',
    ed_energy_price_entity_helper: 'I stället för ett fast pris: en sensor i valuta/kWh (aktuell taxa, Tempo…)',
    ed_zoom: 'Detaljknapp',
    ed_zoom_helper: 'Knapp uppe till höger som växlar minikortet till hela kortet och tillbaka',
    zoom_in: 'Visa hela kortet',
    zoom_out: 'Tillbaka till kompakt vy',
    ed_show_alerts: 'Varningar',
    ed_language: 'Språk',
    ed_language_helper: 'Lämna tomt för att följa Home Assistants språk',
    ed_language_auto: 'Automatiskt',
    ed_entities: 'Entiteter (avancerat)',
    ed_entities_helper: 'Identifieras automatiskt från enheten; ange bara en för att åsidosätta den',
    en_operation_state: 'Driftstatus',
    en_door: 'Lucka',
    en_progress: 'Förlopp',
    en_finish_time: 'Sluttid',
    en_selected_program: 'Valt program',
    en_active_program: 'Aktivt program',
    en_power: 'Ström',
    en_energy: 'Energi',
    en_stop: 'Stoppa program',
    en_pause: 'Pausa program',
    en_resume: 'Återuppta program',
    en_remote_start: 'Fjärrstart',
    en_remote_control: 'Fjärrstyrning',
    en_connectivity: 'Anslutning',
    en_salt: 'Saltet nästan slut',
    en_rinse_aid: 'Spolglansen nästan slut',
  },
  bg: {
    dishwasher: 'Съдомиялна машина',
    washer: 'Перална машина',
    dryer: 'Сушилня',
    washer_dryer: 'Пералня със сушилня',
    oven: 'Фурна',
    microwave: 'Микровълнова фурна',
    hob: 'Плот',
    coffee_maker: 'Кафемашина',
    hood: 'Абсорбатор',
    fridge: 'Хладилник',
    freezer: 'Фризер',
    wine_cooler: 'Охладител за вино',
    styler: 'Styler',
    st_run_hood: 'Вентилация',
    st_run_hob: 'Готвене',
    st_run_fridge: 'Супер охлаждане',
    st_run_freezer: 'Супер замразяване',
    light_on: 'Лампата свети',
    bean_container: 'Контейнерът за зърна е празен',
    water_tank: 'Резервоарът за вода е празен',
    drip_tray: 'Тавата за отцеждане е пълна',
    ed_kind: 'Тип уред',
    ed_kind_helper: 'Оставете празно, за да се разпознае от уреда',
    ed_brand: 'Марка',
    ed_brand_helper: 'Значка и цвят на бутоните, когато интеграцията не посочва марката (Maytag или KitchenAid чрез Whirlpool)',
    st_inactive: 'Неактивен',
    st_ready: 'Готов',
    st_delayedstart: 'Отложен старт',
    st_run: 'Работи',
    st_pause: 'На пауза',
    st_actionrequired: 'Нужно е действие',
    st_finished: 'Завършен',
    st_error: 'Грешка',
    st_aborting: 'Прекратяване',
    st_off: 'Изключен',
    st_unavailable: 'Недостъпен',
    door_open: 'Вратата е отворена',
    door_closed: 'Вратата е затворена',
    door_locked: 'Вратата е заключена',
    door_waiting: 'Завършен {t}, вратата още е затворена',
    cycle_energy: 'Този цикъл: {e}',
    last_cycle_energy: 'Последен цикъл: {e}',
    program: 'Програма',
    no_program: 'Няма програма',
    ends_at: 'Край в',
    remaining: 'остават {t}',
    start: 'Старт',
    stop: 'Спри',
    confirm: 'Потвърди?',
    pause: 'Пауза',
    resume: 'Продължи',
    power: 'Включване / изключване',
    options: 'Опции',
    options_not_loaded: 'Опциите за тази програма не са заредени',
    reload_options: 'Зареди опциите',
    options_local: 'Настройва се на уреда: опциите са недостъпни',
    starting: 'Стартиране…',
    start_rejected: 'Уредът отказа да стартира. Проверете вратата и дистанционния старт, след което опитайте отново.',
    start_failed: 'Програмата не можа да стартира.',
    reload_failed: 'Опциите не можаха да бъдат заредени. Опитайте отново след малко.',
    restore_failed: 'Първоначалната програма не можа да бъде възстановена: проверете я на уреда.',
    power_off_unsupported: 'Този уред не може да бъде изключен дистанционно.',
    power_failed: 'Уредът не отговори на командата за включване / изключване.',
    command_failed: 'Уредът отхвърли командата. Опитайте отново след малко.',
    option_failed: 'Опцията не можа да бъде променена. Опитайте отново след малко.',
    salt: 'Солта е почти свършила',
    rinse_aid: 'Препаратът за изплакване е почти свършил',
    remote_start_off: 'Дистанционният старт е изключен',
    offline: 'Уредът е офлайн',
    no_device: 'Не е намерен уред',
    ed_device_id: 'Уред',
    ed_device_id_helper: 'Уред от Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool или Matter',
    ed_name: 'Име',
    ed_name_helper: 'Оставете празно, за да се използва името на устройството',
    ed_icon: 'Икона',
    ed_show_program: 'Избор на програма',
    ed_show_controls: 'Бутони за управление',
    ed_show_options: 'Опции на програмата',
    ed_show_power: 'Бутон за включване / изключване',
    ed_show_energy: 'Енергия на цикъла',
    ed_energy_price: 'Цена на енергията',
    ed_energy_price_helper: 'За kWh, за цената на цикъла до енергията му',
    ed_energy_price_entity: 'Сензор за цена на енергията',
    ed_energy_price_entity_helper: 'Вместо фиксирана цена: сензор във валута/kWh (текуща тарифа, Tempo…)',
    ed_zoom: 'Бутон за подробности',
    ed_zoom_helper: 'Бутон горе вдясно, който превключва мини картата към пълната карта и обратно',
    zoom_in: 'Покажи пълната карта',
    zoom_out: 'Обратно към компактния изглед',
    ed_show_alerts: 'Предупреждения',
    ed_language: 'Език',
    ed_language_helper: 'Оставете празно, за да се използва езикът на Home Assistant',
    ed_language_auto: 'Автоматично',
    ed_entities: 'Обекти (разширени)',
    ed_entities_helper: 'Разпознават се автоматично от устройството; задайте обект само за да го замените',
    en_operation_state: 'Работно състояние',
    en_door: 'Врата',
    en_progress: 'Напредък',
    en_finish_time: 'Час на приключване',
    en_selected_program: 'Избрана програма',
    en_active_program: 'Активна програма',
    en_power: 'Захранване',
    en_energy: 'Енергия',
    en_stop: 'Спиране на програмата',
    en_pause: 'Пауза на програмата',
    en_resume: 'Продължаване на програмата',
    en_remote_start: 'Дистанционен старт',
    en_remote_control: 'Дистанционно управление',
    en_connectivity: 'Свързаност',
    en_salt: 'Солта е почти свършила',
    en_rinse_aid: 'Препаратът за изплакване е почти свършил',
  },
  ru: {
    dishwasher: 'Посудомоечная машина',
    washer: 'Стиральная машина',
    dryer: 'Сушильная машина',
    washer_dryer: 'Стирально-сушильная машина',
    oven: 'Духовой шкаф',
    microwave: 'Микроволновая печь',
    hob: 'Варочная панель',
    coffee_maker: 'Кофемашина',
    hood: 'Вытяжка',
    fridge: 'Холодильник',
    freezer: 'Морозильник',
    wine_cooler: 'Винный шкаф',
    styler: 'Styler',
    st_run_hood: 'Вентиляция',
    st_run_hob: 'Приготовление',
    st_run_fridge: 'Суперохлаждение',
    st_run_freezer: 'Суперзаморозка',
    light_on: 'Подсветка включена',
    bean_container: 'Контейнер для зёрен пуст',
    water_tank: 'Резервуар для воды пуст',
    drip_tray: 'Поддон для капель полон',
    ed_kind: 'Тип прибора',
    ed_kind_helper: 'Оставьте пустым, чтобы определить его по прибору',
    ed_brand: 'Марка',
    ed_brand_helper: 'Значок и цвет кнопок, если интеграция не сообщает марку (Maytag или KitchenAid через Whirlpool)',
    st_inactive: 'Неактивна',
    st_ready: 'Готова',
    st_delayedstart: 'Отсрочка старта',
    st_run: 'Работает',
    st_pause: 'Пауза',
    st_actionrequired: 'Нужно действие',
    st_finished: 'Завершено',
    st_error: 'Ошибка',
    st_aborting: 'Отмена',
    st_off: 'Выключена',
    st_unavailable: 'Недоступна',
    door_open: 'Дверца открыта',
    door_closed: 'Дверца закрыта',
    door_locked: 'Дверца заблокирована',
    door_waiting: 'Завершено {t}, дверца ещё закрыта',
    cycle_energy: 'Этот цикл: {e}',
    last_cycle_energy: 'Последний цикл: {e}',
    program: 'Программа',
    no_program: 'Нет программы',
    ends_at: 'Окончание в',
    remaining: 'осталось {t}',
    start: 'Запустить',
    stop: 'Остановить',
    confirm: 'Подтвердить?',
    pause: 'Пауза',
    resume: 'Продолжить',
    power: 'Вкл. / выкл.',
    options: 'Параметры',
    options_not_loaded: 'Параметры для этой программы не загружены',
    reload_options: 'Загрузить параметры',
    options_local: 'Настраивается на приборе: параметры недоступны',
    starting: 'Запуск…',
    start_rejected: 'Прибор отказался запускаться. Проверьте дверцу и удалённый запуск, затем повторите попытку.',
    start_failed: 'Не удалось запустить программу.',
    reload_failed: 'Не удалось загрузить параметры. Повторите попытку чуть позже.',
    restore_failed: 'Не удалось восстановить исходную программу: проверьте её на приборе.',
    power_off_unsupported: 'Этот прибор нельзя выключить удалённо.',
    power_failed: 'Прибор не ответил на команду включения / выключения.',
    command_failed: 'Прибор отклонил команду. Повторите попытку чуть позже.',
    option_failed: 'Не удалось изменить параметр. Повторите попытку чуть позже.',
    salt: 'Соль почти закончилась',
    rinse_aid: 'Ополаскиватель почти закончился',
    remote_start_off: 'Удалённый запуск отключён',
    offline: 'Прибор не в сети',
    no_device: 'Бытовой прибор не найден',
    ed_device_id: 'Прибор',
    ed_device_id_helper: 'Прибор из Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool или Matter',
    ed_name: 'Название',
    ed_name_helper: 'Оставьте пустым, чтобы использовать название устройства',
    ed_icon: 'Значок',
    ed_show_program: 'Выбор программы',
    ed_show_controls: 'Кнопки управления',
    ed_show_options: 'Параметры программы',
    ed_show_power: 'Кнопка включения / выключения',
    ed_show_energy: 'Энергия цикла',
    ed_energy_price: 'Цена энергии',
    ed_energy_price_helper: 'За кВт·ч, для стоимости цикла рядом с его энергией',
    ed_energy_price_entity: 'Датчик цены энергии',
    ed_energy_price_entity_helper: 'Вместо фиксированной цены: датчик в валюте/кВт·ч (текущий тариф, Tempo…)',
    ed_zoom: 'Кнопка подробностей',
    ed_zoom_helper: 'Кнопка в правом верхнем углу, переключающая мини-карточку на полную карточку и обратно',
    zoom_in: 'Показать полную карточку',
    zoom_out: 'Вернуться к компактному виду',
    ed_show_alerts: 'Оповещения',
    ed_language: 'Язык',
    ed_language_helper: 'Оставьте пустым, чтобы использовать язык Home Assistant',
    ed_language_auto: 'Автоматически',
    ed_entities: 'Объекты (дополнительно)',
    ed_entities_helper: 'Определяются автоматически по устройству; задавайте объект, только чтобы его переопределить',
    en_operation_state: 'Рабочее состояние',
    en_door: 'Дверца',
    en_progress: 'Ход выполнения',
    en_finish_time: 'Время окончания',
    en_selected_program: 'Выбранная программа',
    en_active_program: 'Активная программа',
    en_power: 'Питание',
    en_energy: 'Энергия',
    en_stop: 'Остановить программу',
    en_pause: 'Приостановить программу',
    en_resume: 'Продолжить программу',
    en_remote_start: 'Удалённый запуск',
    en_remote_control: 'Удалённое управление',
    en_connectivity: 'Подключение',
    en_salt: 'Соль почти закончилась',
    en_rinse_aid: 'Ополаскиватель почти закончился',
  },
  uk: {
    dishwasher: 'Посудомийна машина',
    washer: 'Пральна машина',
    dryer: 'Сушильна машина',
    washer_dryer: 'Прально-сушильна машина',
    oven: 'Духова шафа',
    microwave: 'Мікрохвильова піч',
    hob: 'Варильна поверхня',
    coffee_maker: 'Кавомашина',
    hood: 'Витяжка',
    fridge: 'Холодильник',
    freezer: 'Морозильник',
    wine_cooler: 'Винна шафа',
    styler: 'Styler',
    st_run_hood: 'Вентиляція',
    st_run_hob: 'Приготування',
    st_run_fridge: 'Суперохолодження',
    st_run_freezer: 'Суперзаморожування',
    light_on: 'Світло увімкнено',
    bean_container: 'Контейнер для зерен порожній',
    water_tank: 'Резервуар для води порожній',
    drip_tray: 'Піддон для крапель повний',
    ed_kind: 'Тип приладу',
    ed_kind_helper: 'Залиште порожнім, щоб визначити його за приладом',
    ed_brand: 'Марка',
    ed_brand_helper: 'Значок і колір кнопок, якщо інтеграція не повідомляє марку (Maytag або KitchenAid через Whirlpool)',
    st_inactive: 'Неактивна',
    st_ready: 'Готова',
    st_delayedstart: 'Відкладений пуск',
    st_run: 'Працює',
    st_pause: 'Пауза',
    st_actionrequired: 'Потрібна дія',
    st_finished: 'Завершено',
    st_error: 'Помилка',
    st_aborting: 'Скасування',
    st_off: 'Вимкнена',
    st_unavailable: 'Недоступна',
    door_open: 'Дверцята відчинені',
    door_closed: 'Дверцята зачинені',
    door_locked: 'Дверцята заблоковані',
    door_waiting: 'Завершено {t}, дверцята ще зачинені',
    cycle_energy: 'Цей цикл: {e}',
    last_cycle_energy: 'Останній цикл: {e}',
    program: 'Програма',
    no_program: 'Немає програми',
    ends_at: 'Завершення о',
    remaining: 'залишилося {t}',
    start: 'Запустити',
    stop: 'Зупинити',
    confirm: 'Підтвердити?',
    pause: 'Пауза',
    resume: 'Продовжити',
    power: 'Увімк. / вимк.',
    options: 'Параметри',
    options_not_loaded: 'Параметри для цієї програми не завантажено',
    reload_options: 'Завантажити опції',
    options_local: 'Налаштовується на приладі: параметри недоступні',
    starting: 'Запуск…',
    start_rejected: 'Прилад відмовився запускатися. Перевірте дверцята й віддалений запуск, потім спробуйте ще раз.',
    start_failed: 'Не вдалося запустити програму.',
    reload_failed: 'Не вдалося завантажити параметри. Спробуйте ще раз за мить.',
    restore_failed: 'Не вдалося відновити початкову програму: перевірте її на приладі.',
    power_off_unsupported: 'Цей прилад не можна вимкнути віддалено.',
    power_failed: 'Прилад не відповів на команду увімкнення / вимкнення.',
    command_failed: 'Прилад відхилив команду. Спробуйте ще раз за мить.',
    option_failed: 'Не вдалося змінити параметр. Спробуйте ще раз за мить.',
    salt: 'Сіль майже закінчилася',
    rinse_aid: 'Ополіскувач майже закінчився',
    remote_start_off: 'Віддалений запуск вимкнено',
    offline: 'Прилад не в мережі',
    no_device: 'Побутовий прилад не знайдено',
    ed_device_id: 'Прилад',
    ed_device_id_helper: 'Прилад із Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool або Matter',
    ed_name: 'Назва',
    ed_name_helper: 'Залиште порожнім, щоб використати назву пристрою',
    ed_icon: 'Значок',
    ed_show_program: 'Вибір програми',
    ed_show_controls: 'Кнопки керування',
    ed_show_options: 'Параметри програми',
    ed_show_power: 'Кнопка увімкнення / вимкнення',
    ed_show_energy: 'Енергія циклу',
    ed_energy_price: 'Ціна енергії',
    ed_energy_price_helper: 'За кВт·год, для вартості циклу поруч з його енергією',
    ed_energy_price_entity: 'Датчик ціни енергії',
    ed_energy_price_entity_helper: 'Замість фіксованої ціни: датчик у валюті/кВт·год (поточний тариф, Tempo…)',
    ed_zoom: 'Кнопка деталей',
    ed_zoom_helper: 'Кнопка в правому верхньому куті, що перемикає мінікартку на повну картку й назад',
    zoom_in: 'Показати повну картку',
    zoom_out: 'Повернутися до компактного вигляду',
    ed_show_alerts: 'Сповіщення',
    ed_language: 'Мова',
    ed_language_helper: 'Залиште порожнім, щоб використовувати мову Home Assistant',
    ed_language_auto: 'Автоматично',
    ed_entities: 'Сутності (додатково)',
    ed_entities_helper: 'Визначаються автоматично за пристроєм; вказуйте сутність лише для її заміни',
    en_operation_state: 'Робочий стан',
    en_door: 'Дверцята',
    en_progress: 'Перебіг',
    en_finish_time: 'Час завершення',
    en_selected_program: 'Вибрана програма',
    en_active_program: 'Активна програма',
    en_power: 'Живлення',
    en_energy: 'Енергія',
    en_stop: 'Зупинити програму',
    en_pause: 'Призупинити програму',
    en_resume: 'Продовжити програму',
    en_remote_start: 'Віддалений запуск',
    en_remote_control: 'Віддалене керування',
    en_connectivity: 'Підключення',
    en_salt: 'Сіль майже закінчилася',
    en_rinse_aid: 'Ополіскувач майже закінчився',
  },
  hu: {
    dishwasher: 'Mosogatógép',
    washer: 'Mosógép',
    dryer: 'Szárítógép',
    washer_dryer: 'Mosó-szárítógép',
    oven: 'Sütő',
    microwave: 'Mikrohullámú sütő',
    hob: 'Főzőlap',
    coffee_maker: 'Kávéfőző',
    hood: 'Páraelszívó',
    fridge: 'Hűtőszekrény',
    freezer: 'Fagyasztó',
    wine_cooler: 'Borhűtő',
    styler: 'Styler',
    st_run_hood: 'Elszívás',
    st_run_hob: 'Főzés',
    st_run_fridge: 'Szuperhűtés',
    st_run_freezer: 'Szuperfagyasztás',
    light_on: 'Világítás bekapcsolva',
    bean_container: 'A babtartály üres',
    water_tank: 'A víztartály üres',
    drip_tray: 'A csepptálca megtelt',
    ed_kind: 'Készüléktípus',
    ed_kind_helper: 'Hagyja üresen, hogy a készülékből legyen felismerve',
    ed_brand: 'Márka',
    ed_brand_helper: 'Jelvény és gombszín, ha az integráció nem adja meg a márkát (Maytag vagy KitchenAid a Whirlpoolon keresztül)',
    st_inactive: 'Inaktív',
    st_ready: 'Kész',
    st_delayedstart: 'Késleltetett indítás',
    st_run: 'Működik',
    st_pause: 'Szünetel',
    st_actionrequired: 'Művelet szükséges',
    st_finished: 'Befejezve',
    st_error: 'Hiba',
    st_aborting: 'Megszakítás',
    st_off: 'Kikapcsolva',
    st_unavailable: 'Nem elérhető',
    door_open: 'Ajtó nyitva',
    door_closed: 'Ajtó zárva',
    door_locked: 'Ajtó reteszelve',
    door_waiting: 'Befejezve {t}, az ajtó még zárva',
    cycle_energy: 'Ez a ciklus: {e}',
    last_cycle_energy: 'Előző ciklus: {e}',
    program: 'Program',
    no_program: 'Nincs program',
    ends_at: 'Befejezés:',
    remaining: 'még {t}',
    start: 'Indítás',
    stop: 'Leállítás',
    confirm: 'Megerősíti?',
    pause: 'Szünet',
    resume: 'Folytatás',
    power: 'Be / ki',
    options: 'Beállítások',
    options_not_loaded: 'A program beállításai nincsenek betöltve',
    reload_options: 'Beállítások betöltése',
    options_local: 'Beállítás folyamatban a készüléken: a beállítások nem érhetők el',
    starting: 'Indítás…',
    start_rejected: 'A készülék megtagadta az indítást. Ellenőrizze az ajtót és a távoli indítást, majd próbálja újra.',
    start_failed: 'A programot nem sikerült elindítani.',
    reload_failed: 'A beállításokat nem sikerült betölteni. Próbálja újra egy pillanat múlva.',
    restore_failed: 'Az eredeti programot nem sikerült visszaállítani: ellenőrizze a készüléken.',
    power_off_unsupported: 'Ez a készülék távolról nem kapcsolható ki.',
    power_failed: 'A készülék nem válaszolt a be- / kikapcsolási parancsra.',
    command_failed: 'A készülék elutasította a parancsot. Próbálja újra egy pillanat múlva.',
    option_failed: 'A beállítást nem sikerült módosítani. Próbálja újra egy pillanat múlva.',
    salt: 'A só majdnem elfogyott',
    rinse_aid: 'Az öblítőszer majdnem elfogyott',
    remote_start_off: 'Távoli indítás kikapcsolva',
    offline: 'A készülék offline',
    no_device: 'Nem található készülék',
    ed_device_id: 'Készülék',
    ed_device_id_helper: 'Készülék a Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool vagy Matter integrációból',
    ed_name: 'Név',
    ed_name_helper: 'Hagyja üresen az eszköz nevének használatához',
    ed_icon: 'Ikon',
    ed_show_program: 'Programválasztó',
    ed_show_controls: 'Vezérlőgombok',
    ed_show_options: 'Programbeállítások',
    ed_show_power: 'Be-/kikapcsoló gomb',
    ed_show_energy: 'Ciklus energiája',
    ed_energy_price: 'Energiaár',
    ed_energy_price_helper: 'kWh-nként, a ciklus költségéhez az energiája mellett',
    ed_energy_price_entity: 'Energiaár-érzékelő',
    ed_energy_price_entity_helper: 'Rögzített ár helyett: pénznem/kWh érzékelő (aktuális tarifa, Tempo…)',
    ed_zoom: 'Részletek gomb',
    ed_zoom_helper: 'Jobb felső sarokban lévő gomb, amely a minikártyát teljes kártyára váltja és vissza',
    zoom_in: 'Teljes kártya megjelenítése',
    zoom_out: 'Vissza a kompakt nézethez',
    ed_show_alerts: 'Figyelmeztetések',
    ed_language: 'Nyelv',
    ed_language_helper: 'Hagyja üresen a Home Assistant nyelvének követéséhez',
    ed_language_auto: 'Automatikus',
    ed_entities: 'Entitások (haladó)',
    ed_entities_helper: 'Automatikusan felismerve az eszközből; csak felülíráshoz adjon meg entitást',
    en_operation_state: 'Működési állapot',
    en_door: 'Ajtó',
    en_progress: 'Előrehaladás',
    en_finish_time: 'Befejezés ideje',
    en_selected_program: 'Kiválasztott program',
    en_active_program: 'Aktív program',
    en_power: 'Tápellátás',
    en_energy: 'Energia',
    en_stop: 'Program leállítása',
    en_pause: 'Program szüneteltetése',
    en_resume: 'Program folytatása',
    en_remote_start: 'Távoli indítás',
    en_remote_control: 'Távvezérlés',
    en_connectivity: 'Kapcsolat',
    en_salt: 'A só majdnem elfogyott',
    en_rinse_aid: 'Az öblítőszer majdnem elfogyott',
  },
  sk: {
    dishwasher: 'Umývačka riadu',
    washer: 'Práčka',
    dryer: 'Sušička',
    washer_dryer: 'Práčka so sušičkou',
    oven: 'Rúra',
    microwave: 'Mikrovlnná rúra',
    hob: 'Varná doska',
    coffee_maker: 'Kávovar',
    hood: 'Digestor',
    fridge: 'Chladnička',
    freezer: 'Mraznička',
    wine_cooler: 'Vinotéka',
    styler: 'Styler',
    st_run_hood: 'Odsávanie',
    st_run_hob: 'Varenie',
    st_run_fridge: 'Superchladenie',
    st_run_freezer: 'Supermrazenie',
    light_on: 'Osvetlenie zapnuté',
    bean_container: 'Zásobník na zrná je prázdny',
    water_tank: 'Nádržka na vodu je prázdna',
    drip_tray: 'Odkvapkávacia miska je plná',
    ed_kind: 'Typ spotrebiča',
    ed_kind_helper: 'Nechajte prázdne, ak ho chcete zistiť zo spotrebiča',
    ed_brand: 'Značka',
    ed_brand_helper: 'Odznak a farba tlačidiel, keď integrácia neuvádza značku (Maytag alebo KitchenAid cez Whirlpool)',
    st_inactive: 'Neaktívny',
    st_ready: 'Pripravený',
    st_delayedstart: 'Odložený štart',
    st_run: 'V prevádzke',
    st_pause: 'Pozastavený',
    st_actionrequired: 'Vyžaduje sa zásah',
    st_finished: 'Dokončené',
    st_error: 'Chyba',
    st_aborting: 'Prerušuje sa',
    st_off: 'Vypnutý',
    st_unavailable: 'Nedostupný',
    door_open: 'Dvierka otvorené',
    door_closed: 'Dvierka zatvorené',
    door_locked: 'Dvierka zamknuté',
    door_waiting: 'Dokončené {t}, dvierka stále zatvorené',
    cycle_energy: 'Tento cyklus: {e}',
    last_cycle_energy: 'Posledný cyklus: {e}',
    program: 'Program',
    no_program: 'Žiadny program',
    ends_at: 'Koniec o',
    remaining: 'zostáva {t}',
    start: 'Spustiť',
    stop: 'Zastaviť',
    confirm: 'Potvrdiť?',
    pause: 'Pozastaviť',
    resume: 'Pokračovať',
    power: 'Zapnúť / vypnúť',
    options: 'Možnosti',
    options_not_loaded: 'Možnosti pre tento program nie sú načítané',
    reload_options: 'Načítať možnosti',
    options_local: 'Nastavuje sa na spotrebiči: možnosti nie sú dostupné',
    starting: 'Spúšťa sa…',
    start_rejected: 'Spotrebič odmietol spustenie. Skontrolujte dvierka a diaľkové spustenie a skúste to znova.',
    start_failed: 'Program sa nepodarilo spustiť.',
    reload_failed: 'Možnosti sa nepodarilo načítať. Skúste to znova o chvíľu.',
    restore_failed: 'Pôvodný program sa nepodarilo obnoviť: skontrolujte ho na spotrebiči.',
    power_off_unsupported: 'Tento spotrebič nemožno vypnúť na diaľku.',
    power_failed: 'Spotrebič nereagoval na príkaz zapnutia / vypnutia.',
    command_failed: 'Spotrebič odmietol príkaz. Skúste to znova o chvíľu.',
    option_failed: 'Možnosť sa nepodarilo zmeniť. Skúste to znova o chvíľu.',
    salt: 'Soľ takmer minutá',
    rinse_aid: 'Leštidlo takmer minuté',
    remote_start_off: 'Diaľkové spustenie vypnuté',
    offline: 'Spotrebič je offline',
    no_device: 'Nenašiel sa žiadny spotrebič',
    ed_device_id: 'Spotrebič',
    ed_device_id_helper: 'Spotrebič z Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool alebo Matter',
    ed_name: 'Názov',
    ed_name_helper: 'Nechajte prázdne, ak chcete použiť názov zariadenia',
    ed_icon: 'Ikona',
    ed_show_program: 'Výber programu',
    ed_show_controls: 'Ovládacie tlačidlá',
    ed_show_options: 'Možnosti programu',
    ed_show_power: 'Tlačidlo zapnutia / vypnutia',
    ed_show_energy: 'Energia cyklu',
    ed_energy_price: 'Cena energie',
    ed_energy_price_helper: 'Za kWh, pre cenu cyklu vedľa jeho energie',
    ed_energy_price_entity: 'Senzor ceny energie',
    ed_energy_price_entity_helper: 'Namiesto pevnej ceny: senzor v mene/kWh (aktuálna sadzba, Tempo…)',
    ed_zoom: 'Tlačidlo podrobností',
    ed_zoom_helper: 'Tlačidlo vpravo hore, ktoré prepína minikartu na celú kartu a späť',
    zoom_in: 'Zobraziť celú kartu',
    zoom_out: 'Späť na kompaktné zobrazenie',
    ed_show_alerts: 'Upozornenia',
    ed_language: 'Jazyk',
    ed_language_helper: 'Nechajte prázdne, ak chcete používať jazyk Home Assistanta',
    ed_language_auto: 'Automaticky',
    ed_entities: 'Entity (pokročilé)',
    ed_entities_helper: 'Zisťujú sa automaticky zo zariadenia; zadajte entitu, len ak ju chcete nahradiť',
    en_operation_state: 'Prevádzkový stav',
    en_door: 'Dvierka',
    en_progress: 'Priebeh',
    en_finish_time: 'Čas dokončenia',
    en_selected_program: 'Vybraný program',
    en_active_program: 'Aktívny program',
    en_power: 'Napájanie',
    en_energy: 'Energia',
    en_stop: 'Zastaviť program',
    en_pause: 'Pozastaviť program',
    en_resume: 'Pokračovať v programe',
    en_remote_start: 'Diaľkové spustenie',
    en_remote_control: 'Diaľkové ovládanie',
    en_connectivity: 'Pripojenie',
    en_salt: 'Soľ takmer minutá',
    en_rinse_aid: 'Leštidlo takmer minuté',
  },
  cs: {
    dishwasher: 'Myčka nádobí',
    washer: 'Pračka',
    dryer: 'Sušička',
    washer_dryer: 'Pračka se sušičkou',
    oven: 'Trouba',
    microwave: 'Mikrovlnná trouba',
    hob: 'Varná deska',
    coffee_maker: 'Kávovar',
    hood: 'Digestoř',
    fridge: 'Chladnička',
    freezer: 'Mraznička',
    wine_cooler: 'Vinotéka',
    styler: 'Styler',
    st_run_hood: 'Odsávání',
    st_run_hob: 'Vaření',
    st_run_fridge: 'Superchlazení',
    st_run_freezer: 'Supermrazení',
    light_on: 'Osvětlení zapnuto',
    bean_container: 'Zásobník na zrnka je prázdný',
    water_tank: 'Nádržka na vodu je prázdná',
    drip_tray: 'Odkapávací miska je plná',
    ed_kind: 'Typ spotřebiče',
    ed_kind_helper: 'Ponechte prázdné, chcete-li ho zjistit ze spotřebiče',
    ed_brand: 'Značka',
    ed_brand_helper: 'Odznak a barva tlačítek, když integrace neuvádí značku (Maytag nebo KitchenAid přes Whirlpool)',
    st_inactive: 'Neaktivní',
    st_ready: 'Připraveno',
    st_delayedstart: 'Odložený start',
    st_run: 'V provozu',
    st_pause: 'Pozastaveno',
    st_actionrequired: 'Vyžadován zásah',
    st_finished: 'Dokončeno',
    st_error: 'Chyba',
    st_aborting: 'Přerušuje se',
    st_off: 'Vypnuto',
    st_unavailable: 'Nedostupné',
    door_open: 'Dvířka otevřena',
    door_closed: 'Dvířka zavřena',
    door_locked: 'Dvířka zamčena',
    door_waiting: 'Dokončeno {t}, dvířka stále zavřena',
    cycle_energy: 'Tento cyklus: {e}',
    last_cycle_energy: 'Poslední cyklus: {e}',
    program: 'Program',
    no_program: 'Žádný program',
    ends_at: 'Konec v',
    remaining: 'zbývá {t}',
    start: 'Spustit',
    stop: 'Zastavit',
    confirm: 'Potvrdit?',
    pause: 'Pozastavit',
    resume: 'Pokračovat',
    power: 'Zapnout / vypnout',
    options: 'Možnosti',
    options_not_loaded: 'Možnosti pro tento program nejsou načteny',
    reload_options: 'Načíst možnosti',
    options_local: 'Nastavuje se na spotřebiči: možnosti nejsou dostupné',
    starting: 'Spouštění…',
    start_rejected: 'Spotřebič odmítl spuštění. Zkontrolujte dvířka a dálkové spuštění a zkuste to znovu.',
    start_failed: 'Program se nepodařilo spustit.',
    reload_failed: 'Možnosti se nepodařilo načíst. Zkuste to znovu za chvíli.',
    restore_failed: 'Původní program se nepodařilo obnovit: zkontrolujte ho na spotřebiči.',
    power_off_unsupported: 'Tento spotřebič nelze vypnout na dálku.',
    power_failed: 'Spotřebič nereagoval na příkaz zapnutí / vypnutí.',
    command_failed: 'Spotřebič odmítl příkaz. Zkuste to znovu za chvíli.',
    option_failed: 'Možnost se nepodařilo změnit. Zkuste to znovu za chvíli.',
    salt: 'Sůl téměř došla',
    rinse_aid: 'Leštidlo téměř došlo',
    remote_start_off: 'Dálkové spuštění vypnuto',
    offline: 'Spotřebič je offline',
    no_device: 'Nebyl nalezen žádný spotřebič',
    ed_device_id: 'Spotřebič',
    ed_device_id_helper: 'Spotřebič z Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool nebo Matter',
    ed_name: 'Název',
    ed_name_helper: 'Ponechte prázdné pro použití názvu zařízení',
    ed_icon: 'Ikona',
    ed_show_program: 'Výběr programu',
    ed_show_controls: 'Ovládací tlačítka',
    ed_show_options: 'Možnosti programu',
    ed_show_power: 'Tlačítko zapnutí / vypnutí',
    ed_show_energy: 'Energie cyklu',
    ed_energy_price: 'Cena energie',
    ed_energy_price_helper: 'Za kWh, pro cenu cyklu vedle jeho energie',
    ed_energy_price_entity: 'Senzor ceny energie',
    ed_energy_price_entity_helper: 'Místo pevné ceny: senzor v měně/kWh (aktuální sazba, Tempo…)',
    ed_zoom: 'Tlačítko podrobností',
    ed_zoom_helper: 'Tlačítko vpravo nahoře, které přepíná minikartu na celou kartu a zpět',
    zoom_in: 'Zobrazit celou kartu',
    zoom_out: 'Zpět na kompaktní zobrazení',
    ed_show_alerts: 'Upozornění',
    ed_language: 'Jazyk',
    ed_language_helper: 'Ponechte prázdné pro použití jazyka Home Assistanta',
    ed_language_auto: 'Automaticky',
    ed_entities: 'Entity (pokročilé)',
    ed_entities_helper: 'Zjišťují se automaticky ze zařízení; zadejte entitu, jen pokud ji chcete nahradit',
    en_operation_state: 'Provozní stav',
    en_door: 'Dvířka',
    en_progress: 'Průběh',
    en_finish_time: 'Čas dokončení',
    en_selected_program: 'Vybraný program',
    en_active_program: 'Aktivní program',
    en_power: 'Napájení',
    en_energy: 'Energie',
    en_stop: 'Zastavit program',
    en_pause: 'Pozastavit program',
    en_resume: 'Pokračovat v programu',
    en_remote_start: 'Dálkové spuštění',
    en_remote_control: 'Dálkové ovládání',
    en_connectivity: 'Připojení',
    en_salt: 'Sůl téměř došla',
    en_rinse_aid: 'Leštidlo téměř došlo',
  },
  sl: {
    dishwasher: 'Pomivalni stroj',
    washer: 'Pralni stroj',
    dryer: 'Sušilni stroj',
    washer_dryer: 'Pralno-sušilni stroj',
    oven: 'Pečica',
    microwave: 'Mikrovalovna pečica',
    hob: 'Kuhalna plošča',
    coffee_maker: 'Kavni aparat',
    hood: 'Kuhinjska napa',
    fridge: 'Hladilnik',
    freezer: 'Zamrzovalnik',
    wine_cooler: 'Hladilnik za vino',
    styler: 'Styler',
    st_run_hood: 'Prezračevanje',
    st_run_hob: 'Kuhanje',
    st_run_fridge: 'Superhlajenje',
    st_run_freezer: 'Superzamrzovanje',
    light_on: 'Luč prižgana',
    bean_container: 'Posoda za zrna je prazna',
    water_tank: 'Rezervoar za vodo je prazen',
    drip_tray: 'Pladenj za kapljanje je poln',
    ed_kind: 'Vrsta aparata',
    ed_kind_helper: 'Pustite prazno, da se zazna iz aparata',
    ed_brand: 'Znamka',
    ed_brand_helper: 'Značka in barva gumbov, ko integracija ne navede znamke (Maytag ali KitchenAid prek Whirlpool)',
    st_inactive: 'Neaktiven',
    st_ready: 'Pripravljen',
    st_delayedstart: 'Zamik vklopa',
    st_run: 'Deluje',
    st_pause: 'Zaustavljen',
    st_actionrequired: 'Potreben je ukrep',
    st_finished: 'Končano',
    st_error: 'Napaka',
    st_aborting: 'Prekinjanje',
    st_off: 'Izklopljen',
    st_unavailable: 'Ni na voljo',
    door_open: 'Vrata odprta',
    door_closed: 'Vrata zaprta',
    door_locked: 'Vrata zaklenjena',
    door_waiting: 'Končano {t}, vrata še zaprta',
    cycle_energy: 'Ta cikel: {e}',
    last_cycle_energy: 'Zadnji cikel: {e}',
    program: 'Program',
    no_program: 'Ni programa',
    ends_at: 'Konec ob',
    remaining: 'še {t}',
    start: 'Zaženi',
    stop: 'Ustavi',
    confirm: 'Potrdite?',
    pause: 'Premor',
    resume: 'Nadaljuj',
    power: 'Vklop / izklop',
    options: 'Možnosti',
    options_not_loaded: 'Možnosti za ta program niso naložene',
    reload_options: 'Naloži možnosti',
    options_local: 'Nastavljanje na aparatu: možnosti niso na voljo',
    starting: 'Zaganjanje…',
    start_rejected: 'Aparat je zavrnil zagon. Preverite vrata in oddaljeni zagon ter poskusite znova.',
    start_failed: 'Programa ni bilo mogoče zagnati.',
    reload_failed: 'Možnosti ni bilo mogoče naložiti. Poskusite znova čez trenutek.',
    restore_failed: 'Prvotnega programa ni bilo mogoče obnoviti: preverite ga na aparatu.',
    power_off_unsupported: 'Tega aparata ni mogoče izklopiti na daljavo.',
    power_failed: 'Aparat se ni odzval na ukaz za vklop / izklop.',
    command_failed: 'Aparat je zavrnil ukaz. Poskusite znova čez trenutek.',
    option_failed: 'Možnosti ni bilo mogoče spremeniti. Poskusite znova čez trenutek.',
    salt: 'Sol je skoraj pošla',
    rinse_aid: 'Sredstvo za izpiranje je skoraj pošlo',
    remote_start_off: 'Oddaljeni zagon onemogočen',
    offline: 'Aparat ni povezan',
    no_device: 'Ni najdenega aparata',
    ed_device_id: 'Aparat',
    ed_device_id_helper: 'Aparat iz Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool ali Matter',
    ed_name: 'Ime',
    ed_name_helper: 'Pustite prazno, da se uporabi ime naprave',
    ed_icon: 'Ikona',
    ed_show_program: 'Izbira programa',
    ed_show_controls: 'Upravljalni gumbi',
    ed_show_options: 'Možnosti programa',
    ed_show_power: 'Gumb za vklop / izklop',
    ed_show_energy: 'Energija cikla',
    ed_energy_price: 'Cena energije',
    ed_energy_price_helper: 'Na kWh, za ceno cikla poleg njegove energije',
    ed_energy_price_entity: 'Senzor cene energije',
    ed_energy_price_entity_helper: 'Namesto fiksne cene: senzor v valuti/kWh (trenutna tarifa, Tempo…)',
    ed_zoom: 'Gumb za podrobnosti',
    ed_zoom_helper: 'Gumb zgoraj desno, ki preklopi mini kartico v celotno kartico in nazaj',
    zoom_in: 'Prikaži celotno kartico',
    zoom_out: 'Nazaj na strnjen pogled',
    ed_show_alerts: 'Opozorila',
    ed_language: 'Jezik',
    ed_language_helper: 'Pustite prazno, da se uporablja jezik Home Assistanta',
    ed_language_auto: 'Samodejno',
    ed_entities: 'Entitete (napredno)',
    ed_entities_helper: 'Samodejno zaznane iz naprave; nastavite jo le, če jo želite preglasiti',
    en_operation_state: 'Stanje delovanja',
    en_door: 'Vrata',
    en_progress: 'Napredek',
    en_finish_time: 'Čas zaključka',
    en_selected_program: 'Izbrani program',
    en_active_program: 'Aktivni program',
    en_power: 'Napajanje',
    en_energy: 'Energija',
    en_stop: 'Ustavi program',
    en_pause: 'Začasno ustavi program',
    en_resume: 'Nadaljuj program',
    en_remote_start: 'Oddaljeni zagon',
    en_remote_control: 'Oddaljeno upravljanje',
    en_connectivity: 'Povezljivost',
    en_salt: 'Sol je skoraj pošla',
    en_rinse_aid: 'Sredstvo za izpiranje je skoraj pošlo',
  },
  lv: {
    dishwasher: 'Trauku mazgājamā mašīna',
    washer: 'Veļas mazgājamā mašīna',
    dryer: 'Veļas žāvētājs',
    washer_dryer: 'Veļas mazgājamā mašīna ar žāvētāju',
    oven: 'Cepeškrāsns',
    microwave: 'Mikroviļņu krāsns',
    hob: 'Plīts virsma',
    coffee_maker: 'Kafijas automāts',
    hood: 'Tvaika nosūcējs',
    fridge: 'Ledusskapis',
    freezer: 'Saldētava',
    wine_cooler: 'Vīna skapis',
    styler: 'Styler',
    st_run_hood: 'Ventilācija',
    st_run_hob: 'Gatavošana',
    st_run_fridge: 'Superdzesēšana',
    st_run_freezer: 'Supersaldēšana',
    light_on: 'Gaisma ieslēgta',
    bean_container: 'Pupiņu tvertne ir tukša',
    water_tank: 'Ūdens tvertne ir tukša',
    drip_tray: 'Pilienu paplāte ir pilna',
    ed_kind: 'Ierīces veids',
    ed_kind_helper: 'Atstājiet tukšu, lai to noteiktu no ierīces',
    ed_brand: 'Zīmols',
    ed_brand_helper: 'Nozīmīte un pogu krāsa, ja integrācija nenorāda zīmolu (Maytag vai KitchenAid caur Whirlpool)',
    st_inactive: 'Neaktīva',
    st_ready: 'Gatava',
    st_delayedstart: 'Atlikta palaišana',
    st_run: 'Darbojas',
    st_pause: 'Pauzēta',
    st_actionrequired: 'Vajadzīga darbība',
    st_finished: 'Pabeigts',
    st_error: 'Kļūda',
    st_aborting: 'Pārtrauc',
    st_off: 'Izslēgta',
    st_unavailable: 'Nav pieejama',
    door_open: 'Durvis atvērtas',
    door_closed: 'Durvis aizvērtas',
    door_locked: 'Durvis bloķētas',
    door_waiting: 'Pabeigts {t}, durvis joprojām aizvērtas',
    cycle_energy: 'Šis cikls: {e}',
    last_cycle_energy: 'Pēdējais cikls: {e}',
    program: 'Programma',
    no_program: 'Nav programmas',
    ends_at: 'Beigas plkst.',
    remaining: 'atlikušas {t}',
    start: 'Sākt',
    stop: 'Apturēt',
    confirm: 'Apstiprināt?',
    pause: 'Pauze',
    resume: 'Turpināt',
    power: 'Ieslēgt / izslēgt',
    options: 'Opcijas',
    options_not_loaded: 'Šīs programmas opcijas nav ielādētas',
    reload_options: 'Ielādēt opcijas',
    options_local: 'Tiek iestatīts ierīcē: opcijas nav pieejamas',
    starting: 'Palaiž…',
    start_rejected: 'Ierīce atteicās sākt darbu. Pārbaudiet durvis un attālo palaišanu, pēc tam mēģiniet vēlreiz.',
    start_failed: 'Programmu neizdevās palaist.',
    reload_failed: 'Opcijas neizdevās ielādēt. Mēģiniet vēlreiz pēc brīža.',
    restore_failed: 'Sākotnējo programmu neizdevās atjaunot: pārbaudiet to ierīcē.',
    power_off_unsupported: 'Šo ierīci nevar izslēgt attālināti.',
    power_failed: 'Ierīce neatbildēja uz ieslēgšanas / izslēgšanas komandu.',
    command_failed: 'Ierīce noraidīja komandu. Mēģiniet vēlreiz pēc brīža.',
    option_failed: 'Opciju neizdevās mainīt. Mēģiniet vēlreiz pēc brīža.',
    salt: 'Sāls gandrīz beidzies',
    rinse_aid: 'Skalošanas līdzeklis gandrīz beidzies',
    remote_start_off: 'Attālā palaišana atspējota',
    offline: 'Ierīce bezsaistē',
    no_device: 'Nav atrasta neviena ierīce',
    ed_device_id: 'Ierīce',
    ed_device_id_helper: 'Ierīce no Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool vai Matter',
    ed_name: 'Nosaukums',
    ed_name_helper: 'Atstājiet tukšu, lai izmantotu ierīces nosaukumu',
    ed_icon: 'Ikona',
    ed_show_program: 'Programmas izvēle',
    ed_show_controls: 'Vadības pogas',
    ed_show_options: 'Programmas opcijas',
    ed_show_power: 'Ieslēgšanas / izslēgšanas poga',
    ed_show_energy: 'Cikla enerģija',
    ed_energy_price: 'Enerģijas cena',
    ed_energy_price_helper: 'Par kWh, cikla izmaksām blakus tā enerģijai',
    ed_energy_price_entity: 'Enerģijas cenas sensors',
    ed_energy_price_entity_helper: 'Fiksētas cenas vietā: sensors valūtā/kWh (pašreizējais tarifs, Tempo…)',
    ed_zoom: 'Detaļu poga',
    ed_zoom_helper: 'Poga augšējā labajā stūrī, kas pārslēdz minikarti uz pilno karti un atpakaļ',
    zoom_in: 'Rādīt pilno karti',
    zoom_out: 'Atpakaļ uz kompakto skatu',
    ed_show_alerts: 'Brīdinājumi',
    ed_language: 'Valoda',
    ed_language_helper: 'Atstājiet tukšu, lai izmantotu Home Assistant valodu',
    ed_language_auto: 'Automātiski',
    ed_entities: 'Vienības (papildu)',
    ed_entities_helper: 'Tiek noteiktas automātiski no ierīces; norādiet vienību tikai, lai to aizstātu',
    en_operation_state: 'Darbības stāvoklis',
    en_door: 'Durvis',
    en_progress: 'Progress',
    en_finish_time: 'Beigu laiks',
    en_selected_program: 'Izvēlētā programma',
    en_active_program: 'Aktīvā programma',
    en_power: 'Barošana',
    en_energy: 'Enerģija',
    en_stop: 'Apturēt programmu',
    en_pause: 'Pauzēt programmu',
    en_resume: 'Turpināt programmu',
    en_remote_start: 'Attālā palaišana',
    en_remote_control: 'Attālā vadība',
    en_connectivity: 'Savienojamība',
    en_salt: 'Sāls gandrīz beidzies',
    en_rinse_aid: 'Skalošanas līdzeklis gandrīz beidzies',
  },
  el: {
    dishwasher: 'Πλυντήριο πιάτων',
    washer: 'Πλυντήριο ρούχων',
    dryer: 'Στεγνωτήριο ρούχων',
    washer_dryer: 'Πλυντήριο-στεγνωτήριο',
    oven: 'Φούρνος',
    microwave: 'Μικροκύματα',
    hob: 'Εστίες',
    coffee_maker: 'Μηχανή καφέ',
    hood: 'Απορροφητήρας',
    fridge: 'Ψυγείο',
    freezer: 'Καταψύκτης',
    wine_cooler: 'Κάβα κρασιών',
    styler: 'Styler',
    st_run_hood: 'Απορρόφηση',
    st_run_hob: 'Μαγείρεμα',
    st_run_fridge: 'Γρήγορη ψύξη',
    st_run_freezer: 'Γρήγορη κατάψυξη',
    light_on: 'Φωτισμός αναμμένος',
    bean_container: 'Το δοχείο κόκκων είναι άδειο',
    water_tank: 'Το δοχείο νερού είναι άδειο',
    drip_tray: 'Ο δίσκος σταγόνων είναι γεμάτος',
    ed_kind: 'Τύπος συσκευής',
    ed_kind_helper: 'Αφήστε κενό για ανίχνευση από τη συσκευή',
    ed_brand: 'Μάρκα',
    ed_brand_helper: 'Σήμα και χρώμα κουμπιών, όταν η ενσωμάτωση δεν δίνει τη μάρκα (Maytag ή KitchenAid μέσω Whirlpool)',
    st_inactive: 'Ανενεργό',
    st_ready: 'Έτοιμο',
    st_delayedstart: 'Αναβολή έναρξης',
    st_run: 'Λειτουργεί',
    st_pause: 'Σε παύση',
    st_actionrequired: 'Απαιτείται ενέργεια',
    st_finished: 'Ολοκληρώθηκε',
    st_error: 'Σφάλμα',
    st_aborting: 'Ακύρωση',
    st_off: 'Απενεργοποιημένο',
    st_unavailable: 'Μη διαθέσιμο',
    door_open: 'Πόρτα ανοιχτή',
    door_closed: 'Πόρτα κλειστή',
    door_locked: 'Πόρτα κλειδωμένη',
    door_waiting: 'Ολοκληρώθηκε {t}, η πόρτα ακόμα κλειστή',
    cycle_energy: 'Αυτός ο κύκλος: {e}',
    last_cycle_energy: 'Τελευταίος κύκλος: {e}',
    program: 'Πρόγραμμα',
    no_program: 'Κανένα πρόγραμμα',
    ends_at: 'Λήξη στις',
    remaining: 'απομένουν {t}',
    start: 'Έναρξη',
    stop: 'Διακοπή',
    confirm: 'Επιβεβαίωση;',
    pause: 'Παύση',
    resume: 'Συνέχεια',
    power: 'Ενεργοποίηση / απενεργοποίηση',
    options: 'Επιλογές',
    options_not_loaded: 'Οι επιλογές για αυτό το πρόγραμμα δεν έχουν φορτωθεί',
    reload_options: 'Φόρτωση επιλογών',
    options_local: 'Ρυθμίζεται στη συσκευή: οι επιλογές δεν είναι διαθέσιμες',
    starting: 'Έναρξη…',
    start_rejected: 'Η συσκευή αρνήθηκε την έναρξη. Ελέγξτε την πόρτα και την απομακρυσμένη έναρξη και δοκιμάστε ξανά.',
    start_failed: 'Δεν ήταν δυνατή η έναρξη του προγράμματος.',
    reload_failed: 'Δεν ήταν δυνατή η φόρτωση των επιλογών. Δοκιμάστε ξανά σε λίγο.',
    restore_failed: 'Δεν ήταν δυνατή η επαναφορά του αρχικού προγράμματος: ελέγξτε το στη συσκευή.',
    power_off_unsupported: 'Αυτή η συσκευή δεν μπορεί να απενεργοποιηθεί εξ αποστάσεως.',
    power_failed: 'Η συσκευή δεν απάντησε στην εντολή ενεργοποίησης / απενεργοποίησης.',
    command_failed: 'Η συσκευή απέρριψε την εντολή. Δοκιμάστε ξανά σε λίγο.',
    option_failed: 'Δεν ήταν δυνατή η αλλαγή της επιλογής. Δοκιμάστε ξανά σε λίγο.',
    salt: 'Το αλάτι σχεδόν τελείωσε',
    rinse_aid: 'Το λαμπρυντικό σχεδόν τελείωσε',
    remote_start_off: 'Η απομακρυσμένη έναρξη είναι απενεργοποιημένη',
    offline: 'Εκτός σύνδεσης',
    no_device: 'Δεν βρέθηκε συσκευή',
    ed_device_id: 'Συσκευή',
    ed_device_id_helper: 'Συσκευή από Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool ή Matter',
    ed_name: 'Όνομα',
    ed_name_helper: 'Αφήστε κενό για χρήση του ονόματος της συσκευής',
    ed_icon: 'Εικονίδιο',
    ed_show_program: 'Επιλογέας προγράμματος',
    ed_show_controls: 'Κουμπιά ελέγχου',
    ed_show_options: 'Επιλογές προγράμματος',
    ed_show_power: 'Κουμπί ενεργοποίησης / απενεργοποίησης',
    ed_show_energy: 'Ενέργεια κύκλου',
    ed_energy_price: 'Τιμή ενέργειας',
    ed_energy_price_helper: 'Ανά kWh, για το κόστος ενός κύκλου δίπλα στην ενέργειά του',
    ed_energy_price_entity: 'Αισθητήρας τιμής ενέργειας',
    ed_energy_price_entity_helper: 'Αντί για σταθερή τιμή: αισθητήρας σε νόμισμα/kWh (τρέχον τιμολόγιο, Tempo…)',
    ed_zoom: 'Κουμπί λεπτομερειών',
    ed_zoom_helper: 'Κουμπί πάνω δεξιά που αλλάζει τη μίνι κάρτα σε πλήρη κάρτα και αντίστροφα',
    zoom_in: 'Εμφάνιση πλήρους κάρτας',
    zoom_out: 'Επιστροφή στη συμπαγή προβολή',
    ed_show_alerts: 'Ειδοποιήσεις',
    ed_language: 'Γλώσσα',
    ed_language_helper: 'Αφήστε κενό για να ακολουθεί τη γλώσσα του Home Assistant',
    ed_language_auto: 'Αυτόματα',
    ed_entities: 'Οντότητες (για προχωρημένους)',
    ed_entities_helper: 'Ανιχνεύονται αυτόματα από τη συσκευή· ορίστε μία μόνο για να την παρακάμψετε',
    en_operation_state: 'Κατάσταση λειτουργίας',
    en_door: 'Πόρτα',
    en_progress: 'Πρόοδος',
    en_finish_time: 'Ώρα ολοκλήρωσης',
    en_selected_program: 'Επιλεγμένο πρόγραμμα',
    en_active_program: 'Ενεργό πρόγραμμα',
    en_power: 'Τροφοδοσία',
    en_energy: 'Ενέργεια',
    en_stop: 'Διακοπή προγράμματος',
    en_pause: 'Παύση προγράμματος',
    en_resume: 'Συνέχιση προγράμματος',
    en_remote_start: 'Απομακρυσμένη έναρξη',
    en_remote_control: 'Απομακρυσμένος έλεγχος',
    en_connectivity: 'Συνδεσιμότητα',
    en_salt: 'Το αλάτι σχεδόν τελείωσε',
    en_rinse_aid: 'Το λαμπρυντικό σχεδόν τελείωσε',
  }
};

// Card language: the full code when the dictionary has it (sr-Latn), else the part before the dash (pt-BR gives
// European Portuguese), else English.
function hcLang(code) {
  var l = String(code || 'en');
  if (HcI18n[l]) return l;
  l = l.split('-')[0];
  return HcI18n[l] ? l : 'en';
}

// Locale handed to Intl / toLocale*: the full Home Assistant locale (pt-BR, de-CH…) when it is the
// card's language, else the card's language. A `language:` option wins over Home Assistant, sr-Latn
// stays as is, and a bare `pt` (Home Assistant's code for European Portuguese) becomes pt-PT, since
// Intl reads `pt` as Brazilian Portuguese.
function hcLocale(lang, hass, explicit) {
  if (lang === 'sr-Latn') return lang;
  var full = !explicit && (hass?.locale?.language || hass?.language);
  var l = full && String(full).split('-')[0] === lang.split('-')[0] ? String(full) : lang;
  return l === 'pt' ? 'pt-PT' : l;
}

function hcT(lang, key) {
  var strings = HcI18n[lang] || HcI18n.en;
  return strings[key] || HcI18n.en[key] || key;
}

function hcEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Service call errors from Home Assistant: a websocket error object ({ code, message }) or an Error.
function hcErrText(err) {
  if (!err) return '';
  return String(err.message || err.error?.message || err.code || err);
}

// Rejections an appliance often sends for a moment (busy, just woken up): worth one retry.
var HC_RETRYABLE = /BadRequest|WrongOperationState|\b40[09]\b/;
var HC_RETRY_DELAY = 3000;
var HC_ERROR_TIMEOUT = 10000;
var HC_NO_POWER_OFF = /does not support turning off|standby/i;
// Appliances that refused to be turned off, remembered for this page only.
var hcNoPowerOff = new Set();

// A door that moves this soon after the program ends is the appliance unlocking it, not someone opening it.
var HC_DOOR_GRACE = 60000;
// How far back the door reminder looks in the recorder's history (see _doorHistory).
var HC_DOOR_HISTORY = 48 * 3600000;

// The time (ms) an entity took its current value in recorder history rows (oldest first, compressed `s` / `lc` /
// `lu` in seconds), skipping the rows that only repeat it (a Home Assistant restart writes one). -Infinity when the
// value already held at the start of the window (its first row is that start, not a change). Null without rows.
function hcSince(rows, state) {
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
var HC_CYCLE_HISTORY = 24 * 3600000;
var HC_CYCLE_REFRESH = 5 * 60000;
var HC_CYCLE_ACTIVE = ['run', 'pause', 'actionrequired'];

// The energy the last cycle used, from recorder history rows (oldest first, compressed `s` / `lu` in seconds): the
// meter's increase from when the operation state last became active (run, pause, action required) to when it stopped
// being, or to `current` while it still is. A drop counts as a reset (total_increasing: Miele's per-program meter
// starts again from 0), its new value used since. { used, active, end } or null: no cycle in the rows, or no meter
// reading.
function hcCycleEnergy(opRows, meterRows, platform, current, now) {
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

function hcDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Appliance profiles ───────────────────────────────────────────────────────
var HC_STATE_COLORS = {
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
var HC_PROFILES = {
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
var HC_KINDS = ['dishwasher', 'washer', 'dryer', 'washer_dryer', 'oven', 'microwave', 'hob', 'coffee_maker', 'hood', 'fridge',
  'freezer', 'wine_cooler', 'styler'];
// Temperatures are shown on these: always for the cold ones, while cooking for the others.
var HC_COLD = ['fridge', 'freezer', 'wine_cooler'];
var HC_HOT = ['oven', 'microwave'];

// Roles the card looks for on the device. Each matcher tries the entity registry
// translation_key first, then the entity_id suffix (French and English slugs),
// then attributes, so it works whatever language the entities were created in.
var HC_ROLES = {
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

// Roles found the same way whatever the integration: the hood fan and its lights, the super modes of cold
// appliances (and anything else that shows the appliance at work without a program).
var hcIsDoor = (s) => s.attributes.device_class === 'door' || s.attributes.device_class === 'opening';
var hcIsTimestamp = (s) => s.attributes.device_class === 'timestamp';
var HC_COMMON_ROLES = {
  boost: { domain: 'switch', keys: ['refrigerator_super_mode', 'freezer_super_mode', 'supercooling', 'superfreezing', 'power_cool',
    'power_freeze', 'rapid_freeze', 'express_mode', 'express_fridge'] },
  fan: { domain: 'fan', keys: ['fan', 'hood', 'fan_speed'], test: () => true },
  venting: { domain: 'select', keys: ['venting_level'] },
  light: { domain: 'light', keys: ['cooking_lighting', 'light', 'oven_light'], test: () => true },
  // The appliance's energy meter (kWh / Wh, total_increasing): what a cycle used.
  energy: { domain: 'sensor', keys: ['energy', 'energy_consumption', 'total_energy'], test: (s) => s.attributes.device_class === 'energy' },
};

// The other integrations, role by role. They name things differently and some have no translation key at
// all (doors, a few temperatures), so attributes do the rest. The registry the frontend gets has no
// unique_id, so the entity_id suffix is the last resort.
var HC_PLATFORM_ROLES = {
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
};
var HC_PLATFORMS = Object.keys(HC_PLATFORM_ROLES);
// Switches of Home Connect Local that are appliance settings, not program options.
var HC_NOT_OPTIONS = ['switch_child_lock'];
// Values of an alert entity (salt, rinse aid, coffee machine tanks) that call for a chip; `full` only on the drip tray.
var HC_ALERT_ON = ['present', 'confirmed', 'on', 'empty', 'nearly_empty', 'not_inserted'];

// A duration sensor's value in minutes, whatever unit it is shown in (Home Connect Local defaults to hours).
var HC_MINUTES = { s: 1 / 60, min: 1, h: 60, d: 1440 };
function hcMinutes(s) {
  var v = Number(s?.state);
  if (!s || s.state === '' || Number.isNaN(v)) return null;
  return v * (HC_MINUTES[s.attributes.unit_of_measurement] ?? 1);
}

// Commands sent as an option of the appliance's operation select, where an integration has no buttons.
var HC_OPERATION_OPTIONS = {
  smartthings: { start: ['run'], pause: ['pause'], resume: ['run'], stop: ['stop'] },
  lg_thinq: { start: ['start'], stop: ['stop', 'cancel'] },
  whirlpool: { stop: ['standby'] },
};

// Each integration's states, folded into the Home Connect ones the card is drawn from (inactive, ready,
// delayedstart, run, pause, actionrequired, finished, error, aborting), plus `off` and `unavailable`.
// `phase` is the detailed job state some integrations report next to the machine state.
var HC_STATE_MAPS = {
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
};
// Unknown values of these integrations are steps of a running program (LG "spinning", Whirlpool "cycle_rinsing"…).
var HC_STATE_DEFAULT = { lg_thinq: 'run', whirlpool: 'run', matter: 'run', miele: 'ready' };

function hcNormState(platform, raw, phase) {
  if (raw === undefined || raw === 'unavailable' || raw === 'unknown') return undefined;
  if (platform === 'smartthings') {
    // Machine state (run / pause / stop, or the oven's ready / running / paused) and the job it is on.
    if (raw === 'run' || raw === 'running') return phase === 'delay_wash' || phase === 'scheduled_start' ? 'delayedstart' : 'run';
    if (raw === 'pause' || raw === 'paused') return 'pause';
    return phase === 'finish' || phase === 'finished' ? 'finished' : 'ready';
  }
  var map = HC_STATE_MAPS[platform];
  if (!map) return raw;
  return map[raw] || HC_STATE_DEFAULT[platform] || raw;
}

// The integration a device belongs to, read from its entities.
function hcPlatform(list) {
  var e = list.find((x) => HC_PLATFORMS.indexOf(x.platform) >= 0);
  return e ? e.platform : 'home_connect';
}

var HC_OVERRIDABLE = ['operation_state', 'door', 'progress', 'finish_time', 'selected_program',
  'active_program', 'power', 'stop', 'pause', 'resume', 'remote_start', 'remote_control', 'connectivity', 'salt', 'rinse_aid', 'energy'];
// Every role, overridable or not.
var HC_ALL_ROLES = HC_OVERRIDABLE.concat(['bean_container', 'water_tank', 'drip_tray', 'program', 'phase', 'remaining', 'elapsed',
  'total', 'operation', 'start'], Object.keys(HC_COMMON_ROLES).filter((r) => HC_OVERRIDABLE.indexOf(r) < 0));

// Registry entries grouped by device, built once per `hass.entities` object (it only changes with the registry).
var hcRegistryIndex = new WeakMap();
function hcRegistryByDevice(reg) {
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

function hcDeviceEntities(hass, deviceId) {
  if (!hass?.entities || !deviceId) return [];
  return (hcRegistryByDevice(hass.entities).get(deviceId) || []).filter((e) => hass.states[e.entity_id]);
}

// Role matching for a device, cached per `hass.entities` object like the registry index above:
// the result only depends on the registry and on which entities have a state yet (hence the
// count guard), not on the states themselves, so it isn't redone on every state change.
var hcRoleIndex = new WeakMap();
var HC_NO_ROLES = { count: 0, platform: 'home_connect', roles: {}, switches: [], selects: [] };
function hcDeviceRoles(hass, deviceId) {
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
  // Home Connect Local, the appliance settings too).
  var opts = platform === 'home_connect' ? list : list.filter((e) => e.entity_category !== 'diagnostic' &&
    (platform !== 'homeconnect_ws' || (e.entity_category !== 'config' && HC_NOT_OPTIONS.indexOf(e.translation_key) < 0)));
  var ids = opts.map((e) => e.entity_id);
  cached = {
    count: list.length,
    platform: platform,
    roles: roles,
    switches: ids.filter((id) => id.indexOf('switch.') === 0),
    selects: ids.filter((id) => id.indexOf('select.') === 0),
    temps: hcTempIds(hass, list),
  };
  byDevice.set(deviceId, cached);
  return cached;
}

function hcFindRole(hass, list, m) {
  var inDomain = list.filter((e) => e.entity_id.split('.')[0] === m.domain);
  var hit = inDomain.find((e) => m.keys.indexOf(e.translation_key) >= 0);
  if (!hit && m.id) hit = inDomain.find((e) => m.id.test(e.entity_id));
  if (!hit && m.test) hit = inDomain.find((e) => m.test(hass.states[e.entity_id]));
  return hit ? hit.entity_id : undefined;
}

// Temperatures worth a chip: measured ones (sensors, climate entities) first, then setpoints (numbers).
function hcTempIds(hass, list) {
  var unit = (s) => /°[CF]/.test(s.attributes.unit_of_measurement || '');
  var pick = (domain, test) => list.filter((e) => e.entity_id.split('.')[0] === domain && e.entity_category !== 'diagnostic' &&
    test(hass.states[e.entity_id])).map((e) => e.entity_id);
  return pick('climate', (s) => s.attributes.current_temperature != null)
    .concat(pick('sensor', (s) => s.attributes.device_class === 'temperature' || unit(s)))
    .concat(pick('number', unit)).slice(0, 3);
}

// Appliance type, from the device itself where the integration says it (Miele's model, LG's device type), else
// from what its entities are: the Home Connect programs, then the keys only one kind of appliance has.
var HC_MIELE_MODELS = [
  [/washer dryer/i, 'washer_dryer'], [/washing machine/i, 'washer'], [/tumble dryer|dryer/i, 'dryer'], [/dishwasher/i, 'dishwasher'],
  [/^microwave/i, 'microwave'], [/oven|steam/i, 'oven'], [/coffee/i, 'coffee_maker'], [/hood/i, 'hood'], [/hob/i, 'hob'],
  [/wine/i, 'wine_cooler'], [/fridge|refrigerator/i, 'fridge'], [/freezer/i, 'freezer'],
];
var HC_LG_TYPES = {
  WASHER: 'washer', DRYER: 'dryer', WASHTOWER: 'washer_dryer', WASHTOWER_WASHER: 'washer', WASHTOWER_DRYER: 'dryer',
  WASHCOMBO_MAIN: 'washer_dryer', WASHCOMBO_MINI: 'washer', DISH_WASHER: 'dishwasher', OVEN: 'oven', MICROWAVE_OVEN: 'microwave',
  COOKTOP: 'hob', HOOD: 'hood', REFRIGERATOR: 'fridge', KIMCHI_REFRIGERATOR: 'fridge', WINE_CELLAR: 'wine_cooler', STYLER: 'styler',
};
var HC_WS_TYPES = {
  Dishwasher: 'dishwasher', Washer: 'washer', Dryer: 'dryer', WasherDryer: 'washer_dryer', Oven: 'oven', Microwave: 'microwave',
  CoffeeMaker: 'coffee_maker', Hood: 'hood', Hob: 'hob', Cooktop: 'hob', Refrigerator: 'fridge', FridgeFreezer: 'fridge',
  Freezer: 'freezer', WineCooler: 'wine_cooler',
};
// [kind, translation keys any one of which gives it away], in order.
var HC_KEY_KINDS = [
  ['washer_dryer', (k) => k.washer_machine_state && k.dryer_machine_state],
  ['washer', ['washer_machine_state', 'washer_state', 'laundry_washer_spin_speed', 'laundry_washer_number_of_rinses']],
  ['dryer', ['dryer_machine_state', 'dryer_state', 'drying_target']],
  ['dishwasher', ['dishwasher_machine_state', 'dishwasher_alarm_inflow', 'salt_nearly_empty', 'rinse_aid_nearly_empty']],
  ['microwave', ['power_level', 'cook_time']],
  ['oven', ['oven_machine_state', 'oven_machine_state_cavity_01', 'oven_state', 'oven_state_upper', 'oven_current_cavity_temperature']],
  ['coffee_maker', ['bean_container_empty', 'coffee_counter']],
  ['hood', ['venting_level', 'hood', 'hood_fan_speed', 'hood_filter_usage']],
  ['wine_cooler', ['wine_compartment_setpoint_temperature']],
  ['fridge', ['refrigerator_setpoint_temperature', 'refrigerator_super_mode', 'cooler_temperature', 'power_cool',
    'refrigerator_temperature_level', 'refrigerator_door']],
  ['freezer', ['freezer_setpoint_temperature', 'freezer_super_mode', 'freezer_temperature', 'power_freeze']],
];

var hcKindIndex = new WeakMap();
function hcKindOf(hass, deviceId) {
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

function hcDetectKind(hass, deviceId, list) {
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
var hcFoundDevices = new WeakMap();
var HC_MISS_RETRY = 30000;
function hcFindDevice(hass, kind) {
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
var HC_BRANDS = {
  bosch: { name: 'Bosch', color: '#e20015' }, siemens: { name: 'Siemens', color: '#009999' }, neff: { name: 'Neff', color: '#b3123a' },
  gaggenau: { name: 'Gaggenau', color: '#3a3a3a' }, constructa: { name: 'Constructa', color: '#00589b' }, miele: { name: 'Miele', color: '#8c0014' },
  samsung: { name: 'Samsung', color: '#1428a0', match: /samsung/i }, lg: { name: 'LG', color: '#a50034', match: /^(lg|lge|lg electronics)$/i },
  whirlpool: { name: 'Whirlpool', color: '#8a6a00' }, maytag: { name: 'Maytag', color: '#002d72' }, kitchenaid: { name: 'KitchenAid', color: '#c8102e' },
  consul: { name: 'Consul', color: '#0067b1' },
};
// Brand logos (SVG or PNG files in logos/, named after the HC_BRANDS key), embedded by the build; brands without one keep
// the initial on their colour.
var HC_BRAND_LOGOS = {}; // __BRAND_LOGOS__
function hcBrand(dev, option) {
  var m = String(option || dev?.manufacturer || '').trim();
  if (!m) return null;
  var key = Object.keys(HC_BRANDS).find((k) => (HC_BRANDS[k].match ? HC_BRANDS[k].match.test(m) : m.toLowerCase().replace(/[\s-]/g, '') === k));
  return key ? Object.assign({ key: key }, HC_BRANDS[key]) : { key: 'other', name: m, color: '#55606d' };
}

// Fallback label for a Home Connect enum value when HA has no translation for it:
// "laundry_care_washer_enum_type_spin_speed_r_p_m_1200" → "1200 rpm".
function hcHumanize(value) {
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

// Header icon: the tinted round icon of the project page on the showcase site, the appliance's own icon in it.
var HC_ACCENT = '#039be5';

// Appliance illustrations (front view). The state color lights the display; when running the
// washer drum turns and the dishwasher projects its floor light, like the real appliances.
// Heights (px, with the 10 px gap above each block) used for getCardSize, measured in Chromium on the README captures.
var HC_PX = {
  base: 158, // padding, header and illustration
  miniBase: 142, // padding, header and the illustration row of a mini card
  program: 58,
  section: 26,
  selectRow: 56,
  toggleRow: 28,
  reload: 30,
  error: 26,
  controls: 44,
  hint: 20,
};

// The control under focus, as [data attribute, value], to find its replacement after a render.
function hcFocusKey(el) {
  var ds = el?.dataset;
  if (!ds) return null;
  var k = ['action', 'toggle', 'select', 'entity'].find((a) => ds[a]);
  return k ? [k, ds[k]] : null;
}

// A header chip: a click (or Enter / Space) opens the more-info dialog of `entity`, when it has one.
function hcChip(cls, icon, text, entity, title) {
  var more = entity ? ` role="button" tabindex="0" data-entity="${hcEsc(entity)}"` : '';
  return `<span class="${cls}${entity ? ' clickable' : ''}"${more}${title ? ` title="${hcEsc(title)}"` : ''}><ha-icon icon="${icon}"></ha-icon>${text}</span>`;
}

function hcRows(px) { return Math.max(1, Math.round(px / 50)); }

var HC_ART = {
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
var HC_ART_OPEN = {
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
var HC_STATE_BADGE = {
  pause: '<svg viewBox="0 0 24 24"><rect x="7" y="6" width="3.6" height="12" rx="1.2"/><rect x="13.4" y="6" width="3.6" height="12" rx="1.2"/></svg>',
  delayedstart: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff" stroke-width="2"/>' +
    '<path class="hand-h" d="M12 12V8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>' +
    '<path class="hand-m" d="M12 12h4" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
  finished: '<svg viewBox="0 0 24 24"><path class="check" d="M6.5 12.5l3.6 3.6 7.4-8" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
// Sparkles around a finished appliance.
var HC_SPARKLES = '<svg class="sparkles" viewBox="0 0 80 94" aria-hidden="true">' +
  '<path d="M8 14l1.6 4 4 1.6-4 1.6L8 25.2l-1.6-4-4-1.6 4-1.6Z"/><path d="M72 30l1.2 3 3 1.2-3 1.2L72 38.4l-1.2-3-3-1.2 3-1.2Z"/>' +
  '<path d="M68 2l1 2.4 2.4 1-2.4 1L68 8.8l-1-2.4-2.4-1 2.4-1Z"/></svg>';

// The illustration with its state: animated while running, a badge when paused, delayed or done.
// `lit`: animated without running (a wine cabinet with its light on).
var hcPicture = (art, state, illustrated, lit) => {
  var badge = illustrated && HC_STATE_BADGE[state]
    ? `<span class="pbadge">${HC_STATE_BADGE[state]}</span>${state === 'finished' ? HC_SPARKLES : ''}` : '';
  return `<div class="picture st-${hcEsc(state)}${state === 'run' || lit ? ' running' : ''}">${art}${badge}</div>`;
};

// ── Base card ────────────────────────────────────────────────────────────────
class HomeConnectBaseCard extends HTMLElement {
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
    // Back on screen: redraw now (state reset on disconnect) instead of waiting for the next hass update.
    this._update();
  }

  disconnectedCallback() {
    clearInterval(this._timer);
    document.removeEventListener('visibilitychange', this._onVisibility);
    this._io?.disconnect();
    this._io = null;
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
      var txt = el.dataset.tick === 'waiting'
        ? (i.waiting && this._t('door_waiting').replace('{t}', this._ago(i.waiting)))
        : (i.finish && this._timeLine(i.finish));
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
    var used = HC_ALL_ROLES.filter((role) => role !== 'boost' && role !== 'venting').map((role) => ent[role]);
    // Everything else the integration exposes as a switch or select is a program option.
    ent.option_switches = found.switches.filter((id) => used.indexOf(id) < 0);
    ent.option_selects = found.selects.filter((id) => used.indexOf(id) < 0);
    ent.temps = found.temps || [];
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
    var ids = HC_ALL_ROLES.map((role) => r.ent[role]).concat(r.ent.option_switches, r.ent.option_selects, r.ent.temps);
    var hass = this._hass;
    var states = JSON.stringify(ids.map((id) => {
      var s = id && hass.states[id];
      // Climate temperatures and the fan's speed live in attributes.
      return s ? [id, s.state, s.attributes.options, s.attributes.current_temperature, s.attributes.percentage] : null;
    }));
    // An error message goes away as soon as the appliance's state changes.
    if (this._error) {
      if (this._error.states == null) this._error.states = states;
      else if (this._error.states !== states) this._clearError();
    }
    // The device name and the 12/24 h preference are drawn too: a rename or a locale change redraws at once.
    var dev = r.deviceId && hass.devices ? hass.devices[r.deviceId] : null;
    var sig = JSON.stringify([this._lang(), r.deviceId, dev ? [dev.name_by_user, dev.name] : null,
      hass.locale?.time_format, this._zoomed, this._confirming, this._reloading, this._starting,
      this._error ? [this._error.key, this._error.detail] : null, hcNoPowerOff.has(this._powerKey(r)), Array.from(this._pending), states]);
    if (sig === this._sig) return;
    // Don't rebuild while a dropdown is open in the card.
    var active = this.shadowRoot.activeElement;
    if (active && active.tagName === 'SELECT') return;
    this._sig = sig;
    this._r = r;
    // innerHTML replaces every control: the one that had the keyboard focus gets it back (an armed Stop
    // must stay focused for a second Enter to confirm it).
    var focus = hcFocusKey(active);
    this._render(r);
    if (focus) this._refocus(focus);
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
    var mins = Math.max(0, Math.round((finish.getTime() - Date.now()) / 60000));
    var h = Math.floor(mins / 60), m = mins % 60;
    var unit = (u, n) => new Intl.NumberFormat(this._locale(), { style: 'unit', unit: u, unitDisplay: 'short' }).format(n);
    var left = h && m ? `${unit('hour', h)} ${unit('minute', m)}` : (h ? unit('hour', h) : unit('minute', m));
    var opts = { hour: '2-digit', minute: '2-digit' };
    var tf = this._hass.locale?.time_format;
    if (tf === '12' || tf === '24') opts.hour12 = tf === '12';
    var at = finish.toLocaleTimeString(this._locale(), opts);
    return `${this._t('ends_at')} ${at} · ${this._t('remaining').replace('{t}', left)}`;
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
    // Miele resumes with its Start button.
    var btnId = ent[action] || (action === 'resume' && r.platform === 'miele' ? ent.start : undefined);
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
      this.shadowRoot.innerHTML = `${this._styles()}<ha-card><div class="empty"><ha-icon icon="${hcEsc(icon)}"></ha-icon>${this._t('no_device')}</div></ha-card>`;
      return;
    }

    var raw = this._val(ent.operation_state);
    var opState = hcNormState(r.platform, raw, this._val(ent.phase));
    // Without a state sensor (a fridge, a hood) the appliance is online while any of its entities is.
    var online = ent.connectivity ? this._val(ent.connectivity) === 'on'
      : (ent.operation_state ? this._avail(ent.operation_state) && opState !== 'unavailable'
        : HC_ALL_ROLES.concat(['temps']).some((role) => [].concat(ent[role] || []).some((id) => this._avail(id))));
    var powerOn = ent.power ? this._val(ent.power) === 'on' : (opState ? opState !== 'inactive' && opState !== 'off' : !!profile.simple);
    var state = !online ? 'unavailable'
      : (!powerOn && (!opState || opState === 'inactive' || opState === 'off') ? 'off' : (opState || (profile.simple ? 'ready' : 'off')));
    // Appliances without a program are at work while a super mode, the hood's fan or a hob zone is on.
    if (profile.simple && online && state === 'ready' && this._busy(ent)) state = 'run';
    var running = !profile.simple && (state === 'run' || state === 'pause' || state === 'delayedstart' || state === 'actionrequired');
    var color = HC_STATE_COLORS[state] || 'var(--disabled-text-color, #9e9e9e)';
    // A wine cabinet's inside light glows in the illustration while it is on.
    this._lit = kind === 'wine_cooler' && online && this._val(ent.light) === 'on';

    // Program shown: the running one if any, else the selected one, else the program the integration reports.
    var progId = this._avail(ent.active_program) ? ent.active_program : ent.selected_program;
    var progLabel = this._avail(progId) ? this._fmt(progId) : '';
    var progVal = this._val(ent.program);
    if (!progLabel && this._avail(ent.program) && progVal !== 'no_program') progLabel = this._fmt(ent.program);

    // Progress and finish time: given by the integration, or worked out from the time left, elapsed or in total.
    var num = (id) => (this._avail(id) && !Number.isNaN(Number(this._val(id))) ? Number(this._val(id)) : null);
    var progress = num(ent.progress);
    var finish = this._avail(ent.finish_time) ? new Date(this._val(ent.finish_time)) : null;
    if (finish && Number.isNaN(finish.getTime())) finish = null;
    // Times left and elapsed in minutes, converted from the unit the sensor is shown in.
    var mins = (id) => (this._avail(id) ? hcMinutes(this._st(id)) : null);
    var left = mins(ent.remaining), elapsed = mins(ent.elapsed), total = num(ent.total);
    if (!finish && running && left != null && left > 0) finish = new Date(Date.now() + left * 60000);
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

    // While a program runs, integrations that report its step say more than "Running" (spinning, drying…).
    var statusText = this._t(`st_${state}`);
    var runKey = `st_run_${kind}`;
    if (state === 'run' && profile.simple && this._t(runKey) !== runKey) statusText = this._t(runKey);
    else if (state === 'run' && r.platform !== 'home_connect') {
      var detail = this._avail(ent.phase) && ['none', 'not_running'].indexOf(this._val(ent.phase)) < 0 ? ent.phase : ent.operation_state;
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
    this._tickInfo = { finish: running ? finish : null, waiting: waiting, clockProgress: clockProgress };
    if (waiting) {
      chips.push(hcChip('chip warn', 'mdi:bell-ring-outline', `<span data-tick="waiting">${hcEsc(this._t('door_waiting').replace('{t}', this._ago(waiting)))}</span>`, ent.door));
      this._ticking = true;
    } else if (online && door && ['open', 'closed', 'locked'].indexOf(door) >= 0) {
      var dIcon = door === 'open' ? 'mdi:door-open' : (door === 'locked' ? 'mdi:door-closed-lock' : 'mdi:door-closed');
      chips.push(hcChip(`chip${door === 'open' ? ' warn' : ''}`, dIcon, this._t(`door_${door}`), ent.door));
    }
    if (online) chips = chips.concat(this._infoChips(ent, kind, state, deviceName));
    if (online && !profile.simple) {
      var energyChip = this._energyChip(ent, r.platform);
      if (energyChip) chips.push(energyChip);
    }
    if (c.show_alerts) {
      [['salt', 'mdi:shaker-outline'], ['rinse_aid', 'mdi:water-alert-outline'], ['bean_container', 'mdi:coffee-off-outline'],
        ['water_tank', 'mdi:cup-water'], ['drip_tray', 'mdi:tray-full']].forEach((a) => {
        var v = this._val(ent[a[0]]);
        if (v === 'full' ? a[0] === 'drip_tray' : HC_ALERT_ON.indexOf(v) >= 0) chips.push(hcChip('chip warn', a[1], this._t(a[0]), ent[a[0]]));
      });
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
    if ((running && !noPct) || state === 'finished') {
      var pct = state === 'finished' ? 100 : (progress == null ? 0 : progress);
      big = '<div class="big"><span class="pct">' + Math.round(pct) + '<small> %</small></span><span class="state">' + hcEsc(statusText) + '</span></div>' +
        '<div class="bar"><div class="fill" style="width:' + pct + '%"></div></div>' +
        (timeLine ? `<div class="time" data-tick="time">${hcEsc(timeLine)}</div>` : '');
    } else {
      big = `<div class="big"><span class="state-big">${hcEsc(statusText)}</span></div>${timeLine ? `<div class="time" data-tick="time">${hcEsc(timeLine)}</div>` : ''}`;
    }
    var art = c.icon
      ? `<div class="badge"><ha-icon icon="${hcEsc(icon)}"></ha-icon></div>`
      : ((door === 'open' && HC_ART_OPEN[kind]) || HC_ART[kind] || HC_ART.dishwasher);
    var heroHtml = '<div class="hero">' + hcPicture(art, state, !c.icon, this._lit) +
      '<div class="info">' + big + (chips.length ? `<div class="chips">${chips.join('')}</div>` : '') + '</div></div>';

    var logo = `<div class="logo" aria-hidden="true"><ha-icon icon="${hcEsc(profile.icon)}"></ha-icon>${this._badge()}</div>`;
    var sub = progLabel || this._t(kind);

    if (this._compact()) {
      this._rows = hcRows(HC_PX.miniBase + (this._error ? HC_PX.error : 0));
      this.shadowRoot.innerHTML = this._miniHtml({ c, ent, name, color, state, statusText, running, online, powerOn, progress,
        finish, progLabel, chips: chips.filter((x) => x.indexOf('chip warn') >= 0 || x.indexOf('chip extra') >= 0 || !online), art, logo, powerBtn });
      return;
    }

    this._rows = hcRows(HC_PX.base + (programHtml ? HC_PX.program : 0) + optPx + (errorHtml ? HC_PX.error : 0) +
      (controls ? HC_PX.controls : 0) + (controls.indexOf('class="hint"') >= 0 ? HC_PX.hint : 0));
    this.shadowRoot.innerHTML = this._styles(color) + '<ha-card>' +
      '<div class="header">' + logo +
        '<div class="titles"><div class="name">' + hcEsc(name) + '</div><div class="sub">' + this._brandLogo() + hcEsc(sub) + '</div></div>' +
        powerBtn + this._zoomButton() +
      '</div>' +
      heroHtml + programHtml + optionsHtml + errorHtml + controls +
    '</ha-card>';
  }

  // A program-less appliance at work: a super mode on, the hood's fan turning or venting, its light aside.
  _busy(ent) {
    if (this._val(ent.boost) === 'on') return true;
    if (this._val(ent.fan) === 'on') return true;
    var v = this._val(ent.venting);
    return !!(v && this._avail(ent.venting) && !/fan_off$|_off$/.test(v));
  }

  // Temperatures (cold appliances always, ovens while cooking) and the hood's fan and light.
  _infoChips(ent, kind, state, deviceName) {
    var chips = [];
    var chip = (icon, text, id, title) => hcChip('chip extra', icon, hcEsc(text), id, title);
    if (HC_COLD.indexOf(kind) >= 0 || (HC_HOT.indexOf(kind) >= 0 && state === 'run')) {
      ent.temps.forEach((id) => {
        var s = this._st(id);
        if (!s) return;
        var label = this._entityLabel(id, deviceName);
        var value;
        if (id.indexOf('climate.') === 0) {
          // Unavailable or not reported (null would read as 0 °): no chip. The number in the card's locale, the unit
          // Home Assistant's.
          var cur = s.attributes.current_temperature;
          var n = cur == null || cur === '' ? Number.NaN : Number(cur);
          if (this._avail(id) && Number.isFinite(n)) {
            value = `${new Intl.NumberFormat(this._locale(), { maximumFractionDigits: 1 }).format(n)} ${this._hass.config?.unit_system?.temperature || '°'}`;
          }
        } else if (this._avail(id)) {
          value = this._hass.formatEntityState ? this._hass.formatEntityState(s) : `${s.state} ${s.attributes.unit_of_measurement || ''}`.trim();
        }
        if (value) chips.push(chip(/freez|congel|gefrier|congela|vries|zamra/i.test(`${id} ${label}`) ? 'mdi:snowflake' : 'mdi:thermometer', value, id, label));
      });
    }
    if (kind === 'hood') {
      var fan = this._st(ent.fan);
      if (fan && fan.state === 'on' && fan.attributes.percentage != null) chips.push(chip('mdi:fan', `${Math.round(fan.attributes.percentage)} %`, ent.fan));
      else if (this._avail(ent.venting) && this._busy({ venting: ent.venting })) chips.push(chip('mdi:fan', this._fmt(ent.venting), ent.venting));
      if (this._val(ent.light) === 'on') chips.push(chip('mdi:lightbulb-on-outline', this._t('light_on'), ent.light));
    }
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
        ' --hc-primary-text: color-mix(in srgb, var(--primary-color, #03a9f4) 45%, var(--primary-text-color)); }' +
      // A size container: narrow layouts (6 columns of a Sections view, the mini card) follow the card's own width.
      'ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 10px;' +
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
        ' color: ' + HC_ACCENT + '; background: color-mix(in srgb, ' + HC_ACCENT + ' 16%, transparent); }' +
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
      '.titles { flex: 1 1 0; min-width: 5ch; font-size: 16px; }' +
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
      'button { font: inherit; cursor: pointer; border: none; }' +
      'button:disabled { cursor: default; opacity: 0.5; }' +
      '.power { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.power.on { background: color-mix(in srgb, var(--hc-color) 15%, transparent); color: var(--hc-color); }' +
      '.chips { display: flex; flex-wrap: wrap; gap: 6px; }' +
      '.chip { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; box-sizing: border-box; overflow-wrap: anywhere; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.chip ha-icon { --mdc-icon-size: 13px; flex: none; }' +
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
      '.toggle { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; box-sizing: border-box; overflow-wrap: anywhere; text-align: start;' +
        ' font-size: 11px; font-weight: 500; padding: 3px 8px 3px 5px; border-radius: 12px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.toggle ha-icon { --mdc-icon-size: 16px; flex: none; }' +
      '.toggle:disabled { opacity: 0.45; }' +
      '.reload { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; font-size: 12px; color: var(--secondary-text-color); }' +
      '.link { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 500; padding: 4px 8px; border-radius: 10px; background: none; color: var(--hc-primary-text); }' +
      '.link ha-icon { --mdc-icon-size: 16px; }' +
      '.toggle.on { background: color-mix(in srgb, var(--primary-color, #03a9f4) 15%, transparent); color: var(--hc-primary-text); }' +
      '.controls { display: flex; gap: 6px; }' +
      '.btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; font-weight: 500;' +
        ' padding: 7px 10px; border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--primary-text-color); }' +
      '.btn ha-icon { --mdc-icon-size: 18px; }' +
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
      '.error ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }' +
      '.zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); }' +
      '.zoom ha-icon { --mdc-icon-size: 16px; }' +
      '.zoom:hover { background: color-mix(in srgb, var(--secondary-text-color) 16%, transparent); color: var(--primary-text-color); }' +
      '.zoom:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }' +
      // The status pill takes at most half the header and truncates; on a narrow card only its dot shows.
      '.st { display: inline-flex; align-items: center; gap: 4px; flex: 0 1 auto; min-width: 0; max-width: 50%; overflow: hidden; box-sizing: border-box;' +
        ' padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;' +
        ' background: color-mix(in srgb, var(--hc-color) 15%, transparent); color: var(--hc-text); }' +
      '.stt { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
      '.dot { width: 6px; height: 6px; flex: none; border-radius: 50%; background: var(--hc-color); }' +
      '.content { display: flex; align-items: center; gap: 12px; }' +
      'ha-card.mini .picture { width: 56px; height: 66px; }' +
      '.mbar { display: flex; align-items: center; gap: 8px; font-size: 13px; }' +
      '.mbar .bar { flex: 1; }' +
      '.mbar .v { font-weight: 500; min-width: 40px; text-align: right; color: var(--primary-text-color); }' +
      '.line { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }' +
      '.line ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }' +
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
      // At 6 columns the mini card's pill is a dot (its text stays in its title and for screen readers) and the
      // state is spelt out above the program instead, where it has room to wrap.
      '@container (max-width: 230px) {' +
        ' ha-card.mini .st { padding: 4px; }' +
        ' ha-card.mini .stt { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }' +
        ' ha-card.mini .mstate { display: flex; }' +
      ' }' +
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
    '</style>';
  }

  _onClick(ev) {
    var btn = ev.composedPath().find((n) => n.dataset && (n.dataset.action || n.dataset.toggle || n.dataset.entity));
    if (!btn || btn.disabled) return;
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
    this._option('select', 'select_option', { entity_id: el.dataset.select, option: el.value });
    el.blur();
  }
}

class HomeConnectDishwasherCard extends HomeConnectBaseCard {
  static get kind() { return 'dishwasher'; }
}

class HomeConnectWasherCard extends HomeConnectBaseCard {
  static get kind() { return 'washer'; }
}

// The card for any appliance: its type comes from the device picked (or the `kind` option).
class SmartApplianceCard extends HomeConnectBaseCard {
  static get kind() { return null; }
}

// ── Mini cards ───────────────────────────────────────────────────────────────
// A mini card is a full card drawn compact, like ha-roborock-card: its detail button (top right, `zoom: false`
// removes it) switches it to the full card and back, and a click anywhere else on the page folds it again.
var hcInDialog = (ev) => ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].indexOf(n.localName) >= 0);

var hcMini = (Base) => class extends Base {
  static get mini() { return true; }

  static getConfigElement() {
    var el = Base.getConfigElement();
    el.mini = true;
    return el;
  }

  constructor() {
    super();
    this._onUnzoom = (ev) => {
      if (this._zoomed && !ev.composedPath().includes(this) && !hcInDialog(ev)) this._setZoom(false);
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onUnzoom, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onUnzoom, true);
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
    if ((m.running && !this._noPct) || m.state === 'finished') {
      var pct = m.state === 'finished' ? 100 : (m.progress == null ? 0 : m.progress);
      bar = `<div class="mbar"><div class="bar"><div class="fill" style="width:${pct}%"></div></div><span class="v">${Math.round(pct)} %</span></div>`;
    }
    if (m.progLabel && m.online && m.powerOn) lines.push(`<div class="line"><ha-icon icon="mdi:tune-variant"></ha-icon><span>${hcEsc(m.progLabel)}</span></div>`);
    if (m.running && m.finish) {
      lines.push(`<div class="line"><ha-icon icon="mdi:clock-outline"></ha-icon><span data-tick="time">${hcEsc(this._timeLine(m.finish))}</span></div>`);
    }
    if (m.chips.length) lines.push(`<div class="chips">${m.chips.join('')}</div>`);

    // Round buttons: start (or pause / resume) and power.
    var btns = c.show_controls && m.online && m.powerOn ? this._actionButtons(ent, m.state, m.running, true).btns : [];
    if (m.powerBtn) btns.push(m.powerBtn);

    var errorHtml = this._error
      ? `<div class="error" role="alert" title="${hcEsc(this._error.detail)}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><span>${hcEsc(this._t(this._error.key))}</span></div>`
      : '';

    return this._styles(m.color) + '<ha-card class="mini">' +
      '<div class="header">' + m.logo +
        '<div class="titles"><div class="name">' + hcEsc(m.name) + '</div>' + (this._brandLogo() ? `<div class="sub">${this._brandLogo()}</div>` : '') + '</div>' +
        `<span class="st" title="${hcEsc(m.statusText)}"><span class="dot"></span><span class="stt">${hcEsc(m.statusText)}</span></span>` + this._zoomButton() +
      '</div>' +
      '<div class="content">' + hcPicture(m.art, m.state, !c.icon, this._lit) +
        '<div class="info">' + mstate + bar + lines.join('') + '</div>' +
        (btns.length ? `<div class="mcontrols">${btns.join('')}</div>` : '') +
      '</div>' + errorHtml +
    '</ha-card>';
  }
};

class HomeConnectDishwasherMiniCard extends hcMini(HomeConnectDishwasherCard) {}

class HomeConnectWasherMiniCard extends hcMini(HomeConnectWasherCard) {}

class SmartApplianceMiniCard extends hcMini(SmartApplianceCard) {}

// ── smart-appliance-card-editor (visual editor, built on HA's ha-form) ──────────
var HC_EDITOR_DEFAULTS = { show_program: true, show_controls: true, show_options: true, show_alerts: true, show_power: true, show_energy: true, zoom: true };

class HomeConnectCardEditor extends HTMLElement {
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
      salt: ['sensor', 'binary_sensor'], rinse_aid: ['sensor', 'binary_sensor'], energy: 'sensor' };
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
          { name: 'show_program', selector: { boolean: {} } },
          { name: 'show_controls', selector: { boolean: {} } },
          { name: 'show_options', selector: { boolean: {} } },
          { name: 'show_alerts', selector: { boolean: {} } },
          { name: 'show_power', selector: { boolean: {} } },
          { name: 'show_energy', selector: { boolean: {} } },
        ].concat(this.mini || /-mini-card$/.test(this._config.type || '') ? [{ name: 'zoom', selector: { boolean: {} } }] : []),
      },
    ].concat(this.mini || /-mini-card$/.test(this._config.type || '') ? [] : [
      // The cost of a cycle next to its energy (full card).
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
      if (HC_ROLES[s.name]) return hcT(lang, `en_${s.name}`);
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
  customElements.define('smart-appliance-card-editor', HomeConnectCardEditor);
}

window.customCards = window.customCards || [];
var HC_DOCS = 'https://github.com/juju35/ha-smart-appliance-card';
[
  ['smart-appliance-card', SmartApplianceCard, 'Smart Appliance Card',
    'Animated card for washers, dryers, dishwashers, ovens, coffee machines, hoods, fridges… (Home Connect, Miele, SmartThings, LG ThinQ, Whirlpool, Matter)'],
  ['smart-appliance-mini-card', SmartApplianceMiniCard, 'Smart Appliance Mini Card', 'Compact appliance card that unfolds into the full card'],
].forEach(([type, cls, name, description]) => {
  if (customElements.get(type)) return;
  customElements.define(type, cls);
  window.customCards.push({ type, name, description, preview: true, documentationURL: HC_DOCS });
});
// The former Home Connect card types keep working in existing dashboards; they are no longer offered in the card picker.
[
  ['home-connect-dishwasher-card', HomeConnectDishwasherCard],
  ['home-connect-washer-card', HomeConnectWasherCard],
  ['home-connect-dishwasher-mini-card', HomeConnectDishwasherMiniCard],
  ['home-connect-washer-mini-card', HomeConnectWasherMiniCard],
].forEach(([type, cls]) => {
  if (!customElements.get(type)) customElements.define(type, cls);
});

console.info(`%c SMART-APPLIANCE-CARD %c v${SMART_APPLIANCE_CARD_VERSION} `, 'color:#fff;background:#1e88e5;font-weight:700', 'color:#1e88e5;background:#fff');
