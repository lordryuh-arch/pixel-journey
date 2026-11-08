import bossGif from "@/nv/Boss.gif";
import boxGif from "@/nv/box.gif";
import cristalViolet from "@/nv/Cristal.gif";
import cristalGreen from "@/nv/Cristal 01.gif";
import cristalRed from "@/nv/Cristal 02.gif";
import cristalAmber from "@/nv/Cristal 03.gif";
import kitTreinador from "@/nv/Kit treinador.png";
import luckBox from "@/nv/Luck box.png";
import nevezinhaGif from "@/nv/Nevezinha.gif";
import questsGif from "@/nv/Quests.gif";
import vipGif from "@/nv/VIP.gif";

const CRYSTALS = [
  { src: cristalViolet, name: "VIOLET CRYSTAL", alt: "Violet elemental crystal" },
  { src: cristalGreen, name: "GREEN CRYSTAL", alt: "Green elemental crystal" },
  { src: cristalRed, name: "RED CRYSTAL", alt: "Red elemental crystal" },
  { src: cristalAmber, name: "AMBER CRYSTAL", alt: "Amber elemental crystal" },
];

type LootItem = {
  src: string;
  name: string;
  desc: string;
  alt: string;
  neon: string;
};

const LOOT: LootItem[] = [
  {
    src: kitTreinador,
    name: "TRAINER KIT",
    desc: "A full trainer outfit — cap, jacket, backpack and gear — dropped by raid boss Pokémon.",
    alt: "Trainer Kit chest with cap, jacket, backpack and gear",
    neon: "var(--primary)",
  },
  {
    src: questsGif,
    name: "SPECIAL QUESTS",
    desc: "Special quests with exclusive rewards, refreshed across the journey.",
    alt: "Quest book with a Poké Ball emblem",
    neon: "var(--rarity-epic)",
  },
  {
    src: boxGif,
    name: "TREASURE BOX",
    desc: "A golden chest waiting to be opened — every box hides something.",
    alt: "Golden treasure box with a Poké Ball",
    neon: "var(--secondary)",
  },
  {
    src: luckBox,
    name: "LUCK BOX",
    desc: "Potions, crystals, coins and luck packed into a single box.",
    alt: "Luck box full of potions, crystals and coins",
    neon: "var(--rarity-uncommon)",
  },
];

const VIP_PERKS: (LootItem & { tag: string })[] = [
  {
    src: vipGif,
    name: "VIP PASS",
    desc: "Acquire the VIP pass and unlock the premium side of your journey — perks, perks and more room to grow.",
    alt: "VIP pass with a golden crown",
    tag: "PREMIUM PASS",
    neon: "var(--secondary)",
  },
  {
    src: nevezinhaGif,
    name: "NEVEZINHA EVENT",
    desc: "A limited-time winter event where the player can win 3 days of VIP for free.",
    alt: "Nevezinha snowman wearing a santa hat",
    tag: "3 DAYS OF VIP",
    neon: "var(--saga-winter)",
  },
];

function VaultHeading({ eyebrow, title, children, dark = false }: { eyebrow: string; title: string; children?: React.ReactNode; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className={`font-pixel text-[10px] uppercase sm:text-xs ${dark ? "text-secondary" : "text-primary"}`}>{eyebrow}</p>
      <h2 className={`mt-4 font-pixel text-xl leading-relaxed sm:text-3xl ${dark ? "text-primary-foreground" : "text-primary-ink"}`}>{title}</h2>
      {children && (
        <div className={`mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg ${dark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{children}</div>
      )}
    </div>
  );
}

function LootCard({ src, name, desc, alt, neon }: LootItem) {
  return (
    <article
      className="neon-frame group flex flex-col border-4 bg-card transition-transform duration-200 hover:-translate-y-1"
      style={{ "--neon": neon } as React.CSSProperties}
    >
      <div className="border-b-4 border-primary-ink p-3">
        <img
          src={src}
          alt={alt}
          width={448}
          height={448}
          loading="lazy"
          className="mx-auto block aspect-square w-full max-w-40 object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-pixel text-[10px] leading-relaxed text-primary-ink">{name}</h3>
        <span className="mt-3 block h-1 w-10" style={{ background: "var(--neon)", boxShadow: "0 0 8px var(--neon)" }} aria-hidden="true" />
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p>
      </div>
    </article>
  );
}

export function ItemVault() {
  const track = [...CRYSTALS, ...CRYSTALS, ...CRYSTALS, ...CRYSTALS];

  return (
    <>
      <section id="items" className="pixel-grid scroll-mt-24 border-b-4 border-primary-ink px-5 py-24 sm:py-32">
        <VaultHeading eyebrow="ITEMS & LOOT" title="EVERY ITEM HAS A SOURCE">
          Crystals, raid drops, quest rewards and boxes — each item has its own way into your bag.
        </VaultHeading>

        <div className="loot-carousel mx-auto mt-12 max-w-6xl overflow-hidden border-4 border-primary-ink bg-card p-3 shadow-pixel">
          <div className="loot-track">
            {track.map((crystal, i) => (
              <figure
                key={`${crystal.name}-${i}`}
                className="loot-item w-44 shrink-0 border-2 border-primary-ink bg-background shadow-pixel-sm"
                aria-hidden={i >= CRYSTALS.length}
              >
                <img
                  src={crystal.src}
                  alt={i < CRYSTALS.length ? crystal.alt : ""}
                  width={362}
                  height={362}
                  className="block aspect-square w-full object-cover"
                />
                <figcaption className="border-t-2 border-primary-ink bg-primary-ink px-2 py-2 text-center">
                  <span className="font-pixel text-[8px] leading-relaxed text-primary-foreground">{crystal.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-muted-foreground sm:text-base">
          Crystals are elementals that drop from specific Pokémon — each drop carries its own rarity.
        </p>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_1fr]">
          <article
            className="neon-frame group flex flex-col border-4 bg-card transition-transform duration-200 hover:-translate-y-1 sm:flex-row"
            style={{ "--neon": "var(--primary)" } as React.CSSProperties}
          >
            <div className="shrink-0 border-b-4 border-primary-ink p-3 sm:w-48 sm:border-b-0 sm:border-r-4">
              <img
                src={bossGif}
                alt="Raid boss waiting for a battle"
                width={362}
                height={362}
                loading="lazy"
                className="mx-auto block aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-5">
              <span className="w-fit border-2 border-primary-ink bg-primary px-2.5 py-1.5 font-pixel text-[8px] text-primary-foreground">RAID BOSS</span>
              <h3 className="mt-4 font-pixel text-[11px] leading-relaxed text-primary-ink sm:text-xs">BEAT THE BOSS, TAKE THE LOOT</h3>
              <span className="mt-4 block h-1 w-14" style={{ background: "var(--primary)", boxShadow: "0 0 10px var(--primary)" }} aria-hidden="true" />
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Legendary raid bosses guard the rarest drops in the game. Bring a team, win the fight — and the Trainer Kit can drop straight into your bag.
              </p>
            </div>
          </article>

          <div className="grid gap-6 sm:grid-cols-2">
            {LOOT.map((item) => (
              <LootCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section id="vip" className="scroll-mt-24 border-b-4 border-primary-ink bg-primary-ink px-5 py-24 text-primary-foreground sm:py-32">
        <VaultHeading eyebrow="PREMIUM & EVENTS" title="VIP AND LIMITED EVENTS" dark>
          The premium side of the journey — plus events where the player can win VIP without paying a single coin.
        </VaultHeading>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {VIP_PERKS.map((perk) => (
            <article
              key={perk.name}
              className="neon-frame group flex flex-col border-4 bg-background text-primary-ink transition-transform duration-200 hover:-translate-y-1"
              style={{ "--neon": perk.neon } as React.CSSProperties}
            >
              <div className="border-b-4 border-primary-ink p-3">
                <img
                  src={perk.src}
                  alt={perk.alt}
                  width={420}
                  height={415}
                  loading="lazy"
                  className="mx-auto block aspect-square w-full max-w-48 object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit border-2 border-primary-ink bg-secondary px-2.5 py-1.5 font-pixel text-[8px] text-secondary-foreground">{perk.tag}</span>
                <h3 className="mt-4 font-pixel text-[11px] leading-relaxed text-primary-ink sm:text-xs">{perk.name}</h3>
                <span className="mt-4 block h-1 w-14" style={{ background: "var(--neon)", boxShadow: "0 0 10px var(--neon)" }} aria-hidden="true" />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{perk.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
