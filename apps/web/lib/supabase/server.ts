import { Database } from "database";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// These environment variables are required for the Supabase client to work
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// For server components
export const createServerClient = () => {
  "use server";

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        cookie: cookies().toString(),
      },
    },
  });
};
