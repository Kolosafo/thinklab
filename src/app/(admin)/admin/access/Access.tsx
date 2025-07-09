/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { motion } from "motion/react";
import AccessCategoryCard from "@/components/access/AccessCategoryCard";
import { useGetAdminLogins } from "@/hooks/useGetAdminLogins";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useCheckAccess } from "@/hooks/useCheckAccess";

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

export enum ACCESS_CATEGORIES {
  legal = "Legal",
  projectManagement = "Project Management",
  marketing = "Marketing",
  communications = "Communications",
}
function Access() {
  const { isMasterAdmin } = useCheckAccess();
  const { handleUpdateLogin, isLoading } = useGetAdminLogins();
  const [selectedCategory, setSelectedCategory] =
    useState<ACCESS_CATEGORIES | null>(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [type, setType] = useState<"text" | "password">("password");

  const handleChange = (field: "username" | "password", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { username: string; password: string } = {
      username: "",
      password: "",
    };
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSuccess = () => {
    setSelectedCategory(null);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    if (!validate()) return;
    setIsSubmitting(true);

    // Simulate API
    const formatDepartment =
      selectedCategory === ACCESS_CATEGORIES.communications
        ? "communications"
        : selectedCategory === ACCESS_CATEGORIES.legal
          ? "legal"
          : selectedCategory === ACCESS_CATEGORIES.marketing
            ? "marketing"
            : "projectManagement";
    handleUpdateLogin({
      onSuccess: handleSuccess,
      data: { ...formData, department: formatDepartment },
      category: selectedCategory,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  return !isMasterAdmin ? (
    <span className="text-xl mt-20">YOU DO NOT HAVE ACCESS TO THIS PAGE</span>
  ) : (
    <>
      <h1 className="self-center text-center text-xl font-semibold mt-8 mb-4">
        Manage Access
      </h1>
      {!selectedCategory ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Object.values(ACCESS_CATEGORIES).map((cat) => (
            <AccessCategoryCard
              key={cat}
              category={cat}
              onClick={(c) => setSelectedCategory(c as ACCESS_CATEGORIES)}
            />
          ))}
        </motion.div>
      ) : (
        <div className="w-full max-w-md mx-auto mt-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Login for {selectedCategory}
            </h2>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="relative">
              <Input
                onChange={(e) => handleChange("password", e.target.value)}
                type={type}
                className="pr-6"
                placeholder="Enter password"
                value={formData.password}
                id="password"
              />
              <button
                type="button"
                title="toggle password visibility"
                onClick={() =>
                  setType(type === "password" ? "text" : "password")
                }
                className="absolute top-1/2 right-4 transform -translate-y-1/2 group"
              >
                {type === "password" ? (
                  <EyeClosedIcon className="size-4 text-muted-foreground group-hover:text-primary" />
                ) : (
                  <EyeIcon className="size-4 text-muted-foreground group-hover:text-primary" />
                )}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full mt-4"
            >
              {isSubmitting ? "Processing..." : "Save"}
            </Button>
            <Button
              type="reset"
              disabled={isSubmitting || isLoading}
              className="w-full mt-4 bg-gray-500"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory(null);
              }}
            >
              {isSubmitting ? "Processing..." : "Cancel"}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default Access;
