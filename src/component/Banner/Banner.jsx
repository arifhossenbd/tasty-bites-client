import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { useTheme } from "../../hooks/useTheme";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

const Banner = ({ foods = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const { currentTheme } = useTheme();
  const {
    activeText,
    inactiveText,
    secondaryBgColor,
    secondaryTextColor,
    accentColor,
    primaryBtnBgColor,
    primaryBtnTextColor,
    primaryBtnHoverBgColor,
    cardBorderColor,
    inactiveBtn,
  } = currentTheme;

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const preloadImages = () => {
    foods.forEach((food) => {
      const img = new Image();
      img.src = food?.image;
    });
  };

  React.useEffect(() => {
    preloadImages();
  }, [foods]);

  return (
    <div className="relative mt-16">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          renderBullet: (index, className) => {
            return `<span class="${className}" style="background-color: ${accentColor}"></span>`;
          }
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
        style={{
          '--swiper-pagination-color': accentColor,
          '--swiper-pagination-bullet-inactive-color': secondaryTextColor,
          '--swiper-pagination-bullet-inactive-opacity': '0.5'
        }}
      >
        {foods?.map((food, index) => (
          <SwiperSlide key={food?._id}>
            <div 
              className="relative h-screen w-full"
              role="group"
              aria-label={`Slide ${index + 1} of ${foods.length}`}
            >
              <img
                src={food?.image}
                alt={food?.name}
                className="absolute inset-0 w-full h-full object-cover brightness-75"
                loading="lazy"
                decoding="async"
              />

              <div 
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"
                aria-hidden="true"
              />

              <div className="relative z-20 h-full flex flex-col items-center gap-4 md:gap-6 justify-center text-center px-6">
                <motion.h1
                  key={`${food?._id}-h1`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : 30,
                  }}
                  transition={{ duration: 0.8 }}
                  className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg ${inactiveText}`}
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
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className={`max-w-2xl mx-auto text-lg md:text-xl ${activeText}`}
                >
                  {food?.description || "Delicious food waiting for you"}
                </motion.p>

                <motion.div
                  key={`${food?._id}-btn`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : 30,
                  }}
                  transition={{ duration: 0.9, delay: 0.4 }}
                >
                  <Link 
                    to={`/food/details/${food?._id}`}
                    aria-label={`View details for ${food?.name}`}
                  >
                    <PrimaryBtn 
                      btnText="View Dish"
                      type="button"
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div
          className="autoplay-progress flex items-center justify-center absolute right-4 bottom-4 font-bold h-12 w-12 z-10"
          slot="container-end"
          aria-hidden="true"
        >
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle 
              cx="24" 
              cy="24" 
              r="20" 
              stroke={accentColor}
              strokeWidth="2"
              fill="none"
              className="progress-circle"
            />
          </svg>
          <span 
            className={`${secondaryTextColor}`}
            ref={progressContent}
            aria-hidden="true"
          ></span>
        </div>
      </Swiper>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className={`custom-prev absolute top-1/2 left-4 z-30 -translate-y-1/2 cursor-pointer btn rounded-full w-12 h-12 md:w-14 lg:h-14 shadow-none border-none transition duration-300 flex items-center justify-center border ${inactiveBtn}`}
        aria-label="Previous slide"
      >
        <FaArrowLeft size={20} />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className={`custom-prev absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer btn rounded-full w-12 h-12 md:w-14 lg:h-14 shadow-none border-none transition duration-300 flex items-center justify-center border ${inactiveBtn}`}
        aria-label="Next slide"
      >
        <FaArrowRight size={20} />
      </motion.button>
    </div>
  );
};

export default Banner;