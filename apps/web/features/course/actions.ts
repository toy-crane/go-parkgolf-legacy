"use server";
import { createClient } from "@/lib/supabase/server";

export async function getCourses() {
  const supabase = await createClient();
  const { data: golfCourses, error } = await supabase
    .from("golf_courses")
    .select("*")
    .eq("publish_status", "completed");
  if (error) {
    throw new Error(`Failed to fetch golf courses: ${error.message}`);
  }
  return golfCourses;
}
