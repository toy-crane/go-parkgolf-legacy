"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { GolfCourse } from "@/features/course/types";

interface CourseSearchProps {
  courses: GolfCourse[];
}

export function CourseSearch({ courses }: CourseSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between bg-white"
        >
          {value
            ? courses.find((course) => course.id === value)?.name
            : "골프장 검색..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="파크골프장 이름 또는 주소로 검색" />
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup>
            {courses.map((course) => (
              <CommandItem
                key={course.id}
                value={course.id}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setOpen(false);
                  router.push(`/courses/${course.id}`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === course.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {course.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
