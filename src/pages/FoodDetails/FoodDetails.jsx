import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import Loading from "../../component/Loading/Loading";
import PrimaryBtn from "../../component/Buttons/PrimaryBtn";
import PageHeader from "../../component/PageHeader/PageHeader";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState();
  const { loading, getSecureData } = useApi();

  const fetchFood = async () => {
    try {
      const result = await getSecureData(`/food/${id}`);
      setFood(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  if (loading) {
    return <Loading secondaryText="Details" />;
  }
  return (
    <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
      <PageHeader
        title={food?.foodName}
        subtitle={food?.description?.substring(0, 100) + "..."}
        backgroundImage="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Menu", path: "/foods" },
          { name: food?.foodName },
        ]}
      />

      <div>
        <div className="flex flex-col gap-8">
          <figure className="bg-stone-100 overflow-hidden border border-stone-200 w-full">
            <img
              src={food?.foodImage}
              className="w-full h-full object-cover"
              alt={food?.foodName}
            />
          </figure>
          <div className="space-y-3">
            <p className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 w-fit">
              {food?.category}
            </p>
            <h1 className="text-3xl font-bold text-stone-900">
              {food?.foodName}
            </h1>
            <p className="text-2xl font-bold text-yellow-600">
              ${food?.price.toFixed(2)}
            </p>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 text-sm ${
                  food?.quantity > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {food?.quantity > 0
                  ? `${food?.quantity} in stock`
                  : "Out of stock"}
              </span>
              {food?.purchaseCount > 0 && (
                <span className="text-sm text-stone-500">
                  {food?.purchaseCount} sold
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-stone-200 my-4"></div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-stone-900">
              Description
            </h3>
            <p className="text-stone-700">{food?.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2 w-fit">
              <svg
                className="w-5 h-5 mt-0.5 text-stone-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="text-stone-500">Origin</p>
                <p className="font-medium">{food?.origin}</p>
              </div>
            </div>

            {food?.addedBy?.name && (
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 text-stone-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div>
                  <p className="text-stone-500">Added by</p>
                  <p className="font-medium">{food?.addedBy?.name}</p>
                </div>
              </div>
            )}
          </div>
          <div className="pt-6 flex items-center justify-end gap-3">
            <PrimaryBtn
              disabled={food?.quantity <= 0}
              btnText={food?.quantity > 0 ? "Add To Cart" : "Out of Stock"}
            />
            <PrimaryBtn
              className="btn btn-outline"
              color="stone"
              disabled={food?.quantity <= 0}
              btnText={food?.quantity > 0 ? "Add to Wishlist" : "Out of Stock"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
