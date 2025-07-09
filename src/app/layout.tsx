import type { Metadata } from "next";
import "@/styles/globals.css";
import BaseWrapper from "@/components/BaseWrapper";

export const metadata: Metadata = {
  title: "Thinklab Properties",
  description: "Thinklab Properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseWrapper>
      {children}
      <div id="portal"></div>
    </BaseWrapper>
  );
}
