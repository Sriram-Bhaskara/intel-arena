import { useEffect, useState } from "react";

export default function TimerRing({ totalTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, onTimeUp]);

  const r = 44;
  const circumference = 2 * Math.PI * r;
  const progress = timeLeft / totalTime;
  const offset = circumference * (1 - progress);
  const urgent = timeLeft <= 5;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
          <circle
            cx="50" cy="50" r={r}
            stroke={urgent ? "#ff4444" : "rgb(0, 212, 255)"}
            strokeWidth="6" fill="none" strokeLinecap="round"
            style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center font-black text-xl ${urgent ? "text-red-400 animate-pulse" : "text-white"}`}>
          {timeLeft}
        </div>
      </div>
    </div>
  );
}
