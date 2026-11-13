import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/saga/winter-top.webp";
import heroVideo from "@/assets/saga/golden-hero.mp4";

/** Plays the animated intro, returns to the banner for 4 seconds, then repeats. */
export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (playing) { const v = video.current; if (v) { v.currentTime = 0; v.play().catch(() => setPlaying(false)); } return; }
    const t = window.setTimeout(() => setPlaying(true), 4000);
    return () => window.clearTimeout(t);
  }, [playing]);

  return (
    <div className="relative overflow-hidden bg-saga-winter">
      <img src={heroImage} alt="POKE EMERALD SAGA winter adventure with trainers, snowy mountains and a Poké Ball snowman" width={1672} height={941} fetchPriority="high" className="block aspect-[1672/941] w-full object-contain" />
      <video ref={video} src={heroVideo} muted playsInline autoPlay preload="auto" aria-hidden="true" onEnded={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
