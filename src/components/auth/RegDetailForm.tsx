/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Checkbox from "../ui/checkbox";
import { Calendar } from "../ui/calendar";

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
          <Calendar
            mode="single"
            // selected={kycFormData.dateOfBirth.toS}
            onSelect={(val) =>
              handleChange("dateOfBirth", val?.toDateString() ?? "")
            }
            className="border rounded-md p-2 w-fit"
            disabled={(date) => date > new Date()}
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

        <div className="space-y-2">
          <Label htmlFor="name">Are you a politically exposed person?</Label>

          <Checkbox
            fieldName="politicallyExposedPerson"
            onChange={(fieldName: any, value) => handleChange(fieldName, value)}
            checked={kycFormData.politicallyExposedPerson}
          />

          {errors.politicallyExposedPerson && (
            <p className="text-xs text-red-500">
              {errors.politicallyExposedPerson}
            </p>
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

        {/* PROPERTY DETAILS */}
        <span className="text-3xl font-semibold mt-8">Property Details</span>
        <div className="space-y-2">
          <Label htmlFor="name">Property address</Label>
          <Input
            id="propertyAddress"
            placeholder="Plot 506"
            value={kycFormData.propertyAddress}
            onChange={(event) =>
              handleChange("propertyAddress", event.target.value)
            }
            aria-invalid={!!errors.propertyAddress}
          />
          {errors.propertyAddress && (
            <p className="text-xs text-red-500">{errors.propertyAddress}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Property Type</Label>
          <Select
            onValueChange={(value) => handleChange("propertyType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Property Type" />
            </SelectTrigger>
            <SelectContent>
              {["residential", "commercial", "land"].map((_id) => (
                <SelectItem key={_id} value={_id}>
                  {_id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.propertyType && (
            <p className="text-xs text-red-500">{errors.propertyType}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Property price</Label>
          <Input
            type="number"
            id="propertyPrice"
            placeholder="N50,000,000"
            value={kycFormData.propertyPrice}
            onChange={(event) =>
              handleChange("propertyPrice", event.target.value)
            }
            aria-invalid={!!errors.propertyPrice}
          />
          {errors.propertyPrice && (
            <p className="text-xs text-red-500">{errors.propertyPrice}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Proposed date of purchase</Label>
          <Calendar
            mode="single"
            // selected={kycFormData.dateOfBirth.toS}
            onSelect={(val) =>
              handleChange("dateOfPurchase", val?.toDateString() ?? "")
            }
            className="border rounded-md p-2 w-fit"
            disabled={(date) => date < new Date()}
          />

          {errors.dateOfPurchase && (
            <p className="text-xs text-red-500">{errors.dateOfPurchase}</p>
          )}
        </div>

        {/* FINANCIAL INFORMATION */}
        <span className="text-3xl font-semibold mt-8">
          FINANCIAL INFORMATION
        </span>
        <div className="space-y-2">
          <Label htmlFor="name">Are you making outright purchase?</Label>
          <Checkbox
            fieldName="outrightPurchase"
            onChange={(fieldName: any, value) => handleChange(fieldName, value)}
            checked={kycFormData.outrightPurchase}
          />

          {errors.outrightPurchase && (
            <p className="text-xs text-red-500">{errors.outrightPurchase}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Purchase Type Preference</Label>
          <Select
            onValueChange={(value) => handleChange("purchaseMedium", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Purchase Preference" />
            </SelectTrigger>
            <SelectContent>
              {["Bank Transfer", "Financing/mortage", "Installment Plan"].map(
                (_id) => (
                  <SelectItem key={_id} value={_id}>
                    {_id}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.purchaseMedium && (
            <p className="text-xs text-red-500">{errors.purchaseMedium}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Prefered Timeframe for Purchase</Label>
          <Select
            onValueChange={(value) => handleChange("purchaseTimeframe", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select prefered timeframe" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Immediately",
                "1-3 months",
                "3-6 months",
                "6 months and beyond",
              ].map((_id) => (
                <SelectItem key={_id} value={_id}>
                  {_id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.purchaseTimeframe && (
            <p className="text-xs text-red-500">{errors.purchaseTimeframe}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">
            Are you purchasing the property with a loan?
          </Label>

          <Checkbox
            fieldName="purchaseWithLoan"
            onChange={(fieldName: any, value) => handleChange(fieldName, value)}
            checked={kycFormData.purchaseWithLoan}
          />

          {errors.purchaseWithLoan && (
            <p className="text-xs text-red-500">{errors.purchaseWithLoan}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">If Yes, Name of Lender/Bank</Label>
          <Input
            id="lenderBank"
            placeholder="Fulus Capital"
            value={kycFormData.lenderBank}
            onChange={(event) => handleChange("lenderBank", event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Loan Amount (if applicable)</Label>
          <Input
            type="number"
            id="loanAmount"
            placeholder="N50,000,000"
            value={kycFormData.loanAmount}
            onChange={(event) => handleChange("loanAmount", event.target.value)}
            // aria-invalid={!!errors.loanAmount}
          />
          {/* {errors.loanAmount && (
            <p className="text-xs text-red-500">{errors.loanAmount}</p>
          )} */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Down payment amount</Label>
          <Input
            type="number"
            id="downpaymentAmount"
            placeholder="N50,000,000"
            value={kycFormData.downpaymentAmount}
            onChange={(event) =>
              handleChange("downpaymentAmount", event.target.value)
            }
            aria-invalid={!!errors.downpaymentAmount}
          />
          {errors.downpaymentAmount && (
            <p className="text-xs text-red-500">{errors.downpaymentAmount}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Total amount available for payment</Label>
          <Input
            type="number"
            id="totalPaymentAvailableAmount"
            placeholder="N50,000,000"
            value={kycFormData.totalPaymentAvailableAmount}
            onChange={(event) =>
              handleChange("totalPaymentAvailableAmount", event.target.value)
            }
            aria-invalid={!!errors.totalPaymentAvailableAmount}
          />
          {errors.totalPaymentAvailableAmount && (
            <p className="text-xs text-red-500">
              {errors.totalPaymentAvailableAmount}
            </p>
          )}
        </div>

        {/* EMPLOYMENT DETAILS */}
        <span className="text-3xl font-semibold mt-8">EMPLOYMENT DETAILS</span>
        <div className="space-y-2">
          <Label htmlFor="name">Current Employer</Label>
          <Input
            id="currentEmployer"
            placeholder=""
            value={kycFormData.currentEmployer}
            onChange={(event) =>
              handleChange("currentEmployer", event.target.value)
            }
            aria-invalid={!!errors.currentEmployer}
          />
          {errors.currentEmployer && (
            <p className="text-xs text-red-500">{errors.currentEmployer}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Position/Title</Label>
          <Input
            id="position"
            placeholder="Manager"
            value={kycFormData.position}
            onChange={(event) => handleChange("position", event.target.value)}
            aria-invalid={!!errors.position}
          />
          {errors.position && (
            <p className="text-xs text-red-500">{errors.position}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Annual Income (before tax)</Label>
          <Input
            id="annualIncome"
            type="number"
            placeholder="N20,000,000"
            value={kycFormData.annualIncome}
            onChange={(event) =>
              handleChange("annualIncome", event.target.value)
            }
            aria-invalid={!!errors.annualIncome}
          />
          {errors.annualIncome && (
            <p className="text-xs text-red-500">{errors.annualIncome}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Employer Address</Label>
          <Input
            id="employerAddress"
            placeholder="No 61..."
            value={kycFormData.employerAddress}
            onChange={(event) =>
              handleChange("employerAddress", event.target.value)
            }
            aria-invalid={!!errors.employerAddress}
          />
          {errors.employerAddress && (
            <p className="text-xs text-red-500">{errors.employerAddress}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Work Phone Number</Label>
          <Input
            id="workPhoneNumber"
            placeholder="080..."
            value={kycFormData.workPhoneNumber}
            onChange={(event) =>
              handleChange("workPhoneNumber", event.target.value)
            }
            aria-invalid={!!errors.workPhoneNumber}
          />
          {errors.workPhoneNumber && (
            <p className="text-xs text-red-500">{errors.workPhoneNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Purchase Type Preference</Label>
          <Select
            onValueChange={(value) => handleChange("purchaseMedium", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Purchase Preference" />
            </SelectTrigger>
            <SelectContent>
              {["bankTransfer", "financing/mortage", "installment Plan"].map(
                (_id) => (
                  <SelectItem key={_id} value={_id}>
                    {_id}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.purchaseMedium && (
            <p className="text-xs text-red-500">{errors.purchaseMedium}</p>
          )}
        </div>

        {/* ADDITIONAL INFORMATION  */}
        <span className="text-3xl font-semibold mt-8">
          ADDITIONAL INFORMATION
        </span>
        <div className="space-y-2">
          <Label htmlFor="name">
            Are there any legal restrictions preventing the purchase of this
            property?
          </Label>
          {/* <RadioGroup /> */}
          <Checkbox
            fieldName="legalRestrictionsPurchase"
            onChange={(fieldName: any, value) => handleChange(fieldName, value)}
            checked={kycFormData.legalRestrictionsPurchase}
          />

          {errors.legalRestrictionsPurchase && (
            <p className="text-xs text-red-500">
              {errors.legalRestrictionsPurchase}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">If yes please explain</Label>
          <Input
            id="legalRestrictionsPurchaseExplanation"
            placeholder=""
            value={kycFormData.legalRestrictionsPurchaseExplanation}
            onChange={(event) =>
              handleChange(
                "legalRestrictionsPurchaseExplanation",
                event.target.value
              )
            }
            aria-invalid={!!errors.legalRestrictionsPurchaseExplanation}
          />
          {errors.legalRestrictionsPurchaseExplanation && (
            <p className="text-xs text-red-500">
              {errors.legalRestrictionsPurchaseExplanation}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">
            Have you previously purchased any property from us, or any other
            developer?
          </Label>
          <Checkbox
            fieldName="previousPurchase"
            onChange={(fieldName: any, value) => handleChange(fieldName, value)}
            checked={kycFormData.previousPurchase}
          />

          {errors.previousPurchase && (
            <p className="text-xs text-red-500">{errors.previousPurchase}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">If yes please explain</Label>
          <Input
            id="previousPurchaseDetails"
            placeholder=""
            value={kycFormData.previousPurchaseDetails}
            onChange={(event) =>
              handleChange("previousPurchaseDetails", event.target.value)
            }
            aria-invalid={!!errors.previousPurchaseDetails}
          />
          {errors.previousPurchaseDetails && (
            <p className="text-xs text-red-500">
              {errors.previousPurchaseDetails}
            </p>
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
