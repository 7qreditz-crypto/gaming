import { cn } from "@/utils/cn";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal dir="scale">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3.5 py-1.5 font-head text-[11px] font-bold uppercase tracking-[0.32em] text-cyan-300/90 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.05}>
        <h2 className="font-display text-[26px] font-black uppercase leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[44px]">
          {title}{" "}
          {highlight && <span className="text-gradient-neon neon-shadow">{highlight}</span>}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-400 sm:text-[15px]",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.16} dir="scale">
        <div
          className={cn(
            "mt-6 h-px w-40 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent",
            align === "left" && "bg-gradient-to-r from-cyan-400/80 via-fuchsia-500/50 to-transparent",
          )}
        />
      </Reveal>
    </div>
  );
}
