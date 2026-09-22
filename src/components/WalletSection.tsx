import { Check, Copy, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "idlemon-revo-wallet";
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

type Wallet = {
  player: string;
  wallet_id: string;
  codes: string[];
  created_at: string;
};

function randomChunk(size: number) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

function makeCode() {
  return `IDLM-${randomChunk(4)}-${randomChunk(4)}`;
}

async function hash(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function WalletSection() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [player, setPlayer] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setWallet(JSON.parse(raw) as Wallet);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (player.trim().length < 3) return setError("Choose a trainer name with at least 3 characters.");
    if (password.length < 4) return setError("Your password needs at least 4 characters.");

    setLoading(true);
    const created: Wallet = {
      player: player.trim(),
      wallet_id: `W-${randomChunk(6)}`,
      codes: Array.from({ length: 5 }, makeCode),
      created_at: new Date().toISOString(),
    };

    const { error: dbError } = await supabase.from("wallets").insert({
      player_name: created.player,
      password_hash: await hash(password),
      wallet_id: created.wallet_id,
      codes: created.codes,
    });
    setLoading(false);

    if (dbError) {
      setError("We couldn't create your wallet right now. Please try again.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
    setWallet(created);
  }

  function copyAll() {
    if (!wallet) return;
    void navigator.clipboard.writeText(
      `IDLEMON REVO\nTrainer: ${wallet.player}\nWallet: ${wallet.wallet_id}\n${wallet.codes.join("\n")}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="wallet" className="border-y-4 border-primary-ink bg-accent/30 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-pixel text-[10px] uppercase text-primary sm:text-xs">TRAINER WALLET</p>
        <h2 className="mt-4 font-pixel text-xl leading-relaxed text-primary-ink sm:text-3xl">
          CLAIM YOUR 5 REWARD CODES
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Create your trainer wallet once and write down your five codes. They are generated a single
          time — keep them safe.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl border-4 border-primary-ink bg-card p-6 shadow-pixel sm:p-8">
        {wallet ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-primary-ink pb-4">
              <div className="min-w-0">
                <p className="font-pixel text-[10px] text-primary-ink">{wallet.player}</p>
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
              <span className="font-pixel text-[10px] text-primary-ink">TRAINER NAME</span>
              <Input
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
                maxLength={24}
                placeholder="Red"
                className="h-12 rounded-none border-2 border-primary-ink bg-background"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-pixel text-[10px] text-primary-ink">PASSWORD</span>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={64}
                placeholder="••••••"
                className="h-12 rounded-none border-2 border-primary-ink bg-background"
              />
            </label>
            {error && <p className="text-sm font-semibold text-primary">{error}</p>}
            <Button type="submit" variant="pixel" size="lg" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? "CREATING..." : "CREATE MY WALLET"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
