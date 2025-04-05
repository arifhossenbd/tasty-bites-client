import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [],
  backgroundImage,
  children,
}) => {
  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Header Container */}
      <div className="relative h-64 w-full overflow-hidden bg-stone-900">
        {/* Background Image (dynamic) */}
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Header background"
            className="w-full h-full object-cover opacity-70"
          />
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-12">
          {/* Breadcrumb Navigation (dynamic) */}
          {breadcrumbs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center text-sm text-white mb-4"
            >
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {crumb.path ? (
                    <NavLink
                      to={crumb.path}
                      className="hover:text-amber-300 transition-colors"
                    >
                      {crumb.name}
                    </NavLink>
                  ) : (
                    <span className="text-amber-300 font-medium">
                      {crumb.name}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* Title & Subtitle (dynamic) */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-2"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-lg text-stone-200 max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Additional children content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
