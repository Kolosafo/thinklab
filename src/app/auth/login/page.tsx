import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
};

async function Page() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Page;
