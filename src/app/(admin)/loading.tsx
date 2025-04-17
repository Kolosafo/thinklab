import { Loader2 } from "lucide-react";
import React from "react";

function LoadingPage() {
  return (
    <div className="grid h-dvh place-content-center">
      <Loader2 className="size-5 animate-spin text-accent/200" />
    </div>
  );
}

export default LoadingPage;
