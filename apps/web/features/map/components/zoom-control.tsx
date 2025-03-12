"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import { DEFAULT_POSITION } from "../config";

const ZoomControl = () => {
  const [level, setLevel] = useQueryState(
    "level",
    parseAsInteger.withDefault(DEFAULT_POSITION.level).withOptions({
      shallow: false,
    })
  );

  const zoomIn = () => {
    if (level <= 1) return;
    setLevel(level - 1);
  };

  const zoomOut = () => {
    if (level >= 14) return;
    setLevel(level + 1);
  };

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
