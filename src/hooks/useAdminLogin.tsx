/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ACCESS_CATEGORIES } from "@/app/(admin)/admin/access/Access";
import { adminLoginRef } from "@/firebase";
import { handleMasterAdminLogin, setUserRole } from "@/redux/user/userSlice";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useAdminLogin = ({
  onSuccess,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleAdminLogin = async ({
    username,
    password,
    type,
  }: {
    username: string;
    password: string;
    type: ACCESS_CATEGORIES | "isAdmin";
  }) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const data = await getDocs(adminLoginRef);
      const adminLoginData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const match = adminLoginData.find(
        (item: any) =>
          item.type === type &&
          item.username === username &&
          item.password === password
      );

      if (!match) {
        setErrorMsg("Invalid credentials or access type");
        setIsLoading(false);
        return;
      }

      // Set role based on the type
      switch (type) {
        case "isAdmin":
          dispatch(handleMasterAdminLogin({ username, password }));
          break;
        case ACCESS_CATEGORIES.legal:
          dispatch(setUserRole({ role: "isLegal", value: true }));
          break;
        case ACCESS_CATEGORIES.projectManagement:
          dispatch(setUserRole({ role: "isProjectManagement", value: true }));
          break;
        case ACCESS_CATEGORIES.marketing:
          dispatch(setUserRole({ role: "isMarketing", value: true }));
          break;
        case ACCESS_CATEGORIES.communications:
          dispatch(setUserRole({ role: "isComms", value: true }));
          break;
        default:
          setErrorMsg("Unknown access type");
          return;
      }
      onSuccess();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMsg("An unknown error occurred!");
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleAdminLogin,
    error: errorMsg,
  };
};
