import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, SlidersHorizontal, Gamepad2 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import GameCard from "./GameCard";
import { CATEGORIES, GAMES, SORTS, type Game, type SortId } from "@/data/content";
import { cn } from "@/utils/cn";

export default function GamesSection({
  category,
  setCategory,
  onView,
}: {
  category: string;
  setCategory: (id: string) => void;
  onView: (g: Game) => void;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("trending");
  const [visible, setVisible] = useState(9);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = GAMES.filter((g) => {
      const inCat = category === "all" || g.categoryId === category;
      const inQ =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        g.studio.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q);
      return inCat && inQ;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.year - a.year;
        case "az":
          return a.title.localeCompare(b.title);
        default:
          return (a.trending ?? 99) - (b.trending ?? 99) || b.rating - a.rating;
      }
    });
    return list;
  }, [query, category, sort]);

  const shown = filtered.slice(0, visible);

  return (
    <section id="games" className="relative overflow-hidden py-20 sm:py-28">
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[130px]" />

      <div className="relative mx-auto w-[92%] max-w-7xl">
        <SectionHeading
          eyebrow="Game Library"
          title="Featured"
          highlight="Mobile Games"
          subtitle="A curated arsenal of the biggest mobile titles on the planet. Search, filter and sort to find your next obsession."
        />

        {/* ---------- CONTROL BAR ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass-dark mt-10 rounded-2xl p-3 sm:p-4"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* search */}
            <div className="relative flex-1">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/70" />
              <input
                type="search"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setVisible(9); }}
                placeholder="Search games, genres or studios…"
                aria-label="Search games"
                className="clip-notch h-12 w-full border border-white/8 bg-white/[0.03] pl-11 pr-10 font-head text-[14px] font-medium text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400/45 focus:bg-white/[0.055] focus:shadow-[0_0_28px_-8px_rgba(34,230,255,0.8)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* sort */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="hidden shrink-0 items-center gap-1.5 font-head text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:flex">
                <SlidersHorizontal size={13} /> Sort
              </span>
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSort(s.id)}
                  aria-pressed={sort === s.id}
                  className={cn(
                    "clip-notch shrink-0 px-3.5 py-2.5 font-head text-[10.5px] font-bold uppercase tracking-[0.16em] transition-all duration-300",
                    sort === s.id
                      ? "bg-gradient-to-r from-cyan-500/90 to-violet-600/90 text-white shadow-[0_0_20px_-6px_rgba(34,230,255,0.9)]"
                      : "border border-white/8 bg-white/[0.03] text-slate-400 hover:text-white",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* category chips */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => { setCategory(c.id); setVisible(9); }}
                aria-pressed={category === c.id}
                className={cn(
                  "clip-notch group shrink-0 px-3.5 py-2 font-head text-[10.5px] font-bold uppercase tracking-[0.14em] transition-all duration-300",
                  category === c.id
                    ? "text-white"
                    : "border border-white/8 bg-white/[0.025] text-slate-400 hover:text-white",
                )}
                style={
                  category === c.id
                    ? { background: `linear-gradient(100deg, rgba(${c.accent},0.9), rgba(90,60,220,0.7))`, boxShadow: `0 0 22px -6px rgba(${c.accent},0.9)` }
                    : undefined
                }
              >
                <span className="mr-1.5">{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* result count */}
        <div className="mt-6 flex items-center justify-between font-head text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
          <span>
            <span className="text-cyan-300">{filtered.length}</span> {filtered.length === 1 ? "title" : "titles"} found
          </span>
          {(query || category !== "all") && (
            <button
              type="button"
              onClick={() => { setQuery(""); setCategory("all"); }}
              className="inline-flex items-center gap-1.5 text-slate-400 transition hover:text-fuchsia-300"
            >
              <X size={13} /> Reset filters
            </button>
          )}
        </div>

        {/* ---------- GRID ---------- */}
        <div className="perspective mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {shown.map((g, i) => (
              <motion.div key={g.id} layout exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.25 }}>
                <GameCard game={g} index={i} onView={onView} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark mt-8 flex flex-col items-center rounded-2xl px-6 py-14 text-center"
          >
            <Gamepad2 size={38} className="text-slate-600" />
            <p className="mt-4 font-display text-lg font-black uppercase tracking-wide text-white">No games found</p>
            <p className="mt-2 max-w-sm text-[13px] text-slate-400">
              Try a different keyword or reset the filters to browse the full library.
            </p>
            <button
              type="button"
              onClick={() => { setQuery(""); setCategory("all"); }}
              className="btn-neon clip-notch mt-6 bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-head text-[11px] font-bold uppercase tracking-[0.2em] text-white"
            >
              <span className="relative z-[2]">Reset Filters</span>
            </button>
          </motion.div>
        )}

        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + 6)}
              className="btn-neon clip-notch inline-flex items-center gap-2 border border-cyan-400/25 bg-cyan-400/[0.06] px-8 py-4 font-head text-[12px] font-bold uppercase tracking-[0.24em] text-cyan-100 transition hover:border-cyan-400/60"
            >
              <span className="relative z-[2]">Load More Games</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
