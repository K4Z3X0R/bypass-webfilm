// ==UserScript==
// @name         NangCuc TV VIP & Cinema Pro Suite
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Chặn 100% quảng cáo + Anti-AdBlock + M3U8 Stream Sniffer + 1-Click PotPlayer + Skip Intro 85s & Anime HDR trên Nắng Cực TV
// @author       ekaznyra
// @match        *://*.nangcuc.tv/*
// @match        *://*.nangcuc.net/*
// @match        *://*.nangcuc.cc/*
// @match        *://*.nangcuctv.cc/*
// @match        *://*.nangcuctv.site/*
// @match        *://*.nangcucphim.ws/*
// @match        *://*.nangcuc.com/*
// @match        *://*.nangcuc.in/*
// @match        *://*.streamc.xyz/*
// @match        *://embed*.streamc.xyz/*
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://nangcuc.tv/favicon.ico
// @homepageURL  https://github.com/ekaznyra/bypass-rophim
// @downloadURL  https://raw.githubusercontent.com/ekaznyra/bypass-rophim/main/nangcuc.user.js
// @updateURL    https://raw.githubusercontent.com/ekaznyra/bypass-rophim/main/nangcuc.user.js
// ==/UserScript==

(function () {
  "use strict";

  const isEmbed =
    window.self !== window.top ||
    location.hostname.includes("streamc") ||
    location.hostname.includes("embed");

  if (isEmbed) {
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
        if (stack.includes("guard") || stack.includes("stopPlayback") || stack.includes("adError")) {
          return;
        }
        return origPause.apply(this, arguments);
      };
    } catch (e) {}

    const embedStyle = document.createElement("style");
    embedStyle.textContent = `
      #stream-guard, #stream-guard-card, .stream-guard, div[id*="stream-guard"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      video.ro-enhanced-hdr {
        filter: contrast(1.08) saturate(1.22) brightness(1.03) !important;
      }
    `;
    (document.head || document.documentElement).appendChild(embedStyle);

    function notifyStream(url) {
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
      notifyStream(url);
      return origFetch.apply(this, arguments);
    };

    const OrigXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function () {
      const xhr = new OrigXHR();
      const origOpen = xhr.open;
      xhr.open = function (m, u) {
        notifyStream(u);
        return origOpen.apply(this, arguments);
      };
      return xhr;
    };

    window.addEventListener("message", function (e) {
      if (!e.data || typeof e.data !== "object") return;
      const video = document.querySelector("video");
      if (e.data.type === "RO_CMD_SKIP_INTRO") {
        const s = e.data.seconds || 85;
        if (video) video.currentTime = Math.min(video.duration || Infinity, video.currentTime + s);
        else if (activePlayer?.seek) activePlayer.seek(activePlayer.getPosition() + s);
      } else if (e.data.type === "RO_CMD_SET_SPEED") {
        const speed = e.data.speed || 1;
        if (video) video.playbackRate = speed;
        else if (activePlayer?.setPlaybackRate) activePlayer.setPlaybackRate(speed);
      } else if (e.data.type === "RO_CMD_TOGGLE_HDR") {
        if (video) video.classList.toggle("ro-enhanced-hdr");
      }
    });

    return;
  }

  // ═══════════════════════════════════════════════════════════════
  // 🛡️ 2. WEBSITE CHÍNH (NẮNG CỰC TV) - BANNER & POPUP KILLER
  // ═══════════════════════════════════════════════════════════════

  let capturedStreamUrl = "";
  let currentSpeed = 1.0;
  let isHdrEnabled = false;
  let isTheaterMode = false;

  try {
    const origOpen = window.open;
    window.open = function (url) {
      if (typeof url === "string") {
        const isSafe = url.startsWith("/") || url.includes("nangcuc") || url.includes("youtube.com");
        if (!isSafe) {
          console.log("[NangCuc Bypass] Đã chặn popup:", url);
          return null;
        }
      }
      return origOpen.apply(this, arguments);
    };
  } catch (e) {}

  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "RO_STREAM_FOUND") {
      capturedStreamUrl = event.data.streamUrl;
      console.log("%c🎬 [NangCuc Sniffer] M3U8 Found:", "color: #51f085;", capturedStreamUrl);
      const btn = document.getElementById("ro-potplayer-btn");
      if (btn) {
        btn.style.borderColor = "#51f085";
        btn.style.color = "#51f085";
      }
    }
  });

  function sendCommandToPlayer(cmd) {
    document.querySelectorAll("iframe").forEach(f => {
      try { f.contentWindow.postMessage(cmd, "*"); } catch (e) {}
    });
  }

  const css = `
    .ad-banner, .banner-ads, #box-ads, div[id*="ad_"], div[class*="ad_box"],
    .ads-placement, #catfish, .modal-adblock, div[style*="z-index: 9999999"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      pointer-events: none !important;
    }
    html, body {
      overflow: auto !important;
    }
    body.ro-theater-active {
      background-color: #050608 !important;
    }
    body.ro-theater-active header,
    body.ro-theater-active footer,
    body.ro-theater-active .sidebar,
    body.ro-theater-active .content-right {
      opacity: 0.1 !important;
      transition: opacity 0.3s ease;
    }
    body.ro-theater-active header:hover,
    body.ro-theater-active footer:hover {
      opacity: 1 !important;
    }
    body.ro-theater-active .player,
    body.ro-theater-active #player-holder,
    body.ro-theater-active iframe {
      max-height: 88vh !important;
      box-shadow: 0 10px 50px rgba(81, 240, 133, 0.25) !important;
      border-radius: 14px;
    }

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
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(245, 158, 11, 0.45);
      cursor: pointer;
      font-size: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      user-select: none;
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
    }
    #ro-vip-menu.active { display: flex; }
    .ro-menu-title {
      font-size: 13px;
      font-weight: 700;
      color: #f59e0b;
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
    }
    .ro-menu-btn:hover {
      background: rgba(245, 158, 11, 0.15);
      border-color: #f59e0b;
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
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #f59e0b;
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
    #ro-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  `;

  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);

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
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function toggleTheaterMode() {
    isTheaterMode = !isTheaterMode;
    document.body.classList.toggle("ro-theater-active", isTheaterMode);
    showToast(isTheaterMode ? "🎭 Đã bật Chế độ Rạp phim (Theater Mode)" : "🎭 Đã tắt Chế độ Rạp phim");
  }

  function toggleHdr() {
    isHdrEnabled = !isHdrEnabled;
    sendCommandToPlayer({ type: "RO_CMD_TOGGLE_HDR" });
    showToast(isHdrEnabled ? "✨ Đã bật Bộ lọc Anime OLED (HDR)" : "✨ Đã tắt Bộ lọc màu");
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
      showToast("⏳ Hãy bấm phát video trước để lấy luồng M3U8!");
      return;
    }
    showToast("🚀 Đang mở luồng stream bằng PotPlayer...");
    window.location.href = `potplayer://${capturedStreamUrl}`;
  }

  function copyM3u8() {
    if (!capturedStreamUrl) {
      showToast("⏳ Hãy bấm phát video trước để lấy luồng M3U8!");
      return;
    }
    navigator.clipboard.writeText(capturedStreamUrl).then(() => {
      showToast("📋 Đã sao chép Link M3U8 vào Clipboard!");
    }).catch(() => {
      showToast("Link M3U8: " + capturedStreamUrl.slice(0, 40) + "...");
    });
  }

  function initVipHub() {
    if (document.getElementById("ro-vip-hub")) return;
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = `
      <div id="ro-vip-hub-btn" title="Nắng Cực VIP Control Hub">☀️</div>
      <div id="ro-vip-menu">
        <div class="ro-menu-title">
          <span>🎬 NẮNG CỰC CINEMA PRO</span>
          <span style="font-size: 10px; color: #a1a1aa;">v1.0</span>
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

    const hubBtn = document.getElementById("ro-vip-hub-btn");
    const menu = document.getElementById("ro-vip-menu");
    hubBtn.addEventListener("click", () => menu.classList.toggle("active"));
    document.addEventListener("click", (e) => {
      if (!hub.contains(e.target)) menu.classList.remove("active");
    });

    document.getElementById("ro-skip-btn").addEventListener("click", skipIntro);
    document.getElementById("ro-hdr-btn").addEventListener("click", toggleHdr);
    document.getElementById("ro-theater-btn").addEventListener("click", toggleTheaterMode);
    document.getElementById("ro-potplayer-btn").addEventListener("click", openInPotPlayer);
    document.getElementById("ro-copy-btn").addEventListener("click", copyM3u8);
    document.getElementById("ro-speed-down").addEventListener("click", () => adjustSpeed(-1));
    document.getElementById("ro-speed-up").addEventListener("click", () => adjustSpeed(1));
  }

  window.addEventListener("keydown", function (e) {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea") return;

    const key = e.key.toLowerCase();
    if (key === "s" || key === "i") { e.preventDefault(); skipIntro(); }
    else if (key === "e") { e.preventDefault(); toggleHdr(); }
    else if (key === "t") { e.preventDefault(); toggleTheaterMode(); }
    else if (e.key === "[") { e.preventDefault(); adjustSpeed(-1); }
    else if (e.key === "]") { e.preventDefault(); adjustSpeed(1); }
  });

  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });

  console.log("%c🎬 NangCuc TV VIP & Cinema Pro Suite Active!", "color: #f59e0b; font-weight: bold;");
})();
