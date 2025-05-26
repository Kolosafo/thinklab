/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState } from "react";
import { useSaveImageToFirebase } from "./useSaveImageToFirebase";
import { addDoc } from "firebase/firestore";
import { projectsCollectionRef } from "@/firebase";
import { useDispatch } from "react-redux";
import { addProject } from "@/redux/projects/projectSlice";
import { useRouter } from "next/navigation";

export type ProjectCreationData = {
  id?: string;
  title: string;
  description: string;
  location: string;
  //   keyFeatureOne: {
  //     title: string;
  //     description: string;
  //   };
  //   keyFeatureTwo: {
  //     title: string;
  //     description: string;
  //   };
  //   keyFeatureThree: {
  //     title: string;
  //     description: string;
  //   };
  images: string[];
  progressReportImages: string[];
};

export const useCreateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadReady, setUploadReady] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { uploadImgToFirebase, isImageUploading } = useSaveImageToFirebase();

  const router = useRouter();
  const [rawImages, setRawImages] = useState({
    imagesRaw: [] as any[],
    progressReportRaw: [] as any[],
  });
  const [project, setProject] = useState<ProjectCreationData>({
    title: "",
    description: "",
    location: "",
    images: [],
    progressReportImages: [],
  });

  const handleUpdateProject = (
    field: keyof ProjectCreationData,
    value: string | number | File[] | any
  ) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateRawImages = (
    field: "imagesRaw" | "progressReportRaw",
    value: File[]
  ) => {
    setRawImages((prev) => ({
      ...prev,
      [field]: [...prev[field], ...value],
    }));
  };

  const handleUpdateImages = (img: any, type: "images" | "progressReport") => {
    setProject((prev) => {
      const returnObject =
        type === "images"
          ? { ...prev, images: [...prev.images, img] }
          : {
              ...prev,
              progressReportImages: [...prev.progressReportImages, img],
            };
      return returnObject;
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
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
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      inProgress ||
      project.images.length !== rawImages.imagesRaw.length ||
      project.progressReportImages.length !== rawImages.progressReportRaw.length
    ) {
      return;
    }

    if (uploadReady && !isImageUploading) {
      (async () => {
        const reqObj = {
          ...project,
        };
        // console.log("REQ: ", reqObj);
        // setIsLoading(false);
        // return;
        setInProgress(true);
        await addDoc(projectsCollectionRef, reqObj).then((res) => {
          setIsLoading(false);
          dispatch(addProject({ ...reqObj, id: res.id }));
          setUploadReady(false);
          // console.log("RESPONSE: ", res);
          setInProgress(false);
          router.push(`/admin/projects`);
        });
      })();
    }
  }, [
    uploadReady,
    isImageUploading,
    project,
    dispatch,
    inProgress,
    rawImages,
    router,
  ]);

  //   const handleSubmit = async () => {
  //     const reqObj = {
  //       ...project,
  //     };
  //     setIsLoading(true);
  //     await addDoc(projectsCollectionRef, reqObj).then((res) => {
  //       //   setIsLoading(false);
  //       //   dispatch(
  //       //     addProperty({ ...reqObj, id: res.id, userId: user?.id ?? "" })
  //       //   );
  //       //   setUploadReady(false);
  //       //   router.push(`/admin`);
  //     });
  //   };
  //   console.log("IMG URIS: ", project.images);
  return {
    handleUpdateProject,
    // handleAddImage,
    handleSubmit,
    handleUpdateImages,
    isLoading,
    isImageUploading,
    project,
    handleUpdateRawImages,
    rawImages,
    setProject,
  };
};
