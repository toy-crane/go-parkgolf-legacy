import React from "react";
import { Map } from "@/features/map/components/kakao-map";
import { getCourses } from "@/features/course/actions";
import { Marker } from "@/types";
import ZoomControl from "@/features/map/components/zoom-control";
import CurrentPositionButton from "@/features/map/components/current-position";
import { CourseSearch } from "@/features/map/components/course-search";

export default async function Home() {
  const courses = await getCourses();
  const markers: Marker[] = courses.map((course) => ({
    position: { lat: course.lat, lng: course.lng },
    text: course.name,
    to: `/golf-courses/${course.id}`,
    selected: false,
  }));

  return (
    <div className="w-full h-screen">
      {/* Mobile layout - controls below search */}
      <div className="z-10 absolute left-0 right-0 top-0 px-4 pt-4 flex flex-col gap-4 md:hidden">
        <div className="w-full bg-white/80 rounded-lg p-1">
          <CourseSearch courses={courses} />
        </div>
        <div className="flex justify-end">
          <div className="flex flex-col gap-2">
            <CurrentPositionButton />
            <ZoomControl />
          </div>
        </div>
      </div>

      {/* Desktop layout - search left, controls right */}
      <div className="hidden md:block">
        <div className="z-10 absolute left-4 top-4">
          <div className="bg-white/80 rounded-lg p-1">
            <CourseSearch courses={courses} />
          </div>
        </div>
        <div className="z-10 absolute right-4 top-4">
          <div className="flex flex-col gap-2">
            <CurrentPositionButton />
            <ZoomControl />
          </div>
        </div>
      </div>

      <Map markers={markers} />
    </div>
  );
}
