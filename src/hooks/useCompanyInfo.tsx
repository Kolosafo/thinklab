/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { updateAbout, updateProjectListingData } from "@/redux/info/infoSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type CompanyInfoData = {
  id?: string;
  about: string;
  projectListingData: string;
};

export const useCompanyInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleUpdateAbout = async (e: any, data: CompanyInfoData) => {
    e.preventDefault();
    const docRef = doc(db, "thinklab-site-info", "WUKxaJOlpBl3zMwXfwfO");
    setIsLoading(true);
    const newData = { ...data };
    await setDoc(docRef, newData)
      .then(async () => {
        setIsLoading(false);
        dispatch(updateAbout(data.about));
        toast.success("Success!");
        router.push("/admin");
      })
      .catch((e) => {
        console.log("ERROR", e);
        toast.error("An unknown error occured! Try Again!");
        setIsLoading(false);
        router.push("/admin");
      });
    // setIsLoading(false);
  };

  const handleUpdateProjectListingData = async (
    e: any,
    data: CompanyInfoData
  ) => {
    const docRef = doc(db, "thinklab-site-info", "WUKxaJOlpBl3zMwXfwfO");
    e.preventDefault();
    setIsLoading(true);
    const newData = { ...data };
    await setDoc(docRef, newData)
      .then(async () => {
        setIsLoading(false);
        dispatch(updateProjectListingData(data.projectListingData));
        toast.success("Success!");
        router.push("/admin");
      })
      .catch((e) => {
        console.log("ERROR", e);
        toast.error("An unknown error occured! Try Again!");
        setIsLoading(false);
      });
    // setIsLoading(false);
  };

  return {
    handleUpdateAbout,
    handleUpdateProjectListingData,
    isLoading,
  };
};
