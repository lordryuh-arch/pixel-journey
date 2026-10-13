import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/wiki")({
  head: () => ({
    meta: [
      { title: "IDLEMON REVO Wiki | Capture, Crystals & Ancestrals" },
      {
        name: "description",
        content:
          "The official IDLEMON REVO wiki: ball hierarchy, crystal mining in Minecara, the Mythic Black ball, Ancestral creatures, river purification and dynamic world events.",
      },
      { property: "og:title", content: "IDLEMON REVO Wiki | Capture, Crystals & Ancestrals" },
      {
        property: "og:description",
        content:
          "Ball hierarchy, crystal mining, the Mythic Black and the Ancestrals — the advanced mechanics of IDLEMON REVO.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Wiki,
});

const ballRows = [
  ["1", "Poké Ball", "1.0×", "The base. No modifiers.", "Shop / starter"],
  ["2", "Great Ball", "1.5×", "Reduces the high-HP penalty.", "Shop"],
  ["3", "Ultra Ball", "2.0×", "Ignores the altered-status penalty.", "Advanced shop"],
  ["4", "Crystal Ball", "3.0×", "5.0× against Crystal/Rock types. Forged from mined crystals.", "Mining (Minecara)"],
  ["5", "Master Ball", "∞", "Guaranteed capture — but inert against Ancestrals and Mythic Blacks.", "One-time event / achievement"],
  ["6", "MYTHIC BLACK", "8.0×", "The absolute apex. Ignores immunities, prevents fleeing and is the only ball that can register an Ancestral.", "Off-the-curve rarity"],
];

const miningRows = [
  ["I", "Common Rock", "Common", "Building / junk"],
  ["II", "Raw Crystal", "Uncommon", "Selling, refining"],
  ["III", "Pure Crystal", "Rare", "Forging the Crystal Ball, upgrades"],
  ["IV", "Ancestral Crystal", "Very Rare", "Purification Ritual, forging the Mythic Black"],
  ["V", "River Core", "Legendary", "Full restoration of a corrupted river"],
];

const summaryRows = [
  ["Common capture", "Poké Ball → Ultra Ball", "Standard creature", "Common"],
  ["Crystal Ball forge", "Pure Crystal (mining)", "3.0× / 5.0× capture", "Rare"],
  ["Ancestral capture", "Mythic Black + 1:100,000 luck", "Ancestral", "Off the curve"],
  ["River purification", "Ancestral only", "Massive EXP + restored biome", "Legendary"],
  ["Dynamic Events", "Carry an Ancestral", "Blessing or Catastrophe", "Ongoing"],
  ["Mining farm", "Mining Affinity", "Accelerated wealth", "Max on Ancestrals"],
];

const goodEvents = [
  ["Crystal Rain", "Massive spawn of Pure and Ancestral Crystals in the region for a limited time"],
  ["Ancestral Aurora", "Every capture in the region gets a temporary bonus"],
  ["Vein Awakening", "A hidden legendary vein is revealed on the map"],
  ["Spawn Exodus", "Rare creatures return to the restored biome"],
];

const darkEvents = [
  ["Shadow Tide", "A corrupting storm that consumes the region's resources and corrupts nearby rivers"],
  ["The Hunt", "The bearer is marked: hunter NPCs and other players receive their location"],
  ["Ancestral Swarm", "A wave of corrupted creatures drawn by the Ancestral's energy"],
  ["Core Hunger", "The Ancestral itself drains the surroundings if neglected"],
];

function SectionTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="bg-primary px-3 py-2 font-pixel text-xs text-primary-foreground shadow-pixel-sm">{index}</span>
      <h2 className="font-pixel text-sm leading-relaxed text-primary-ink sm:text-base">{children}</h2>
    </div>
  );
}

function PixelTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border-4 border-primary-ink bg-background shadow-pixel">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b-4 border-primary-ink bg-primary-ink">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-pixel text-[10px] text-primary-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b-2 border-primary-ink/10 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-pixel text-[10px] text-primary" : "text-primary-ink/80"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Wiki() {
  return (
    <div className="min-h-screen bg-background text-primary-ink">
      <header className="sticky top-0 z-40 border-b-4 border-primary-ink bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-pixel text-sm text-primary">IDLEMON REVO</Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border-2 border-primary-ink px-3 py-2 font-pixel text-[10px] text-primary-ink shadow-pixel-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> BACK HOME
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <p className="mb-3 font-pixel text-[10px] tracking-widest text-secondary">OFFICIAL WIKI — ADVANCED MECHANICS</p>
        <h1 className="mb-4 font-pixel text-xl leading-relaxed sm:text-3xl">CAPTURE, CRYSTALS &amp; ANCESTRALS</h1>
        <p className="mb-4 max-w-2xl text-primary-ink/70">
          Patch 1.0+ — contains post-game and legendary-rarity spoilers. Read on only if you are ready to know how the top of the world works.
        </p>
        <nav className="mb-14 flex flex-wrap gap-2">
          {[
            ["Balls", "#balls"],
            ["Mythic Black", "#mythic-black"],
            ["Mining", "#mining"],
            ["Ancestrals", "#ancestrals"],
            ["Rivers", "#rivers"],
            ["Events", "#events"],
            ["Summary", "#summary"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="border-2 border-primary-ink/20 px-3 py-1.5 font-pixel text-[9px] text-primary-ink/70 transition-colors hover:border-primary hover:text-primary">
              {label}
            </a>
          ))}
        </nav>

        <section id="balls" className="mb-16 scroll-mt-24">
          <SectionTitle index="01">CAPTURE SYSTEM &amp; BALL HIERARCHY</SectionTitle>
          <p className="mb-4 text-primary-ink/70">
            Every capture is ruled by a <strong>ball multiplier</strong>. Each higher ball not only raises the base odds — it also removes penalties that lower balls suffer, like remaining HP and the creature's status.
          </p>
          <p className="mb-6 border-l-4 border-secondary pl-4 text-primary-ink/80">
            Golden rule: the rarer the creature, the more your ball choice matters — and past a certain point, <strong>only one ball works</strong>.
          </p>
          <PixelTable head={["#", "Ball", "Multiplier", "Special Note", "How to Get"]} rows={ballRows} />
          <p className="mt-4 text-sm italic text-primary-ink/60">
            Lore note: the Mythic Black is not an evolution of the Master Ball — it is a correction. The Master Ball forces the capture; the Mythic Black grants permission.
          </p>
        </section>

        <section id="mythic-black" className="mb-16 scroll-mt-24">
          <SectionTitle index="02">THE MYTHIC BLACK BALL</SectionTitle>
          <blockquote className="mb-6 border-4 border-primary-ink bg-primary-ink p-6 font-pixel text-[10px] leading-relaxed text-primary-foreground shadow-pixel">
            "It does not imprison. It summons."
            <span className="mt-2 block text-secondary">— Inscription found in the Ruins of Minecara</span>
          </blockquote>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Class", "Mythic Ball — Tier 0"],
              ["Multiplier", "8.0×"],
              ["Passive", "Prevents fleeing, nullifies type resistance and stabilizes the creature during capture"],
              ["Restriction", "Exclusive to registering Ancestral creatures"],
              ["Rarity", "Legendary — off the drop curve"],
              ["Appearance", "Absolute matte black, with gold/purple veins that pulse near an Ancestral"],
            ].map(([k, v]) => (
              <div key={k} className="border-2 border-primary-ink/15 p-4">
                <p className="mb-1 font-pixel text-[9px] text-primary">{k}</p>
                <p className="text-sm text-primary-ink/75">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-primary-ink/70">
            <strong>Resonance:</strong> the Mythic Black reacts to the environment — its veins glow when an Ancestral is nearby. Many trainers use it as a compass before even thinking about capturing.
          </p>
          <p className="mt-3 text-primary-ink/70">
            <strong>Vs. the Master Ball:</strong> the Master Ball is inert against Ancestrals; the Mythic Black is the only way. Neither can be crafted — and the Mythic Black can be lost, and is unique per bearer.
          </p>
        </section>

        <section id="mining" className="mb-16 scroll-mt-24">
          <SectionTitle index="03">MINING &amp; CRYSTALS (MINECARA)</SectionTitle>
          <p className="mb-6 text-primary-ink/70">
            The world's underground is rich, but cruel. Crystals can be pulled straight from the map's walls and veins — yet those stones are extremely rare. Most mining routes yield only common rock.
          </p>
          <PixelTable head={["Layer", "Material", "Frequency", "Main Use"]} rows={miningRows} />
          <div className="mt-6 border-4 border-primary-ink bg-secondary/10 p-6 shadow-pixel">
            <p className="mb-2 font-pixel text-[10px] text-primary">WHY IT MATTERS</p>
            <p className="text-primary-ink/80">
              Mining and capture are the same tree: <strong>Pure Crystal → forge a Crystal Ball → better captures</strong>. <strong>Ancestral Crystal → ritual → closer to an Ancestral</strong>. A trainer who ignores mining is giving up the top of the capture chain.
            </p>
          </div>
          <p className="mt-6 text-primary-ink/70">
            <strong>Mining Affinity:</strong> some creatures speed up extraction, raise rare-crystal rates and reveal hidden veins on the minimap. Mythic Blacks and Ancestrals have the highest Mining Affinity in the game — they don't just find crystals, they attract them. That is exactly why they are the most farmed creatures in the community.
          </p>
        </section>

        <section id="ancestrals" className="mb-16 scroll-mt-24">
          <SectionTitle index="04">MYTHIC BLACK &amp; ANCESTRAL CREATURES</SectionTitle>
          <p className="mb-6 text-primary-ink/70">
            Mythic Blacks and Ancestrals form the highest tier of existence in the game. They are not "stronger versions" of existing species — they are originals, older than the world's own balance.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Base capture rate", "0.001% — 1 in 100,000"],
              ["Compatible ball", "Mythic Black only"],
              ["Master Ball", "No effect"],
              ["Mining Affinity", "Maximum (Tier ∞)"],
              ["Exclusive ability", "River Purification"],
              ["World effect", "Generates Dynamic Events"],
            ].map(([k, v]) => (
              <div key={k} className="border-2 border-primary-ink/15 p-4">
                <p className="mb-1 font-pixel text-[9px] text-primary">{k}</p>
                <p className="text-sm text-primary-ink/75">{v}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-6 border-l-4 border-primary pl-4 text-primary-ink/80">
            Even with the Mythic Black, the odds stay at 0.001%. That is not a balancing bug — it is a design decision. The Ancestral is not captured by skill. It is captured by destiny.
          </blockquote>
          <p className="mt-4 text-primary-ink/70">
            Carrying an Ancestral is not a status — it is a role in the world. You stop being just a participant and become a generator of consequences.
          </p>
        </section>

        <section id="rivers" className="mb-16 scroll-mt-24">
          <SectionTitle index="05">RIVER PURIFICATION</SectionTitle>
          <p className="mb-4 text-primary-ink/70">
            Rivers across the world can be corrupted or stagnant — dark, with no spawns, no life. Purifying a river grants a massive amount of EXP and restores the environment: spawns return, the water clears and the region produces resources again.
          </p>
          <p className="mb-6 border-4 border-primary bg-primary/10 p-4 font-pixel text-[10px] leading-relaxed text-primary">
            ONLY ANCESTRAL CREATURES CAN PURIFY RIVERS.
          </p>
          <p className="text-primary-ink/70">
            No other creature — not legendaries, not common mythics, not even a non-ancestral Mythic Black — has the spiritual resonance the ritual demands. Purified rivers become visible to every player on the map… and purification attracts attention. Not all of it is kind.
          </p>
        </section>

        <section id="events" className="mb-16 scroll-mt-24">
          <SectionTitle index="06">DYNAMIC BEARER EVENTS</SectionTitle>
          <p className="mb-6 text-primary-ink/70">
            The world reacts to an Ancestral's presence. Its bearer becomes a living epicenter, able to trigger global or local events — good and bad.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-4 border-primary-ink bg-background p-5 shadow-pixel">
              <p className="mb-4 font-pixel text-[10px] text-secondary">BLESSINGS</p>
              <ul className="space-y-3">
                {goodEvents.map(([name, desc]) => (
                  <li key={name}>
                    <p className="font-pixel text-[9px] text-primary-ink">{name}</p>
                    <p className="text-sm text-primary-ink/65">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-4 border-primary-ink bg-primary-ink p-5 shadow-pixel">
              <p className="mb-4 font-pixel text-[10px] text-primary">CATASTROPHES</p>
              <ul className="space-y-3">
                {darkEvents.map(([name, desc]) => (
                  <li key={name}>
                    <p className="font-pixel text-[9px] text-primary-foreground">{name}</p>
                    <p className="text-sm text-primary-foreground/65">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 border-l-4 border-secondary pl-4 text-primary-ink/80">
            Design principle: absolute power is never neutral. Every blessing carries the price of the next catastrophe.
          </p>
        </section>

        <section id="summary" className="mb-16 scroll-mt-24">
          <SectionTitle index="07">SUMMARY TABLE</SectionTitle>
          <PixelTable head={["System", "Requirement", "Reward", "Rarity"]} rows={summaryRows} />
          <div className="mt-6 border-4 border-primary-ink bg-primary-ink p-6 shadow-pixel">
            <p className="mb-3 font-pixel text-[10px] text-secondary">THE IDEAL PATH</p>
            <p className="font-pixel text-[9px] leading-loose text-primary-foreground">
              MINE → PURE CRYSTAL → CRYSTAL BALL → BETTER CAPTURES → ANCESTRAL CRYSTAL → MYTHIC BLACK → ANCESTRAL (0.001%) → PURIFY RIVERS → EXP + EVENTS → BECOME THE WORLD'S EPICENTER
            </p>
          </div>
        </section>

        <section className="border-4 border-primary-ink/15 p-6">
          <p className="mb-3 font-pixel text-[10px] text-primary">CURIOSITIES</p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-primary-ink/70">
            <li>The Master Ball fails silently against Ancestrals: no animation, just a dry click. The community calls it "the no".</li>
            <li>The Mythic Black is never sold. It is recognized — the game decides when you deserve it.</li>
            <li>Ancestral bearers are nicknamed "Epicenters" by the community.</li>
            <li>Purified rivers never corrupt again on their own — only through a malevolent Event.</li>
            <li>A single Crystal Rain once made an entire region stop manual mining for a week.</li>
          </ul>
        </section>
      </main>

      <footer className="border-t-4 border-primary-ink py-8 text-center">
        <p className="font-pixel text-[10px] text-primary-ink/50">IDLEMON REVO — A JOURNEY BUILT IN PIXELS.</p>
      </footer>
    </div>
  );
}
