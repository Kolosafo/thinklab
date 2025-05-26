/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProject } from "@/hooks/useCreateProject";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useSaveImageToFirebase } from "@/hooks/useSaveImageToFirebase";
import { useUpdateProject } from "@/hooks/useUpdateProject";
import { IRootState } from "@/redux/store";
// import { IRootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

function UpdateProject({ params }: PageProps) {
  const [_isLoading, setIsLoading] = useState(false);
  const [uploadReady, setUploadReady] = useState(false);

  const { slug } = use(params);
  const { projects } = useSelector((store: IRootState) => store.projects);
  const getProject = projects.find((item) => item.id === slug);

  const [rawFilesLength, setRawFilesLength] = useState({
    rawImgLen: 0,
    progressImgLen: 0,
  });
  const { uploadImgToFirebase, isImageUploading } = useSaveImageToFirebase();
  const { fetchProjects } = useGetProjects();

  const {
    isLoading,
    handleUpdateProject,
    project,
    handleUpdateRawImages,
    handleUpdateImages,
    rawImages,
    setProject,
  } = useCreateProject();

  const { updateProject } = useUpdateProject();

  const createUri = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("RAW IMAGES: ", rawImages.imagesRaw);
    await uploadImgToFirebase({
      images: rawImages.imagesRaw,
      handleImageUri: (res) => handleUpdateImages(res, "images"),
      isProject: true,
    });

    await uploadImgToFirebase({
      images: rawImages.progressReportRaw,
      handleImageUri: (res) => handleUpdateImages(res, "progressReport"),
      isProject: true,
    });

    setUploadReady(true);
  };
  // const { isLogged } = useSelector((store: IRootState) => store.user);
  // const router = useRouter();
  // useEffect(() => {
  //   if (!isLogged) {
  //     router.push("/auth/login");
  //   }
  // }, [isLogged, router]);

  useEffect(() => {
    if (!getProject) return;
    setProject(getProject);
    setRawFilesLength({
      rawImgLen: getProject.images.length,
      progressImgLen: getProject.progressReportImages.length,
    });
  }, [getProject]);

  useEffect(() => {
    const calcRawImgLen = rawImages.imagesRaw.length;
    const calcRawProjLen = rawImages.progressReportRaw.length;
    console.log("CHECKER: ", calcRawImgLen, calcRawProjLen);
    console.log(
      "CHECKER 2.0: ",
      project.images.length,
      project.progressReportImages.length
    );
    if (
      project.images.length !== rawFilesLength.rawImgLen ||
      project.progressReportImages.length !== rawFilesLength.rawImgLen
    ) {
      return;
    }
    console.log("DIDNT GET HERE: ");
    if (uploadReady && !isImageUploading) {
      (async () => {
        await updateProject(project);
        setIsLoading(false);
      })();
    }
  }, [rawImages, project, updateProject, isImageUploading, uploadReady, rawFilesLength]);

  useEffect(() => {
    if (projects.length > 0) return;
    fetchProjects();
  }, []);

  useEffect(() => {
    setRawFilesLength((prev) => {
      return {
        rawImgLen: prev.rawImgLen + rawImages.imagesRaw.length,
        progressImgLen:
          prev.progressImgLen + rawImages.progressReportRaw.length,
      };
    });
  }, [rawImages]);
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form onSubmit={createUri} className="flex flex-col gap-6">
        <span className="text-3xl font-semibold">New Property Listing</span>
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
            value={project.description}
            id="description"
            onChange={(e) => handleUpdateProject("description", e.target.value)}
            placeholder="Briefly Write about this project"
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
            <Label htmlFor="city">Add Highlight Images</Label>
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
            <Label htmlFor="city">Add Progress Images</Label>
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
        <Button type="submit" disabled={isLoading} className="w-full mt-8">
          {isLoading ||
            (_isLoading && (
              <Loader2 className="size-4 animate-spin transition" />
            ))}
          {isLoading || _isLoading ? "Processing..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default UpdateProject;
