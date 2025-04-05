import { motion } from "framer-motion";
const SecondaryBtn = ({ children, loading, disabled, style }) => {
  return (
    <motion.button
      disabled={disabled || loading}
      type="button"
      className={`btn shadow-none border-none rounded-none relative overflow-hidden ${style} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      initial="initial"
      variants={{
        initial: { backgroundColor: "#e7e5e4", color: "#57534e" },
        hover: {
          color: "#ffffff",
        },
      }}
      whileHover={loading ? "" : "hover"}
      whileTap={{ scale: 0.98 }}
    >
      <span className="font-normal uppercase tracking-widest relative z-10">
        {children}
      </span>
      <motion.span
        className="absolute inset-0 z-0"
        variants={{
          initial: { x: "-100%" },
          hover: {
            x: 0,
            backgroundColor: "#57534e",
          },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default SecondaryBtn;
