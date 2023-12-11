import * as z from "zod";

export const formSchema = z.object({
  startedAt: z.coerce.date({
    required_error: "게임 날짜를 선택해 주세요.",
  }),
  golfCourseId: z.coerce.number({
    required_error: "골프장을 선택해 주세요.",
    invalid_type_error: "골프장을 선택해 주세요.",
  }),
});
