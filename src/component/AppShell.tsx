"use client";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";

// ─── Wrap your root layout or page with this ───────────────────
// In app/layout.tsx or app/page.tsx, render <AppShell> as the root.

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <SplashScreen onFinish={() => setReady(true)} />}
      {children}
    </>
  );
}


