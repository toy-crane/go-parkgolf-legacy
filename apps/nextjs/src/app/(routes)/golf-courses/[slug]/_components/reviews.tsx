"use client";

import { useParams, useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { Pencil } from "lucide-react";

import type { Review } from "../types";
import EmptyReview from "./empty-review";
import ReviewCard from "./review-card";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      {reviews.length === 0 ? (
        <EmptyReview />
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icons.starFilled className="mr-[2px] h-8 w-8" />
              <span className="mr-2 font-semibold">
                {reviews[0]?.course_condition_rating.toFixed(1)}
              </span>
              <span>리뷰 {reviews.length}</span>
            </div>
            <button
              className="flex items-center gap-1 text-sm font-semibold"
              onClick={() =>
                router.push(
                  `/golf-courses/${params.slug as string}/reviews/create`,
                )
              }
            >
              <span>리뷰 작성하기</span>
              <Pencil className="h-3 w-3" />
            </button>
          </div>
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
