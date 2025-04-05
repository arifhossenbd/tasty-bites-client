import { motion } from "framer-motion";

const PrimaryBtn = ({
  btnText,
  onClick,
  loading,
  type = "button",
  color = "amber",
  disabled = null, style
}) => {
  const colorVariants = {
    amber: {
      initial: { backgroundColor: "#fef3c7", color: "#92400e" },
      hover: { color: "#ffffff" },
      slide: { backgroundColor: "#d97706", borderColor: "#92400e" },
    },
    stone: {
      initial: { backgroundColor: "#e7e5e4", color: "#57534e" },
      hover: { color: "#ffffff" },
      slide: { backgroundColor: "#57534e", borderColor: "#57534e" },
    },
  };

  return (
    <motion.button
      disabled={disabled || loading}
      className={`btn relative overflow-hidden rounded-none font-normal uppercase tracking-widest ${style} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
}`}
      initial="initial"
      variants={colorVariants[color]}
      whileHover={disabled ? "" : "hover"}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
    >
      <span className="relative z-10 px-4 py-2">{btnText}</span>
      <motion.span
        className="absolute inset-0 z-0 border-b-2 border-r-2"
        variants={{
          initial: {
            x: "-100%",
            borderColor: "transparent", // No border initially
          },
          hover: {
            x: 0,
            backgroundColor: colorVariants[color].slide.backgroundColor,
            borderColor: colorVariants[color].slide.borderColor,
          },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default PrimaryBtn;
