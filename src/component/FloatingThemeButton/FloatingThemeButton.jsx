import { FaSun, FaMoon, FaTree, FaWater } from "react-icons/fa";
import { GiCupcake, GiStonePath } from "react-icons/gi";
import { MdColorLens } from "react-icons/md";
import useClickAway from "../../hooks/useClickAway";
import { motion, AnimatePresence } from "framer-motion";
import { themeConfig } from "../../utils/themeConfig";
import { useTheme } from "../../hooks/useTheme";

const iconMap = {
  stone: <GiStonePath />,
  light: <FaSun />,
  dark: <FaMoon />,
  cupcake: <GiCupcake />,
  forest: <FaTree />,
  ocean: <FaWater />,
  default: <MdColorLens />,
};


const FloatingThemeButton = () => {
  const { theme, setTheme, themes, showThemeOptions, setShowThemeOptions, currentTheme } =
    useTheme();
    const {activeBtn, primaryTextColor, inactiveBtn} = currentTheme;

  const panelRef = useClickAway(() => {
    setShowThemeOptions(false);
  });

  return (
    <div className="fixed right-4 bottom-1/2 translate-y-1/2 z-50">
      {/* Main Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
        className={`btn btn-circle backdrop-blur-md transition-all duration-300 ${inactiveBtn}`}
        onClick={() => setShowThemeOptions(!showThemeOptions)}
        aria-label="Change theme"
        aria-expanded={showThemeOptions}
      >
        <span  className={`text-lg ${primaryTextColor}`}>
          {iconMap[theme] || iconMap.default}
        </span>
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {showThemeOptions && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`absolute right-full top-0 mr-4 p-4 rounded-xl shadow-xl backdrop-blur-3xl w-96 ${currentTheme.cardBgColor}`}
          >
            <h3 className={`text-center font-bold mb-3 text-sm`}>
              🎨 Select Theme
            </h3>
            <div className={`grid grid-cols-2 gap-2`}>
              {themes.map((t) => {
                const themeData = themeConfig.themes[t] || themeConfig.themes.light;
                const isActive = theme === t;

                return (
                  <motion.button
                    key={t}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setTheme(t);
                      setShowThemeOptions(false);
                    }}
                    className={`flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 ${isActive ? `${activeBtn}` : `${inactiveBtn} border`}`}
                    aria-label={`Select ${t} theme`}
                  >
                    <span className="text-lg">
                      {iconMap[t] || iconMap.default}
                    </span>
                    <span>{themeData.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingThemeButton;