/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState } from "react";
import { useSaveImageToFirebase } from "./useSaveImageToFirebase";
import { addDoc } from "firebase/firestore";
import { aboutCollectionRef } from "@/firebase";
import { useDispatch } from "react-redux";
import { addTeamMember } from "@/redux/info/infoSlice";
import { useRouter } from "next/navigation";

export type TeamMemberData = {
  id?: string;
  firstName: string;
  lastName: string;
  occupation: string;
  about: string;
  facebook?: string;
  twitter?: string;
  linkedIn?: string;
  image: string;
};

export const useCreateTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadReady, setUploadReady] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { uploadImgToFirebase, isImageUploading } = useSaveImageToFirebase();
  const [rawImage, setRawImage] = useState<any>(null);
  const [teamMember, setCreateMember] = useState<TeamMemberData>({
    firstName: "",
    lastName: "",
    occupation: "",
    about: "",
    facebook: "",
    twitter: "",
    linkedIn: "",
    image: "",
  });

  const handleUpdateProject = (
    field: keyof TeamMemberData,
    value: string | number | File[] | any
  ) => {
    setCreateMember((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const router = useRouter();

  const handleUpdateRawImages = (field: "image", value: File | null) => {
    setRawImage(value);
  };

  const handleUpdateImages = (img: any) => {
    setCreateMember((prev) => {
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
      isTeam: true,
    });

    setUploadReady(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("RAW IMAGE CHECK", teamMember.image.length, rawImage);
    if (inProgress || teamMember.image.length === 0 || !rawImage) {
      return;
    }

    if (uploadReady && !isImageUploading) {
      (async () => {
        const reqObj = {
          ...teamMember,
        };
        console.log("REQ: ", reqObj);
        // setIsLoading(false);
        // return;
        setInProgress(true);
        await addDoc(aboutCollectionRef, reqObj).then((res) => {
          setIsLoading(false);
          dispatch(addTeamMember({ ...reqObj, id: res.id }));
          setUploadReady(false);
          console.log("RESPONSE: ", res);
          setInProgress(false);
          router.push(`/about`);
        });
      })();
    }
  }, [
    uploadReady,
    isImageUploading,
    dispatch,
    inProgress,
    rawImage,
    teamMember,
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
    teamMember,
    handleUpdateRawImages,
    rawImage,
    setCreateMember,
  };
};
