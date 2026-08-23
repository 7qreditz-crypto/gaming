import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------
 *  Ultra-light custom 3D renderer (no WebGL / no three.js payload).
 *  Real 3D math: rotation matrices + perspective projection + depth
 *  sorted additive "bloom" strokes. Runs at ~60fps on mid phones and
 *  auto-pauses when scrolled out of view.
 * ----------------------------------------------------------------- */

type V3 = [number, number, number];
type Edge = [number, number];

type Mesh = {
  v: V3[];
  e: Edge[];
  color: [number, number, number];
  width: number;
};

/* ---------- geometry builders ---------- */

function buildController(): Mesh[] {
  const half: [number, number][] = [
    [0.3, 0.36],
    [0.58, 0.33],
    [0.82, 0.17],
    [0.99, -0.14],
    [0.95, -0.49],
    [0.74, -0.63],
    [0.52, -0.49],
    [0.34, -0.24],
    [0.15, -0.19],
  ];
  const loop: [number, number][] = [
    [0, 0.31],
    ...half,
    [0, -0.19],
    ...half.slice().reverse().map(([x, y]) => [-x, y] as [number, number]),
  ];

  const D = 0.17;
  const v: V3[] = [];
  const e: Edge[] = [];
  loop.forEach(([x, y]) => {
    v.push([x, y, D]);
    v.push([x, y, -D]);
  });
  const n = loop.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    e.push([i * 2, j * 2]); // front loop
    e.push([i * 2 + 1, j * 2 + 1]); // back loop
    if (i % 1 === 0) e.push([i * 2, i * 2 + 1]); // connectors
  }
  const body: Mesh = { v, e, color: [90, 220, 255], width: 1.5 };

  /* --- front-face details --- */
  const dv: V3[] = [];
  const de: Edge[] = [];
  const Z = D + 0.02;

  const ring = (cx: number, cy: number, r: number, seg: number, z = Z) => {
    const start = dv.length;
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      dv.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, z]);
      de.push([start + i, start + ((i + 1) % seg)]);
    }
  };
  const poly = (pts: [number, number][], z = Z) => {
    const start = dv.length;
    pts.forEach(([x, y]) => dv.push([x, y, z]));
    for (let i = 0; i < pts.length; i++) de.push([start + i, start + ((i + 1) % pts.length)]);
  };

  // D-pad cross
  const t = 0.045;
  const a = 0.14;
  const cx = -0.52;
  const cy = 0.02;
  poly([
    [cx - t, cy + a], [cx + t, cy + a], [cx + t, cy + t], [cx + a, cy + t],
    [cx + a, cy - t], [cx + t, cy - t], [cx + t, cy - a], [cx - t, cy - a],
    [cx - t, cy - t], [cx - a, cy - t], [cx - a, cy + t], [cx - t, cy + t],
  ]);

  // action buttons
  const bx = 0.55, by = 0.04, off = 0.12, br = 0.052;
  ring(bx, by + off, br, 8);
  ring(bx, by - off, br, 8);
  ring(bx + off, by, br, 8);
  ring(bx - off, by, br, 8);

  // analog sticks
  ring(-0.22, -0.31, 0.13, 14);
  ring(-0.22, -0.31, 0.065, 10, Z + 0.05);
  ring(0.26, -0.31, 0.13, 14);
  ring(0.26, -0.31, 0.065, 10, Z + 0.05);

  // centre hud slots
  poly([[-0.14, 0.2], [-0.04, 0.2], [-0.04, 0.16], [-0.14, 0.16]]);
  poly([[0.04, 0.2], [0.14, 0.2], [0.14, 0.16], [0.04, 0.16]]);
  ring(0, 0.05, 0.05, 10);

  const details: Mesh = { v: dv, e: de, color: [244, 100, 190], width: 1.2 };

  // shoulder bumpers (top edge)
  const sv: V3[] = [];
  const se: Edge[] = [];
  [-1, 1].forEach((s) => {
    const base = sv.length;
    sv.push([s * 0.5, 0.4, D * 0.7], [s * 0.82, 0.28, D * 0.7], [s * 0.82, 0.28, -D * 0.7], [s * 0.5, 0.4, -D * 0.7]);
    se.push([base, base + 1], [base + 1, base + 2], [base + 2, base + 3], [base + 3, base]);
  });
  const bumpers: Mesh = { v: sv, e: se, color: [168, 120, 255], width: 1.3 };

  return [body, details, bumpers];
}

function polyhedron(kind: 0 | 1 | 2, s: number): { v: V3[]; e: Edge[] } {
  if (kind === 0) {
    // octahedron
    const v: V3[] = [[s, 0, 0], [-s, 0, 0], [0, s, 0], [0, -s, 0], [0, 0, s], [0, 0, -s]];
    const e: Edge[] = [
      [0, 2], [2, 1], [1, 3], [3, 0], [0, 4], [2, 4], [1, 4], [3, 4],
      [0, 5], [2, 5], [1, 5], [3, 5],
    ];
    return { v, e };
  }
  if (kind === 1) {
    // cube
    const v: V3[] = [];
    for (const x of [-s, s]) for (const y of [-s, s]) for (const z of [-s, s]) v.push([x, y, z]);
    const e: Edge[] = [
      [0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6],
      [3, 7], [4, 5], [4, 6], [5, 7], [6, 7],
    ];
    return { v, e };
  }
  // tetrahedron
  const v: V3[] = [[s, s, s], [-s, -s, s], [-s, s, -s], [s, -s, -s]];
  const e: Edge[] = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
  return { v, e };
}

export default function HoloScene({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "full";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.6 : 2);

    let W = 0, H = 0;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const meshes = buildController();
    const full = variant === "full";

    /* orbiting shards */
    const shardCount = full ? (isSmall ? 4 : 7) : isSmall ? 3 : 5;
    const shards = Array.from({ length: shardCount }, (_, i) => ({
      geo: polyhedron((i % 3) as 0 | 1 | 2, 0.13 + (i % 3) * 0.035),
      radius: (full ? 1.75 : 1.5) + (i % 2) * 0.35,
      speed: 0.16 + (i % 3) * 0.07,
      phase: (i / shardCount) * Math.PI * 2,
      tilt: -0.4 + (i % 4) * 0.25,
      spin: 0.5 + (i % 3) * 0.4,
      hue: [[120, 240, 255], [190, 140, 255], [255, 110, 170]][i % 3] as [number, number, number],
    }));

    /* particles */
    const pCount = full ? (isSmall ? 55 : 130) : isSmall ? 34 : 70;
    const parts = Array.from({ length: pCount }, () => {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const r = 1.3 + Math.random() * 1.5;
      return {
        p: [r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.75, r * Math.sin(ph) * Math.sin(th)] as V3,
        s: 0.35 + Math.random() * 0.9,
        o: 0.25 + Math.random() * 0.6,
        sp: 0.15 + Math.random() * 0.4,
      };
    });

    /* interaction */
    let targetRX = -0.18, targetRY = 0.5;
    let rx = targetRX, ry = targetRY;
    const onPointer = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetRY = 0.5 + nx * 1.15;
      targetRX = -0.18 + ny * 0.75;
    };
    const onLeave = () => { targetRY = 0.5; targetRX = -0.18; };
    const listenEl: HTMLElement | Window = full ? window : wrap;
    listenEl.addEventListener("pointermove", onPointer as EventListener, { passive: true });
    wrap.addEventListener("pointerleave", onLeave, { passive: true });

    let visible = true;
    const io = new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; }, { threshold: 0.01 });
    io.observe(wrap);

    let raf = 0;
    let t = 0;
    let last = performance.now();

    const project = (p: V3, cx: number, cy: number, unit: number, fov: number) => {
      const [x0, y0, z0] = p;
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x1 = x0 * cosY + z0 * sinY;
      const z1 = -x0 * sinY + z0 * cosY;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y2 = y0 * cosX - z1 * sinX;
      const z2 = y0 * sinX + z1 * cosX;
      const sc = fov / (fov + z2 + 3.1);
      return { x: cx + x1 * sc * unit, y: cy - y2 * sc * unit, z: z2, sc };
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      if (!reduced) t += dt;

      rx += (targetRX - rx) * 0.06;
      ry += (targetRY - ry) * 0.06;

      const cx = W / 2;
      const cy = H / 2 + (full ? 10 : 0);
      const unit = Math.min(W, H) * (full ? 0.37 : 0.43);
      const fov = 4.2;
      const spin = reduced ? 0 : t * 0.32;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      /* ---- grid floor ---- */
      if (full) {
        const gy = -1.25;
        const span = 3.2;
        const step = 0.4;
        ctx.lineWidth = 1;
        for (let i = -span; i <= span + 0.001; i += step) {
          for (const axis of [0, 1]) {
            const a: V3 = axis === 0 ? [i, gy, -span] : [-span, gy, i];
            const b: V3 = axis === 0 ? [i, gy, span] : [span, gy, i];
            const pa = project(a, cx, cy, unit, fov);
            const pb = project(b, cx, cy, unit, fov);
            const fade = Math.max(0, 1 - Math.abs(i) / (span + 0.4));
            ctx.strokeStyle = `rgba(80,170,255,${0.05 + fade * 0.12})`;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }
      }

      /* ---- particles ---- */
      for (const pt of parts) {
        if (!reduced) {
          pt.p[1] += pt.sp * dt * 0.35;
          if (pt.p[1] > 1.9) pt.p[1] = -1.9;
        }
        const pr = project(pt.p, cx, cy, unit, fov);
        const size = pt.s * pr.sc * 1.7;
        const alpha = pt.o * Math.min(1, pr.sc * 0.95);
        ctx.fillStyle = `rgba(140,225,255,${alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ---- orbiting shards ---- */
      for (const s of shards) {
        const ang = s.phase + t * s.speed;
        const ox = Math.cos(ang) * s.radius;
        const oz = Math.sin(ang) * s.radius;
        const oy = Math.sin(ang * 1.6 + s.phase) * 0.42 + s.tilt * 0.35;
        const sr = t * s.spin;
        const cosS = Math.cos(sr), sinS = Math.sin(sr);
        const pts = s.geo.v.map(([x, y, z]) => {
          const rxq = x * cosS - z * sinS;
          const rzq = x * sinS + z * cosS;
          return project([rxq + ox, y + oy, rzq + oz], cx, cy, unit, fov);
        });
        const [r, g, b] = s.hue;
        for (const [i, j] of s.geo.e) {
          const p1 = pts[i], p2 = pts[j];
          const depth = Math.min(1, Math.max(0.25, p1.sc * 0.9));
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.1 * depth})`;
          ctx.lineWidth = 3.4;
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.72 * depth})`;
          ctx.lineWidth = 1.05;
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        }
      }

      /* ---- controller ---- */
      const bob = reduced ? 0 : Math.sin(t * 0.9) * 0.07;
      for (const m of meshes) {
        const cosS = Math.cos(spin), sinS = Math.sin(spin);
        const pts = m.v.map(([x, y, z]) => {
          const xr = x * cosS - z * sinS;
          const zr = x * sinS + z * cosS;
          return project([xr, y + bob, zr], cx, cy, unit, fov);
        });
        const [r, g, b] = m.color;
        for (const [i, j] of m.e) {
          const p1 = pts[i], p2 = pts[j];
          const depth = Math.min(1.05, Math.max(0.22, (p1.sc + p2.sc) / 2 - 0.05));
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.09 * depth})`;
          ctx.lineWidth = m.width * 4.2;
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.85 * depth})`;
          ctx.lineWidth = m.width;
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        }
      }

      /* ---- energy core ---- */
      const coreR = unit * (0.26 + Math.sin(t * 1.6) * 0.02);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      grd.addColorStop(0, "rgba(90,200,255,0.20)");
      grd.addColorStop(0.55, "rgba(150,90,255,0.09)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      listenEl.removeEventListener("pointermove", onPointer as EventListener);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [variant]);

  return (
    <div ref={wrapRef} className={cn("relative h-full w-full", className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full [mask-image:radial-gradient(circle_at_center,#000_58%,transparent_92%)] [-webkit-mask-image:radial-gradient(circle_at_center,#000_58%,transparent_92%)]"
        aria-hidden="true"
      />
    </div>
  );
}
