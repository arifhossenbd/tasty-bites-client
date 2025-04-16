import { motion } from "framer-motion";
const PrimaryBtn = ({
  dataTip = "",
  btnText = "",
  onClick = () => {},
  loading,
  type = "button",
  color = "yellow",
  disabled = null,
  style,
}) => {
  const yellowBg = "#fde68a";
  const yellowText = "#92400e";
  const yellowHover = "#ffffff";
  const yellowSlide = "#f59e0b";

  const stoneBg = "#e7e5e4";
  const stoneText = "#57534e";
  const stoneHover = "#ffffff";
  const stoneSlide = "#57534e";
  const colorVariants = {
    yellow: {
      initial: { backgroundColor: yellowBg, color: yellowText },
      hover: { color: yellowHover },
      slide: { backgroundColor: yellowSlide },
    },
    stone: {
      initial: { backgroundColor: stoneBg, color: stoneText },
      hover: { color: stoneHover },
      slide: { backgroundColor: stoneSlide },
    },
  };

  const currentVariant = colorVariants[color] || colorVariants.yellow;

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
      variants={currentVariant}
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
            backgroundColor: currentVariant.slide.backgroundColor,
          },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default PrimaryBtn;
