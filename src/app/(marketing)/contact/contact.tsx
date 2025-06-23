"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Container from "@/components/shared/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useGetContactUs } from "@/hooks/useGetContactUs";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import LoadingPage from "../loading";

export default function ContactPage() {
  const { fetchContactUs } = useGetContactUs();
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const { contactUs } = useSelector((store: IRootState) => store.companyInfo);

  useEffect(() => {
    fetchContactUs();
  }, []);
  return contactUs.headerTitle ? (
    <div className="min-h-screen">
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={contactUs.mainImg ? contactUs.mainImg : "/contact-hero.jpg"}
            alt="Book a meeting"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/30" />
        </div>

        {/* Upward Curve Overlay */}
        <div className="absolute -bottom-10 left-0 right-0 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,40 C480,120 960,120 1440,40 L1440,320 L0,320 Z"
            ></path>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-10 text-center"></div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-24 bg-white">
        <Container>
          <div className="max-w-2xl mb-16 text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              {contactUs.headerTitle}
            </h2>
            <p className="text-base text-gray-600">{contactUs.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              variants={variants}
              className="space-y-6"
            >
              <div>
                <Label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description <span className="text-gray-500">(Optional)</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Submit Inquiry
                </Button>
              </div>
            </motion.form>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              variants={variants}
              className="relative h-full min-h-[400px] hidden md:block"
            >
              <Image
                src={contactUs.subImg ? contactUs.subImg : "/contact-image.jpg"}
                alt="Modern building interior"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  ) : (
    <LoadingPage />
  );
}
