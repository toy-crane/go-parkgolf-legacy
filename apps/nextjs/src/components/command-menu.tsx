"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/libs/tailwind";

interface Props {
  options: { title: string; href: string }[];
}

export function CommandMenu({ options }: Props) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "text-muted-foreground relative w-full justify-start bg-white text-sm sm:pr-12 md:w-40 lg:w-64",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">주소 또는 이름으로 검색</span>
        <span className="inline-flex lg:hidden">골프장 검색</span>
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
