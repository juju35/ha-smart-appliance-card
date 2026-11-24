// Entry point: the card's modules in their original order. scripts/bundle.mjs concatenates them in this order into the
// single classic script the card ships as.
import "./card-picker.js";
import "./i18n/hci18n.js";
import "./i18n-helpers.js";
import "./appliance-profiles.js";
import "./illustrated-header.js";
import "./base-card.js";
import "./shadow-dom-patching.js";
import "./mini-cards.js";
import "./smart-appliance-card-2.js";
