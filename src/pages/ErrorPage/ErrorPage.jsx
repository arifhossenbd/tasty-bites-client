import { Link, useRouteError } from "react-router-dom";
import { transition } from "../../hooks/useTransition";
import PrimaryBtn from "../../component/Buttons/PrimaryBtn";

const ErrorPage = () => {
  const err = useRouteError();
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen gap-6 md:gap-8 lg:gap-10 ${transition} bg-black px-4 md:px-0`}
    >
      <div className={`flex flex-col items-center justify-center gap-1 ${transition}`}>
        <div
          className={`text-6xl md:text-7xl lg:text-8xl font-bold text-stone-700`}
        >
          {err.status ? <h2>{err.status}!</h2> : ""}
        </div>
        <p className={`text-lg font-semibold text-stone-500`}>{err.message}</p>
        <p
          className={`font-semibold md:font-bold text-xl md:text-2xl lg:text-3xl text-stone-500`}
        >
          {err.statusText || ""}
        </p>
        {!err.status && (
          <p className="text-stone-500">
            An unexpected error has occurred.
          </p>
        )}
      </div>
      <div>
        <Link to={"/"}>
          <PrimaryBtn btnText="Back to Home" />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
