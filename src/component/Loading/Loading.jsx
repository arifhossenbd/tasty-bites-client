import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

const Loading = ({
  text = "TastyBites",
  primaryColor = "#fbbf24",
  secondaryColor = "#fde68a",
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const {apply} = useTheme()
  const letters = text?.split("") || [];

  const letterDelay = 80;
  const pauseDuration = 1000;

  useEffect(() => {
    let timer;

    const animate = () => {
      setActiveIndex(-1);

      let i = -1;
      timer = setInterval(() => {
        i++;
        setActiveIndex(i);

        if (i >= letters.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            animate();
          }, pauseDuration);
        }
      }, letterDelay);
    };

    animate();

    return () => clearInterval(timer);
  }, [letters.length]);

  return (
    <div className={ apply ? `${apply("bg")} px-4 flex items-center justify-center h-screen` : `px-4 flex items-center justify-center h-screen`}>
      <div className="font-yesterYear text-3xl md:text-4xl lg:text-5xl flex">
        {letters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{
              opacity: index <= activeIndex ? 1 : 0.2,
              y: index <= activeIndex ? 0 : 10,
              scale: index <= activeIndex ? 1 : 0.9,
              color: index === activeIndex ? primaryColor : secondaryColor,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
