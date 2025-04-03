import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  // Request interceptor to add authorization header
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await signOut();
        navigate("/sign-in");
      }
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
