import React from "react";
import Image from "next/image";
import AnimatedText from "@/components/motion/animated-text";
import { ProjectSection } from "@/components/sections/projects";

function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects-hero.jpg"
            alt="Architectural design"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/30" />
        </div>

        {/* Upward Curve Overlay */}
        <div className="absolute -bottom-40 left-0 right-0 z-10">
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
            text="Our Projects"
            className="text-4xl md:text-6xl font-bold text-white mb-8"
            delay={0.3}
            highlight
          />
          <AnimatedText
            text="Explore our portfolio of innovative and inspiring designs."
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12"
            delay={0.5}
          />
        </div>
      </section>

      {/* Projects Section */}
      <ProjectSection />
    </div>
  );
}

export default Page;
