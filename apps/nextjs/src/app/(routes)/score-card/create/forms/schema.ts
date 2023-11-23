import * as z from "zod";

export const gameSchema = z.object({
  startDate: z.date(),
  courseId: z.string({
    required_error: "파크 골프장을 선택해 주세요.",
  }),
});

export const participantSchema = z.object({
  participants: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
      { required_error: "게임 참여자를 입력해주세요." },
    )
    .min(1, { message: "게임 참여자 이름을 1명 이상 입력해주세요." })
    .max(4, { message: "게임 참여자는 최대 4명까지 입력 가능합니다." }),
});

const courseShema = z.object({
  games: z
    .array(
      z.object({
        name: z.string(),
        hole_count: z.coerce.number(),
      }),
    )
    .max(4, { message: "코스는 최대 4개까지 입력 가능합니다." })
    .nonempty({ message: "게임을 하나 이상 등록해 주세요." }),
});

export const formSchema = gameSchema
  .merge(participantSchema)
  .merge(courseShema);
