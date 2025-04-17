"use client";

import { type AccountData, accountSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSignUp } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import { sendApplicationEmail } from "@/lib/api/application";

export default function RegisterForm() {
  const [type, setType] = useState<"text" | "password">("password");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountData>({
    resolver: zodResolver(accountSchema),
  });

  const onSuccess = async (email: string) => {
    await sendApplicationEmail(email);
    toast.success("Account created successfully!.");
    router.push("/auth/register/details");
  };
  const onError = () => {
    toast.error("Failed to create account");
  };
  const { signUpUser, signupLoading } = useSignUp({
    onSuccess,
    onError,
  });

  return (
    <Card className="w-96">
      <CardHeader className="text-center">
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Please fill in the details below.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(signUpUser)} className="space-y-6">
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} type="email" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input {...register("password")} type={type} className="pr-6" />
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
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type={type}
                className="pr-6"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="flex items-center gap-2 w-full"
            disabled={signupLoading}
          >
            {signupLoading && (
              <Loader2 className="size-4 animate-spin transition" />
            )}
            {signupLoading ? "Creating account..." : "Submit"}
          </Button>

          <p className="text-center text-muted-foreground text-xs">
            Have an account?{" "}
            <Link href="/auth/login" className="hover:text-primary underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
