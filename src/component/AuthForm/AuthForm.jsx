import { motion } from "framer-motion";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Social from "../../pages/Auth/Social";
import { useState } from "react";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { useTheme } from "../../hooks/useTheme";

const AuthForm = ({
  header,
  footer,
  fieldset,
  btnText,
  handleForm,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, styles } = useTheme();

  // Get dynamic background colors for animations
  const getBgColor = (type) => {
    switch(type) {
      case 'input':
        return theme.name === 'dark' ? '#374151' : '#ffffff';
      case 'focus':
        return theme.name === 'dark' ? '#4B5563' : '#57534E';
      default:
        return theme.name === 'dark' ? '#1F2937' : '#F5F5F4';
    }
  };

  return (
    <div className={`py-4 md:py-8 lg:py-12`}>
      <motion.div
        initial={{ y: -100, opacity: 0, backgroundColor: getBgColor() }}
        animate={{ y: 0, opacity: 1, backgroundColor: theme.bg.replace('bg-', '') }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className={`card w-full max-w-lg mx-auto rounded-md shadow-xl hover:shadow-2xl ${styles.card(theme)}`}
      >
        {header}
        <form onSubmit={handleForm} className="card-body">
          <fieldset className="fieldset space-y-2">
            {fieldset}
            <div>
              <label htmlFor="email" className="label">
                <span className={`text-sm mb-1 flex items-center gap-2 ${theme.text}`}>
                  <FaEnvelope className={theme.icon} /> Email
                </span>
              </label>
              <motion.input
                initial={{ opacity: 0, backgroundColor: getBgColor('input') }}
                animate={{ opacity: 1, backgroundColor: getBgColor('input') }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  backgroundColor: getBgColor('focus'),
                  color: theme.name === 'dark' ? '#F3F4F6' : '#FFFFFF',
                  transition: { duration: 0.2 },
                }}
                id="email"
                type="email"
                name="email"
                className={`input w-full rounded-md outline-none focus:outline-none shadow-none border-none ${styles.input(theme)}`}
                placeholder="example@email.com"
              />
            </div>
            <div className="relative">
              <label className="label">
                <span className={`text-sm mb-1 flex items-center gap-2 ${theme.text}`}>
                  <FaLock className={theme.icon} /> Password
                </span>
              </label>
              <motion.input
                initial={{ opacity: 0, backgroundColor: getBgColor('input') }}
                animate={{ opacity: 1, backgroundColor: getBgColor('input') }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  backgroundColor: getBgColor('focus'),
                  color: theme.name === 'dark' ? '#F3F4F6' : '#FFFFFF',
                  transition: { duration: 0.2 },
                }}
                type={showPassword ? "text" : "password"}
                name="password"
                className={`input w-full rounded-md outline-none focus:outline-none shadow-none border-none ${styles.input(theme)} pr-8`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className={`text-lg md:text-xl absolute top-2/3 right-1 -translate-y-1/2 ${theme.icon}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="pt-4 w-full">
              <PrimaryBtn
                color="stone"
                style="w-full"
                type="submit"
                disabled={loading}
                btnText={
                  loading ? (
                    <span className="loading loading-dots"></span>
                  ) : (
                    <span>{btnText}</span>
                  )
                }
              />
            </div>
          </fieldset>
          <div>
            <Social />
          </div>
          {footer}
        </form>
      </motion.div>
    </div>
  );
};

export default AuthForm;