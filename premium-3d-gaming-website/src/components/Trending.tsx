import { motion } from "framer-motion";
import { Flame, Star, Users, ArrowRight, TrendingUp } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { GAMES, type Game } from "@/data/content";
import { cn } from "@/utils/cn";

export default function Trending({ onView }: { onView: (g: Game) => void }) {
  const list = GAMES.filter((g) => g.trending).sort((a, b) => (a.trending ?? 99) - (b.trending ?? 99));

  return (
    <section id="trending" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,45,80,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(34,230,255,0.10),transparent_55%)]" />

      <div className="relative mx-auto w-[92%] max-w-6xl">
        <SectionHeading
          eyebrow="Hype Meter"
          title="Trending"
          highlight="Now"
          subtitle="What the community is grinding this week — ranked by player surge, watch time and download velocity."
        />

        <div className="mt-12 space-y-5 sm:space-y-6">
          {list.map((g, i) => (
            <motion.article
              key={g.id}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7, delay: Math.min(i * 0.07, 0.3), ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "holo-border group relative grid overflow-hidden rounded-3xl border border-white/8 bg-[#0a0c13] transition-transform duration-500 hover:-translate-y-1.5",
                "md:grid-cols-[minmax(0,44%)_1fr]",
                i % 2 === 1 && "md:[direction:rtl]",
              )}
            >
              {/* artwork */}
              <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[260px] md:[direction:ltr]">
                <img
                  src={g.image}
                  alt={`${g.title} artwork`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-55 mix-blend-color transition-opacity duration-500 group-hover:opacity-25"
                  style={{ background: `linear-gradient(140deg, rgba(${g.accent},0.85), rgba(10,12,19,0.4))` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c13] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0a0c13]" />
                <div className="scanlines absolute inset-0 opacity-35" />

                {/* rank */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="clip-hex flex h-11 w-11 items-center justify-center bg-gradient-to-br from-cyan-400 to-violet-600 font-display text-base font-black text-white shadow-[0_0_24px_-4px_rgba(34,230,255,0.95)]">
                    {g.trending}
                  </span>
                  <span className="clip-notch inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 px-2.5 py-1.5 font-head text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_22px_-4px_rgba(255,80,60,0.95)]">
                    <Flame size={11} className="animate-pulse" /> Trending
                  </span>
                </div>
              </div>

              {/* content */}
              <div className="relative flex flex-col justify-center p-5 sm:p-7 md:[direction:ltr]">
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-15 blur-3xl transition-opacity duration-700 group-hover:opacity-35"
                  style={{ background: `rgb(${g.accent})` }}
                />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="clip-notch bg-white/[0.06] px-2.5 py-1 font-head text-[9.5px] font-bold uppercase tracking-[0.2em] text-cyan-200">
                      {g.genre}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/25 bg-amber-400/5 px-2.5 py-1 font-display text-[11px] font-bold text-amber-200">
                      <Star size={10} className="fill-amber-400 text-amber-400" /> {g.rating.toFixed(1)}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-head text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <Users size={10} /> {g.players}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-black uppercase leading-tight tracking-wide text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-2xl lg:text-[28px]">
                    {g.title}
                  </h3>
                  <p className="mt-1 font-head text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                    {g.studio} · {g.platform}
                  </p>

                  <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-slate-400 sm:text-[14.5px]">
                    {g.description}
                  </p>

                  {/* hype bar */}
                  <div className="mt-5 max-w-sm">
                    <div className="mb-1.5 flex items-center justify-between font-head text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <TrendingUp size={11} className="text-emerald-400" /> Hype index
                      </span>
                      <span className="text-white">{98 - (g.trending ?? 1) * 4}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${98 - (g.trending ?? 1) * 4}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, rgba(${g.accent},1), #a855f7)`, boxShadow: `0 0 14px rgba(${g.accent},0.8)` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onView(g)}
                    className="btn-neon clip-notch mt-6 inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-6 py-3.5 font-head text-[11px] font-bold uppercase tracking-[0.22em] text-white sm:w-auto"
                  >
                    <span className="relative z-[2]">Explore</span>
                    <ArrowRight size={14} className="relative z-[2]" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
