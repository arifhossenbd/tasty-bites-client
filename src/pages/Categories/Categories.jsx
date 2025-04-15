import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import useApi from "../../hooks/useApi";
import PrimaryBtn from "../../component/Buttons/PrimaryBtn";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [foods, setFoods] = useState([]);

  const { getPublicData, loading } = useApi();

  // 🔹 Fetch all categories with items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPublicData("/categories");
        const catList = res?.data || [];
        setCategories(catList);
        const first = catList?.[0];
        if (first) {
          setActiveCategory(first.name);
          setFoods(first.items);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchData();
  }, []);

  // 🔹 Sync foods when category changes
  useEffect(() => {
    const selected = categories.find((cat) => cat.name === activeCategory);
    setFoods(selected?.items || []);
  }, [activeCategory]);

  return (
    <div className="md:mt-4 mx-auto px-4 md:px-0 md:w-11/12 lg:w-10/12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        🍱 Browse by Category
      </h2>

      {/* 🔘 Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(({ name }) => (
          <button
            key={name}
            onClick={() => setActiveCategory(name)}
            className={`btn btn-sm rounded-full px-4 capitalize transition-all duration-200 ${
              activeCategory === name
                ? "bg-yellow-200 text-yellow-800 border-yellow-300"
                : "btn-outline text-gray-600 hover:bg-yellow-100"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="text-center text-orange-500 font-medium">
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
          >
            {foods?.length > 0 ? (
              <>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[FreeMode, Pagination]}
                  className="mySwiper"
                >
                  {foods?.map((food) => (
                    <SwiperSlide key={food?._id} className="my-12 md:my-14">
                      <motion.div
                        className="card flex flex-col h-full w-full bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          transition: { duration: 0.2 },
                        }}
                      >
                        {/* Image section */}
                        <motion.figure className="relative h-56 overflow-hidden">
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
                          <div className="absolute top-3 right-3 bg-blue-100 text-blue-500 px-3 py-1 text-xs font-semibold shadow-md rounded-full">
                            {food?.category}
                          </div>
                        </motion.figure>

                        {/* Content section */}
                        <div className="flex flex-col flex-grow p-4 gap-4">
                          {/* Title and price */}
                          <div className="flex-grow">
                            <h3 className="text-lg font-bold text-stone-800 mb-2 line-clamp-2">
                              {food?.name}
                            </h3>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-xl font-bold text-yellow-600">
                                ${food?.price}
                              </span>
                              <span
                                className={`text-xs py-1 px-2 rounded-full ${
                                  food?.quantity > 0
                                    ? "bg-green-100 text-green-800"
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
                          <div className="border-t border-stone-200"></div>

                          {/* More information */}
                          <div className="flex items-center justify-between gap-3 text-sm text-stone-600 mb-3">
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-stone-400"
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
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-stone-400"
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
                              <span>{food?.purchaseCount ? food?.purchaseCount : 0}</span>
                            </div>
                          </div>
                          <div className="mt-auto">
                            <Link to={`/food/details/${food?._id}`}>
                              <PrimaryBtn
                                style="w-full"
                                btnText="View Details"
                              />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <div className="text-center text-gray-400 text-sm">
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
