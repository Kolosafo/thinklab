"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
const formatSegment = (segment: string) => {
  return segment
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);


  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => (
          <React.Fragment key={segment}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === segments.length - 1 ? (
                <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={`/${segments.slice(0, index + 1).join("/")}`}
                >
                  {formatSegment(segment)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}