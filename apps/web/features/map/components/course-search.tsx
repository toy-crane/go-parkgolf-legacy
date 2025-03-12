"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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

  const options = courses.map((course) => ({
    title: `${course.name} (${
      course.lot_number_address_name.split(" ").splice(0, 2).join(" ") ?? ""
    })`,
    href: `/golf-courses/${course.slug}`,
  }));

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="주소 또는 이름을 입력해주세요." />
        <CommandList>
          <CommandEmpty>해당하는 검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup>
            {options.map(({ href, title }) => (
              <CommandItem
                key={href}
                value={title}
                onSelect={() => {
                  runCommand(() => router.push(href));
                }}
              >
                {title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
