import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import PrimaryBtn from "../../component/Buttons/PrimaryBtn";
import PageHeader from "../../component/PageHeader/PageHeader";
import { useAuth } from "../../hooks/useAuth";
import Cart from "../Cart/Cart";
import { showErrorToast, showSuccessToast } from "../../utils/CrudToast";
import DataStatus from "../../component/DataStatus/DataStatus";
import { useCart } from "../../hooks/useCart";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { createData, getSecureData, loading, error } = useApi();
  const { user } = useAuth();
  const { addToCart, isInCart, cartItems } = useCart();
  const {
    name,
    image,
    category,
    origin,
    quantity,
    price,
    description,
    purchaseCount,
    addedBy,
  } = food || {};

  const userName = user?.displayName;
  const userEmail = user?.email;
  const seller = addedBy?.email === userEmail;

  const fetchFood = useCallback(async () => {
    try {
      const response = await getSecureData(
        `/food/details/${id}?t=${Date.now()}`
      );
      if (response?.success) {
        setFood(response?.data);
      } else {
        setFood(null);
      }
    } catch (error) {
      setFood(null);
    }
  }, [getSecureData, id]);

  useEffect(() => {
    fetchFood();
  }, []);

  const handleAddToCart = () => {
    if (!food) return;
    if (seller) {
      showErrorToast("Access Denied", "You can't buy your own product.");
      return;
    }

    if (isInCart(id)) {
      showErrorToast("Already in cart", "This item is already added.");
      return;
    }

    if (quantity <= 0) {
      showErrorToast("Out of Stock", "This item is currently unavailable.");
      return;
    }

    if (cartItems?.length <= 3) {
      const newItem = {
        foodId: id,
        image: image,
        name: name,
        category: category,
        price: price,
        quantity: 1,
        availableQuantity: quantity,
        user: {
          name: userName,
          email: userEmail,
        },
      };

      addToCart(newItem);
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
      showErrorToast("Oops..", "You reached the limit!");
    }
  };

  const handleAddToWishlist = async () => {
    if (!food) return;
    if (seller) {
      showErrorToast(
        "Action Restricted",
        "We appreciate your product! As the seller, you can't add it to your wishlist."
      );

      return;
    }

    if (isInCart(id)) {
      showErrorToast("Already in wishlist", "This item is already added.");
      return;
    }

    if (quantity <= 0) {
      showErrorToast("Out of Stock", "This item is currently unavailable.");
      return;
    }

    const newItem = {
      foodId: id,
      image: image,
      name: name,
      category: category,
      price: price,
      quantity: quantity,
      user: {
        name: userName,
        email: userEmail,
      },
    };
    const res = await createData("/add/wishlist", newItem);
    if (res?.success) {
      showSuccessToast(
        "Added to wishlist!",
        newItem,
        res?.message || `${name} has been added to your shopping cart.`,
        ""
      );
    } else showErrorToast("Oops..", res?.message);
  };
  return (
    <DataStatus
      loading={loading}
      error={error}
      data={food}
      btnText="Menu"
      path="/foods"
      title="Food not found"
      message="The requested food item could not be loaded."
    >
      <PageHeader
        title={name}
        subtitle={description?.substring(0, 100) + "..."}
        backgroundImage="/tasty-bites-images/banner/banner3.jpg"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Menu", path: "/foods" },
          { name: name },
        ]}
      />
      <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
        <div className="flex flex-col gap-8 pb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <figure className="bg-stone-100 overflow-hidden border border-stone-200 w-full h-80 md:h-96 rounded-lg">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt={name}
              />
            </figure>

            <div className="space-y-3">
              <p className="px-3 py-1 text-sm rounded-full font-medium bg-blue-100 text-blue-700 w-fit">
                {category}
              </p>

              <h1 className="text-3xl font-bold text-stone-900">{name}</h1>

              <p className="text-2xl font-bold text-yellow-600">
                ${price?.toFixed(2)}
              </p>

              <p className="text-stone-700">{origin}</p>

              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-100 border border-stone-200">
                  <span className="text-lg">📦</span>
                  <div>
                    <p className="text-stone-500 text-xs">Available</p>
                    <p
                      className={`font-semibold ${
                        quantity > 0 ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
                    </p>
                  </div>
                </div>

                {purchaseCount > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-100 border border-stone-200">
                    <span className="text-lg">🛒</span>
                    <div>
                      <p className="text-stone-500 text-xs">Sold</p>
                      <p className="font-semibold text-stone-700">
                        {purchaseCount} {purchaseCount === 1 ? "time" : "times"}
                      </p>
                    </div>
                  </div>
                )}

                {addedBy?.name && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-100 border border-stone-200">
                    <span className="text-lg">👤</span>
                    <div>
                      <p className="text-stone-500 text-xs">Added by</p>
                      <p className="font-medium">{addedBy.name}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <PrimaryBtn
                  type="button"
                  onClick={handleAddToCart}
                  btnText={quantity > 0 ? "Add To Cart" : "Out of Stock"}
                  className="flex-1"
                />
                <PrimaryBtn
                  onClick={handleAddToWishlist}
                  type="button"
                  style="btn btn-outline"
                  color="stone"
                  btnText="Add to Wishlist"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-stone-900 border-b pb-2">
              More Details
            </h3>
            <p className="text-stone-600">
              {description || "No ingredients information available."}
            </p>
          </div>
        </div>
        {isDrawerOpen && (
          <Cart
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onCheckoutSuccess={fetchFood}
          />
        )}
      </div>
    </DataStatus>
  );
};

export default FoodDetails;
