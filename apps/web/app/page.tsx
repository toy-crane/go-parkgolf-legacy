import React from "react";
import { Map } from "@/features/map/components/kakao-map";
import { getCourses } from "@/features/course/actions";
import { Marker } from "@/types";
import { DEFAULT_POSITION } from "@/features/map/config";
export default async function Home() {
  const courses = await getCourses();
  const markers: Marker[] = courses.map((course) => ({
    position: { lat: course.lat, lng: course.lng },
    text: course.name,
    to: `/courses/${course.id}`,
    selected: false,
  }));

  const position = {
    level: DEFAULT_POSITION.level,
    center: {
      lat: DEFAULT_POSITION.center.lat,
      lng: DEFAULT_POSITION.center.lng,
    },
  };

  return (
    <div className="w-full h-screen">
      <Map markers={markers} position={position} />
    </div>
  );
}
