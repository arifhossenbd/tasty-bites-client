import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { FaGlobeAsia } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { useTheme } from "../../hooks/useTheme";
import Skeleton from "../Loading/Skeleton";

const isRecentlyUpdated = (date) => {
  const updatedDate = new Date(date);
  const now = new Date();
  const diffInHours = (now - updatedDate) / (1000 * 60 * 60);
  return diffInHours <= 72;
};

const TopFoods = () => {
  const [foods, setFoods] = useState([]);
  const { getPublicData, loading, error } = useApi();
  const { currentTheme } = useTheme();
  const {
    textColor,
    cardBgColor,
    cardTextColor,
    cardBorderColor,
    bgColor,
    primaryTextColor,
  } = currentTheme;

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
    <div className={`px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto my-4 md:my-8 lg:my-12`}>
      <h2 className={`my-4 md:my-8 text-center text-2xl md:text-3xl lg:text-4xl font-bold ${textColor}`}>
        🔥 Top Foods
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Skeleton type="card" />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {foods?.map((food) => (
            <motion.div
              key={food?._id}
              className={`relative group rounded-2xl overflow-hidden shadow-xl border flex flex-col ${cardBgColor} ${cardBorderColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
            {/* Top Pick Ribbon */}
            <div
              className={`absolute -left-10 top-4 rotate-[-45deg] ${bgColor} text-xs font-bold px-10 py-1 shadow-lg z-10 ${primaryTextColor}`}
            >
              🏆 Top Pick
            </div>

            {/* Best Seller Badge */}
            {food?.purchaseCount > 50 && (
              <div
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10 ${bgColor} ${primaryTextColor}`}
              >
                ⭐ Best Seller
              </div>
            )}

            {/* Image with fixed height */}
            <div className="relative h-56 md:h-48 bg-stone-100 overflow-hidden">
              <motion.img
                src={food?.image}
                alt={food?.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div
                className={`absolute bottom-2 left-2 text-xs px-3 py-1 rounded-full shadow-md ${bgColor} ${primaryTextColor}`}
              >
                🏷️ {food?.category}
              </div>
            </div>

            {/* Content area with flex-grow */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex flex-col gap-3">
                <h3 className={`text-xl font-bold ${textColor}`}>
                  {food?.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className={`flex items-center gap-1 ${cardTextColor}`}>
                    <FaGlobeAsia className={`${primaryTextColor}`} />
                    {food?.origin}
                  </span>
                  <span className={`flex items-center gap-1 ${cardTextColor}`}>
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
                    {food?.purchaseCount || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-2xl font-extrabold relative ${textColor}`}
                  >
                    ${food?.price}
                    {isRecentlyUpdated(food?.updateAt) && (
                      <span
                        className={`absolute -top-1 -right-3 text-sm font-semibold px-2 rounded-full h-3 w-3 shadow-sm items-center justify-center flex`}
                      >
                        🔥
                      </span>
                    )}
                  </span>
                  <p className={cardTextColor}>
                    📦
                    <span className={`text-xs font-semibold pl-1 rounded-full`}>
                      {food?.quantity > 0
                        ? `${food?.quantity} left`
                        : "Out of stock"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-4 md:pt-6">
                <Link
                  to={`/food/details/${food?._id}`}
                  className="block w-full"
                >
                  <PrimaryBtn
                    btnText="View Details"
                    style="w-full"
                  />
                </Link>
              </div>
            </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopFoods;