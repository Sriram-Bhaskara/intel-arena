import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../state/sound";

const KEYS = [
  { t: 0,    label: "TODAY",    desc: "Fresh out of the box" },
  { t: 0.33, label: "1 YEAR",   desc: "Windows updates & new AI apps" },
  { t: 0.66, label: "2 YEARS",  desc: "Copilot+ workloads everywhere" },
  { t: 1,    label: "3 YEARS",  desc: "The gap is loud" },
];

function interp(t) {
  // smoothed values
  const cheapHealth = Math.max(10, 95 - t * 75);
  const intelHealth = Math.max(80, 100 - t * 12);
  const bgAlpha = Math.min(1, t * 1.5);
  return { cheapHealth, intelHealth, bgAlpha };
}

const CHEAP_FEATS = [
  { at: 0.00, label: "Basic apps" },
  { at: 0.00, label: "Web browsing" },
  { at: 0.00, label: "Light photo editing" },
];
const CHEAP_LOST = [
  { at: 0.25, label: "AI photo tools" },
  { at: 0.45, label: "Live captions" },
  { at: 0.65, label: "Copilot+ features" },
  { at: 0.85, label: "Even basic AI apps" },
];

const INTEL_GAIN = [
  { at: 0.00, label: "On-device AI assistant" },
  { at: 0.20, label: "Live captions + translate" },
  { at: 0.40, label: "Image generation (local)" },
  { at: 0.60, label: "New Copilot+ workloads" },
  { at: 0.80, label: "Full Windows AI Studio" },
];

const PERSONAS = {
  student: { avatar: "📚", label: "SCHOLAR", line: "3 years of coursework. Will your laptop still handle it?" },
  creator: { avatar: "🎨", label: "CREATOR", line: "3 years of edits. Will AI tools still run?" },
  gamer:   { avatar: "🎮", label: "PLAYER",  line: "3 years of grind. Will the frames hold up?" },
  work:    { avatar: "💼", label: "HUSTLER", line: "3 years of work. Will it still ship a deck?" },
};

export default function Midnight({ persona = "student", onComplete }) {
  const { playClick, playWin } = useSound();
  const [t, setT] = useState(0);
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const p = PERSONAS[persona] || PERSONAS.student;

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

  useEffect(() => {
    if (!holding || done) return;
    const step = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setT((prev) => {
        const next = Math.min(1, prev + dt * 0.35); // ~3 sec to reach end
        if (next >= 1 && !done) {
          setDone(true);
          playWin();
          setHolding(false);
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [holding, done, playWin]);

  const { cheapHealth, intelHealth, bgAlpha } = interp(t);
  const yearsLabel = KEYS.reduce((acc, k) => (t >= k.t ? k : acc), KEYS[0]);

  const startHold = useCallback(() => { if (!done) { playClick(); setHolding(true); } }, [done, playClick]);
  const endHold = useCallback(() => setHolding(false), []);

  const cheapFeaturesVisible = CHEAP_FEATS;
  const cheapFeaturesLost = CHEAP_LOST.filter((f) => t >= f.at);
  const intelFeaturesGained = INTEL_GAIN.filter((f) => t >= f.at);

  return (
    <div className="flex flex-col items-center w-full gap-3 pb-4">
      <div className="w-full flex items-center justify-between text-[10px] font-display tracking-[0.3em] text-white/50 px-1">
        <span>CHAPTER 4 · {timeStr}</span>
        <span className="text-cyber-amber">MIDNIGHT MODE</span>
      </div>

      {/* Persona badge */}
      <div className="w-full flex items-center gap-2 px-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-magenta flex items-center justify-center text-base border border-white/20">
          {p.avatar}
        </div>
        <div className="flex-1">
          <p className="text-[9px] font-display tracking-widest text-white/50 leading-tight">PLAYING AS · {p.label}</p>
          <p className="text-xs text-white/85 leading-tight">{p.line}</p>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-center leading-tight">
          Hold to <span className="neon-amber">fast-forward</span>.<br />Watch both laptops age.
        </h2>
      </div>

      {/* Scene */}
      <div className="relative w-full h-56 rounded-2xl overflow-hidden scene-panel">
        {/* Night sky gradient that shifts */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: `linear-gradient(180deg, rgba(42,13,63,${1 - bgAlpha * 0.5}) 0%, rgba(10,4,23,1) 100%)`,
          }}
        />
        {/* Moving stars */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 23) % 80}%` }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5 + (i % 4), delay: i * 0.1, repeat: Infinity }}
          />
        ))}

        {/* Two laptops */}
        <div className="absolute inset-0 grid grid-cols-2 gap-2 p-3">
          {/* Cheap laptop */}
          <motion.div
            animate={{
              filter: `grayscale(${t * 0.8}) brightness(${1 - t * 0.5})`,
              scale: 1 - t * 0.08,
            }}
            className="relative flex flex-col items-center justify-center rounded-xl border border-white/10 bg-black/30 p-2"
          >
            <motion.div
              className="text-4xl mb-1"
              animate={{ rotate: t > 0.7 ? [-2, 2, -2] : 0 }}
              transition={{ duration: 0.3, repeat: t > 0.7 ? Infinity : 0 }}
            >
              {t > 0.9 ? "🪦" : t > 0.6 ? "📉" : "💻"}
            </motion.div>
            <p className="text-[9px] font-display tracking-widest text-white/70">CHEAP LAPTOP</p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
              <motion.div
                className={`h-full ${cheapHealth > 60 ? "bg-cyber-lime" : cheapHealth > 30 ? "bg-cyber-amber" : "bg-red-500"}`}
                style={{ width: `${cheapHealth}%` }}
              />
            </div>
            <p className="text-[8px] text-white/50 mt-0.5 font-mono">{Math.round(cheapHealth)}% health</p>
          </motion.div>

          {/* Intel */}
          <motion.div
            className="relative flex flex-col items-center justify-center rounded-xl border border-cyber-cyan/40 bg-black/30 p-2"
            animate={{ boxShadow: `0 0 ${15 + t * 25}px rgba(0,240,255,${0.2 + t * 0.3})` }}
          >
            <motion.div
              className="text-4xl mb-1"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💻
            </motion.div>
            <p className="text-[9px] font-display tracking-widest neon-cyan">INTEL AI PC</p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta"
                style={{ width: `${intelHealth}%` }}
              />
            </div>
            <p className="text-[8px] text-cyber-cyan/80 mt-0.5 font-mono">{Math.round(intelHealth)}% health</p>
          </motion.div>
        </div>

        {/* Big year marker overlay */}
        <motion.div
          key={yearsLabel.label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/60 border border-cyber-amber/50 px-3 py-1 rounded-full backdrop-blur-md"
        >
          <span className="font-display text-xs font-bold tracking-[0.3em] text-cyber-amber">{yearsLabel.label}</span>
        </motion.div>
      </div>

      {/* Feature deltas — fixed heights so the hold button never gets pushed down */}
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="scene-panel p-2.5 h-[150px] overflow-hidden">
          <p className="text-[9px] font-display tracking-widest text-white/50 mb-1">CHEAP</p>
          <div className="space-y-0.5">
            {cheapFeaturesVisible.map((f) => <p key={f.label} className="text-[10px] text-white/50">✓ {f.label}</p>)}
            {cheapFeaturesLost.map((f) => (
              <motion.p key={f.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-red-400 line-through">✗ {f.label}</motion.p>
            ))}
          </div>
        </div>
        <div className="scene-panel p-2.5 h-[150px] overflow-hidden border-cyber-cyan/30">
          <p className="text-[9px] font-display tracking-widest neon-cyan mb-1">INTEL</p>
          <div className="space-y-0.5">
            {intelFeaturesGained.map((f) => (
              <motion.p key={f.label} initial={{ opacity: 0, x: 3 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] text-cyber-cyan">✓ {f.label}</motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Hold button — fixed height, no scale on press so it doesn't appear to shift */}
      {!done ? (
        <motion.button
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          onPointerCancel={endHold}
          onContextMenu={(e) => e.preventDefault()}
          animate={{
            boxShadow: holding
              ? "0 0 40px rgba(255,45,143,0.6), 0 0 80px rgba(255,184,0,0.3)"
              : "0 10px 30px rgba(255,45,143,0.35), 0 10px 30px rgba(255,184,0,0.2)",
          }}
          className="relative w-full h-16 rounded-full font-display font-bold text-lg text-white overflow-hidden select-none touch-none outline-none focus:outline-none active:outline-none"
          style={{
            background: "linear-gradient(135deg, #FFB800 0%, #FF2D8F 100%)",
            WebkitTapHighlightColor: "transparent",
            transform: "translateZ(0)",
          }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-white/20 pointer-events-none"
            style={{ width: `${t * 100}%` }}
          />
          <span className="relative tracking-[0.15em] block w-full text-center leading-[64px]">
            {holding ? "⏩  TIME IS JUMPING..." : "⏩  HOLD TO FAST-FORWARD"}
          </span>
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-3">
          <div className="scene-panel p-4 text-center">
            <p className="font-display text-xl font-bold text-white">3 years. Same room. Different story.</p>
            <p className="text-white/70 text-sm mt-1">
              The NPU keeps picking up new AI work. The cheap laptop can't.
            </p>
          </div>
          <button onClick={() => onComplete({ seen: true })} className="btn-primary">
            → SEE THE VERDICT
          </button>
        </motion.div>
      )}
    </div>
  );
}
