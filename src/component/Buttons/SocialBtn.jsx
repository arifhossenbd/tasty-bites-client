import { motion } from "framer-motion";

const SocialBtn = ({ children, socialAction }) => {
  return (
    <motion.button
      onClick={socialAction}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
      className="w-full btn rounded-none shadow-none border-none bg-stone-400 text-white hover:bg-stone-200 hover:text-stone-500"
    >
      {children}
    </motion.button>
  );
};

export default SocialBtn;
