import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import Loading from "../Loading/Loading";
import { FiAlertTriangle, FiFrown, FiRefreshCw } from "react-icons/fi";

const DataStatus = ({
  error,
  loading,
  btnText = "Go Back",
  path = "/",
  title = "No Data Found",
  message = "We couldn't find what you're looking for",
  data,
  onRetry,
  children,
}) => {

  if (loading) {
    return <Loading />;
  }
  const hasData = () => {
    if (data === undefined || data === null) return false;
    if (Array.isArray(data)) return data.length > 0;
    if (typeof data === "object") return Object.keys(data).length > 0;
    return true;
  };

  if (error) {
    return (
      <div className="text-center py-10 md:py-12 flex flex-col items-center justify-center gap-6">
        <div className="p-4 bg-red-100 rounded-full">
          <FiAlertTriangle className="text-red-500 text-3xl" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-stone-700">Error Occurred</h2>
          <p className="text-stone-600">
            {error.message ||
              error ||
              "Something went wrong. Please try again."}
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-3">
          <Link to={path}>
            <PrimaryBtn btnText={btnText} />
          </Link>
          {onRetry && (
            <PrimaryBtn
              onClick={onRetry}
              btnText="Retry"
              icon={<FiRefreshCw className="mr-2" />}
              style="bg-red-600 hover:bg-red-700"
            />
          )}
        </div>
      </div>
    );
  }

  if (!hasData()) {
    return (
      <div className="text-center py-10 md:py-12 flex flex-col items-center justify-center gap-6">
        <div className="p-4 bg-yellow-100 rounded-full">
          <FiFrown className="text-yellow-500 text-3xl" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-stone-700">{title}</h2>
          <p className="text-stone-600">{message}</p>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-3">
          <Link to={path}>
            <PrimaryBtn btnText={btnText} />
          </Link>
          {onRetry && (
            <PrimaryBtn
              onClick={onRetry}
              btnText="Refresh"
              icon={<FiRefreshCw className="mr-2" />}
              style="bg-blue-600 hover:bg-blue-700"
            />
          )}
        </div>
      </div>
    );
  }

  return children;
};

export default DataStatus;
