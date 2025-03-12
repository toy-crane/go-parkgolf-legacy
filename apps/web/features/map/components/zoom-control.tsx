"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ZoomControlProps {
  currentLevel: number;
}

const ZoomControl = ({ currentLevel }: ZoomControlProps) => {
  const zoomIn = () => {
    if (currentLevel <= 1) return;
  };

  const zoomOut = () => {
    if (currentLevel >= 14) return;
  };

  return (
    <div className="flex flex-col">
      <Button
        onClick={zoomIn}
        variant="secondary"
        size="icon"
        className="rounded-b-none border border-b"
        disabled={currentLevel <= 1}
      >
        <PlusIcon />
      </Button>
      <Button
        onClick={zoomOut}
        variant="secondary"
        size="icon"
        className="rounded-t-none border"
        disabled={currentLevel >= 14}
      >
        <MinusIcon />
      </Button>
    </div>
  );
};

export default ZoomControl;
