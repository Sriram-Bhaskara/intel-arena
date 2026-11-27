import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../state/sound";

// Each task is auto-routed by the game. User watches.
const POOL = [
  { id: "cap",     label: "Live captions on a call",   icon: "💬", kind: "ai" },
  { id: "blur",    label: "Blur meeting background",   icon: "📹", kind: "ai" },
  { id: "sum",     label: "Summarise a PDF",           icon: "📝", kind: "ai" },
  { id: "up",      label: "Photo upscale",             icon: "🖼️", kind: "ai" },
  { id: "voice",   label: "Noise-cancel voice",        icon: "🎤", kind: "ai" },
  { id: "trans",   label: "Translate a chat",          icon: "🌐", kind: "ai" },
  { id: "gen",     label: "Generate an image",         icon: "🎨", kind: "ai" },
  { id: "zip",     label: "Zip a folder",              icon: "📦", kind: "classic" },
  { id: "excel",   label: "Crunch Excel formulas",     icon: "📊", kind: "classic" },
  { id: "install", label: "Install a Windows update",  icon: "💾", kind: "classic" },
];

const ROUNDS = 8;

// drain by (laptop, taskKind)
const DRAIN = {
  intel: { ai: 3,  classic: 5 },
  old:   { ai: 18, classic: 6 },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Per-persona scene
const SCENES = {
  student: {
    avatar: "📚", label: "SCHOLAR",
    locName: "LIBRARY MODE", place: "The Library",
    line: "Back-corner seat. Two hours before the next class.",
    bg: ["📖", "✏️", "📓", "🪑"],
  },
  creator: {
    avatar: "🎨", label: "CREATOR",
    locName: "CAFE MODE", place: "Third Wave Coffee",
    line: "Window seat. Deadline in your head. Oat latte in hand.",
    bg: ["☕", "🪴", "🥐", "📓"],
  },
  gamer: {
    avatar: "🎮", label: "PLAYER",
    locName: "LOUNGE MODE", place: "The Gaming Lounge",
    line: "RGB keyboard. Raid in 40 minutes. Energy drink open.",
    bg: ["🕹️", "🎧", "⚡", "🥤"],
  },
  work: {
    avatar: "💼", label: "HUSTLER",
    locName: "OFFICE MODE", place: "The Office",
    line: "Back-to-back calls. Deck due by 6. Coffee's your cardio.",
    bg: ["💼", "📊", "☕", "📱"],
  },
};

function LocationBg({ items }) {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <div className="absolute top-3 left-4 text-xl">{items[0]}</div>
      <div className="absolute top-4 right-5 text-xl">{items[1]}</div>
      <div className="absolute bottom-20 right-3 text-base opacity-60">{items[2]}</div>
      <div className="absolute bottom-24 left-5 text-base opacity-60">{items[3]}</div>
    </div>
  );
}

function LaptopPanel({ which, battery, pulse, routed }) {
  const isIntel = which === "intel";
  const dead = battery <= 0;
  const bar = isIntel
    ? "from-cyber-cyan to-cyber-magenta"
    : battery > 50 ? "from-cyber-amber to-orange-500"
    : battery > 20 ? "from-orange-400 to-red-500"
    : "from-red-500 to-red-700";
  const glow = isIntel
    ? "shadow-[0_0_30px_rgba(0,240,255,0.35)]"
    : "shadow-[0_0_18px_rgba(0,0,0,0.5)]";

  return (
    <motion.div
      animate={pulse ? { scale: [1, 1.04, 1] } : {}}
      transition={{ duration: 0.35 }}
      className={`relative scene-panel p-3 min-h-[200px] flex flex-col items-center gap-2 overflow-visible ${glow} transition-opacity ${dead ? "opacity-50" : ""}`}
      style={{ borderColor: isIntel ? "rgba(0,240,255,0.4)" : "rgba(255,255,255,0.1)" }}
    >
      <p className={`text-[9px] font-display tracking-[0.25em] ${isIntel ? "neon-cyan" : "text-white/70"}`}>
        {isIntel ? "INTEL AI PC" : "OLD LAPTOP"}
      </p>

      <motion.div
        className="text-5xl"
        animate={pulse ? { rotate: [0, -4, 4, 0] } : isIntel ? { scale: [1, 1.05, 1] } : {}}
        transition={pulse ? { duration: 0.3 } : { duration: 2.2, repeat: Infinity }}
      >
        💻
      </motion.div>

      {/* Engine echo — fixed-height slot under the icon so it never overlaps */}
      <div className="h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {routed ? (
            <motion.div
              key={routed.ts}
              initial={{ opacity: 0, y: -4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-full px-2.5 py-0.5 border ${
                routed.engine === "NPU"
                  ? "bg-cyber-cyan/20 border-cyber-cyan/60"
                  : "bg-white/10 border-white/30"
              }`}
            >
              <span className={`text-[9px] font-display tracking-widest ${routed.engine === "NPU" ? "text-cyber-cyan" : "text-white"}`}>
                → {routed.engine} · −{routed.drain}%
              </span>
            </motion.div>
          ) : (
            <div className="flex items-center gap-1 text-[8px] font-display tracking-widest text-white/40">
              <span className={`w-1.5 h-1.5 rounded-full ${isIntel ? "bg-cyber-cyan" : "bg-white/30"}`} />
              <span>{isIntel ? "CPU + NPU" : "CPU ONLY"}</span>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full">
        <div className="flex justify-between text-[9px] font-display tracking-widest text-white/60 mb-0.5">
          <span>BATTERY</span>
          <motion.span
            key={battery}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className={`font-black ${battery <= 20 ? "text-red-400" : "text-white"}`}
          >
            {battery}%
          </motion.span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${bar}`}
            animate={{ width: `${battery}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Cafe({ persona = "student", onComplete }) {
  const { playWin, playFail, playClick } = useSound();
  const queue = useMemo(() => shuffle(POOL).slice(0, ROUNDS), []);
  const [stage, setStage] = useState("intro"); // intro | running | done
  const [round, setRound] = useState(-1);
  const [intelBat, setIntelBat] = useState(100);
  const [oldBat, setOldBat] = useState(100);
  const [intelRouted, setIntelRouted] = useState(null);
  const [oldRouted, setOldRouted] = useState(null);
  const [pulseIntel, setPulseIntel] = useState(false);
  const [pulseOld, setPulseOld] = useState(false);
  const [speed, setSpeed] = useState(1); // 1 or 2
  const [now, setNow] = useState(() => new Date());
  const timerRef = useRef(null);

  const s = SCENES[persona] || SCENES.creator;

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

  const stepOnce = useCallback((idx) => {
    const task = queue[idx];
    if (!task) return;
    const dIntel = DRAIN.intel[task.kind];
    const dOld   = DRAIN.old[task.kind];
    const engineIntel = task.kind === "ai" ? "NPU" : "CPU";
    const engineOld   = "CPU";
    setIntelRouted({ engine: engineIntel, drain: dIntel, ts: Date.now() });
    setOldRouted({ engine: engineOld, drain: dOld, ts: Date.now() + 1 });
    setPulseIntel(true); setPulseOld(true);
    setIntelBat((b) => Math.max(0, b - dIntel));
    setOldBat((b)   => Math.max(0, b - dOld));
    if (task.kind === "ai") playWin(); else playClick();
    if (task.kind === "ai") setTimeout(() => playFail(), 240); // old laptop struggles audibly
    setTimeout(() => { setPulseIntel(false); setPulseOld(false); }, 400);
    setTimeout(() => { setIntelRouted(null); setOldRouted(null); }, 1100);
  }, [queue, playWin, playFail, playClick]);

  // Auto-advance loop
  useEffect(() => {
    if (stage !== "running") return;
    if (round >= ROUNDS - 1) {
      timerRef.current = setTimeout(() => setStage("done"), 1200 / speed);
      return () => clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      const next = round + 1;
      setRound(next);
      stepOnce(next);
    }, 1400 / speed);
    return () => clearTimeout(timerRef.current);
  }, [round, stage, speed, stepOnce]);

  const begin = () => {
    playClick();
    setRound(-1);
    setIntelBat(100);
    setOldBat(100);
    setStage("running");
  };

  const current = round >= 0 && round < ROUNDS ? queue[round] : null;

  return (
    <div className="flex flex-col items-center w-full gap-3 pb-4">
      <div className="w-full flex items-center justify-between text-[10px] font-display tracking-[0.3em] text-white/50 px-1">
        <span>CHAPTER 3 · {timeStr}</span>
        <span className="text-cyber-magenta">{s.locName}</span>
      </div>

      {/* Persona badge */}
      <div className="w-full flex items-center gap-2 px-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-magenta flex items-center justify-center text-base border border-white/20">
          {s.avatar}
        </div>
        <div className="flex-1">
          <p className="text-[9px] font-display tracking-widest text-white/50 leading-tight">PLAYING AS · {s.label}</p>
          <p className="text-xs text-white/85 leading-tight">{s.line}</p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-display text-xl md:text-2xl font-bold leading-tight">
          Same tasks. Two laptops.
        </h2>
        <p className="text-white/50 text-xs mt-1">
          {stage === "intro" ? `Watch ${s.place.toLowerCase()} unfold — no clicks needed.` : "Watching the batteries react in real time."}
        </p>
      </div>

      {/* Location-themed scene strip */}
      <div className="relative w-full scene-panel p-4 overflow-hidden">
        <LocationBg items={s.bg} />

        {/* Progress rail */}
        <div className="relative z-10 flex gap-1 mb-3">
          {queue.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
              i <= round ? "bg-cyber-cyan" : "bg-white/10"
            }`} />
          ))}
        </div>

        {/* Task strip */}
        <div className="relative z-10 min-h-[76px] mb-3">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.id + round}
                initial={{ opacity: 0, y: -14, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                className="scene-panel p-3 flex items-center gap-3 border-white/20"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-magenta/40 to-cyber-cyan/40 border border-white/20 flex items-center justify-center text-2xl shrink-0">
                  {current.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[9px] font-display tracking-widest text-white/50">INCOMING</p>
                    <span className={`text-[9px] font-display tracking-widest px-1.5 py-0.5 rounded ${
                      current.kind === "ai"
                        ? "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30"
                        : "bg-white/10 text-white/70 border border-white/20"
                    }`}>
                      {current.kind === "ai" ? "AI TASK" : "CLASSIC TASK"}
                    </span>
                  </div>
                  <p className="font-display font-bold text-white text-sm leading-tight">{current.label}</p>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-cyber-magenta shrink-0"
                />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="scene-panel p-3 text-center text-[11px] font-display tracking-widest text-white/40 border-dashed border-white/15"
              >
                {stage === "intro" ? "— QUEUE READY —" : stage === "done" ? "— SESSION COMPLETE —" : "— LOADING NEXT —"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Two laptops side by side */}
        <div className="relative z-10 grid grid-cols-2 gap-2">
          <LaptopPanel which="old"   battery={oldBat}   pulse={pulseOld}   routed={oldRouted} />
          <LaptopPanel which="intel" battery={intelBat} pulse={pulseIntel} routed={intelRouted} />
        </div>
      </div>

      {/* Controls */}
      {stage === "intro" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-2"
        >
          <p className="text-center text-[11px] text-white/50 italic">
            The game routes each task automatically. You just watch who holds up.
          </p>
          <button onClick={begin} className="btn-primary">
            ▶ RUN THE {ROUNDS}-TASK SHOWDOWN
          </button>
        </motion.div>
      )}

      {stage === "running" && (
        <div className="w-full flex items-center justify-between gap-2">
          <p className="text-[11px] text-white/50 italic">
            Task {Math.max(0, round + 1)} of {ROUNDS} · auto-routing
          </p>
          <button
            onClick={() => { playClick(); setSpeed((s) => s === 1 ? 2 : 1); }}
            className="text-[10px] font-display tracking-widest text-cyber-cyan border border-cyber-cyan/40 rounded-full px-3 py-1 hover:bg-cyber-cyan/10"
          >
            ⏩ {speed}× SPEED
          </button>
        </div>
      )}

      <AnimatePresence>
        {stage === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-3"
          >
            <div className="scene-panel p-4 text-center">
              <p className="font-display text-xl font-bold text-white mb-1">
                {intelBat > oldBat ? "🏆 Intel outlasted the day" : "☕ Session wrapped"}
              </p>
              <p className="text-white/70 text-sm">
                Intel had <span className="text-cyber-cyan font-bold">{intelBat}%</span> left · Old laptop had <span className="text-red-400 font-bold">{oldBat}%</span>
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-black/30 rounded-lg py-2 border border-cyber-cyan/30">
                  <p className="text-[9px] font-display tracking-widest neon-cyan">INTEL</p>
                  <p className="font-mono font-black text-cyber-cyan text-lg">{intelBat}%</p>
                </div>
                <div className="bg-black/30 rounded-lg py-2 border border-white/10">
                  <p className="text-[9px] font-display tracking-widest text-white/60">OLD LAPTOP</p>
                  <p className="font-mono font-black text-red-400 text-lg">{oldBat}%</p>
                </div>
              </div>
              <p className="text-[11px] text-cyber-cyan mt-3 italic">
                Intel's NPU handles AI at ~⅓ the CPU's power draw. The old laptop has only a CPU.
              </p>
            </div>
            <button onClick={() => onComplete({ correct: Math.round(intelBat / 12), intelBat, oldBat })} className="btn-primary">
              → HEAD HOME (11 PM)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
