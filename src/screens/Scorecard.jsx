import { motion } from "framer-motion";
import { RIVALS, SOURCE_LINE } from "../data/claims";
import { useSound } from "../state/sound";

const COMPARISONS = [
  {
    category: "On-device AI (NPU)",
    intel: 90, rival: 20,
    intelLabel: "50 TOPS NPU — runs AI offline",
    rivalLabel: "No NPU — needs cloud for AI",
    rivalName: "Cheap laptop",
  },
  {
    category: "Software Compatibility",
    intel: 95, rival: 75,
    intelLabel: "Native x86 — all Windows apps run",
    rivalLabel: "ARM translation — some apps break",
    rivalName: "Snapdragon X",
  },
  {
    category: "NPU Raw Power",
    intel: 60, rival: 85,
    intelLabel: "50 TOPS NPU (180 platform TOPS)",
    rivalLabel: "80 TOPS NPU",
    rivalName: "Snapdragon X2",
    concede: true,
  },
  {
    category: "Laptop Variety & Price Range",
    intel: 90, rival: 55,
    intelLabel: "Wide range: Acer, ASUS, Dell, HP, Lenovo, MSI, Samsung",
    rivalLabel: "Fewer options at some price points",
    rivalName: "AMD Ryzen AI",
  },
  {
    category: "Future-Proofing (3+ years)",
    intel: 90, rival: 30,
    intelLabel: "NPU handles new AI workloads for years",
    rivalLabel: "No dedicated AI hardware — ages fast",
    rivalName: "Cheap laptop",
  },
];

export default function Scorecard({ onComplete }) {
  const { playClick } = useSound();

  return (
    <div className="flex flex-col items-center w-full text-white p-4">
      <div className="self-start text-xs text-white/50 tracking-widest uppercase mb-3">
        Honest Scorecard
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 w-full max-w-md mx-auto pb-8"
      >
        <h2 className="text-2xl font-black text-center text-white">Intel vs the rest</h2>
        <p className="text-white/50 text-xs text-center">
          We show where Intel wins — and where rivals are strong. Honestly.
        </p>

        <div className="w-full space-y-3">
          {COMPARISONS.map((c, i) => (
            <motion.div
              key={c.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 rounded-xl p-3 border border-white/10"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-white">{c.category}</span>
                <span className="text-[10px] text-white/40">vs {c.rivalName}</span>
              </div>

              {/* Intel bar */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-intel-neon font-bold w-10 shrink-0">Intel</span>
                <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-intel-blue to-intel-neon"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.intel}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </div>

              {/* Rival bar */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-white/50 font-bold w-10 shrink-0">Rival</span>
                <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${c.concede ? "bg-gradient-to-r from-orange-400 to-yellow-400" : "bg-white/20"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.rival}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                  />
                </div>
              </div>

              <div className="text-[10px] text-white/50">
                <span className="text-intel-neon">Intel:</span> {c.intelLabel}
              </div>
              <div className="text-[10px] text-white/40">
                <span className="text-white/50">{c.rivalName}:</span> {c.rivalLabel}
              </div>
              {c.concede && (
                <p className="text-[10px] text-orange-400 mt-1 font-semibold">
                  ⚡ Intel concedes NPU TOPS — but total platform TOPS (CPU+GPU+NPU) reach up to 180
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] text-white/40 text-center">
          {SOURCE_LINE}
        </div>

        <button
          onClick={() => { playClick(); onComplete(); }}
          className="w-full py-4 bg-intel-blue text-white font-bold rounded-xl text-base"
        >
          Get your personalised match →
        </button>
      </motion.div>
    </div>
  );
}
