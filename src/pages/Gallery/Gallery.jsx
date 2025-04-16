import { useCallback, useEffect, useState } from "react";
import DataStatus from "../../component/DataStatus/DataStatus";
import PageHeader from "../../component/PageHeader/PageHeader";
import useApi from "../../hooks/useApi";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PrimaryBtn from "../../component/Buttons/PrimaryBtn";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Gallery = () => {
  const [foods, setFoods] = useState();
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { getPublicData, loading, error } = useApi();

  const fetchFoods = useCallback(async () => {
    const response = await getPublicData("/top/foods");
    setFoods(response?.data);
  }, [getPublicData]);

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <DataStatus
      loading={loading}
      error={error}
      data={foods}
      btnText="Home"
      path="/"
      onRetry={fetchFoods}
    >
      <PageHeader
        title="Gallery"
        subtitle="Explore food items"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Menu", path: "/foods" },
          { name: "Gallery" },
        ]}
        backgroundImage="/tasty-bites-images/banner/banner13.jpg"
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto my-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {foods?.map((food, index) => {
          const colSpan = index % 3 === 1 ? "sm:col-span-2" : "md:col-span-1";

          return (
            <motion.div
              key={food?._id}
              variants={itemVariants}
              className={`w-full h-64 md:h-72 lg:h-80 ${colSpan}`}
              onMouseEnter={() => toggleFlip(food?._id)}
              onMouseLeave={() => toggleFlip(food?._id)}
            >
              <motion.div
                className="relative w-full h-full rounded-2xl"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: flippedCards[food?._id] ? 180 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white/40 backdrop-blur-xl border border-white/30 hover:shadow-2xl transition-shadow duration-300"
                  style={{
                    backfaceVisibility: "hidden",
                    pointerEvents: flippedCards[food?._id] ? "none" : "auto",
                  }}
                >
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    className="rounded-2xl overflow-hidden"
                  >
                    <SwiperSlide>
                      <img
                        src={food?.image}
                        alt={food?.name}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  </Swiper>
                </motion.div>
                <motion.div
                  className="absolute w-full h-full rounded-2xl p-4 md:p-6 shadow-2xl bg-white/30 backdrop-blur-md border border-white/30 flex flex-col justify-center items-center text-center"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    pointerEvents: flippedCards[food?._id] ? "auto" : "none",
                  }}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    {food?.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    Price: ${food?.price}
                  </p>
                  <Link to={`/food/details/${food?._id}`}>
                    <PrimaryBtn color="stone" btnText="Details" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </DataStatus>
  );
};

export default Gallery;
