"use client";

import dynamic from "next/dynamic";

const CommunicationsLogin = dynamic(() => import("./projManagementLogin"), {
  ssr: false,
});

export default function Page() {
  return <CommunicationsLogin />;
}
