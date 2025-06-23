/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProject } from "@/hooks/useCreateProject";
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
    project,
    handleUpdateRawImages,
    rawImages,
    setProject,
  } = useCreateProject();
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
        <span className="text-3xl font-semibold">New Project Listing</span>
        <div className="space-y-2">
          <Label htmlFor="name">Title</Label>
          <Input
            id="title"
            placeholder="What is the name of this project?"
            value={project.title}
            onChange={(e) => handleUpdateProject("title", e.target.value)}
          />
          {/* {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )} */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Description</Label>
          <Textarea
            id="description"
            onChange={(e) => handleUpdateProject("description", e.target.value)}
            placeholder="Write about this project"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Location</Label>
          <Input
            id="location"
            placeholder="Project location"
            value={project.location}
            onChange={(e) => handleUpdateProject("location", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Highlight Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                handleUpdateRawImages(
                  "imagesRaw",
                  Array.from(e.target.files || [])
                )
              }
            />
          </div>
        </div>
        {rawImages.imagesRaw.length > 0 && (
          <div className="h-40 border w-full flex flex-row space-x-4 overflow-x-scroll p-4">
            {rawImages.imagesRaw.map((img: any, idx) => (
              <Image
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`${img}-img`}
                width={300}
                height={300}
                className="object-contain rounded-2xl"
                priority
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Progress Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                handleUpdateRawImages(
                  "progressReportRaw",
                  Array.from(e.target.files || [])
                  // "progressReport"
                )
              }
            />
          </div>
        </div>

        {rawImages.progressReportRaw.length > 0 && (
          <div className="h-40 border w-full flex flex-row space-x-4 overflow-x-scroll p-4">
            {rawImages.progressReportRaw.map((img: any, idx) => (
              <Image
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`${img}-img`}
                width={300}
                height={300}
                className="object-contain rounded-2xl"
                priority
              />
            ))}
          </div>
        )}

        {/* <span className="text-2xl -mb-8 mt-2">Project Features</span> */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {Object.entries(project.features).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 capitalize">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setProject((prev) => ({
                    ...prev,
                    features: {
                      ...prev.features,
                      [key]: e.target.checked,
                    },
                  }))
                }
              />
              {key.replace(/([A-Z])/g, " $1")}
            </label>
          ))}
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
