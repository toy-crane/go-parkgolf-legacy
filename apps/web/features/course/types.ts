import { Database } from "../../../database/supabase/functions/_shared/database";

export type GolfCourse = Database["public"]["Tables"]["golf_courses"]["Row"];
