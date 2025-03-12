import { notFound } from "next/navigation";
import { getCourse } from "@/features/course/actions";

interface Course {
  id: string;
  name: string;
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const golfCourse = await getCourse(params.slug);
  if (!golfCourse) {
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
