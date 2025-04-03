import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const apiCall = async (
    requestFn,
    successMessage = null,
    errorMessage = null
  ) => {
    try {
      setLoading(true);
      setError(null)
      const response = await requestFn();
      if (successMessage) {
        toast.success(successMessage, {
          position: "top-center",
          duration: 3000,
        });
      }
      return response?.data;
    } catch (error) {
      let message =
        error.response?.data?.message ||
        error.message ||
        errorMessage ||
        "Something went wrong";
        setError(message)
      toast.error(message, {
        position: "top-center",
        duration: 3000,
      });
      console.error("API Error", error);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  // POST Request
  const createData = async (
    endpoint,
    data = {},
    config = {},
    successMessage = "Create successfully"
  ) => {
    return apiCall(
      () => axiosSecure.post(endpoint, data, config),
      successMessage,
      "Failed to create data"
    );
  };

  // Public GET Request
  const getPublicData = async (endpoint, params = {}, config = {}) => {
    return apiCall(
      () => axiosPublic.get(endpoint, { params, ...config }),
      null,
      "Failed to fetch data"
    );
  };

  // Secure GET Request
  const getSecureData = async (endpoint, params = {}, config = {}) => {
    return apiCall(
      () => axiosSecure.get(endpoint, { params, ...config }),
      null,
      "Failed to fetch data"
    );
  };

  // Full Update Data (PUT)
  const updateData = async (
    endpoint,
    data = {},
    config = {},
    successMessage = "Updated successfully"
  ) => {
    return apiCall(
      () => axiosSecure.put(endpoint, data, config),
      successMessage,
      "Failed to update data"
    );
  };

  // Partial Update Data (PATCH)
  const partialUpdateData = async (
    endpoint,
    data = {},
    config = {},
    successMessage = "Updated successfully"
  ) => {
    return apiCall(
      () => axiosSecure.patch(endpoint, data, config),
      successMessage,
      "Failed to partially update data"
    );
  };

  // Delete Data
  const deleteData = async (
    endpoint,
    config = {},
    successMessage = "Deleted successfully"
  ) => {
    return apiCall(
      () => axiosSecure.delete(endpoint, config),
      successMessage,
      "Failed to delete data"
    );
  };

  return {
    loading,
    error,
    createData,
    getPublicData,
    getSecureData,
    updateData,
    partialUpdateData,
    deleteData,
  };
};

export default useApi;
