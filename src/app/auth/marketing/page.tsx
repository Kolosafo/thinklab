"use client";

import dynamic from "next/dynamic";

const MarketingLogin = dynamic(() => import("./marketingLogin"), {
  ssr: false,
});

export default function Page() {
  return <MarketingLogin />;
}
