import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { useTheme } from "../../hooks/useTheme";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [foods, setFoods] = useState([]);
  const { getPublicData, loading } = useApi();
  const { currentTheme } = useTheme();

  // Destructure theme properties
  const {
    textColor,
    cardBgColor,
    cardTextColor,
    cardBorderColor,
    primaryBtnBgColor,
    primaryBtnTextColor,
    primaryBtnHoverBgColor,
    primaryColor,
    secondaryBgColor,
    secondaryTextColor,
    accentColor,
    highlightColor,
    inactiveBtn,
    activeBtn,
    activeText,
    inactiveText
  } = currentTheme;

  // Fetch all categories with items
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPublicData("/categories");
      if (response?.success) {
        const catList = response?.data || [];
        setCategories(catList);
        const first = catList?.[0];
        if (first) {
          setActiveCategory(first.name);
          setFoods(first.items);
        }
      }
    };
    fetchData();
  }, []);

  // Sync foods when category changes
  useEffect(() => {
    const selected = categories.find((cat) => cat.name === activeCategory);
    setFoods(selected?.items || []);
  }, [activeCategory]);

  return (
    <div className={`pt-4 pb-6 md:pb-8 lg:pb-12 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl`}>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center`}>
        🍱 Browse by Category
      </h2>

      {/* Category Buttons - Scrollable on mobile */}
      <div className="mb-6 sm:mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-2 px-1 min-w-max">
          {categories.map(({ name }) => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              className={`btn btn-sm rounded-full px-3 sm:px-4 capitalize transition-all duration-200 ${
                activeCategory === name
                  ? `${activeBtn}`
                  : `${inactiveBtn}`
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={`text-center py-12`}>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="px-1"
          >
            {foods?.length > 0 ? (
              <div className="w-full">
                <Swiper
                  slidesPerView={1}
                  breakpoints={{
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 12,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 14,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 16,
                    },
                  }}
                  freeMode={true}
                  spaceBetween={12}
                  pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    renderBullet: (index, className) => {
                      return `<span class="${className}" style="background-color: ${accentColor}"></span>`;
                    }
                  }}
                  modules={[FreeMode, Pagination]}
                  className="mySwiper"
                >
                  {foods?.map((food) => (
                    <SwiperSlide
                      key={food?._id}
                      className="my-6 sm:my-8 rounded-xl"
                    >
                      <motion.div
                        className={`card flex flex-col h-full w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${cardBgColor} border ${cardBorderColor}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          transition: { duration: 0.2 },
                        }}
                      >
                        {/* Image section */}
                        <motion.figure className="relative h-48 sm:h-56 w-full overflow-hidden">
                          <motion.img
                            src={food?.image}
                            alt={food?.name}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1 }}
                            whileHover={{
                              scale: 1.1,
                              transition: { duration: 0.4 },
                            }}
                          />
                          {/* Category badge */}
                          <div
                            className={`absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold shadow-md rounded-full ${cardBgColor}`}
                          >
                            {food?.category}
                          </div>
                        </motion.figure>

                        {/* Content section */}
                        <div className={`flex flex-col flex-grow p-3 sm:p-4 gap-3 sm:gap-4 ${cardTextColor}`}>
                          {/* Title and price */}
                          <div className="flex-grow">
                            <h3 className={`text-base sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-2`}>
                              {food?.name}
                            </h3>
                            <div className="flex items-center justify-between mt-2 sm:mt-3">
                              <span className={`text-lg sm:text-xl font-bold ${primaryColor}`}>
                                ${food?.price}
                              </span>
                              <span
                                className={`text-xs py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-full ${
                                  food?.quantity > 0
                                    ? `${highlightColor} ${secondaryTextColor}`
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {food?.quantity > 0
                                  ? `${food?.quantity} in stock`
                                  : "Out of stock"}
                              </span>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className={`border-t ${cardBorderColor}`}></div>

                          {/* More information */}
                          <div className={`flex items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm mb-2 sm:mb-3`}>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span className="truncate">{food?.origin}</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                              </svg>
                              <span>
                                {food?.purchaseCount ? food?.purchaseCount : 0}
                              </span>
                            </div>
                          </div>
                          <div className="mt-auto">
                            <Link to={`/food/details/${food?._id}`}>
                              <PrimaryBtn
                                btnText="View Details"
                                type="button"
                                style="w-full"
                              />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className={`text-center text-sm py-8 sm:py-12 ${textColor}`}>
                No items in{" "}
                <span className="font-semibold">{activeCategory}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Categories;