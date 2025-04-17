"use client";
import { useGetApplications } from "@/hooks/useGetApplications";
import { IRootState } from "@/redux/store";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import construction from "../../../public/animation/construction.json";
import { useSelector } from "react-redux";
import UserCard from "@/components/agents/UserCard";
import { KYCFormData } from "@/types";
import LoadingPage from "@/app/(admin)/loading";

const NoItem = () => (
  <div className="h-[70vh] flex items-center justify-center">
    <div className="h-60 self-center  w-full md:my-10 my-0 items-center justify-end flex flex-col">
      <Lottie
        animationData={construction}
        loop={true}
        className="w-full h-full"
      />
      <span className="text-2xl font-semibold mt-6">No new Applications</span>
    </div>
  </div>
);
const Application = () => {
  const { isFetchingApplications, fetchApplications } = useGetApplications();
  const { agents } = useSelector((store: IRootState) => store.properties);
  const { isLogged } = useSelector((store: IRootState) => store.user);

  const [filterAgents, setFilterAgents] = useState<KYCFormData[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isLogged) return;
      fetchApplications();
    }
  }, [isLogged]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isLogged) {
        router.push("/auth/login");
      }
    }
  }, [isLogged, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const filterAgents = agents.filter((item) => !item.isReviewed);
      setFilterAgents(filterAgents);
    }
  }, [agents]);
  return (
    <div>
      <span className="text-3xl font-semibold">Applications</span>
      {isFetchingApplications ? (
        <LoadingPage />
      ) : (
        <div className="w-full items-center justify-center my-8 flex-col space-x-10 flex">
          {filterAgents.length > 0 ? (
            filterAgents.map((agent, idx) => <UserCard key={idx} {...agent} />)
          ) : (
            <NoItem />
          )}
        </div>
      )}
    </div>
  );
};

export default Application;
