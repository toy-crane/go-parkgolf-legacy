import React from "react";
import { Map } from "@/features/map/components/kakao-map";
import { getCourses } from "@/features/course/actions";
import { Marker } from "@/types";
export default async function Home() {
  const courses = await getCourses();
  const markers: Marker[] = courses.map((course) => ({
    position: { lat: course.lat, lng: course.lng },
    text: course.name,
    to: `/courses/${course.id}`,
    selected: false,
  }));

  return (
    <div className="w-full h-screen">
      <Map markers={markers} />
    </div>
  );
}
