import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const text = "TastyBites";
const letters = text.split("");

const Loading = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const letterDelay = 100;
  const animationDuration = 0.1;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % letters.length);
    }, letterDelay);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex text-5xl md:text-6xl lg:text-7xl font-yesterYear">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{
              opacity: index <= activeIndex ? 1 : 0.2,
              y: index <= activeIndex ? 0 : 10,
              scale: index <= activeIndex ? 1 : 0.9,
              color: index === activeIndex ? "#d8b4fe" : "#78716c"
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 15,
              duration: animationDuration,
              color: { duration: 0.1 }
            }}
            style={{
              display: "inline-block",
              minWidth: char === " " ? "0.5em" : "auto",
              willChange: "transform, opacity"
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default Loading;