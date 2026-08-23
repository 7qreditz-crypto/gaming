import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, Users, Smartphone, CalendarDays, Search, MessageCircle } from "lucide-react";
import type { Game } from "@/data/content";
import { WHATSAPP_NUMBER, whatsappLink } from "@/config";

export default function GameModal({ game, onClose }: { game: Game | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (game) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [game, onClose]);

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${game.title} details`}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark holo-border is-active relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl sm:rounded-3xl"
          >
            <div className="relative h-44 w-full overflow-hidden sm:h-60">
              <img src={game.image} alt={game.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e16] via-[#0b0e16]/40 to-transparent" />
              <div
                className="absolute inset-0 opacity-45 mix-blend-color"
                style={{ background: `linear-gradient(140deg, rgba(${game.accent},0.8), transparent)` }}
              />
              <div className="scanlines absolute inset-0 opacity-40" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white backdrop-blur transition hover:border-red-400/60 hover:text-red-300"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="clip-notch inline-block bg-black/60 px-2.5 py-1 font-head text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200 backdrop-blur">
                  {game.genre}
                </span>
                <h3 className="mt-2 font-display text-xl font-black uppercase tracking-wide text-white sm:text-3xl">
                  {game.title}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {[
                  { icon: Star, label: "Rating", value: game.rating.toFixed(1) },
                  { icon: Users, label: "Players", value: game.players },
                  { icon: Smartphone, label: "Platform", value: game.platform },
                  { icon: CalendarDays, label: "Released", value: String(game.year) },
                ].map((s) => (
                  <div key={s.label} className="clip-notch border border-white/8 bg-white/[0.03] px-3 py-2.5">
                    <p className="flex items-center gap-1.5 font-head text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300/60">
                      <s.icon size={11} /> {s.label}
                    </p>
                    <p className="mt-1 font-display text-[12px] font-bold text-white">{s.value}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-[13.5px] leading-relaxed text-slate-300 sm:text-[15px]">{game.description}</p>

              <p className="mt-4 rounded-xl border border-amber-400/15 bg-amber-400/[0.05] p-3 text-[11.5px] leading-relaxed text-amber-200/70">
                MAFUJ GAMING is a discovery & showcase platform. We do not host, distribute or mirror game
                files, APKs or copyrighted assets — always download titles from official app stores.
              </p>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={`https://play.google.com/store/search?q=${encodeURIComponent(game.title)}&c=apps`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon clip-notch inline-flex flex-1 items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 py-3.5 font-head text-[11px] font-bold uppercase tracking-[0.2em] text-white"
                >
                  <Search size={14} className="relative z-[2]" />
                  <span className="relative z-[2]">Find On Official Store</span>
                </a>
                <a
                  href={whatsappLink(WHATSAPP_NUMBER, `Hi! Let's talk about ${game.title} — I found it on your gaming website.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon clip-notch inline-flex flex-1 items-center justify-center gap-2 border border-emerald-400/30 bg-emerald-500/10 py-3.5 font-head text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-100"
                >
                  <MessageCircle size={14} className="relative z-[2]" />
                  <span className="relative z-[2]">Discuss This Game</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
