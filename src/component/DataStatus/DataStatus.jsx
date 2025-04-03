import Loading from "../Loading/Loading";

const DataStatus = ({ isLoading, error, data, onRetry, children }) => {
  // Loading state
  if (isLoading && (!data || data.length === 0)) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-center h-screen justify-center items-center flex flex-col">
        <p className="text-stone-600 mb-4">{error || "Something went wrong"}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition w-fit"
        >
          Retry
        </button>
      </div>
    );
  }
  return children;
};

export default DataStatus;
