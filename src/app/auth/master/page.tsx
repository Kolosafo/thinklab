"use client";

import dynamic from "next/dynamic";

const MasterLogin = dynamic(() => import("./masterLogin"), {
  ssr: false,
});

export default function Page() {
  return <MasterLogin />;
}
