"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMapHandler } from "../hooks";

const ZoomControl = () => {
  const { zoomIn, zoomOut, level } = useMapHandler();
  return (
    <div className="flex flex-col">
      <Button
        onClick={zoomIn}
        variant="secondary"
        size="icon"
        className="rounded-b-none border border-b"
        disabled={level <= 1}
      >
        <PlusIcon />
      </Button>
      <Button
        onClick={zoomOut}
        variant="secondary"
        size="icon"
        className="rounded-t-none border"
        disabled={level >= 14}
      >
        <MinusIcon />
      </Button>
    </div>
  );
};

export default ZoomControl;
