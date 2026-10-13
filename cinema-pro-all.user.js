// ==UserScript==
// @name         Cinema Pro Suite (All-In-One) - Kho Phim & Anime Việt Nam
// @namespace    http://tampermonkey.net/
// @version      4.5
// @description  Bản Master Gộp Tất Cả Trong Một: Mở khóa VIP + Vô hạn Coin + Chặn 100% AdBlock/Stream Guard + M3U8 Sniffer + 1-Click PotPlayer + Skip Intro 85s & Anime HDR trên Rổ Phim, Motchill, Nắng Cực, AnimeVietsub, PhimMoi, HoatHinh3D, Động Phim, TVHay, AnimeHay, BiluTV, SubNhanh, Mọt Phim, Mê Phim, Ghiền Phim, FullPhim, PhimHay!
// @author       ekaznyra
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
// @match        *://*.phimmotchill.online/*
// @match        *://*.motchill.online/*
// @match        *://*.motchilltv.org/*
// @match        *://*.motchilltv.com/*
// @match        *://*.phimmotchill.com/*
// @match        *://*.phimmotchill.run/*
// @match        *://*.phimmotchill.me/*
// @match        *://*.motchill.moe/*
// @match        *://*.motchilli.com/*
// @match        *://*.motchilli.vip/*
// @match        *://*.nangcuc.tv/*
// @match        *://*.nangcuc.net/*
// @match        *://*.nangcuc.cc/*
// @match        *://*.nangcuctv.cc/*
// @match        *://*.nangcuctv.site/*
// @match        *://*.nangcucphim.ws/*
// @match        *://*.animevietsub.moe/*
// @match        *://*.animevietsub.link/*
// @match        *://*.animevietsub.global/*
// @match        *://*.animevietsub.net/*
// @match        *://*.animevietsub.online/*
// @match        *://*.animevietsub.tv/*
// @match        *://*.subnhanh.org/*
// @match        *://*.subnhanh.com/*
// @match        *://*.subnhanh.vip/*
// @match        *://*.subnhanh.online/*
// @match        *://*.subnhanh.site/*
// @match        *://*.subnhanh.tv/*
// @match        *://*.phimmoiyyy.net/*
// @match        *://*.phimmoichill.net/*
// @match        *://*.phimmoichill.tv/*
// @match        *://*.phimmoichilla.net/*
// @match        *://*.phimmoii.org/*
// @match        *://*.phimmoi.net/*
// @match        *://*.phimmoiz.net/*
// @match        *://*.phimmoivn.net/*
// @match        *://*.hoathinh3d.biz/*
// @match        *://*.hoathinh3d.com/*
// @match        *://*.hoathinh3d.site/*
// @match        *://*.hoathinh3d.vip/*
// @match        *://*.hoathinh3d.org/*
// @match        *://*.hoathinh3d.tv/*
// @match        *://*.dongphim.net/*
// @match        *://*.dongphym.net/*
// @match        *://*.dongphim.cc/*
// @match        *://*.dongphym.org/*
// @match        *://*.dongphim.tv/*
// @match        *://*.dongphim.me/*
// @match        *://*.tvhay.site/*
// @match        *://*.tvhay.org/*
// @match        *://*.tvhay.co/*
// @match        *://*.tvhay.cc/*
// @match        *://*.tvhay.tv/*
// @match        *://*.tvhay.live/*
// @match        *://*.animehay.tv/*
// @match        *://*.animehay.live/*
// @match        *://*.animehay.site/*
// @match        *://*.animehay.io/*
// @match        *://*.vuighe.net/*
// @match        *://*.vuighe3.com/*
// @match        *://*.vuighe.com/*
// @match        *://*.bilutv.live/*
// @match        *://*.bilutva.com/*
// @match        *://*.bilutv.link/*
// @match        *://*.bilutv.net/*
// @match        *://*.bilutv.pro/*
// @match        *://*.bilutv.top/*
// @match        *://*.phim1080z.org/*
// @match        *://*.phim1080.net/*
// @match        *://*.phim1080.me/*
// @match        *://*.phim1080.vip/*
// @match        *://*.phim1080.org/*
// @match        *://*.xemphim.tv/*
// @match        *://*.xemphim.in/*
// @match        *://*.xemphim.club/*
// @match        *://*.xemphim.fun/*
// @match        *://*.xemphim.vip/*
// @match        *://*.xemphim.org/*
// @match        *://*.anime47.net/*
// @match        *://*.anime47.com/*
// @match        *://*.anime47.tv/*
// @match        *://*.anime47.top/*
// @match        *://*.anime47.org/*
// @match        *://*.ophim.cc/*
// @match        *://*.ophim.live/*
// @match        *://*.kkphim.com/*
// @match        *://*.ophim1.com/*
// @match        *://*.ophim.org/*
// @match        *://*.biphim.net/*
// @match        *://*.biphim.co/*
// @match        *://*.phimchill.tv/*
// @match        *://*.phimchill.net/*
// @match        *://*.donghuatv.com/*
// @match        *://*.donghua.tv/*
// @match        *://*.donghuatv.net/*
// @match        *://*.donghuatv.top/*
// @match        *://*.motphim.to/*
// @match        *://*.motphimtv.me/*
// @match        *://*.motphimtv.top/*
// @match        *://*.motphim.net/*
// @match        *://*.mephimtv.com/*
// @match        *://*.mephim.net/*
// @match        *://*.mephim.tv/*
// @match        *://*.ghienphim.net/*
// @match        *://*.ghienphim.tv/*
// @match        *://*.ghienphim.org/*
// @match        *://*.fullphim.net/*
// @match        *://*.fullphim.tv/*
// @match        *://*.fullphim.org/*
// @match        *://*.phimhay.co/*
// @match        *://*.phimhay.net/*
// @match        *://*.phimhay.tv/*
// @match        *://*.streamc.xyz/*
// @match        *://embed*.streamc.xyz/*
// @match        *://*.stream*.xyz/*
// @match        *://*.stream*.top/*
// @match        *://*.stream*.net/*
// @match        *://*.stream*.org/*
// @match        *://*.stream*.cc/*
// @match        *://*.stream*.co/*
// @match        *://*.goatembed.com/*
// @match        *://*.emturbovid.com/*
// @match        *://*.streamtape.com/*
// @match        *://*.doodstream.com/*
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://rophim1.vip/apple-icon.png
// @homepageURL  https://github.com/ekaznyra/bypass-rophim
// @downloadURL  https://raw.githubusercontent.com/ekaznyra/bypass-rophim/main/cinema-pro-all.user.js
// @updateURL    https://raw.githubusercontent.com/ekaznyra/bypass-rophim/main/cinema-pro-all.user.js
// ==/UserScript==

(function () {
  "use strict";

  const host = location.hostname || "";
  const path = location.pathname || "";
  const isEmbedPlayer =
    window.self !== window.top ||
    host.includes("streamc") ||
    host.includes("embed") ||
    host.includes("goatembed") ||
    path.includes("embed");

  // ═══════════════════════════════════════════════════════════════
  // ⚡ 1. IFRAME EMBED PLAYER GUARD KILLER & STREAM SNIFFER
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
          return;
        }
        return origPause.apply(this, arguments);
      };
    } catch (e) {}

    // Auto-skip video pre-roll ad in player iframe
    setInterval(() => {
      const video = document.querySelector("video");
      const adNotice = document.querySelector(
        ".jw-ad-notice, .jw-ad-countdown, .ad-showing, .video-ads, .ad-interrupting, [class*='ad-countdown']"
      );
      if (adNotice && video && video.duration < 90) {
        video.currentTime = video.duration || 999;
      }
      const skipBtn = document.querySelector(
        ".jw-skip, .videoAdUiSkipButton, .ytp-ad-skip-button, .skip-ad, button[class*='skip']"
      );
      if (skipBtn && typeof skipBtn.click === "function") {
        try { skipBtn.click(); } catch (e) {}
      }
    }, 400);

    const embedStyle = document.createElement("style");
    embedStyle.textContent = `
      #stream-guard, #stream-guard-card, .stream-guard, div[id*="stream-guard"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      video.ro-enhanced-hdr {
        filter: contrast(1.10) saturate(1.25) brightness(1.04) !important;
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
      } else if (e.data.type === "RO_CMD_TOGGLE_PLAY") {
        if (video) {
          if (video.paused) video.play().catch(() => {});
          else video.pause();
        } else if (activePlayer?.play && activePlayer?.pause) {
          if (activePlayer.getState && activePlayer.getState() === "playing") activePlayer.pause();
          else activePlayer.play();
        }
      } else if (e.data.type === "RO_CMD_MUTE") {
        if (video) video.muted = !video.muted;
        else if (activePlayer?.setMute) activePlayer.setMute(!activePlayer.getMute());
      }
    });

    return;
  }

  // ═══════════════════════════════════════════════════════════════
  // 🛡️ 2. WEBSITE CHÍNH - ANTI-ADBLOCK, PROBE DEFUSER & POPUP TRAP
  // ═══════════════════════════════════════════════════════════════
  try {
    localStorage.setItem("ro_probe_", "9999999999999");
    const origSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "probe_until" || key === "adblock_detected") return;
      return origSetItem.apply(this, arguments);
    };
  } catch (e) {}

  try {
    const origOpen = window.open;
    window.open = function (url) {
      if (typeof url === "string") {
        const isSafe =
          url.startsWith("/") ||
          url.includes(location.hostname) ||
          url.includes("rophim") ||
          url.includes("motchill") ||
          url.includes("nangcuc") ||
          url.includes("animevietsub") ||
          url.includes("subnhanh") ||
          url.includes("phimmoi") ||
          url.includes("hoathinh3d") ||
          url.includes("dongphim") ||
          url.includes("tvhay") ||
          url.includes("animehay") ||
          url.includes("vuighe") ||
          url.includes("bilutv") ||
          url.includes("motphim") ||
          url.includes("mephim") ||
          url.includes("ghienphim") ||
          url.includes("fullphim") ||
          url.includes("phimhay") ||
          url.includes("youtube.com") ||
          url.includes("youtu.be");
        if (!isSafe) {
          console.log("[Cinema Pro] Đã chặn popup quảng cáo:", url);
          return null;
        }
      }
      return origOpen.apply(this, arguments);
    };
  } catch (e) {}

  // ═══════════════════════════════════════════════════════════════
  // 📺 3. M3U8 SNIFFER & POSTMESSAGE BRIDGE
  // ═══════════════════════════════════════════════════════════════
  let capturedStreamUrl = "";
  let currentSpeed = 1.0;
  let isHdrEnabled = false;
  let isTheaterMode = false;

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
      console.log("%c🎬 [Cinema Pro Sniffer] M3U8 Stream:", "color: #51f085;", capturedStreamUrl);
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
      } else if (cmd.type === "RO_CMD_TOGGLE_PLAY") {
        if (video.paused) video.play().catch(() => {});
        else video.pause();
      } else if (cmd.type === "RO_CMD_MUTE") {
        video.muted = !video.muted;
      }
    }
    document.querySelectorAll("iframe").forEach(f => {
      try { f.contentWindow.postMessage(cmd, "*"); } catch (e) {}
    });
  }

  function checkAndCaptureUrl(url) {
    if (!url || typeof url !== "string") return;
    if (url.includes(".m3u8") || url.includes("master") || url.includes("playlist")) {
      capturedStreamUrl = url;
      const btn = document.getElementById("ro-potplayer-btn");
      if (btn) {
        btn.style.borderColor = "#51f085";
        btn.style.color = "#51f085";
      }
    }
  }

  // Sniff fetch trên trang chính
  const origFetchMain = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input?.url || "";
    checkAndCaptureUrl(url);
    return handleRophimFetchResponse(origFetchMain.apply(this, arguments), url);
  };

  const origXhrMain = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
    const xhr = new origXhrMain();
    const origOpen = xhr.open;
    let targetUrl = "";
    xhr.open = function (m, u) {
      targetUrl = u || "";
      checkAndCaptureUrl(targetUrl);
      return origOpen.apply(this, arguments);
    };
    
    const origSend = xhr.send;
    xhr.send = function () {
      this.addEventListener("load", function () {
        handleRophimXhrResponse(xhr, targetUrl);
      }, { once: true });
      return origSend.apply(this, arguments);
    };
    
    return xhr;
  };

  // ═══════════════════════════════════════════════════════════════
  // 🎨 4. CSS DỌN SẠCH QUẢNG CÁO & THEATER MODE TOÀN TRANG
  // ═══════════════════════════════════════════════════════════════
  const css = `
    /* Xóa sạch mọi banner quảng cáo */
    .ad-container, .ads-holder, .banner-left, .banner-right,
    div[id*="ad-"], div[class*="banner-ads"], div[id*="catfish"],
    .ads-wrapper, #chancoc, .modal-adblock, .adv-holder, .pm-ads,
    .hh3d-ads, .dp-ads, .tvhay-ads, .ah-ads, #box-ads, .ah-banner,
    .bl-ads, .a47-ads, .ophim-ads, .biphim-ads, .dhtv-ads,
    .motphim-ads, .mephim-ads, .ghienphim-ads, .fullphim-ads, .phimhay-ads,
    [class*="ad_placement"], [id*="google_ads"], div[style*="z-index: 9999999"],
    div[style*="zIndex: 9999999"], div[style*="backdrop-filter: blur(25px)"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      pointer-events: none !important;
    }

    
      :root {
        --primary-color: #51f085 !important;
        --primary-text: #51f085 !important;
      }
      .dev.dev-up { color: #51f085 !important; }
      .tag-imdb { border: 1px solid #51f085 !important; }
      .tag-imdb:before { color: #51f085 !important; }
      .app-box-fix { display: none !important; }
    

    html, body {
      overflow: auto !important;
      position: static !important;
    }

    video.ro-enhanced-hdr {
      filter: contrast(1.10) saturate(1.25) brightness(1.04) !important;
    }

    body.ro-theater-active {
      background-color: #050608 !important;
    }
    body.ro-theater-active header,
    body.ro-theater-active footer,
    body.ro-theater-active .sidebar,
    body.ro-theater-active .sidebar-right,
    body.ro-theater-active nav {
      opacity: 0.1 !important;
      transition: opacity 0.3s ease;
    }
    body.ro-theater-active header:hover,
    body.ro-theater-active footer:hover,
    body.ro-theater-active nav:hover {
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

    /* VIP Floating Control Hub */
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
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.45);
      border: 2px solid rgba(255, 255, 255, 0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
    }
    #ro-hub-toggle:hover {
      transform: scale(1.1) rotate(10deg);
      box-shadow: 0 6px 26px rgba(16, 185, 129, 0.65);
    }
    #ro-hub-menu {
      display: none;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 14px;
      width: 290px;
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
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #f1f5f9;
      padding: 9px 12px;
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
    .ro-badge {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: #a1a1aa;
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
    showToast(`⏭️ Đã tua Intro: +${sec}s`);
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
    }).catch(() => {
      showToast("Link M3U8: " + capturedStreamUrl.slice(0, 40) + "...");
    });
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

  function initVipHub() {
    if (document.getElementById("ro-vip-hub")) return;
    const hub = document.createElement("div");
    hub.id = "ro-vip-hub";
    hub.innerHTML = `
      <div id="ro-hub-menu">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px; color: #51f085; display: flex; justify-content: space-between;">
          <span>🎬 Cinema Pro (All-In-One)</span>
          <span style="font-size: 11px; opacity: 0.7;">v4.5</span>
        </div>
        <button class="ro-menu-btn" id="ro-potplayer-btn">
          <span>🚀 Mở Bằng PotPlayer</span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-copym3u8-btn">
          <span>📋 Sao Chép Link M3U8</span>
          <span class="ro-badge">IDM</span>
        </button>
        <button class="ro-menu-btn" id="ro-skipintro-btn">
          <span>⏭️ Bỏ Qua Intro 85s</span>
          <span class="ro-badge">Phím S</span>
        </button>
        <button class="ro-menu-btn" id="ro-hdr-btn">
          <span>✨ Anime OLED HDR</span>
          <span class="ro-badge">Phím E</span>
        </button>
        <button class="ro-menu-btn" id="ro-theater-btn">
          <span>🎭 Chế Độ Rạp Phim</span>
          <span class="ro-badge">Phím T</span>
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
      <div id="ro-hub-toggle" title="Cinema Pro Control Hub">👑</div>
    `;
    document.body.appendChild(hub);

    const toggle = hub.querySelector("#ro-hub-toggle");
    const menu = hub.querySelector("#ro-hub-menu");
    if (toggle && menu) {
      toggle.onclick = (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
      };
      document.addEventListener("click", () => menu.classList.remove("show"));
      menu.addEventListener("click", (e) => e.stopPropagation());
    }

    const bind = (id, fn) => {
      const el = hub.querySelector("#" + id) || document.getElementById(id);
      if (el) el.addEventListener("click", fn);
    };

    bind("ro-potplayer-btn", openPotPlayer);
    bind("ro-copym3u8-btn", copyM3u8);
    bind("ro-skipintro-btn", () => skipIntro());
    bind("ro-hdr-btn", toggleHdr);
    bind("ro-theater-btn", toggleTheater);
    bind("ro-speed-down", () => adjustSpeed(-1));
    bind("ro-speed-up", () => adjustSpeed(1));
  }

  // Phím tắt toàn cục
  window.addEventListener("keydown", function (e) {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) return;
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
    } else if (e.key === "[") {
      e.preventDefault();
      adjustSpeed(-1);
    } else if (e.key === "]") {
      e.preventDefault();
      adjustSpeed(1);
    } else if (e.key === " " && !e.repeat) {
      e.preventDefault();
      sendCommandToPlayer({ type: "RO_CMD_TOGGLE_PLAY" });
    } else if (key === "m") {
      e.preventDefault();
      sendCommandToPlayer({ type: "RO_CMD_MUTE" });
    }
  });

  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });

  
  // ═══════════════════════════════════════════════════════════════
  // 🎯 LAYER 5: VIP 2099 & T-COIN RESPONSE PATCHER (ROPHIM API)
  // ═══════════════════════════════════════════════════════════════
  const VIP_EXPIRY_DATE = new Date(2099, 6, 18, 0, 0, 0);
  const VIP_EXPIRY_TIMESTAMP = Math.floor(VIP_EXPIRY_DATE.getTime() / 1000);
  const COIN_BALANCE = 999999999;
  const ROPHIM_KEYWORDS = [
    "/baseapi/api/v1/tcoin/me",
    "/baseapi/api/v1/user/",
    "/baseapi/api/v1/vip/",
    "/api/auth/session",
    "api.rophim1.vip",
    "rophimapi.net"
  ];

  function isRophimTarget(url) {
    if (!url || typeof url !== "string") return false;
    return ROPHIM_KEYWORDS.some(k => url.includes(k));
  }

  function patchRophimData(data, url) {
    if (!data || typeof data !== "object") return data;
    if (url && url.includes("/tcoin/me")) {
      data.thungBalance = COIN_BALANCE;
      data.balance = COIN_BALANCE;
      data.coin_balance = COIN_BALANCE;
      data.total = COIN_BALANCE;
      return data;
    }
    if (url && (url.includes("/api/auth/session") || url.includes("/user/profile") || url.includes("/user/info"))) {
      if (!data.user) data.user = {};
      data.user.is_vip = true;
      data.user.vip_expires_at = VIP_EXPIRY_TIMESTAMP;
      data.user.thungBalance = COIN_BALANCE;
      data.user.coin_balance = COIN_BALANCE;
      data.user.role = "VIP";
      data.expires = VIP_EXPIRY_DATE.toISOString();
      return data;
    }
    const recurse = obj => {
      if (!obj || typeof obj !== "object") return;
      if ("is_vip" in obj || "vip_expires_at" in obj || "coin_balance" in obj || "thungBalance" in obj) {
        obj.is_vip = true;
        obj.vip_expires_at = VIP_EXPIRY_TIMESTAMP;
        obj.coin_balance = COIN_BALANCE;
        obj.thungBalance = COIN_BALANCE;
      }
      if (obj.result) recurse(obj.result);
      if (obj.user) recurse(obj.user);
      if (obj.data) recurse(obj.data);
    };
    recurse(data);
    return data;
  }

  async function handleRophimFetchResponse(resPromise, url) {
    const res = await resPromise;
    if (!isRophimTarget(url)) return res;
    try {
      const ct = res.headers.get("content-type");
      if (!ct || !ct.includes("application/json")) return res;
      const clone = res.clone();
      const data = await clone.json();
      const patched = patchRophimData(data, url);
      return new Response(JSON.stringify(patched), {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers
      });
    } catch (e) {
      return res;
    }
  }

  function handleRophimXhrResponse(xhr, url) {
    if (!isRophimTarget(url)) return;
    try {
      const ct = xhr.getResponseHeader("content-type");
      if (!ct || !ct.includes("application/json")) return;
      const data = JSON.parse(xhr.responseText);
      const patched = patchRophimData(data, url);
      const str = JSON.stringify(patched);
      Object.defineProperty(xhr, "responseText", { value: str, configurable: true, writable: true });
      Object.defineProperty(xhr, "response", { value: str, configurable: true, writable: true });
    } catch (e) {}
  }
  

  console.log("%c🎬 " + "Cinema Pro Suite (All-In-One) - Kho Phim & Anime Việt Nam" + " Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
