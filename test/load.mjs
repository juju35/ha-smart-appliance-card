// Evaluates the card source in a sandbox with minimal browser stubs and returns the requested top-level names.
// The card is a single classic script (no exports), so the bundle stays exactly what HACS serves.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export function loadCard(file, names) {
  const src = readFileSync(fileURLToPath(new URL(`../src/${file}`, import.meta.url)), "utf8");
  const registry = new Map();
  const sandbox = {
    console: { info() {}, log() {}, warn() {}, error() {} },
    HTMLElement: class {
      attachShadow() {
        // Listeners are recorded so tests can dispatch shadow root events (focusout, keydown...).
        const listeners = {};
        this.shadowRoot = {
          innerHTML: "",
          activeElement: null,
          listeners,
          addEventListener(type, fn) {
            (listeners[type] ||= []).push(fn);
          },
          querySelector: () => null,
        };
        return this.shadowRoot;
      }
      addEventListener() {}
      toggleAttribute(name, force) {
        (this.attributes ||= {})[name] = !!force;
      }
      dispatchEvent() {}
      appendChild() {}
    },
    CustomEvent: class {
      constructor(type, init = {}) {
        this.type = type;
        this.detail = init.detail;
      }
    },
    customElements: { get: (n) => registry.get(n), define: (n, c) => registry.set(n, c) },
    document: {
      documentElement: { lang: "en" },
      hidden: false,
      createElement: (tag) => ({ tagName: tag, addEventListener() {} }),
      addEventListener() {},
      removeEventListener() {},
    },
    navigator: { language: "en" },
    localStorage: { getItem: () => null, setItem() {} },
    setInterval: () => 0,
    clearInterval() {},
    // The current global timers, so node:test mock timers apply to the card too.
    setTimeout: (...args) => globalThis.setTimeout(...args),
    clearTimeout: (id) => globalThis.clearTimeout(id),
  };
  sandbox.window = sandbox;
  // The current global Date, so node:test mock timers apply to the card too.
  Object.defineProperty(sandbox, "Date", { get: () => globalThis.Date });
  vm.createContext(sandbox);
  vm.runInContext(`${src}\n;globalThis.__exports = { ${names.join(", ")} };`, sandbox, { filename: file });
  return { ...sandbox.__exports, customElements: registry };
}
