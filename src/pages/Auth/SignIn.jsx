import { FaUtensils } from "react-icons/fa";
import AuthForm from "../../component/AuthForm/AuthForm";
import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authError } from "../../utils/AuthToast";
import { useTheme } from "../../hooks/useTheme";
const SignIn = () => {
  const { signIn, loading } = useAuth();
  const { currentTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";

  const {
    textColor,
    cardTextColor,
    primaryTextColor,
  } = currentTheme;

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      authError(error);
    }
  };

  return (
    <AuthForm
      loading={loading}
      imgName="banner7.jpg"
      btnText="Sign In"
      handleForm={handleSignIn}
      subtitle="Sign in to access your account"
      header={
        <div className="w-full">
          <figure>
            <img
              src="/tasty-bites-images/banner/banner4.jpg"
              alt="Restaurant Interior"
              className="w-full h-48 object-cover rounded-t-md"
              loading="lazy"
            />
          </figure>
          <h2
            className={`card-title flex items-center justify-center mt-4 gap-2 ${textColor}`}
          >
            <FaUtensils /> Welcome Back!
          </h2>
        </div>
      }
      footer={
        <p className={`text-center mt-4 ${cardTextColor}`}>
          Don't have an account? Please{" "}
          <Link
            to="/sign-up"
            className={`link ${primaryTextColor} transition-colors opacity-80 hover:opacity-100`}
          >
            Sign Up
          </Link>
        </p>
      }
    />
  );
};

export default SignIn;
