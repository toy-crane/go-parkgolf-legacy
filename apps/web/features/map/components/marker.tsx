"use client";
import { useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Marker as MarkerType } from "@/types";

const Marker = ({
  position,
  text,
  selected = false,
  onClick,
}: MarkerType & {
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const zIndex = selected || isHovered ? 20 : 10;
  return (
    <>
      <CustomOverlayMap position={position} zIndex={zIndex}>
        <div
          className={cn("group relative flex flex-col items-center")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button onClick={onClick}>{text}</Button>
        </div>
      </CustomOverlayMap>
    </>
  );
};

export default Marker;
