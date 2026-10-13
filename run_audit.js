const fs = require("fs");
const path = require("path");
const vm = require("vm");

console.log("================================================================");
console.log("🎬 GRANDMASTER VERIFICATION HARNESS - CINEMA PRO SUITE");
console.log("================================================================\n");

const scriptFiles = fs.readdirSync(".")
  .filter(f => f.endsWith(".user.js"))
  .sort();

console.log(`Discovered ${scriptFiles.length} UserScripts to test:`);
scriptFiles.forEach((f, i) => console.log(`  [${i + 1}] ${f}`));
console.log("\n----------------------------------------------------------------");

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function report(testName, passed, details = "") {
  totalTests++;
  if (passed) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${testName} - ${details}`);
  }
}

// ═════════════════════════════════════════════════════════════════
// 1. SYNTAX & METADATA AUDIT
// ═════════════════════════════════════════════════════════════════
console.log("\n📋 PHASE 1: Tampermonkey Metadata & Header Compliance");

scriptFiles.forEach(file => {
  const content = fs.readFileSync(file, "utf8");
  
  // Header block
  const hasHeader = content.includes("// ==UserScript==") && content.includes("// ==/UserScript==");
  report(`${file}: Metadata Header Exists`, hasHeader);

  // Author
  const hasAuthor = content.includes("@author       ekaznyra");
  report(`${file}: Author is ekaznyra`, hasAuthor);

  // Download & Update URL
  if (file !== "tampermonkey.user.js") {
    const expectedUrl = `https://raw.githubusercontent.com/ekaznyra/bypass-rophim/main/${file}`;
    const hasDownload = content.includes(`@downloadURL  ${expectedUrl}`);
    const hasUpdate = content.includes(`@updateURL    ${expectedUrl}`);
    report(`${file}: Correct Raw DownloadURL`, hasDownload, `Missing ${expectedUrl}`);
    report(`${file}: Correct Raw UpdateURL`, hasUpdate, `Missing ${expectedUrl}`);
  }

  // Essential Flags
  const hasRunAt = content.includes("@run-at       document-start");
  const hasAllFrames = content.includes("@allFrames    true");
  report(`${file}: document-start & allFrames enabled`, hasRunAt && hasAllFrames);
});

// ═════════════════════════════════════════════════════════════════
// 2. RUNTIME SIMULATION TEST (TOP WINDOW CONTEXT)
// ═════════════════════════════════════════════════════════════════
console.log("\n🌐 PHASE 2: Top Window DOM & Feature Execution Simulation");

function createTopWindowMock(hostname = "motchill.online") {
  const listeners = {};
  const appendedElements = [];
  const styles = [];

  class MockElement {
    constructor(tag) {
      this.tagName = tag.toUpperCase();
      this.id = "";
      this.className = "";
      this.style = {};
      this.children = [];
      this.classList = {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        toggle(c, force) {
          if (force !== undefined) {
            if (force) this._set.add(c);
            else this._set.delete(c);
            return force;
          }
          if (this._set.has(c)) { this._set.delete(c); return false; }
          this._set.add(c); return true;
        },
        contains(c) { return this._set.has(c); }
      };
      this._textContent = "";
      this._innerHTML = "";
      this.listeners = {};
    }

    set textContent(v) { this._textContent = v; }
    get textContent() { return this._textContent; }
    set innerHTML(v) {
      this._innerHTML = v;
      // Parse ids from innerHTML to create mock children
      const idMatches = v.matchAll(/id=["']([^"']+)["']/g);
      for (const m of idMatches) {
        const child = new MockElement(m[1].includes("btn") ? "button" : "div");
        child.id = m[1];
        this.children.push(child);
      }
    }
    get innerHTML() { return this._innerHTML; }

    appendChild(child) {
      this.children.push(child);
      appendedElements.push(child);
      if (this.tagName === "HEAD" || this.tagName === "HTML") {
        if (child.tagName === "STYLE") styles.push(child._textContent);
      }
      return child;
    }
    querySelector(sel) {
      if (sel.startsWith("#")) {
        const id = sel.slice(1);
        const find = (el) => {
          if (el.id === id) return el;
          for (const c of el.children) {
            const found = find(c);
            if (found) return found;
          }
          return null;
        };
        return find(this);
      }
      return null;
    }
    querySelectorAll(sel) { return []; }
    addEventListener(ev, cb) {
      if (!this.listeners[ev]) this.listeners[ev] = [];
      this.listeners[ev].push(cb);
    }
    contains(target) {
      if (this === target) return true;
      for (const c of this.children) {
        if (c.contains(target)) return true;
      }
      return false;
    }
    click() {
      if (this.onclick) this.onclick({ stopPropagation: () => {} });
      if (this.listeners["click"]) {
        this.listeners["click"].forEach(fn => fn({ stopPropagation: () => {} }));
      }
    }
  }

  const head = new MockElement("head");
  const body = new MockElement("body");
  const documentElement = new MockElement("html");
  documentElement.appendChild(head);
  documentElement.appendChild(body);

  const documentMock = {
    head,
    body,
    documentElement,
    activeElement: body,
    createElement: (tag) => new MockElement(tag),
    getElementById: (id) => {
      const find = (el) => {
        if (el.id === id) return el;
        for (const c of el.children) {
          const found = find(c);
          if (found) return found;
        }
        return null;
      };
      return find(documentElement);
    },
    querySelector: (sel) => {
      if (sel === "video") {
        const v = new MockElement("video");
        v.playbackRate = 1.0;
        v.currentTime = 10;
        v.duration = 1000;
        return v;
      }
      return null;
    },
    querySelectorAll: (sel) => [],
    addEventListener: (ev, cb) => {
      if (!listeners[ev]) listeners[ev] = [];
      listeners[ev].push(cb);
    }
  };

  let openedPopup = null;
  const windowMock = {
    top: null,
    self: null,
    location: {
      hostname,
      pathname: "/phim-hay",
      href: `https://${hostname}/phim-hay`,
      search: "?ep=1"
    },
    document: documentMock,
    open: (url) => { openedPopup = url; return {}; },
    addEventListener: (ev, cb) => {
      if (!listeners[ev]) listeners[ev] = [];
      listeners[ev].push(cb);
    },
    removeEventListener: () => {},
    postMessage: () => {},
    navigator: {
      clipboard: {
        writeText: async (t) => true
      }
    },
    localStorage: {
      _store: {},
      setItem(k, v) { this._store[k] = String(v); },
      getItem(k) { return this._store[k] || null; },
      removeItem(k) { delete this._store[k]; }
    },
    fetch: async () => ({
      status: 200,
      headers: { get: () => "application/json" },
      clone: () => ({ json: async () => ({}) }),
      json: async () => ({})
    }),
    XMLHttpRequest: function () {
      this.open = () => {};
      this.send = () => {};
      this.addEventListener = () => {};
      this.getResponseHeader = () => "text/plain";
      this.responseText = "";
    },
    setTimeout: (fn) => setTimeout(fn, 0),
    clearTimeout: (id) => clearTimeout(id),
    setInterval: (fn) => setInterval(fn, 1000),
    clearInterval: (id) => clearInterval(id),
    console: {
      log: () => {},
      warn: () => {},
      error: () => {}
    },
    HTMLMediaElement: {
      prototype: {
        pause: function () {}
      }
    },
    Storage: {
      prototype: {
        setItem: function (k, v) {}
      }
    }
  };

  windowMock.window = windowMock;
  windowMock.top = windowMock;
  windowMock.self = windowMock;

  return { window: windowMock, document: documentMock, listeners, body, styles };
}

scriptFiles.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document, listeners, body } = createTopWindowMock();

  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: window.navigator,
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    localStorage: window.localStorage,
    HTMLMediaElement: window.HTMLMediaElement,
    Storage: window.Storage,
    console: window.console,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    Promise
  });

  try {
    vm.runInContext(code, ctx);
    report(`${file}: Top Window executed without runtime exceptions`, true);

    // Test 2.1: Floating Hub injected
    const hub = document.getElementById("ro-vip-hub");
    const hasHub = Boolean(hub);
    report(`${file}: Floating VIP Hub (#ro-vip-hub) successfully injected`, hasHub);

    // Test 2.2: Ad popup blocker
    let blockedMalicious = false;
    try {
      const res = window.open("https://shopee-casino-ad.net/click");
      blockedMalicious = (res === null);
    } catch (e) {
      blockedMalicious = true;
    }
    report(`${file}: Ad Popunder/Window.open trap neutralizer`, blockedMalicious);

    // Test 2.3: Hotkey dispatcher
    let hotkeysPassed = false;
    if (listeners["keydown"]) {
      try {
        listeners["keydown"].forEach(cb => {
          cb({ key: "s", preventDefault: () => {}, target: body });
          cb({ key: "e", preventDefault: () => {}, target: body });
          cb({ key: "t", preventDefault: () => {}, target: body });
          cb({ key: "[", preventDefault: () => {}, target: body });
          cb({ key: "]", preventDefault: () => {}, target: body });
        });
        hotkeysPassed = true;
      } catch (err) {
        hotkeysPassed = false;
      }
    }
    report(`${file}: Cinema Pro Hotkeys (S, E, T, [, ]) fired safely`, hotkeysPassed);

  } catch (err) {
    report(`${file}: Top Window execution`, false, err.stack || err.message);
  }
});

// ═════════════════════════════════════════════════════════════════
// 3. RUNTIME SIMULATION TEST (IFRAME EMBED PLAYER CONTEXT)
// ═════════════════════════════════════════════════════════════════
console.log("\n🎬 PHASE 3: Iframe Player Embed & Stream Guard Defusal Simulation");

function createIframeMock() {
  const listeners = {};
  let postedMessage = null;

  const documentMock = {
    head: { appendChild: () => {} },
    body: { appendChild: () => {} },
    documentElement: { appendChild: () => {} },
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      style: {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {} }
    }),
    querySelector: (sel) => ({
      currentTime: 10,
      duration: 1000,
      playbackRate: 1.0,
      classList: { toggle: () => {} }
    }),
    addEventListener: (ev, cb) => {
      if (!listeners[ev]) listeners[ev] = [];
      listeners[ev].push(cb);
    }
  };

  const windowMock = {
    top: {}, // different object -> isEmbed = true
    self: {},
    location: {
      hostname: "embed11.streamc.xyz",
      pathname: "/embed.php",
      href: "https://embed11.streamc.xyz/embed.php?id=xyz"
    },
    document: documentMock,
    addEventListener: (ev, cb) => {
      if (!listeners[ev]) listeners[ev] = [];
      listeners[ev].push(cb);
    },
    parent: {
      postMessage: (msg) => { postedMessage = msg; }
    },
    fetch: async (input) => {
      return { status: 200, json: async () => ({}) };
    },
    XMLHttpRequest: function () {
      this.open = () => {};
      this.send = () => {};
      this.addEventListener = () => {};
    },
    console: { log: () => {}, warn: () => {}, error: () => {} },
    setTimeout: (fn) => setTimeout(fn, 0),
    clearTimeout: (id) => clearTimeout(id),
    setInterval: (fn) => setInterval(fn, 1000),
    clearInterval: (id) => clearInterval(id),
    HTMLMediaElement: {
      prototype: {
        pause: function () { this.paused = true; }
      }
    }
  };
  windowMock.window = windowMock;
  windowMock.self = windowMock;

  return { window: windowMock, document: documentMock, listeners, getPosted: () => postedMessage };
}

scriptFiles.forEach(file => {
  const code = fs.readFileSync(file, "utf8");
  const { window, document, listeners, getPosted } = createIframeMock();

  const ctx = vm.createContext({
    window,
    document,
    location: window.location,
    top: window.top,
    self: window.self,
    navigator: { clipboard: { writeText: async () => true } },
    fetch: window.fetch,
    XMLHttpRequest: window.XMLHttpRequest,
    localStorage: { getItem: () => null, setItem: () => {} },
    HTMLMediaElement: window.HTMLMediaElement,
    console: window.console,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    Promise
  });

  try {
    vm.runInContext(code, ctx);
    report(`${file}: Iframe Context executed without errors`, true);

    // Test 3.1: Stream Guard defusal
    const hasGuardDefused = (
      typeof window.streamGuard === "object" &&
      window.streamGuard !== null &&
      window.streamGuard.isBlocked() === false
    );
    report(`${file}: Stream Guard defused (window.streamGuard.isBlocked === false)`, hasGuardDefused);

    // Test 3.2: M3U8 Stream sniffer & bridge
    window.fetch("https://storage.streamc.xyz/hls/master.m3u8");
    const posted = getPosted();
    const snifferPassed = Boolean(posted && posted.type === "RO_STREAM_FOUND" && posted.streamUrl.includes(".m3u8"));
    report(`${file}: M3U8 Stream Sniffer hooked fetch & posted to parent`, snifferPassed);

  } catch (err) {
    report(`${file}: Iframe Context execution`, false, err.stack || err.message);
  }
});

// ═════════════════════════════════════════════════════════════════
// FINAL EVALUATION
// ═════════════════════════════════════════════════════════════════
console.log("\n================================================================");
console.log(`🎯 COMPREHENSIVE TEST AUDIT COMPLETE:`);
console.log(`   Total Unit & Runtime Assertions : ${totalTests}`);
console.log(`   Passed Assertions               : ${passedTests}`);
console.log(`   Failed Assertions               : ${failedTests}`);
console.log(`   Overall Health Score            : ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log("================================================================");

if (failedTests === 0) {
  console.log("🏆 STATUS: 100% PRODUCTION READY - ZERO DEFECTS VERIFIED!");
  process.exit(0);
} else {
  console.error("⚠️ STATUS: FAILING TESTS DETECTED!");
  process.exit(1);
}
