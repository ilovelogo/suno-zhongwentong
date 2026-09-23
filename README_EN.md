# Suno中文通 (Suno Partner / Copilot)

> A companion tool for **Suno.com** — built for Chinese-speaking creators with zero music theory background, across all major platforms (Windows PC / Android / Mac / iOS & iPad).  
> Solves three pain points: hard-to-understand English UI, stiff machine translations, and intimidating music/production jargon.  
> Core features: **5-dimension 3-layer plain-language cards** (plain-speech explanation + Suno how-to + prompt tag code), **200+ full-site menu & parameter translations**, **Labs countdown timer & credit tracking**, **first-song beginner guide**, and one-tap clean copy.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.6.0-blue.svg)](./dist/suno-copilot.user.js)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Android%20%7C%20Mac%20%7C%20iOS-brightgreen.svg)](./docs/INSTALL_GUIDE.md)

---

## 📖 Installation & Usage Guide

For detailed cross-platform setup instructions, see the dedicated manual:  
👉 **[docs/INSTALL_GUIDE.md](./docs/INSTALL_GUIDE.md) · Full Platform Install & Config Guide**

- **Android (Phone/Tablet)**:
  - **Firefox for Android**: Download from any app store, then add Tampermonkey from the Add-ons menu.
  - **Kiwi Browser** *(recommended for Samsung Galaxy Tab)*: Full Chromium engine, perfect Samsung S-Pen hover support (150ms buffer to prevent accidental touches).
  - **QQ Browser**: Install Tampermonkey from the Toolbox / Extensions section.
- **iOS / iPadOS (iPhone / iPad)**:
  - Recommended: Safari + free open-source **Userscripts** app (search App Store, then enable the Safari extension in system Settings).
  - Apple Pencil hover interaction supported on iPad Pro / Air!
- **macOS**:
  - Chrome / Edge / Brave / Arc: Install Tampermonkey, then press `Command + O` to open `dist/suno-copilot.user.js`.
  - Native Safari: Install the Userscripts extension from App Store.
- **Windows PC**:
  - Edge / Chrome: Install Tampermonkey, press `Ctrl + O` to open `dist/suno-copilot.user.js` and click Install.

---

## 📦 Quick Download

| File | Description |
|------|-------------|
| [`dist/suno-copilot.user.js`](./dist/suno-copilot.user.js) | Userscript (Tampermonkey) — works on all platforms |
| [`dist/chrome-extension/`](./dist/chrome-extension/) | Chrome / Edge extension (Manifest V3, Developer Mode) |
| [`dist/Suno中文通_v1.6.0_Release.zip`](./dist/Suno中文通_v1.6.0_Release.zip) | Full release package (all files in one zip) |

---

## 📂 Project Structure

```
Suno_Copilot/
├── src/
│   ├── core/injector.js       # Core injection engine
│   ├── data/glossary.json     # 73+ plain-language music terms (single source of truth)
│   ├── data/guide.json        # First-song guide data
│   └── ui/styles.css          # Frosted-glass / S-Pen styles
├── dist/                      # Built artifacts (ready to install)
│   ├── suno-copilot.user.js   # Compiled userscript (v1.6.0)
│   ├── chrome-extension/      # Chrome/Edge extension package (MV3)
│   └── Suno中文通_v1.6.0_Release.zip
├── docs/
│   ├── INSTALL_GUIDE.md       # Cross-platform installation guide
│   └── USER_GUIDE_TAMPERMONKEY.md
├── scripts/
│   ├── build.js               # One-command build (userscript + extension)
│   ├── test_dom_behavior.js   # 18-assertion DOM behavior test suite
│   └── export_review.js       # Export expert review sheets from glossary
├── _ai/                       # AI-assisted development log (open process)
├── Music_Expert_Review_Sheet.md / .csv   # Expert review sheets
├── PROJECT_SPEC_AND_GOALS.md
├── TECHNICAL_ARCHITECTURE.md
└── package.json
```

---

## 🛠️ Build & Test

Zero npm dependencies — only Node.js required:

```bash
# Run automated DOM behavior tests (18 assertions, 100% pass)
node scripts/test_dom_behavior.js

# Build dist artifacts
node scripts/build.js

# Export latest expert review sheets (Markdown + CSV)
node scripts/export_review.js

# Run everything at once
npm run all
```

---

## 🎵 Core Features

1. **Full UI Coverage**:
   - Top creation modes (write for me / write lyrics / make sound)
   - All advanced parameters (length, creativity, voice gender, reference audio, audio trim, stem extraction, leaderboard, library management)
   - **Labs**: `https://suno.com/listen-and-rank` — question prompts, long rule paragraphs, dynamic countdown (`Listen for (\d+) more seconds`), live credit tracking
   - **Profile & Account Center**: banner, avatar, social links, invoices, third-party account binding

2. **3-Layer Plain-Language Cards**:
   - Layer 1: Plain-speech hearing explanation (anyone can understand instantly)
   - Layer 2: Suno how-to guide & pitfalls to avoid
   - Layer 3: Full prompt examples with one-tap clean copy

3. **Safety Isolation**:
   - Lyrics editor and prompt input areas fully isolated — zero risk of accidental injection or interference with typing

4. **Tablet Anti-Accidental-Touch & Hover Design**:
   - 150ms buffer hover for Samsung S-Pen and Apple Pencil; finger-tap "pin lock" for sustained reading

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to contribute, report issues, or suggest improvements.

## 📄 License

MIT — see [LICENSE](./LICENSE)
