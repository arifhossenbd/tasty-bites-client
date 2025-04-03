import { useEffect, useState } from "react";
import Food from "../Food/Food";
import Loading from "../../component/Loading/Loading";
import useApi from "../../hooks/useApi";
const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const { loading, getPublicData } = useApi();
  useEffect(() => {
    const fetchFoods = async () => {
      const result = await getPublicData("/foods");
      if (!result.error) {
        setFoods(result?.data || []);
      } else {
        setFoods([]);
      }
    };
    fetchFoods();
  }, [getPublicData]);

  if (loading && foods?.length === 0) {
    return <Loading />;
  }

  return (
    <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto py-4 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {foods?.map((food) => (
          <Food key={food?._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AllFood;
