"use client";

import dynamic from "next/dynamic";

const Marketing = dynamic(() => import("./marketing"), {
  ssr: false,
});

export default function Page() {
  return <Marketing />;
}
