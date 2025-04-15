import { FaUtensils } from "react-icons/fa";
import AuthForm from "../../component/AuthForm/AuthForm";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { authError } from "../../utils/AuthToast";
const SignIn = () => {
  const { signIn, loading } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signIn(email, password);
    } catch (error) {
      authError(error);
    }
  };

  return (
    <AuthForm
      loading={loading}
      btnText="Sign In"
      handleForm={handleSignIn}
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
          <h2 className="card-title flex items-center justify-center mt-4 gap-2">
            <FaUtensils /> Welcome Back!
          </h2>
        </div>
      }
      footer={
        <p className="text-center mt-4">
          Don't have an account? Please{" "}
          <Link
            to="/sign-up"
            className="link hover:text-yellow-600 dark:text-stone-50"
          >
            Sign Up
          </Link>
        </p>
      }
    />
  );
};

export default SignIn;
