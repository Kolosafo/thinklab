/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import {
  LandingDataType,
  loadCompanyInfo,
  loadLandingData,
  updateProjectTitle,
} from "@/redux/info/infoSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FullAboutData } from "@/app/(admin)/admin/about/aboutForm";
import { useSaveImageToFirebase } from "./useSaveImageToFirebase";

export type CompanyInfoData = {
  id?: string;
  about: string;
  projectListingData: string;
};

export const useCompanyInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [uploadReady, setUploadReady] = useState(false);
  const dispatch = useDispatch();
  const [fullAboutInfo, setFullAbout] = useState<FullAboutData>({
    aboutTitle: "",
    aboutInfo: "",
    mission: "",
    vision: "",
    projectsCompleted: 0,
    clients: 0,
    expYear: 0,
    awardWon: 0,
    teamMemberSize: 0,
    homesBuild: 0,
    image: "",
  });

  const { uploadImgToFirebase, isImageUploading } = useSaveImageToFirebase();
  const [rawImage, setRawImage] = useState<any>(null);

  const handleUpdateRawImages = (field: "image", value: File | null) => {
    setRawImage(value);
  };

  const handleUpdateImages = (img: any) => {
    setFullAbout((prev) => {
      const returnObject = {
        ...prev,
        image: img,
      };
      return returnObject;
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await uploadImgToFirebase({
      images: [rawImage],
      handleImageUri: (res) => handleUpdateImages(res),
    });

    setUploadReady(true);
  };

  const handleUpdateAbout = async (data: FullAboutData) => {
    const docRef = doc(db, "thinklab-site-info", "WUKxaJOlpBl3zMwXfwfO");
    setIsLoading(true);
    const newData = { ...data };
    await setDoc(docRef, newData)
      .then(async () => {
        setIsLoading(false);
        dispatch(loadCompanyInfo(data));
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

  const handleUpdateProjectListingData = async (e: any, data: string) => {
    const docRef = doc(db, "thinklab-site-info", "SdAJf8JIxjnOeBWEDxC3");
    e.preventDefault();
    setIsLoading(true);
    const newData = { projectTitle: data };
    await setDoc(docRef, newData)
      .then(async () => {
        setIsLoading(false);
        dispatch(updateProjectTitle(data));
        toast.success("Success!");
        router.push("/admin");
      })
      .catch((e) => {
        console.log("ERROR", e);
        toast.error("An unknown error occured! Try Again!");
        setIsLoading(false);
      });
    // setIsLoading(false);
  };

  useEffect(() => {
    // console.log("RAW IMAGE CHECK", teamMember.image.length, rawImage);
    if (fullAboutInfo.image.length === 0 || !rawImage) {
      return;
    }

    if (uploadReady && !isImageUploading) {
      (async () => {
        await handleUpdateAbout(fullAboutInfo);
      })();
    }
  }, [uploadReady, isImageUploading, dispatch, rawImage, fullAboutInfo]);

  const [landingData, setLandingData] = useState<LandingDataType>({
    title: "",
    description: "",
    bgVideo: null,
  });
  const [isLandingReady, setLandingReady] = useState(false);

  const handleUpdateLandingVideo = (img: any) => {
    setLandingData((prev) => {
      const returnObject = {
        ...prev,
        bgVideo: img,
      };
      return returnObject;
    });
  };
  const handleSubmitLandingData = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await uploadImgToFirebase({
      images: [rawImage],
      handleImageUri: (res) => handleUpdateLandingVideo(res),
    });

    setLandingReady(true);
  };
  const handleUpdateLandingData = async (data: LandingDataType) => {
    const docRef = doc(db, "thinklab-site-info", "MN7CNdgysZkSnSGJOwN3");
    setIsLoading(true);
    const newData = { ...data };
    await setDoc(docRef, newData)
      .then(async () => {
        setIsLoading(false);
        dispatch(loadLandingData(data));
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
    // console.log("RAW IMAGE CHECK", teamMember.image.length, rawImage);
    if (landingData.bgVideo === null) {
      return;
    }

    if (isLandingReady && !isImageUploading) {
      (async () => {
        await handleUpdateLandingData(landingData);
      })();
    }
  }, [isLandingReady, isImageUploading, rawImage, landingData]);

  return {
    handleUpdateAbout,
    setFullAbout,
    fullAboutInfo,
    handleSubmit,
    handleUpdateRawImages,
    handleUpdateProjectListingData,
    isLoading,
    handleUpdateLandingData,
    setLandingData,
    landingData,
    handleSubmitLandingData
  };
};
