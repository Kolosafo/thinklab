"use client";

import React from "react";

import TopAnalytics from "@/components/admin/TopAnalytics";
import AgentStatistics from "@/components/admin/AgentStatistics";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  // const { fetchProperties, isFetchingProperties } = useGetProperties();
  // const { properties } = useSelector((store: IRootState) => store.properties);
  const {
    isComms,
    isLegal,
    isMarketing,
    isMasterAdmin,
    isProjectManagement,
    isLogged,
  } = useSelector((store: IRootState) => store.user);

  const router = useRouter();
  // useEffect(() => {
  //   if (!isLogged) return;
  //   fetchProperties();
  // }, []);

  // useEffect(() => {
  //   if (!isLogged) {
  //     router.push("/auth/login");
  //   }
  // }, [isLogged, router]);
  const checkAccess =
    !isComms &&
    !isLegal &&
    !isMarketing &&
    !isMasterAdmin &&
    !isProjectManagement &&
    !isLogged;
  return checkAccess ? (
    <div className="h-[80vh] w-full items-center justify-center flex flex-col">
      <span className="text-xl">YOU DO NOT HAVE ACCESS TO THIS PAGE</span>
      <div>
        <Button
          type="button"
          className="w-full mt-4"
          onClick={() => router.push("/auth/login")}
        >
          Master Admin Login
        </Button>
        <Button
          type="button"
          className="w-full mt-4"
          onClick={() => router.push("/auth/marketing")}
        >
          Marketing Login
        </Button>
        <Button
          type="button"
          className="w-full mt-4"
          onClick={() => router.push("/auth/legal")}
        >
          Legals Login
        </Button>
        <Button
          type="button"
          className="w-full mt-4"
          onClick={() => router.push("/auth/project-management")}
        >
          Project Management Login
        </Button>
        <Button
          type="button"
          className="w-full mt-4"
          onClick={() => router.push("/auth/communications")}
        >
          Communications Login
        </Button>
      </div>

      {/* <Link href="/admin/marketing">Marketing Login</Link> */}
    </div>
  ) : (
    <div>
      <span className="text-3xl font-bold">
        <span className="text-red-600 font-bold">ThinkLab</span> Properties
        Admin
      </span>
      <TopAnalytics />
      <AgentStatistics />
    </div>
  );
}
