import { Check, Copy, Loader2, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { readWallet, saveWallet, type Wallet } from "@/lib/wallet";
import { gameCountdown, isGameOpen, isPreRegistrationOpen, registrationCountdown } from "@/lib/preregistration";
import registrationArt from "@/assets/saga/pre-registration.webp";
import { FloatingEgg, LoadingBall } from "@/components/SagaAtmosphere";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const RANKS = [
  { id: "HARD", tag: "HARD", line: "I play every single night." },
  { id: "SUPER HARD", tag: "SUPER HARD", line: "Sleep is optional, loot is not." },
  { id: "MESTRE", tag: "MESTRE", line: "Born to catch them all." },
] as const;

function randomChunk(size: number) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

const makeCode = () => `IDLM-${randomChunk(4)}-${randomChunk(4)}`;

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = now === null ? null : registrationCountdown(now);
  const launch = now === null ? null : gameCountdown(now);
  return {
    live: now !== null && isPreRegistrationOpen(now),
    gameLive: now !== null && isGameOpen(now),
    parts: [
      ["HRS", remaining?.hours],
      ["MIN", remaining?.minutes],
      ["SEC", remaining?.seconds],
    ] as const,
    gameParts: [
      ["DAYS", launch?.days],
      ["HRS", launch?.hours],
      ["MIN", launch?.minutes],
      ["SEC", launch?.seconds],
    ] as const,
  };
}

export function WalletSection() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState<string>("HARD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const countdown = useCountdown();

  useEffect(() => setWallet(readWallet()), []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isPreRegistrationOpen(Date.now())) return;
    setError("");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError("Enter a valid email address.");

    setLoading(true);
    const created: Wallet = {
      player: email.trim().split("@")[0] ?? "Trainer",
      email: email.trim().toLowerCase(),
      rank,
      wallet_id: `W-${randomChunk(6)}`,
      codes: Array.from({ length: 5 }, makeCode),
      created_at: new Date().toISOString(),
    };

    setLoading(false);

    saveWallet(created);
    setWallet(created);
  }

  function copyAll() {
    if (!wallet) return;
    void navigator.clipboard.writeText(
      `POKE EMERALD SAGA\nTrainer: ${wallet.player} (${wallet.rank})\nWallet: ${wallet.wallet_id}\n${wallet.codes.join("\n")}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="wallet" className="saga-registration scroll-mt-24 border-y-4 border-primary-ink px-5 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
      <img src={registrationArt} alt="POKE EMERALD SAGA pre-registration on November 7, with a trainer and emerald treasure chest" width={1254} height={1254} loading="lazy" className="mx-auto w-full max-w-lg rounded-lg border-2 border-primary-ink shadow-pixel" />
      <div>
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-pixel text-[10px] uppercase text-primary sm:text-xs">PRE-REGISTRATION · NOVEMBER 07</p>
        <h2 className="mt-4 font-pixel text-xl leading-relaxed text-primary-ink sm:text-3xl">
          {countdown.live ? "YOUR SAGA BEGINS" : "THE WAIT IS ALMOST OVER"}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          {countdown.live ? "Pre-registration is open. Your five reward codes await." : "Opens November 7 at 5:00 PM Brasília time (UTC−3)."}
        </p>

        <div className="mx-auto mt-5 w-36"><FloatingEgg /></div>
        <p className="font-pixel text-[9px] leading-relaxed text-muted-foreground">A LITTLE MYSTERY AWAITS</p>
        <div className="mt-6 flex justify-center"><LoadingBall open={countdown.live} /></div>
        <div role="timer" aria-label="Time until pre-registration opens" className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-3">
          {countdown.parts.map(([label, value]) => (
            <div key={label} className="border-2 border-primary-ink bg-card py-3 shadow-pixel-sm">
              <p className="font-pixel text-lg text-primary sm:text-2xl">{value === undefined ? "--" : String(value).padStart(2, "0")}</p>
              <p className="mt-2 font-pixel text-[8px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <p role="status" className="mt-5 font-pixel text-[10px] leading-relaxed text-primary">{countdown.live ? "PRE-REGISTRATION OPEN" : "PRE-REGISTRATION OPENS SOON"}</p>

        <div className="saga-launch mx-auto mt-8 max-w-md border-2 border-primary-ink bg-card p-4 shadow-pixel-sm">
          <p className="font-pixel text-[9px] uppercase leading-relaxed text-primary">THE GAME OPENS · NOVEMBER 14 · 10:00 PM</p>
          <div role="timer" aria-label="Time until the game opens" className="mt-4 grid grid-cols-4 gap-2">
            {countdown.gameParts.map(([label, value]) => (
              <div key={label} className="border-2 border-primary-ink bg-background py-3">
                <p className="font-pixel text-sm text-primary sm:text-lg">{value === undefined ? "--" : String(value).padStart(2, "0")}</p>
                <p className="mt-2 font-pixel text-[7px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <p role="status" className="mt-3 font-pixel text-[9px] leading-relaxed text-muted-foreground">
            {countdown.gameLive ? "SERVERS ARE LIVE — WELCOME TO THE SAGA" : "SERVERS COMING ONLINE · BRASÍLIA TIME (UTC−3)"}
          </p>
        </div>
      </div>
      </div>
      </div>

      <div className="mx-auto mt-12 max-w-xl border-4 border-primary-ink bg-card p-6 shadow-pixel sm:p-8">
        {wallet ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-primary-ink pb-4">
              <div className="min-w-0">
                <p className="font-pixel text-[10px] text-primary-ink">{wallet.player}</p>
                <p className="mt-2 font-pixel text-[8px] text-primary">{wallet.rank}</p>
                <p className="mt-2 text-xs text-muted-foreground">Wallet {wallet.wallet_id}</p>
              </div>
              <Button type="button" variant="pixelOutline" onClick={copyAll}>
                {copied ? <Check /> : <Copy />} {copied ? "COPIED" : "COPY"}
              </Button>
            </div>
            <ul className="mt-5 grid gap-3">
              {wallet.codes.map((code, i) => (
                <li
                  key={code}
                  className="flex items-center justify-between gap-4 border-2 border-primary-ink bg-background px-4 py-3 shadow-pixel-sm"
                >
                  <span className="font-pixel text-[9px] text-primary">0{i + 1}</span>
                  <span className="font-pixel text-[10px] tracking-wider text-primary-ink sm:text-xs">
                    {code}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-xs text-muted-foreground">
              Write these down — this wallet can only be created once on this device.
            </p>
          </div>
        ) : !countdown.live ? (
          <div className="text-center"><LockKeyhole className="mx-auto size-6 text-primary" /><p className="mt-4 font-pixel text-[10px] leading-loose text-primary-ink">YOUR ADVENTURE IS GETTING READY</p><p className="mt-3 text-muted-foreground">November 7, 2026 · 5:00 PM Brasília</p><Button variant="pixel" disabled className="mt-5"><LockKeyhole /> OPENS AT 5:00 PM</Button></div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5">
            <label className="grid gap-2">
              <span className="font-pixel text-[10px] text-primary-ink">GMAIL</span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={120}
                placeholder="trainer@gmail.com"
                className="h-12 rounded-none border-2 border-primary-ink bg-background"
              />
            </label>

            <fieldset className="grid gap-3">
              <legend className="font-pixel text-[10px] text-primary-ink">
                WHAT KIND OF PLAYER ARE YOU?
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {RANKS.map((option) => {
                  const active = rank === option.id;
                  return (
                    <Button variant="ghost"
                      key={option.id}
                      type="button"
                      onClick={() => setRank(option.id)}
                      className={`h-auto flex-col items-start whitespace-normal rounded-none border-2 border-primary-ink px-3 py-4 text-left transition-transform ${
                        active
                          ? "bg-primary text-primary-foreground shadow-pixel-sm -translate-y-0.5"
                          : "bg-background text-primary-ink hover:-translate-y-0.5"
                      }`}
                    >
                      <span className="block font-pixel text-[9px] leading-relaxed">{option.tag}</span>
                      <span
                        className={`mt-2 block text-xs leading-5 ${active ? "text-primary-foreground/85" : "text-muted-foreground"}`}
                      >
                        {option.line}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </fieldset>

            {error && <p className="text-sm font-semibold text-primary">{error}</p>}
            <Button type="submit" variant="pixel" size="lg" disabled={loading || !countdown.live}>
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? "CREATING..." : "UNLOCK MY CODES"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
