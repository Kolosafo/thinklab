/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCheckAccess } from "@/hooks/useCheckAccess";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";
// import { LandingDataType } from "@/redux/info/infoSlice";
import { IRootState } from "@/redux/store";
// import { IRootState } from "@/redux/store";
// import { IRootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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

export type FullAboutData = {
  aboutTitle: string;
  aboutInfo: string;
  mission: string;
  vision: string;
  projectsCompleted: number;
  clients: number;
  expYear: number;
  awardWon: number;
  teamMemberSize: number;
  homesBuild: number;
  image: string;
};

function NewProject() {
  const { isMarketing, isMasterAdmin } = useCheckAccess();
  const {
    isLoading,
    handleSubmitLandingData,
    landingData,
    setLandingData,
    handleUpdateRawImages,
  } = useCompanyInfo();

  const { landingInfo } = useSelector((store: IRootState) => store.companyInfo);

  useEffect(() => {
    if (landingInfo.bgVideo) {
      setLandingData((prev) => ({
        ...prev,
        bgVideo: landingInfo.bgVideo,
      }));
    }
  }, [setLandingData, landingInfo.bgVideo]);
  return !isMarketing && !isMasterAdmin ? (
    <span className="text-xl mt-20">YOU DO NOT HAVE ACCESS TO THIS PAGE</span>
  ) : (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form onSubmit={handleSubmitLandingData} className="flex flex-col gap-6">
        <span className="text-3xl font-semibold">Landing Page</span>

        <span className="text-3xl font-semibold">Title</span>
        <Input
          className="mb-6"
          id="title"
          placeholder="Title"
          value={landingData.title}
          onChange={(e) =>
            setLandingData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <div className="space-y-2">
          <Textarea
            id="description"
            onChange={(e) =>
              setLandingData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Enter description"
          />
        </div>

        <span className="text-3xl font-semibold mt-10">Background Video</span>
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="space-y-2">
            {/* <Label htmlFor="city">Member Image</Label> */}
            <Input
              type="file"
              accept="image/gif"
              onChange={(e) =>
                handleUpdateRawImages(
                  "image",
                  e.target.files ? e.target.files[0] : null
                  // "progressReport"
                )
              }
            />
          </div>
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
