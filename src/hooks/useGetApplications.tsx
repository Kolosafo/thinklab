"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { agentCollectionRef } from "@/firebase";
import { loadApplications } from "@/redux/properties/propertySlice";
import { KYCFormData } from "@/types";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useGetApplications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleGetApplication = async () => {
    setIsLoading(true);
    const data = await getDocs(agentCollectionRef).catch(() => {
      setErrorMsg("An Unknown Error Occured!");
    });
    const allApplications: any = data?.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // console.log("GUESTS: ", allGuests);
    dispatch(loadApplications(allApplications));
    setIsLoading(false);
    return allApplications as KYCFormData[];
  };

  const handleCheckIsAgent = (agents: KYCFormData[], email: string) => {
    const findAgent = agents.find((agent) => agent.email === email);
    return findAgent;
  };
  return {
    isFetchingApplications: isLoading,
    fetchApplications: handleGetApplication,
    error: errorMsg,
    checkIsAgent: handleCheckIsAgent,
  };
};
