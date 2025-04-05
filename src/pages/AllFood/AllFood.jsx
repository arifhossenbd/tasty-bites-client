import { useEffect, useState } from "react";
import Food from "../Food/Food";
import Loading from "../../component/Loading/Loading";
import useApi from "../../hooks/useApi";
import DataStatus from "../../component/DataStatus/DataStatus";
import PageHeader from "../../component/PageHeader/PageHeader";
const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const { loading, error, getPublicData } = useApi();

  const fetchFoods = async () => {
    const result = await getPublicData("/foods");
    if (!result?.error) {
      setFoods(result?.data || []);
    } else {
      setFoods([]);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading && !error && foods?.length === 0) {
    return <Loading />;
  }

  return (
    <DataStatus
      isLoading={loading}
      error={error}
      data={foods}
      onRetry={fetchFoods}
      emptyMessage="No food items available"
    >
      <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
      <PageHeader
        title="Our Menu"
        subtitle="Discover our delicious offerings"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Menu" } // Current page (no path)
        ]}
        backgroundImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {foods?.map((food) => (
            <Food key={food?._id} food={food} />
          ))}
        </div>
      </div>
    </DataStatus>
  );
};

export default AllFood;
