import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://tasty-bites-server-eight.vercel.app", withCredentials: true
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
