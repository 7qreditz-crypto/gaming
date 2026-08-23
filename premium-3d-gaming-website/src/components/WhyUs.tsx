import { motion } from "framer-motion";
import { Compass, Layers, MessageCircle, Rocket, type LucideIcon } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { FEATURES } from "@/data/content";

const ICONS: Record<string, LucideIcon> = { Compass, Layers, MessageCircle, Rocket };

export default function WhyUs() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(60,80,255,0.09),transparent_60%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

      <div className="relative mx-auto w-[92%] max-w-6xl">
        <SectionHeading
          eyebrow="About The Zone"
          title="Why"
          highlight="Mafuj Gaming"
          subtitle="Built by a player, for players. Four pillars that turn scattered app-store scrolling into a proper gaming hub."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon] ?? Compass;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10 }}
                className="holo-border group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c13] p-6 text-center sm:text-left"
              >
                <span
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-20 blur-3xl transition-all duration-700 group-hover:opacity-55"
                  style={{ background: `rgb(${f.accent})` }}
                />
                <span className="cyber-grid pointer-events-none absolute inset-0 opacity-10" />

                <div className="relative mx-auto mb-5 inline-flex sm:mx-0">
                  <motion.span
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      background: `linear-gradient(150deg, rgba(${f.accent},0.28), rgba(255,255,255,0.03))`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 34px -14px rgba(${f.accent},0.95)`,
                      border: `1px solid rgba(${f.accent},0.35)`,
                    }}
                    animate={{ rotateY: [0, 12, 0, -12, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <Icon size={27} style={{ color: `rgb(${f.accent})` }} className="drop-shadow-[0_0_12px_currentColor]" />
                    <span
                      className="absolute inset-0 -z-10 translate-y-2 rounded-2xl opacity-45 blur-lg transition-transform duration-500 group-hover:translate-y-3.5"
                      style={{ background: `rgb(${f.accent})` }}
                    />
                  </motion.span>
                </div>

                <div className="relative">
                  <h3 className="font-display text-[17px] font-black uppercase tracking-[0.14em] text-white">
                    {f.title}
                  </h3>
                  <div
                    className="mx-auto mt-2.5 h-px w-12 sm:mx-0"
                    style={{ background: `linear-gradient(90deg, rgb(${f.accent}), transparent)` }}
                  />
                  <p className="mt-3.5 text-[13px] leading-relaxed text-slate-400">{f.text}</p>
                </div>

                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, rgb(${f.accent}), transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
