import { CourseHeader } from "@/features/course/components/header";

export default function GolfCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <CourseHeader />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
