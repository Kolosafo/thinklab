"use client"

import dynamic from "next/dynamic";

const New = dynamic(() => import("./newProject"), {
  ssr: false,
});

export default function Page() {
  return <New />;
}
