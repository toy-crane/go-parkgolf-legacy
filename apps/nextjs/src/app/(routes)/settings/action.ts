"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/libs/supabase/server";

export const deleteSelf = async () => {
  const supabase = await createSupabaseServerClient();
  await supabase.rpc("delete_user");
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
};
