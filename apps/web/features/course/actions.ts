"use server";
import { createClient } from "@/lib/supabase/server";
import { GolfCourse } from "./types";

export async function getCourses(): Promise<GolfCourse[]> {
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

export async function getCourse(slug: string): Promise<GolfCourse> {
  const supabase = await createClient();
  const { data: golfCourse, error } = await supabase
    .from("golf_courses")
    .select("*")
    .eq("slug", decodeURIComponent(slug))
    .single();

  if (error || !golfCourse) {
    throw new Error(`Failed to fetch golf course: ${error?.message}`);
  }
  return golfCourse;
}
