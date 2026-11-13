import { useEffect, useRef } from "react";
import egg from "@/assets/saga/purple-egg.gif";

type Flake = { x: number; y: number; r: number; speed: number; sway: number; phase: number; alpha: number; tone: number };

/** Realistic, soft snowfall drawn on a single fixed canvas. Purely decorative: never intercepts clicks. */
export function Snowfall() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0, height = 0, flakes: Flake[] = [], frame = 0, last = performance.now(), wind = 0, windTarget = 0.3;

    // Emerald dust instead of white snow: three soft glowing tones so it reads as magical, not flat.
    const TONES: [string, string, string][] = [
      ["rgba(16,185,129,1)", "rgba(16,185,129,0.8)", "rgba(16,185,129,0)"],
      ["rgba(110,231,183,1)", "rgba(110,231,183,0.75)", "rgba(110,231,183,0)"],
      ["rgba(190,242,100,1)", "rgba(190,242,100,0.7)", "rgba(190,242,100,0)"],
    ];
    const sprites = TONES.map(([core, mid, edge]) => {
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 64;
      const sctx = sprite.getContext("2d")!;
      const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, core);
      g.addColorStop(0.35, mid);
      g.addColorStop(1, edge);
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, 64, 64);
      return sprite;
    });

    const makeFlake = (top = false): Flake => {
      const depth = Math.random();
      const r = 0.8 + depth * depth * 4.2;
      const roll = Math.random();
      return {
        x: Math.random() * width,
        y: top ? -10 - Math.random() * 40 : Math.random() * height,
        r,
        speed: (18 + r * 14) * (reduced ? 0.4 : 1),
        sway: 8 + Math.random() * 22,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.45 + depth * 0.5,
        tone: roll < 0.55 ? 0 : roll < 0.85 ? 1 : 2,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(reduced ? 60 : 180, Math.round((width * height) / (reduced ? 22000 : 7500)));
      while (flakes.length < target) flakes.push(makeFlake());
      flakes.length = target;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (Math.random() < 0.004) windTarget = (Math.random() - 0.35) * (reduced ? 10 : 35);
      wind += (windTarget - wind) * 0.01;
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        f.phase += dt * 0.9;
        f.y += f.speed * dt;
        f.x += (wind * (f.r / 3) + Math.sin(f.phase) * f.sway * 0.6) * dt;
        if (f.y > height + 10) Object.assign(f, makeFlake(true));
        if (f.x > width + 10) f.x = -10;
        else if (f.x < -10) f.x = width + 10;
        const size = f.r * 2.6;
        ctx.globalAlpha = f.alpha;
        const sprite = sprites[f.tone] ?? sprites[0];
        if (sprite) ctx.drawImage(sprite, f.x - size / 2, f.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(tick);
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) { last = performance.now(); frame = requestAnimationFrame(tick); }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="saga-snow" aria-hidden="true" />;
}

export function FloatingEgg() {
  return <div className="saga-egg block"><img src={egg} alt="Floating purple crystal egg" width={362} height={362} className="mx-auto w-full" /></div>;
}

export function LoadingBall({ open }: { open: boolean }) {
  return <div className={`saga-ball-loader ${open ? "is-open" : ""}`} role="img" aria-label={open ? "Poké Ball ready" : "Poké Ball charging"}><svg viewBox="0 0 64 64" className="saga-loading-ball" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="var(--card)" stroke="var(--primary-ink)" strokeWidth="4" /><path d="M4 32a28 28 0 0 1 56 0Z" fill="var(--primary)" /><path d="M5 32h54" stroke="var(--primary-ink)" strokeWidth="5" /><circle cx="32" cy="32" r="10" fill="var(--card)" stroke="var(--primary-ink)" strokeWidth="4" /><circle cx="32" cy="32" r="4" fill="var(--secondary)" /><path d="M15 20q3-7 11-9" fill="none" stroke="var(--card)" strokeWidth="4" strokeLinecap="round" /></svg></div>;
}
