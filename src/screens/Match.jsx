import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "../state/sound";
import { getMatch, TAG_CHECKLIST, EXAMPLE_MODELS } from "../data/match";

export default function MatchDeck({ persona, batteryPreference, onRestart }) {
  const { playClick, playWin } = useSound();
  const match = getMatch(persona, batteryPreference);
  const [stage, setStage] = useState("match"); // match | qr
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    playWin();
    const id = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(id);
  }, [playWin]);

  const matchCode = `${(persona || "STU").toUpperCase().slice(0, 3)}-U5-16G`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(matchCode)}&format=png&color=00F0FF&bgcolor=0A0417&margin=12`;

  return (
    <div className="flex flex-col items-center w-full gap-4 pb-6">
      <div className="w-full flex items-center justify-between text-[10px] font-display tracking-[0.3em] text-white/50 px-1">
        <span>CHAPTER 6</span>
        <span className="text-cyber-magenta">YOUR MATCH</span>
      </div>

      {stage === "match" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-4">
          {/* Hero match card */}
          <motion.div
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-full scene-panel p-6 overflow-hidden"
            style={{ perspective: 1000 }}
          >
            {/* Animated glow */}
            <motion.div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-cyber-magenta/30 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-cyber-cyan/30 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-cyan/30 to-cyber-magenta/30 border border-white/20 flex items-center justify-center text-5xl mb-3 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
              >
                {match.icon}
              </motion.div>

              <p className="font-display text-[10px] tracking-[0.3em] neon-cyan mb-1">YOUR LAPTOP IS</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 leading-tight text-balance">
                An Intel <span className="chrome-text">{match.tier.split(",")[0]}</span>
              </h2>
              <p className="text-white/70 text-sm max-w-xs">{match.why}</p>
              <p className="text-white/40 text-[11px] mt-1">
                {batteryPreference === "moving" ? "🔋 battery-first build" : "⚡ performance-first build"}
              </p>
            </div>
          </motion.div>

          {/* Tag checklist */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
            transition={{ delay: 0.5 }}
            className="w-full scene-panel p-4 border-cyber-cyan/30"
          >
            <p className="font-display text-xs tracking-widest neon-cyan mb-2">🏷 WHAT TO LOOK FOR</p>
            <ul className="space-y-1.5">
              {TAG_CHECKLIST.map((tag) => (
                <li key={tag} className="flex items-start gap-2 text-sm text-white/85">
                  <span className="text-cyber-cyan font-bold shrink-0">▸</span>
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Models */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
            transition={{ delay: 0.7 }}
            className="w-full scene-panel p-4"
          >
            <p className="font-display text-xs tracking-widest text-white/60 mb-2">AVAILABLE IN INDIA</p>
            {EXAMPLE_MODELS.models.map((m, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                <span className="text-xs text-white/80">{m.name}</span>
                <span className="text-xs text-cyber-cyan font-black font-mono">{m.price}</span>
              </div>
            ))}
            <p className="text-white/40 text-[10px] mt-2">{EXAMPLE_MODELS.note}</p>
          </motion.div>

          <button onClick={() => { playClick(); setStage("qr"); }} className="btn-primary">
            → GET MY STORE CODE
          </button>
        </motion.div>
      )}

      {stage === "qr" && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="font-display text-xs tracking-[0.3em] neon-magenta mb-2">STORE PASS</p>
            <h2 className="font-display text-2xl font-bold text-white">Show this at the counter</h2>
            <p className="text-white/60 text-sm mt-1">Reliance Digital · Croma · Vijay Sales</p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative scene-panel p-5 w-full flex flex-col items-center gap-3"
          >
            <motion.div
              className="absolute inset-0 rounded-[28px] opacity-30"
              style={{ background: "conic-gradient(from 0deg, #00F0FF, #FF2D8F, #FFB800, #00F0FF)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10 bg-cyber-void p-3 rounded-2xl">
              <img src={qrUrl} alt="QR" className="w-48 h-48" />
            </div>
            <div className="relative z-10 bg-black/50 border border-cyber-cyan/40 rounded-lg px-4 py-2">
              <p className="font-mono font-black text-xl tracking-[0.3em] neon-cyan">{matchCode}</p>
            </div>
            <p className="relative z-10 text-white/60 text-xs text-center">
              Staff can scan the code or type it in.
            </p>
          </motion.div>

          <div className="w-full scene-panel p-4 border-cyber-magenta/30">
            <p className="font-display text-xs tracking-widest neon-magenta mb-2">💬 WHAT TO SAY</p>
            <p className="text-sm text-white/85 italic">
              "I want the Intel Core Ultra AI PC that matches this code. Can I see it?"
            </p>
          </div>

          <button
            onClick={() => { playClick(); onRestart?.(); }}
            className="w-full py-3 rounded-full border border-white/20 bg-white/5 text-white font-display font-bold hover:bg-white/10 transition-colors text-sm"
          >
            🔄 PLAY AGAIN
          </button>

          <p className="text-white/20 text-[10px] font-display tracking-widest text-center">
            INTEL ARENA · CMRIT × INTEL 1 MILLION MINDS
          </p>
        </motion.div>
      )}
    </div>
  );
}
