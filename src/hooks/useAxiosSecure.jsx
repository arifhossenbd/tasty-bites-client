import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import axios from "axios";
import { useMemo } from "react";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://tasty-bites-server-eight.vercel.app",
      withCredentials: true,
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await signOut();
          navigate("/sign-in", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [navigate, signOut]);

  return axiosSecure;
};

export default useAxiosSecure;
