import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

/** Lightweight ambient neon dust — density scales with viewport & pauses off-screen. */
export default function ParticleField({
  className,
  density = 1,
  colors = ["34,230,255", "168,85,247", "255,59,110", "120,170,255"],
}: {
  className?: string;
  density?: number;
  colors?: string[];
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2);

    let W = 0, H = 0;
    let pts: {
      x: number; y: number; z: number; r: number; vx: number; vy: number; c: string; a: number; tw: number;
    }[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const base = isSmall ? 26 : 62;
      const n = Math.round(base * density);
      pts = Array.from({ length: n }, () => {
        const z = 0.35 + Math.random() * 0.9;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          z,
          r: (0.6 + Math.random() * 1.7) * z,
          vx: (Math.random() - 0.5) * 0.14 * z,
          vy: -(0.08 + Math.random() * 0.3) * z,
          c: colors[Math.floor(Math.random() * colors.length)],
          a: 0.18 + Math.random() * 0.5,
          tw: Math.random() * Math.PI * 2,
        };
      });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const onMove = (e: PointerEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 22;
      tmy = (e.clientY / window.innerHeight - 0.5) * 16;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    let raf = 0;
    let t = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      t += 0.016;
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (const p of pts) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -12) { p.y = H + 12; p.x = Math.random() * W; }
          if (p.x < -12) p.x = W + 12;
          if (p.x > W + 12) p.x = -12;
        }
        const tw = 0.65 + Math.sin(t * 1.6 + p.tw) * 0.35;
        const px = p.x + mx * p.z;
        const py = p.y + my * p.z;
        ctx.fillStyle = `rgba(${p.c},${p.a * tw})`;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.r > 1.6) {
          ctx.fillStyle = `rgba(${p.c},${p.a * tw * 0.12})`;
          ctx.beginPath();
          ctx.arc(px, py, p.r * 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [density, colors]);

  return <canvas ref={ref} className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} aria-hidden="true" />;
}
