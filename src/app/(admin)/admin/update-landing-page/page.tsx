"use client"

import dynamic from "next/dynamic";

const LandingData = dynamic(() => import("./updateLanding"), {
  ssr: false,
});

export default function Page() {
  return <LandingData />;
}
