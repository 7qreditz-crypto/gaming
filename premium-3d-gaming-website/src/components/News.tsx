import { motion } from "framer-motion";
import { Clock, BookOpen, ArrowUpRight, Newspaper } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { NEWS } from "@/data/content";
import { INSTAGRAM_URL } from "@/config";

export default function News() {
  return (
    <section id="updates" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(10,14,26,0.6),transparent)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />

      <div className="relative mx-auto w-[92%] max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Feed"
            title="Latest Gaming"
            highlight="Updates"
            subtitle="Patch notes, esports headlines, seasonal drops and pro tips — refreshed around the clock."
          />
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="btn-neon clip-notch inline-flex shrink-0 items-center gap-2 border border-white/10 bg-white/[0.04] px-5 py-3 font-head text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-fuchsia-400/50"
          >
            <Newspaper size={14} className="relative z-[2] text-fuchsia-300" />
            <span className="relative z-[2]">More on Instagram</span>
          </motion.a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((n, i) => (
            <motion.article
              key={n.id}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
              className="holo-border group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c13] transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={n.image}
                  alt={n.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-85 transition-all duration-[900ms] group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c13] via-[#0a0c13]/25 to-transparent" />
                <div
                  className="absolute inset-0 opacity-40 mix-blend-color transition-opacity duration-500 group-hover:opacity-10"
                  style={{ background: `linear-gradient(140deg, rgba(${n.accent},0.8), transparent)` }}
                />
                <span
                  className="clip-notch absolute left-3 top-3 px-2.5 py-1 font-head text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur"
                  style={{ background: `rgba(${n.accent},0.85)` }}
                >
                  {n.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-head text-[16px] font-bold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-[17px]">
                  {n.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate-400">{n.excerpt}</p>

                <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-3 font-head text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={11} className="text-cyan-400/70" /> {n.time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen size={11} className="text-fuchsia-400/70" /> {n.read}
                  </span>
                </div>

                <span className="mt-4 inline-flex items-center gap-1.5 font-head text-[10.5px] font-bold uppercase tracking-[0.2em] text-cyan-300/80 transition-all duration-300 group-hover:gap-3 group-hover:text-white">
                  Read update <ArrowUpRight size={13} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
