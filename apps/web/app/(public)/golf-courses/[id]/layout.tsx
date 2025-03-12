import { CourseHeader } from "@/features/course/components/header";

export default function GolfCourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return (
    <div className="flex flex-col h-screen">
      <CourseHeader />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
