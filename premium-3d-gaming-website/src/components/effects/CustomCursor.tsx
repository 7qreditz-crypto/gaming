import { useEffect, useRef, useState } from "react";

/** Neon reticle cursor — desktop / fine-pointer only. */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let scale = 1, targetScale = 1;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest("a,button,input,[role='button'],[data-cursor='hover']");
      targetScale = interactive ? 1.75 : 1;
    };
    const down = () => { targetScale = 0.75; };
    const up = () => { targetScale = 1; };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      scale += (targetScale - scale) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${scale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 2.5}px, ${y - 2.5}px, 0)`;
      }
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-cyan-300/70 mix-blend-screen"
        style={{ boxShadow: "0 0 14px rgba(34,230,255,0.5), inset 0 0 10px rgba(168,85,247,0.35)" }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-cyan-300/80" />
        <span className="absolute left-1/2 bottom-0 h-1.5 w-px -translate-x-1/2 bg-cyan-300/80" />
        <span className="absolute top-1/2 left-0 w-1.5 h-px -translate-y-1/2 bg-fuchsia-400/80" />
        <span className="absolute top-1/2 right-0 w-1.5 h-px -translate-y-1/2 bg-fuchsia-400/80" />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[5px] w-[5px] rounded-full bg-white mix-blend-screen"
        style={{ boxShadow: "0 0 10px rgba(255,255,255,0.9)" }}
        aria-hidden="true"
      />
    </>
  );
}
