import { useCallback, useEffect, useState } from "react";
import DataStatus from "../../component/DataStatus/DataStatus";
import PageHeader from "../../component/PageHeader/PageHeader";
import useApi from "../../hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PrimaryBtn from "../../component/Buttons/PrimaryBtn";
import { Link } from "react-router-dom";

// Animation variants
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
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren"
    },
  },
  hover: {
    y: -5,
    transition: { duration: 0.3 }
  }
};

const flipVariants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};

const skeletonVariants = {
  hidden: { opacity: 0.5 },
  visible: { 
    opacity: 0.8,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1.5
    }
  }
};

export const GallerySkeleton = () => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto my-10"
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    {[...Array(6)].map((_, index) => {
      const colSpan = index % 3 === 1 ? "sm:col-span-2" : "md:col-span-1";

      return (
        <motion.div
          key={index}
          variants={itemVariants}
          className={`w-full h-64 md:h-72 lg:h-80 ${colSpan}`}
        >
          <motion.div
            variants={skeletonVariants}
            initial="hidden"
            animate="visible"
            className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"
          />
        </motion.div>
      );
    })}
  </motion.div>
);

const Gallery = () => {
  const [foods, setFoods] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const { getPublicData, loading, error } = useApi();

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchFoods = useCallback(async () => {
    const response = await getPublicData("/top/foods");
    if (response?.success) {
      setFoods(response?.data || []);
    }
  }, [getPublicData]);

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <DataStatus
      loading={loading}
      error={error}
      data={foods}
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

      {loading ? (
        <GallerySkeleton />
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto my-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {foods?.map((food, index) => {
              const colSpan = index % 3 === 1 ? "sm:col-span-2" : "md:col-span-1";

              return (
                <motion.div
                  key={food?._id}
                  variants={itemVariants}
                  className={`w-full h-64 md:h-72 lg:h-80 ${colSpan}`}
                  whileHover="hover"
                  layout
                >
                  <motion.div
                    className="relative w-full h-full rounded-2xl cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                    onClick={() => toggleFlip(food?._id)}
                    animate={flippedCards[food?._id] ? "back" : "front"}
                    variants={flipVariants}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    {/* Front Side */}
                    <motion.div
                      className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white/40 backdrop-blur-xl border border-white/30"
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <Swiper
                        modules={[Navigation]}
                        navigation
                        className="rounded-2xl overflow-hidden h-full"
                      >
                        <SwiperSlide>
                          <motion.img
                            src={food?.image}
                            alt={food?.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </SwiperSlide>
                      </Swiper>
                    </motion.div>

                    {/* Back Side */}
                    <motion.div
                      className="absolute w-full h-full rounded-2xl p-4 md:p-6 shadow-2xl bg-white/30 backdrop-blur-md border border-white/30 flex flex-col justify-center items-center text-center"
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <motion.h3 
                        className="text-lg md:text-xl font-semibold text-gray-800 mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {food?.name}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 mb-4 text-sm md:text-base"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Price: ${food?.price}
                      </motion.p>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link to={`/food/details/${food?._id}`}>
                          <PrimaryBtn 
                            color="stone" 
                            btnText="Details"
                          />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </DataStatus>
  );
};

export default Gallery;