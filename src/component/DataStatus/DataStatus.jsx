import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/PrimaryBtn";

const DataStatus = ({
  single,
  error,
  btnText,
  path,
  message,
  data,
  onRetry,
  children,
}) => {
  if (error) {
    return (
      <div className="text-center py-6 md:py-8 justify-center items-center flex flex-col gap-8 lg:gap-10">
        <p className="text-stone-600">{error || "Something went wrong"}</p>
        <div className="flex flex-col-reverse md:flex-row items-center gap-3">
          <Link to={path}>
            <PrimaryBtn btnText={btnText} />
          </Link>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition w-fit"
          >
            Retry
          </button>
        </div>
      </div>
    );
  } else if (!data?.length) {
    return (
      <div className="text-center py-6 md:py-8 justify-center items-center flex flex-col gap-8 lg:gap-10">
        <p className="text-stone-600 text-xl md:text-2xl lg:text-3xl">
          {message}
        </p>
        <div className="flex flex-col-reverse md:flex-row items-center gap-3">
          <Link to={path}>
            <PrimaryBtn btnText={btnText} />
          </Link>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition w-fit"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }
  return children;
};

export default DataStatus;
