import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { FaGlobeAsia } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { useTheme } from "../../hooks/useTheme";

const isRecentlyUpdated = (date) => {
  const updatedDate = new Date(date);
  const now = new Date();
  const diffInHours = (now - updatedDate) / (1000 * 60 * 60);
  return diffInHours <= 72;
};

const TopFoodCard = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getPublicData } = useApi();
  const { theme, styles } = useTheme();

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPublicData("/top/foods");
      setFoods(response?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getPublicData]);

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div
      className={`px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto my-4 md:my-8 lg:my-12`}
    >
      <h2
        className={`my-4 md:my-8 text-center text-2xl md:text-3xl lg:text-4xl font-bold`}
      >
        🔥 Top Foods
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {foods?.map((food) => (
          <motion.div
            key={food?._id}
            className={`relative group rounded-2xl overflow-hidden shadow-xl border flex flex-col`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Top Pick Ribbon */}
            <div
              className={`absolute -left-10 top-4 rotate-[-45deg] text-white text-xs font-bold px-10 py-1 shadow-lg z-10`}
            >
              🏆 Top Pick
            </div>

            {/* Best Seller Badge */}
            {food?.purchaseCount > 50 && (
              <div
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10`}
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
              />
              <div
                className={`absolute bottom-2 left-2 text-xs px-3 py-1 rounded-full shadow-md`}
              >
                🏷️ {food?.category}
              </div>
            </div>

            {/* Content area with flex-grow */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex flex-col gap-3">
                <h3 className={`text-xl font-bold`}>{food?.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className={`flex items-center gap-1`}>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-stone-400"
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
                    {food?.origin}
                  </span>
                  <span className={`flex items-center gap-1`}>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-stone-400"
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
                    </svg>{" "}
                    {food?.purchaseCount || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-extrabold relative`}>
                    ${food?.price}
                    {isRecentlyUpdated(food?.updateAt) && (
                      <span
                        className={`absolute -top-1 -right-3 text-sm font-semibold px-2 rounded-full h-3 w-3 shadow-sm items-center justify-center flex`}
                      >
                        🔥
                      </span>
                    )}
                  </span>
                  <p>
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
                  <PrimaryBtn style="w-full" btnText="View Details" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopFoodCard;
