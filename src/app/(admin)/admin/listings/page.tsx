"use client"

import dynamic from "next/dynamic";

const Listing = dynamic(() => import("./Listing"), {
  ssr: false,
});

export default function Page() {
  return <Listing />;
}
