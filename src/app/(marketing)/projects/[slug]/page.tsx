"use client";

import React, { useEffect, useState } from "react";
// import { projects } from "@/data/projects";
import Container from "@/components/shared/container";
import Image from "next/image";
// import AnimatedText from "@/components/motion/animated-text";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  // BedDouble,
  // Bath,
  // Square,
  // AreaChartIcon,
  // ClockIcon,
  FileTextIcon,
  PhoneIcon,
  // HomeIcon,
  MapPin,
} from "lucide-react";
import { use } from "react";
import { BookButton } from "@/components/sections/projects";
// import AnimatedCounter from "@/components/motion/animated-counter";
import { ProjectFeaturesCarousel } from "@/components/sections/project-features";
import MortgageCalculator from "@/components/ui/MortgageCalculator";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { ProjectCreationData } from "@/hooks/useCreateProject";
import LoadingPage from "../../loading";

// const iconMap: { [key: string]: React.ElementType } = {
//   BedIcon: BedDouble,
//   BathIcon: Bath,
//   CarIcon: Square,
//   AreaIcon: AreaChartIcon,
//   ClockIcon: ClockIcon,
// };

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  // const project = projects[0];
  const [project, setProject] = useState<ProjectCreationData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "Highlight" | "Progress Report">(
    "all"
  );
  const { projects } = useSelector((store: IRootState) => store.projects);

  useEffect(() => {
    setIsLoading(true);
    const findProj = projects.find((item) => item.id === slug);
    if (findProj) {
      setProject(findProj);
      setNotFound(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setNotFound(true);
  }, [projects, slug]);

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

  // const statItemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  // };

  return isLoading ? (
    <LoadingPage />
  ) : !project && notFound ? (
    <div className="h-[70vh] flex items-center justify-center">
      <span className="text-3xl text-red-500">PROJECT NOT FOUND</span>
    </div>
  ) : (
    project && (
      <div className="min-h-screen">
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.images[0]}
              alt={project.title}
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
        </section>

        <section className="py-20 bg-white overflow-hidden">
          <Container>
            <motion.div
              className="mb-5 md:mb-10"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-primary font-semibold mb-4 text-xl uppercase tracking-wider">
                Project
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {project.title}
              </h1>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                className="flex flex-col gap-8 justify-between h-full lg:gap-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.1 }}
              >
                <motion.div variants={descriptionVariants}>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
                <motion.div
                  variants={descriptionVariants}
                  className="grid grid-cols-2 gap-14"
                ></motion.div>

                <motion.div
                  variants={descriptionVariants}
                  className="grid grid-cols-2 gap-14"
                >
                  <div>
                    <PhoneIcon className="size-12 text-primary mb-4 lg:mb-8" />
                    <h3 className="font-semibold text-xl">Talk To Us</h3>
                    <p className="text-gray-600 mb-4">
                      Get started with ThinkLab by speaking to one of our
                      experts.
                    </p>
                    <Button variant="default" className="w-full">
                      Let&apos;s Talk
                    </Button>
                  </div>

                  <div>
                    <FileTextIcon className="size-12 text-primary mb-4 lg:mb-8" />
                    <h3 className="font-semibold text-xl">Project Brochures</h3>
                    <p className="text-gray-600 mb-4">
                      Explore our catalog through our collection of brochures.
                    </p>
                    <Button variant="outline" className="w-full">
                      Download Brochures
                    </Button>
                  </div>
                </motion.div>

                <MortgageCalculator
                  projectName={project.title}
                  propertyCost={35000000}
                />
              </motion.div>

              <motion.div
                className="relative w-full h-full max-w-[600px] max-lg:mx-auto min-h-[650px] overflow-hidden"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image
                  src={
                    project.images[1] ? project.images[1] : project.images[0]
                  }
                  alt={`${project.title} detail`}
                  fill
                  className="object-cover size-full"
                />
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-white">
          <Container className="flex flex-col gap-12">
            <div>
              <h2 className="text-2xl mb-4 font-semibold text-primary">
                Features
              </h2>
              <p className="font-semibold sr-only mb-1 text-4xl tracking-wider">
                Features of the Project
              </p>
            </div>
            <ProjectFeaturesCarousel features={project.features} />
          </Container>
        </section>

        {project.images && project.images.length > 0 && (
          <section className="py-20 bg-gray-50">
            <Container>
              <div className="mb-12 text-center md:text-left flex flex-col gap-8 md:flex-row items-center md:justify-between">
                <div className="mb-10">
                  <h2 className="text-xl mb-4 text-primary">Gallery</h2>
                  <p className="font-semibold mb-1 text-4xl tracking-wider">
                    Sights from the Project
                  </p>
                </div>
                <div className="flex justify-center space-x-2 rounded-full bg-gray-200 p-1">
                  {(["all", "Highlight", "Progress Report"] as const).map(
                    (type) => (
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
                    )
                  )}
                </div>
              </div>

              <motion.div
                layout
                className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2"
              >
                <AnimatePresence mode="popLayout">
                  {filter === "all"
                    ? [...project.images, ...project.progressReportImages].map(
                        (image, index) => (
                          <motion.div
                            key={index}
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
                              alt={image || project.title}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </motion.div>
                        )
                      )
                    : filter === "Highlight"
                      ? project.images.map((image, index) => (
                          <motion.div
                            key={index}
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
                              alt={image || project.title}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </motion.div>
                        ))
                      : project.progressReportImages.map((image, index) => (
                          <motion.div
                            key={index}
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
                              alt={image || project.title}
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
          <Container className="flex flex-col gap-12">
            <div>
              <h2 className="text-xl mb-4 text-primary">Explore</h2>
              <p className="font-semibold mb-1 text-4xl tracking-wider">
                More projects from Thinklab
              </p>
            </div>
            <div className="grid auto-rows-[280px] grid-cols-1 gap-6">
              {projects.map((item, index) => (
                <motion.div
                  key={item.title}
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
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                    {/* Text container */}
                    <div className="text-white flex flex-col gap-4">
                      <div>
                        <h3 className="mb-2 text-2xl font-semibold">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-6" />
                          <p className="font-medium">{"Location"}</p>
                        </div>
                      </div>
                      <p className="text-white line-clamp-2 max-w-prose">
                        {item.description}
                      </p>
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
    )
  );
}
