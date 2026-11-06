import { useEffect, useState } from "react";

export const WALLET_STORAGE_KEY = "idlemon-revo-wallet";
export const WALLET_EVENT = "idlemon-wallet-change";

export type Wallet = {
  player: string;
  email: string;
  rank: string;
  wallet_id: string;
  codes: string[];
  created_at: string;
};

export function readWallet(): Wallet | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(WALLET_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Wallet;
  } catch {
    localStorage.removeItem(WALLET_STORAGE_KEY);
    return null;
  }
}

export function saveWallet(wallet: Wallet) {
  localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(wallet));
  window.dispatchEvent(new Event(WALLET_EVENT));
}

export function useWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    const sync = () => setWallet(readWallet());
    sync();
    window.addEventListener(WALLET_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WALLET_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return wallet;
}

export { PRE_REGISTRATION_OPENS_AT as LAUNCH_AT } from "./preregistration";
