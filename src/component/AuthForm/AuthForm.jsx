import { motion } from "framer-motion";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import SecondaryBtn from "../Buttons/SecondaryBtn";
import Social from "../../pages/Auth/Social";
import { useState } from "react";

const AuthForm = ({ header, footer, fieldset, btnText, handleForm, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="py-4 md:py-8 lg:py-12">
      <motion.div
        initial={{ y: -100, opacity: 0, backgroundColor: "#F5F5F4" }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="card w-full max-w-lg mx-auto rounded-none shadow-xl hover:shadow-2xl"
      >
        {header}
        <form onSubmit={handleForm} className="card-body">
          <fieldset className="fieldset space-y-2">
            {fieldset}
            <div>
              <label htmlFor="email" className="label">
                <span className=" flex items-center gap-2">
                  <FaEnvelope /> Email
                </span>
              </label>
              <motion.input
                initial={{ opacity: 0, backgroundColor: "#A8A29E" }}
                animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  backgroundColor: "#57534E",
                  color: "#ffffff",
                  transition: { duration: 0.2 },
                }}
                id="email"
                type="email"
                name="email"
                className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
                placeholder="example@email.com"
              />
            </div>
            <div className="relative">
              <label className="label">
                <span className=" flex items-center gap-2">
                  <FaLock /> Password
                </span>
              </label>
              <motion.input
                initial={{ opacity: 0, backgroundColor: "#A8A29E" }}
                animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  backgroundColor: "#57534E",
                  color: "#ffffff",
                  transition: { duration: 0.2 },
                }}
                type={showPassword ? "text" : "password"}
                name="password"
                className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder-white pr-8"
                placeholder="Enter your password"
              />
              <button
                className="text-lg md:text-xl absolute top-2/3 right-1 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="pt-4">
              <SecondaryBtn loading={loading} disabled={loading}>
                {loading ?  <span className="loading loading-spinner"></span> : <span>{btnText}</span>}
              </SecondaryBtn>
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
