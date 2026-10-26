import { useMemo, useState } from "react";
import { Search, ArrowUpRight, Sparkles } from "lucide-react";
import { ANCESTRALS, ANCESTRAL_BONUSES, type Ancestral, type Shape } from "@/lib/ancestrals";
import { ANCESTRAL_ART } from "@/lib/ancestral-art";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// 12x12 sprite templates. o = outline, m = main, a = accent, e = eye
const SHAPES: Record<Shape, string[]> = {
  dragon: [
    "..oo....oo..",
    ".oao....oao.",
    ".oaooooooao.",
    "..ommmmmmo..",
    ".ommemmemmo.",
    ".ommmmmmmmo.",
    "oaommaammoao",
    "oaammaammaao",
    ".ommmmmmmmo.",
    "..ommmmmmo..",
    "..omo..omo..",
    "..oo....oo..",
  ],
  serpent: [
    "....oooo....",
    "...ommmmo...",
    "..omemmemo..",
    "..ommaammo..",
    "...ommmmo...",
    ".....omo....",
    "....omao....",
    "...omao.....",
    "..omao..oo..",
    "..omaooomo..",
    "...ommmmao..",
    "....oooo....",
  ],
  bird: [
    "....oooo....",
    "...ommmmo...",
    "o..omemmo..o",
    "ao.ommmmo.oa",
    "maoommmmooam",
    "mmaommmmoamm",
    ".mmaaommaamm",
    "..mmommmomm.",
    "....ommmo...",
    "....omao....",
    ".....oo.....",
    "............",
  ],
  beast: [
    "..o......o..",
    ".oao....oao.",
    ".ommoooommo.",
    "ommmmmmmmmmo",
    "ommemmmmemmo",
    "ommmaaaammmo",
    "oammmmmmmmao",
    "oaammmmmmaao",
    ".ommmaammmo.",
    ".ommo..ommo.",
    ".oaao..oaao.",
    "..oo....oo..",
  ],
  ghost: [
    "....oooo....",
    "...oaaaao...",
    "..oaaaaaao..",
    "..ommmmmmo..",
    ".ommemmemmo.",
    ".ommmmmmmmo.",
    "oammmaammmao",
    ".ommmmmmmmo.",
    "..ommmmmmo..",
    "..omommomo..",
    "..oo.oo.oo..",
    "............",
  ],
  moon: [
    "...oooo.....",
    "..ommmmo....",
    ".ommmoo.....",
    ".ommo..oo...",
    "ommo..oaao..",
    "ommo.oaeao..",
    "ommo..oaao..",
    ".ommo..oo...",
    ".ommmoo.....",
    "..ommmmo....",
    "...oooo.....",
    "............",
  ],
};

export function AncestralSprite({ c, size = 48 }: { c: Ancestral; size?: number }) {
  const { main, accent, aura } = c.sprite;
  const cells: React.ReactNode[] = [];
  SHAPES[c.sprite.shape].forEach((row, y) =>
    row.split("").forEach((ch, x) => {
      if (ch === ".") return;
      const fill = ch === "o" ? "#0B0812" : ch === "m" ? main : ch === "a" ? accent : "#FFFFFF";
      cells.push(<rect key={`${x}-${y}`} x={x + 1} y={y + 1} width={1} height={1} fill={fill} />);
    }),
  );
  return (
    <svg viewBox="0 0 14 14" width={size} height={size} shapeRendering="crispEdges" role="img" aria-label={`${c.name} sprite`}>
      <rect x={0} y={0} width={14} height={14} fill={aura} opacity={0.18} />
      {cells}
    </svg>
  );
}

function BonusIcon({ kind }: { kind: string }) {
  const map: Record<string, string[]> = {
    crystal: ["..o..", ".oco.", "occco", ".oco.", "..o.."],
    xp: ["o...o", ".o.o.", "..o..", ".o.o.", "o...o"],
    trainer: [".ooo.", ".oco.", ".ooo.", "ocCco", "occco"],
    gold: [".ooo.", "occco", "ocCco", "occco", ".ooo."],
  };
  const color: Record<string, string> = { crystal: "#63CFE0", xp: "#A96BFF", trainer: "#E14B3B", gold: "#FFC94D" };
  return (
    <svg viewBox="0 0 5 5" width={18} height={18} shapeRendering="crispEdges" aria-hidden>
      {(map[kind] ?? []).flatMap((r, y) =>
        r.split("").map((ch, x) =>
          ch === "." ? null : (
            <rect key={`${x}${y}`} x={x} y={y} width={1} height={1} fill={ch === "o" ? "#0B0812" : ch === "C" ? "#FFFFFF" : color[kind]} />
          ),
        ),
      )}
    </svg>
  );
}

const TypeTag = ({ t }: { t: string }) => (
  <span className="border border-secondary/60 px-1.5 py-0.5 font-pixel text-[7px] text-secondary">{t.toUpperCase()}</span>
);
const RarityTag = () => (
  <span className="bg-rarity-ancestral px-1.5 py-0.5 font-pixel text-[7px] text-primary-foreground">ANCESTRAL</span>
);

function AncestralArtwork({ c, large = false }: { c: Ancestral; large?: boolean }) {
  const art = ANCESTRAL_ART[c.id];
  return (
    <div className={`ancestral-stage relative flex w-full items-center justify-center overflow-hidden ${large ? "h-64 sm:h-72" : "h-32 sm:h-40"}`}>
      {art ? <img src={art.src} alt={art.subject} width={475} height={475} loading={large ? "eager" : "lazy"} className={`ancestral-art relative h-full w-full object-contain ${large ? "p-4" : "p-3"}`} /> : <AncestralSprite c={c} size={large ? 160 : 80} />}
      {large && art?.reference && <span className="absolute bottom-2 left-2 right-2 bg-card/95 px-2 py-1 text-center text-xs text-muted-foreground">Species reference · {art.subject}</span>}
    </div>
  );
}

export function AncestralEncyclopedia() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [open, setOpen] = useState<Ancestral | null>(null);
  const types = useMemo(() => ["All", ...Array.from(new Set(ANCESTRALS.flatMap((c) => c.types))).sort()], []);
  const list = ANCESTRALS.filter(
    (c) => c.name.toLowerCase().includes(query.trim().toLowerCase()) && (type === "All" || c.types.includes(type)),
  );

  return (
    <div className="border-4 border-primary-ink bg-primary-ink p-5 text-primary-foreground shadow-pixel sm:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 font-pixel text-[9px] text-secondary"><Sparkles className="h-4 w-4" /> SECRET ARCHIVE</p>
          <h3 className="font-pixel text-base leading-relaxed sm:text-xl">ANCESTRAL ENCYCLOPEDIA</h3>
          <p className="mt-2 text-sm text-primary-foreground/70">17 rare creatures. Unique powers. A legacy beyond time.</p>
        </div>
        <span className="border-2 border-secondary px-3 py-2 font-pixel text-[9px] text-secondary">17 CATALOGUED</span>
      </div>

      <div className="mb-4 flex items-center gap-2 border-2 border-primary-foreground/25 px-3 py-2">
        <Search className="h-4 w-4 text-primary-foreground/50" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name..."
          aria-label="Search Ancestrals"
          className="w-full bg-transparent text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/40"
        />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {types.map((t) => (
          <Button variant="ghost" aria-pressed={type === t}
            key={t}
            onClick={() => setType(t)}
            className={`h-8 rounded-none border-2 px-2 py-1 font-pixel text-[8px] transition-colors ${type === t ? "border-primary bg-primary text-primary-foreground hover:bg-primary-bright hover:text-primary-foreground" : "border-primary-foreground/20 text-primary-foreground/70 hover:border-secondary"}`}
          >
            {t.toUpperCase()}
          </Button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="border-2 border-dashed border-primary-foreground/20 p-8 text-center font-pixel text-[9px] text-primary-foreground/60">
          NO ANCESTRAL FOUND. THE ARCHIVE STAYS SILENT.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((c) => (
            <Button variant="ghost" aria-label={`View ${c.name}`}
              key={c.id}
              onClick={() => setOpen(c)}
              className="group relative flex h-auto min-w-0 flex-col items-stretch gap-0 whitespace-normal rounded-none border-2 border-primary-foreground/20 p-0 text-center text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:bg-primary-foreground/5 hover:text-primary-foreground active:translate-y-0"
            >
              <AncestralArtwork c={c} />
              <div className="flex min-h-28 flex-col items-center gap-2 p-3">
              <p className="flex min-h-8 items-center justify-center font-pixel text-[8px] leading-relaxed">{c.name}</p>
              <div className="flex flex-wrap justify-center gap-1">
                {c.types.map((t) => <TypeTag key={t} t={t} />)}
              </div>
              <RarityTag />
              </div>
              <ArrowUpRight className="absolute right-2 top-2 text-primary-ink opacity-50 transition-opacity group-hover:opacity-100" />
            </Button>
          ))}
        </div>
      )}

      <Dialog open={Boolean(open)} onOpenChange={(isOpen) => { if (!isOpen) setOpen(null); }}>
      {open && (
          <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl gap-0 overflow-y-auto rounded-none border-4 border-secondary bg-primary-ink p-0 text-primary-foreground shadow-pixel sm:rounded-none [&>button]:bg-primary-ink [&>button]:text-primary-foreground">
            <AncestralArtwork c={open} large />
            <div className="p-5 sm:p-6">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex-1">
                <DialogTitle className="mb-2 font-pixel text-sm leading-relaxed tracking-normal">{open.name}</DialogTitle>
                <div className="flex flex-wrap gap-1">
                  <RarityTag />
                  {open.types.map((t) => <TypeTag key={t} t={t} />)}
                </div>
              </div>
            </div>
            <DialogDescription className="mb-3 text-sm text-primary-foreground/80">{open.description}</DialogDescription>
            <p className="mb-5 text-sm"><span className="font-pixel text-[8px] text-secondary">SPECIALTY </span>{open.specialty}</p>
            <p className="mb-2 font-pixel text-[9px] text-primary">ABILITIES</p>
            <ul className="mb-5 space-y-2">
              {open.abilities.map(([n, d], i) => (
                <li key={n} className="flex gap-3 border-2 border-primary-foreground/10 p-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-primary font-pixel text-[8px]">{i + 1}</span>
                  <div>
                    <p className="font-pixel text-[8px] leading-relaxed">{n}</p>
                    <p className="text-sm text-primary-foreground/70">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mb-5 border-l-4 border-secondary pl-3 text-sm"><span className="font-pixel text-[8px] text-secondary">TRAIT </span>{open.trait}</p>
            <p className="mb-2 font-pixel text-[9px] text-primary">BONUSES</p>
            <div className="grid grid-cols-2 gap-2">
              {ANCESTRAL_BONUSES.map((b) => (
                <div key={b.label} className="flex items-center gap-2 border-2 border-primary-foreground/10 p-2">
                  <BonusIcon kind={b.icon} />
                  <span className="font-pixel text-[9px] text-secondary">{b.value}</span>
                  <span className="text-xs text-primary-foreground/70">{b.label}</span>
                </div>
              ))}
            </div>
            </div>
          </DialogContent>
      )}
      </Dialog>
    </div>
  );
}
