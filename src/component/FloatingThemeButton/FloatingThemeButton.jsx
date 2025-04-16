import { useContext } from "react";
import { FaSun, FaMoon, FaTree, FaCrown } from "react-icons/fa";
import { GiCupcake } from "react-icons/gi";
import { MdColorLens } from "react-icons/md";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import useClickAway from "../../hooks/useClickAway";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = {
  light: <FaSun className="text-yellow-500" />,
  dark: <FaMoon className="text-gray-200" />,
  cupcake: <GiCupcake className="text-pink-400" />,
  forest: <FaTree className="text-green-600" />,
  luxury: <FaCrown className="text-yellow-400" />,
  default: <MdColorLens className="text-blue-400" />,
};

const themeStyles = {
  light: {
    button: "bg-gray-500/20 text-gray-800",
    panel: "bg-gray-500/10 text-gray-100",
    active: "border-white",
    text: "text-gray-100",
  },
  dark: {
    button: "bg-gray-500/20 text-gray-100",
    panel: "bg-gray-500/10 text-gray-100",
    active: "border-white",
    text: "text-gray-100",
  },
  cupcake: {
    button: "bg-pink-500/20 text-pink-200",
    panel: "bg-pink-500/10 text-pink-200",
    active: "border-white",
    text: "text-pink-200",
  },
  forest: {
    button: "bg-green-500/20 text-green-200",
    panel: "bg-green-500/10 text-green-200",
    active: "border-white",
    text: "text-green-200",
  },
  luxury: {
    button: "bg-yellow-500/20 text-yellow-200",
    panel: "bg-yellow-500/10 text-yellow-200",
    active: "border-white",
    text: "text-yellow-200",
  },
  default: {
    button: "bg-base-200 text-base-content",
    panel: "bg-base-100 text-base-content",
    active: "border-white",
    text: "text-base-content",
  },
};

const FloatingThemeButton = () => {
  const { theme, setTheme, themes, showThemeOptions, setShowThemeOptions } =
    useContext(ThemeContext);

  const panelRef = useClickAway(() => {
    setShowThemeOptions(false);
  });

  const currentThemeStyle = themeStyles[theme] || themeStyles.default;

  return (
    <div className="fixed right-4 bottom-1/2 translate-y-1/2 z-50">
      {/* Main Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
        className={`btn btn-circle backdrop-blur-md border border-white/10 transition-all duration-300
          ${currentThemeStyle.button}`}
        onClick={() => setShowThemeOptions(!showThemeOptions)}
        aria-label="Change theme"
        aria-expanded={showThemeOptions}
        style={{
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
        }}
      >
        <span className="text-xl">{iconMap[theme] || iconMap.default}</span>
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
            className={`absolute right-full top-0 mr-4 p-4 rounded-xl shadow-xl backdrop-blur-md border border-white/10 w-60 ${currentThemeStyle.panel}`}
          >
            <h3 className="text-center font-bold mb-3 text-sm">
              🎨 Select Theme
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => {
                const isActive = theme === t;
                const themeStyle = themeStyles[t] || themeStyles.default;

                return (
                  <motion.button
                    key={t}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setTheme(t);
                      setShowThemeOptions(false);
                    }}
                    className={`btn btn-sm shadow-none rounded-full capitalize justify-start items-center gap-2 transition-all duration-300
                      ${isActive ? themeStyle.active : "border border-white/10"}
                      ${themeStyle.button}`}
                    aria-label={`Select ${t} theme`}
                  >
                    <span className="text-lg">
                      {iconMap[t] || iconMap.default}
                    </span>
                    <span className={themeStyle.text}>{t}</span>
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
