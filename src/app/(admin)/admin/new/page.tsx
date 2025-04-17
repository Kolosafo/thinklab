import dynamic from "next/dynamic";

const New = dynamic(() => import("./new"), {
  ssr: false,
});

export default function Page() {
  return <New />;
}
