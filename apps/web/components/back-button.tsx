"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant="ghost" size="icon" onClick={() => router.back()}>
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
