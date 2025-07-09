"use client";
import PropertyDashboardCard from "@/components/property/PropertyDashboardCard";
import { IRootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import construction from "../../public/animation/construction.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import LoadingPage from "@/app/(dashboard)/loading";
import { useGetProperties } from "@/hooks/useGetProperties";
import { useCheckAccess } from "@/hooks/useCheckAccess";

export default function DashboardPage() {
  const { isMarketing, isMasterAdmin } = useCheckAccess();
  const { fetchProperties, isFetchingProperties } = useGetProperties();
  const { properties } = useSelector((store: IRootState) => store.properties);
  const { isLogged } = useSelector((store: IRootState) => store.user);
  const { authAgent } = useSelector((store: IRootState) => store.agent);

  const router = useRouter();
  useEffect(() => {
    if (!isLogged) return;
    fetchProperties();
  }, []);

  useEffect(() => {
    if (!isLogged) {
      router.push("/auth/login");
    }
  }, [isLogged, router]);
  return !isMarketing && !isMasterAdmin ? (
    <span className="text-xl mt-20">YOU DO NOT HAVE ACCESS TO THIS PAGE</span>
  ) : (
    <div>
      <span className="text-3xl font-semibold">Dashboard</span>
      {isFetchingProperties ? (
        <LoadingPage />
      ) : !authAgent?.isVerified ? (
        <div className="h-[70vh] w-full flex flex-col items-center justify-center">
          <h1 className="mb-8 text-3xl font-semibold text-red-500">
            SORRY YOUR APPLICATION WAS REJECTED!
          </h1>
          <h1 className="text-xl font-semibold">You can apply again.</h1>
        </div>
      ) : (
        <div className="w-full my-8 flex-row space-x-10 flex">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyDashboardCard key={property.id} {...property} />
            ))
          ) : (
            <div className="h-[70vh] flex items-center justify-center w-full">
              <div className="h-60 self-center  w-full md:my-10 my-0 items-center justify-end flex flex-col">
                <Lottie
                  animationData={construction}
                  loop={true}
                  className="w-full h-full"
                />
                <span className="text-2xl font-semibold">
                  You haven&apos;t uploaded any properties yet!
                </span>

                <Button
                  onClick={() => {
                    router.push("/dashboard/new");
                  }}
                  className="mt-10 cursor-pointer"
                >
                  Upload Property
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
