import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Users, ArrowRight, Smartphone } from "lucide-react";
import type { Game } from "@/data/content";
import { cn } from "@/utils/cn";

export default function GameCard({
  game,
  index,
  onView,
}: {
  game: Game;
  index: number;
  onView: (g: Game) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);

  const canTilt = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setGlow({ x: px * 100, y: py * 100 });
    setStyle({
      transform: `perspective(1000px) rotateX(${(0.5 - py) * 11}deg) rotateY(${(px - 0.5) * 13}deg) translate3d(0,-10px,26px) scale(1.015)`,
    });
  };

  const reset = () => {
    setHover(false);
    setStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale(1)" });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group h-full [transform-style:preserve-3d]"
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={reset}
        style={{ ...style, transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
        className="holo-border relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c13] will-change-transform"
      >
        {/* dynamic glow follow */}
        <div
          className="pointer-events-none absolute inset-0 z-[3] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(${game.accent},0.16), transparent 62%)`,
          }}
        />

        {/* ---- artwork ---- */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={game.image}
            alt={`${game.title} — ${game.genre} mobile game artwork`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.13]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c13] via-[#0a0c13]/35 to-transparent" />
          <div
            className="absolute inset-0 mix-blend-color opacity-60 transition-opacity duration-500 group-hover:opacity-20"
            style={{ background: `linear-gradient(140deg, rgba(${game.accent},0.55), rgba(10,12,19,0.2))` }}
          />
          <div className="scanlines absolute inset-0 opacity-40" />

          {/* corner brackets */}
          <span className="absolute left-2.5 top-2.5 h-4 w-4 border-l border-t border-cyan-300/50 transition-all duration-500 group-hover:h-6 group-hover:w-6" />
          <span className="absolute right-2.5 top-2.5 h-4 w-4 border-r border-t border-fuchsia-400/50 transition-all duration-500 group-hover:h-6 group-hover:w-6" />

          {/* badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {game.badge && (
              <span
                className="clip-notch inline-flex w-fit items-center gap-1 px-2 py-1 font-head text-[9px] font-black uppercase tracking-[0.18em] text-white backdrop-blur"
                style={{ background: `rgba(${game.accent},0.85)` }}
              >
                {game.badge}
              </span>
            )}
          </div>

          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-amber-300/25 bg-black/55 px-2 py-1 backdrop-blur">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="font-display text-[11px] font-bold text-white">{game.rating.toFixed(1)}</span>
          </div>

          {/* game "logo" plate */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <div
              className="clip-hex flex h-9 w-9 shrink-0 items-center justify-center text-[13px] font-black text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, rgba(${game.accent},0.95), rgba(10,12,19,0.9))` }}
              aria-hidden="true"
            >
              {game.title.slice(0, 1)}
            </div>
            <span className="clip-notch bg-black/60 px-2 py-1 font-head text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur">
              {game.genre}
            </span>
          </div>
        </div>

        {/* ---- body ---- */}
        <div className="relative z-[4] flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-display text-[15px] font-black uppercase leading-tight tracking-wide text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-base">
            {game.title}
          </h3>
          <p className="mt-1 font-head text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {game.studio} · {game.year}
          </p>

          <p
            className={cn(
              "mt-3 text-[12.5px] leading-relaxed text-slate-400 transition-all duration-500 sm:text-[13px]",
              hover ? "opacity-100" : "opacity-80",
            )}
          >
            {game.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/6 pt-3 font-head text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Smartphone size={12} className="text-cyan-400/80" />
              {game.platform}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={12} className="text-fuchsia-400/80" />
              {game.players}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onView(game)}
            aria-label={`View details for ${game.title}`}
            className="btn-neon clip-notch mt-4 inline-flex w-full items-center justify-center gap-2 border border-white/10 bg-white/[0.04] py-3 font-head text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-300 group-hover:border-transparent"
            style={hover ? { background: `linear-gradient(100deg, rgba(${game.accent},0.9), rgba(80,60,255,0.75))` } : undefined}
          >
            <span className="relative z-[2]">View Game</span>
            <ArrowRight size={14} className="relative z-[2] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* bottom neon bar */}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, rgba(${game.accent},1), rgba(168,85,247,0.9), transparent)` }}
        />
      </div>
    </motion.article>
  );
}
