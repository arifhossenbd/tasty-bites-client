import { useAuth } from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import SocialBtn from "../../component/Buttons/SocialBtn";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { authError } from "../../utils/authToast";

const Social = () => {
  const { google, github, facebook } = useAuth();
  const socialProviders = [
    {
      action: google,
      icon: <FcGoogle className="text-xl mr-2" />,
      text: "Continue with Google",
    },
    {
      action: github,
      icon: <FaGithub className="text-xl mr-2" />,
      text: "Continue with GitHub",
      name: "github",
    },
    {
      action: facebook,
      icon: <FaFacebook className="text-xl mr-2" />,
      text: "Continue with Facebook",
      name: "facebook",
    },
  ];
  const handleSocialLogin = async (provider) => {
    try {
      await provider();
    } catch (error) {
      console.error(error);
      
    }
  };
  return (
    <motion.div
      className="flex flex-col items-center gap-2 md:gap-3 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
    >
      <div className="divider">OR</div>
      {socialProviders?.map(({ action, icon, text }, idx) => (
        <SocialBtn key={idx} socialAction={() => handleSocialLogin(action)}>
          <div className="flex items-center justify-center">
            {icon}
            {text}
          </div>
        </SocialBtn>
      ))}
    </motion.div>
  );
};

export default Social;
