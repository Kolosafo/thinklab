"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { propertyCollectionRef } from "@/firebase";
import { useSaveImageToFirebase } from "@/hooks/useSaveImageToFirebase";
import { states } from "@/lib/constants/states";
import { addProperty } from "@/redux/properties/propertySlice";
import { AppDispatch, IRootState } from "@/redux/store";
import { getRandomRealEstateCompany } from "@/utils/helpers";
import { addDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
function New() {
  const { uploadImgToFirebase, isImageUploading } = useSaveImageToFirebase();
  const { company, user, isLogged } = useSelector(
    (store: IRootState) => store.user
  );

  const [isLoading, setIsLoading] = useState(false);
  const [uploadReady, setUploadReady] = useState(false);
  const [property, setProperty] = useState<PropertyListing>({
    state: "",
    address: "",
    bedrooms: 0,
    price: 0,
    description: "",
    size: "",
    images: [],
    saveImageUris: [],
    company: company?.name ?? "",
  });

  const handleUpdatedProperty = (
    field: keyof PropertyListing,
    value: string | number | File[]
  ) => {
    setProperty((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateImages = (img: string) => {
    setProperty((prev) => {
      return { ...prev, saveImageUris: [...prev.saveImageUris, img] };
    });
  };

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await uploadImgToFirebase({
      images: property.images,
      handleImageUri: handleUpdateImages,
    });
    setUploadReady(true);
  };

  useEffect(() => {
    if (
      uploadReady &&
      !isImageUploading &&
      property.saveImageUris.length === property.images.length
    ) {
      (async () => {
        const reqObj = {
          state: property.state,
          address: property.address,
          bedrooms: property.bedrooms,
          price: property.price,
          description: property.description,
          images: property.saveImageUris,
          size: property.size,
          company: property.company ?? getRandomRealEstateCompany(),
          status: "pending" as "pending" | "approved" | "rejected",
        };
        await addDoc(propertyCollectionRef, reqObj).then((res) => {
          setIsLoading(false);
          dispatch(
            addProperty({ ...reqObj, id: res.id, userId: user?.id ?? "" })
          );
          setUploadReady(false);
          router.push(`/admin`);
        });
      })();
    }
  }, [uploadReady, isImageUploading, property, dispatch, router, user?.id]);

  useEffect(() => {
    if (!isLogged) {
      router.push("/auth/login");
    }
  }, [isLogged, router]);
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <span className="text-3xl font-semibold">New Property Listing</span>
        <div className="space-y-2">
          <Label htmlFor="name">Description</Label>
          <Textarea
            id="description"
            onChange={(e) =>
              handleUpdatedProperty("description", e.target.value)
            }
            placeholder="Tell us about this property"
          />
          {/* {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )} */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select
            onValueChange={(value) => handleUpdatedProperty("state", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.abbreviation} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* {errors.state && (
            <p className="text-xs text-red-500">{errors.state.message}</p>
          )} */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Address</Label>
          <Input
            id="location"
            placeholder="Where's this property located at?"
            value={property.address}
            onChange={(e) => handleUpdatedProperty("address", e.target.value)}
          />
          {/* {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )} */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">No. Of Bedroom</Label>
          <Input
            type="number"
            id="bedrooms"
            placeholder="Bedrooms"
            value={property.bedrooms}
            onChange={(e) =>
              handleUpdatedProperty("bedrooms", parseInt(e.target.value))
            }
          />
          {/* {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )} */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Property Size</Label>
          <Input
            id="size"
            placeholder="500sqm"
            value={property.size}
            onChange={(e) => handleUpdatedProperty("size", e.target.value)}
          />
          {/* {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )} */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Price</Label>
          <Input
            type="number"
            placeholder="Price"
            value={property.price}
            onChange={(e) =>
              handleUpdatedProperty("price", parseInt(e.target.value))
            }
          />
          {/* {errors.address && (
            <p className="text-xs text-red-500">{errors.address.message}</p>
          )} */}
        </div>
        {property.images.length > 0 && (
          <div className="h-60 border w-full flex flex-row space-x-4 overflow-x-scroll p-4">
            {property.images.map((img, idx) => (
              <Image
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`${img.name}-img`}
                width={400}
                height={400}
                className="object-contain rounded-2xl"
                priority
              />
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                handleUpdatedProperty(
                  "images",
                  Array.from(e.target.files || [])
                )
              }
            />
            {/* {errors.city && (
              <p className="text-xs text-red-500">{errors.city.message}</p>
            )} */}
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full mt-8">
          {isLoading && <Loader2 className="size-4 animate-spin transition" />}
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default New;
