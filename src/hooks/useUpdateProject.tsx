"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase";
import { deleteProject, updateProject } from "@/redux/projects/projectSlice";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ProjectCreationData } from "./useCreateProject";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useUpdateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleDeleteProject = async (id: string) => {
    setIsLoading(true);
    const eventToDelete = doc(db, "event", id);
    await deleteDoc(eventToDelete);
    dispatch(deleteProject(id));
    setIsLoading(false);
  };

  const handleUpdateProject = async (data: ProjectCreationData) => {
    const docRef = doc(db, "projects", data.id ?? "");
    setIsLoading(true);
    const newData = { ...data };
    console.log("UPDATER: ", newData)
    await setDoc(docRef, newData)
      .then(async () => {
        setIsLoading(false);
        dispatch(updateProject(data));
        toast.success("Success!");
        router.push("/admin/projects");
      })
      .catch((e) => {
        console.log("ERROR", e);
        toast.error("An unknown error occured! Try Again!");
        setIsLoading(false);
        router.push("/admin/projects");
      });
    // setIsLoading(false);
  };
  return {
    isFetchingProjects: isLoading,
    deleteProject: handleDeleteProject,
    updateProject: handleUpdateProject,
  };
};
