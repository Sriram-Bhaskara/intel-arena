import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "../state/sound";

export default function NextStep({ matchCode, onRestart }) {
  const { playClick } = useSound();
  const [qrData] = useState(matchCode || "STU-U5-16G");

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&format=png&color=0071C2&bgcolor=FFFFFF&margin=10`;

  return (
    <div className="flex flex-col items-center w-full text-white p-4">
      <div className="self-start text-xs text-white/50 tracking-widest uppercase mb-3">
        Next Step
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 w-full max-w-md mx-auto text-center pb-8"
      >
        <h2 className="text-2xl font-black text-white">Show this at the store</h2>
        <p className="text-white/60 text-sm">
          Save or screenshot this code. Show it at Reliance Digital, Croma, or Vijay Sales.
        </p>

        {/* QR Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-white/8 to-white/3 rounded-3xl p-6 border border-white/15 shadow-[0_0_40px_rgba(0,212,255,0.08)] w-full"
        >
          <div className="flex flex-col items-center gap-4">
            <img
              src={qrUrl}
              alt="QR Code"
              className="w-48 h-48 rounded-lg shadow-lg bg-white p-1"
              loading="eager"
            />
            <div className="text-2xl font-mono font-black text-intel-neon tracking-widest bg-white/10 px-5 py-2.5 rounded-lg border border-intel-neon/20">
              {qrData}
            </div>
            <p className="text-white/40 text-xs">Store staff can scan or read this code</p>
          </div>
        </motion.div>

        {/* What to say */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-intel-blue/10 rounded-xl p-4 border border-intel-blue/20 w-full"
        >
          <h3 className="text-xs font-bold text-intel-neon mb-2 uppercase tracking-wider">💬 What to say</h3>
          <p className="text-white/80 text-sm italic leading-relaxed">
            "I'd like to see the Intel Core Ultra AI PC that matches this code. Can you give me a demo?"
          </p>
        </motion.div>

        {/* Play again */}
        <button
          onClick={() => {
            playClick();
            onRestart?.();
          }}
          className="w-full py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/15 transition-colors text-base"
        >
          🔄 Play again
        </button>

        <p className="text-white/20 text-[10px]">
          Intel Arena · CMRIT × Intel 1 Million Minds
        </p>
      </motion.div>
    </div>
  );
}
