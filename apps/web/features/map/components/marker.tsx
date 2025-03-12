import { useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { cn } from "@/lib/utils";
import { Marker as MarkerType } from "@/types";
import { Icons } from "@/components/icons";

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
          <button
            className="rounded-full p-0 hover:bg-transparent hover:scale-110"
            onClick={onClick}
          >
            <Icons.pin
              className={cn(
                "h-10 w-10",
                selected ? "fill-[#22DC48]" : "fill-[#16a34a]"
              )}
            />
            <span
              className={cn(
                "block select-none p-1 bg-muted",
                "absolute left-[50%] top-[50%] mt-5 translate-x-[-50%]",
                "group-hover:font-bold",
                selected && "block font-bold text-lg"
              )}
            >
              {text}
            </span>
          </button>
        </div>
      </CustomOverlayMap>
    </>
  );
};

export default Marker;
