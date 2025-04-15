import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const apiCall = async (requestFn) => {
    try {
      setLoading(true);
      const response = await requestFn();
      return {
        success: true,
        data: response?.data?.data,
        message: response?.data?.message,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: error?.response?.data || true,
        message: error?.response?.data?.message || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  // POST Request
  const createData = async (endpoint, data = {}) => {
    const result = await apiCall(() => axiosSecure.post(endpoint, data));
    return result;
  };

  // Public GET Request
  const getPublicData = async (endpoint, params = {}, config = {}) => {
    const result = await apiCall(() =>
      axiosPublic.get(endpoint, { params, ...config })
    );
    return result;
  };

  // Secure GET Request
  const getSecureData = async (endpoint, params = {}, config = {}) => {
    const result = apiCall(() =>
      axiosSecure.get(endpoint, { params, ...config })
    );
    return result;
  };

  // Full Update Data (PUT)
  const updateData = async (endpoint, data = {}, config = {}) => {
    const result = apiCall(() => axiosSecure.put(endpoint, data, config));
    return result;
  };

  // Partial Update Data (PATCH)
  const partialUpdateData = async (endpoint, data = {}, config = {}) => {
    const result = apiCall(() => axiosSecure.patch(endpoint, data, config));
    return result;
  };

  // Delete Data
  const deleteData = (endpoint) => {
    const result = apiCall(() => axiosSecure.delete(endpoint));
    return result;
  };

  return {
    loading,
    createData,
    getPublicData,
    getSecureData,
    updateData,
    partialUpdateData,
    deleteData,
  };
};

export default useApi;
