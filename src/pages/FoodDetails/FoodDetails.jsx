import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import Loading from "../../component/Loading/Loading";
import DataStatus from "../../component/DataStatus/DataStatus";
import PrimaryBtn from "../../component/Buttons/PrimaryBtn";
import SecondaryBtn from "../../component/Buttons/SecondaryBtn";
import PageHeader from "../../component/PageHeader/PageHeader";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
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
    <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
      <PageHeader
        title={food.name}
        subtitle={food.description.substring(0, 100) + "..."}
        backgroundImage="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Menu", path: "/foods" },
          { name: food.name },
        ]}
      />
      <DataStatus
        isLoading={loading}
        error={error}
        data={food}
        onRetry={fetchFood}
        emptyMessage="Food not available"
      >
        <div>
          <div className="flex flex-col gap-8">
            {/* Image Section - Fixed aspect ratio */}
            <figure className="bg-stone-100 overflow-hidden border border-stone-200 w-full">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt={name}
              />
            </figure>

            {/* Details Section */}
            <div className="space-y-3">
              <p className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 w-fit">
                {category}
              </p>
              <h1 className="text-3xl font-bold text-stone-900">{name}</h1>
              <p className="text-2xl font-bold text-amber-600">
                ${price.toFixed(2)}
              </p>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-sm ${
                    quantity > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
                </span>
                {purchaseCount > 0 && (
                  <span className="text-sm text-stone-500">
                    {purchaseCount} sold
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-stone-200 my-4"></div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-stone-900">
                Description
              </h3>
              <p className="text-stone-700">{description}</p>
            </div>

            {/* Additional Info */}
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
                  <p className="font-medium">{origin}</p>
                </div>
              </div>

              {addedBy?.name && (
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
                    <p className="font-medium">{addedBy?.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex items-center justify-end gap-3">
              <PrimaryBtn
                disabled={quantity <= 0}
                btnText={quantity > 0 ? "Buy Now" : "Out of Stock"}
              />
              {/* <button className="btn btn-outline border-stone-300 hover:bg-stone-50 w-full sm:w-auto">
                Add to Wishlist
              </button> */}
              <SecondaryBtn disabled={quantity <= 0}>
                {quantity > 0 ? "Add to Wishlist" : "Out of Stock"}
              </SecondaryBtn>
            </div>
          </div>
        </div>
      </DataStatus>
    </div>
  );
};

export default FoodDetails;
