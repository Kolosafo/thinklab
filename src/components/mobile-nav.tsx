"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import "./nav.css";
import Image from "next/image";
import { Button } from "./ui/button";
import { navItems } from "./shared/header";
import { cn } from "@/lib/utils";
function MobileNav() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const linkVariants = {
    top: { color: "rgba(255, 255, 255, 0.9)" },
    scrolled: { color: "#111827" },
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollThreshold = 50;
    setIsScrolled(latest > scrollThreshold);
  });

  const router = useRouter();

  useEffect(() => {
    if (expanded) {
      setExpanded(!expanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (expanded) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [expanded]);

  return (
    <header className="sticky inset-x-0 top-0 z-[100] h-14 border-b border-gray-200 bg-white/80 backdrop-blur-lg md:hidden">
      {/* logo */}
      <div className="h-full mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <Link href="/" className="font-semibold lg:text-lg">
          <Image
            src="/logo.png"
            alt="ThinkLab Properties Logo"
            width={80}
            height={30}
            className="object-contain"
            unoptimized
          />
        </Link>

        {/* nav-controls */}
        <div className="flex items-center gap-2 flex-row-reverse">
          <button
            type="button"
            title="toggle menu"
            aria-controls="mobile-menu"
            onClick={() => setExpanded((prev) => !prev)}
            className="z-50 flex h-7 flex-col justify-center gap-1 rounded-sm bg-red-500 p-1 outline-2 outline-offset-2 md:hidden"
          >
            <span
              className={`h-0.5 w-6 rounded-full bg-white transition duration-500 ${
                expanded && "translate-y-1 rotate-45"
              }`}
              aria-hidden="true"
            ></span>
            <span
              className={`h-0.5 w-5 rounded-full bg-white transition duration-500 ${
                expanded && "hidden"
              }`}
              aria-hidden="true"
            ></span>
            <span
              className={`h-0.5 w-4 rounded-full bg-white transition duration-500 ${
                expanded && "w-6 -translate-y-0.5 -rotate-45"
              }`}
              aria-hidden="true"
            ></span>
          </button>
        </div>

        {/* navigation */}
        <nav
          id="mobile-menu"
          className={`absolute inset-0 z-40 min-h-screen w-3/4 bg-red-300/90 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            expanded ? "max-md:tranxlate-x-0" : "max-md:-translate-x-full"
          }`}
        >
          <ul className="flex h-full w-full flex-col gap-6 px-8 py-14 text-lg font-medium transition duration-300">
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
            <motion.div>
              <Button
                onClick={() => router.push("/auth/register")}
                className="font-medium"
                size="lg"
              >
                Register
              </Button>
            </motion.div>
          </ul>
        </nav>

        {/* backdrop */}
        <div
          className={`fixed inset-0 z-20 min-h-screen bg-black/90 backdrop-blur-md transition md:hidden ${
            expanded ? "visible opacity-100" : "invisible opacity-0"
          }`}
          aria-hidden="true"
          onClick={() => setExpanded(false)}
        />
      </div>
    </header>
  );
}

export default MobileNav;
