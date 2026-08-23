import { motion } from "framer-motion";
import { ArrowUpRight, Send, Sparkles } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import ParticleField from "./effects/ParticleField";
import { InstagramIcon, WhatsAppIcon } from "./ui/SocialIcons";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_MESSAGE, WHATSAPP_URL } from "@/config";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(168,85,247,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,rgba(16,185,129,0.10),transparent_55%)]" />
      <ParticleField density={0.7} colors={["34,230,255", "244,63,142", "16,185,129"]} />

      <div className="relative mx-auto w-[92%] max-w-5xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's"
          highlight="Connect"
          subtitle="Want to talk gaming, collaborate, or just connect? Find me on social media."
        />

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2">
          {/* ---------------- INSTAGRAM ---------------- */}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow MAFUJ GAMING on Instagram (opens in a new tab)"
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.985 }}
            className="holo-border group relative flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-[#0b0a12] p-6 sm:p-8"
          >
            <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-600/25 blur-[70px] transition-all duration-700 group-hover:bg-fuchsia-500/45" />
            <span className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-amber-500/15 blur-[70px]" />
            <span className="cyber-grid pointer-events-none absolute inset-0 opacity-15" />

            <div className="relative flex items-start justify-between">
              <span className="relative inline-flex">
                <span className="absolute inset-0 rounded-2xl bg-fuchsia-500/40 blur-xl transition-all duration-500 group-hover:blur-2xl" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <InstagramIcon size={36} />
                </span>
              </span>
              <ArrowUpRight
                size={22}
                className="text-slate-500 transition-all duration-400 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fuchsia-300"
              />
            </div>

            <h3 className="relative mt-6 font-display text-xl font-black uppercase tracking-[0.1em] text-white sm:text-2xl">
              Instagram
            </h3>
            <p className="relative mt-1 font-head text-[12px] font-bold uppercase tracking-[0.26em] text-fuchsia-300/80">
              {INSTAGRAM_HANDLE}
            </p>
            <p className="relative mt-3 flex-1 text-[13.5px] leading-relaxed text-slate-400">
              Daily clips, gameplay highlights, montage drops and behind-the-scenes from the game zone.
            </p>

            <span className="btn-neon clip-notch relative mt-7 inline-flex w-full items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 py-4 font-head text-[12px] font-black uppercase tracking-[0.22em] text-white shadow-[0_0_36px_-10px_rgba(236,72,153,0.95)]">
              <InstagramIcon size={17} className="relative z-[2]" />
              <span className="relative z-[2]">Follow On Instagram</span>
            </span>
          </motion.a>

          {/* ---------------- WHATSAPP ---------------- */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with MAFUJ GAMING on WhatsApp (opens in a new tab)"
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.985 }}
            className="holo-border group relative flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-[#08110d] p-6 sm:p-8"
          >
            <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/25 blur-[70px] transition-all duration-700 group-hover:bg-emerald-400/45" />
            <span className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-cyan-500/12 blur-[70px]" />
            <span className="cyber-grid pointer-events-none absolute inset-0 opacity-15" />

            <div className="relative flex items-start justify-between">
              <span className="relative inline-flex">
                <span className="absolute inset-0 rounded-2xl bg-emerald-500/40 blur-xl transition-all duration-500 group-hover:blur-2xl" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <WhatsAppIcon size={36} />
                </span>
              </span>
              <Send
                size={20}
                className="text-slate-500 transition-all duration-400 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-300"
              />
            </div>

            <h3 className="relative mt-6 font-display text-xl font-black uppercase tracking-[0.1em] text-white sm:text-2xl">
              WhatsApp
            </h3>
            <p className="relative mt-1 font-head text-[12px] font-bold uppercase tracking-[0.26em] text-emerald-300/80">
              Direct Chat
            </p>
            <p className="relative mt-3 flex-1 text-[13.5px] leading-relaxed text-slate-400">
              Opens a chat instantly with this message pre-filled:
              <span className="mt-2 block rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 text-[12.5px] italic text-emerald-100/80">
                “{WHATSAPP_MESSAGE}”
              </span>
            </p>

            <span className="btn-neon clip-notch relative mt-7 inline-flex w-full items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 py-4 font-head text-[12px] font-black uppercase tracking-[0.22em] text-[#04140d] shadow-[0_0_36px_-10px_rgba(16,185,129,0.95)]">
              <WhatsAppIcon size={17} className="relative z-[2]" />
              <span className="relative z-[2]">Chat On WhatsApp</span>
            </span>
          </motion.a>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-2 text-center font-head text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500"
        >
          <Sparkles size={13} className="text-cyan-400" />
          Usually replies within a few hours
        </motion.p>
      </div>
    </section>
  );
}
