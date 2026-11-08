import bossGif from "@/nv/Boss.gif";
import boxGif from "@/nv/box.gif";
import cristalViolet from "@/nv/Cristal.gif";
import cristalGreen from "@/nv/Cristal 01.gif";
import cristalRed from "@/nv/Cristal 02.gif";
import cristalAmber from "@/nv/Cristal 03.gif";
import guildGif from "@/nv/Guilda.gif";
import kitTreinador from "@/nv/Kit treinador.png";
import luckBox from "@/nv/Luck box.png";
import nevezinhaGif from "@/nv/Nevezinha.gif";
import pvpGif from "@/nv/PVP.gif";
import questsGif from "@/nv/Quests.gif";
import skateGif from "@/nv/skate.gif";
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
  badge: string;
  desc: string;
  alt: string;
  neon: string;
  featured?: boolean;
};

const LOOT: LootItem[] = [
  {
    src: bossGif,
    name: "RAID BOSSES",
    badge: "RAID",
    desc: "Legendary raid bosses guard the rarest drops — beat one and the loot is yours.",
    alt: "Raid boss waiting for a battle",
    neon: "var(--rarity-mythic)",
    featured: true,
  },
  {
    src: pvpGif,
    name: "PVP BATTLES",
    badge: "PVP",
    desc: "Raise your flag and challenge other trainers in battle.",
    alt: "PvP banner with crossed swords",
    neon: "var(--primary)",
  },
  {
    src: guildGif,
    name: "GUILDS",
    badge: "GUILD",
    desc: "Join a guild and open the guild chest together with your crew.",
    alt: "Guild treasure chest",
    neon: "var(--rarity-uncommon)",
  },
  {
    src: skateGif,
    name: "SKATE",
    badge: "SKIN · MOUNT",
    desc: "A special event mount — a limited skin to ride across the maps.",
    alt: "Skate mount skin from a special event",
    neon: "var(--rarity-rare)",
  },
  {
    src: kitTreinador,
    name: "TRAINER KIT",
    badge: "DROP",
    desc: "A full trainer outfit — cap, jacket, backpack and gear — dropped by raid boss Pokémon.",
    alt: "Trainer Kit chest with cap, jacket, backpack and gear",
    neon: "var(--primary)",
  },
  {
    src: questsGif,
    name: "SPECIAL QUESTS",
    badge: "QUEST",
    desc: "Special quests with exclusive rewards, refreshed across the journey.",
    alt: "Quest book with a Poké Ball emblem",
    neon: "var(--rarity-epic)",
  },
  {
    src: boxGif,
    name: "TREASURE BOX",
    badge: "BOX",
    desc: "A golden chest waiting to be opened — every box hides something.",
    alt: "Golden treasure box with a Poké Ball",
    neon: "var(--secondary)",
  },
  {
    src: luckBox,
    name: "LUCK BOX",
    badge: "LUCK",
    desc: "Potions, crystals, coins and luck packed into a single box.",
    alt: "Luck box full of potions, crystals and coins",
    neon: "var(--rarity-uncommon)",
  },
];

type VipItem = LootItem & { tag: string };

const VIP_PERKS: VipItem[] = [
  {
    src: vipGif,
    name: "VIP PASS",
    badge: "PREMIUM",
    tag: "PREMIUM PASS",
    desc: "Acquire the VIP pass and unlock the premium side of your journey — perks, perks and more room to grow.",
    alt: "VIP pass with a golden crown",
    neon: "var(--secondary)",
  },
  {
    src: nevezinhaGif,
    name: "NEVEZINHA EVENT",
    badge: "EVENT",
    tag: "3 DAYS OF VIP",
    desc: "A limited-time winter event where the player can win 3 days of VIP for free.",
    alt: "Nevezinha snowman wearing a santa hat",
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

/* every gif sits inside the exact same frame: fixed height, centered, contained */
function ItemFrame({ src, alt, featured = false }: { src: string; alt: string; featured?: boolean }) {
  return (
    <div className="relative border-b-4 border-primary-ink">
      <div className="flex h-40 items-center justify-center p-3">
        <img
          src={src}
          alt={alt}
          width={512}
          height={512}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {featured && <span className="pixel-star absolute right-2 top-2" aria-hidden="true" />}
    </div>
  );
}

function Badge({ label, featured = false }: { label: string; featured?: boolean }) {
  return (
    <span
      className={`absolute left-0 top-0 border-b-2 border-r-2 border-primary-ink px-2.5 py-1.5 font-pixel text-[8px] leading-none ${
        featured ? "bg-secondary text-secondary-foreground" : "bg-primary-ink text-primary-foreground"
      }`}
    >
      {label}
    </span>
  );
}

function LootCard({ src, name, badge, desc, alt, neon, featured = false }: LootItem) {
  return (
    <article
      className="neon-frame group relative flex flex-col border-4 bg-card transition-transform duration-200 hover:-translate-y-1"
      style={{ "--neon": neon } as React.CSSProperties}
    >
      <div className="relative">
        <ItemFrame src={src} alt={alt} featured={featured} />
        <Badge label={badge} featured={featured} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className={`font-pixel leading-relaxed text-primary-ink ${featured ? "text-[11px]" : "text-[10px]"}`}>{name}</h3>
        <span
          className="mt-3 block h-1 w-10"
          style={{ background: "var(--neon)", boxShadow: "0 0 8px var(--neon)" }}
          aria-hidden="true"
        />
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
          Crystals, raid drops, PvP, guilds, mounts and boxes — each item has its own way into your bag.
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

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LOOT.map((item) => (
            <LootCard key={item.name} {...item} />
          ))}
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
              className="neon-frame group relative flex flex-col border-4 bg-background text-primary-ink transition-transform duration-200 hover:-translate-y-1"
              style={{ "--neon": perk.neon } as React.CSSProperties}
            >
              <div className="relative">
                <div className="flex h-44 items-center justify-center border-b-4 border-primary-ink p-4 sm:h-48">
                  <img
                    src={perk.src}
                    alt={perk.alt}
                    width={420}
                    height={415}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <Badge label={perk.badge} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit border-2 border-primary-ink bg-secondary px-2.5 py-1.5 font-pixel text-[8px] text-secondary-foreground">{perk.tag}</span>
                <h3 className="mt-4 font-pixel text-[11px] leading-relaxed text-primary-ink sm:text-xs">{perk.name}</h3>
                <span
                  className="mt-4 block h-1 w-14"
                  style={{ background: "var(--neon)", boxShadow: "0 0 10px var(--neon)" }}
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{perk.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
