import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

import heroImage from "@/assets/saga/winter-top.webp";
import forestMap from "@/assets/idlemon-map-bone.png";
import iceMap from "@/assets/idlemon-map-ice.png";
import marketplace from "@/assets/saga/emerald-world.webp";
import gym from "@/assets/idlemon-gym.jpg";
import esmeralda from "@/assets/saga/emerald-world.webp";
import { Button } from "@/components/ui/button";
import { WalletSection } from "@/components/WalletSection";
import { Snowfall } from "@/components/SagaAtmosphere";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "POKE EMERALD SAGA | Your Journey Begins Here" },
      {
        name: "description",
        content: "Explore maps, discover rare creatures, and begin your pixel-art journey in POKE EMERALD SAGA.",
      },
      { property: "og:title", content: "POKE EMERALD SAGA | Your Journey Begins Here" },
      {
        property: "og:description",
        content: "A classic handheld RPG world brought back to life on the modern web.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = [
  ["Home", "#home"],
  ["The Game", "#game"],
  ["Rarities", "#rarities"],
  ["Economy", "#economy"],
  ["Gyms", "#gyms"],
  ["Marketplace", "#marketplace"],
  ["Pre-register", "#wallet"],
  ["Wiki", "/wiki"],
] as const;

const DISCORD_URL = "https://discord.gg/rexaPcDEEm";
const WHATSAPP_URL = "https://chat.whatsapp.com/IOfCVtlVABE8gZtemGgwZ0?s=cl&p=a&ilr=4&iam=1";

function PixelIcon({ kind, className = "" }: { kind: "energy" | "gold" | "crystal" | "emerald" | "ruby" | "egg" | "market" | "gym" | "discord" | "whatsapp"; className?: string }) {
  const paths = {
    energy: <><path d="M27 3 10 27h12l-3 18 17-25H24z" fill="currentColor"/><path d="M25 8 15 23h10l-2 12 9-13H21z" fill="var(--color-secondary)"/></>,
    gold: <><rect x="9" y="9" width="30" height="30" fill="currentColor"/><rect x="5" y="15" width="38" height="18" fill="currentColor"/><rect x="13" y="13" width="22" height="22" fill="var(--color-secondary)"/><rect x="19" y="17" width="10" height="14" fill="currentColor"/></>,
    crystal: <><path d="m24 3 16 15-16 27L8 18z" fill="currentColor"/><path d="m24 8 7 11-7 18-7-18z" fill="var(--color-background)"/><path d="m17 19 7-11v29z" fill="var(--color-secondary)"/></>,
    emerald: <><path d="M14 5h20l10 12-6 22-14 7-14-7-6-22z" fill="currentColor"/><path d="m24 9 12 10-5 16-7 5-7-5-5-16z" fill="var(--color-background)"/></>,
    ruby: <><path d="M12 7h24l9 12-21 27L3 19z" fill="currentColor"/><path d="m14 12 20 1 4 7-14 18-14-18z" fill="var(--color-secondary)"/></>,
    egg: <><path d="M24 3c12 0 19 20 19 31 0 9-8 12-19 12S5 43 5 34C5 23 12 3 24 3Z" fill="currentColor"/><path d="m14 25 6-5 6 6 7-6 6 7v8c0 5-6 7-15 7S9 40 9 35v-5z" fill="var(--color-background)"/></>,
    market: <><path d="M5 17h38v28H5z" fill="currentColor"/><path d="M2 10h44v11H2z" fill="var(--color-secondary)"/><path d="M6 6h36l4 12H2z" fill="currentColor"/><path d="M11 22h10v23H11zm16 5h10v9H27z" fill="var(--color-background)"/></>,
    gym: <><path d="m24 3 21 13v29H3V16z" fill="currentColor"/><path d="M8 19h32v22H8z" fill="var(--color-background)"/><path d="M19 26h10v15H19z" fill="currentColor"/><path d="m24 8 7 7H17z" fill="var(--color-secondary)"/></>,
    discord: <><rect x="14" y="9" width="7" height="7" fill="currentColor"/><rect x="27" y="9" width="7" height="7" fill="currentColor"/><rect x="9" y="15" width="30" height="5" fill="currentColor"/><rect x="7" y="20" width="34" height="5" fill="currentColor"/><rect x="7" y="25" width="34" height="5" fill="currentColor"/><rect x="7" y="30" width="34" height="5" fill="currentColor"/><rect x="9" y="35" width="30" height="5" fill="currentColor"/><rect x="13" y="40" width="22" height="4" fill="currentColor"/><rect x="15" y="23" width="7" height="10" fill="var(--color-background)"/><rect x="26" y="23" width="7" height="10" fill="var(--color-background)"/></>,
    whatsapp: <><rect x="14" y="5" width="20" height="5" fill="currentColor"/><rect x="10" y="10" width="28" height="5" fill="currentColor"/><rect x="6" y="15" width="36" height="5" fill="currentColor"/><rect x="6" y="20" width="36" height="5" fill="currentColor"/><rect x="6" y="25" width="36" height="5" fill="currentColor"/><rect x="6" y="30" width="36" height="5" fill="currentColor"/><rect x="10" y="35" width="28" height="5" fill="currentColor"/><rect x="14" y="40" width="20" height="4" fill="currentColor"/><rect x="11" y="44" width="8" height="3" fill="currentColor"/><rect x="16" y="15" width="8" height="8" fill="var(--color-background)"/><rect x="23" y="22" width="5" height="5" fill="var(--color-background)"/><rect x="26" y="26" width="8" height="8" fill="var(--color-background)"/></>,
  };
  return <svg viewBox="0 0 48 48" aria-hidden="true" className={`shrink-0 [shape-rendering:crispEdges] ${className}`}>{paths[kind]}</svg>;
}

function CommunityLink({ href, label, kind, className = "" }: { href: string; label: string; kind: "discord" | "whatsapp"; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`grid size-10 shrink-0 place-items-center border-2 border-primary-ink bg-card text-primary-ink shadow-pixel-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      <PixelIcon kind={kind} className="size-6" />
    </a>
  );
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-pixel text-[10px] uppercase text-primary sm:text-xs">{eyebrow}</p>
      <h2 className="mt-4 font-pixel text-xl leading-relaxed text-primary-ink sm:text-3xl lg:text-4xl">{title}</h2>
      {children && <div className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{children}</div>}
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="overflow-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-primary-ink bg-background/95 backdrop-blur-sm">
        <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6">
          <a href="#home" className="min-w-0 max-w-60 font-pixel text-[10px] leading-loose text-primary sm:text-xs">POKE <span className="text-primary-ink">EMERALD SAGA</span></a>
          <nav className="hidden items-center gap-4 xl:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-foreground transition-colors hover:text-primary">{label}</a>)}
            <div className="flex items-center gap-2">
              <CommunityLink href={DISCORD_URL} label="Join the POKE EMERALD SAGA Discord" kind="discord" />
              <CommunityLink href={WHATSAPP_URL} label="Join the POKE EMERALD SAGA WhatsApp group" kind="whatsapp" />
            </div>
            <Button asChild variant="pixel" size="lg"><a href="#wallet">PRE-REGISTER</a></Button>
          </nav>
          <Button variant="pixelOutline" size="icon" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} className="size-10 xl:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && (
          <nav className="border-t-2 border-primary-ink bg-background px-5 py-5 xl:hidden" aria-label="Mobile navigation">
            <div className="grid gap-1">
              {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-border py-3 font-semibold">{label}</a>)}
              <div className="flex items-center gap-3 border-b border-border py-3">
                <CommunityLink href={DISCORD_URL} label="Join the POKE EMERALD SAGA Discord" kind="discord" />
                <CommunityLink href={WHATSAPP_URL} label="Join the POKE EMERALD SAGA WhatsApp group" kind="whatsapp" />
                <span className="text-sm text-muted-foreground">Talk with other trainers</span>
              </div>
              <Button asChild variant="pixel" className="mt-4"><a href="#wallet" onClick={() => setMenuOpen(false)}>PRE-REGISTER</a></Button>
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="relative pt-18">
        <div className="relative overflow-hidden bg-saga-winter">
          <img src={heroImage} alt="POKE EMERALD SAGA winter adventure with trainers, snowy mountains and a Poké Ball snowman" width={1672} height={941} fetchPriority="high" className="block aspect-[1672/941] w-full object-contain" />
          <Snowfall />
        </div>
        <div className="border-y-4 border-primary-ink bg-background px-5 py-8 sm:py-10">
          <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div><p className="font-pixel text-[9px] text-primary">A NEW CHAPTER · NOVEMBER 07</p><h1 className="mt-3 font-pixel text-xl leading-relaxed text-primary-ink sm:text-3xl">POKE EMERALD SAGA</h1><p className="mt-3 text-lg font-semibold text-foreground">Your journey begins here.</p><p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">Explore maps, discover Pokémon, and begin a new adventure inspired by the golden age of handheld RPGs.</p></div>
            <div className="flex flex-wrap items-start gap-4 lg:flex-col"><Button asChild variant="pixel" size="lg"><a href="#wallet">PRE-REGISTER <ChevronRight /></a></Button><Button asChild variant="pixelOutline" size="lg"><a href="#maps">EXPLORE THE WORLD</a></Button></div>
          </div>
        </div>
      </section>

      <WalletSection />

      <section id="game" className="pixel-grid px-5 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="mx-auto grid size-52 place-items-center border-4 border-primary-ink bg-card shadow-pixel sm:size-64"><PixelIcon kind="energy" className="size-28 text-primary sm:size-36" /></div>
          <div><p className="font-pixel text-[10px] text-primary">CORE RESOURCE</p><h2 className="mt-4 font-pixel text-2xl leading-relaxed text-primary-ink sm:text-4xl">ENERGY FUELS YOUR JOURNEY</h2><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Energy is one of the core resources used to explore maps.</p><div className="mt-8 max-w-md"><div className="mb-3 flex items-center justify-between font-pixel text-[10px]"><span>ENERGY</span><span>8 / 10</span></div><div className="grid grid-cols-10 gap-1 border-2 border-primary-ink bg-card p-2 shadow-pixel-sm">{Array.from({ length: 10 }, (_, i) => <span key={i} className={`h-7 ${i < 8 ? "bg-primary" : "bg-muted"}`} />)}</div></div></div>
        </div>
      </section>

      <section id="rarities" className="bg-primary-ink px-5 py-24 text-primary-foreground sm:py-32">
        <SectionHeading eyebrow="THE THRILL OF DISCOVERY" title="NOT EVERY ENCOUNTER IS THE SAME"><p className="text-primary-foreground/75">Different rarities can appear across different maps and encounters.</p></SectionHeading>
        <div className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-center gap-3">
          {[['COMMON','bg-rarity-common'],['UNCOMMON','bg-rarity-uncommon'],['RARE','bg-rarity-rare'],['EPIC','bg-rarity-epic'],['MYTHIC','bg-rarity-mythic'],['BLACK MYTHIC','bg-rarity-black'],['ANCESTRAL','bg-rarity-ancestral']].map(([name,color], i) => <div key={name} className={`group relative min-w-36 border-2 border-primary-foreground/60 ${color} px-5 py-7 text-center shadow-[4px_4px_0_var(--color-primary-foreground)] transition-transform hover:-translate-y-2`}><span className="block font-pixel text-[10px] leading-relaxed text-primary-foreground">{name}</span><span className="mx-auto mt-4 block size-2 rotate-45 border border-primary-foreground bg-primary-foreground/35" style={{ transform: `rotate(45deg) scale(${1 + i * .08})` }} /></div>)}
        </div>
      </section>

      <section id="maps" className="px-5 py-24 sm:py-32">
        <SectionHeading eyebrow="EXPLORE" title="EVERY MAP HIDES A POSSIBILITY" />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
          {[{src:forestMap,name:'BONE FOREST',energy:2},{src:iceMap,name:'ICE FOREST',energy:4}].map((map, i) => <article key={map.name} className="group overflow-hidden border-4 border-primary-ink bg-card shadow-pixel"><div className="overflow-hidden"><img src={map.src} alt={`${map.name} pixel-art map`} loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5"><div className="min-w-0"><p className="font-pixel text-xs text-primary-ink sm:text-sm">{map.name}</p><div className="mt-3 flex gap-1">{Array.from({length:4},(_,j)=><span key={j} className={`h-2 w-8 ${j <= i ? 'bg-primary' : 'bg-muted'}`} />)}</div></div><div className="flex shrink-0 items-center gap-2 font-pixel text-[10px]"><PixelIcon kind="energy" className="size-6 text-primary" />{map.energy}</div></div></article>)}
        </div>
      </section>

      <section id="economy" className="border-y-2 border-primary-ink bg-accent/35 px-5 py-24 sm:py-32">
        <SectionHeading eyebrow="COLLECT & TRADE" title="THE ECONOMY OF YOUR JOURNEY"><p>These in-game tokens are connected to the POKE EMERALD SAGA economy and its marketplace.</p></SectionHeading>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {[['GOLD','gold','text-secondary'],['CRYSTAL','crystal','text-rarity-rare'],['EMERALDS','emerald','text-rarity-uncommon'],['RUBY','ruby','text-primary']].map(([name,kind,color]) => <div key={name} className="text-center"><div className="mx-auto grid size-28 place-items-center border-2 border-primary-ink bg-card shadow-pixel-sm transition-transform hover:-translate-y-2"><PixelIcon kind={kind as 'gold' | 'crystal' | 'emerald' | 'ruby'} className={`size-16 ${color}`} /></div><p className="mt-5 font-pixel text-[10px] text-primary-ink">{name}</p></div>)}
        </div>
      </section>

      <section id="marketplace" className="px-5 py-24 sm:py-32"><div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"><div className="order-2 lg:order-1"><div className="mb-5 flex items-center gap-3 text-primary"><PixelIcon kind="market" className="size-12" /><span className="font-pixel text-[10px]">THE TRADING POST</span></div><h2 className="font-pixel text-2xl leading-relaxed text-primary-ink sm:text-4xl">THE EMERALD MARKETPLACE</h2><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Trade and explore the evolving economy of the POKE EMERALD SAGA universe.</p><Button asChild variant="pixel" size="lg" className="mt-8"><a href="#marketplace">EXPLORE MARKETPLACE <ChevronRight /></a></Button></div><img src={marketplace} alt="POKE EMERALD SAGA with Rayquaza above emerald islands and waterfalls" loading="lazy" width={1671} height={941} className="pixel-corners order-1 aspect-[16/9] w-full border-4 border-primary-ink object-cover shadow-pixel lg:order-2" /></div></section>

      <section id="gyms" className="bg-primary-ink px-5 py-24 text-primary-foreground sm:py-32"><div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"><img src={gym} alt="Classic red-roofed Pokémon gym" loading="lazy" width={1024} height={1024} className="pixel-corners mx-auto aspect-square w-full max-w-lg border-4 border-primary-foreground object-cover shadow-[8px_8px_0_var(--color-primary)]" /><div><div className="mb-5 flex items-center gap-3 text-secondary"><PixelIcon kind="gym" className="size-12" /><span className="font-pixel text-[10px]">NEXT CHALLENGE</span></div><h2 className="font-pixel text-2xl leading-relaxed sm:text-4xl">GYMS ARE WAITING</h2><p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/75">Prepare your team and face the challenges waiting throughout your journey.</p><Button asChild variant="pixel" size="lg" className="mt-8"><a href="#gyms">DISCOVER THE GYMS <ChevronRight /></a></Button></div></div></section>

      <section className="px-5 py-24 sm:py-32"><div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2"><div><p className="font-pixel text-[10px] text-primary">A LOVE LETTER TO ADVENTURE</p><h2 className="mt-4 font-pixel text-2xl leading-relaxed text-primary-ink sm:text-4xl">MADE FOR THOSE WHO MISS THE CLASSICS</h2><p className="mt-6 whitespace-pre-line text-xl leading-9 text-muted-foreground">{"Pixel art. Exploration. Collection. Discovery.\nA simple journey inspired by the games that shaped a generation."}</p></div><img src={esmeralda} alt="POKE EMERALD SAGA emblem with Rayquaza and an emerald island world" loading="lazy" width={1671} height={941} className="pixel-corners mx-auto w-full max-w-xl border-4 border-primary-ink shadow-pixel" /></div></section>

      <section id="play" className="relative border-y-4 border-primary-ink bg-primary px-5 py-24 text-center text-primary-foreground sm:py-32"><div className="pixel-grid absolute inset-0 opacity-15" /><div className="relative mx-auto max-w-4xl"><PixelIcon kind="egg" className="mx-auto size-16 text-secondary" /><h2 className="mt-7 font-pixel text-2xl leading-relaxed sm:text-5xl">YOUR NEXT CHAPTER AWAITS.</h2><p className="mt-5 text-xl font-semibold">Explore. Discover. Collect. Evolve.</p><Button asChild variant="pixelOutline" size="lg" className="mt-9"><a href="#wallet">PRE-REGISTER <ChevronRight /></a></Button><p className="mt-12 font-pixel text-[10px] uppercase text-primary-foreground/85">Or travel with the community</p><div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row"><Button asChild variant="pixelOutline" size="lg"><a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"><PixelIcon kind="discord" className="size-6 text-primary" /> JOIN DISCORD</a></Button><Button asChild variant="pixelOutline" size="lg"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><PixelIcon kind="whatsapp" className="size-6 text-primary" /> WHATSAPP GROUP</a></Button></div></div></section>

      <footer className="bg-primary-ink px-5 py-12 text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><p className="font-pixel text-sm">POKE <span className="text-secondary">EMERALD SAGA</span></p><p className="mt-3 text-sm text-primary-foreground/60">A journey built in pixels.</p></div><nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold" aria-label="Footer navigation">{[['The Game','#game'],['Maps','#maps'],['Rarities','#rarities'],['Marketplace','#marketplace'],['Gyms','#gyms']].map(([label,href])=><a key={href} href={href} className="transition-colors hover:text-secondary">{label}</a>)}<a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-secondary"><PixelIcon kind="discord" className="size-5 text-secondary" /> Discord</a><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-secondary"><PixelIcon kind="whatsapp" className="size-5 text-secondary" /> WhatsApp</a></nav></div></footer>
    </main>
  );
}