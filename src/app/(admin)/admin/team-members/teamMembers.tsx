/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTeam } from "@/hooks/useCreateTeam";
// import { IRootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import React from "react";
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
  const {
    isLoading,
    handleSubmit,
    handleUpdateProject,
    teamMember,
    handleUpdateRawImages,
    rawImage,
  } = useCreateTeam();
  // const { isLogged } = useSelector((store: IRootState) => store.user);
  // const router = useRouter();
  // useEffect(() => {
  //   if (!isLogged) {
  //     router.push("/auth/login");
  //   }
  // }, [isLogged, router]);
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <span className="text-3xl font-semibold">New Team Member</span>
        <div className="space-y-2">
          <Label htmlFor="name">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter first name"
            value={teamMember.firstName}
            onChange={(e) => handleUpdateProject("firstName", e.target.value)}
          />
          {/* {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )} */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Last name</Label>
          <Input
            id="lastNAMAE"
            placeholder="Enter Last name"
            value={teamMember.lastName}
            onChange={(e) => handleUpdateProject("lastName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Occupation</Label>
          <Input
            id="occupation"
            placeholder="Enter occupation"
            value={teamMember.occupation}
            onChange={(e) => handleUpdateProject("occupation", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">About</Label>
            <Textarea
              id="about"
              onChange={(e) => handleUpdateProject("about", e.target.value)}
              placeholder="Briefly Write about this person"
            />
          </div>
        </div>
        {rawImage && (
          <div className="h-40 border w-[50%] flex flex-row space-x-4 overflow-x-scroll p-4">
            <Image
              src={URL.createObjectURL(rawImage)}
              alt={`${rawImage}-img`}
              width={300}
              height={300}
              className="object-contain rounded-2xl"
              priority
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Member Image</Label>
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

        <div className="space-y-2 mt-10">
          <Label htmlFor="name">Facebook Handle</Label>
          <Input
            id="facebook"
            placeholder="Optional"
            value={teamMember.facebook}
            onChange={(e) => handleUpdateProject("facebook", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Twitter Handle</Label>
          <Input
            id="twitter"
            placeholder="Optional"
            value={teamMember.twitter}
            onChange={(e) => handleUpdateProject("twitter", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">LinkedIn Handle</Label>
          <Input
            id="linkedIn"
            placeholder="Optional"
            value={teamMember.linkedIn}
            onChange={(e) => handleUpdateProject("linkedIn", e.target.value)}
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
