"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GolfCourse } from "@/features/course/types";
import { CourseSearchDialog } from "@/features/course/components/course-search-dialog";

interface CourseSearchProps {
  courses: GolfCourse[];
}

export function CourseSearch({ courses }: CourseSearchProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className="w-full md:w-[320px] justify-start text-muted-foreground hover:bg-accent/20 hover:text-muted-foreground"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Search className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline-flex">
          파크골프장 이름 또는 주소로 검색
        </span>
        <span className="inline-flex lg:hidden">파크골프장 또는 주소 입력</span>
      </Button>
      <CourseSearchDialog
        courses={courses}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
