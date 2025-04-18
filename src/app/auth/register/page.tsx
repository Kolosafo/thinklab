import Container from "@/components/shared/container";
import React from "react";
import DetailsPage from "./details/page";
import SignUpImage from "@/components/auth/SignUpImage";
import Header from "@/components/shared/header";

function RegisterPage() {
  return (
    <>
      <Header />
      <Container className="py-12 px-0 border-2 flex w-screen mx-0 max-w-screen md:px-0 lg:px-0">
        <div className="w-[70%] mr-2 md:block hidden">
          <SignUpImage />
        </div>
        <DetailsPage _className="md:px-0 px-6 md:mt-0 mt-6" />
      </Container>
    </>
  );
}

export default RegisterPage;
