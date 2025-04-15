import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PrimaryBtn from "../Buttons/PrimaryBtn";

const Banner = ({ foods }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className="mySwiper"
    >
      {foods?.map((food, index) => (
        <SwiperSlide key={food?._id}>
          <div className="relative h-screen w-full">
            {/* Background image */}
            <img
              src={food?.image}
              alt={food?.name}
              className="absolute inset-0 w-full h-full object-cover brightness-75"
            />

            {/* Dark overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>

            {/* Centered content */}
            <div className="relative z-20 h-full flex flex-col items-center gap-3 md:gap-5 lg:gap-6 justify-center text-center px-6">
              <motion.h1
                key={`${food?._id}-h1`}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 30,
                }}
                transition={{ duration: 0.8 }}
                className="text-white text-2xl md:text-4xl lg:text-5xl font-bold md:font-extrabold drop-shadow-lg"
              >
                {food?.name}
              </motion.h1>

              <motion.p
                key={`${food?._id}-p`}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 30,
                }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="text-stone-200 md:text-xl"
              >
                {food?.category}
              </motion.p>

              <motion.div
                key={food?._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 30,
                }}
                transition={{ duration: 0.9, delay: 0.4 }}
              >
                <Link to={`/food/details/${food?._id}`}>
                  <PrimaryBtn btnText="View Dish" />
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* Autoplay Timer */}
      <div
        className="autoplay-progress flex items-center justify-center absolute right-4 bottom-4 font-bold h-12 w-12 z-10"
        slot="container-end"
      >
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20" />
        </svg>
        <span className="text-yellow-500" ref={progressContent}></span>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="custom-prev absolute top-1/2 left-4 z-30 -translate-y-1/2 cursor-pointer bg-black/20 hover:bg-yellow-500 text-yellow-500 hover:text-yellow-50 btn rounded-full w-12 h-12 md:w-14 lg:h-14 shadow-none border-none transition duration-300"
      >
        <FaArrowLeft size={24} />
      </motion.div>

      {/* Custom Right Arrow */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="custom-next absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer bg-black/20 hover:bg-yellow-500 text-yellow-500 hover:text-yellow-50 btn rounded-full w-12 h-12 md:w-14 lg:h-14 shadow-none border-none transition duration-300"
      >
        <FaArrowRight size={24} />
      </motion.div>
    </Swiper>
  );
};

export default Banner;
