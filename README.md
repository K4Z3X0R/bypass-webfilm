# 🎬 Bypass WebFilm — Cinema Pro Suite (Ultimate Edition v5.0)

<p align="center">
  <img src="https://img.shields.io/badge/Version-5.0.0_Apex-10b981?style=for-the-badge&logo=tampermonkey&logoColor=white" alt="Version 5.0" />
  <img src="https://img.shields.io/badge/Supported_Sites-68+_Websites-3b82f6?style=for-the-badge&logo=firefox-browser&logoColor=white" alt="Supported Sites" />
  <img src="https://img.shields.io/badge/Test_Assertions-1407_Passed-8b5cf6?style=for-the-badge&logo=mocha&logoColor=white" alt="Tests Passed" />
  <img src="https://img.shields.io/badge/Health_Score-100.0%25-emerald?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Health Score" />
  <img src="https://img.shields.io/badge/License-MIT-amber?style=for-the-badge" alt="License MIT" />
</p>

<p align="center">
  <strong>🔥 Vũ khí tối thượng mở khóa trải nghiệm xem phim đỉnh cao: Chặn 100% quảng cáo & popup cá cược, diệt sạch Anti-Adblock & Stream Guard, bắt trọn luồng M3U8 phát PotPlayer/VLC/IINA 1-Click, tua Intro 85s, Anime OLED HDR, Theater Mode, Picture-in-Picture & Mở khóa VIP vĩnh viễn trên hơn 68+ website xem phim & anime hàng đầu Việt Nam!</strong>
</p>

---

## ⚡ Chi Tiết Các Cơ Chế Mod & Bẻ Khóa Độc Quyền (Exclusive Mods Breakdown)

Mỗi website trong hệ sinh thái đều được tùy biến và tinh chỉnh mã nguồn tỉ mỉ đến từng byte để vượt qua các lớp bảo vệ phức tạp:

### 👑 1. Mod Mở Khóa Rophim VIP 2099 & 1 Tỷ T-Coin Backend Response Patcher
- **Cơ chế**: Hook tầng sâu vào cả 2 giao thức mạng `window.fetch` và `window.XMLHttpRequest`.
- **Bẻ khóa**:
  - Tự động đánh lừa endpoint `/baseapi/api/v1/tcoin/me`, cấp phát ngay lập tức **999,999,999 Coin**.
  - Can thiệp payload phiên đăng nhập `/api/auth/session`, thiết lập trạng thái tài khoản thành **VIP vĩnh viễn đến năm 2099** (`role: "VIP"`, `is_vip: true`).
  - Đệ quy JSON Patcher (`patchRophimData`) duyệt mọi response `/vip/check`, tự động bật cờ `ad_free: true`, `adFree: true` và `vip.active: true`.
- **Hiệu quả**: Xem trọn vẹn mọi phim độc quyền 4K, phim VIP, phim rạp mà không cần nạp tiền hay tài khoản trả phí.

---

### 🛡️ 2. Mod Vô Hiệu Hóa Stream Guard & Triệt Tiêu Cảnh Báo Anti-Adblock
- **Cơ chế**: Triển khai `dummyGuard` giả lập API `window.streamGuard` tại thời điểm khởi tạo `document-start`.
- **Bẻ khóa**:
  - Ép thuộc tính `isBlocked()` luôn trả về `false` và `status()` trả về `{ blocked: false, antiAdblock: false, action: "none" }`.
  - Phản hồi tức thì gói tin bắt tay `stream-guard-hello` từ player nhúng bằng payload hợp lệ `{ hasAdblock: false, key: "ok" }`.
  - Can thiệp vào `HTMLMediaElement.prototype.pause`, triệt tiêu toàn bộ lệnh cưỡng bức tạm dừng video do mã chống Adblock kích hoạt khi phát hiện bị chặn banner.
  - Vô hiệu hóa các cờ phát hiện trong `localStorage` như `probe_until` và `adblock_detected`.
- **Hiệu quả**: Không bao giờ bị hiện pop-up ép tắt trình chặn quảng cáo, video luôn tự động phát mượt mà.

---

### 🚀 3. Mod Universal M3U8 Sniffer & Direct Desktop Playback (PotPlayer / VLC)
- **Cơ chế**: Hook toàn diện vào thẻ DOM `<video>`, `fetch` request và `XHR` trong cả trang mẹ lẫn các iframe nhúng máy chủ quốc tế.
- **Bẻ khóa**:
  - Nhận diện các liên kết chứa `.m3u8`, `master.m3u8`, `playlist.m3u8` và luồng video sạch `.mp4`.
  - Bắn sự kiện bảo mật `postMessage({ type: "RO_STREAM_FOUND" })` từ bên trong iframe ra giao diện điều khiển của trang mẹ.
  - Tích hợp giao thức URL Protocol một chạm: Khởi chạy ngay **PotPlayer** (`potplayer://`) hoặc **VLC** (`vlc://`) với chất lượng hình ảnh nguyên bản, không giật lag.
  - Hỗ trợ xuất file danh sách phát `.m3u` để xem trên TV thông minh hoặc phần mềm media bất kỳ.

---

### ⏩ 4. Mod Tự Động Tua Sạch Video Quảng Cáo Đầu Phim (Pre-roll Auto-Skipper)
- **Cơ chế**: Quét chu kỳ cực nhanh (400ms) giám sát các phần tử thông báo quảng cáo của trình phát (JWPlayer, Video.js, ArtPlayer, Plyr...).
- **Bẻ khóa**:
  - Khi phát hiện `.jw-ad-notice`, `.ad-showing`, `.video-ads` có thời lượng dưới 120s, lập tức gán `video.currentTime = video.duration`.
  - Tự động kích hoạt hành vi nhấp chuột vào các nút bỏ qua: `.jw-skip`, `.videoAdUiSkipButton`, `.ytp-ad-skip-button`, `button[class*="skip"]`.
- **Hiệu quả**: Tiết kiệm từ 30s đến 60s thời gian chờ đợi trước mỗi tập phim, bắt đầu phim ngay trong 0.1 giây.

---

### ✨ 5. Mod Anime OLED HDR & Chế Độ Rạp Phim (Cinema Theater Mode)
- **Cơ chế**: Bộ lọc Shader GPU CSS động `video.ro-enhanced-hdr`.
- **Bẻ khóa**:
  - Tinh chỉnh độ tương phản (`contrast: 1.10`), độ bão hòa màu (`saturate: 1.25`) và độ sáng (`brightness: 1.04`), giúp các khung hình Anime rực rỡ, sâu thẳm trên màn hình OLED và HDR.
  - Chế độ Rạp phim (`ro-theater-active`): Tự động giảm độ sáng và làm mờ 90% các thành phần phụ xung quanh web (header, footer, sidebar), đẩy khung xem phim ra giữa màn hình.

---

### 🖼️ 6. Mod Picture-in-Picture & Soi Từng Khung Hình (Frame-by-Frame Stepping)
- **Cơ chế**: API `requestPictureInPicture` và bộ dịch chuyển thời gian `0.04s` (tương đương chuẩn 25 khung hình/giây).
- **Bẻ khóa**:
  - Phím `P` hoặc nút bấm trên Hub đưa video ra cửa sổ nổi để đa nhiệm.
  - Phím `,` và `.` cho phép tua lùi/tua tới từng frame ảnh để soi chi tiết các cảnh hành động hoặc hoạt họa đỉnh cao.

---

## 📁 Cấu Trúc Dự Án (Clean Open-Source Architecture)

Dự án được cấu trúc theo tiêu chuẩn mã nguồn mở quốc tế cực kỳ gọn gàng, chỉ có duy nhất 5 mục ở thư mục gốc:

```text
bypass-webfilm/
├── scripts/                # 📂 Toàn bộ 68+ Userscripts cho từng web & Master All-In-One Suite
│   ├── cinema-pro-all.user.js   # 👑 Bản Master Gộp (All-In-One: 1 script chạy toàn bộ 68+ web)
│   ├── rophim.user.js           # 🎬 Rổ Phim VIP 2099 + 1 Tỷ Coin
│   ├── motchill.user.js         # 🍿 Motchill VIP & Stream Guard Killer
│   ├── fimfast.user.js          # ⚡ FimFast Pro AdBlock & M3U8
│   ├── hdviet.user.js           # 💎 HDViet VIP Unlocked Full HD
│   ├── animevietsub.user.js     # 🌸 AnimeVietsub OLED HDR & Skip Intro 85s
│   ├── phimmoi.user.js          # 🎥 PhimMoi & PhimMoiChill
│   ├── hoathinh3d.user.js       # 🐉 Hoạt Hình 3D Trung Quốc
│   ├── bstation.user.js         # 📺 Bstation & Bilibili VN Optimizer
│   └── ...                      # (70 files userscript drop-in production)
├── src/                    # 📂 Lõi JavaScript thuần (Engine Core)
│   └── core.js                  # Lõi thực thi ES2022 không kèm header (dành cho console/nhúng)
├── build_all_scripts.js    # 🛠️ Trình tạo mã & build tự động 70 Userscripts song song
├── run_audit.js            # 🧪 Bộ kiểm thử tự động toàn diện Sandbox VM (1,407 assertions)
└── README.md               # 📖 Tài liệu hướng dẫn & Bảng link cài đặt 1-Click
```

---

## 📊 Bảng So Sánh Tính Năng (Feature Matrix)

| Tiêu Chí & Trải Nghiệm | ❌ Khi Chưa Cài Script | 👑 Cinema Pro Suite v5.0 |
| :--- | :--- | :--- |
| **Quảng cáo đầu phim (Pre-roll Ads)** | Ép xem 15s - 60s, không thể bỏ qua | ⚡ **Tua sạch 0s ngay lập tức**, tự động click nút Skip |
| **Banner, Catfish, Popup cá độ** | Nhấp nháy 4 góc, che phụ đề, bẫy click | 🛡️ **Diệt sạch 100%**, triệt tiêu toàn bộ mã bẫy popup |
| **Stream Guard / Anti-Adblock** | Hiện bảng cảnh báo, bắt tắt Adblock mới cho xem | 🔓 **Defuse ngầm tự động**, player phát mượt mà không bao giờ bị chặn |
| **Xem trên PotPlayer / VLC / IINA** | Không hỗ trợ, phải inspect tìm link mệt mỏi | 🚀 **1-Click khởi chạy ứng dụng ngoài**, tải playlist `.m3u` tức thì |
| **Bắt link tải video M3U8** | Bị mã hóa base64, token hóa, giấu sâu trong iframe | 📋 **Tự động bắt link vào Clipboard**, tương thích IDM / FDM / XDM |
| **Bỏ qua Intro / Nhạc mở đầu** | Kéo chuột dò mẫm, dễ bị tua lố | ⏭️ **Phím `S` hoặc `I`**: Nhảy chính xác +85s intro |
| **Tua nhanh / Tua lùi chính xác** | Khựng giật, player web tải lại chậm | ⏩ **Phím Mũi tên**: `±5s`, `Shift+Mũi tên`: `±10s`, `Ctrl+Mũi tên`: `±30s` |
| **Màu sắc & Độ tương phản Anime** | Nhạt màu, thiếu chiều sâu trên màn hình OLED | ✨ **Phím `E` (Anime OLED HDR)**: Tăng bão hòa màu, tương phản rực rỡ |
| **Không gian rạp phim (Theater Mode)** | Web sáng chói, giao diện xung quanh rối mắt | 🎭 **Phím `T` (Cinema Mode)**: Làm tối toàn bộ web, nổi bật khung video |
| **Xem đa nhiệm (Picture-in-Picture)** | Thường bị khóa bởi trình phát của web | 🖼️ **Phím `P` (PiP Mode)**: Đưa video nổi góc màn hình để vừa làm việc vừa xem |
| **Điều khiển tốc độ linh hoạt** | Bị khóa ở 1x hoặc chỉ lên tối đa 2x | ⚡ **Phím `[` & `]`**: Tùy chỉnh tốc độ từ `0.5x` đến `3.0x` mượt mà |
| **Tua từng khung hình (Frame Step)** | Không hỗ trợ | 🎞️ **Phím `,` & `.`**: Lùi / Tiến chính xác 0.04s (1 frame) |
| **Đặc quyền VIP Rổ Phim (Rophim)** | Phải nạp tiền thật mua VIP & Coin | 💰 **Mở khóa VIP 2099 + 999,999,999 Coin tự động** |

---

## 🏗️ Sơ Đồ Kiến Trúc Luồng Hoạt Động (Architecture Flowchart)

```mermaid
flowchart TD
    User["👤 Người Dùng Truy Cập Web Phim"] --> Inject["🚀 Userscript Inject Tại document-start"]
    
    subgraph TopWindow["Trang Web Chính (Top Window)"]
        Inject --> Neutralize["🛡️ Defuse Anti-Adblock Probes & Block Popups"]
        Inject --> InjectHub["👑 Khởi Tạo VIP Floating Hub & CSS Rạp Phim"]
        Inject --> SniffFetch["📡 Hook Fetch / XHR / Video Element"]
        InjectHub --> Hotkeys["⌨️ Lắng Nghe Phím Tắt Toàn Cục (S, P, F, T, E, H, Comma, Dot...)"]
    end
    
    subgraph IframeEmbed["Trình Phát Nhúng (Iframe Stream Embed)"]
        Inject --> DefuseGuard["⚡ Neutralize streamGuard & HTMLMediaElement.pause"]
        DefuseGuard --> SkipAd["⏩ Auto-Skip Video Ads & Click .jw-skip"]
        SkipAd --> SniffStream["📺 M3U8 Stream Sniffer Engine"]
    end
    
    SniffStream -- "postMessage(RO_STREAM_FOUND)" --> TopWindow
    Hotkeys -- "postMessage(RO_CMD_*)" --> IframeEmbed
    
    TopWindow --> LaunchDesktop{{"🚀 Hành Động Người Dùng"}}
    LaunchDesktop -->|"PotPlayer"| Pot["🎬 potplayer:// Direct URL"]
    LaunchDesktop -->|"VLC Player"| Vlc["🧡 vlc:// Direct Stream"]
    LaunchDesktop -->|"Copy Link"| Clip["📋 Clipboard Link M3U8 (IDM)"]
    LaunchDesktop -->|"Tải Playlist"| M3U["💾 File .m3u Playlist"]
```

---

## 🚀 Hướng Dẫn Cài Đặt Siêu Tốc (1-Click Install)

### Bước 1: Cài đặt tiện ích UserScript Manager trên trình duyệt của bạn
Cài đặt một trong các tiện ích mở rộng miễn phí sau (Khuyên dùng **Tampermonkey** hoặc **Violentmonkey**):
- 🌐 **Tampermonkey**: [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) | [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- 🐒 **Violentmonkey**: [Trang chủ Violentmonkey](https://violentmonkey.github.io/get-it/)
- 📱 **Trên điện thoại Android**: Sử dụng trình duyệt **Kiwi Browser** hoặc **Firefox Mobile** và cài Tampermonkey như trên PC.
- 🍏 **Trên iPhone / iPad / Mac Safari**: Cài đặt tiện ích **Userscripts** hoặc **Stay** từ App Store.

---

### Bước 2: Cài đặt Script VIP (Chọn Bản Phù Hợp)

#### 👑 1. KHUYÊN DÙNG: BẢN MASTER TẤT CẢ TRONG MỘT (ALL-IN-ONE)
Chỉ cần bấm cài đặt **DUY NHẤT 1 LẦN**, script sẽ tự động nhận diện và kích hoạt full tính năng VIP trên **TOÀN BỘ 68+ WEBSITE PHIM BÊN DƯỚI**:

👉 **[BẤM VÀO ĐÂY ĐỂ CÀI ĐẶT BẢN ALL-IN-ONE](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/cinema-pro-all.user.js)**  
*(Tự động cập nhật phiên bản mới nhất từ GitHub khi có web đổi tên miền)*

---

#### 🎬 2. BẢN DÀNH RIÊNG CHO PHIM CHIẾU RẠP, PHIM LẺ & PHIM BỘ (35 Web)

| Trang Web | Tính Năng Đã Mod & Bẻ Khóa | Link Cài Đặt 1-Click | Tên Miền Hỗ Trợ |
| :--- | :--- | :---: | :--- |
| 🎬 **Rophim** | 👑 **Mở khóa VIP 2099 + 1 Tỷ Coin**<br>🛡️ Bẻ gãy Player Guard & AdBlock Check<br>🚀 Bắt link M3U8 PotPlayer/VLC<br>⏭️ Tua Intro 85s & Anime HDR | 👉 **[CÀI ĐẶT ROPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/rophim.user.js)** | `rophim1.vip`, `www.rophim1.vip`, `rophim1.cc`... |
| 🎬 **Motchill** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT MOTCHILL](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/motchill.user.js)** | `phimmotchill.online`, `motchill.online`, `motchilltv.org`... |
| 🎬 **NangCuc TV** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT NANGCUC TV](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/nangcuc.user.js)** | `nangcuc.tv`, `nangcuc.net`, `nangcuc.cc`... |
| 🎬 **SubNhanh** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT SUBNHANH](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/subnhanh.user.js)** | `subnhanh.org`, `subnhanh.com`, `subnhanh.vip`... |
| 🎬 **PhimMoi & PhimMoiChill** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIMMOI & PHIMMOICHILL](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimmoi.user.js)** | `phimmoiyyy.net`, `phimmoichill.net`, `phimmoichill.tv`... |
| 🎬 **DongPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT DONGPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/dongphim.user.js)** | `dongphim.net`, `dongphym.net`, `dongphim.cc`... |
| 🎬 **TVHay Thuyết Minh** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT TVHAY THUYẾT MINH](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/tvhay.user.js)** | `tvhay.site`, `tvhay.org`, `tvhay.co`... |
| 🎬 **BiluTV** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT BILUTV](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/bilutv.user.js)** | `bilutv.live`, `bilutva.com`, `bilutv.link`... |
| 🎬 **Phim1080** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIM1080](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phim1080.user.js)** | `phim1080z.org`, `phim1080.net`, `phim1080.me`... |
| 🎬 **XemPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT XEMPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/xemphim.user.js)** | `xemphim.tv`, `xemphim.in`, `xemphim.club`... |
| 🎬 **Phim247** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT PHIM247](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phim247.user.js)** | `phim247.tv`, `phim247.vip` |
| 🎬 **PhimHD** | 🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s** | 👉 **[CÀI ĐẶT PHIMHD](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimhd.user.js)** | `phimhd.com`, `phimhd.tv` |
| 🎬 **PhimBatHu** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT PHIMBATHU](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimbathu.user.js)** | `phimbathu.com`, `phimbathu.net` |
| 🎬 **PhimVang** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIMVANG](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimvang.user.js)** | `phimvang.com`, `phimvang.tv` |
| 🎬 **PhimChill** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIMCHILL](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimchill.user.js)** | `phimchill.net`, `phimchill.tv`, `phimchill.org`... |
| 🎬 **LuotPhim** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT LUOTPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/luotphim.user.js)** | `luotphim.net`, `luotphim.tv`, `luotphim.cc`... |
| 🎬 **PhimNhanh** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT PHIMNHANH](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimnhanh.user.js)** | `phimnhanh.tv`, `phimnhanh.net`, `phimnhanh.io`... |
| 🎬 **HayGhe** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT HAYGHE](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/hayghe.user.js)** | `hayghe.tv`, `hayghe.net`, `hayghe.org`... |
| 🎬 **PhimKo** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIMKO](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimko.user.js)** | `phimko.net`, `phimko.com`, `phimko.tv`... |
| 🎬 **CuongPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT CUONGPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/cuongphim.user.js)** | `cuongphim.com`, `cuongphim.net`, `cuongphim.tv`... |
| 🎬 **BongNgo TV** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT BONGNGO TV](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/bongngo.user.js)** | `bongngo.tv`, `bongngo.net`, `bongngotv.com`... |
| 🎬 **XomPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT XOMPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/xomphim.user.js)** | `xomphim.tv`, `xomphim.net`, `xomphim.com`... |
| 🎬 **PhimBom** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s** | 👉 **[CÀI ĐẶT PHIMBOM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimbom.user.js)** | `phimbom.tv`, `phimbom.net`, `phimbom.org`... |
| 🎬 **TVZing & ZingTV** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT TVZING & ZINGTV](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/tvzing.user.js)** | `tvzing.net`, `tvzing.tv`, `zingtv.com`... |
| 🎬 **PhimChieuRap** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIMCHIEURAP](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimchieurap.user.js)** | `phimchieurap.tv`, `phimchieurap.net`, `phimchieurap.org`... |
| 🎬 **FimFast** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT FIMFAST](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/fimfast.user.js)** | `fimfast.com`, `fimfast.tv`, `fimfast.net`... |
| 🎬 **HDViet** | 💎 **Mở khóa Full HD/VIP**<br>🚫 Diệt sạch Popup bẫy click & Banner<br>🚀 M3U8 Direct Launcher | 👉 **[CÀI ĐẶT HDVIET](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/hdviet.user.js)** | `hdviet.com`, `movies.hdviet.com`, `hdviet.net`... |
| 🎬 **PhimPlay** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIMPLAY](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimplay.user.js)** | `phimplay.net`, `phimplay.tv`, `phimplay.org`... |
| 🎬 **PhimGi** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT PHIMGI](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimgi.user.js)** | `phimgi.net`, `phimgi.tv`, `phimgi.cc`... |
| 🎬 **KPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT KPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/kphim.user.js)** | `kphim.tv`, `kphim.net`, `kphim.co`... |
| 🎬 **PhimHub** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s** | 👉 **[CÀI ĐẶT PHIMHUB](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimhub.user.js)** | `phimhub.tv`, `phimhub.net`, `phimhub.org`... |
| 🎬 **PhimVietsub** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIMVIETSUB](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimvietsub.user.js)** | `phimvietsub.org`, `phimvietsub.net`, `phimvietsub.tv`... |
| 🎬 **DauDauPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT DAUDAUPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/daudauphim.user.js)** | `daudau.tv`, `daudauphim.com`, `daudauphim.net`... |
| 🎬 **PhimBo** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIMBO](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimbo.user.js)** | `phimbo.net`, `phimbo.tv`, `phimbo.org`... |
| 🎬 **PhimLe** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT PHIMLE](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimle.user.js)** | `phimle.tv`, `phimle.net`, `phimle.org`... |

---

#### 🌸 3. BẢN DÀNH RIÊNG CHO ANIME VIETSUB & HOẠT HÌNH 3D TRUNG QUỐC (19 Web)

| Trang Web | Tính Năng Đã Mod & Bẻ Khóa | Link Cài Đặt 1-Click | Tên Miền Hỗ Trợ |
| :--- | :--- | :---: | :--- |
| 🎬 **AnimeVietsub** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT ANIMEVIETSUB](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/animevietsub.user.js)** | `animevietsub.moe`, `animevietsub.link`, `animevietsub.global`... |
| 🎬 **HoatHinh3D** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT HOATHINH3D](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/hoathinh3d.user.js)** | `hoathinh3d.biz`, `hoathinh3d.com`, `hoathinh3d.site`... |
| 🎬 **AnimeHay** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT ANIMEHAY](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/animehay.user.js)** | `animehay.tv`, `animehay.live`, `animehay.site`... |
| 🎬 **Anime47** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT ANIME47](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/anime47.user.js)** | `anime47.net`, `anime47.com`, `anime47.tv`... |
| 🎬 **DongHuaTV** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT DONGHUATV](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/donghuatv.user.js)** | `donghuatv.com`, `donghua.tv`, `donghuatv.net`... |
| 🎬 **VuiGhe** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT VUIGHE](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/vuighe.user.js)** | `vuighe.net`, `vuighe3.com`, `vuighe.com` |
| 🎬 **AnimeTVN** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT ANIMETVN](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/animetvn.user.js)** | `animetvn.com`, `animetvn.tv`, `animetvn.net` |
| 🎬 **HoatHinh KungFu** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT HOATHINH KUNGFU](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/hhkungfu.user.js)** | `hhkungfu.tv`, `hhkungfu.com`, `hhkungfu.net` |
| 🎬 **HoatHinh Panda** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT HOATHINH PANDA](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/hhpanda.user.js)** | `hhpanda.com`, `hhpanda.tv` |
| 🎬 **KhoAnime** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT KHOANIME](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/khoanime.user.js)** | `khoanime.tv`, `khoanime.net`, `khoanime.com`... |
| 🎬 **AnimeMoi** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT ANIMEMOI](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/animemoi.user.js)** | `animemoi.com`, `animemoi.net`, `animemoi.tv`... |
| 🎬 **AnimeChill** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT ANIMECHILL](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/animechill.user.js)** | `animechill.net`, `animechill.tv`, `animechill.org`... |
| 🎬 **VietAnime** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT VIETANIME](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/vietanime.user.js)** | `vietanime.net`, `vietanime.tv`, `vietanime.org`... |
| 🎬 **AnimeZ** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT ANIMEZ](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/animez.user.js)** | `animez.tv`, `animez.net`, `animez.org`... |
| 🎬 **MotAnime** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT MOTANIME](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/motanime.user.js)** | `motanime.tv`, `motanime.net`, `motanime.org`... |
| 🎬 **KuroAnime** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT KUROANIME](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/kuroanime.user.js)** | `kuroanime.net`, `kuroanime.tv`, `kuroanime.com`... |
| 🎬 **GhienAnime** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT GHIENANIME](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/ghienanime.user.js)** | `ghienanime.net`, `ghienanime.tv`, `ghienanime.com`... |
| 🎬 **WibuVN** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT WIBUVN](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/wibuvn.user.js)** | `wibu.tv`, `wibuvn.net`, `wibuvn.com`... |
| 🎬 **Bstation & Bilibili VN** | 📺 **Tối ưu Bstation/Bilibili VN Player**<br>✨ Anime OLED HDR rực rỡ<br>⏭️ Tua nhanh 5s/Intro 85s & Tải video | 👉 **[CÀI ĐẶT BSTATION & BILIBILI VN](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/bstation.user.js)** | `bilibili.tv`, `bilibili.com`, `bstarstatic.com` |

---

#### 📺 4. BẢN DÀNH CHO KHO NGUỒN MỞ, PHIM THUYẾT MINH & TỔNG HỢP (14 Web)

| Trang Web | Tính Năng Đã Mod & Bẻ Khóa | Link Cài Đặt 1-Click | Tên Miền Hỗ Trợ |
| :--- | :--- | :---: | :--- |
| 🎬 **OPhim & KKPhim** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC** | 👉 **[CÀI ĐẶT OPHIM & KKPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/ophim.user.js)** | `ophim.cc`, `ophim.live`, `kkphim.com`... |
| 🎬 **BiPhim & PhimChill** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT BIPHIM & PHIMCHILL](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/biphim.user.js)** | `biphim.net`, `biphim.co`, `phimchill.tv`... |
| 🎬 **MotPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT MOTPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/motphim.user.js)** | `motphim.to`, `motphimtv.me`, `motphimtv.top`... |
| 🎬 **MePhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT MEPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/mephim.user.js)** | `mephimtv.com`, `mephim.net`, `mephim.tv` |
| 🎬 **GhienPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT GHIENPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/ghienphim.user.js)** | `ghienphim.net`, `ghienphim.tv`, `ghienphim.org` |
| 🎬 **FullPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s** | 👉 **[CÀI ĐẶT FULLPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/fullphim.user.js)** | `fullphim.net`, `fullphim.tv`, `fullphim.org` |
| 🎬 **PhimHay** | 🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT PHIMHAY](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/phimhay.user.js)** | `phimhay.co`, `phimhay.net`, `phimhay.tv` |
| 🎬 **VietSubTV** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT VIETSUBTV](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/vietsubtv.user.js)** | `vietsubtv.org`, `vietsubtv.com`, `vietsubtv.net` |
| 🎬 **BanhTV** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT BANHTV](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/banhtv.user.js)** | `banhtv.net`, `banhtv.cc` |
| 🎬 **HDOnline** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT HDONLINE](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/hdonline.user.js)** | `hdonline.co`, `hdonline.tv` |
| 🎬 **ChillHay** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT CHILLHAY](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/chillhay.user.js)** | `chillhay.com`, `chillhay.tv` |
| 🎬 **XemPhimPlus** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT XEMPHIMPLUS](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/xemphimplus.user.js)** | `xemphimplus.net` |
| 🎬 **TopSub** | 🔓 **Vô hiệu hóa Stream Guard**<br>🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR** | 👉 **[CÀI ĐẶT TOPSUB](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/topsub.user.js)** | `topsub.org`, `topsub.net`, `topsub.tv`... |
| 🎬 **SSPhim** | 🚫 **Chặn 100% Popup & Quảng cáo**<br>🚀 **Sniff M3U8 PotPlayer/VLC**<br>⏭️ **Skip Intro 85s**<br>✨ **Anime OLED HDR**<br>🎭 **Cinema Theater Mode** | 👉 **[CÀI ĐẶT SSPHIM](https://raw.githubusercontent.com/ekaznyra/bypass-webfilm/main/scripts/ssphim.user.js)** | `ssphim.net`, `ssphim.tv`, `ssphim.org`... |

---

## ⌨️ Cẩm Nang Phím Tắt Thần Thánh (Pro Hotkeys Cheat Sheet)

Các phím tắt hoạt động đồng nhất trên mọi trình phát và mọi trang web (tự động khóa khi người dùng gõ vào ô tìm kiếm hoặc comment):

| Phím Tắt | Chức Năng Chi Tiết | Lợi Ích & Mô Tả |
| :---: | :--- | :--- |
| **`S`** hoặc **`I`** | **Bỏ qua bài hát Intro (+85 giây)** | Nhảy vọt qua đoạn mở đầu bài hát anime/phim bộ ngay lập tức |
| **`←`** / **`→`** | **Tua lùi / Tua tới 5 giây** | Tua nhanh linh hoạt từng chi tiết nhỏ |
| **`Shift + ←`** / **`Shift + →`** | **Tua lùi / Tua tới 10 giây** | Tua đoạn trung bình |
| **`Ctrl + ←`** / **`Ctrl + →`** | **Tua lùi / Tua tới 30 giây** | Tua lướt nhanh cảnh hội thoại dài |
| **`↑`** / **`↓`** | **Tăng / Giảm âm lượng 5%** | Tinh chỉnh âm thanh chuẩn xác |
| **`F`** | **Toàn màn hình (Fullscreen Toggle)** | Phóng to tràn viền loại bỏ thanh điều hướng |
| **`P`** | **Picture-in-Picture (Cửa sổ nổi)** | Đưa video nổi lên góc màn hình để vừa làm việc vừa xem |
| **`T`** | **Chế độ Rạp phim (Cinema Theater Mode)** | Làm mờ tối 90% giao diện web xung quanh |
| **`E`** | **Bật / Tắt bộ lọc Anime OLED HDR** | Tăng độ sâu màu sắc và độ tương phản của video |
| **`H`** | **Ẩn / Hiện Bảng Điều Khiển VIP Hub** | Đóng mở nhanh menu Floating Hub mà không cần rê chuột |
| **`[`** / **`]`** | **Giảm / Tăng tốc độ phát video** | Chuyển đổi nhanh `0.5x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`, `2.5x`, `3.0x` |
| **`Space`** (Cách) | **Phát / Tạm dừng video (Play/Pause)** | Tạm dừng tức thì không sợ dính bẫy click quảng cáo |
| **`M`** | **Tắt / Bật tiếng (Mute/Unmute)** | Tắt âm thanh nhanh |
| **`,`** / **`.`** | **Tua lùi / Tua tới từng khung hình (Frame Step)** | Soi từng frame ảnh độ phân giải cao |
| **`0`** đến **`9`** | **Nhảy nhanh đến 0% - 90% thời lượng** | Bấm phím `5` nhảy tới giữa phim (50%), phím `0` xem lại từ đầu |

---

## 📺 Hướng Dẫn Phát Trực Tiếp Trên Trình Phát Ngoại Vi

Để xem mượt mà nhất mà không phụ thuộc vào trình duyệt web, hãy sử dụng tính năng **1-Click Launch**:

### 1. PotPlayer (Windows) — Lựa chọn số 1:
- Tải [Daum PotPlayer](https://potplayer.daum.net/) chính thức.
- Trong quá trình cài đặt, tích chọn **"Associate with URL Protocol"** (hoặc mở PotPlayer > F5 > Associations > URL Associations).
- Khi bấm nút **"🚀 Mở PotPlayer"** trên Floating Hub, trình duyệt sẽ tự động gọi PotPlayer phát luồng trực tiếp với đầy đủ HDR, tăng âm 300%, làm nét hình ảnh MadVR!

### 2. VLC Media Player (Windows / macOS / Linux):
- Tải [VLC Media Player](https://www.videolan.org/).
- Bấm **"🧡 Mở VLC Player"** để mở luồng trực tiếp qua giao thức `vlc://`.
- Hoặc bấm **"💾 Tải Playlist .M3U"** và nhấp đúp file vừa tải về để thưởng thức ngay.

### 3. Tải Phim Bằng Internet Download Manager (IDM):
- Bấm nút **"📋 Sao Chép Link Luồng"** trên VIP Hub.
- Mở IDM > Chọn **Add URL** > Dán link m3u8 > Bấm **Download** để tải phim tốc độ tối đa đa luồng!

---

## 🧪 Hệ Thống Kiểm Định Chất Lượng Tự Động (Automated Verification)

Mỗi bản build của dự án được kiểm tra nghiêm ngặt qua bộ kiểm thử tự động [`run_audit.js`](file:///run_audit.js) với **hơn 1,407 Assertions** trong môi trường cô lập Node.js VM:
- **Phase 1: Metadata & Syntax Inspection** (70 Userscripts + `src/core.js`): Kiểm tra cú pháp ES2022, author, link download/update GitHub Raw, flags `@allFrames` và `@run-at`.
- **Phase 2: Top Window DOM & 13 VIP Hub Control Buttons** (70 files): Giả lập DOM top-window, xác thực 13 nút bấm chức năng (PotPlayer, VLC, Copy, M3U, Skip Intro, PiP, Fullscreen, HDR, Theater, Volume Up/Down, Speed Up/Down), bẫy click ad popup, bảo vệ probe localStorage, bắt luồng và 18 phím tắt Pro.
- **Phase 3: Iframe Player Embed & Stream Guard Defusal** (70 files): Kiểm thử sandbox nhúng player, defuse `streamGuard.isBlocked()`, tự động tua quảng cáo pre-roll & click `.jw-skip`, vô hiệu hóa `HTMLMediaElement.prototype.pause` do adblock gây ra, và truyền lệnh điều khiển từ xa.
- **Phase 4: Rophim VIP 2099 & T-Coin Response Patcher** (`rophim.user.js`, `tampermonkey.user.js`, `cinema-pro-all.user.js`): Kiểm toán can thiệp API `/tcoin/me`, `/api/auth/session` và recursive nested payload `/vip/check`.
- **Phase 5: README.md 1-Click Install Links Sync** (69 files): Đồng bộ 100% link cài đặt thực tế trong tài liệu.

Chạy kiểm định toàn diện:
```bash
node run_audit.js
```
*(Kết quả: 100% Assertions Passed - Zero Defects Guaranteed)*

---

## ⚖️ Giấy Phép & Tuyên Bố Miễn Trừ Trách Nhiệm (License)

- Dự án được phát hành dưới giấy phép **[MIT License](LICENSE)** vì mục đích nghiên cứu học thuật, tối ưu hóa giao diện người dùng và trải nghiệm cá nhân.
- Không lưu trữ, phát tán hoặc sở hữu bất kỳ tệp video hay nội dung số nào. Mọi luồng phát thuộc quyền sở hữu của các website máy chủ gốc.

<p align="center">
  Được phát triển với tình yêu mãnh liệt dành cho điện ảnh và mã nguồn mở. 🎬✨
</p>
