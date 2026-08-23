import { motion } from "framer-motion";
import { ChevronDown, Gamepad2, Radio, Sparkles, Zap } from "lucide-react";
import HoloScene from "./effects/HoloScene";
import ParticleField from "./effects/ParticleField";
import { WhatsAppIcon } from "./ui/SocialIcons";
import { STATS } from "@/data/content";
import { WHATSAPP_URL } from "@/config";

const scrollTo = (sel: string) => {
  document.querySelector(sel)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const HUD = [
  { label: "PING", value: "12ms", cls: "top-[12%] left-[2%]" },
  { label: "FPS", value: "120", cls: "bottom-[20%] right-[2%]" },
  { label: "SQUAD", value: "4/4", cls: "top-[26%] right-[0%]" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="scanlines relative flex min-h-[100svh] w-full items-center overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-24"
    >
      {/* ---------- BACKDROP ---------- */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/9072394/pexels-photo-9072394.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=900"
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          className="h-full w-full scale-110 object-cover opacity-[0.22] blur-[2px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_35%,rgba(34,120,255,0.22),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_75%,rgba(168,85,247,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_85%,rgba(255,45,80,0.14),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#05060a]/45 to-[#05060a]" />

        {/* perspective floor grid */}
        <div
          className="absolute inset-x-0 bottom-0 h-[42vh] opacity-45 [mask-image:linear-gradient(to_top,#000_5%,transparent_92%)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,230,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.24) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            transform: "perspective(420px) rotateX(64deg)",
            transformOrigin: "bottom",
          }}
        />
        <ParticleField density={1.1} />

        {/* animated light bars */}
        <motion.div
          className="absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
          animate={{ opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[14%] top-0 h-full w-px bg-gradient-to-b from-transparent via-fuchsia-500/40 to-transparent"
          animate={{ opacity: [0.5, 0.12, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="mx-auto grid w-[92%] max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-3.5 py-1.5 backdrop-blur"
          >
            <Radio size={13} className="animate-pulse text-cyan-300" />
            <span className="font-head text-[10px] font-bold uppercase tracking-[0.32em] text-cyan-200 sm:text-[11px]">
              Live · Mobile Gaming Hub 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[30px] font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[58px] xl:text-[64px]"
          >
            <span className="block">Enter The</span>
            <span className="block text-gradient-neon neon-shadow animate-flicker">World Of</span>
            <span className="block">Mobile Gaming</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-slate-400 sm:text-[16px] lg:mx-0"
          >
            Discover the best mobile games, trending titles, gaming experiences and
            communities — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
          >
            <button
              type="button"
              onClick={() => scrollTo("#games")}
              className="btn-neon clip-notch group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-7 py-4 font-head text-[13px] font-bold uppercase tracking-[0.24em] text-white shadow-[0_0_40px_-8px_rgba(34,230,255,0.95)]"
            >
              <Gamepad2 size={17} className="relative z-[2]" />
              <span className="relative z-[2]">Explore Games</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="btn-neon clip-notch group relative inline-flex items-center justify-center gap-2.5 border border-white/15 bg-white/[0.04] px-7 py-4 font-head text-[13px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur transition-colors hover:border-fuchsia-400/50"
            >
              <Sparkles size={16} className="relative z-[2] text-fuchsia-300" />
              <span className="relative z-[2]">Connect With Me</span>
            </button>
          </motion.div>

          {/* quick whatsapp inline */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium text-slate-400 transition-colors hover:text-emerald-300"
          >
            <WhatsAppIcon size={16} />
            Chat instantly on WhatsApp
            <Zap size={12} className="text-emerald-400" />
          </motion.a>

          {/* stats */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="glass clip-notch px-3 py-3 text-center transition-transform duration-300 hover:-translate-y-1 lg:text-left"
              >
                <dt className="font-display text-lg font-black text-white sm:text-xl">{s.value}</dt>
                <dd className="mt-0.5 font-head text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/70 sm:text-[10px]">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---------- 3D OBJECT ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[540px]"
        >
          {/* halo rings */}
          <div className="pointer-events-none absolute inset-[8%] rounded-full border border-cyan-400/10" />
          <div className="pointer-events-none absolute inset-[20%] rounded-full border border-fuchsia-400/10" />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,140,255,0.18),transparent_62%)] blur-2xl" />

          <motion.div
            className="pointer-events-none absolute inset-[4%] rounded-full border border-dashed border-cyan-300/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          />

          <HoloScene variant="hero" />

          {/* floating holographic HUD chips */}
          {HUD.map((h, i) => (
            <motion.div
              key={h.label}
              className={`glass-dark clip-notch absolute ${h.cls} hidden px-3 py-2 sm:block`}
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            >
              <p className="font-head text-[8px] font-bold uppercase tracking-[0.28em] text-cyan-300/70">{h.label}</p>
              <p className="font-display text-sm font-black text-white">{h.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollTo("#games")}
        aria-label="Scroll to games"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-slate-500 transition-colors hover:text-cyan-300 sm:flex"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-head text-[9px] font-bold uppercase tracking-[0.34em]">Scroll</span>
        <ChevronDown size={17} />
      </motion.button>
    </section>
  );
}
