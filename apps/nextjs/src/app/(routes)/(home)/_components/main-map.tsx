"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Marker from "@/app/(routes)/(home)/_components/marker";
import type { GolfCourse, Position } from "@/types";
import { Map } from "react-kakao-maps-sdk";

interface Props {
  courses: GolfCourse[];
  selectedCourse?: GolfCourse;
  position: Position;
}

const MainMap = ({ courses, selectedCourse, position }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePosition = (map: kakao.maps.Map) => {
    const lng = map.getCenter().getLng();
    const lat = map.getCenter().getLat();
    const params = new URLSearchParams(searchParams.toString());
    params.set("lng", String(lng));
    params.set("lat", String(lat));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleZoom = (map: kakao.maps.Map) => {
    const level = map.getLevel();
    const params = new URLSearchParams(searchParams.toString());
    params.set("level", String(level));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Map
      center={position.center}
      isPanto={true}
      level={position.level}
      style={{ width: "100%", height: "100vh" }}
      onDragEnd={handlePosition}
      onZoomChanged={handleZoom}
    >
      {courses?.map((course) => (
        <Marker
          course={course}
          key={course.name}
          isMarked={selectedCourse?.name === course.name}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            const selectedCourseLat = course.lat;
            const selectedCourseLng = course.lng;
            params.set("lng", String(selectedCourseLng));
            params.set("lat", String(selectedCourseLat));
            router.push(`/golf-courses/${course.slug}`);
          }}
        />
      ))}
    </Map>
  );
};

export default MainMap;
