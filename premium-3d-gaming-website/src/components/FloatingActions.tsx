import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "./ui/SocialIcons";
import { WHATSAPP_URL } from "@/config";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed right-3 z-[200] flex flex-col items-end gap-3 sm:right-5"
      style={{ bottom: "calc(0.85rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            key="top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/25 text-cyan-200 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.9)] transition-colors hover:border-cyan-400/70 hover:text-white sm:h-12 sm:w-12"
          >
            <ArrowUp size={19} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (opens in a new tab)"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 shadow-[0_10px_34px_-8px_rgba(16,185,129,0.9)] sm:h-[58px] sm:w-[58px]"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-emerald-400/60" />
        <span className="absolute inset-0 rounded-full ring-1 ring-white/25" />
        <WhatsAppIcon size={30} className="relative drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" />
        <span className="pointer-events-none absolute right-[calc(100%+10px)] hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#0b0e16]/95 px-3 py-2 font-head text-[11px] font-bold uppercase tracking-[0.16em] text-white opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100 lg:block">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
