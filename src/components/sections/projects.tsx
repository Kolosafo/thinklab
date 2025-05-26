"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { projects as DummyProjects } from "@/data/projects";
import Container from "../shared/container";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { useEffect } from "react";
import LoadingPage from "@/app/(marketing)/loading";
import { useGetCompanyInfo } from "@/hooks/useGetCompanyInfo";

interface BookButtonProps {
  className?: string;
  href: string;
}

export function BookButton({ className, href }: BookButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-between rounded-full border border-black/10 bg-white px-5 py-2.5",
        "w-full sm:w-auto",
        className
      )}
    >
      <span className="mr-3 text-sm font-medium text-black">View project</span>
      <div className="relative h-5 w-5 shrink-0 rounded-full bg-primary">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <ArrowRight className="h-3 w-3 text-white transition-transform duration-300 group-hover:translate-x-4" />
          <ArrowRight className="absolute h-3 w-3 -translate-x-6 text-white transition-transform duration-300 group-hover:translate-x-0" />
        </div>
      </div>
    </Link>
  );
}

export function ProjectSection() {
  const { fetchProjects, isFetchingProjects } = useGetProjects();
  const { fetchCompanyInfo } = useGetCompanyInfo();
  const { projects } = useSelector((store: IRootState) => store.projects);
  const { companyInfo } = useSelector((store: IRootState) => store.companyInfo);
  useEffect(() => {
    fetchProjects();
    fetchCompanyInfo();
  }, []);

  console.log("COMPANY INFO: ", companyInfo);
  return (
    <section className="bg-gray-50 py-20">
      {isFetchingProjects ? (
        <LoadingPage />
      ) : (
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl text-gray-900">Projects</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              {companyInfo.projectListingData}
            </p>
          </div>

          <div className="grid auto-rows-[280px] grid-cols-1 gap-6">
            {projects.length > 0 &&
              projects.map((item, index) => (
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
                      src={item ? item?.images[0] : undefined}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                    {/* Text container */}
                    <div className="text-white">
                      <h3 className="mb-2 text-2xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80">
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

          <div className="grid auto-rows-[280px] grid-cols-1 gap-6 mt-6">
          {DummyProjects.map((item, index) => (
            <motion.div
              key={item.name}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                visible: { opacity: 1, x: 0 },
              }}
              className={cn(
                'group relative overflow-hidden rounded-2xl bg-white',
                'md:col-span-2 md:row-span-2'
              )}
            >
              <div className='absolute inset-0'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
              </div>

              {/* Content overlay */}
              <div className='absolute bottom-0 left-0 right-0 flex items-end justify-between p-6'>
                {/* Text container */}
                <div className='text-white'>
                  <h3 className='mb-2 text-2xl font-semibold'>{item.name}</h3>
                  <p className='text-sm text-white/80'>{item.description}</p>
                </div>
                {/* Button container */}
                <div className='shrink-0'>
                  <BookButton href={`/projects/${item.id}`} />
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </Container>
      )}
    </section>
  );
}
