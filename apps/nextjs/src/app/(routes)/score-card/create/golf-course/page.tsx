import React from "react";
import { notFound } from "next/navigation";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { createSupabaseServerClientReadOnly } from "@/libs/supabase/server";
import type { GolfCourse } from "@/types";

import CourseForm from "./form";

const Page = async ({
  searchParams: { golfCourseId },
}: {
  searchParams: {
    golfCourseId?: string;
  };
}) => {
  const supabase = await createSupabaseServerClientReadOnly();
  const query = supabase
    .from("golf_courses")
    .select(`*, lot_number_addresses(*)`)
    .returns<GolfCourse[]>();
  const result = await query;

  if (!result.data) {
    notFound();
  }

  return (
    <>
      <PageHeader className="relative pb-4 md:pb-8">
        <PageHeaderHeading>신규 게임 생성하기</PageHeaderHeading>
        <PageHeaderDescription>
          골프장과 게임 시작 날짜를 입력해 주세요
        </PageHeaderDescription>
      </PageHeader>
      <CourseForm courses={result.data} golfCourseId={golfCourseId} />
    </>
  );
};

export default Page;
