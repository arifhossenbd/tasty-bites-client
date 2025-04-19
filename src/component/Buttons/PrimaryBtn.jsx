import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const PrimaryBtn = ({
  dataTip = "",
  btnText = "",
  onClick = () => {},
  loading,
  type = "button",
  disabled = null,
  style,
}) => {
  const { currentTheme } = useTheme();
  
  // Destructure theme colors for button
  const { primaryBtnBgColor, primaryBtnTextColor, primaryBtnHoverBgColor, primaryBtnHoverTextColor } = currentTheme;

  // Button variants for animation
  const buttonVariants = {
    initial: { 
      backgroundColor: primaryBtnBgColor,
      color: primaryBtnTextColor
    },
    hover: {
      backgroundColor: primaryBtnHoverBgColor,
      color: primaryBtnHoverTextColor
    },
    tap: {
      backgroundColor: primaryBtnHoverBgColor,
      scale: 0.98
    }
  };

  // Slide effect variants (for the background animation)
  const slideVariants = {
    initial: { x: "-100%" },
    hover: { x: 0 }
  };

  return (
    <motion.button
      data-tip={dataTip}
      disabled={loading || disabled}
      className={
        loading || disabled
          ? `${style} disabled:opacity-50 disabled:cursor-not-allowed p-2 font-normal uppercase tracking-widest rounded-md`
          : `${style} btn relative overflow-hidden rounded-md border-none shadow-none font-normal uppercase tracking-widest`
      }
      initial="initial"
      variants={!disabled && buttonVariants}
      whileHover={!disabled && "hover"}
      whileTap={!disabled &&  "tap"}
      type={type}
      onClick={onClick}
    >
      <span className="relative z-10 px-4 py-2">{btnText}</span>
      <motion.span
        className="absolute inset-0 z-0"
        variants={slideVariants}
        style={{ backgroundColor: primaryBtnHoverBgColor }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default PrimaryBtn;