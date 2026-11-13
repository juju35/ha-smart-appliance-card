// Builds src/smart-appliance-card.js into the single HACS file dist/smart-appliance-card.js, stamping the package version
// and embedding the brand logos of logos/.
// Usage: node scripts/build.mjs  (dist/ is not committed: CI and the release workflow build it)
import { mkdirSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { splitDist } from "./i18n-split.mjs";

const FILE = "smart-appliance-card.js";
const LEGACY = "home-connect-card.js";
const root = fileURLToPath(new URL("..", import.meta.url));
const pkg = JSON.parse(readFileSync(`${root}package.json`, "utf8"));

// Brand logos from logos/<brand>.svg or .png, embedded so the card stays a single file.
// An SVG goes in as markup, a PNG as an <img> with a data URI.
const logo = (f) =>
  f.endsWith(".svg")
    ? readFileSync(`${root}logos/${f}`, "utf8").trim()
    : `<img alt="" src="data:image/png;base64,${readFileSync(`${root}logos/${f}`).toString("base64")}">`;
const logos = Object.fromEntries(
  readdirSync(`${root}logos`)
    .filter((f) => /\.(svg|png)$/.test(f))
    .sort()
    .map((f) => [f.replace(/\.(svg|png)$/, ""), logo(f)]),
);
const src = readFileSync(`${root}src/${FILE}`, "utf8");
if (!src.includes("var HC_BRAND_LOGOS = {}; // __BRAND_LOGOS__")) throw new Error("brand logos placeholder missing");
const out = src
  .replace("__VERSION__", pkg.version)
  .replace("var HC_BRAND_LOGOS = {}; // __BRAND_LOGOS__", `var HC_BRAND_LOGOS = ${JSON.stringify(logos)};`);

const target = `${root}dist/${FILE}`;
mkdirSync(`${root}dist`, { recursive: true });
writeFileSync(target, out);
// Same file under the 1.x name, attached to the releases for manual installs moving from ha-home-connect-card.
writeFileSync(`${root}dist/${LEGACY}`, out);
console.log(`Built dist/${FILE} (${(out.length / 1024).toFixed(1)} KB)`);

// Translations: English stays in the bundle, each other language goes to dist/smart-appliance-card.i18n.<lang>.js,
// fetched when a card needs it (scripts/i18n-split.mjs).
if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) splitDist(`${root}dist`, "smart-appliance-card.js", { version: pkg.version, aliases: ["home-connect-card.js"] });
