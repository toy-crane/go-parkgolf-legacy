import React from "react";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col items-center gap-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Welcome to Your App</h1>
        <p className="text-xl">
          This is a clean starting point for your project.
        </p>
        <Button>Click me</Button>
      </main>
    </div>
  );
}
