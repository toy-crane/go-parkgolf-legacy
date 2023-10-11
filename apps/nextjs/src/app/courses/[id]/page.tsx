import { promises as fs } from "fs";
import path from "path";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { fetchCourse } from "@/libs/fetch";
import type { Course } from "@/types";

import CourseDetail from "./card";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const jsonDirectory = path.join(process.cwd(), "resource");
  const fileContents = await fs.readFile(
    jsonDirectory + "/courses.json",
    "utf-8",
  );
  const courses = JSON.parse(fileContents) as Course[];
  return courses.map((course) => ({
    id: String(course.id),
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const course = await fetchCourse(params.id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  if (course) {
    return {
      title: course.name,
      description: course.address.address_name,
      openGraph: {
        title: course.name,
        description: course.address.address_name,
        images: [...previousImages],
      },
      twitter: {
        title: course.name,
        description: course.address.address_name,
        images: [...previousImages],
      },
    };
  } else {
    return {};
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const course = await fetchCourse(params.id);
  if (course) {
    return <CourseDetail course={course} />;
  }
  notFound();
}
