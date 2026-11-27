import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "../state/sound";

function Skyline() {
  // Stylized Mumbai-ish neon skyline silhouette
  return (
    <svg viewBox="0 0 400 140" className="absolute bottom-0 left-0 w-full opacity-60 pointer-events-none">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF2D8F" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M0 140 L0 80 L15 80 L15 60 L30 60 L30 90 L45 90 L45 50 L60 50 L60 70 L75 70 L75 30 L90 30 L95 20 L100 30 L100 70 L120 70 L120 55 L135 55 L135 85 L150 85 L150 40 L170 40 L175 25 L180 40 L180 90 L200 90 L200 55 L220 55 L220 25 L235 25 L240 10 L245 25 L245 75 L265 75 L265 45 L280 45 L280 85 L300 85 L300 35 L315 35 L320 20 L325 35 L325 80 L345 80 L345 60 L360 60 L360 90 L380 90 L380 55 L400 55 L400 140 Z"
        fill="url(#sky)"
      />
      {/* Window lights */}
      {Array.from({ length: 30 }).map((_, i) => (
        <rect
          key={i}
          x={10 + i * 13}
          y={100 + (i % 3) * 8}
          width="2"
          height="2"
          fill={i % 2 ? "#FFB800" : "#FFFFFF"}
          opacity={0.7}
        />
      ))}
    </svg>
  );
}

function FloatingDot({ i }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-cyber-cyan"
      style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 90}%` }}
      animate={{ y: [-20, -60, -20], opacity: [0, 0.8, 0] }}
      transition={{ duration: 4 + (i % 3), delay: i * 0.3, repeat: Infinity }}
    />
  );
}

const TAGLINES = [
  "48 hours. One laptop. Which one survives?",
  "Your day. Powered on-device.",
  "Live the day. Pick the chip.",
];

export default function Boot({ onStart }) {
  const { playClick } = useSound();
  const [tagIdx, setTagIdx] = useState(0);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTagIdx((i) => (i + 1) % TAGLINES.length), 2800);
    const tid = setInterval(() => setNow(new Date()), 1000);
    return () => { clearInterval(id); clearInterval(tid); };
  }, []);

  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div className="relative flex flex-col items-center w-full min-h-[85vh] overflow-hidden">
      <Skyline />
      {Array.from({ length: 12 }).map((_, i) => <FloatingDot key={i} i={i} />)}

      {/* Marquee time strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mt-4 flex items-center gap-3 px-4 py-2 rounded-full border border-cyber-cyan/30 bg-black/30 backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
        <span className="font-display text-[11px] tracking-[0.3em] text-white/80">LIVE · BENGALURU · {timeStr}</span>
      </motion.div>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="font-display text-sm tracking-[0.4em] text-cyber-magenta mb-2 neon-magenta">24 HOUR MODE</p>
          <h1 className="font-display text-6xl md:text-7xl font-bold leading-[0.9] chrome-text">
            LIVE<br />YOUR<br />DAY.
          </h1>
        </motion.div>

        <motion.div
          key={tagIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[32px] flex items-center"
        >
          <p className="text-white/80 text-base md:text-lg font-medium">{TAGLINES[tagIdx]}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-2 text-white/60 text-xs"
        >
          <div className="flex items-center gap-4 text-[10px] font-display tracking-[0.3em] uppercase">
            <span>Metro</span>
            <span className="text-cyber-cyan">·</span>
            <span>Cafe</span>
            <span className="text-cyber-cyan">·</span>
            <span>Midnight</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playClick(); onStart(); }}
          className="relative w-full max-w-[280px] py-5 rounded-full font-display font-bold text-lg text-white overflow-hidden group"
          style={{ background: "linear-gradient(135deg, #FF2D8F 0%, #00F0FF 100%)" }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative tracking-[0.15em]">▶ START MY DAY</span>
        </motion.button>

        <p className="text-white/40 text-[11px] font-display tracking-[0.2em]">~ 90 SECONDS · NO SIGN-UP</p>
      </div>
    </div>
  );
}
