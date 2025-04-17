import { KYCFormData } from "@/types";
import { useState } from "react";

type ValidationErrors = Partial<Record<keyof KYCFormData, string>>;

export function useKYC(onSubmit: (data: KYCFormData) => void) {
  const [kycFormData, setKycFormData] = useState<KYCFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    nationality: "",
    governmentIDType: "NIN",
    governmentIDNumber: "",
    idDocumentUrl: "",
    state: "",
    city: "",
    address: "",
    isAgent: true,
    companyName: "",
    CAC: "",
    isVerified: false,
    verificationDate: "",
    isReviewed: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!kycFormData.fullName) newErrors.fullName = "Full name is required.";
    if (!kycFormData.email || !/\S+@\S+\.\S+/.test(kycFormData.email))
      newErrors.email = "Valid email is required.";
    if (!kycFormData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required.";
    if (!kycFormData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required.";
    if (!kycFormData.nationality)
      newErrors.nationality = "Nationality is required.";
    if (!kycFormData.governmentIDNumber)
      newErrors.governmentIDNumber = "ID number is required.";
    if (!kycFormData.idDocumentUrl)
      newErrors.idDocumentUrl = "Upload of ID document is required.";
    if (!kycFormData.state) newErrors.state = "State is required.";
    if (!kycFormData.city) newErrors.city = "City is required.";
    if (!kycFormData.address) newErrors.address = "Address is required.";

    if (kycFormData.isAgent) {
      if (!kycFormData.companyName)
        newErrors.companyName = "Company name is required for agents.";
      if (!kycFormData.CAC)
        newErrors.CAC = "CAC number is required for agents.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof KYCFormData, value: string | boolean) => {
    setKycFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(kycFormData);
    }
  };

  return {
    kycFormData,
    setKycFormData,
    errors,
    handleChange,
    handleSubmit,
  };
}
