import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import Loading from "../Loading/Loading";
import { FiAlertTriangle, FiFrown, FiRefreshCw } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";

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
  const { currentTheme } = useTheme();
  const {
    textColor,
    cardTextColor,
    primaryBtnBgColor,
    primaryBtnTextColor,
    primaryBtnHoverBgColor,
    accentColor,
    highlightColor,
    dangerColor,
    dangerBgColor,
    warningColor,
    warningBgColor
  } = currentTheme;

  if (loading || !data) {
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
      <div className={`text-center pt-24 md:pt-28 lg:pt-32 flex flex-col items-center justify-center gap-6 ${textColor}`}>
        <div className={`p-4 ${dangerBgColor} rounded-full`}>
          <FiAlertTriangle className={`${dangerColor} text-3xl`} />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold">Error Occurred</h2>
          <p className={cardTextColor}>
            {error?.message || error || "Something went wrong. Please try again."}
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-3">
          <Link to={path}>
            <PrimaryBtn 
              btnText={btnText}
              bgColor={primaryBtnBgColor}
              textColor={primaryBtnTextColor}
              hoverBgColor={primaryBtnHoverBgColor}
            />
          </Link>
          {onRetry && (
            <PrimaryBtn
              onClick={onRetry}
              btnText="Retry"
              icon={<FiRefreshCw className="mr-2" />}
              bgColor={dangerColor.replace('text-', 'bg-')}
              textColor="text-white"
              hoverBgColor={dangerColor.replace('text-', 'bg-').replace('00', '00')}
            />
          )}
        </div>
      </div>
    );
  }

  if (!hasData()) {
    return (
      <div className={`text-center pt-24 md:pt-28 lg:pt-32 flex flex-col items-center justify-center gap-6 ${textColor}`}>
        <div className={`p-4 ${warningBgColor} rounded-full`}>
          <FiFrown className={`${warningColor} text-3xl`} />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className={cardTextColor}>{message}</p>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-3">
          <Link to={path}>
            <PrimaryBtn 
              btnText={btnText}
              bgColor={primaryBtnBgColor}
              textColor={primaryBtnTextColor}
              hoverBgColor={primaryBtnHoverBgColor}
            />
          </Link>
          {onRetry && (
            <PrimaryBtn
              onClick={onRetry}
              btnText="Refresh"
              icon={<FiRefreshCw className="mr-2" />}
              bgColor={accentColor}
              textColor="text-white"
              hoverBgColor={highlightColor}
            />
          )}
        </div>
      </div>
    );
  }

  return children;
};

export default DataStatus;