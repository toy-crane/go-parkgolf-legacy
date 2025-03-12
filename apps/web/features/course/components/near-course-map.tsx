"use client";

import { Map as KakaoMap } from "react-kakao-maps-sdk";
import { GolfCourse } from "../types";
import Marker from "@/features/map/components/marker";
import { useRouter } from "next/navigation";
const NearCourseMap = ({
  level = 4,
  height = "320px",
  golfCourses,
  currentCourse,
}: {
  level?: number;
  height?: string;
  golfCourses: GolfCourse[];
  currentCourse: GolfCourse;
}) => {
  const router = useRouter();
  const markers = golfCourses.map((course) => ({
    to: `/golf-courses/${course.slug}`,
    position: { lat: course.lat, lng: course.lng },
    text: course.name,
    selected: course.slug === currentCourse.slug,
  }));

  return (
    <KakaoMap
      center={{ lat: currentCourse.lat, lng: currentCourse.lng }}
      style={{ width: "100%", height: height }}
      level={level}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.to}
          {...marker}
          onClick={() => {
            router.replace(marker.to);
          }}
        />
      ))}
    </KakaoMap>
  );
};

export default NearCourseMap;
