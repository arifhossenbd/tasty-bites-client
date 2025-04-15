import { useCallback, useEffect, useState } from "react";
import Banner from "../../component/Banner/Banner";
import TopFoods from "../../component/TopFoods/TopFoods";
import useApi from "../../hooks/useApi";
import DataStatus from "../../component/DataStatus/DataStatus";
import Categories from "../Categories/Categories";

const Home = () => {
  const [foods, setFoods] = useState();
  const { getPublicData, loading } = useApi();

  const fetchFoods = useCallback(async () => {
    try {
      const response = await getPublicData("/latest/foods");
      setFoods(response?.data);
    } catch (err) {
      console.error(err);
    }
  }, [getPublicData]);

  useEffect(() => {
    fetchFoods();
  }, []);
  return (
    <DataStatus
      loading={loading}
      data={foods}
      btnText="Home"
      path="/"
      onRetry={fetchFoods}
    >
      <Banner foods={foods} />
      <TopFoods />
      <Categories />
    </DataStatus>
  );
};

export default Home;
