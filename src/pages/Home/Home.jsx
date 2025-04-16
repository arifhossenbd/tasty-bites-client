import { useCallback, useEffect, useState } from "react";
import Banner from "../../component/Banner/Banner";
import TopFoods from "../../component/TopFoods/TopFoods";
import useApi from "../../hooks/useApi";
import DataStatus from "../../component/DataStatus/DataStatus";
import Categories from "../../component/Categories/Categories";
import { useTheme } from "../../hooks/useTheme";

const Home = () => {
  const [foods, setFoods] = useState();
  const { getPublicData, loading, error } = useApi();
  const { apply } = useTheme();

  const fetchFoods = useCallback(async () => {
    const response = await getPublicData("/latest/foods");
    setFoods(response?.data);
  }, [getPublicData]);

  useEffect(() => {
    fetchFoods();
  }, []);
  return (
    <DataStatus
      loading={loading}
      error={error}
      data={foods}
      btnText="Home"
      path="/"
      onRetry={fetchFoods}
    >
      <div className={apply("bg")}>
        <Banner foods={foods} />
        <TopFoods />
        <Categories />
      </div>
    </DataStatus>
  );
};

export default Home;
