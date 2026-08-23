import { motion } from "framer-motion";
import { MousePointer2, Orbit, Boxes, Cpu } from "lucide-react";
import HoloScene from "./effects/HoloScene";
import Reveal from "./ui/Reveal";

const CHIPS = [
  { icon: Orbit, label: "Realtime Orbit", cls: "left-[4%] top-[16%]", delay: 0 },
  { icon: Boxes, label: "Holo Objects", cls: "right-[4%] top-[26%]", delay: 0.6 },
  { icon: Cpu, label: "60 FPS Engine", cls: "left-[7%] bottom-[18%]", delay: 1.2 },
];

export default function Gameverse() {
  return (
    <section id="gameverse" className="relative overflow-hidden py-16 sm:py-24">
      {/* frame */}
      <div className="relative mx-auto w-[92%] max-w-7xl">
        <div className="holo-border is-active relative overflow-hidden rounded-[28px] border border-white/8 bg-[#06070c]">
          {/* atmosphere */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(40,120,255,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,rgba(168,85,247,0.16),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(255,50,90,0.10),transparent_55%)]" />
          <div className="cyber-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_72%)]" />
          <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />

          {/* corner HUD */}
          <span className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-cyan-400/50" />
          <span className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r-2 border-t-2 border-fuchsia-400/50" />
          <span className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b-2 border-l-2 border-fuchsia-400/50" />
          <span className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-cyan-400/50" />

          {/* moving scan bar */}
          <motion.span
            className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/[0.07] to-transparent"
            animate={{ y: ["-15%", "115%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative grid items-center gap-6 px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-2 lg:gap-4 lg:py-20">
            {/* copy */}
            <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
              <Reveal dir="scale">
                <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/[0.07] px-3.5 py-1.5 font-head text-[10px] font-bold uppercase tracking-[0.32em] text-fuchsia-200 backdrop-blur">
                  Interactive 3D
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display text-[27px] font-black uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[52px]">
                  Enter The <span className="text-gradient-neon neon-shadow">Gameverse</span>
                </h2>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-slate-400 sm:text-[15.5px] lg:mx-0">
                  A live holographic control node rendered in real time. Drag your cursor — or your finger —
                  across the grid and watch the energy field, orbiting shards and neon controller respond
                  instantly.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-7 grid grid-cols-2 gap-3 sm:max-w-md">
                  {[
                    { k: "Render", v: "Realtime" },
                    { k: "Objects", v: "Reactive" },
                    { k: "Particles", v: "Adaptive" },
                    { k: "Payload", v: "Ultra-light" },
                  ].map((s) => (
                    <div key={s.k} className="glass clip-notch px-3.5 py-3 text-left">
                      <p className="font-head text-[9px] font-bold uppercase tracking-[0.24em] text-cyan-300/60">{s.k}</p>
                      <p className="mt-0.5 font-display text-[13px] font-black text-white">{s.v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="mt-6 inline-flex items-center gap-2 font-head text-[10px] font-bold uppercase tracking-[0.26em] text-slate-500">
                  <MousePointer2 size={13} className="animate-pulse text-cyan-400" />
                  Move to interact
                </p>
              </Reveal>
            </div>

            {/* 3D stage */}
            <div className="relative order-1 mx-auto aspect-square w-full max-w-[320px] sm:max-w-[440px] lg:order-2 lg:max-w-[560px]">
              <motion.div
                className="pointer-events-none absolute inset-[10%] rounded-full border border-dashed border-cyan-300/12"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <HoloScene variant="full" />

              {CHIPS.map((c) => (
                <motion.div
                  key={c.label}
                  className={`glass-dark clip-notch absolute ${c.cls} hidden items-center gap-2 px-3 py-2 sm:flex`}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
                >
                  <c.icon size={13} className="text-cyan-300" />
                  <span className="font-head text-[9px] font-bold uppercase tracking-[0.2em] text-white/85">
                    {c.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
