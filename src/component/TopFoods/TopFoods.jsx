import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { FaGlobeAsia } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

const isRecentlyUpdated = (date) => {
  const updatedDate = new Date(date);
  const now = new Date();
  const diffInHours = (now - updatedDate) / (1000 * 60 * 60);
  return diffInHours <= 72;
};

const TopFoodCard = () => {
  const [foods, setFoods] = useState([]);
  const { getPublicData } = useApi();

  const fetchFoods = useCallback(async () => {
    try {
      const response = await getPublicData("/top/foods");
      setFoods(response?.data || []);
    } catch (err) {
      console.error(err);
    }
  }, [getPublicData]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  return (
    <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto my-4 md:my-8 lg:my-12">
      <h2 className="my-4 md:my-8 text-center text-2xl md:text-3xl lg:text-4xl font-bold">
        🔥 Top Foods
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {foods?.map((food) => (
          <motion.div
            key={food?._id}
            className="relative group rounded-2xl overflow-hidden shadow-xl bg-white border border-yellow-200 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Top Pick Ribbon */}
            <div className="absolute -left-10 top-4 rotate-[-45deg] bg-yellow-400 text-white text-xs font-bold px-10 py-1 shadow-lg z-10">
              🏆 Top Pick
            </div>

            {/* Best Seller Badge */}
            {food?.purchaseCount > 50 && (
              <div className="absolute top-4 right-4 bg-blue-50 text-blue-500 text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10">
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
              <div className="absolute bottom-2 left-2 bg-white text-yellow-600 text-xs px-3 py-1 rounded-full shadow-md">
                🏷️ {food?.category}
              </div>
            </div>

            {/* Content area with flex-grow */}
            <div className="p-5 flex flex-col flex-grow ">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-stone-800">
                  {food?.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaGlobeAsia className="text-blue-500" />
                    {food?.origin}
                  </span>
                  <span className="flex items-center gap-1">
                    🛒 {food?.purchaseCount || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-yellow-600 relative">
                    ${food?.price}
                    {isRecentlyUpdated(food?.updateAt) && (
                      <span className="absolute -top-1 -right-3 text-yellow-700 text-sm font-semibold px-2 rounded-full h-3 w-3 shadow-sm items-center justify-center flex">
                        🔥
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-xs font-semibold py-1 px-3 rounded-full ${
                      food?.quantity > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {food?.quantity > 0
                      ? `${food?.quantity} left`
                      : "Out of stock"}
                  </span>
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
