"use client";
import { ACCESS_CATEGORIES } from "@/app/(admin)/admin/access/Access";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { toast } from "sonner";
const CATEGORY_IDS = {
  projectManagement: "bn2HW2LZLus6gOSRmQnS",
  marketing: "AuLXdwWMCCRE9xZj4gtv",
  legal: "6VPqhPsuFioc0m0NVbH0",
  communications: "iS5Jd9JC5opHNQTCy6KA",
};
export const useGetAdminLogins = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  //   const dispatch = useDispatch();

  const handleGetAdminLogins = async () => {
    setIsLoading(true);
    // const data = await getDocs(adminLoginRef).catch(() => {
    //   setErrorMsg("An Unknown Error Occured!");
    // });
    // const adminLoginData: any = data?.docs.map((doc: any) => ({
    //   ...doc.data(),
    //   id: doc.id,
    // }));
    // console.log("ADMIN LOGIN: ", adminLoginData)
    // dispatch(loadContactUs(contactUsData[0]));
    setIsLoading(false);
  };

  const handleUpdateLogin = async ({
    category,
    data,
    onSuccess,
  }: {
    category: ACCESS_CATEGORIES;
    data: { username: string; password: string; department: string };
    onSuccess: () => void;
  }) => {
    const updateCat =
      category === ACCESS_CATEGORIES.legal
        ? CATEGORY_IDS.legal
        : category === ACCESS_CATEGORIES.communications
          ? CATEGORY_IDS.communications
          : category === ACCESS_CATEGORIES.marketing
            ? CATEGORY_IDS.marketing
            : CATEGORY_IDS.projectManagement;

    const docRef = doc(db, "adminLogins", updateCat);
    setIsLoading(true);
    const newData = { ...data };
    // console.log("UPDATER: ", newData);
    await setDoc(docRef, newData)
      .then(async () => {
        setIsLoading(false);
        // dispatch(updateProject(data));
        toast.success("ACCESS SUCCESSFULLY UPDATED!");
        onSuccess();
      })
      .catch((e) => {
        console.log("ERROR", e);
        setErrorMsg("An unknown error occured! Try Again!");
        toast.error("An unknown error occured! Try Again!");
        setIsLoading(false);
      });
    // setIsLoading(false);
  };

  return {
    handleUpdateLogin,
    isLoading,
    fetchAdminLogins: handleGetAdminLogins,
    error: errorMsg,
  };
};
