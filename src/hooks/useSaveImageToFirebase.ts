"use client";
import { imgStorageRef } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useSaveImageToFirebase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async ({
    images,
    handleImageUri,
    isProject,
    isTeam,
  }: {
    images: File[];
    handleImageUri: (uri: string) => void;
    isProject?: boolean;
    isTeam?: boolean;
  }) => {
    const sendFirebase = await images.map(async (img) => {
      console.log("UPLOAD IMAGE SENDER: ", img);
      setIsLoading(true);
      const imgRef = ref(
        imgStorageRef,
        isProject
          ? `projects/${uuidv4()}`
          : isTeam
            ? `team/${uuidv4()}`
            : `property/${uuidv4()}`
      );
      try {
        const snapshot = await uploadBytes(imgRef, img);
        const url = await getDownloadURL(snapshot.ref);
        handleImageUri(url);
        setIsLoading(false);

        return url;
      } catch (err) {
        console.error("Upload failed:", err);
        setIsLoading(false);
        return null;
      }
    });
    return sendFirebase;
  };

  return { uploadImgToFirebase: handleSave, isImageUploading: isLoading };
};
