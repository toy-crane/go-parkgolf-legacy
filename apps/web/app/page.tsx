"use client";

import React from "react";
import { Map } from "react-kakao-maps-sdk";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      />
    </div>
  );
}
