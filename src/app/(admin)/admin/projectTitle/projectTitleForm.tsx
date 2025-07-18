/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCheckAccess } from "@/hooks/useCheckAccess";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";
// import { IRootState } from "@/redux/store";
// import { IRootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import { useSelector } from "react-redux";
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
function ProjectTitleForm() {
  const {isLegal, isMasterAdmin} = useCheckAccess();
  const { isLoading, handleUpdateProjectListingData } = useCompanyInfo();
  const [projectListData, setProjectListData] = useState("");
  return !isLegal && !isMasterAdmin ? (
    <span className="text-xl mt-20">YOU DO NOT HAVE ACCESS TO THIS PAGE</span>
  ) : (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form
        onSubmit={(e) => handleUpdateProjectListingData(e, projectListData)}
        className="flex flex-col gap-6"
      >
        <span className="text-3xl font-semibold">Project List Title</span>

        <div className="space-y-2">
          <Textarea
            id="description"
            onChange={(e) => setProjectListData(e.target.value)}
            placeholder=""
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

export default ProjectTitleForm;
