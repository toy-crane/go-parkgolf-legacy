import React from "react";
import { Map } from "@/features/map/components/kakao-map";
import { getCourses } from "@/features/course/actions";
import { Marker } from "@/types";
import ZoomControl from "@/features/map/components/zoom-control";

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
      <div className="z-10 absolute right-4 top-4">
        <div className="flex flex-col gap-4">
          <ZoomControl />
        </div>
      </div>
      <Map markers={markers} />
    </div>
  );
}
