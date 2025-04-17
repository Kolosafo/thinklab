/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";

import { MapPinMinusInside } from "lucide-react";
import { ServiceData } from "@/lib/constants/slider-items";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import CustomAnimation from "./animation/animation";
import { useRouter } from "next/navigation";

// export const properties
const ActiveSlider = () => {
  const [detailPosition, setDetailPosition] = useState("20%");
  const swiperOneRef = useRef<any>(null);
  const swiperTwoRef = useRef<any>(null);

  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-col h-[700px] w-full">
      <CustomAnimation
        className="mb-4 w-[30%] self-center flex items-center justify-center h-20"
        animation="fade-up"
      >
        <Swiper
          loop={true}
          direction="vertical"
          autoplay={{
            delay: 4000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          //   onSwiper={(swiper) => {
          //     swiperOneRef.current = swiper;
          //   }}
          modules={[Autoplay]}
          //   onSlideChange={(s) => setIndex(s.activeIndex)}
          //   spaceBetween={100}
          className="h-full flex justify-center self-center items-center"
        >
          <SwiperSlide className="text-white text-4xl font-bold flex text-center items-center">
            <h1>INNOVATION</h1>
          </SwiperSlide>
          <SwiperSlide className="text-white text-4xl font-bold flex text-center items-center">
            <h1 className="text-red-400 text-4xl font-bold">DEVELOPMENT</h1>
          </SwiperSlide>
          <SwiperSlide className="text-white text-4xl font-bold flex text-center items-center">
            <h1 className="text-green-400 text-4xl font-bold">FINANCE</h1>
          </SwiperSlide>
        </Swiper>
      </CustomAnimation>

      <Swiper
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop
        slidesPerGroup={3}
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
            slidesPerGroup: 2,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
            slidesPerGroup: 3,
          },
        }}
        // freeMode={true}
        pagination={{
          clickable: true,
        }}
        // onSlideChange={(s) => setIndex(s.activeIndex)}
        modules={[Pagination, Autoplay]}
        className="max-w-[90%] lg:max-w-full"
      >
        {ServiceData.map((item, idx) => (
          <SwiperSlide
            key={idx}
            onClick={() => {
              router.push(`/projects/${item.id}`);
            }}
          >
            <motion.div
              onHoverStart={() => {
                setDetailPosition("100%");
                if (swiperOneRef?.current && swiperTwoRef?.current) {
                  swiperOneRef.current.autoplay.stop();
                  swiperTwoRef.current.autoplay.stop();
                }
              }}
              onHoverEnd={() => {
                setDetailPosition("20%");
                if (swiperOneRef?.current && swiperTwoRef?.current) {
                  swiperOneRef.current.autoplay.start();
                  swiperTwoRef.current.autoplay.start();
                }
              }}
              className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[150px] w-[215px] lg:h-[500px] lg:w-[450px] overflow-hidden cursor-pointer"
            >
              <div className="bg-gradient-to-t from-black/40 to-black/10 absolute inset-0 bg-cover bg-center z-10"></div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
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
                <h1 className="text-xl lg:text-4xl font-bold text-white">
                  {item.title}{" "}
                </h1>
                <div className="flex flex-row items-center space-x-2 mt-1.5">
                  <MapPinMinusInside />
                  <p className="font-bold text-xl">{item.location}</p>
                </div>
                {detailPosition !== "20%" && (
                  <p className="lg:text-base font-semibold">{item.content} </p>
                )}
              </motion.div>
              {/* <ArrowRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" /> */}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
