import { motion } from "framer-motion";
import { ChevronRight, Heart } from "lucide-react";
import Logo from "./ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "./ui/SocialIcons";
import { BRAND, INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS, WHATSAPP_URL } from "@/config";
import { CATEGORIES } from "@/data/content";

export default function Footer({ setCategory }: { setCategory: (id: string) => void }) {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const pickCat = (id: string) => {
    setCategory(id);
    window.setTimeout(() => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" }), 90);
  };

  return (
    <footer className="relative overflow-hidden bg-[#04050a] pt-16 sm:pt-20">
      {/* animated glowing line above the footer */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        <motion.div
          className="absolute top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          style={{ boxShadow: "0 0 18px 2px rgba(34,230,255,0.8)" }}
          animate={{ x: ["-40%", "240%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-600/8 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-fuchsia-600/8 blur-[110px]" />
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-[0.12]" />

      <div className="relative mx-auto w-[92%] max-w-7xl">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Logo size={52} />
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-slate-400">
              {BRAND.description}
            </p>
            <p className="mt-4 rounded-xl border border-white/6 bg-white/[0.02] p-3 text-[11.5px] leading-relaxed text-slate-500">
              A discovery & showcase platform only. No game files, APKs or copyrighted assets are hosted
              or redistributed here. All trademarks belong to their respective owners.
            </p>
          </div>

          {/* quick links */}
          <nav aria-label="Quick links">
            <h4 className="font-display text-[12px] font-black uppercase tracking-[0.24em] text-white">
              Quick Links
            </h4>
            <div className="mt-3 h-px w-10 bg-gradient-to-r from-cyan-400 to-transparent" />
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); go(l.href); }}
                    className="group inline-flex items-center gap-1.5 font-head text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-cyan-300"
                  >
                    <ChevronRight size={13} className="text-cyan-500/60 transition-transform group-hover:translate-x-1" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* categories */}
          <nav aria-label="Game categories">
            <h4 className="font-display text-[12px] font-black uppercase tracking-[0.24em] text-white">
              Categories
            </h4>
            <div className="mt-3 h-px w-10 bg-gradient-to-r from-fuchsia-400 to-transparent" />
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.filter((c) => c.id !== "all").slice(0, 7).map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => pickCat(c.id)}
                    className="group inline-flex items-center gap-1.5 font-head text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-fuchsia-300"
                  >
                    <ChevronRight size={13} className="text-fuchsia-500/60 transition-transform group-hover:translate-x-1" />
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* socials */}
          <div>
            <h4 className="font-display text-[12px] font-black uppercase tracking-[0.24em] text-white">
              Social Links
            </h4>
            <div className="mt-3 h-px w-10 bg-gradient-to-r from-emerald-400 to-transparent" />

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-3 transition-all duration-300 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/[0.07]"
            >
              <InstagramIcon size={26} />
              <span className="min-w-0">
                <span className="block font-head text-[12px] font-bold uppercase tracking-[0.16em] text-white">Instagram</span>
                <span className="block truncate text-[11.5px] text-slate-500">{INSTAGRAM_HANDLE}</span>
              </span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-3 transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-500/[0.07]"
            >
              <WhatsAppIcon size={26} />
              <span className="min-w-0">
                <span className="block font-head text-[12px] font-bold uppercase tracking-[0.16em] text-white">WhatsApp</span>
                <span className="block truncate text-[11.5px] text-slate-500">Direct chat</span>
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/6 py-6 sm:flex-row">
          <p className="text-center font-head text-[11.5px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            © {BRAND.year} {BRAND.full}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5 font-head text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Crafted with <Heart size={11} className="fill-red-500 text-red-500" /> for mobile gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
