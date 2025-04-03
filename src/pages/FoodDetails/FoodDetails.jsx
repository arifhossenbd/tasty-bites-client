import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import Loading from "../../component/Loading/Loading";
import DataStatus from "../../component/DataStatus/DataStatus";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  console.log(id, food);
  const { loading, error, getSecureData } = useApi();

  const fetchFood = async () => {
    const result = await getSecureData(`/food/${id}`);
    if (!result?.error) {
      setFood(result?.data || null);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  if (loading || food === null) {
    return <Loading />;
  }
  
  const {
    _id,
    name,
    image,
    category,
    price,
    quantity,
    addedBy,
    origin,
    description,
    purchaseCount,
  } = food;
  return (
    <DataStatus
      isLoading={loading}
      error={error}
      data={food}
      onRetry={fetchFood}
      emptyMessage="Food not available"
    >
      {food && (
        <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto py-4 md:py-8 lg:py-12">
          <div className="card shadow hover:shadow-md rounded-none w-fit mx-auto">
            <figure className="max-w-2xl mx-auto">
              <img src={image} className="w-full h-full" alt={name} />
            </figure>
            <div className="p-4">
              <h2 className="card-title">{name}</h2>
              <p>{category}</p>
              <p>{price}</p>
            </div>
          </div>
        </div>
      )}
    </DataStatus>
  );
};

export default FoodDetails;
