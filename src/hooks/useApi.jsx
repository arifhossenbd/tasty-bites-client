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
      return response?.data;
    } catch (error) {
      console.error("API Error", error);
      return { error: error.message || "An error occurred" };
    } finally {
      setLoading(false);
    }
  };

  // POST Request
  const createData = (endpoint, data = {}, config = {}) => {
    return apiCall(() => axiosSecure.post(endpoint, data, config));
  };

  // Public GET Request
  const getPublicData = (endpoint, params = {}, config = {}) => {
    return apiCall(() => axiosPublic.get(endpoint, { params, ...config }));
  };

  // Secure GET Request
  const getSecureData = (endpoint, params = {}, config = {}) => {
    return apiCall(() => axiosSecure.get(endpoint, { params, ...config }));
  };

  // Full Update Data (PUT)
  const updateData = (endpoint, data = {}, config = {}) => {
    return apiCall(() => axiosSecure.put(endpoint, data, config));
  };

  // Partial Update Data (PATCH)
  const partialUpdateData = (endpoint, data = {}, config = {}) => {
    return apiCall(() => axiosSecure.patch(endpoint, data, config));
  };

  // Delete Data
  const deleteData = (endpoint, config = {}) => {
    return apiCall(() => axiosSecure.delete(endpoint, config));
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
