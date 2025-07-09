"use client";
import { IRootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import construction from "../../../../../public/animation/construction.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import LoadingPage from "@/app/(dashboard)/loading";
import { useGetProjects } from "@/hooks/useGetProjects";
import AdminProjectCard from "@/components/projects/AdminProjectCard";
import { useCheckAccess } from "@/hooks/useCheckAccess";

export default function DashboardPage() {
  const { fetchProjects, isFetchingProjects } = useGetProjects();
  const { projects } = useSelector((store: IRootState) => store.projects);
  const { isProjectManagement, isMasterAdmin } = useCheckAccess();

  const router = useRouter();
  useEffect(() => {
    fetchProjects();
  }, []);

  //   useEffect(() => {
  //     if (!isLogged) {
  //       router.push("/auth/login");
  //     }
  //   }, [isLogged, router]);
  return !isProjectManagement && !isMasterAdmin ? (
    <span className="text-xl mt-20">YOU DO NOT HAVE ACCESS TO THIS PAGE</span>
  ) : (
    <div>
      <span className="text-3xl font-semibold">Projects Dashboard</span>
      {isFetchingProjects ? (
        <LoadingPage />
      ) : (
        <div className="w-full my-8 flex-row space-x-10 flex">
          {projects.length > 0 ? (
            projects.map((project) => (
              <AdminProjectCard key={project.id} {...project} />
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
                  You haven&apos;t uploaded any projects yet!
                </span>

                <Button
                  onClick={() => {
                    router.push("/admin/new-project");
                  }}
                  className="mt-10 cursor-pointer"
                >
                  Upload New Project
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
