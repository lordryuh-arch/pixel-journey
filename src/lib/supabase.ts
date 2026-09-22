import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mkfbpsexwtwhdkzbiqzv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_EovFCag8i-g2QPg5r8D5xg_5GvNzCrr";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
