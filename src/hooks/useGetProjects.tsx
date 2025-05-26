"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { projectsCollectionRef } from "@/firebase";
import { loadProjects } from "@/redux/projects/projectSlice";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useGetProjects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleGetProperties = async () => {
    setIsLoading(true);
    const data = await getDocs(projectsCollectionRef).catch(() => {
      setErrorMsg("An Unknown Error Occured!");
    });
    const allProperties: any = data?.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // console.log("GUESTS: ", allGuests);
    dispatch(loadProjects(allProperties));
    setIsLoading(false);
  };
  return {
    isFetchingProjects: isLoading,
    fetchProjects: handleGetProperties,
    error: errorMsg,
  };
};
