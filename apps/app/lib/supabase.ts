import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "database";

// These environment variables need to be defined in your app.config.ts
if (
  !process.env.EXPO_PUBLIC_SUPABASE_URL ||
  !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
