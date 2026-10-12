// ==UserScript==
// @name         AnimeHay & VuiGhe VIP & Cinema Pro Suite
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Chặn 100% quảng cáo + Anti-AdBlock + M3U8 Stream Sniffer + 1-Click PotPlayer + Skip Intro 85s & Anime OLED HDR trên AnimeHay & VuiGhe
// @author       ekaznyra
// @match        *://*.animehay.tv/*
// @match        *://*.animehay.live/*
// @match        *://*.animehay.site/*
// @match        *://*.animehay.io/*
// @match        *://*.vuighe.net/*
// @match        *://*.vuighe3.com/*
// @match        *://*.vuighe.com/*
// @match        *://*.stream*.xyz/*
// @match        *://*.streamc.xyz/*
// @match        *://embed*.streamc.xyz/*
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://animehay.tv/favicon.ico
// @homepageURL  https://github.com/ekaznyra/bypass-rophim
// @downloadURL  https://raw.githubusercontent.com/ekaznyra/bypass-rophim/main/animehay.user.js
// @updateURL    https://raw.githubusercontent.com/ekaznyra/bypass-rophim/main/animehay.user.js
// ==/UserScript==

(function () {
  "use strict";

  const isEmbed = window.self !== window.top;

  if (isEmbed) {
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

    const embedStyle = document.createElement("style");
    embedStyle.textContent = `
      video.ro-enhanced-hdr {
        filter: contrast(1.12) saturate(1.30) brightness(1.05) !important;
      }
    `;
    (document.head || document.documentElement).appendChild(embedStyle);

    window.addEventListener("message", function (e) {
      if (!e.data || typeof e.data !== "object") return;
      const video = document.querySelector("video");
      if (e.data.type === "RO_CMD_SKIP_INTRO") {
        const s = e.data.seconds || 85;
        if (video) video.currentTime = Math.min(video.duration || Infinity, video.currentTime + s);
      } else if (e.data.type === "RO_CMD_SET_SPEED") {
        const speed = e.data.speed || 1;
        if (video) video.playbackRate = speed;
      } else if (e.data.type === "RO_CMD_TOGGLE_HDR") {
        if (video) video.classList.toggle("ro-enhanced-hdr");
      }
    });

    return;
  }

  // WEBSITE CHÍNH (ANIMEHAY / VUIGHE)
  let capturedStreamUrl = "";
  let currentSpeed = 1.0;
  let isHdrEnabled = false;
  let isTheaterMode = false;

  try {
    const origOpen = window.open;
    window.open = function (url) {
      if (typeof url === "string") {
        const isSafe = url.startsWith("/") || url.includes("animehay") || url.includes("vuighe") || url.includes("youtube.com");
        if (!isSafe) {
          console.log("[AnimeHay Bypass] Đã chặn popup:", url);
          return null;
        }
      }
      return origOpen.apply(this, arguments);
    };
  } catch (e) {}

  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "RO_STREAM_FOUND") {
      capturedStreamUrl = event.data.streamUrl;
      console.log("%c🎬 [AnimeHay Sniffer] M3U8 Found:", "color: #51f085;", capturedStreamUrl);
      const btn = document.getElementById("ro-potplayer-btn");
      if (btn) {
        btn.style.borderColor = "#51f085";
        btn.style.color = "#51f085";
      }
    }
  });

  function sendCommandToPlayer(cmd) {
    const video = document.querySelector("video");
    if (video) {
      if (cmd.type === "RO_CMD_SKIP_INTRO") {
        video.currentTime = Math.min(video.duration || Infinity, video.currentTime + (cmd.seconds || 85));
      } else if (cmd.type === "RO_CMD_SET_SPEED") {
        video.playbackRate = cmd.speed || 1;
      } else if (cmd.type === "RO_CMD_TOGGLE_HDR") {
        video.classList.toggle("ro-enhanced-hdr");
      }
    }
    document.querySelectorAll("iframe").forEach(f => {
      try { f.contentWindow.postMessage(cmd, "*"); } catch (e) {}
    });
  }

  const origFetch = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input?.url || "";
    if (url.includes(".m3u8") || url.includes("master") || url.includes("playlist")) {
      capturedStreamUrl = url;
      const btn = document.getElementById("ro-potplayer-btn");
      if (btn) {
        btn.style.borderColor = "#51f085";
        btn.style.color = "#51f085";
      }
    }
    return origFetch.apply(this, arguments);
  };

  const css = `
    .ad-container, .ads-holder, .banner-left, .banner-right,
    div[id*="ad-"], div[class*="banner-ads"], div[id*="catfish"],
    .ads-wrapper, #chancoc, .modal-adblock, .ah-ads, #box-ads, .ah-banner {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      pointer-events: none !important;
    }
    html, body {
      overflow: auto !important;
    }
    video.ro-enhanced-hdr {
      filter: contrast(1.12) saturate(1.30) brightness(1.05) !important;
    }
    body.ro-theater-active {
      background-color: #050608 !important;
    }
    body.ro-theater-active header,
    body.ro-theater-active footer,
    body.ro-theater-active .sidebar {
      opacity: 0.1 !important;
      transition: opacity 0.3s ease;
    }
    body.ro-theater-active header:hover,
    body.ro-theater-active footer:hover {
      opacity: 1 !important;
    }
    body.ro-theater-active .player-wrapper,
    body.ro-theater-active .player-container,
    body.ro-theater-active #player,
    body.ro-theater-active iframe {
      max-height: 88vh !important;
      box-shadow: 0 10px 50px rgba(81, 240, 133, 0.25) !important;
      border-radius: 14px;
    }

    #ro-vip-hub {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #ro-hub-toggle {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      box-shadow: 0 4px 18px rgba(16, 185, 129, 0.45);
      border: 2px solid rgba(255, 255, 255, 0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
    }
    #ro-hub-toggle:hover {
      transform: scale(1.1) rotate(10deg);
      box-shadow: 0 6px 24px rgba(16, 185, 129, 0.65);
    }
    #ro-hub-menu {
      display: none;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 12px;
      width: 280px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
      flex-direction: column;
      gap: 8px;
      color: #e2e8f0;
    }
    #ro-hub-menu.show {
      display: flex;
      animation: roFadeIn 0.2s ease-out;
    }
    @keyframes roFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .ro-menu-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #f1f5f9;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      text-align: left;
    }
    .ro-menu-btn:hover {
      background: rgba(16, 185, 129, 0.18);
      border-color: rgba(16, 185, 129, 0.4);
      transform: translateX(-2px);
    }
    .ro-toast {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 2147483647;
      background: rgba(15, 23, 42, 0.95);
      color: #51f085;
      padding: 10px 18px;
      border-radius: 10px;
      border: 1px solid rgba(81, 240, 133, 0.4);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      font-size: 14px;
      font-weight: 600;
      pointer-events: none;
      animation: roToastAnim 2.2s forwards;
    }
    @keyframes roToastAnim {
      0% { opacity: 0; transform: translateY(-10px); }
      15% { opacity: 1; transform: translateY(0); }
      80% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-10px); }
    }
  `;

  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);

  function showToast(msg) {
    const t = document.createElement("div");
    t.className = "ro-toast";
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  function skipIntro(sec = 85) {
    sendCommandToPlayer({ type: "RO_CMD_SKIP_INTRO", seconds: sec });
    showToast(`⏭️ Đã tua Intro Anime: +${sec}s`);
  }

  function toggleHdr() {
    isHdrEnabled = !isHdrEnabled;
    sendCommandToPlayer({ type: "RO_CMD_TOGGLE_HDR" });
    showToast(isHdrEnabled ? "✨ Anime OLED HDR: BẬT" : "🌑 OLED HDR: TẮT");
  }

  function toggleTheater() {
    isTheaterMode = !isTheaterMode;
    document.body.classList.toggle("ro-theater-active", isTheaterMode);
    showToast(isTheaterMode ? "🎭 Chế độ Rạp phim: BẬT" : "🎭 Chế độ Rạp phim: TẮT");
  }

  function openPotPlayer() {
    if (!capturedStreamUrl) {
      showToast("⚠️ Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    window.location.href = `potplayer://${capturedStreamUrl}`;
    showToast("🚀 Đang mở PotPlayer...");
  }

  function copyM3u8() {
    if (!capturedStreamUrl) {
      showToast("⚠️ Chưa có link M3U8, hãy bấm Play phim trước!");
      return;
    }
    navigator.clipboard.writeText(capturedStreamUrl).then(() => {
      showToast("📋 Đã copy link M3U8 vào Clipboard!");
    });
  }

  function initVipHub() {
    if (document.getElementById("ro-vip-hub")) return;
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px; color: #51f085; display: flex; justify-content: space-between;">
          <span>🌸 AnimeHay Cinema Pro</span>
          <span style="font-size: 11px; opacity: 0.7;">v1.0</span>
        </div>
        <button class="ro-menu-btn" id="ro-potplayer-btn">🚀 Mở Bằng PotPlayer</button>
        <button class="ro-menu-btn" id="ro-copym3u8-btn">📋 Sao Chép Link M3U8</button>
        <button class="ro-menu-btn" id="ro-skipintro-btn">⏭️ Bỏ Qua Intro 85s (Phím S)</button>
        <button class="ro-menu-btn" id="ro-hdr-btn">✨ Anime OLED HDR (Phím E)</button>
        <button class="ro-menu-btn" id="ro-theater-btn">🎭 Chế Độ Rạp Phim (Phím T)</button>
      </div>
      <div id="ro-hub-toggle" title="Anime Cinema Pro">👑</div>
    `;
    document.body.appendChild(hub);

    const toggle = hub.querySelector("#ro-hub-toggle");
    const menu = hub.querySelector("#ro-hub-menu");
    toggle.onclick = (e) => {
      e.stopPropagation();
      menu.classList.toggle("show");
    };
    document.addEventListener("click", () => menu.classList.remove("show"));
    menu.addEventListener("click", (e) => e.stopPropagation());

    hub.querySelector("#ro-potplayer-btn").onclick = openPotPlayer;
    hub.querySelector("#ro-copym3u8-btn").onclick = copyM3u8;
    hub.querySelector("#ro-skipintro-btn").onclick = () => skipIntro();
    hub.querySelector("#ro-hdr-btn").onclick = toggleHdr;
    hub.querySelector("#ro-theater-btn").onclick = toggleTheater;
  }

  window.addEventListener("keydown", function (e) {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
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
      toggleTheater();
    } else if (e.key === "[" || e.key === "]") {
      e.preventDefault();
      currentSpeed = e.key === "]" ? Math.min(3.0, currentSpeed + 0.25) : Math.max(0.5, currentSpeed - 0.25);
      sendCommandToPlayer({ type: "RO_CMD_SET_SPEED", speed: currentSpeed });
      showToast(`⚡ Tốc độ phát: ${currentSpeed.toFixed(2)}x`);
    }
  });

  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });

  console.log("%c🎬 AnimeHay Cinema Pro Suite Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
