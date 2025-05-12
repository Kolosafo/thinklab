"use client";

import React, { useState } from "react";
import { projects } from "@/data/projects";
import Container from "@/components/shared/container";
import Image from "next/image";
import AnimatedText from "@/components/motion/animated-text";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BedDouble,
  Bath,
  Square,
  AreaChartIcon,
  ClockIcon,
} from "lucide-react";
import { use } from "react";
import { BookButton } from "@/components/sections/projects";
import MortgageCalculator from "@/components/ui/MortgageCalculator";
// import BookingForm from "@/components/ui/BookingForm";
// import BookingForm from "@/components/ui/BookingForm";

const iconMap: { [key: string]: React.ElementType } = {
  BedIcon: BedDouble,
  BathIcon: Bath,
  CarIcon: Square,
  AreaIcon: AreaChartIcon,
  ClockIcon: ClockIcon,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  console.log("SLUG: ", slug);
  const project = projects.find((item) => item.id === slug);

  const [filter, setFilter] = useState<"all" | "interior" | "exterior">("all");

  // if (!project) {
  //   notFound();
  // }

  const filteredGallery = project?.gallery.filter(
    (item) => filter === "all" || item.type === filter
  );

  const galleryVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen">
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project?.heroImage ?? ""}
            alt={project?.name ?? ""}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
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
        <div className="container mx-auto px-4 z-10 text-center">
          <AnimatedText
            text="Project summary"
            className="text-4xl md:text-6xl font-bold text-white"
            delay={0.3}
            highlight
          />
        </div>
      </section>

      <section className="py-20 bg-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <motion.div
              className="md:col-span-2 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.div variants={descriptionVariants}>
                <p className="text-primary font-semibold mb-2 text-sm uppercase tracking-wider">
                  Project
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {project?.name}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {project?.fullDescription}
                </p>
              </motion.div>

              {project?.stats && project?.stats.length > 0 && (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 pt-4"
                  variants={{
                    visible: { transition: { staggerChildren: 0.2 } },
                  }}
                >
                  {project?.stats.map((stat) => {
                    const IconComponent = iconMap[stat.icon];
                    return (
                      <motion.div
                        key={stat.label}
                        className="flex items-center space-x-3"
                        variants={statItemVariants}
                      >
                        {IconComponent ? (
                          <IconComponent className="h-8 w-8 text-primary flex-shrink-0" />
                        ) : (
                          <div className="h-8 w-8 bg-gray-200 rounded" />
                        )}
                        <div>
                          <p className="font-bold text-xl text-gray-900">
                            {stat.value}
                            <span className="text-sm font-medium text-gray-500 ml-1">
                              {stat.unit}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            {stat.label}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src={(project?.gallery?.[1]?.src || project?.image) ?? ""}
                alt={`${project?.name} detail`}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {project?.gallery && project?.gallery.length > 0 && (
        <section className="py-20 bg-gray-50 flex md:flex-row flex-col">
          <Container className="md:w-[75%] w-full">
            <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 text-primary">
                  Gallery
                </h2>
                <p className="font-semibold mb-1 text-sm uppercase tracking-wider">
                  Sights from the Project
                </p>
              </div>
              <div className="flex justify-center space-x-2 rounded-full bg-gray-200 p-1">
                {(["all", "exterior", "interior"] as const).map((type) => (
                  <Button
                    key={type}
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilter(type)}
                    className={cn(
                      "rounded-full capitalize transition-colors duration-200 px-4 py-1.5",
                      filter === type
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:bg-gray-300 text-gray-700"
                    )}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <motion.div
              layout
              className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2 "
            >
              <AnimatePresence mode="popLayout">
                {filteredGallery?.map((image, id) => (
                  <motion.div
                    key={id}
                    layout
                    variants={galleryVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="relative aspect-video w-full overflow-hidden group"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt || project?.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </Container>
          <div className="md:mr-4 mr-0">
          <MortgageCalculator projectName={project?.name} propertyCost={35000000} /> 
          </div>
          {/* <MortgageCalculator projectName={project?.name} /> */}
        </section>
      )}

      {project?.gallery && project?.gallery.length > 0 && (
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 text-primary">
                  Progress Report
                </h2>
                <p className="font-semibold mb-1 text-sm uppercase tracking-wider">
                  Weekly Progress towards result
                </p>
              </div>
              <div className="flex justify-center space-x-2 rounded-full bg-gray-200 p-1">
                {(["all", "exterior", "interior"] as const).map((type) => (
                  <Button
                    key={type}
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilter(type)}
                    className={cn(
                      "rounded-full capitalize transition-colors duration-200 px-4 py-1.5",
                      filter === type
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:bg-gray-300 text-gray-700"
                    )}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <motion.div
              layout
              className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2 "
            >
              <AnimatePresence mode="popLayout">
                {project?.construction?.map((image, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    variants={galleryVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="relative aspect-video w-full overflow-hidden group"
                  >
                    <Image
                      src={image}
                      alt={`${idx}` || project?.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </Container>
        </section>
      )}

      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Other Projects
          </h2>
          <div className="grid auto-rows-[280px] grid-cols-1 gap-6">
            {projects.map((item, index) => (
              <motion.div
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                  visible: { opacity: 1, x: 0 },
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-white",
                  "md:col-span-2 md:row-span-2"
                )}
              >
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                  {/* Text container */}
                  <div className="text-white">
                    <h3 className="mb-2 text-2xl font-semibold">{item.name}</h3>
                    <p className="text-sm text-white/80">{item.description}</p>
                  </div>
                  {/* Button container */}
                  <div className="shrink-0">
                    <BookButton href={`/projects/${item.id}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
