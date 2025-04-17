/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, companyCollectionRef } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import { useState } from "react";

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: (res?: any) => Promise<void>;
  onError: (res?: any) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setErrorMsg("");
    if (!email || email === "") {
      setErrorMsg("Please fill the form properly");
      return;
    }

    setIsLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const data = await getDocs(companyCollectionRef);
        const allUserInfo = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const mergedData = {};

        allUserInfo.forEach((item) => {
          Object.assign(mergedData, item);
        });

        const userData = { email: res.user.email ?? "", id: res.user.uid };
        const companyData = { ...(mergedData as any), userId: res.user.uid };

        await onSuccess({
          loginData: userData,
          companyData,
        });
      })
      .catch((err) => {
        setErrorMsg("Invalid credentials");
        console.log("ERROR: ", err.message);
        onError();
      });
    setIsLoading(false);
  };
  return {
    handleLogin: handleSubmit,
    loginLoading: isLoading,
    loginError: errorMsg,
  };
};
