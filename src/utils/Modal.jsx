import { motion, AnimatePresence } from "framer-motion";
import FoodForm from "../component/FoodForm/FoodForm";
import { useTheme } from "../hooks/useTheme";

const Modal = ({ isOpen, onClose, food, onUpdateSuccess }) => {
  const { currentTheme } = useTheme();

  const modalVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: { opacity: 0, y: 20 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal container */}
          <motion.div
            className={`relative rounded-md shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden ${currentTheme.cardBgColor} ${currentTheme.cardBorderColor} border`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal header */}
            <div className={`border-b ${currentTheme.borderColor} p-4 md:p-6 sticky top-0 ${currentTheme.cardBgColor} z-10`}>
              <div className="flex justify-between items-center">
                <h2 className={`text-xl md:text-2xl font-bold ${currentTheme.textColor}`}>
                  Update Food
                </h2>
                <motion.button
                  onClick={onClose}
                  className={`${currentTheme.textColor} hover:${currentTheme.accentColor} text-2xl md:text-3xl font-light`}
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  &times;
                </motion.button>
              </div>
            </div>

            {/* Modal content */}
            <div className="overflow-y-auto flex-1 px-4 md:px-6 py-4 md:py-6 lg:py-8">
              <FoodForm 
                food={food} 
                btnText="Update" 
                onSubmit={onUpdateSuccess} 
                onClose={onClose} 
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;