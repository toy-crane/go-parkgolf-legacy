import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { GolfCourse } from "@/features/course/types";

interface CourseSearchDialogProps {
  courses: GolfCourse[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseSearchDialog({
  courses,
  open,
  onOpenChange,
}: CourseSearchDialogProps) {
  const router = useRouter();

  const options = courses.map((course) => ({
    title: `${course.name} (${
      course.lot_number_address_name.split(" ").splice(0, 2).join(" ") ?? ""
    })`,
    href: `/golf-courses/${course.slug}`,
  }));

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
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
  );
}
