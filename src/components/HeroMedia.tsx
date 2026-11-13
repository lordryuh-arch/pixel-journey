import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/saga/winter-top.webp";
import heroVideo from "@/assets/saga/golden-hero.mp4";
import { GAME_OPENS_AT, isGameOpen } from "@/lib/preregistration";

/** Plays the animated intro, returns to the banner for 4 seconds, then repeats. */
export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [gameOpen, setGameOpen] = useState(() => isGameOpen(Date.now()));

  useEffect(() => {
    if (playing) { const v = video.current; if (v) { v.currentTime = 0; v.play().catch(() => setPlaying(false)); } return; }
    const t = window.setTimeout(() => setPlaying(true), 4000);
    return () => window.clearTimeout(t);
  }, [playing]);

  useEffect(() => {
    const remaining = GAME_OPENS_AT.getTime() - Date.now();
    if (remaining <= 0) return;
    const t = window.setTimeout(() => setGameOpen(true), remaining);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative overflow-hidden bg-saga-winter">
      <img src={heroImage} alt="POKE EMERALD SAGA winter adventure with trainers, snowy mountains and a Poké Ball snowman" width={1672} height={941} fetchPriority="high" className="block aspect-[1672/941] w-full object-contain" />
      <video ref={video} src={heroVideo} muted playsInline autoPlay preload="auto" aria-hidden="true" onEnded={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`} />
      {!gameOpen && (
        <div className={`saga-banner-badge pixel-corners ${playing ? "" : "is-shown"}`} aria-hidden={playing}>
          <span className="saga-badge-day">NOV 14</span>
          <span className="saga-badge-soon">COMING SOON</span>
        </div>
      )}
    </div>
  );
}
