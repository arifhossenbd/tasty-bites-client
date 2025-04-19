import { motion } from "framer-motion";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Social from "../../pages/Auth/Social";
import { useState } from "react";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import PageHeader from "../PageHeader/PageHeader";
import { useTheme } from "../../hooks/useTheme";

const AuthForm = ({
  header,
  subtitle = "",
  footer,
  fieldset,
  btnText,
  handleForm,
  loading,
  imgName = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { currentTheme } = useTheme();
  const {
    bgColor,
    cardBgColor,
    inputBgColor,
    inputTextColor,
    primaryBtnBgColor,
    primaryBtnTextColor,
    primaryTextColor,
  } = currentTheme;

  return (
    <div>
      <PageHeader
        title={btnText}
        subtitle={subtitle}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: `${btnText}` }]}
        backgroundImage={`/tasty-bites-images/banner/${imgName}`}
      />
      <div className={`py-8 md:py-12 ${bgColor}`}>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          className={`w-full max-w-lg mx-auto rounded-md shadow-xl hover:shadow-2xl ${cardBgColor}`}
        >
          {header}
          <form onSubmit={handleForm} className="p-6">
            <fieldset className="space-y-4">
              {fieldset}
              <div>
                <label htmlFor="email" className="block mb-1">
                  <span
                    className={`text-sm flex items-center gap-2 ${primaryTextColor}`}
                  >
                    <FaEnvelope /> Email
                  </span>
                </label>
                <motion.input
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileFocus={{
                    scale: 1.02,
                    backgroundColor: primaryBtnBgColor,
                    color: primaryBtnTextColor,
                    transition: { duration: 0.2 },
                  }}
                  id="email"
                  type="email"
                  name="email"
                  className={`input w-full rounded-md outline-none focus:outline-none shadow-none border-none focus:placeholder-white ${inputBgColor} ${inputTextColor}`}
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-1">
                  <span
                    className={`text-sm flex items-center gap-2 ${primaryTextColor}`}
                  >
                    <FaLock /> Password
                  </span>
                </label>
                <motion.input
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileFocus={{
                    scale: 1.02,
                    backgroundColor: primaryBtnBgColor,
                    color: primaryBtnTextColor,
                    transition: { duration: 0.2 },
                  }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`input w-full rounded-md outline-none focus:outline-none shadow-none border-none focus:placeholder-white pr-10 ${inputBgColor} ${inputTextColor}`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute top-11 right-1 transform -translate-y-1/2 z-10 hover:opacity-80 transition-opacity tooltip"
                  data-tip={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash
                      className={`text-xl md:text-2xl ${primaryTextColor}`}
                    />
                  ) : (
                    <FaEye
                      className={`text-xl md:text-2xl ${primaryTextColor}`}
                    />
                  )}
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
            <div className="mt-6">
              <Social />
            </div>
            {footer}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthForm;
