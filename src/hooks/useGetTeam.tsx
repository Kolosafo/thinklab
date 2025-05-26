"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { aboutCollectionRef } from "@/firebase";
import { loadTeam } from "@/redux/info/infoSlice";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useGetTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleGetTeam = async () => {
    setIsLoading(true);
    const data = await getDocs(aboutCollectionRef).catch(() => {
      setErrorMsg("An Unknown Error Occured!");
    });
    const allTeam: any = data?.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // console.log("GUESTS: ", allGuests);
    dispatch(loadTeam(allTeam));
    setIsLoading(false);
  };
  return {
    isFetchingTeam: isLoading,
    fetchTeam: handleGetTeam,
    error: errorMsg,
  };
};
