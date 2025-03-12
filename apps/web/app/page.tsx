import React from "react";
import { Map } from "@/features/map/components/kakao-map";

export default async function Home() {
  return (
    <div className="w-full h-screen">
      <Map />
    </div>
  );
}
