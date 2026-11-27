import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../state/sound";

const VIBES = [
  {
    id: "student",
    name: "The Scholar",
    emoji: "📚",
    gradient: "from-cyber-cyan to-blue-500",
    tagline: "Notes · Lectures · All-nighters",
    scenario: "You take notes in class, join hostel calls, and need battery that lasts a full day of lectures.",
  },
  {
    id: "creator",
    name: "The Creator",
    emoji: "🎨",
    gradient: "from-cyber-magenta to-purple-500",
    tagline: "Edits · Reels · Vibes",
    scenario: "You edit reels, retouch photos, and want AI that doesn't melt your laptop mid-export.",
  },
  {
    id: "gamer",
    name: "The Player",
    emoji: "🎮",
    gradient: "from-cyber-amber to-red-500",
    tagline: "Frames · Streams · Grind",
    scenario: "You game between classes, stream to friends, and need AI upscaling + silky frame rates.",
  },
  {
    id: "work",
    name: "The Hustler",
    emoji: "💼",
    gradient: "from-cyber-lime to-green-500",
    tagline: "Calls · Decks · Shipping",
    scenario: "You're on back-to-back calls, drafting decks, and need AI that keeps the meeting running.",
  },
];

export default function Vibe({ onComplete }) {
  const { playClick } = useSound();
  const [picked, setPicked] = useState(null);

  const choose = (id) => {
    playClick();
    setPicked(id);
    setTimeout(() => onComplete({ persona: id }), 650);
  };

  const pickedVibe = VIBES.find((v) => v.id === picked);

  return (
    <div className="flex flex-col items-center w-full gap-4 pb-4">
      <div className="w-full flex items-center justify-between text-[10px] font-display tracking-[0.3em] text-white/50 px-1">
        <span>CHAPTER 1</span>
        <span className="text-cyber-cyan">PICK YOUR VIBE</span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl md:text-4xl font-bold text-center leading-tight text-balance"
      >
        Which <span className="neon-magenta">version of you</span><br /> is living today?
      </motion.h2>

      <p className="text-white/60 text-sm text-center max-w-sm">
        Your pick shapes every scene. Tap the one that sounds like your week.
      </p>

      <div className="grid grid-cols-2 gap-3 w-full mt-2">
        {VIBES.map((v, i) => (
          <motion.button
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => choose(v.id)}
            className={`relative scene-panel p-4 min-h-[180px] flex flex-col items-center justify-center gap-2 overflow-hidden transition-all ${
              picked === v.id ? "ring-2 ring-cyber-cyan" : ""
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient} opacity-15`} />
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/5 blur-2xl" />

            <motion.div
              className="relative z-10 text-5xl"
              animate={picked === v.id ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {v.emoji}
            </motion.div>
            <p className="relative z-10 font-display font-bold text-white text-base">{v.name}</p>
            <p className="relative z-10 text-[10px] text-white/60 tracking-wider uppercase">{v.tagline}</p>

            {picked === v.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-cyber-cyan flex items-center justify-center text-[10px] font-bold text-black"
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {pickedVibe && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full p-3 rounded-2xl bg-black/30 border border-cyber-cyan/30 text-center"
          >
            <p className="text-sm text-white/80 italic">"{pickedVibe.scenario}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
