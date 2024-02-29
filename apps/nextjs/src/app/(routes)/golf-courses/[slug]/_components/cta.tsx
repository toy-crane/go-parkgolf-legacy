"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics/react";

const CTA = ({ courseId }: { courseId: string }) => {
  return (
    <Button className="min-w-[320px]" asChild>
      <Link
        href={`/score-card/create/golf-course?golfCourseId=${courseId}`}
        onClick={() => track("create game CTA clicked")}
      >
        파크골프 스코어 기록하기
      </Link>
    </Button>
  );
};

export default CTA;
