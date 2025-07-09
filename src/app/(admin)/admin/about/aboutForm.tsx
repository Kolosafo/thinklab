/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCheckAccess } from "@/hooks/useCheckAccess";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";
// import { IRootState } from "@/redux/store";
// import { IRootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
import React from "react";
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
  const { isLegal, isMasterAdmin } = useCheckAccess();
  const {
    isLoading,
    handleSubmit,
    setFullAbout,
    fullAboutInfo,
    handleUpdateRawImages,
  } = useCompanyInfo();
  // const [aboutInfo, setAboutInfo] = useState("");
  // const { companyInfo } = useSelector((store: IRootState) => store.companyInfo);

  return !isLegal && !isMasterAdmin ? (
    <span className="text-xl mt-20">YOU DO NOT HAVE ACCESS TO THIS PAGE</span>
  ) : (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <span className="text-3xl font-semibold">About Us</span>

        <div className="space-y-2">
          <Textarea
            id="aboutInfo"
            onChange={(e) =>
              setFullAbout((prev) => ({ ...prev, aboutInfo: e.target.value }))
            }
            placeholder="write about this company"
          />
        </div>

        <span className="text-3xl font-semibold">Title</span>
        <Input
          className="mb-6"
          id="aboutTitle"
          placeholder="About Us Header Title"
          value={fullAboutInfo.aboutTitle}
          onChange={(e) =>
            setFullAbout((prev) => ({
              ...prev,
              aboutTitle: e.target.value,
            }))
          }
        />

        <span className="text-3xl font-semibold">Our Mission</span>
        <div className="space-y-2">
          <Textarea
            id="mission"
            onChange={(e) =>
              setFullAbout((prev) => ({ ...prev, mission: e.target.value }))
            }
            placeholder="Write our mission"
          />
        </div>

        <span className="text-3xl font-semibold">Our Vision</span>
        <div className="space-y-2">
          <Textarea
            id="vision"
            onChange={(e) =>
              setFullAbout((prev) => ({ ...prev, vision: e.target.value }))
            }
            placeholder="Write our vision"
          />
        </div>
        <span className="text-3xl font-semibold mt-10">About Image</span>
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="space-y-2">
            {/* <Label htmlFor="city">Member Image</Label> */}
            <Input
              type="file"
              accept="image"
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

        <span className="text-3xl font-semibold">Our Achievements</span>
        <div className="space-y-2">
          <span className="text-base">Total Projects Completed</span>
          <Input
            className="mb-6"
            id="projectsCompleted"
            placeholder="Projects completed"
            value={fullAboutInfo.projectsCompleted}
            type="number"
            onChange={(e) =>
              setFullAbout((prev) => ({
                ...prev,
                projectsCompleted: parseInt(e.target.value) || 0,
              }))
            }
          />
          <span className="text-base">Clients Served</span>
          <Input
            className="mb-6"
            id="clients"
            placeholder="Clients served"
            value={fullAboutInfo.clients}
            type="number"
            onChange={(e) =>
              setFullAbout((prev) => ({
                ...prev,
                clients: parseInt(e.target.value) || 0,
              }))
            }
          />
          <span className="text-base">Years of Experience</span>
          <Input
            className="mb-6"
            id="expYears"
            placeholder="Years of experience"
            value={fullAboutInfo.expYear}
            type="number"
            onChange={(e) =>
              setFullAbout((prev) => ({
                ...prev,
                expYear: parseInt(e.target.value) || 0,
              }))
            }
          />
          <span className="text-base">Awards Won</span>
          <Input
            className="mb-6"
            id="awardWon"
            placeholder="Awards won"
            value={fullAboutInfo.awardWon}
            type="number"
            onChange={(e) =>
              setFullAbout((prev) => ({
                ...prev,
                awardWon: parseInt(e.target.value) || 0,
              }))
            }
          />
          <span className="text-base">Team Size</span>
          <Input
            className="mb-6"
            id="teamMemberSize"
            placeholder="Team member size"
            value={fullAboutInfo.teamMemberSize}
            type="number"
            onChange={(e) =>
              setFullAbout((prev) => ({
                ...prev,
                teamMemberSize: parseInt(e.target.value) || 0,
              }))
            }
          />
          <span className="text-base">Homes Built</span>
          <Input
            className="mb-6"
            id="homesBuild"
            placeholder="Homes built"
            value={fullAboutInfo.homesBuild}
            type="number"
            onChange={(e) =>
              setFullAbout((prev) => ({
                ...prev,
                homesBuild: parseInt(e.target.value) || 0,
              }))
            }
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
