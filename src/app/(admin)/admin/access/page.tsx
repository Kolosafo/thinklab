"use client"

import dynamic from "next/dynamic";

const AccessForm = dynamic(() => import("./Access"), {
  ssr: false,
});

export default function Page() {
  return <AccessForm />;
}
