"use client";
import DashboardPage from "@/components/PropertList";
import { IRootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { authAgent } = useSelector((store: IRootState) => store.agent);

  return authAgent ? (
    !authAgent.isReviewed ? (
      <div className="h-[70vh] w-full flex flex-col items-center justify-center">
        <h1 className="mb-8 text-3xl font-semibold text-red-500">
          APPLICATION IN REVIEW
        </h1>
        <h1 className="text-xl font-semibold">
          Please keep checking your email for feedback
        </h1>
      </div>
    ) : (
      <DashboardPage />
    )
  ) : (
    <div className="h-[70vh] w-full flex flex-col items-center justify-center">
      <h1 className="mb-8 text-3xl font-semibold">PROFILE NOT FOUND</h1>
    </div>
  );
}
