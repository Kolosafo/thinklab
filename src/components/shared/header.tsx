"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollThreshold = 50;
    setIsScrolled(latest > scrollThreshold);
  });

  const navVariants = {
    top: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "none",
      padding: "1.5rem 2rem",
      y: 0,
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      padding: "0.75rem 2rem",
      y: 16,
    },
  };

  const router = useRouter();
  const linkVariants = {
    top: { color: "rgba(255, 255, 255, 0.9)" },
    scrolled: { color: "#111827" },
  };

  return (
    <motion.header
      className={cn(
        "hidden md:block fixed top-0 left-0 right-0 z-100",
        isScrolled ? "mx-4 md:mx-8 rounded-2xl" : "w-full"
      )}
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={navVariants}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <motion.div>
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="ThinkLab Properties Logo"
              width={150}
              height={80}
              className="object-contain"
            />
          </Link>
        </motion.div>

        {/* Center - Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.div key={item.label} variants={linkVariants}>
              <Link
                href={item.href}
                className={cn(
                  "font-medium hover:opacity-80 transition-opacity",
                  isScrolled ? "text-gray-900" : "text-white"
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div>
          <Button onClick={() => router.push("/auth/register")} className="font-medium" size="lg">
            Register
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
