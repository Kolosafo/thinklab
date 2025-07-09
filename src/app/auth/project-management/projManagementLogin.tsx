/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/sonner";

import { EyeClosedIcon, EyeIcon, Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import { ACCESS_CATEGORIES } from "../../(admin)/admin/access/Access";

function MarketingLogin() {
  const router = useRouter();
  const [type, setType] = useState<"text" | "password">("password");

  const onSuccess = async () => {
    toast.success("Login successful!");
    router.push("/admin");
  };
  const onError = () => {
    toast.error("Invalid credentials");
  };
  const { handleAdminLogin, error, isLoading } = useAdminLogin({
    onSuccess,
    onError,
  });

  const [data, setData] = useState({
    username: "",
    password: "",
    type: ACCESS_CATEGORIES.projectManagement,
  });

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Project Management Admin Dashboard</CardTitle>
        <CardDescription>Enter your details to login.</CardDescription>
      </CardHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleAdminLogin({ ...data });
        }}
        className="space-y-6"
      >
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              onChange={(val) => {
                setData({ ...data, username: val.target.value });
              }}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Input
                onChange={(val) => {
                  setData({ ...data, password: val.target.value });
                }}
                type={type}
                className="pr-6"
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
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="flex items-center gap-2 w-full"
            disabled={isLoading}
          >
            {isLoading && (
              <Loader2 className="size-4 animate-spin transition" />
            )}
            {isLoading ? "Logging In..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default MarketingLogin;
