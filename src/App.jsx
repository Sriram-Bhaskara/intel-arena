import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound, initSound } from "./state/sound";
import { initialState, SCREEN_ORDER, IDLE_RESET_SECONDS, inferBatteryPref } from "./state/game";

import Boot from "./screens/Attract";
import Vibe from "./screens/Persona";
import Metro from "./screens/SignalLost";
import Cafe from "./screens/SurviveDay";
import Midnight from "./screens/Year3";
import Verdict from "./screens/Reveal";
import MatchDeck from "./screens/Match";

export default function App() {
  initSound();
  const { playClick, enabled, setEnabled } = useSound();

  const [state, setState] = useState(initialState);
  const [screenIndex, setScreenIndex] = useState(0);
  const idleRef = useRef(0);
  const idleTimerRef = useRef(null);

  const currentScreen = SCREEN_ORDER[screenIndex];

  useEffect(() => {
    if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    idleRef.current = 0;
    idleTimerRef.current = setInterval(() => {
      idleRef.current += 1;
      if (idleRef.current >= IDLE_RESET_SECONDS && currentScreen !== "boot") {
        setState(initialState);
        setScreenIndex(0);
        idleRef.current = 0;
      }
    }, 1000);
    return () => clearInterval(idleTimerRef.current);
  }, [currentScreen]);

  const resetIdle = useCallback(() => { idleRef.current = 0; }, []);

  const goTo = useCallback((screenName, payload = {}) => {
    playClick();
    resetIdle();
    setState((prev) => ({ ...prev, ...payload }));
    setScreenIndex(SCREEN_ORDER.indexOf(screenName));
  }, [playClick, resetIdle]);

  const restart = useCallback(() => {
    playClick();
    setState(initialState);
    setScreenIndex(0);
  }, [playClick]);

  const screens = {
    boot: <Boot onStart={() => goTo("vibe")} />,
    vibe: (
      <Vibe
        onComplete={({ persona }) =>
          goTo("metro", { persona, batteryPreference: inferBatteryPref(persona) })
        }
      />
    ),
    metro: (
      <Metro
        persona={state.persona || "student"}
        onComplete={(result) => goTo("cafe", { scores: { ...state.scores, metro: result.won } })}
      />
    ),
    cafe: (
      <Cafe
        persona={state.persona || "student"}
        onComplete={(result) => goTo("midnight", { scores: { ...state.scores, cafe: result.correct } })}
      />
    ),
    midnight: (
      <Midnight
        persona={state.persona || "student"}
        onComplete={(result) => goTo("verdict", { scores: { ...state.scores, midnight: result.seen } })}
      />
    ),
    verdict: (
      <Verdict scores={state.scores} onComplete={() => goTo("match")} />
    ),
    match: (
      <MatchDeck
        persona={state.persona || "student"}
        batteryPreference={state.batteryPreference || "moving"}
        onRestart={restart}
      />
    ),
  };

  return (
    <div
      className="app-container cyber-bg font-sans overflow-hidden"
      onClick={resetIdle}
    >
      {/* Header */}
      <header className="w-full px-4 py-3 border-b border-white/5 backdrop-blur-xl bg-black/20 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-cyber-cyan"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="font-display text-xs font-bold tracking-[0.3em] text-white">24HR · MODE</span>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className="text-xs text-white/60 hover:text-white p-1"
        >
          {enabled ? "🔊" : "🔇"}
        </button>
      </header>

      {/* Scene stage */}
      <div className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-col items-center w-full max-w-[600px] mx-auto px-3 py-3 min-h-full"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
