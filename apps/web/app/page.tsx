import React from "react";
import { Map } from "@/features/map/components/kakao-map";
import { getCourses } from "@/features/course/actions";
import { Marker } from "@/types";
import { DEFAULT_POSITION } from "@/features/map/config";
import ZoomControl from "@/features/map/components/zoom-control";

import { parseAsFloat, createLoader, parseAsInteger } from "nuqs/server";
import type { SearchParams } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  lat: parseAsFloat.withDefault(DEFAULT_POSITION.center.lat),
  lng: parseAsFloat.withDefault(DEFAULT_POSITION.center.lng),
  level: parseAsInteger.withDefault(DEFAULT_POSITION.level),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const courses = await getCourses();
  const markers: Marker[] = courses.map((course) => ({
    position: { lat: course.lat, lng: course.lng },
    text: course.name,
    to: `/courses/${course.id}`,
    selected: false,
  }));

  const { lat, lng, level } = await loadSearchParams(searchParams);

  return (
    <div className="w-full h-screen">
      <div className="z-10 absolute right-4 top-4">
        <div className="flex flex-col gap-4">
          <ZoomControl currentLevel={level} />
        </div>
      </div>
      <Map
        markers={markers}
        position={{
          level,
          center: {
            lat,
            lng,
          },
        }}
      />
    </div>
  );
}
