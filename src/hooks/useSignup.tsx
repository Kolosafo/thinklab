/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, companyCollectionRef } from "@/firebase";
import { login } from "@/redux/user/userSlice";
import { Company } from "@/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess: (email: string) => Promise<void>;
  onError: (res?: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setErrorMsg("");
    if (!email || email === "") {
      setErrorMsg("Please fill the form properly");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setIsLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        // console.log("USER CREATED", res.user.uid);
        dispatch(login({ email, id: res.user.uid }));
        await onSuccess(email);
      })
      .catch(() => {
        setErrorMsg("Email already in use");
        onError("Email already in use");
        // console.log("ERROR: ", err.message);
      });
    setIsLoading(false);
  };


  const handleCreateCompanyDetail = async (companyData: Company) => {
    setIsLoading(true);
    console.log("RUNNING");
    await addDoc(companyCollectionRef, {
      ...companyData,
    })
      .then(() => {
        onSuccess("");
      })
      .catch((e: any) => {
        console.log("Error: ", e);
        onError();
      });
    setIsLoading(false);
  };

  return {
    signUpUser: handleSubmit,
    signupLoading: isLoading,
    signupError: errorMsg,
    createCompanyDetail: handleCreateCompanyDetail,
  };
};
