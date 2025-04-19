import { FaCamera, FaInfo, FaUserPlus } from "react-icons/fa";
import AuthForm from "../../component/AuthForm/AuthForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { authError } from "../../utils/AuthToast";
import { useTheme } from "../../hooks/useTheme";

const SignUp = () => {
  const { signUp, loading } = useAuth();
  const { currentTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";

  const {
    textColor,
    cardTextColor,
    inputBgColor,
    inputTextColor,
    primaryBtnBgColor,
    primaryBtnTextColor,
    primaryTextColor
  } = currentTheme;

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { photo, name, email, password } = Object.fromEntries(formData);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

    if (!passwordRegex.test(password)) {
      authError({
        message:
          "Password must contain: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol",
      });
      return;
    }

    try {
      await signUp(email, password, name, photo);
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        navigate("/sign-in");
      }
    }
  };

  return (
    <AuthForm
      handleForm={handleSignUp}
      imgName="banner5.jpg"
      btnText="Sign Up"
      loading={loading}
      subtitle="Sign up to create a new account"
      header={
        <div className="w-full">
          <figure>
            <img
              src="/tasty-bites-images/banner/banner5.jpg"
              alt="Chef Preparing Food"
              className="w-full h-48 object-cover rounded-t-md"
              loading="lazy"
            />
          </figure>
          <h2 className={`card-title flex items-center justify-center mt-4 gap-2 ${textColor}`}>
            <FaUserPlus className={primaryTextColor} /> Join Tasty Bites
          </h2>
        </div>
      }
      fieldset={
        <fieldset className="fieldset space-y-2">
          <div>
            <label htmlFor="photo" className="label">
              <span className={`text-sm mb-1 flex items-center gap-2 ${cardTextColor}`}>
                <FaCamera className={primaryTextColor} /> Profile Photo URL
              </span>
            </label>
            <motion.input
              initial={{ opacity: 0, backgroundColor: inputBgColor }}
              animate={{ opacity: 1, backgroundColor: inputBgColor }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileFocus={{
                scale: 1.02,
                backgroundColor: primaryBtnBgColor,
                color: primaryBtnTextColor,
                transition: { duration: 0.2 },
              }}
              id="photo"
              type="url"
              name="photo"
              className={`input w-full rounded-md outline-none focus:outline-none shadow-none border-none ${inputBgColor} ${inputTextColor}`}
              placeholder="https://example/photo.jpg"
              pattern="https://.*"
            />
          </div>
          <div>
            <label htmlFor="name" className="label">
              <span className={`text-sm mb-1 flex items-center gap-2 ${cardTextColor}`}>
                <FaInfo className={primaryTextColor} /> Full Name
              </span>
            </label>
            <motion.input
              initial={{ opacity: 0, backgroundColor: inputBgColor }}
              animate={{ opacity: 1, backgroundColor: inputBgColor }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileFocus={{
                scale: 1.02,
                backgroundColor: primaryBtnBgColor,
                color: primaryBtnTextColor,
                transition: { duration: 0.2 },
              }}
              id="name"
              type="text"
              name="name"
              className={`input w-full rounded-md outline-none focus:outline-none shadow-none border-none ${inputBgColor} ${inputTextColor}`}
              placeholder="Arif Hossen"
              minLength="2"
            />
          </div>
        </fieldset>
      }
      footer={
        <p className={`text-center mt-4 ${cardTextColor}`}>
          Already have an account? Please{" "}
          <Link
            to="/sign-in"
            className={`link ${primaryTextColor} transition-colors opacity-80 hover:opacity-100`}
          >
            Sign In
          </Link>
        </p>
      }
    />
  );
};

export default SignUp;