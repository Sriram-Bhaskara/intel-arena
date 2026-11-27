import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "../state/sound";

const RECAP = [
  { k: "metro",    icon: "🚇", title: "Metro",    good: "Intel finished the task offline — no signal, no problem.", bad: "The cloud laptop froze mid-task." },
  { k: "cafe",     icon: "☕", title: "Cafe",     good: "NPU ran AI tasks cool. Battery survived a full session.", bad: "Routing AI to the CPU drained the battery fast." },
  { k: "midnight", icon: "🌙", title: "Midnight", good: "3 years later, Intel still runs the newest AI workloads.", bad: "The cheap laptop can't keep up with new AI apps." },
];

const SCORECARD = [
  { cat: "On-device AI (NPU)", intel: 90, rival: 20, rivalName: "Cheap laptop", note: "50 TOPS NPU vs none" },
  { cat: "App compatibility",   intel: 95, rival: 70, rivalName: "Snapdragon X", note: "Native x86 vs ARM translation" },
  { cat: "NPU raw TOPS",        intel: 60, rival: 85, rivalName: "Snapdragon X2", note: "50 vs 80 — honest concession", concede: true },
  { cat: "Variety & pricing",   intel: 90, rival: 55, rivalName: "AMD Ryzen AI",  note: "Acer, ASUS, Dell, HP, Lenovo, MSI, Samsung" },
  { cat: "Future-proofing",     intel: 90, rival: 30, rivalName: "Cheap laptop",  note: "NPU handles new workloads for years" },
];

export default function Verdict({ scores = {}, onComplete }) {
  const { playClick, playWin } = useSound();
  const [stage, setStage] = useState("recap"); // recap -> scorecard
  const won = (scores.metro === true) || (scores.cafe > 4) || (scores.midnight === true);

  useEffect(() => { if (won) playWin(); }, [won, playWin]);

  return (
    <div className="flex flex-col items-center w-full gap-4 pb-4">
      <div className="w-full flex items-center justify-between text-[10px] font-display tracking-[0.3em] text-white/50 px-1">
        <span>CHAPTER 5</span>
        <span className="text-cyber-cyan">THE VERDICT</span>
      </div>

      {stage === "recap" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "conic-gradient(from 0deg, #00F0FF, #FF2D8F, #FFB800, #00F0FF)" }}
          >
            <div className="w-20 h-20 rounded-full bg-cyber-void flex items-center justify-center text-4xl">
              🏆
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-3xl md:text-4xl font-bold text-center leading-tight text-balance"
          >
            Your day held up.<br />
            <span className="chrome-text">Intel did the work.</span>
          </motion.h2>

          <div className="w-full space-y-2">
            {RECAP.map((r, i) => (
              <motion.div
                key={r.k}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="scene-panel p-3 flex items-start gap-3"
              >
                <div className="text-2xl shrink-0">{r.icon}</div>
                <div className="flex-1">
                  <p className="font-display text-xs tracking-widest text-cyber-cyan uppercase">{r.title}</p>
                  <p className="text-sm text-white/85 mt-0.5">{r.good}</p>
                  <p className="text-[11px] text-white/40 mt-0.5 italic">vs. the alternative — {r.bad.toLowerCase()}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <button onClick={() => { playClick(); setStage("scorecard"); }} className="btn-primary">
            → SHOW ME THE HONEST SCORE
          </button>
        </motion.div>
      )}

      {stage === "scorecard" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-3">
          <div className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
              Intel vs <span className="neon-magenta">the rest</span>.
            </h2>
            <p className="text-white/50 text-xs mt-1">We show where Intel wins — and where rivals are strong.</p>
          </div>

          <div className="w-full space-y-2">
            {SCORECARD.map((c, i) => (
              <motion.div
                key={c.cat}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="scene-panel p-3"
              >
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-xs font-display font-bold text-white">{c.cat}</span>
                  <span className="text-[9px] text-white/40 tracking-widest uppercase">vs {c.rivalName}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-display tracking-widest neon-cyan w-10">INTEL</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta rounded-full"
                      initial={{ width: 0 }} animate={{ width: `${c.intel}%` }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-display tracking-widest text-white/50 w-10">RIVAL</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${c.concede ? "bg-gradient-to-r from-cyber-amber to-orange-500" : "bg-white/25"}`}
                      initial={{ width: 0 }} animate={{ width: `${c.rival}%` }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
                    />
                  </div>
                </div>
                <p className={`text-[10px] mt-1.5 ${c.concede ? "text-cyber-amber" : "text-white/50"}`}>
                  {c.concede ? "⚡ " : ""}{c.note}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-[10px] text-white/40 text-center italic">
            Source: Intel + independent reviews. Results vary. Simulations are illustrative.
          </p>

          <button onClick={() => { playClick(); onComplete(); }} className="btn-primary">
            → GET MY PERSONAL MATCH
          </button>
        </motion.div>
      )}
    </div>
  );
}
