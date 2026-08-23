import { cn } from "@/utils/cn";
import { BRAND } from "@/config";

type Props = {
  className?: string;
  size?: number;
  withText?: boolean;
  compact?: boolean;
};

/**
 * MAFUJ GAMING emblem — an original futuristic hex-visor mark:
 * a cyber-warrior helmet silhouette whose visor slots form an
 * abstract "M". Rendered with layered gradients for a 3D feel.
 */
export function LogoMark({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={cn("shrink-0 drop-shadow-[0_0_12px_rgba(34,230,255,0.45)]", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mfEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22e6ff" />
          <stop offset="50%" stopColor="#6d8cff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="mfCore" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#0b1220" />
          <stop offset="60%" stopColor="#0a0c14" />
          <stop offset="100%" stopColor="#150c1f" />
        </linearGradient>
        <linearGradient id="mfM" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ff4ff" />
          <stop offset="45%" stopColor="#22e6ff" />
          <stop offset="100%" stopColor="#f43f8e" />
        </linearGradient>
        <linearGradient id="mfShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="mfGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* outer hex plate */}
      <path d="M32 2.5 57.5 17v30L32 61.5 6.5 47V17z" fill="url(#mfCore)" />
      <path
        d="M32 2.5 57.5 17v30L32 61.5 6.5 47V17z"
        fill="none"
        stroke="url(#mfEdge)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* inner bevel */}
      <path
        d="M32 8 52.5 19.8v24.4L32 56 11.5 44.2V19.8z"
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
      />
      {/* abstract M / visor */}
      <g filter="url(#mfGlow)">
        <path
          d="M18 45V21.5l14 12.5 14-12.5V45"
          fill="none"
          stroke="url(#mfM)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* visor slash accents */}
      <path d="M22.5 48.5h7" stroke="#22e6ff" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
      <path d="M34.5 48.5h7" stroke="#f43f8e" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
      {/* top gloss */}
      <path d="M32 3.6 56.2 17.5 32 31 7.8 17.5z" fill="url(#mfShine)" opacity="0.5" />
    </svg>
  );
}

export default function Logo({ className, size = 44, withText = true, compact = false }: Props) {
  return (
    <span className={cn("group inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <span className="relative inline-flex">
        <span className="absolute inset-0 rounded-xl bg-cyan-400/25 blur-lg transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
        <LogoMark
          size={size}
          className="relative transition-transform duration-500 ease-out group-hover:rotate-[8deg] group-hover:scale-105"
        />
      </span>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] sm:text-[17px] font-black tracking-[0.18em] text-white">
            {BRAND.name}
            <span className="text-gradient-neon">{BRAND.suffix}</span>
          </span>
          {!compact && (
            <span className="mt-1 font-head text-[9px] sm:text-[10px] font-semibold tracking-[0.42em] text-cyan-300/60">
              {BRAND.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
