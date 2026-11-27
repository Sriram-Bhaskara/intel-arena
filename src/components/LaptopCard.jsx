import { motion } from "framer-motion";

export default function LaptopCard({ type, selected, onSelect }) {
  const isShiny = type === "shiny";

  const config = isShiny
    ? {
        title: "Flashy & Cheap",
        subtitle: "Bright colours, lowest price",
        badge: "No AI badge",
        price: "₹34,990",
        desc: "Looks great in-store. But what's inside?",
        emoji: "💎",
        border: "border-pink-500/40",
        bg: "bg-gradient-to-br from-pink-500/15 to-orange-500/10",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(255,0,110,0.3)]",
      }
    : {
        title: "Intel Core Ultra AI PC",
        subtitle: "Built for real AI power",
        badge: "Intel Core Ultra inside",
        price: "₹54,990",
        desc: "AI, privacy, and battery that lasts.",
        emoji: "🔵",
        border: "border-intel-blue/40",
        bg: "bg-gradient-to-br from-intel-blue/15 to-intel-neon/5",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(0,113,194,0.3)]",
      };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 text-white ${config.border} ${config.bg} ${config.hoverShadow}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
          {config.emoji}
        </div>
        <h3 className="text-sm font-black text-white">{config.title}</h3>
        <p className="text-white/60 text-xs">{config.subtitle}</p>
        <div className="w-full flex justify-between items-center text-xs text-white/50">
          <span>{config.badge}</span>
          <span className="font-bold text-white/80">{config.price}</span>
        </div>
        <p className="text-white/50 text-xs text-center">{config.desc}</p>
        <button
          className="mt-1 w-full bg-white/90 text-intel-dark px-4 py-2 rounded-lg font-bold text-xs hover:bg-intel-neon transition-colors"
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
        >
          Choose this one
        </button>
      </div>
    </motion.div>
  );
}
