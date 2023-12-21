"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useAmplitude } from "@/libs/amplitude";
import { generateFormUrl } from "@/libs/google-form";
import { cn } from "@/libs/tailwind";
import type { Course } from "@/types";
import type { Tables } from "@/types/generated";
import {
  AlarmClock,
  Clock,
  FlagTriangleRight,
  Pencil,
  Phone,
  Share2,
} from "lucide-react";

interface CourseSheetProps {
  selectedCourse?: Course;
  reviews: Tables<"golf_course_reviews">[];
  open: boolean;
}

const InfoNeeded = ({ href }: { href: string }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">정보를 알려주세요.</div>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Pencil size={16} />
      </a>
    </div>
  );
};

const CourseSheet = ({ selectedCourse, open, reviews }: CourseSheetProps) => {
  const router = useRouter();
  const { track } = useAmplitude();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const address = selectedCourse?.address[0];
  const operation = selectedCourse?.operation[0];

  // TODO: 리뷰의 갯수가 많아지면 개선
  const totalAverage =
    reviews.reduce((acc, review) => {
      return (
        acc +
        (review.course_condition_rating +
          review.course_difficulty_rating +
          review.facilities_rating) /
          3
      );
    }, 0) / reviews.length;

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        const params = new URLSearchParams(searchParams);
        params.set("modal", String(open));
        router.replace(`?${params.toString()}`);
      }}
    >
      <SheetContent side={"bottom"} className="h-auto">
        <SheetHeader className="mb-2">
          <SheetTitle>
            <div className="flex items-center gap-1 text-2xl">
              <Link
                href={`/golf-courses/${selectedCourse?.slug}`}
                onClick={() => track("detail page link clicked")}
                prefetch
              >
                {selectedCourse?.name}
              </Link>
              <div className="flex items-center">
                <Button
                  variant={"ghost"}
                  className="h-7 w-7"
                  size="icon"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `${window.location.href}`,
                    );
                    toast({
                      className: cn(
                        "top-0 right-0 flex fixed md:max-w-[256px] md:top-4 md:right-4",
                      ),
                      title: "주소가 복사되었습니다",
                      description: "원하는 곳에 붙여넣기(Ctrl+V)해주세요.",
                      duration: 1000,
                    });
                    track("sheet share button clicked");
                  }}
                >
                  <Share2 size={20} />
                </Button>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription className="flex flex-col">
            <span className="text-lg">{address?.address_name}</span>
            {reviews.length > 0 ? (
              <button
                className="flex cursor-pointer items-center"
                onClick={() =>
                  router.push(
                    `/golf-courses/${selectedCourse?.slug}?tab=review`,
                    { prefetch: true },
                  )
                }
              >
                <Icons.starFilled className="mr-[2px] h-4 w-4" />
                <span className="mr-2">{totalAverage}</span>
                <span>리뷰 {reviews.length}</span>
              </button>
            ) : (
              <button
                className="text-secondary-foreground flex items-center gap-1 font-semibold"
                onClick={() =>
                  router.push(
                    `/golf-courses/${selectedCourse?.slug}/reviews/create`,
                    { prefetch: true },
                  )
                }
              >
                <span>리뷰 작성하기</span>
                <Pencil className="h-3 w-3" />
              </button>
            )}
          </SheetDescription>
        </SheetHeader>
        <Separator className="mb-4 mt-4" />
        <div className="grid w-full items-center">
          <div className="flex items-center gap-4">
            <FlagTriangleRight size={20} />
            <div className="text-base">{selectedCourse?.hole_count}홀</div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center gap-4">
            <Phone size={20} />
            <div className="text-base">
              {selectedCourse?.contact[0]?.phone_number ? (
                <Button
                  variant="link"
                  size="sm"
                  asChild
                  className="p-0 text-base text-blue-400"
                  onClick={() => {
                    track("phone number clicked", { ...selectedCourse });
                  }}
                >
                  <a href={`tel:${selectedCourse?.contact[0]?.phone_number}`}>
                    {selectedCourse?.contact[0]?.phone_number}
                  </a>
                </Button>
              ) : (
                InfoNeeded({ href: generateFormUrl(selectedCourse?.name) })
              )}
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center gap-4">
            <Clock size={20} />
            <div className="text-base">
              <div className="flex">
                <div className="mr-2 flex-shrink-0">영업 시간 -</div>
                {selectedCourse?.operation[0]?.opening_hours ??
                  InfoNeeded({ href: generateFormUrl(selectedCourse?.name) })}
              </div>
              {selectedCourse?.operation[0]?.regular_closed_days && (
                <div className="flex">
                  <div className="mr-2 flex-shrink-0">정기 휴무일 - </div>
                  {selectedCourse?.operation[0]?.regular_closed_days}
                </div>
              )}
            </div>
          </div>
          <Separator className="my-2" />
          <div className="mb-3 flex items-center gap-4">
            <AlarmClock size={20} />
            <div className="text-base">
              <div className="flex">
                <div className="mr-2 flex-shrink-0">예약 방법 - </div>
                {operation?.registration_method ??
                  InfoNeeded({ href: generateFormUrl(selectedCourse?.name) })}
              </div>
              <div>
                {operation?.website ? (
                  <Button
                    variant="link"
                    size="sm"
                    asChild
                    className="p-0 text-base text-blue-400"
                    onClick={() => track("website detail clicked")}
                  >
                    <a
                      href={operation?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      상세 정보 홈페이지
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CourseSheet;
