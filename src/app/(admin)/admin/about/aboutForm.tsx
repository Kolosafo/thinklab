/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";
import { IRootState } from "@/redux/store";
// import { IRootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
export type PropertyListing = {
  state: string;
  address: string;
  bedrooms: number;
  price: number;
  description: string;
  images: File[]; // Or string[] if you're storing image URLs
  saveImageUris: string[];
  size: string;
  company: string;
};
function NewProject() {
  const { isLoading, handleUpdateAbout } = useCompanyInfo();
  const [aboutInfo, setAboutInfo] = useState("");
  const { companyInfo } = useSelector((store: IRootState) => store.companyInfo);
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form
        onSubmit={(e) =>
          handleUpdateAbout(e, { ...companyInfo, about: aboutInfo })
        }
        className="flex flex-col gap-6"
      >
        <span className="text-3xl font-semibold">About Us</span>

        <div className="space-y-2">
          <Textarea
            id="description"
            onChange={(e) => setAboutInfo(e.target.value)}
            placeholder="Briefly Write about this company"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full mt-8">
          {isLoading && <Loader2 className="size-4 animate-spin transition" />}
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default NewProject;
