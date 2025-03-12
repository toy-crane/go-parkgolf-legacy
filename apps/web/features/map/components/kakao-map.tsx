"use client";

import React from "react";
import { Map as KakaoMap, MarkerClusterer } from "react-kakao-maps-sdk";
import Marker from "./marker";
import { Marker as MarkerType } from "@/types";
import { useRouter } from "next/navigation";

export function Map({ markers }: { markers: MarkerType[] }) {
  const router = useRouter();
  return (
    <KakaoMap
      center={{ lat: 37.566826, lng: 126.9786567 }}
      style={{ width: "100%", height: "100%" }}
      level={3}
    >
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={10} // 클러스터 할 최소 지도 레벨
        calculator={[10, 30]} // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
        styles={[
          {
            // calculator 각 사이 값 마다 적용될 스타일을 지정한다
            width: "40px",
            height: "40px",
            background: "#1bc8df",
            borderRadius: "20px",
            color: "#000",
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: "41px",
          },
          {
            width: "50px",
            height: "50px",
            background: "#e6789c",
            borderRadius: "25px",
            color: "#000",
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: "51px",
          },
        ]}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.to}
            {...marker}
            onClick={() => router.push(marker.to)}
          />
        ))}
      </MarkerClusterer>
    </KakaoMap>
  );
}
