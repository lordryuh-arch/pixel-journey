import egg from "@/assets/saga/purple-egg.gif";

export function Snowfall() {
  return <div className="saga-snow" aria-hidden="true">{Array.from({ length: 36 }, (_, i) => <span key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${-(i * 7 % 19)}s`, "--snow-duration": `${12 + i % 9}s` } as React.CSSProperties} />)}</div>;
}

export function FloatingEgg() {
  return <div className="saga-egg block"><img src={egg} alt="Floating purple crystal egg" width={362} height={362} className="mx-auto w-full" loading="lazy" /></div>;
}

export function LoadingBall({ open }: { open: boolean }) {
  return <div className={`saga-ball-loader ${open ? "is-open" : ""}`} role="img" aria-label={open ? "Poké Ball ready" : "Poké Ball charging"}><svg viewBox="0 0 64 64" className="saga-loading-ball" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="var(--card)" stroke="var(--primary-ink)" strokeWidth="4" /><path d="M4 32a28 28 0 0 1 56 0Z" fill="var(--primary)" /><path d="M5 32h54" stroke="var(--primary-ink)" strokeWidth="5" /><circle cx="32" cy="32" r="10" fill="var(--card)" stroke="var(--primary-ink)" strokeWidth="4" /><circle cx="32" cy="32" r="4" fill="var(--secondary)" /><path d="M15 20q3-7 11-9" fill="none" stroke="var(--card)" strokeWidth="4" strokeLinecap="round" /></svg></div>;
}