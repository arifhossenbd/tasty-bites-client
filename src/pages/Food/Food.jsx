import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PrimaryBtn from "../../component/Buttons/PrimaryBtn";
import { useTheme } from "../../hooks/useTheme";

const Food = ({ food }) => {
  const { currentTheme } = useTheme();
  const {
    _id,
    name,
    image,
    category,
    price,
    quantity,
    origin,
    purchaseCount,
  } = food;

  return (
    <motion.div
      className={`card flex flex-col h-full ${currentTheme.cardBgColor} ${currentTheme.cardBorderColor}  ${currentTheme.textColor} border rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      {/* Image section */}
      <motion.figure className="relative h-56 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.4 },
          }}
        />
        {/* Category badge */}
        <div className={`absolute top-3 right-3 ${currentTheme.cardBgColor} px-3 py-1 text-xs font-semibold shadow-md rounded-full`}>
          {category}
        </div>
      </motion.figure>

      {/* Content section */}
      <div className="flex flex-col flex-grow p-4 gap-4">
        {/* Title and price */}
        <div className="flex-grow">
          <h3 className={`text-lg font-bold ${currentTheme.cardTextColor} mb-2 line-clamp-2`}>
            {name}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-bold">${price}</span>
            <span
              className={`text-xs py-1 px-2 rounded-full ${
                quantity > 0
                  ? currentTheme.successBgColor + " " + currentTheme.successColor
                  : currentTheme.dangerBgColor + " " + currentTheme.dangerColor
              }`}
            >
              {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${currentTheme.borderColor}`}></div>

        {/* More information */}
        <div className={`flex items-center justify-between gap-3 text-sm ${currentTheme.textColor} mb-3`}>
          <div className="flex items-center gap-2">
            <svg
              className={`w-4 h-4 ${currentTheme.textColor} opacity-70`}
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
            <span className="truncate">{origin}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className={`w-4 h-4 ${currentTheme.textColor} opacity-70`}
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
            <span>{purchaseCount ? purchaseCount : 0}</span>
          </div>
        </div>
        <div className="mt-auto">
          <Link to={`/food/details/${_id}`}>
            <PrimaryBtn 
              style="w-full" 
              btnText="View Details"
              type="button"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Food;