import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface Course {
  id: string;
  name: string;
}

interface Props {
  params: {
    id: string;
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const supabase = await createClient();

  const { data: golfCourse, error } = await supabase
    .from("golf_courses")
    .select("id, name")
    .eq("id", params.id)
    .single();

  if (error || !golfCourse) {
    notFound();
  }

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">{golfCourse.name}</h1>
      </main>
    </>
  );
}
