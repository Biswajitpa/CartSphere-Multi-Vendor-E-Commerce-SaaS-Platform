"use client";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <SplashScreen onFinish={() => setReady(true)} />}

      {/* 
        Children are always mounted (good for SSR / data fetching),
        but hidden visually until splash finishes.
        opacity + pointer-events keeps layout stable while invisible.
      */}
      <div
        style={{
          opacity: ready ? 1 : 0,
          pointerEvents: ready ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
