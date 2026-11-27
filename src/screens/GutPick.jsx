import { motion } from "framer-motion";
import LaptopCard from "../components/LaptopCard";
import { useSound } from "../state/sound";

export default function GutPick({ onSelect }) {
  const { playClick } = useSound();

  return (
    <div className="flex flex-col items-center w-full text-white p-4">
      <div className="self-start text-xs text-white/50 tracking-widest uppercase mb-3">
        Step 1 · Gut Pick
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-black text-center text-white">
          Which one would you<br />take home?
        </h2>
        <p className="text-white/60 text-center text-sm">
          Don't overthink it. Just pick the one that catches your eye.
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <LaptopCard type="shiny" selected={false} onSelect={() => { playClick(); onSelect("shiny"); }} />
          <LaptopCard type="intel" selected={false} onSelect={() => { playClick(); onSelect("intel"); }} />
        </div>

        <p className="text-white/40 text-xs italic">
          Your choice is locked. No going back.
        </p>
      </motion.div>
    </div>
  );
}
