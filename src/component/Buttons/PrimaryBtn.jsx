import { motion } from "framer-motion";
const PrimaryBtn = ({ btnText }) => {
  return (
    <motion.button className="btn bg-stone-200 hover:text-white shadow-none border-none rounded-none relative overflow-hidden" whileHover="hover" initial="initial">
      <span className="font-normal uppercase tracking-widest relative z-10">{btnText}</span>
      <motion.span className="bg-stone-600 absolute inset-0 z-0 border-r-4 border-b-4" variants={{initial: {x: "-100%"}, hover: {x: 0}}} transition={{duration: 0.5, ease: "easeInOut"}}/>
    </motion.button>
  );
};

export default PrimaryBtn;
