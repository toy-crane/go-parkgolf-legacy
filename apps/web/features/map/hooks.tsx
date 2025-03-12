import { parseAsFloat, parseAsInteger, useQueryState } from "nuqs";
import { DEFAULT_POSITION } from "./config";

export function useMapHandler() {
  const [lat, setLat] = useQueryState(
    "lat",
    parseAsFloat.withDefault(DEFAULT_POSITION.center.lat).withOptions({
      shallow: false,
    })
  );
  const [lng, setLng] = useQueryState(
    "lng",
    parseAsFloat.withDefault(DEFAULT_POSITION.center.lng).withOptions({
      shallow: false,
    })
  );
  const [level, setLevel] = useQueryState(
    "level",
    parseAsInteger.withDefault(DEFAULT_POSITION.level).withOptions({
      shallow: false,
    })
  );

  const handleMove = ({
    lng,
    lat,
    level,
  }: {
    lng: number;
    lat: number;
    level: number;
  }) => {
    setLng(lng);
    setLat(lat);
    setLevel(level);
  };

  const zoomIn = () => {
    if (level <= 1) return;
    setLevel(level - 1);
  };

  const zoomOut = () => {
    if (level >= 14) return;
    setLevel(level + 1);
  };

  return {
    lat,
    lng,
    level,
    handleMove,
    zoomIn,
    zoomOut,
  };
}
