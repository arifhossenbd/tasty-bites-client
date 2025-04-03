import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "../component/Loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = location?.pathname;

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: from }} replace />;
  }
  return children;
};

export default PrivateRoutes;
