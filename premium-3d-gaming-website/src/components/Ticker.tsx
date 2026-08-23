import { Zap } from "lucide-react";

const ITEMS = [
  "BATTLE ROYALE",
  "60 FPS COMBAT",
  "ESPORTS READY",
  "OPEN WORLD RPG",
  "RANKED SEASONS",
  "CROSS-PLAY",
  "NEW DROPS WEEKLY",
  "SQUAD UP",
  "HYPER-CASUAL",
  "TOURNAMENTS",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/6 bg-[#07080e] py-3.5">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05060a] via-transparent to-[#05060a] z-10" />
      <div className="flex w-max animate-marquee items-center gap-8 will-change-transform">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex shrink-0 items-center gap-8">
            <span className="font-display text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 sm:text-[13px]">
              {t}
            </span>
            <Zap size={12} className="shrink-0 text-cyan-400/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
