/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContactUs } from "@/hooks/useContactUs";
import { Loader2 } from "lucide-react";
import React from "react";

function ContactUs() {
  const {
    isLoading,
    handleSubmit,
    handleUpdateRawImages,
    setContactUs,
    contactUsData,
  } = useContactUs();
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <span className="text-3xl font-semibold">About Us</span>

        <span className="text-3xl font-semibold">Title</span>
        <Input
          className="mb-0"
          id="headerTitle"
          placeholder="Contact Us Header Title"
          value={contactUsData.headerTitle}
          onChange={(e) =>
            setContactUs((prev) => ({
              ...prev,
              headerTitle: e.target.value,
            }))
          }
        />

        <span className="text-3xl font-semibold">Description</span>
        <Input
          className="mb-0"
          id="description"
          placeholder="Description"
          value={contactUsData.description}
          onChange={(e) =>
            setContactUs((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />

        <span className="text-3xl font-semibold mt-2">Background Image</span>
        <div className="grid grid-cols-2 gap-4 mb-1">
          <div className="space-y-2">
            {/* <Label htmlFor="city">Member Image</Label> */}
            <Input
              type="file"
              accept="image"
              onChange={(e) =>
                handleUpdateRawImages(
                  "mainImgRaw",
                  e.target.files ? e.target.files[0] : null
                  // "progressReport"
                )
              }
            />
          </div>
        </div>

        <span className="text-3xl font-semibold mt-1">Second Image</span>
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="space-y-2">
            {/* <Label htmlFor="city">Member Image</Label> */}
            <Input
              type="file"
              accept="image"
              onChange={(e) =>
                handleUpdateRawImages(
                  "subImgRaw",
                  e.target.files ? e.target.files[0] : null
                  // "progressReport"
                )
              }
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-8">
          {isLoading && <Loader2 className="size-4 animate-spin transition" />}
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default ContactUs;
