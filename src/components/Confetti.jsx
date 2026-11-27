import { motion } from "framer-motion";

const COLORS = ["#00D4FF", "#0071C2", "#FFD700", "#FF006E", "#00FF88", "#FFFFFF"];

export default function Confetti({ count = 40 }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const color = COLORS[i % COLORS.length];
        const x = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 2;
        const size = 6 + Math.random() * 8;
        const rotation = Math.random() * 720;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${x}%`,
              top: -20,
              width: size,
              height: size * (Math.random() > 0.5 ? 1 : 0.4),
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: "100vh", opacity: [1, 1, 0], rotate: rotation }}
            transition={{ duration, delay, ease: "easeIn" }}
          />
        );
      })}
    </div>
  );
}
