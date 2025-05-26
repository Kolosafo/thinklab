"use client"

import dynamic from "next/dynamic";

const Projects = dynamic(() => import("./ProjectsList"), {
  ssr: false,
});

export default function Page() {
  return <Projects />;
}
