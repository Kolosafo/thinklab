"use client"

import dynamic from "next/dynamic";

const AboutForm = dynamic(() => import("./aboutForm"), {
  ssr: false,
});

export default function Page() {
  return <AboutForm />;
}
