import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [],
  backgroundImage,
  children,
}) => {
  const { currentTheme } = useTheme();
  const {
    navBgColor,
    navTextColor,
    footerTextColor,
    inactiveText,
  } = currentTheme;

  return (
    <div className={`relative h-72 w-full overflow-hidden ${navBgColor} mt-16`}>
      {/* Background Image (dynamic) */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Header background"
          className="w-full h-full object-cover opacity-70"
        />
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
        {/* Breadcrumb Navigation (dynamic) */}
        {breadcrumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center text-sm ${navTextColor} mb-4`}
          >
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {crumb.path ? (
                  <NavLink
                    to={crumb.path}
                    className={`${inactiveText} transition-colors`}
                  >
                    {crumb.name}
                  </NavLink>
                ) : (
                  <span className={`${inactiveText} font-medium`}>
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
          className={`text-4xl md:text-5xl font-bold ${navTextColor} mb-2`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`text-lg ${footerTextColor} max-w-2xl`}
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;