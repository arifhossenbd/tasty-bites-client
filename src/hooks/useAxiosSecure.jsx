import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import axios from "axios";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://tasty-bites-server-eight.vercel.app",
      withCredentials: true,
    });

    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
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
