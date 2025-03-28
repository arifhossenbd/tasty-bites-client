import { Navigate, replace, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { state } = useLocation();

  if (loading) {
    return <p className="text-center mt-12">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: state }} replace />;
  }
  return children;
};

export default PrivateRoutes;
