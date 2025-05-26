"use client"

import dynamic from "next/dynamic";

const New = dynamic(() => import("./teamMembers"), {
  ssr: false,
});

export default function Page() {
  return <New />;
}
