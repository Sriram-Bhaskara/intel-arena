import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useSound } from "../state/sound";

const TASK = {
  student: { title: "Live Captions",      icon: "💬", line: "Prof is explaining — captions on.",       avatar: "📚", label: "SCHOLAR", cta: "→ HEAD TO THE LIBRARY" },
  creator: { title: "Background Blur",    icon: "📹", line: "On a video call with a brand client.",     avatar: "🎨", label: "CREATOR", cta: "→ GRAB A COFFEE" },
  gamer:   { title: "Voice Isolation",    icon: "🎤", line: "Discord with the squad — raid incoming.",  avatar: "🎮", label: "PLAYER",  cta: "→ HIT THE GAMING LOUNGE" },
  work:    { title: "Meeting Translate",  icon: "🌐", line: "All-hands with the Seoul team.",           avatar: "💼", label: "HUSTLER", cta: "→ HEAD TO THE OFFICE" },
};

export default function Metro({ persona, onComplete }) {
  const { playClick, playWin, playFail } = useSound();
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const x = useMotionValue(0);
  const [progress, setProgress] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
  const task = TASK[persona] || TASK.student;

  useEffect(() => {
    const update = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth - 56);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const unsub = x.on("change", (v) => {
      const p = trackWidth > 0 ? Math.max(0, Math.min(1, v / trackWidth)) : 0;
      setProgress(p);
      setMaxReached((m) => {
        const nm = Math.max(m, p);
        if (m < 0.4 && nm >= 0.4) playFail(); // tunnel
        if (m < 0.98 && nm >= 0.98) playWin();
        return nm;
      });
    });
    return () => unsub();
  }, [x, trackWidth, playFail, playWin]);

  // Scene progress: 0..0.4 above-ground, 0.4..0.75 tunnel, 0.75..1 emerging
  const inTunnel = progress >= 0.4 && progress <= 0.95;
  const wifiBars = inTunnel ? 0 : Math.max(0, Math.round(4 - Math.abs(progress - 0.2) * 5));
  const cloudProgress = Math.min(40, progress * 100); // stalls at tunnel
  const stallCloud = inTunnel || progress > 0.4;
  const intelProgress = Math.min(100, progress * 110);
  const done = maxReached >= 0.98;

  return (
    <div className="flex flex-col items-center w-full gap-3 pb-4">
      <div className="w-full flex items-center justify-between text-[10px] font-display tracking-[0.3em] text-white/50 px-1">
        <span>CHAPTER 2 · {timeStr}</span>
        <span className="text-cyber-cyan">METRO MODE</span>
      </div>

      {/* Persona badge */}
      <div className="w-full flex items-center gap-2 px-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-magenta flex items-center justify-center text-base border border-white/20">
          {task.avatar}
        </div>
        <div className="flex-1">
          <p className="text-[9px] font-display tracking-widest text-white/50 leading-tight">PLAYING AS · {task.label}</p>
          <p className="text-xs text-white/85 leading-tight">{task.line}</p>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-center leading-tight">
          Slide the train through the tunnel.
        </h2>
      </div>

      {/* Parallax window scene — view from inside the train */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/10 bg-cyber-void">
        {/* Sky gradient — crossfades cleanly between outdoor sunrise and tunnel darkness */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #FF8FC4 0%, #FFB800 55%, #00F0FF 100%)" }}
          animate={{ opacity: 1 - Math.min(1, Math.max(0, (progress - 0.32) / 0.1)) }}
          transition={{ duration: 0.1 }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, #1a0633 0%, #050210 70%, #000 100%)",
          }}
          animate={{ opacity: inTunnel ? 1 : Math.max(0, (progress - 0.32) / 0.1) }}
          transition={{ duration: 0.1 }}
        />

        {/* Scrolling city silhouette — fades as tunnel engulfs */}
        <motion.div
          className="absolute bottom-0 left-0 flex"
          style={{
            x: useTransform(x, (v) => -v * 4),
            opacity: Math.max(0, 1 - Math.max(0, (progress - 0.32) / 0.08)),
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <svg key={i} viewBox="0 0 120 80" className="w-[160px] h-20">
              <path
                d="M0 80 L0 40 L10 40 L10 30 L25 30 L25 50 L40 50 L40 20 L55 20 L60 10 L65 20 L65 50 L80 50 L80 35 L95 35 L95 60 L110 60 L110 45 L120 45 L120 80 Z"
                fill="rgba(0,0,0,0.7)"
              />
            </svg>
          ))}
        </motion.div>

        {/* Tunnel wall streaks — only visible inside the tunnel, give a motion-blur feel */}
        {inTunnel && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[2px] bg-cyber-magenta/60"
                style={{
                  top: `${10 + i * 11}%`,
                  left: "-30%",
                  width: "30%",
                  boxShadow: "0 0 10px rgba(255,45,143,0.8)",
                }}
                animate={{ x: ["0%", "500%"] }}
                transition={{ duration: 0.35 + (i % 3) * 0.1, repeat: Infinity, ease: "linear", delay: i * 0.04 }}
              />
            ))}
            {/* Ambient tunnel lights passing on top and bottom */}
            <motion.div
              className="absolute top-2 left-0 w-8 h-3 bg-cyber-amber/70 rounded-full blur-sm"
              animate={{ x: ["-40px", "120%"] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-3 left-0 w-10 h-4 bg-cyber-cyan/60 rounded-full blur-sm"
              animate={{ x: ["-40px", "120%"] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear", delay: 0.2 }}
            />
            {/* Flickering overhead lamp */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,184,0,0.25) 0%, transparent 60%)" }}
              animate={{ opacity: [0.2, 0.6, 0.3, 0.7, 0.2] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
          </>
        )}

        {/* Vignette — stronger inside tunnel */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: inTunnel
              ? "inset 0 0 120px 20px rgba(0,0,0,0.9)"
              : "inset 0 0 40px 0 rgba(0,0,0,0.5)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Window frame */}
        <div className="absolute inset-3 border-2 border-white/15 rounded-xl pointer-events-none" />

        {/* Train interior reflection */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Entry/exit flash */}
        <AnimatePresence>
          {progress > 0.36 && progress < 0.46 && (
            <motion.div
              key="enter-flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-black pointer-events-none"
            />
          )}
          {progress > 0.9 && progress < 0.98 && (
            <motion.div
              key="exit-flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Status overlay */}
        <div className="absolute top-2 right-3 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm z-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 rounded-sm ${i < wifiBars ? "bg-cyber-cyan" : "bg-white/15"}`}
              animate={{ height: i < wifiBars ? 6 + i * 3 : 6 + i * 3 }}
              style={{ height: `${6 + i * 3}px` }}
            />
          ))}
          <span className={`text-[9px] font-display font-bold ml-1 ${wifiBars === 0 ? "text-red-400" : "text-cyber-cyan"}`}>
            {wifiBars === 0 ? "NO SIGNAL" : wifiBars + "/4"}
          </span>
        </div>

        {/* "ENTERING TUNNEL" / "EXITING" label */}
        <AnimatePresence>
          {progress > 0.35 && progress < 0.45 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 left-3 bg-black/70 border border-cyber-magenta/50 px-2 py-0.5 rounded-full backdrop-blur-sm z-20"
            >
              <span className="text-[9px] font-display font-bold tracking-widest text-cyber-magenta">▲ TUNNEL</span>
            </motion.div>
          )}
          {progress > 0.9 && progress < 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 left-3 bg-black/70 border border-cyber-cyan/50 px-2 py-0.5 rounded-full backdrop-blur-sm z-20"
            >
              <span className="text-[9px] font-display font-bold tracking-widest text-cyber-cyan">▼ DAYLIGHT</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Two devices — live comparison */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {/* Cloud phone */}
        <motion.div
          animate={{ filter: stallCloud ? "grayscale(0.7)" : "none" }}
          className="scene-panel p-3 flex flex-col items-center gap-1.5 min-h-[120px]"
        >
          <p className="text-[9px] font-display tracking-widest text-white/50">CLOUD LAPTOP</p>
          <p className="text-xl">{task.icon}</p>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-400 to-red-500"
              style={{ width: `${cloudProgress}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-white/60">{Math.round(cloudProgress)}%</p>
          {stallCloud && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-red-400 font-bold text-center"
            >
              📵 FROZEN<br />"reconnecting..."
            </motion.p>
          )}
        </motion.div>

        {/* Intel phone */}
        <motion.div
          animate={{ boxShadow: inTunnel ? "0 0 30px rgba(0,240,255,0.4)" : "0 0 10px rgba(0,240,255,0.15)" }}
          className="scene-panel p-3 flex flex-col items-center gap-1.5 min-h-[120px] border-cyber-cyan/30"
        >
          <p className="text-[9px] font-display tracking-widest text-cyber-cyan">INTEL AI PC</p>
          <p className="text-xl">{task.icon}</p>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta"
              style={{ width: `${intelProgress}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-cyber-cyan font-bold">{Math.round(intelProgress)}%</p>
          <p className="text-[10px] text-cyber-cyan/80 text-center">
            {intelProgress >= 100 ? "✓ DONE on-device" : "running on NPU"}
          </p>
        </motion.div>
      </div>

      {/* Train track + draggable */}
      <div className="w-full">
        <div
          ref={trackRef}
          className="relative w-full h-16 rounded-full bg-black/40 border border-white/10 overflow-hidden"
        >
          {/* Rail markings */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-0.5 bg-white/15"
              style={{ left: `${(i + 0.5) * 8}%` }}
            />
          ))}
          {/* Tunnel zone */}
          <div
            className="absolute top-0 bottom-0 bg-black/60 border-x border-cyber-magenta/40"
            style={{ left: "40%", width: "55%" }}
          >
            <p className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-display tracking-widest text-cyber-magenta/80">TUNNEL</p>
          </div>
          {/* Train */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: trackWidth }}
            dragElastic={0}
            dragMomentum={false}
            style={{ x }}
            whileDrag={{ scale: 1.08 }}
            className="absolute top-1/2 -translate-y-1/2 left-1 w-14 h-14 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-magenta shadow-[0_0_20px_rgba(0,240,255,0.6)] flex items-center justify-center text-2xl cursor-grab active:cursor-grabbing touch-none select-none border-2 border-white/40"
          >
            🚇
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 px-1 text-[9px] font-display tracking-widest text-white/50">
          <span>MAJESTIC</span>
          <span>MG ROAD</span>
          <span>INDIRANAGAR</span>
        </div>
      </div>

      {!done ? (
        <p className="text-xs text-white/50 italic">
          Drag the train right → watch what happens in the tunnel.
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-3"
        >
          <div className="scene-panel p-4 text-center">
            <p className="font-display text-xl font-bold text-cyber-cyan">Intel didn't flinch.</p>
            <p className="text-white/70 text-sm mt-1">
              Cloud froze at <span className="text-red-400 font-bold">{Math.round(cloudProgress)}%</span>.
              Intel's NPU finished the task offline.
            </p>
          </div>
          <button
            onClick={() => onComplete({ won: true })}
            className="btn-primary"
          >
            {task.cta}
          </button>
        </motion.div>
      )}
    </div>
  );
}
