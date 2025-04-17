"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const SignUpImage = () => {
  const [detailPosition, setDetailPosition] = useState("20%");

  useEffect(() => {
    setTimeout(() => {
      setDetailPosition("100%");
    }, 3000);
  }, []);

  return (
    <motion.div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 w-full h-full overflow-hidden cursor-pointer">
      <div className="bg-gradient-to-t from-black/40 to-black/10 absolute inset-0 bg-cover bg-center z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/sideImg.webp)` }}
      />
      {/* <div className="absolute inset-0 opacity-10 group-hover:opacity-50" /> */}
      <motion.div
        className={`absolute flex flex-col gap-3 w-full bottom-0 left-0 z-30 p-5`}
        // initial={{ bottom: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        animate={{
          height: detailPosition,
          backgroundColor: detailPosition === "20%" ? "" : "#fe00007e",
          paddingTop: detailPosition === "20%" ? "" : 100,
        }}
        // whileHover={{ height: "100%" }}
      >
        {/* <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" /> */}
        <h1 className="text-xl lg:text-4xl font-bold text-white mt-20">
          Join Our E-Realtor Market
        </h1>
        <div className="flex flex-row items-center space-x-2 mt-1.5">
          <p className="font-bold text-xl">
            Sell Your Properties Fast and Easy
          </p>
        </div>
        <p className="text-lg font-semibold w-[50%] mb-12">
          At Thinklab Properties, we&apos;re driven by a passion to provide
          innovative and sustainable real estate solutions. Our team of experts
          has years of experience in the industry, and we&apos;re committed to
          delivering exceptional results.{" "}
        </p>

       
      </motion.div>

      {/* <ArrowRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" /> */}
    </motion.div>
  );
};

export default SignUpImage;
