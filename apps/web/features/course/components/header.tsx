import BackButton from "@/components/back-button";
import SearchCourseButton from "@/features/course/components/search-course-button";

interface CourseDetailHeaderProps {
  id: string;
}

export function CourseDetailHeader({ id }: CourseDetailHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto relative flex h-14 items-center px-4 justify-between">
        <BackButton />
        <SearchCourseButton />
      </div>
    </header>
  );
}
