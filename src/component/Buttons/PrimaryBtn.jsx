import { motion } from "framer-motion";

const PrimaryBtn = ({
  dataTip = "",
  btnText = "",
  onClick = ()=> {},
  loading,
  type = "button",
  color = "yellow",
  disabled = null,
  style,
}) => {
  const colorVariants = {
    yellow: {
      initial: { backgroundColor: "#fde68a", color: "#92400e" },
      hover: { color: "#ffffff" },
      slide: { backgroundColor: "#f59e0b" },
    },
    stone: {
      initial: { backgroundColor: "#e7e5e4", color: "#57534e" },
      hover: { color: "#ffffff" },
      slide: { backgroundColor: "#57534e" },
    },
  };

  return (
    <motion.button
      data-tip={dataTip}
      disabled={disabled || loading}
      className={
        disabled || loading
          ? `${style} disabled:opacity-50 disabled:cursor-not-allowed p-2 font-normal uppercase tracking-widest`
          : `${style} btn relative overflow-hidden rounded-md border-none shadow-none font-normal uppercase tracking-widest`
      }
      initial="initial"
      variants={colorVariants[color]}
      whileHover={disabled ? "" : "hover"}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
    >
      <span className="relative z-10 px-4 py-2">{btnText}</span>
      <motion.span
        className="absolute inset-0 z-0"
        variants={{
          initial: {
            x: "-100%",
          },
          hover: {
            x: 0,
            backgroundColor: colorVariants[color].slide.backgroundColor,
          },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default PrimaryBtn;
