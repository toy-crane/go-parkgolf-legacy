"use client";

import React from "react";
import { Map as KakaoMap, MarkerClusterer } from "react-kakao-maps-sdk";
import Marker from "./marker";
import { Marker as MarkerType } from "@/types";
import { useRouter } from "next/navigation";
import { useMapHandler } from "@/features/map/hooks";

export function Map({ markers }: { markers: MarkerType[] }) {
  const router = useRouter();
  const { handleMove, lat, lng, level } = useMapHandler();

  return (
    <KakaoMap
      center={{ lat, lng }}
      style={{ width: "100%", height: "100%" }}
      level={level}
      onDragEnd={(map) => handleMove(map)}
      onZoomChanged={(map) => handleMove(map)}
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
            background: "rgba(27, 200, 223, 0.9)", // #1bc8df with 0.8 opacity
            borderRadius: "20px",
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: "41px",
          },
          {
            width: "50px",
            height: "50px",
            background: "rgba(230, 120, 156, 0.9)", // #e6789c with 0.8 opacity
            borderRadius: "25px",
            color: "#fff",
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
