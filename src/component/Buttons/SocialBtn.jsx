import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const SocialBtn = ({ children, socialAction, type }) => {
  const { currentTheme } = useTheme();
  const {
    inactiveBtn,
    primaryBtnBgColor,
    primaryBtnTextColor
  } = currentTheme;

  return (
    <motion.button
      type={type}
      onClick={socialAction}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ 
        scale: 1.02,
        backgroundColor: primaryBtnBgColor,
        color: primaryBtnTextColor
      }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
      className={`w-full btn rounded-md shadow-none border-none ${inactiveBtn}`}
    >
      {children}
    </motion.button>
  );
};

export default SocialBtn;