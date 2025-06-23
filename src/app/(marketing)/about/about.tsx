"use client";

import React, { useEffect } from "react";
import AnimatedText from "@/components/motion/animated-text";
import AnimatedImage from "@/components/motion/animated-image";
import {
  HomeIcon,
  PhoneIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
  Smile,
  Clock,
  Trophy,
  Check,
  User,
} from "lucide-react";
import Container from "@/components/shared/container";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCounter from "@/components/motion/animated-counter";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { useGetCompanyInfo } from "@/hooks/useGetCompanyInfo";

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Chief Executive Officer",
    description:
      "Visionary leader with 15+ years in real estate development and sustainable architecture.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "sarah@thinklab.com",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Chief Technology Officer",
    description:
      "Tech innovator revolutionizing real estate through cutting-edge technology solutions.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "michael@thinklab.com",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Head of Design",
    description:
      "Award-winning architect creating spaces that inspire and transform communities.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "emily@thinklab.com",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Director of Operations",
    description:
      "Operations expert ensuring seamless project delivery and exceptional quality standards.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "david@thinklab.com",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Sustainability Lead",
    description:
      "Environmental champion driving green building practices and sustainable development.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "lisa@thinklab.com",
  },
  {
    id: 6,
    name: "James Mitchell",
    role: "Business Development",
    description:
      "Strategic partnerships expert expanding ThinkLab's reach and market presence.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
    email: "james@thinklab.com",
  },
];

// Statistics data
// const stats = [
//   { icon: HomeIcon, value: 500, suffix: "+", label: "Projects Completed" },
//   { icon: HomeIcon, value: 200, suffix: "", label: "Happy Clients" },
//   { icon: HomeIcon, value: 15, suffix: "+", label: "Years Experience" },
//   { icon: HomeIcon, value: 50, suffix: "+", label: "Awards Won" },
//   { icon: HomeIcon, value: 95, suffix: "%", label: "Client Satisfaction" },
//   { icon: HomeIcon, value: 25, suffix: "+", label: "Team Members" },
// ];

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

function Page() {
  const { fetchCompanyInfo } = useGetCompanyInfo();

  const { companyInfo } = useSelector((store: IRootState) => store.companyInfo);
  useEffect(() => {
    fetchCompanyInfo();
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className='relative w-full h-[80vh] bg-[url("/about-hero.jpg")] bg-cover bg-center bg-fixed flex items-center justify-center overflow-hidden'>
        <div className="absolute inset-0 bg-black/20" />

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
            text="About Us"
            className="text-4xl md:text-6xl font-bold text-white mb-8"
            delay={0.3}
            highlight
          />
          {/* <AnimatedText
            text="We are a team of experienced architects and designers who are dedicated to creating innovative and inspiring designs."
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12"
            delay={0.5}
          /> */}
        </div>
      </section>

      {/* About ThinkLab Section */}
      <section className="py-20 bg-white overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AnimatedText
                text="About Us"
                className="text-primary font-semibold mb-4 text-xl uppercase tracking-wider"
                delay={0.1}
              />
              <AnimatedText
                text={companyInfo.aboutTitle}
                className="text-3xl md:text-4xl font-bold mb-6"
                delay={0.2}
              />
              <AnimatedText
                text={companyInfo.aboutInfo}
                className="text-gray-600 leading-relaxed"
                delay={0.3}
              />
            </motion.div>

            <AnimatedImage>
              <div className="relative">
                <img
                  src={companyInfo.image}
                  alt="Modern Architecture"
                  className="rounded-xl shadow-lg w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              </div>
            </AnimatedImage>
          </div>

          {/* Vision and Mission */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mb-20"
          >
            <motion.div>
              <Card className="h-full border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {companyInfo.vision}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div>
              <Card className="h-full border-l-4 border-l-secondary">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4 ">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {companyInfo.mission}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* CTA Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mb-20"
          >
            <motion.div>
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <PhoneIcon className="size-12 text-primary mb-6 mx-auto" />
                  <h3 className="font-semibold text-xl mb-4">Talk To Us</h3>
                  <p className="text-gray-600 mb-6">
                    Get started with ThinkLab by speaking to one of our experts.
                  </p>
                  <Button variant="default" className="w-full">
                    Let&apos;s Talk
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div>
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <FileTextIcon className="size-12 text-primary mb-6 mx-auto" />
                  <h3 className="font-semibold text-xl mb-4">
                    Project Brochures
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explore our catalog through our collection of brochures.
                  </p>
                  <Button variant="outline" className="w-full">
                    Download Brochures
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <AnimatedText
                text="Our Achievements"
                className="text-3xl md:text-4xl font-bold mb-4"
                delay={0.1}
              />
              <AnimatedText
                text="Numbers that speak for our excellence"
                className="text-gray-600 text-lg"
                delay={0.2}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <motion.div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <HomeIcon className="size-8 text-primary mb-4 mx-auto" />
                <div className="font-bold text-2xl text-primary mb-2">
                  <AnimatedCounter
                    from={0}
                    to={companyInfo.projectsCompleted}
                  />
                  <span>+</span>
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wider">
                  Projects Completed
                </p>
              </motion.div>

              <motion.div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Smile className="size-8 text-primary mb-4 mx-auto" />
                <div className="font-bold text-2xl text-primary mb-2">
                  <AnimatedCounter from={0} to={companyInfo.clients} />
                  <span>+</span>
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wider">
                  Happy Clients
                </p>
              </motion.div>

              <motion.div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Clock className="size-8 text-primary mb-4 mx-auto" />
                <div className="font-bold text-2xl text-primary mb-2">
                  <AnimatedCounter from={0} to={companyInfo.expYear} />
                  <span>+</span>
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wider">
                  Years Experience
                </p>
              </motion.div>

              <motion.div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Trophy className="size-8 text-primary mb-4 mx-auto" />
                <div className="font-bold text-2xl text-primary mb-2">
                  <AnimatedCounter from={0} to={companyInfo.awardWon} />
                  <span>+</span>
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wider">
                  Awards Won
                </p>
              </motion.div>
              <motion.div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Check className="size-8 text-primary mb-4 mx-auto" />
                <div className="font-bold text-2xl text-primary mb-2">
                  <AnimatedCounter from={0} to={98} />
                  <span>+</span>
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wider">
                  Client Satisfaction
                </p>
              </motion.div>
              <motion.div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <User className="size-8 text-primary mb-4 mx-auto" />
                <div className="font-bold text-2xl text-primary mb-2">
                  <AnimatedCounter from={0} to={companyInfo.teamMemberSize} />
                  <span>+</span>
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wider">
                  Team Members
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Team Section */}
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
                          alt={member.name}
                          className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </AnimatedImage>

                    <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {member.description}
                    </p>

                    <div className="flex justify-center space-x-4">
                      <Button size="sm" variant="ghost" className="p-2">
                        <LinkedinIcon className="size-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-2">
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

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <AnimatedText
              text="Ready to Start Your Journey?"
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              delay={0.1}
            />
            <AnimatedText
              text="Join thousands of satisfied clients who have transformed their vision into reality with ThinkLab."
              className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
              delay={0.2}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary" className="text-primary">
                Get Started Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                View Our Projects
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default Page;
