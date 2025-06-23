/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Container from "@/components/shared/container";
// import { useGetCompanyInfo } from "@/hooks/useGetCompanyInfo";
import { useGetTeam } from "@/hooks/useGetTeam";
import { IRootState } from "@/redux/store";
// import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import AnimatedText from "@/components/motion/animated-text";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedImage from "@/components/motion/animated-image";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react";

const OurTeam = () => {
  const { teamMembers } = useSelector((store: IRootState) => store.companyInfo);
  const { fetchTeam } = useGetTeam();
  // const { companyInfo } = useSelector((store: IRootState) => store.companyInfo);
  // const { fetchCompanyInfo } = useGetCompanyInfo();

  useEffect(() => {
    // fetchCompanyInfo();
    fetchTeam();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // const cardVariants = {
  //   hidden: { opacity: 0, scale: 0.8 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  //   },
  // };

  // console.log("TEAM: ", teamMembers);
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <AnimatedText
            text="Our Team"
            className="text-primary font-semibold mb-4 text-xl uppercase tracking-wider"
            delay={0.1}
          />
          <AnimatedText
            text="Meet the Minds Behind ThinkLab"
            className="text-3xl md:text-4xl font-bold mb-6"
            delay={0.2}
          />
          <AnimatedText
            text="Our diverse team of experts brings together decades of experience in architecture, technology, and sustainable development."
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            delay={0.3}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id}>
              <Card className="text-center h-full hover:shadow-xl transition-all duration-300 group">
                <CardContent className="pt-8">
                  <AnimatedImage>
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.firstName}
                        className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </AnimatedImage>

                  <h3 className="font-bold text-xl mb-2 capitalize">
                    {member.firstName} {member.firstName}
                  </h3>
                  <p className="text-primary font-semibold mb-4">
                    {member.occupation}
                  </p>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {member.about}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() =>
                        member.linkedIn
                          ? window.location.replace(member.linkedIn)
                          : null
                      }
                      size="sm"
                      variant="ghost"
                      className="p-2"
                    >
                      <LinkedinIcon className="size-4" />
                    </Button>
                    <Button
                      onClick={() =>
                        member.twitter
                          ? window.location.replace(member.twitter)
                          : null
                      }
                      size="sm"
                      variant="ghost"
                      className="p-2"
                    >
                      <TwitterIcon className="size-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2">
                      <MailIcon className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default OurTeam;
