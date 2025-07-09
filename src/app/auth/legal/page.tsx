"use client";

import dynamic from "next/dynamic";

const LegalLogin = dynamic(() => import("./legalLogin"), {
  ssr: false,
});

export default function Page() {
  return <LegalLogin />;
}
