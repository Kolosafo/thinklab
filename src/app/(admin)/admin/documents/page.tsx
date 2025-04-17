"use client"

import dynamic from "next/dynamic";

const Document = dynamic(() => import("./component"), {
  ssr: false,
});

export default function Page() {
  return <Document />;
}
