"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const ZoomControl = () => {
  const zoomIn = () => {
    console.log("zoomIn");
  };
  const zoomOut = () => {
    console.log("zoomOut");
  };

  return (
    <div className="flex flex-col">
      <Button
        onClick={() => zoomIn()}
        variant="secondary"
        size="icon"
        className="rounded-b-none border border-b"
      >
        <PlusIcon />
      </Button>
      <Button
        onClick={() => zoomOut()}
        variant="secondary"
        size="icon"
        className="rounded-t-none border"
      >
        <MinusIcon />
      </Button>
    </div>
  );
};

export default ZoomControl;
