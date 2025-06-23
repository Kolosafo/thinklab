"use client";

import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./contact-us"), {
  ssr: false,
});

export default function Page() {
  return <ContactForm />;
}
