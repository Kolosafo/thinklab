/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { loadContactUs } from "@/redux/info/infoSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSaveImageToFirebase } from "./useSaveImageToFirebase";

export type contactUsType = {
  headerTitle: string;
  description: string;
  mainImg: string;
  subImg: string;
};

export const useContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [uploadReady, setUploadReady] = useState(false);
  const [rawImages, setRawImages] = useState({
    mainImgRaw: "" as any as File,
    subImgRaw: "" as any as File,
  });
  const [inProgress, setInProgress] = useState(false);

  const dispatch = useDispatch();
  const [contactUsData, setContactUs] = useState<contactUsType>({
    headerTitle: "",
    description: "",
    mainImg: "",
    subImg: "",
  });

  const { uploadImgToFirebase, isImageUploading } = useSaveImageToFirebase();

  //   const handleUpdateContactUsValue = (
  //     field: keyof contactUsType,
  //     value: string | number | File[] | any
  //   ) => {
  //     setContactUs((prev) => ({
  //       ...prev,
  //       [field]: value,
  //     }));
  //   };
  const handleUpdateRawImages = (
    field: "mainImgRaw" | "subImgRaw",
    value: File | null | any
  ) => {
    setRawImages((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateImages = (img: any, fieldName: "mainImg" | "subImg") => {
    setContactUs((prev) => {
      const returnObject = {
        ...prev,
        [fieldName]: img,
      };
      return returnObject;
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("RAW IMAGES: ", rawImages.mainImgRaw);
    await uploadImgToFirebase({
      images: [rawImages.mainImgRaw],
      handleImageUri: (res) => handleUpdateImages(res, "mainImg"),
      //   isProject: true,
    });

    await uploadImgToFirebase({
      images: [rawImages.subImgRaw],
      handleImageUri: (res) => handleUpdateImages(res, "subImg"),
      //   isProject: true,
    });
    setUploadReady(true);
  };

  const handleUpdateContactUs = async (data: contactUsType) => {
    const docRef = doc(db, "contactUs", "uR1BrKJuo158VsOcJstQ");
    setIsLoading(true);
    const newData = { ...data };
    await setDoc(docRef, newData)
      .then(async () => {
        setIsLoading(false);
        dispatch(loadContactUs(data));
        toast.success("Success!");
        router.push("/admin");
      })
      .catch((e) => {
        console.log("ERROR", e);
        toast.error("An unknown error occured! Try Again!");
        setIsLoading(false);
        router.push("/admin");
      });
    // setIsLoading(false);
  };
  useEffect(() => {
    console.log("INprogress: ", inProgress);
    console.log("subImg: ", contactUsData.subImg);
    console.log("mainImg: ", contactUsData.mainImg);
    console.log("mainImgRaw: ", rawImages.mainImgRaw);
    console.log("subImgRaw: ", rawImages.subImgRaw);
    if (
      inProgress ||
      !contactUsData.mainImg ||
      !contactUsData.subImg ||
      !rawImages.mainImgRaw ||
      !rawImages.subImgRaw
    ) {
      return;
    }

    if (uploadReady && !isImageUploading) {
      (async () => {
        const reqObj = {
          ...contactUsData,
        };
        // console.log("REQ: ", reqObj);
        // setIsLoading(false);
        // return;
        setInProgress(true);
        await handleUpdateContactUs(reqObj).then(() => {
          setIsLoading(false);
          setUploadReady(false);
          setInProgress(false);
        });
      })();
    }
  }, [
    uploadReady,
    isImageUploading,
    contactUsData,
    dispatch,
    inProgress,
    rawImages,
    router,
  ]);

  return {
    handleSubmit,
    setContactUs,
    handleUpdateRawImages,
    isLoading,
    contactUsData,
  };
};
