"use client";

import React, { } from "react";

import TopAnalytics from "@/components/admin/TopAnalytics";
import AgentStatistics from "@/components/admin/AgentStatistics";

export default function DashboardPage() {
  // const { fetchProperties, isFetchingProperties } = useGetProperties();
  // const { properties } = useSelector((store: IRootState) => store.properties);
  // const { isLogged } = useSelector((store: IRootState) => store.user);

  // const router = useRouter();
  // useEffect(() => {
  //   if (!isLogged) return;
  //   fetchProperties();
  // }, []);

  // useEffect(() => {
  //   if (!isLogged) {
  //     router.push("/auth/login");
  //   }
  // }, [isLogged, router]);
  return (
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
