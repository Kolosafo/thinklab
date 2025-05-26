"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { companyInfoRef } from "@/firebase";
import { loadCompanyInfo } from "@/redux/info/infoSlice";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useGetCompanyInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleGetCompanyInfo = async () => {
    setIsLoading(true);
    const data = await getDocs(companyInfoRef).catch(() => {
      setErrorMsg("An Unknown Error Occured!");
    });
    const companyInfo: any = data?.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // console.log("GUESTS: ", allGuests);
    dispatch(loadCompanyInfo(companyInfo[0]));
    setIsLoading(false);
  };
  return {
    isFetchingInfo: isLoading,
    fetchCompanyInfo: handleGetCompanyInfo,
    error: errorMsg,
  };
};
