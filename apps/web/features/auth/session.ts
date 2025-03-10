"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function readSession() {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
