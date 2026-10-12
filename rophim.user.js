// ==UserScript==
// @name         Rophim VIP & Cinema Pro Suite
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  Mở khóa VIP 2099 + Vô hạn Coin + Chặn 100% AdBlock/Player Guard + M3U8 Sniffer + 1-Click PotPlayer + Phím tắt Skip Intro & Anime HDR
// @author       ekaznyra (Based on tearrs)
// @match        *://rophim1.vip/*
// @match        *://www.rophim1.vip/*
// @match        *://rophim1.cc/*
// @match        *://www.rophim1.cc/*
// @match        *://rophim1.co/*
// @match        *://www.rophim1.co/*
// @match        *://rophimx.net/*
// @match        *://www.rophimx.net/*
// @match        *://rophim.ws/*
// @match        *://www.rophim.ws/*
// @match        *://rophim.li/*
// @match        *://www.rophim.li/*
// @match        *://rophim.me/*
// @match        *://www.rophim.me/*
// @match        *://rophim.mx/*
// @match        *://www.rophim.mx/*
// @match        *://*.streamc.xyz/*
// @match        *://embed*.streamc.xyz/*
// @match        *://*.stream*.xyz/*
// @match        *://*.stream*.top/*
// @match        *://*.stream*.net/*
// @match        *://*.stream*.org/*
// @match        *://*.stream*.cc/*
// @match        *://*.stream*.co/*
// @match        *://*.goatembed.com/*
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://rophim1.vip/apple-icon.png
// @homepageURL  https://github.com/ekaznyra/bypass-rophim
// @downloadURL  https://raw.githubusercontent.com/ekaznyra/bypass-rophim/main/rophim.user.js
// @updateURL    https://raw.githubusercontent.com/ekaznyra/bypass-rophim/main/rophim.user.js
// ==/UserScript==

// ═══════════════════════════════════════════════════════════════
// 🎬 Rophim VIP & Cinema Pro Suite v3.5 (Ultimate Edition)
// ═══════════════════════════════════════════════════════════════
//
// Features:
//  ✅ VIP vĩnh viễn đến 18/07/2099 (49 năm!)
//  ✅ 999,999,999 Coin & TCoin (thungBalance)
//  ✅ Chặn 100% cảnh báo AdBlock / Cốc Cốc trên Website & Iframe Player
//  ✅ ⏭️ Bỏ qua Intro bài hát mở đầu (+85s) chỉ với 1 phím [S]
//  ✅ 📺 M3U8 Stream Sniffer: Bắt link luồng stream, mở trực tiếp bằng PotPlayer / VLC
//  ✅ ✨ Anime OLED HDR Enhancer: Bộ lọc màu phim rực rỡ, độ tương phản cao với phím [E]
//  ✅ 🎭 Chế độ Rạp phim Theater Mode: Làm tối giao diện xung quanh với phím [T]
//  ✅ ⚡ Điều chỉnh tốc độ phát mượt mà: phím [ (chậm) và phím ] (nhanh)
//  ✅ 👑 Menu điều khiển Floating VIP Hub sang trọng góc màn hình
//
// Repository: https://github.com/z3rokaze/bypass-rophim
// ═══════════════════════════════════════════════════════════════

(function () {
  "use strict";

  const isEmbedPlayer =
    window.self !== window.top ||
    (location.hostname || "").includes("streamc") ||
    (location.hostname || "").includes("embed") ||
    (location.hostname || "").includes("goatembed") ||
    (location.pathname || "").includes("embed");

  // ═══════════════════════════════════════════════════════════════
  // ⚡ IFRAME EMBED PLAYER GUARD KILLER & STREAM SNIFFER
  // ═══════════════════════════════════════════════════════════════
  if (isEmbedPlayer) {
    let activePlayer = null;
    const dummyGuard = {
      version: "guard-25",
      status: () => ({ blocked: false, antiAdblock: false, action: "none" }),
      ready: Promise.resolve(),
      isBlocked: () => false,
      reportAdResource: () => {},
      waitForAccess: () => Promise.resolve(),
      registerPlayer: (player) => {
        activePlayer = player;
        if (player && typeof player.play === "function") {
          setTimeout(() => {
            try { player.play(); } catch (e) {}
          }, 300);
        }
      }
    };

    try {
      Object.defineProperty(window, "streamGuard", {
        value: dummyGuard,
        writable: false,
        configurable: false
      });
    } catch (e) {
      window.streamGuard = dummyGuard;
    }

    try {
      const origPause = HTMLMediaElement.prototype.pause;
      HTMLMediaElement.prototype.pause = function () {
        const stack = new Error().stack || "";
        if (
          stack.includes("guard") ||
          stack.includes("stopPlayback") ||
          stack.includes("adError") ||
          stack.includes("stream-guard")
        ) {
          console.log("[Rophim Bypass] Đã chặn Guard tạm dừng video");
          return;
        }
        return origPause.apply(this, arguments);
      };
    } catch (e) {}

    const embedStyle = document.createElement("style");
    embedStyle.textContent = `
      #stream-guard,
      #stream-guard-card,
      .stream-guard-card,
      .stream-guard,
      #stream-guard-message,
      #stream-guard-title,
      .stream-guard-actions,
      div[id*="stream-guard"],
      div[class*="stream-guard"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        z-index: -99999 !important;
      }
      #player, .jwplayer, video {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }
      video.ro-enhanced-hdr {
        filter: contrast(1.08) saturate(1.22) brightness(1.03) !important;
        transition: filter 0.3s ease;
      }
    `;
    (document.head || document.documentElement).appendChild(embedStyle);

    function notifyParentStream(url) {
      if (!url || typeof url !== "string") return;
      if (url.includes(".m3u8") || url.includes("master") || url.includes("playlist")) {
        try {
          window.parent.postMessage({ type: "RO_STREAM_FOUND", streamUrl: url }, "*");
        } catch (e) {}
      }
    }

    const origFetch = window.fetch;
    window.fetch = async function (input, init) {
      const url = typeof input === "string" ? input : input?.url || "";
      notifyParentStream(url);
      return origFetch.apply(this, arguments);
    };

    const OrigXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function () {
      const xhr = new OrigXHR();
      const origOpen = xhr.open;
      xhr.open = function (m, u) {
        notifyParentStream(u);
        return origOpen.apply(this, arguments);
      };
      return xhr;
    };

    window.addEventListener("message", function (e) {
      if (!e.data || typeof e.data !== "object") return;

      const video = document.querySelector("video");
      if (e.data.type === "RO_CMD_SKIP_INTRO") {
        const skipSec = e.data.seconds || 85;
        if (video) video.currentTime = Math.min(video.duration || Infinity, video.currentTime + skipSec);
        else if (activePlayer?.seek) activePlayer.seek(activePlayer.getPosition() + skipSec);
      } else if (e.data.type === "RO_CMD_SET_SPEED") {
        const speed = e.data.speed || 1;
        if (video) video.playbackRate = speed;
        else if (activePlayer?.setPlaybackRate) activePlayer.setPlaybackRate(speed);
      } else if (e.data.type === "RO_CMD_TOGGLE_HDR") {
        if (video) video.classList.toggle("ro-enhanced-hdr");
      }
    });

    console.log("%c🎬 Stream Guard Bypassed in Player Iframe!", "color: #51f085; font-weight: bold;");
    return;
  }

  // ═══════════════════════════════════════════════════════════════
  // 🌟 LOGIC WEBSITE CHÍNH (ROPHIM1.VIP / ROPHIM1.CC / ROPHIM1.CO)
  // ═══════════════════════════════════════════════════════════════

  const VIP_EXPIRY_DATE = new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = 999999999;
  const FUTURE_PROBE_TIMESTAMP = "9999999999999";
  let capturedStreamUrl = "";
  let currentSpeed = 1.0;
  let isHdrEnabled = false;
  let isTheaterMode = false;

  // ═══════════════════════════════════════════════════════════════
  // 🛡️ LAYER 1: PARENT TO IFRAME POSTMESSAGE COMMUNICATOR
  // ═══════════════════════════════════════════════════════════════
  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "stream-guard-hello") {
      try {
        event.source.postMessage({
          type: "stream-parent-state",
          version: event.data.version || 25,
          id: event.data.id,
          helperVersion: "guard-5",
          hasAdblock: false,
          key: "ok"
        }, "*");
      } catch (err) {}
    } else if (event.data && event.data.type === "RO_STREAM_FOUND") {
      capturedStreamUrl = event.data.streamUrl;
      console.log("%c🎬 [Rophim Sniffer] Đã tóm được Link M3U8:", "color: #51f085; font-weight: bold;", capturedStreamUrl);
      updateHudStreamLink(capturedStreamUrl);
    }
  });

  function sendCommandToPlayer(cmd) {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach(f => {
      try {
        f.contentWindow.postMessage(cmd, "*");
      } catch (e) {}
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 🛡️ LAYER 2: ANTI-ADBLOCK & STORAGE SPOOFING
  // ═══════════════════════════════════════════════════════════════
  try {
    window.localStorage.removeItem("probe_until");
    window.localStorage.setItem("ro_probe_", FUTURE_PROBE_TIMESTAMP);
    window.sessionStorage.setItem("ro_ad_cap_toast_v1", "current");
    window.sessionStorage.setItem("popupBannerCount", "999");
  } catch (e) {}

  try {
    const origGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key) {
      if (key === "probe_until") return null;
      if (key === "ro_probe_") return FUTURE_PROBE_TIMESTAMP;
      return origGetItem.apply(this, arguments);
    };

    const origSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "probe_until") return;
      return origSetItem.apply(this, arguments);
    };
  } catch (e) {}

  const coccocProps = ["disableCCYTAdblockByFeature", "disableCCYTAdblockByQAMode"];
  coccocProps.forEach(prop => {
    try {
      delete document[prop];
      Object.defineProperty(document, prop, {
        get: () => undefined,
        configurable: true
      });
    } catch (e) {}
  });

  // ═══════════════════════════════════════════════════════════════
  // 🛡️ LAYER 3: AD PROBE SPOOFER & POPUP KILLER
  // ═══════════════════════════════════════════════════════════════
  const PROBE_PATTERNS = [
    "googlesyndication.com",
    "amazon-adsystem.com",
    "taboola.com",
    "facebook.net",
    "ads-twitter.com"
  ];

  function isAdProbeUrl(url) {
    if (typeof url !== "string") return false;
    return PROBE_PATTERNS.some(p => url.includes(p));
  }

  try {
    const origCreateElement = document.createElement.bind(document);
    document.createElement = function (tagName, options) {
      const el = origCreateElement(tagName, options);
      if (tagName && tagName.toLowerCase() === "script") {
        const origSetAttribute = el.setAttribute.bind(el);
        el.setAttribute = function (name, val) {
          if (name === "src" && isAdProbeUrl(val)) {
            setTimeout(() => {
              if (typeof el.onload === "function") el.onload(new Event("load"));
            }, 10);
          }
          return origSetAttribute(name, val);
        };

        let scriptSrc = "";
        Object.defineProperty(el, "src", {
          get: () => scriptSrc,
          set: function (val) {
            scriptSrc = val;
            if (isAdProbeUrl(val)) {
              setTimeout(() => {
                if (typeof el.onload === "function") el.onload(new Event("load"));
              }, 10);
            }
            origSetAttribute("src", val);
          },
          configurable: true
        });
      }
      return el;
    };
  } catch (e) {}

  try {
    document.cookie = "popunderShown=true; path=/; max-age=86400";
  } catch (e) {}

  window.__roCatfishAdBlockUntil = Date.now() + 864000000000;
  window.RoAdRotator = {
    init: () => {},
    run: () => {},
    start: () => {},
    stop: () => {}
  };

  try {
    const origOpen = window.open;
    window.open = function (url, target, features) {
      if (typeof url === "string") {
        const isSafe =
          url.startsWith("/") ||
          url.includes("rophim") ||
          url.includes("youtube.com") ||
          url.includes("youtu.be");
        if (!isSafe) {
          console.log("[Rophim Bypass] Popup QC bị chặn:", url);
          return null;
        }
      }
      return origOpen.apply(this, arguments);
    };
  } catch (e) {}

  // ═══════════════════════════════════════════════════════════════
  // 🎨 LAYER 4: CUSTOM CSS & THEATER / CINEMA MODE
  // ═══════════════════════════════════════════════════════════════
  const css = `
    html, body {
      overflow: auto !important;
      position: static !important;
    }

    div[style*="z-index: 9999999"],
    div[style*="zIndex: 9999999"],
    div[style*="z-index:9999999"],
    div[style*="backdrop-filter: blur(25px)"],
    div[style*="backdropFilter: blur(25px)"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      z-index: -99999 !important;
    }

    :root {
      --primary-color: #51f085 !important;
      --primary-text: #51f085 !important;
    }
    .dev.dev-up {
      color: #51f085 !important;
    }
    .tag-imdb {
      border: 1px solid #51f085 !important;
    }
    .tag-imdb:before {
      color: #51f085 !important;
    }
    .app-box-fix {
      display: none !important;
    }

    /* Rạp Phim Siêu Cấp (Theater Mode) */
    body.ro-theater-active {
      background-color: #050608 !important;
    }
    body.ro-theater-active header,
    body.ro-theater-active footer,
    body.ro-theater-active .sidebar,
    body.ro-theater-active .comment-section {
      opacity: 0.1 !important;
      transition: opacity 0.3s ease;
    }
    body.ro-theater-active header:hover,
    body.ro-theater-active footer:hover {
      opacity: 1 !important;
    }
    body.ro-theater-active .ratio-16x9 {
      max-height: 88vh !important;
      box-shadow: 0 10px 50px rgba(81, 240, 133, 0.25) !important;
      border-radius: 14px;
      transition: all 0.3s ease;
    }

    /* VIP Floating Control Hub */
    #ro-vip-hub {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #ro-vip-hub-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(16, 185, 129, 0.45);
      cursor: pointer;
      font-size: 20px;
      transition: transform 0.2s, box-shadow 0.2s;
      border: 2px solid rgba(255, 255, 255, 0.3);
      user-select: none;
    }
    #ro-vip-hub-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 24px rgba(16, 185, 129, 0.65);
    }
    #ro-vip-menu {
      position: absolute;
      bottom: 58px;
      right: 0;
      width: 290px;
      background: rgba(18, 20, 26, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 14px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75);
      color: #fff;
      display: none;
      flex-direction: column;
      gap: 10px;
      animation: ro-fade-in 0.2s ease-out;
    }
    #ro-vip-menu.active {
      display: flex;
    }
    .ro-menu-title {
      font-size: 13px;
      font-weight: 700;
      color: #51f085;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 8px;
    }
    .ro-menu-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      color: #e4e4e7;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .ro-menu-btn:hover {
      background: rgba(81, 240, 133, 0.15);
      border-color: #51f085;
      color: #fff;
    }
    .ro-badge {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: #a1a1aa;
    }
    #ro-toast {
      position: fixed;
      top: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(81, 240, 133, 0.4);
      color: #51f085;
      padding: 10px 22px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.6);
      z-index: 10000000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s, transform 0.25s;
    }
    #ro-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    @keyframes ro-fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  let cssInjected = false;
  function injectCSSOnce() {
    if (cssInjected) return;
    cssInjected = true;
    const style = document.createElement("style");
    style.id = "rophim-vip-style";
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  if (document.head || document.documentElement) injectCSSOnce();
  else document.addEventListener("DOMContentLoaded", injectCSSOnce, { once: true });

  // ═══════════════════════════════════════════════════════════════
  // 🌟 LAYER 5: PRO VIP HUD & KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════════════════════
  let toastTimer = null;
  function showToast(msg) {
    let t = document.getElementById("ro-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "ro-toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.classList.remove("show");
    }, 2200);
  }

  function toggleTheaterMode() {
    isTheaterMode = !isTheaterMode;
    document.body.classList.toggle("ro-theater-active", isTheaterMode);
    showToast(isTheaterMode ? "🎭 Đã bật Chế độ Rạp phim (Theater Mode)" : "🎭 Đã tắt Chế độ Rạp phim");
  }

  function toggleHdr() {
    isHdrEnabled = !isHdrEnabled;
    sendCommandToPlayer({ type: "RO_CMD_TOGGLE_HDR" });
    showToast(isHdrEnabled ? "✨ Đã bật Bộ lọc màu Anime OLED (HDR)" : "✨ Đã tắt Bộ lọc màu");
  }

  function skipIntro() {
    sendCommandToPlayer({ type: "RO_CMD_SKIP_INTRO", seconds: 85 });
    showToast("⏭️ Đã tua qua Intro 85 giây");
  }

  function adjustSpeed(delta) {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0];
    let idx = speeds.indexOf(currentSpeed);
    if (idx === -1) idx = 2;
    idx = Math.max(0, Math.min(speeds.length - 1, idx + delta));
    currentSpeed = speeds[idx];
    sendCommandToPlayer({ type: "RO_CMD_SET_SPEED", speed: currentSpeed });
    showToast(`⚡ Tốc độ phát: ${currentSpeed}x`);
  }

  function openInPotPlayer() {
    if (!capturedStreamUrl) {
      showToast("⏳ Đang dò tìm luồng M3U8... Vui lòng bấm phát video trước!");
      return;
    }
    showToast("🚀 Đang mở luồng stream bằng PotPlayer...");
    window.location.href = `potplayer://${capturedStreamUrl}`;
  }

  function copyM3u8() {
    if (!capturedStreamUrl) {
      showToast("⏳ Chưa bắt được luồng stream, hãy bấm Play video trước!");
      return;
    }
    navigator.clipboard.writeText(capturedStreamUrl).then(() => {
      showToast("📋 Đã sao chép Link M3U8 vào Clipboard!");
    }).catch(() => {
      showToast("Link M3U8: " + capturedStreamUrl.slice(0, 40) + "...");
    });
  }

  function updateHudStreamLink(url) {
    const btn = document.getElementById("ro-potplayer-btn");
    if (btn) {
      btn.style.borderColor = "#51f085";
      btn.style.color = "#51f085";
    }
  }

  function initVipHub() {
    if (document.getElementById("ro-vip-hub")) return;
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = `
      <div id="ro-vip-hub-btn" title="Rophim VIP Control Hub">👑</div>
      <div id="ro-vip-menu">
        <div class="ro-menu-title">
          <span>🎬 ROPHIM VIP PRO SUITE</span>
          <span style="font-size: 10px; color: #a1a1aa;">v3.5</span>
        </div>
        <button class="ro-menu-btn" id="ro-skip-btn">
          <span>⏭️ Bỏ qua Intro bài hát (+85s)</span>
          <span class="ro-badge">Phím S</span>
        </button>
        <button class="ro-menu-btn" id="ro-hdr-btn">
          <span>✨ Anime OLED HDR Enhancer</span>
          <span class="ro-badge">Phím E</span>
        </button>
        <button class="ro-menu-btn" id="ro-theater-btn">
          <span>🎭 Chế độ Rạp phim (Theater)</span>
          <span class="ro-badge">Phím T</span>
        </button>
        <button class="ro-menu-btn" id="ro-potplayer-btn">
          <span>📺 Mở bằng PotPlayer (Direct)</span>
          <span class="ro-badge">M3U8</span>
        </button>
        <button class="ro-menu-btn" id="ro-copy-btn">
          <span>📋 Sao chép Link M3U8 Stream</span>
          <span class="ro-badge">IDM</span>
        </button>
        <div style="display: flex; gap: 8px; margin-top: 4px;">
          <button class="ro-menu-btn" id="ro-speed-down" style="flex: 1; justify-content: center;">
            <span>➖ Chậm ([)</span>
          </button>
          <button class="ro-menu-btn" id="ro-speed-up" style="flex: 1; justify-content: center;">
            <span>➕ Nhanh (])</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(hub);

    const hubBtn = hub.querySelector("#ro-vip-hub-btn") || document.getElementById("ro-vip-hub-btn");
    const menu = hub.querySelector("#ro-vip-menu") || document.getElementById("ro-vip-menu");

    if (hubBtn && menu) {
      hubBtn.addEventListener("click", () => menu.classList.toggle("active"));
      document.addEventListener("click", (e) => {
        if (!hub.contains(e.target)) menu.classList.remove("active");
      });
    }

    const bind = (id, fn) => {
      const el = hub.querySelector("#" + id) || document.getElementById(id);
      if (el) el.addEventListener("click", fn);
    };

    bind("ro-skip-btn", skipIntro);
    bind("ro-hdr-btn", toggleHdr);
    bind("ro-theater-btn", toggleTheaterMode);
    bind("ro-potplayer-btn", openInPotPlayer);
    bind("ro-copy-btn", copyM3u8);
    bind("ro-speed-down", () => adjustSpeed(-1));
    bind("ro-speed-up", () => adjustSpeed(1));
  }

  window.addEventListener("keydown", function (e) {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea") return;

    const key = e.key.toLowerCase();
    if (key === "s" || key === "i") {
      e.preventDefault();
      skipIntro();
    } else if (key === "e") {
      e.preventDefault();
      toggleHdr();
    } else if (key === "t") {
      e.preventDefault();
      toggleTheaterMode();
    } else if (e.key === "[") {
      e.preventDefault();
      adjustSpeed(-1);
    } else if (e.key === "]") {
      e.preventDefault();
      adjustSpeed(1);
    }
  });

  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });

  // ═══════════════════════════════════════════════════════════════
  // 🎯 LAYER 6: VIP & T-COIN BACKEND RESPONSE PATCHER
  // ═══════════════════════════════════════════════════════════════
  const TARGET_KEYWORDS = [
    "/baseapi/api/v1/tcoin/me",
    "/baseapi/api/v1/user/",
    "/baseapi/api/v1/vip/",
    "/api/auth/session",
    "api.rophim1.vip",
    "rophimapi.net/v1/user/info",
    "rophimapi.net/v1/user/updateProfile",
    "rophimapi.net/v1/auth/login",
    "rophimapi.net/v1/user/profile",
    "rophimapi.net/v1/vip/check",
    "rophimapi.net/v1/vip/status",
    "rophimapi.net/v2/user/info",
    "rophimapi.net/v2/user/profile"
  ];

  function isTargetUrl(url) {
    if (!url || typeof url !== "string") return false;
    for (let i = 0; i < TARGET_KEYWORDS.length; i++) {
      if (url.includes(TARGET_KEYWORDS[i])) return true;
    }
    return false;
  }

  function patchUserInfo(data, url) {
    if (!data || typeof data !== "object") return data;

    if (url && url.includes("/tcoin/me")) {
      data.thungBalance = COIN_BALANCE;
      data.balance = COIN_BALANCE;
      data.coin_balance = COIN_BALANCE;
      data.total = COIN_BALANCE;
      return data;
    }

    if (url && url.includes("/api/auth/session")) {
      if (data.user) {
        data.user.is_vip = true;
        data.user.vip_expires_at = VIP_EXPIRY_TIMESTAMP;
        data.user.thungBalance = COIN_BALANCE;
        data.user.coin_balance = COIN_BALANCE;
        data.user.role = "VIP";
      }
      data.expires = VIP_EXPIRY_DATE.toISOString();
      return data;
    }

    const patchObject = obj => {
      if (!obj || typeof obj !== "object") return;

      if (
        "is_vip" in obj ||
        "vip_expires_at" in obj ||
        "coin_balance" in obj ||
        "thungBalance" in obj ||
        "user" in obj
      ) {
        obj.is_vip = true;
        obj.vip_expires_at = VIP_EXPIRY_TIMESTAMP;
        obj.coin_balance = COIN_BALANCE;
        obj.thungBalance = COIN_BALANCE;
      }

      if (obj.result && typeof obj.result === "object") patchObject(obj.result);
      if (obj.user && typeof obj.user === "object") patchObject(obj.user);
      if (obj.data && typeof obj.data === "object") patchObject(obj.data);
    };

    patchObject(data);
    injectCSSOnce();
    return data;
  }

  async function handleJsonResponse(res, url) {
    if (!isTargetUrl(url)) return res;

    try {
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) return res;

      const clone = res.clone();
      const data = await clone.json();
      const patched = patchUserInfo(data, url);

      return new Response(JSON.stringify(patched), {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers
      });
    } catch (error) {
      return res;
    }
  }

  const realFetch = window.fetch;
  window.fetch = async function (input, init) {
    let url = "";
    try {
      url = typeof input === "string" ? input : input?.url || "";
    } catch (e) {
      url = "";
    }

    const res = await realFetch.apply(this, arguments);
    return handleJsonResponse(res, url);
  };

  const RealXHR = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
    const xhr = new RealXHR();
    let targetUrl = "";

    const origOpen = xhr.open;
    xhr.open = function (method, url, async, user, pass) {
      targetUrl = url || "";
      return origOpen.apply(this, arguments);
    };

    const origSend = xhr.send;
    xhr.send = function () {
      const loadHandler = function () {
        if (!isTargetUrl(targetUrl)) return;

        try {
          const contentType = xhr.getResponseHeader("content-type");
          if (!contentType?.includes("application/json")) return;

          const data = JSON.parse(xhr.responseText);
          const patched = patchUserInfo(data, targetUrl);
          const patchedText = JSON.stringify(patched);

          Object.defineProperty(xhr, "responseText", {
            writable: true,
            configurable: true,
            value: patchedText
          });
          Object.defineProperty(xhr, "response", {
            writable: true,
            configurable: true,
            value: patchedText
          });
        } catch (error) {}
      };

      this.addEventListener("load", loadHandler, { once: true });
      return origSend.apply(this, arguments);
    };

    return xhr;
  };

  console.log(
    "%c🎬 Rophim VIP & Cinema Pro Suite v3.5 Ready!",
    "font-size: 14px; font-weight: bold; color: #51f085;"
  );
})();
