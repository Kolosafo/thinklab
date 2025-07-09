/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
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
import { Button } from "../ui/button";
// import { useLogin } from "@/hooks/useLogin";
import { useDispatch, useSelector } from "react-redux";
import {
  // handleUpdateCompany,
  // login,
  handleMasterAdminLogin,
} from "@/redux/user/userSlice";
import { IRootState } from "@/redux/store";
import { useRouter } from "next/navigation";
// import { useGetApplications } from "@/hooks/useGetApplications";
// import { loadAgent } from "@/redux/agent/agentSlice";

function LoginForm() {
  // const { fetchApplications, checkIsAgent } = useGetApplications();

  const router = useRouter();
  const [type, setType] = useState<"text" | "password">("password");
  const dispatch = useDispatch();
  const { masterAdminLogin } = useSelector((store: IRootState) => store.user);

  // const onSuccess = async ({
  //   loginData,
  //   companyData,
  // }: {
  //   loginData: any;
  //   companyData: any;
  // }) => {
  //   const agents = await fetchApplications();
  //   // console.log("LOGIN DATA: ", loginData);
  //   const checkUser = checkIsAgent(agents, loginData.email);
  //   dispatch(login(loginData));
  //   dispatch(handleUpdateCompany(companyData));
  //   if (checkUser) {
  //     dispatch(loadAgent(checkUser));
  //   }
  //   router.push(checkUser ? "/dashboard" : "/admin");
  // };
  // const onError = () => {
  //   toast.error("Error logging you in");
  // };
  // const { handleLogin, loginError, loginLoading } = useLogin({
  //   onSuccess,
  //   onError,
  // });

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  //   const onSubmit = async (formdata: AccountData) => {
  //     try {
  //       await authClient.signIn.email(
  //         {
  //           email: formdata.email,
  //           password: formdata.password,
  //         },
  //         {
  //           onSuccess: () => {
  //             toast.success("Login Successfull");
  //             router.push("/");
  //           },
  //           onError: () => {
  //             toast.error("Invalid Password Or Email");
  //           },
  //         },
  //       );
  //     } catch (error) {
  //       toast.error("Request failed. Please try again.");
  //     }
  //   };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your details to login.</CardDescription>
      </CardHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoginError("");
          if (
            masterAdminLogin.username !== data.username ||
            masterAdminLogin.password !== data.password
          ) {
            setLoginError("Invalid Credentials");
            return;
          }
          dispatch(handleMasterAdminLogin(data));
          router.push("/admin")
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
              <Link
                href="/forgot"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Forgot password?
              </Link>
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
            {loginError && (
              <p className="text-destructive text-sm">{loginError}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="flex items-center gap-2 w-full"
            // disabled={loginLoading}
          >
            {/* {loginLoading && (
              <Loader2 className="size-4 animate-spin transition" />
            )} */}
            {"Login"}
            {/* {loginLoading ? "Logging In..." : "Login"} */}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default LoginForm;
