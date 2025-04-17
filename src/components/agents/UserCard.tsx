import { KYCFormData } from "@/types";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateApplications } from "@/redux/properties/propertySlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { applicationReviewedEmail } from "@/lib/api/application";
import { useSignUp } from "@/hooks/useSignup";
import { generatePassword } from "@/utils/helpers";

const UserCard = (data: KYCFormData) => {
  const onSuccess = async (email: string) => {
    console.log(email);
  };
  const onError = () => {};
  const { signUpUser } = useSignUp({ onSuccess, onError });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const _handleSubmit = async (status: boolean) => {
    const docRef = doc(db, "agent_data", data?.id ?? "");
    setIsLoading(true);
    const newData = { ...data, isReviewed: true, isVerified: status };
    await setDoc(docRef, newData)
      .then(async () => {
        const createPassword = generatePassword();
        if (status) {
          await signUpUser({
            email: data.email,
            password: createPassword,
            confirmPassword: createPassword,
          });
        }
        await applicationReviewedEmail({
          email: data.email,
          accepted: status,
          password: createPassword,
        });
        setIsLoading(false);
        dispatch(updateApplications(newData));
        toast.error("Application Reviewed!");
      })
      .catch((e) => {
        console.log("ERROR", e);
        toast.error("An unknown error occured! Try Again!");
        setIsLoading(false);
      });
    // setIsLoading(false);
  };

  return (
    <div className="border rounded-lg min-w-[550px] p-4">
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">Full Name</span>
        <span>{data.fullName}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">Email</span>
        <span>{data.email}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">Phone Number</span>
        <span>{data.phoneNumber}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">Date of Birth</span>
        <span>{data.dateOfBirth}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">Gender</span>
        <span>{data.gender}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">Nationality</span>
        <span>{data.gender}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">State</span>
        <span>{data.state}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">City</span>
        <span>{data.city}</span>
      </div>
      <div className="w-full justify-between flex mb-16 border-b">
        <span className="font-bold">Address</span>
        <span>{data.address}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">Mean of Identification</span>
        <span>{data.governmentIDType}</span>
      </div>
      <div className="w-full justify-between flex mb-16 border-b">
        <span className="font-bold">Identification Number</span>
        <span>{data.governmentIDNumber}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">Company Name</span>
        <span>{data.companyName}</span>
      </div>
      <div className="w-full justify-between flex mb-8">
        <span className="font-bold">Company Registration Number (CAC)</span>
        <span>{data.CAC}</span>
      </div>

      <div className="flex w-full items-center justify-center space-x-5">
        <Button
          disabled={isLoading}
          type="submit"
          onClick={() => {
            setStatus(false);
            _handleSubmit(false);
          }}
        >
          {!status && isLoading ? (
            <Loader2 className="size-4 animate-spin transition" />
          ) : (
            "Decline"
          )}
        </Button>
        <Button
          disabled={isLoading}
          variant="outline"
          className="flex items-center gap-2 border-green-500 border"
          onClick={() => {
            setStatus(true);
            _handleSubmit(true);
          }}
        >
          {status && isLoading ? (
            <Loader2 className="size-4 animate-spin transition" />
          ) : (
            "Accept"
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
