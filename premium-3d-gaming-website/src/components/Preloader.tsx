import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./ui/Logo";
import { BRAND } from "@/config";

const LINES = ["BOOTING NEURAL CORE", "SYNCING GAME LIBRARY", "CALIBRATING SHADERS", "ENTERING GAMEVERSE"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let p = 0;
    const id = window.setInterval(() => {
      p = Math.min(100, p + 6 + Math.random() * 13);
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => {
          setShow(false);
          onDone();
        }, 240);
      }
    }, 110);
    return () => window.clearInterval(id);
  }, [onDone]);

  const stage = Math.min(LINES.length - 1, Math.floor((progress / 100) * LINES.length));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#05060a]"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="cyber-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[90px]" />

          <div className="relative flex w-[85vw] max-w-sm flex-col items-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan-400/40" />
              <LogoMark size={86} />
            </motion.div>

            <p className="mt-7 font-display text-lg font-black tracking-[0.3em] text-white">
              {BRAND.name}
              <span className="text-gradient-neon">{BRAND.suffix}</span>
            </p>

            <div className="mt-7 h-[3px] w-full overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
                style={{ width: `${progress}%`, boxShadow: "0 0 16px rgba(34,230,255,0.7)" }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="mt-3 flex w-full items-center justify-between font-head text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/70">
              <span>{LINES[stage]}</span>
              <span className="tabular-nums text-white/80">{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
