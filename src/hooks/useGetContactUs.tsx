"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { contactUsInfoRef } from "@/firebase";
import { loadContactUs } from "@/redux/info/infoSlice";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useGetContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleGetProperties = async () => {
    setIsLoading(true);
    const data = await getDocs(contactUsInfoRef).catch(() => {
      setErrorMsg("An Unknown Error Occured!");
    });
    const contactUsData: any = data?.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    console.log("CONTACT US: ", contactUsData);
    dispatch(loadContactUs(contactUsData[0]));
    setIsLoading(false);
  };
  return {
    isFetchingContactUs: isLoading,
    fetchContactUs: handleGetProperties,
    error: errorMsg,
  };
};
