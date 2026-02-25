"use client";

import dynamic from "next/dynamic";

// Dynamically import HolyLoader with no SSR to prevent hydration errors
const HolyLoader = dynamic(() => import("holy-loader"), {
  ssr: false,
});

export default function ClientLoader() {
  return <HolyLoader color="#CF4647" />;
}