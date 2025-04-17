"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryNames } from "simple-countries-list";
import { useKYC } from "@/hooks/useKYC";
import { states } from "@/lib/constants/states";

import { KYCFormData } from "@/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addDoc } from "firebase/firestore";
import { agentCollectionRef } from "@/firebase";
import { toast } from "@/components/ui/sonner";
import { sendApplicationEmail } from "@/lib/api/application";
import { useDispatch } from "react-redux";
import { loadAgent } from "@/redux/agent/agentSlice";
import { useGetApplications } from "@/hooks/useGetApplications";

export default function RegDetailForm() {
  const { fetchApplications, checkIsAgent } = useGetApplications();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);

  const dispatch = useDispatch();

  const onSubmit = async (data: KYCFormData) => {
    setIsLoading(true);
    const agents = await fetchApplications();
    const checkUser = checkIsAgent(agents, data.email);
    if (checkUser) {
      toast.error("User with this email already exists!");
      return;
    }
    await addDoc(agentCollectionRef, {
      ...data,
    })
      .then(async () => {
        toast.success("Account created successfully!.");
        await sendApplicationEmail(data.email);
        dispatch(loadAgent(data));
        router.push("/dashboard");
      })
      .catch(() => {
        toast.error("Failed to create account");
      });
    setIsLoading(false);
  };
  const { kycFormData, errors, handleChange } = useKYC(onSubmit);

  useEffect(() => {
    (async () => {
      setCountries(
        (await countryNames()).map((item) => {
          return { label: item, value: item };
        })
      );
    })();
  }, []);
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(kycFormData);
        }}
        className="flex flex-col gap-6"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Your Full Name"
            value={kycFormData.fullName}
            onChange={(event) => handleChange("fullName", event.target.value)}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Email</Label>
          <Input
            id="email"
            placeholder="Email address"
            value={kycFormData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Phone Number</Label>
          <Input
            id="phone"
            placeholder="080000000"
            value={kycFormData.phoneNumber}
            onChange={(event) =>
              handleChange("phoneNumber", event.target.value)
            }
            aria-invalid={!!errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            placeholder="080000000"
            value={kycFormData.dateOfBirth}
            onChange={(event) =>
              handleChange("dateOfBirth", event.target.value)
            }
            aria-invalid={!!errors.dateOfBirth}
          />
          {errors.dateOfBirth && (
            <p className="text-xs text-red-500">{errors.dateOfBirth}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Gender</Label>
          <Select onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {["male", "female"].map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-xs text-red-500">{errors.gender}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Nationality</Label>
          <Select onValueChange={(value) => handleChange("nationality", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Nationality" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.label} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.nationality && (
            <p className="text-xs text-red-500">{errors.nationality}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select onValueChange={(value) => handleChange("state", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-xs text-red-500">{errors.state}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">City</Label>
          <Input
            id="city"
            placeholder="Borno"
            value={kycFormData.city}
            onChange={(event) => handleChange("city", event.target.value)}
            aria-invalid={!!errors.city}
          />
          {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Address</Label>
          <Input
            id="Address"
            placeholder="No.10 ..."
            value={kycFormData.address}
            onChange={(event) => handleChange("address", event.target.value)}
            aria-invalid={!!errors.address}
          />
          {errors.address && (
            <p className="text-xs text-red-500">{errors.address}</p>
          )}
        </div>

        <span className="text-3xl font-semibold mt-8">Company Information</span>
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Almakura Realty Limited"
            value={kycFormData.companyName}
            onChange={(event) =>
              handleChange("companyName", event.target.value)
            }
            aria-invalid={!!errors.companyName}
          />
          {errors.companyName && (
            <p className="text-xs text-red-500">{errors.companyName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">CAC Number</Label>
          <Input
            id="CAC"
            placeholder=""
            value={kycFormData.CAC}
            onChange={(event) => handleChange("CAC", event.target.value)}
            aria-invalid={!!errors.CAC}
          />
          {errors.CAC && <p className="text-xs text-red-500">{errors.CAC}</p>}
        </div>

        <span className="text-3xl font-semibold mt-8">
          Verification Details
        </span>

        <div className="space-y-2">
          <Label htmlFor="state">ID Type</Label>
          <Select
            onValueChange={(value) => handleChange("governmentIDType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ID Type" />
            </SelectTrigger>
            <SelectContent>
              {["NIN", "International Passport", "Driver License"].map(
                (_id) => (
                  <SelectItem key={_id} value={_id}>
                    {_id}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.governmentIDType && (
            <p className="text-xs text-red-500">{errors.governmentIDType}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Identification Number</Label>
          <Input
            id="id"
            placeholder="NIN/Passport/License number"
            value={kycFormData.governmentIDNumber}
            onChange={(event) =>
              handleChange("governmentIDNumber", event.target.value)
            }
            aria-invalid={!!errors.governmentIDNumber}
          />
          {errors.governmentIDNumber && (
            <p className="text-xs text-red-500">{errors.governmentIDNumber}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full mt-8">
          {isLoading && <Loader2 className="size-4 animate-spin transition" />}
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
