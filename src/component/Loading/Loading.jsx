import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Loading = ({ 
  primaryText = "TastyBites", 
  secondaryText = "", 
  primaryColor = "#fbbf24",
  secondaryColor = "#fde68a" 
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const primaryLetters = primaryText?.split("") || [];
  const secondaryLetters = secondaryText?.split("") || [];

  const letterDelay = 80;
  const pauseDuration = 1000;

  useEffect(() => {
    const maxLength = Math.max(primaryLetters.length, secondaryLetters.length);
    let timer;

    const animate = () => {
      setActiveIndex(-1);
      
      let i = -1;
      timer = setInterval(() => {
        i++;
        setActiveIndex(i);
        
        if (i >= maxLength - 1) {
          clearInterval(timer);
          setTimeout(() => {
            animate();
          }, pauseDuration);
        }
      }, letterDelay);
    };

    animate();

    return () => clearInterval(timer);
  }, [primaryLetters.length, secondaryLetters.length]);

  const renderText = (letters, isPrimary = true) => (
    <div className="flex">
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{
            opacity: index <= activeIndex ? 1 : 0.2,
            y: index <= activeIndex ? 0 : 10,
            scale: index <= activeIndex ? 1 : 0.9,
            color: index === activeIndex 
              ? isPrimary ? primaryColor : secondaryColor
              : isPrimary ? secondaryColor : primaryColor
          }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );

  return (
    <div className="px-4 flex flex-col items-center justify-center h-screen gap-8">
      <div className="font-yesterYear text-3xl md:text-4xl lg:text-5xl">
        {primaryLetters.length > 0 && renderText(primaryLetters, true)}
      </div>
      {secondaryLetters.length > 0 && renderText(secondaryLetters, false)}
    </div>
  );
};

export default Loading;