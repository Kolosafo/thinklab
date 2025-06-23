"use client";

import AnimatedImage from "@/components/motion/animated-image";
import AnimatedText from "@/components/motion/animated-text";
import AnimatedCounter from "@/components/motion/animated-counter";
import { ProjectSection } from "@/components/sections/projects";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Building2,
  // Users,
  Award,
  // Leaf,
  // Hammer,
  // PaintBucket,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container";
import { useGetCompanyInfo } from "@/hooks/useGetCompanyInfo";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import LoadingPage from "./loading";
import OurTeam from "./new-about/ourTeam";

// Services data
// const services = [
//   {
//     icon: Building2,
//     title: "Property Development",
//     description:
//       "From concept to completion, we develop premium residential and commercial properties that set new standards in modern living.",
//     image:
//       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
//   },
//   {
//     icon: Hammer,
//     title: "Construction Management",
//     description:
//       "Expert project management ensuring timely delivery, quality control, and cost-effective construction solutions.",
//     image:
//       "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
//   },
//   {
//     icon: PaintBucket,
//     title: "Architectural Design",
//     description:
//       "Innovative architectural solutions that blend aesthetic appeal with functional design and sustainable practices.",
//     image:
//       "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
//   },
//   {
//     icon: Users,
//     title: "Real Estate Investment",
//     description:
//       "Strategic investment opportunities in high-growth markets with proven returns and long-term value appreciation.",
//     image:
//       "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
//   },
//   {
//     icon: Award,
//     title: "Property Management",
//     description:
//       "Comprehensive property management services ensuring optimal performance and value maximization of your investments.",
//     image:
//       "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop",
//   },
//   {
//     icon: Leaf,
//     title: "Sustainable Solutions",
//     description:
//       "Eco-friendly building practices and green technologies that reduce environmental impact while enhancing livability.",
//     image:
//       "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop",
//   },
// ];

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//   },
// };

export default function Home() {
  const { fetchCompanyInfo } = useGetCompanyInfo();

  const { companyInfo, landingInfo } = useSelector(
    (store: IRootState) => store.companyInfo
  );

  function splitTextInTwo(text: string): [string, string] {
    const words = text.trim().split(" ");
    const middleIndex = Math.floor(words.length / 2);
    const left = words.slice(0, middleIndex).join(" ");
    const right = words.slice(middleIndex).join(" ");
    return [left, right];
  }

  // console.log("DATA: ", companyInfo);
  useEffect(() => {
    fetchCompanyInfo();
  }, []);
  return companyInfo ? (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={landingInfo.bgVideo ?? "/newSky.GIF"}
            alt="Modern buildings"
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-red-900/30" />
        </div>

        {/* Wave Overlay */}
        <div className="absolute -bottom-30 left-0 right-0 z-10">
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
        <div className="container mx-auto px-4 z-10 text-center">
          <AnimatedText
            text={
              landingInfo.title
                ? splitTextInTwo(landingInfo.title)[0]
                : "Welcome to a New"
            }
            className="text-4xl md:text-5xl font-medium text-white mb-2 font-serif"
            delay={0.3}
          />
          <AnimatedText
            text={
              landingInfo.title
                ? splitTextInTwo(landingInfo.title)[1]
                : "Era of Smart Living."
            }
            className="text-4xl md:text-5xl font-medium text-white mb-8 font-serif"
            delay={0.5}
            highlight
          />
          <AnimatedText
            text={
              landingInfo.description
                ? landingInfo.description
                : "Step into a realm of unparalleled grandeur, where the future of luxury is elegantly crafted today"
            }
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12"
            delay={0.7}
          />

          <Link
            href={"/projects"}
            className={cn(
              "group inline-flex items-center justify-between rounded-full bg-white px-8 py-4",
              "w-full sm:w-auto mx-auto"
            )}
          >
            <span className="mr-3 text-base text-black">Explore projects</span>
            <div className="relative size-6 shrink-0 rounded-full bg-primary">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-4" />
                <ArrowRight className="absolute h-4 w-4 -translate-x-6 text-white transition-transform duration-300 group-hover:translate-x-0" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full py-24 bg-white overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}

            <AnimatedImage>
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                  {companyInfo.image && (
                    <Image
                      src={companyInfo.image}
                      alt="Modern Architecture"
                      fill
                      className="object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Floating Stats Cards */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="size-8 text-primary" />
                      <div>
                        <div className="font-bold text-2xl text-primary">
                          <AnimatedCounter
                            from={0}
                            to={companyInfo.homesBuild}
                          />
                          <span className="text-yellow-500">+</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                          Homes Built
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="size-8 text-yellow-500" />
                      <div>
                        <div className="font-bold text-2xl text-primary">
                          <AnimatedCounter
                            from={0}
                            to={companyInfo.projectsCompleted}
                          />
                          <span className="text-yellow-500">+</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                          Projects
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </AnimatedImage>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <AnimatedText
                  text={
                    companyInfo.aboutTitle
                      ? splitTextInTwo(companyInfo.aboutTitle)[0]
                      : ""
                  }
                  className="text-4xl md:text-5xl font-medium font-serif text-gray-900 mb-4"
                  delay={0.1}
                />
                <AnimatedText
                  text={
                    companyInfo.aboutTitle
                      ? splitTextInTwo(companyInfo.aboutTitle)[1]
                      : ""
                  }
                  className="text-4xl md:text-5xl font-medium font-serif text-primary mb-8"
                  delay={0.2}
                />
              </div>

              <AnimatedText
                text={
                  companyInfo.aboutInfo
                    ? splitTextInTwo(companyInfo.aboutInfo)[0]
                    : ""
                }
                className="text-lg text-gray-600 leading-relaxed mb-6"
                delay={0.3}
              />

              <AnimatedText
                text={
                  companyInfo.aboutInfo
                    ? splitTextInTwo(companyInfo.aboutInfo)[1]
                    : ""
                }
                className="text-lg text-gray-600 leading-relaxed mb-8"
                delay={0.4}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  href={"/about"}
                  className={cn(
                    "group inline-flex items-center justify-between rounded-full bg-primary px-8 py-4",
                    "w-full sm:w-auto mx-auto"
                  )}
                >
                  <span className="mr-3 text-base text-white">Learn More</span>
                  <div className="relative size-6 shrink-0 rounded-full bg-white">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                      <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-4" />
                      <ArrowRight className="absolute h-4 w-4 -translate-x-6 text-primary transition-transform duration-300 group-hover:translate-x-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Projects Section */}
      <ProjectSection />

      {/* OUR TEAM Section */}
      <OurTeam />

      {/* Call to Action */}
      <section className="w-full py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Luxury Living?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Contact us today to schedule a tour of our properties and discover
            your dream home.
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 rounded-full px-8"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  ) : (
    <LoadingPage />
  );
}
