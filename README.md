<div align="center">

# ⚡ 24 HOUR MODE — Intel Arena

### *Live your day. Pick the chip.*

[![Live Demo](https://img.shields.io/badge/▶%20PLAY%20NOW-Live%20Demo-FF2D8F?style=for-the-badge&logo=vercel&logoColor=white)](https://intel-arena.vercel.app)
[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

<br/>

> **CMRIT × Intel 1 Million Minds Hackathon**
> An interactive 90-second game that shows Gen-Z Indian shoppers why an Intel AI PC outlasts a cheap laptop — not through specs, but through *their* story.

<br/>

![Banner](https://img.shields.io/badge/BENGALURU-LIVE-00F0FF?style=flat-square) ![NPU](https://img.shields.io/badge/NPU-Powered-FF2D8F?style=flat-square) ![AI PC](https://img.shields.io/badge/Intel-AI%20PC-0068B5?style=flat-square)

</div>

---

## 🎮 What is this?

**Intel Arena** is an immersive, persona-driven game experience built for the [CMRIT × Intel 1 Million Minds Hackathon](https://1millionminds.intel.com). Instead of showing boring specs, we put the player *inside* a full 24-hour day — from the Metro to the Cafe to Midnight — and let them *feel* the difference between a cheap laptop and an Intel AI PC.

**90 seconds. No sign-up. All story.**

---

## 🗺️ The Journey

```
BOOT  →  VIBE PICK  →  METRO  →  CAFE  →  MIDNIGHT  →  VERDICT  →  MATCH
```

| Chapter | Scene | What Happens |
|---------|-------|--------------|
| 🚇 **Metro** | Bangalore Metro | Signal drops — race to cache your work before the tunnel hits |
| ☕ **Cafe** | Your spot (Library / Cafe / Gaming Lounge / Office) | Watch the Intel AI PC blitz through 8 real-world tasks while the cheap laptop crawls |
| 🌙 **Midnight** | The 3-Year Skip | Hold to fast-forward 3 years — watch the cheap laptop die while Intel keeps gaining |
| 🏆 **Verdict** | Honest scorecard | Side-by-side verdict with real TOPS numbers |
| 💳 **Match** | Your Intel PC | Flip your hero card — persona-matched store code included |

---

## 🧬 Personas

Pick your identity at the start. Everything changes.

| Persona | Avatar | Location | Story |
|---------|--------|----------|-------|
| **Scholar** | 📚 | The Library | Coursework, notes, AI study tools |
| **Creator** | 🎨 | Third Wave Coffee | Edits, renders, generative AI |
| **Player** | 🎮 | The Gaming Lounge | Frames, latency, AI upscaling |
| **Hustler** | 💼 | The Office | Decks, Copilot, deadlines |

---

## 🛠️ Tech Stack

```
React 19         →  UI & state
Vite 8           →  Build + HMR
Tailwind CSS 3   →  Cyber design system
Framer Motion    →  Animations, gestures, drag
Web Audio API    →  Synthesized sound (no audio files needed)
```

**Design System:** Cyberpunk-Bangalore — magenta `#FF2D8F` · cyan `#00F0FF` · amber `#FFB800` · Space Grotesk display font

---

## 🚀 Run Locally

```bash
git clone https://github.com/Sriram-Bhaskara/intel-arena.git
cd intel-arena
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — works best on mobile viewport (375px wide).

---

## 📦 Build & Deploy

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

Deployed on **Vercel** — auto-redeploys on every push to `main`.

---

## 🧠 Why This Approach?

Most Intel marketing talks about TOPS, NPU cores, and benchmark numbers. Gen-Z doesn't care about specs — they care about *their* day.

We built a game that:
- **Personalizes** — your persona shapes every scene
- **Shows, doesn't tell** — the auto-demo in Cafe runs all 8 tasks without you needing to understand what an NPU is
- **Respects time** — 90 seconds total, no forced reading
- **Ends with action** — a persona-matched store code and QR, ready to buy

---

## 📁 Project Structure

```
src/
├── screens/
│   ├── Attract.jsx      # Boot screen (live Bengaluru time)
│   ├── Persona.jsx      # Vibe pick — Scholar / Creator / Player / Hustler
│   ├── SignalLost.jsx   # Metro chapter with tunnel transition
│   ├── SurviveDay.jsx   # Cafe — auto-demo of Intel AI PC
│   ├── Year3.jsx        # Midnight — hold to fast-forward 3 years
│   ├── Reveal.jsx       # Verdict scorecard
│   └── Match.jsx        # Hero card + QR + store code
├── state/
│   ├── game.js          # Screen order, persona logic
│   └── sound.js         # Web Audio synthesis
├── App.jsx              # Router + idle reset
└── index.css            # Cyber design system + Tailwind
```

---

## 👤 Built By

**Sriram Bhaskara** — CMRIT, Bengaluru
Hackathon: CMRIT × Intel 1 Million Minds 2024

---

<div align="center">

**Made with ⚡ in Bengaluru**

*The NPU keeps picking up new AI work. The cheap laptop can't.*

</div>
