// ==UserScript==
// @name         DongPhim VIP & Cinema Pro Suite
// @namespace    http://tampermonkey.net/
// @version      4.5
// @description  Chặn quảng cáo Động Phim + Bắt link M3U8 PotPlayer/VLC + Skip Intro 85s + Tăng cường màu sắc HDR & Chế độ Rạp phim
// @author       ekaznyra
// @match        *://*.dongphim.net/*
// @match        *://*.dongphym.net/*
// @match        *://*.dongphim.cc/*
// @match        *://*.dongphym.org/*
// @match        *://*.dongphim.tv/*
// @match        *://*.dongphim.me/*
// @match        *://*.dongphim.vip/*
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
// @match        *://*.turboviplay.com/*
// @match        *://*.streamtape.com/*
// @match        *://*.doodstream.com/*
// @match        *://*.dood.*/*
// @match        *://*.nguonc.com/*
// @match        *://api.nguonc.com/*
// @match        *://*.phimapi.com/*
// @match        *://player.phimapi.com/*
// @match        *://*.2embed.cc/*
// @match        *://*.2embed.to/*
// @match        *://*.vidsrc.to/*
// @match        *://*.vidsrc.me/*
// @match        *://*.streamwish.to/*
// @match        *://*.streamwish.com/*
// @match        *://*.filelions.to/*
// @match        *://*.filelions.com/*
// @allFrames    true
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://rophim1.vip/apple-icon.png
// @homepageURL  https://github.com/ekaznyra/bypass-webfilm
// @downloadURL  https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/dongphim.user.js
// @updateURL    https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/dongphim.user.js
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
    host.includes("nguonc") ||
    host.includes("phimapi") ||
    host.includes("emturbovid") ||
    host.includes("turboviplay") ||
    host.includes("dood") ||
    host.includes("streamtape") ||
    host.includes("streamwish") ||
    host.includes("filelions") ||
    path.includes("embed") ||
    path.includes("/v/");

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
      if (adNotice && video && video.duration < 120) {
        video.currentTime = video.duration || 999;
      }
      const skipBtn = document.querySelector(
        ".jw-skip, .videoAdUiSkipButton, .ytp-ad-skip-button, .skip-ad, button[class*='skip'], .ad-skip"
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
      if (url.includes(".m3u8") || url.includes("master") || url.includes("playlist") || (url.includes(".mp4") && !url.includes("preview"))) {
        try {
          window.parent.postMessage({ type: "RO_STREAM_FOUND", streamUrl: url }, "*");
        } catch (e) {}
      }
    }

    // Sniff DOM video element src
    setInterval(() => {
      const v = document.querySelector("video");
      if (v) {
        if (v.currentSrc) notifyStream(v.currentSrc);
        if (v.src) notifyStream(v.src);
      }
    }, 1500);

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
      } else if (e.data.type === "RO_CMD_SEEK") {
        const delta = e.data.delta || 0;
        if (video) video.currentTime = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + delta));
        else if (activePlayer?.seek) {
          const cur = activePlayer.getPosition ? activePlayer.getPosition() : 0;
          activePlayer.seek(Math.max(0, cur + delta));
        }
      } else if (e.data.type === "RO_CMD_SEEK_PERCENT") {
        const pct = Math.max(0, Math.min(100, e.data.percent || 0));
        if (video && video.duration) {
          video.currentTime = (video.duration * pct) / 100;
        } else if (activePlayer?.seek && activePlayer?.getDuration) {
          activePlayer.seek((activePlayer.getDuration() * pct) / 100);
        }
      } else if (e.data.type === "RO_CMD_VOLUME") {
        const vol = Math.max(0, Math.min(1, e.data.volume !== undefined ? e.data.volume : 1));
        if (video) video.volume = vol;
        else if (activePlayer?.setVolume) activePlayer.setVolume(Math.round(vol * 100));
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
      } else if (e.data.type === "RO_CMD_FULLSCREEN") {
        if (document.fullscreenElement) {
          try { document.exitFullscreen().catch(() => {}); } catch (err) {}
        } else {
          const target = video || document.body;
          if (target && target.requestFullscreen) {
            try { target.requestFullscreen().catch(() => {}); } catch (err) {}
          } else if (activePlayer?.setFullscreen) {
            activePlayer.setFullscreen(true);
          }
        }
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

  // Unblock right-click and selection blocking scripts
  ["contextmenu", "copy", "cut", "selectstart"].forEach(ev => {
    document.addEventListener(ev, e => e.stopPropagation(), true);
  });

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
          url.includes("animetvn") ||
          url.includes("hhkungfu") ||
          url.includes("hhpanda") ||
          url.includes("vietsubtv") ||
          url.includes("phim247") ||
          url.includes("phimhd") ||
          url.includes("phimbathu") ||
          url.includes("phimvang") ||
          url.includes("banhtv") ||
          url.includes("hdonline") ||
          url.includes("chillhay") ||
          url.includes("xemphimplus") ||
          url.includes("topsub") ||
          url.includes("ssphim") ||
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
  let currentVolume = 1.0;
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
      console.log("%c🎬 [Cinema Pro Sniffer] Stream luồng:", "color: #51f085;", capturedStreamUrl);
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
      } else if (cmd.type === "RO_CMD_SEEK") {
        video.currentTime = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + (cmd.delta || 0)));
      } else if (cmd.type === "RO_CMD_SEEK_PERCENT") {
        if (video.duration) video.currentTime = (video.duration * (cmd.percent || 0)) / 100;
      } else if (cmd.type === "RO_CMD_VOLUME") {
        video.volume = Math.max(0, Math.min(1, cmd.volume !== undefined ? cmd.volume : 1));
      } else if (cmd.type === "RO_CMD_SET_SPEED") {
        video.playbackRate = cmd.speed || 1;
      } else if (cmd.type === "RO_CMD_TOGGLE_HDR") {
        video.classList.toggle("ro-enhanced-hdr");
      } else if (cmd.type === "RO_CMD_TOGGLE_PLAY") {
        if (video.paused) video.play().catch(() => {});
        else video.pause();
      } else if (cmd.type === "RO_CMD_MUTE") {
        video.muted = !video.muted;
      } else if (cmd.type === "RO_CMD_FULLSCREEN") {
        if (document.fullscreenElement) {
          try { document.exitFullscreen().catch(() => {}); } catch (e) {}
        } else {
          try { video.requestFullscreen().catch(() => {}); } catch (e) {}
        }
      }
    }
    document.querySelectorAll("iframe").forEach(f => {
      try { f.contentWindow.postMessage(cmd, "*"); } catch (e) {}
    });
  }

  function checkAndCaptureUrl(url) {
    if (!url || typeof url !== "string") return;
    if (url.includes(".m3u8") || url.includes("master") || url.includes("playlist") || (url.includes(".mp4") && !url.includes("preview"))) {
      capturedStreamUrl = url;
      const btn = document.getElementById("ro-potplayer-btn");
      if (btn) {
        btn.style.borderColor = "#51f085";
        btn.style.color = "#51f085";
      }
    }
  }

  // Sniff video tag in top window
  setInterval(() => {
    const v = document.querySelector("video");
    if (v) {
      if (v.currentSrc) checkAndCaptureUrl(v.currentSrc);
      if (v.src) checkAndCaptureUrl(v.src);
    }
  }, 1500);

  // Sniff fetch trên trang chính
  const origFetchMain = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input?.url || "";
    checkAndCaptureUrl(url);
    return origFetchMain.apply(this, arguments);
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
    .atvn-ads, .hhkf-ads, .hhpanda-ads, .vst-ads, .p247-ads, .phd-ads, .pbh-ads,
    .pv-ads, .btv-ads, .hdo-ads, .chay-ads, .xpp-ads, .ts-ads, .ss-ads,
    [class*="ad_placement"], [id*="google_ads"], div[style*="z-index: 9999999"],
    div[style*="zIndex: 9999999"], div[style*="backdrop-filter: blur(25px)"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      pointer-events: none !important;
    }

    .ad-container, .ads-holder, .banner-left, .banner-right, div[id*="ad-"], div[class*="banner-ads"], div[id*="catfish"], .ads-wrapper, #chancoc, .modal-adblock, .dp-ads

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

  function seekRelative(delta = 5) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK", delta });
    showToast(delta > 0 ? `⏩ Tua tới: +${delta}s` : `⏪ Tua lùi: ${delta}s`);
  }

  function seekToPercent(pct = 0) {
    sendCommandToPlayer({ type: "RO_CMD_SEEK_PERCENT", percent: pct });
    showToast(`🎯 Vị trí video: ${pct}%`);
  }

  function adjustVolume(delta) {
    let newVol = Math.round((currentVolume + delta) * 100) / 100;
    newVol = Math.max(0, Math.min(1.0, newVol));
    currentVolume = newVol;
    sendCommandToPlayer({ type: "RO_CMD_VOLUME", volume: currentVolume });
    showToast(`🔊 Âm lượng: ${Math.round(currentVolume * 100)}%`);
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

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      try { document.exitFullscreen().catch(() => {}); } catch (e) {}
      showToast("🗗 Đã thoát Toàn màn hình");
    } else {
      const playerWrapper = document.querySelector(".player-wrapper, .player-container, #player, iframe, video");
      const target = playerWrapper || document.documentElement;
      if (target && target.requestFullscreen) {
        try { target.requestFullscreen().catch(() => {}); } catch (e) {}
      }
      sendCommandToPlayer({ type: "RO_CMD_FULLSCREEN" });
      showToast("⛶ Toàn màn hình");
    }
  }

  function openPotPlayer() {
    if (!capturedStreamUrl) {
      showToast("⚠️ Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    window.location.href = `potplayer://${capturedStreamUrl}`;
    showToast("🚀 Đang mở PotPlayer...");
  }

  function openVlcPlayer() {
    if (!capturedStreamUrl) {
      showToast("⚠️ Đang chờ bắt link video, hãy bấm Play trước!");
      return;
    }
    window.location.href = `vlc://${capturedStreamUrl}`;
    showToast("🧡 Đang mở VLC Player...");
  }

  function copyM3u8() {
    if (!capturedStreamUrl) {
      showToast("⚠️ Chưa có link video, hãy bấm Play trước!");
      return;
    }
    navigator.clipboard.writeText(capturedStreamUrl).then(() => {
      showToast("📋 Đã copy link vào Clipboard (IDM / PotPlayer)!");
    }).catch(() => {
      showToast("Link: " + capturedStreamUrl.slice(0, 40) + "...");
    });
  }

  function downloadM3uFile() {
    if (!capturedStreamUrl) {
      showToast("⚠️ Chưa có link video, hãy bấm Play trước!");
      return;
    }
    const content = `#EXTM3U\n#EXTINF:-1,Cinema Pro Stream\n${capturedStreamUrl}\n`;
    const blob = new Blob([content], { type: "audio/x-mpegurl" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `CinemaPro_${Date.now()}.m3u`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(a.href);
    }, 1000);
    showToast("💾 Đã tải file playlist .m3u!");
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
          <span>🎬 DongPhim VIP & Cinema Pro Suite</span>
          <span style="font-size: 11px; opacity: 0.7;">v4.5</span>
        </div>
        <button class="ro-menu-btn" id="ro-potplayer-btn">
          <span>🚀 Mở PotPlayer</span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-vlc-btn">
          <span>🧡 Mở VLC Player</span>
          <span class="ro-badge">Direct</span>
        </button>
        <button class="ro-menu-btn" id="ro-copym3u8-btn">
          <span>📋 Sao Chép Link Luồng</span>
          <span class="ro-badge">IDM</span>
        </button>
        <button class="ro-menu-btn" id="ro-m3ufile-btn">
          <span>💾 Tải Playlist .M3U</span>
          <span class="ro-badge">File</span>
        </button>
        <button class="ro-menu-btn" id="ro-skipintro-btn">
          <span>⏭️ Bỏ Qua Intro 85s</span>
          <span class="ro-badge">S / I</span>
        </button>
        <button class="ro-menu-btn" id="ro-fullscreen-btn">
          <span>⛶ Toàn Màn Hình</span>
          <span class="ro-badge">Phím F</span>
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
          <button class="ro-menu-btn" id="ro-vol-down" style="flex: 1; justify-content: center;" title="Giảm âm lượng">
            <span>🔉 Giảm (↓)</span>
          </button>
          <button class="ro-menu-btn" id="ro-vol-up" style="flex: 1; justify-content: center;" title="Tăng âm lượng">
            <span>🔊 Tăng (↑)</span>
          </button>
        </div>
        <div style="display: flex; gap: 8px;">
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
    bind("ro-vlc-btn", openVlcPlayer);
    bind("ro-copym3u8-btn", copyM3u8);
    bind("ro-m3ufile-btn", downloadM3uFile);
    bind("ro-skipintro-btn", () => skipIntro(85));
    bind("ro-fullscreen-btn", toggleFullscreen);
    bind("ro-hdr-btn", toggleHdr);
    bind("ro-theater-btn", toggleTheater);
    bind("ro-vol-down", () => adjustVolume(-0.05));
    bind("ro-vol-up", () => adjustVolume(0.05));
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
      skipIntro(85);
    } else if (key === "arrowleft") {
      e.preventDefault();
      seekRelative(-5);
    } else if (key === "arrowright") {
      e.preventDefault();
      seekRelative(5);
    } else if (key === "arrowup") {
      e.preventDefault();
      adjustVolume(0.05);
    } else if (key === "arrowdown") {
      e.preventDefault();
      adjustVolume(-0.05);
    } else if (key === "f") {
      e.preventDefault();
      toggleFullscreen();
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
    } else if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      seekToPercent(parseInt(e.key, 10) * 10);
    }
  });

  if (document.body) initVipHub();
  else document.addEventListener("DOMContentLoaded", initVipHub, { once: true });

  

  console.log("%c🎬 " + "DongPhim VIP & Cinema Pro Suite" + " Ready!", "font-size: 13px; font-weight: bold; color: #10b981;");
})();
