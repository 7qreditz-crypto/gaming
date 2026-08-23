import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "./ui/SocialIcons";
import { INSTAGRAM_URL, NAV_LINKS, WHATSAPP_URL } from "@/config";
import { cn } from "@/utils/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(`#${vis.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.15, 0.4] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled ? "py-2" : "py-3 sm:py-5",
        )}
      >
        <div className="mx-auto w-[94%] max-w-7xl">
          <nav
            className={cn(
              "relative flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-5 sm:py-3",
              scrolled
                ? "glass-dark shadow-[0_10px_40px_-12px_rgba(0,0,0,0.9)] ring-1 ring-cyan-400/10"
                : "bg-transparent",
            )}
          >
            {/* top scan line */}
            <span
              className={cn(
                "pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent transition-opacity duration-500",
                scrolled ? "opacity-100" : "opacity-0",
              )}
            />

            <a href="#home" onClick={(e) => { e.preventDefault(); go("#home"); }} aria-label="MAFUJ GAMING home">
              <Logo size={scrolled ? 36 : 42} compact={scrolled} />
            </a>

            {/* desktop nav */}
            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((l) => {
                const isActive = active === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => { e.preventDefault(); go(l.href); }}
                      className={cn(
                        "group relative block rounded-lg px-3.5 py-2 font-head text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300",
                        isActive ? "text-white" : "text-slate-400 hover:text-white",
                      )}
                    >
                      {l.label}
                      <span
                        className={cn(
                          "absolute inset-x-2.5 -bottom-0.5 h-px origin-left bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                        style={{ boxShadow: "0 0 10px rgba(34,230,255,0.8)" }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow MAFUJ GAMING on Instagram"
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-105 hover:border-fuchsia-400/40 hover:shadow-[0_0_20px_-4px_rgba(244,63,142,0.7)] sm:flex"
              >
                <InstagramIcon size={19} />
              </a>

              <a
                href="#games"
                onClick={(e) => { e.preventDefault(); go("#games"); }}
                className="btn-neon clip-notch group relative hidden items-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-5 py-2.5 font-head text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_28px_-6px_rgba(34,230,255,0.9)] md:inline-flex"
              >
                <Gamepad2 size={15} className="relative z-[2]" />
                <span className="relative z-[2]">Explore Games</span>
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-200 transition-colors hover:border-cyan-400/50 lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={21} />
                    </motion.span>
                  ) : (
                    <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={21} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* scroll progress */}
          <div className="mx-auto mt-1 h-[2px] w-full overflow-hidden rounded-full bg-transparent">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 transition-[width] duration-150"
              style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(34,230,255,0.8)" }}
            />
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[99] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-[#04050a]/92 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <div className="cyber-grid pointer-events-none absolute inset-0 opacity-30" />
            <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />

            <motion.nav
              className="absolute inset-x-0 bottom-0 top-[86px] flex flex-col justify-between overflow-y-auto px-6 pb-8 pt-4"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="space-y-2">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ x: -26, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={l.href}
                      onClick={(e) => { e.preventDefault(); go(l.href); }}
                      className={cn(
                        "clip-notch flex items-center justify-between border border-white/8 bg-white/[0.035] px-5 py-4 font-display text-lg font-black uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.98]",
                        active === l.href ? "text-white ring-1 ring-cyan-400/40" : "text-slate-300",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-head text-[11px] font-bold text-cyan-400/70">0{i + 1}</span>
                        {l.label}
                      </span>
                      <ArrowUpRight size={18} className="text-cyan-300/70" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-8 space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.4 }}
              >
                <a
                  href="#games"
                  onClick={(e) => { e.preventDefault(); go("#games"); }}
                  className="btn-neon clip-notch flex w-full items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 py-4 font-head text-sm font-bold uppercase tracking-[0.24em] text-white"
                >
                  <Gamepad2 size={17} className="relative z-[2]" />
                  <span className="relative z-[2]">Explore Games</span>
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clip-notch flex items-center justify-center gap-2 border border-fuchsia-400/25 bg-fuchsia-500/10 py-3.5 font-head text-[12px] font-bold uppercase tracking-[0.18em] text-fuchsia-100"
                  >
                    <InstagramIcon size={18} /> Instagram
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clip-notch flex items-center justify-center gap-2 border border-emerald-400/25 bg-emerald-500/10 py-3.5 font-head text-[12px] font-bold uppercase tracking-[0.18em] text-emerald-100"
                  >
                    <WhatsAppIcon size={18} /> WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
