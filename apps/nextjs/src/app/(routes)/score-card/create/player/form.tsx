"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { generateStorage } from "@toss/storage";
import { Loader2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import type * as z from "zod";

import BottomCTA from "../_components/bottom-cta";
import RecentBadge from "../_components/recent-badge";
import { createGamePlayer } from "./actions";
import { formSchema } from "./schema";

type Inputs = z.infer<typeof formSchema>;

interface FormProps {
  gameId: string;
}

const safeLocalStorage = generateStorage();

const PlayerForm = ({ gameId }: FormProps) => {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<Inputs>({
    shouldUnregister: false,
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      players: [],
    },
  });

  const [recentPlayers, setRecentPlayers] = React.useState<string[]>([]);

  React.useEffect(() => {
    setRecentPlayers(safeLocalStorage.get("recent_players")?.split(",") ?? []);
  }, []);

  const error =
    form.formState.errors.players?.root ?? form.formState.errors.players;

  const { fields, append, remove } = useFieldArray({
    name: "players",
    control: form.control,
  });
  const lastIndex = fields.length - 1;

  const isValid = form.formState.isValid;

  // 키 다운 이벤트를 처리하는 함수
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault();
      (event.currentTarget as HTMLInputElement).blur();
    }
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await createGamePlayer(gameId, values);
      if (result.success) {
        const params = new URLSearchParams();
        params.set("gameId", gameId);
        router.replace(`/score-card/create/game-course?${params.toString()}`);
      }
      safeLocalStorage.set(
        "recent_players",
        values.players.map((p) => p.nickname).join(","),
      );
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-12 pb-20"
      >
        <div className="flex flex-col">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={fields.length >= 4}
            className="justify-start pl-0 hover:bg-white"
            onClick={() => setOpen((prev) => !prev)}
          >
            <PlusCircledIcon className="mr-1 h-4 w-4" />
            새로운 선수 추가하기
          </Button>
          <Separator className="mb-4 mt-1" />
          <div className="mb-4 flex flex-col space-y-1">
            <FormLabel className="flex-1">선수 이름</FormLabel>
            <FormDescription>최대 4명까지 입력 가능합니다</FormDescription>
          </div>
          {fields.length !== 0 && (
            <div className="mb-3 space-y-2">
              {fields.map((_, index) => {
                return (
                  <div key={index}>
                    <div className="flex gap-x-3">
                      <FormField
                        control={form.control}
                        key={index}
                        name={`players.${index}.nickname`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} onKeyDown={handleKeyDown} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => remove(index)}
                        type="button"
                        variant="ghost"
                        tabIndex={-1}
                      >
                        <MinusCircledIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {recentPlayers.length !== 0 && (
            <div className="mb-2">
              <div className="text-muted-foreground mb-0.5 text-xs">
                최근 함께한 선수
              </div>
              <div className="flex flex-wrap gap-2">
                {recentPlayers.map((name) => (
                  <RecentBadge
                    key={name}
                    onClick={() => {
                      append(
                        {
                          nickname: name,
                        },
                        {
                          shouldFocus: false,
                        },
                      );
                      setRecentPlayers((prev) =>
                        prev.filter((p) => p !== name),
                      );
                    }}
                  >
                    {name} <PlusCircledIcon className="ml-1 h-3 w-3" />
                  </RecentBadge>
                ))}
              </div>
            </div>
          )}

          <FormMessage className="mt-1">{error?.message}</FormMessage>
        </div>
        <BottomCTA
          label="다음 단계로"
          disabled={isPending || !isValid}
          loading={isPending}
        />
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-full max-h-[90%]">
            <DrawerHeader className="content-grid grid">
              <DrawerTitle>새로운 플레이어 등록</DrawerTitle>
              <DrawerDescription>
                게임을 같이 할 플레이어를 추가해 보세요.
              </DrawerDescription>
            </DrawerHeader>
            <div className="content-grid mb-4">
              <div className="content">
                <Input />
              </div>
            </div>
            <DrawerFooter className="content-grid grid gap-0 p-0 py-2">
              <div className="content flex gap-2">
                <Button className="w-full">선수 추가</Button>
                <DrawerClose>
                  <Button variant="outline" className="w-full">
                    취소
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </form>
    </Form>
  );
};

export default PlayerForm;
