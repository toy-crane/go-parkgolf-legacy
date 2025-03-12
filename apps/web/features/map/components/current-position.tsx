"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LocateFixed } from "lucide-react";
import { useMapHandler } from "@/features/map/hooks";

const CurrentPositionButton = () => {
  const [loading, setLoading] = useState(false);
  const { handleMove } = useMapHandler();

  const handleGetCurrentPosition = async () => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      return;
    }

    setLoading(true);

    try {
      // First check if we have permissions
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        alert(
          "위치 접근 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요."
        );
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          handleMove({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
            level: 3,
          });
        },
        (error) => {
          setLoading(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("위치 접근 권한이 거부되었습니다.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("현재 위치를 확인할 수 없습니다.");
              break;
            case error.TIMEOUT:
              alert("위치 확인 요청이 시간 초과되었습니다.");
              break;
            default:
              alert("위치 정보를 가져오는데 실패했습니다.");
          }
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000, // Reduced to 10 seconds for more accurate position
          timeout: 30000, // Increased to 30 seconds to allow more time
        }
      );
    } catch (error) {
      setLoading(false);
      alert("위치 정보를 가져오는데 실패했습니다.");
    }
  };

  return (
    <Button variant="secondary" size="icon" onClick={handleGetCurrentPosition}>
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" size={24} />
      ) : (
        <LocateFixed size={24} />
      )}
    </Button>
  );
};

export default CurrentPositionButton;
