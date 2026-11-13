import slimeCard from "@/assets/saga/slime-card.webp";

export function SlimeEvent() {
  return (
    <section id="event" className="bg-primary-ink px-5 py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <img src={slimeCard} alt="Ultra rare Slime card with a glowing blue slime" loading="lazy" width={768} height={1152} className="saga-egg mx-auto w-full max-w-xs drop-shadow-[0_0_28px_var(--color-rarity-rare)]" />
        <div>
          <p className="font-pixel text-[10px] text-secondary">IN-GAME EVENT</p>
          <h2 className="mt-4 font-pixel text-2xl leading-relaxed sm:text-4xl">THE SLIME CARD HUNT</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/80">During this event, the Slime Card can drop while you play — but only with a low chance.</p>
          <p className="mt-4 max-w-xl text-lg leading-8 text-primary-foreground/80">Players lucky enough to get the drop receive a <span className="font-bold text-secondary">limited-edition Slime</span>.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[["DROP", "Low chance"], ["REWARD", "Limited-edition Slime"]].map(([k, v]) => <li key={k} className="border-2 border-primary-foreground/50 p-4 shadow-[4px_4px_0_var(--color-primary)]"><span className="block font-pixel text-[9px] text-secondary">{k}</span><span className="mt-2 block font-semibold">{v}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
