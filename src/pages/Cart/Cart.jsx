import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import PrimaryBtn from "../../component/Buttons/PrimaryBtn";
import { confirmToast, showErrorToast } from "../../utils/CrudToast";
import useApi from "../../hooks/useApi";
import toast from "react-hot-toast";
import { useCart } from "../../hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = ({ isOpen, onClose, onCheckoutSuccess }) => {
  const [quantities, setQuantities] = useState({});
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/foods";
  const {
    totalPrice,
    totalQuantity,
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
  } = useCart();
  const { createData } = useApi();

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item?.foodId] = item?.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (id, change) => {
    const currentQty = quantities[id] || 1;
    const cartItem = cartItems?.find((item) => item?.foodId === id);
    const maxQty = cartItem?.availableQuantity || 10;
  
    const newQty = Math.min(maxQty, Math.max(1, currentQty + change));
  
    if (newQty > cartItem?.availableQuantity) {
      showErrorToast("Oops.."
        `Only ${cartItem?.availableQuantity} available in stock!`
      );
      return;
    }
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    updateQuantity(id, newQty);
  };  

  const confirmDelete = (item) => {
    confirmToast({
      message: (
        <span>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-yellow-500">
            {item?.name}
          </span>
          ?
        </span>
      ),
      confirmText: "Yes, delete",
      cancelText: "No, keep it",
      onConfirm: async () => {
        removeFromCart(item);
      },
    });
  };

  const handlePurchased = async () => {
    if (cartItems?.length) {
      const orderData = {
        user: {
          photo: user?.photoURL,
          name: user?.displayName || "Arif Hossen",
          email: user?.email || "arifprodev@gmail.com",
        },
        orderDate: Date.now(),
        totalPrice,
        items: cartItems,
        pending: true
      };

      const res = await createData("/checkout", orderData);

      if (res?.success) {
        toast.success("Order confirmed");
        clearCart();
        setQuantities({});
        onClose();
        if (onCheckoutSuccess) {
          onCheckoutSuccess();
          navigate(from, { replace: true });
        }
      }
    } else {
      toast.error("Please try again later after add to cart");
    }
  };

  return (
    <div className={`drawer drawer-end z-50 ${isOpen ? "open" : ""}`}>
      <input
        id="cart-drawer"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked={isOpen}
      />
      <div className="drawer-side">
        <label
          htmlFor="cart-drawer"
          className="drawer-overlay"
          onClick={onClose}
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <div className="flex justify-between items-center mb-6 pr-4">
            <h2 className="text-xl font-bold text-stone-600">Your Cart</h2>
            <button className="btn btn-sm btn-circle" onClick={onClose}>
              ✕
            </button>
          </div>

          {cartItems?.length ? (
            <div className="pr-4">
              <div className="flex-1 overflow-y-auto pr-2">
                {cartItems?.map((item) => (
                  <div
                    key={item?.foodId}
                    className="flex items-start gap-3 mb-4"
                  >
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item?.name}</h3>
                      <p className="text-yellow-600 font-bold">
                        ${item?.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <div className="join">
                          <button
                            disabled={(quantities[item?.foodId] || 1) <= 1}
                            className="join-item btn btn-xs"
                            onClick={() =>
                              handleQuantityChange(item?.foodId, -1)
                            }
                          >
                            -
                          </button>
                          <button className="join-item btn btn-xs pointer-events-none">
                            {quantities[item?.foodId] || 1}
                          </button>
                          <button
                            disabled={(quantities[item?.foodId] || 1) >= 10}
                            className="join-item btn btn-xs"
                            onClick={() =>
                              handleQuantityChange(item?.foodId, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-xs btn-error ml-2"
                          onClick={() => confirmDelete(item)}
                        >
                          <FaTrash className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-300 pt-4">
                <div className="flex justify-between font-medium mb-1">
                  <span>Total Items:</span>
                  <span>{totalQuantity}</span>
                </div>
                <div className="flex justify-between font-bold text-yellow-600">
                  <span>Total Price:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 w-full">
                <PrimaryBtn
                  onClick={() => handlePurchased()}
                  style="w-full"
                  btnText="Proceed to Checkout"
                />
              </div>
            </div>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;