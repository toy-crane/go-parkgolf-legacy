"use client";

import { CourseSearchDialog } from "@/features/course/components/course-search-dialog";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { GolfCourse } from "@/features/course/types";
import { getCourses } from "@/features/course/actions";
import { Button } from "@/components/ui/button";

export function SearchCourseButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState<GolfCourse[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCourses();
      setCourses(courses);
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="icon" variant="ghost">
        <Search className="h-5 w-5" />
      </Button>
      <CourseSearchDialog
        courses={courses}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}

export default SearchCourseButton;
