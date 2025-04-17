"use client";

import dynamic from "next/dynamic";

const Contact = dynamic(() => import("./contact"), {
  ssr: false,
});

export default function Page() {
  return <Contact />;
}
