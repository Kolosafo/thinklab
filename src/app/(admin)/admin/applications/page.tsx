"use client"
import dynamic from "next/dynamic";

const AdminApplications = dynamic(
  () => import("@/components/admin/Application"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <AdminApplications />;
}
