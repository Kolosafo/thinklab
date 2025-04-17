"use client";

import dynamic from "next/dynamic";

const Search = dynamic(() => import("./search"), {
  ssr: false,
});

export default function Page() {
  return <Search />;
}
