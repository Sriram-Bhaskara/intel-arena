// Web Audio synthesis — no external files needed
import { useState, useCallback } from "react";

let ctx = null;
let initialized = false;

export function initSound() {
  if (initialized) return;
  initialized = true;
  // AudioContext must be resumed on a user gesture; create lazily on first play.
}

function getCtx() {
  if (!ctx && typeof window !== "undefined") {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) ctx = new Ctx();
    } catch (e) {}
  }
  if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function tone({ freq = 440, duration = 0.12, type = "sine", volume = 0.15, sweep = 0 }) {
  const c = getCtx();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (sweep) osc.frequency.exponentialRampToValueAtTime(Math.max(50, freq + sweep), now + duration);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

const SOUNDS = {
  click: () => tone({ freq: 880, duration: 0.07, type: "triangle", volume: 0.12 }),
  win: () => {
    tone({ freq: 660, duration: 0.09, type: "triangle", volume: 0.14 });
    setTimeout(() => tone({ freq: 990, duration: 0.14, type: "triangle", volume: 0.16 }), 70);
  },
  fail: () => {
    tone({ freq: 220, duration: 0.18, type: "sawtooth", volume: 0.12, sweep: -120 });
  },
};

export function useSound() {
  const [enabled, setEnabled] = useState(true);

  const play = useCallback((name) => {
    if (!enabled) return;
    try { SOUNDS[name]?.(); } catch (e) {}
  }, [enabled]);

  return {
    playClick: useCallback(() => play("click"), [play]),
    playWin:   useCallback(() => play("win"),   [play]),
    playFail:  useCallback(() => play("fail"),  [play]),
    enabled,
    setEnabled,
  };
}
