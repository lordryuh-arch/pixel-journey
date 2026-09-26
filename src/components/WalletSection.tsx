import { Check, Copy, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import esmeralda from "@/assets/idlemon-esmeralda.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LAUNCH_AT, readWallet, saveWallet, type Wallet } from "@/lib/wallet";

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
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    setLeft(LAUNCH_AT.getTime() - Date.now());
    const id = setInterval(() => setLeft(LAUNCH_AT.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const total = Math.max(0, Math.floor((left ?? 0) / 1000));
  return {
    live: left !== null && left <= 0,
    parts: [
            ["HRS", Math.floor((total % 86400) / 3600)],
      ["MIN", Math.floor((total % 3600) / 60)],
      ["SEC", total % 60],
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
      `IDLEMON REVO\nTrainer: ${wallet.player} (${wallet.rank})\nWallet: ${wallet.wallet_id}\n${wallet.codes.join("\n")}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="wallet" className="border-y-4 border-primary-ink bg-accent/30 px-5 py-24 sm:py-32">
      <img
        src={esmeralda}
        alt="IDLEMON REVO Emerald pre-registration artwork: a trainer with a dragon companion beside a glowing emerald egg"
        loading="lazy"
        width={1280}
        height={647}
        className="pixel-corners mx-auto mb-12 w-full max-w-3xl border-4 border-primary-ink object-cover shadow-pixel"
      />
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-pixel text-[10px] uppercase text-primary sm:text-xs">TRAINER WALLET</p>
        <h2 className="mt-4 font-pixel text-xl leading-relaxed text-primary-ink sm:text-3xl">
          CLAIM YOUR 5 REWARD CODES
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Pre-registration closes today, September 26 at 11:00 PM. Enter your Gmail, unlock your
          five codes and write them down.
        </p>

        <div className="mx-auto mt-8 grid max-w-sm grid-cols-3 gap-2">
          {countdown.parts.map(([label, value]) => (
            <div key={label} className="border-2 border-primary-ink bg-card py-3 shadow-pixel-sm">
              <p className="font-pixel text-sm text-primary">{String(value).padStart(2, "0")}</p>
              <p className="mt-2 font-pixel text-[8px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        {countdown.live && (
          <p className="mt-4 font-pixel text-[10px] text-primary">PRE-REGISTRATION CLOSED</p>
        )}
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
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRank(option.id)}
                      className={`border-2 border-primary-ink px-3 py-4 text-left transition-transform ${
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
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {error && <p className="text-sm font-semibold text-primary">{error}</p>}
            <Button type="submit" variant="pixel" size="lg" disabled={loading || countdown.live}>
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? "CREATING..." : "UNLOCK MY CODES"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
