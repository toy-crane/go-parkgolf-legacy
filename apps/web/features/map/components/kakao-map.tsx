import React from "react";
import { Map as KakaoMap } from "react-kakao-maps-sdk";

export function Map() {
  return (
    <KakaoMap
      center={{ lat: 37.566826, lng: 126.9786567 }}
      style={{ width: "100%", height: "100%" }}
      level={3}
    />
  );
}
