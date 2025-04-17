import React from "react";
import Application from "@/components/admin/Application";
const Page = () =>
  typeof window !== undefined ? <Application /> : <div></div>;

export default Page;
