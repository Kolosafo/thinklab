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
import NewPropertyCard from "./NewPropertyCard";

// export const properties
const ActiveSlider = () => {
  const [detailPosition, setDetailPosition] = useState("20%");
  const swiperOneRef = useRef<any>(null);
  const swiperTwoRef = useRef<any>(null);

  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-col md:h-[700px] h-[400px] w-full">
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
          className="h-full flex justify-center self-center items-center md:flex-row flex-col"
        >
          <SwiperSlide className="text-white md:text-4xl text-xl font-bold flex text-center items-center">
            <h1>INNOVATION</h1>
          </SwiperSlide>
          <SwiperSlide className="text-white md:text-4xl text-xl font-bold flex text-center items-center">
            <h1 className="text-red-400 md:text-4xl text-xl font-bold">
              DEVELOPMENT
            </h1>
          </SwiperSlide>
          <SwiperSlide className="text-whitemd:text-4xl text-xl font-bold flex text-center items-center">
            <h1 className="text-green-400md:text-4xl text-xl font-bold">
              FINANCE
            </h1>
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
            className=""
            style={{ display: "flex" }}
          >
            <NewPropertyCard listing={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
