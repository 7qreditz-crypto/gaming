import { motion } from "framer-motion";
import {
  Crosshair, Target, Zap, Wand2, Swords, Brain, Trophy, Globe2, Users, Gamepad2, ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { CATEGORIES, GAMES } from "@/data/content";

const ICONS: Record<string, LucideIcon> = {
  Crosshair, Target, Zap, Wand2, Swords, Brain, Trophy, Globe2, Users, Gamepad2,
};

export default function Categories({ setCategory }: { setCategory: (id: string) => void }) {
  const list = CATEGORIES.filter((c) => c.id !== "all");

  const pick = (id: string) => {
    setCategory(id);
    window.setTimeout(
      () => document.getElementById("games")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      90,
    );
  };

  return (
    <section id="categories" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(120,60,255,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="relative mx-auto w-[92%] max-w-7xl">
        <SectionHeading
          eyebrow="Browse By Genre"
          title="Game"
          highlight="Categories"
          subtitle="Nine battle-tested genres. Tap a sector to instantly filter the library."
        />

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-3">
          {list.map((c, i) => {
            const Icon = ICONS[c.icon] ?? Gamepad2;
            const count = GAMES.filter((g) => g.categoryId === c.id).length;
            return (
              <motion.button
                key={c.id}
                type="button"
                onClick={() => pick(c.id)}
                initial={{ opacity: 0, y: 34, rotateX: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: Math.min(i * 0.06, 0.35), ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.97 }}
                aria-label={`Filter games by ${c.label}`}
                className="holo-border group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c13] p-4 text-left transition-shadow duration-500 sm:p-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* animated aura */}
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-60"
                  style={{ background: `rgb(${c.accent})` }}
                />
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(150deg, rgba(${c.accent},0.16), transparent 65%)` }}
                />
                {/* moving grid */}
                <span className="cyber-grid pointer-events-none absolute inset-0 opacity-[0.18] transition-opacity duration-500 group-hover:opacity-40" />

                <div className="relative">
                  {/* 3D hex icon */}
                  <div className="relative mb-4 inline-flex">
                    <span
                      className="clip-hex flex h-12 w-12 items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 sm:h-14 sm:w-14"
                      style={{ background: `linear-gradient(150deg, rgba(${c.accent},0.95), rgba(12,14,22,0.95))` }}
                    >
                      <Icon size={22} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                    </span>
                    <span
                      className="clip-hex absolute inset-0 -z-10 translate-x-1.5 translate-y-1.5 opacity-45 blur-[3px] transition-transform duration-500 group-hover:translate-x-2.5 group-hover:translate-y-2.5"
                      style={{ background: `rgb(${c.accent})` }}
                    />
                  </div>

                  <h3 className="font-display text-[13px] font-black uppercase leading-tight tracking-[0.06em] text-white sm:text-[15px]">
                    <span className="mr-1.5 text-base">{c.emoji}</span>
                    {c.label}
                  </h3>
                  <p className="mt-1.5 font-head text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {count} {count === 1 ? "title" : "titles"}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 font-head text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/80 transition-all duration-300 group-hover:gap-3 group-hover:text-white">
                    Explore <ArrowUpRight size={13} />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
