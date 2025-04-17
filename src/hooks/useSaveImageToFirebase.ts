"use client"
import { imgStorageRef } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useSaveImageToFirebase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async ({
    images,
    handleImageUri,
  }: {
    images: File[];
    handleImageUri: (uri: string) => void;
  }) => {
    const sendFirebase = await images.map(async (img) => {
      setIsLoading(true);
      const imgRef = ref(imgStorageRef, `property/${uuidv4()}`);
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
