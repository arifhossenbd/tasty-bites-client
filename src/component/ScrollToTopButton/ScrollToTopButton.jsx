import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none ${currentTheme.inactiveBtn}`}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
