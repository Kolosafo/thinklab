"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { propertyCollectionRef } from "@/firebase";
import { loadProperties } from "@/redux/properties/propertySlice";
import { IRootState } from "@/redux/store";
import { PropertyType } from "@/types";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetProperties = () => {
  const { user } = useSelector((store: IRootState) => store.user);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleGetProperties = async () => {
    setIsLoading(true);
    const data = await getDocs(propertyCollectionRef).catch(() => {
      setErrorMsg("An Unknown Error Occured!");
    });
    const allProperties: any = data?.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const filterPropertiesByUser = allProperties.filter(
      (prop: PropertyType) => prop.userId === user?.id
    );
    // console.log("GUESTS: ", allGuests);
    dispatch(loadProperties(filterPropertiesByUser));
    setIsLoading(false);
  };
  useEffect(() => {}, []);
  return {
    isFetchingProperties: isLoading,
    fetchProperties: handleGetProperties,
    error: errorMsg,
  };
};
