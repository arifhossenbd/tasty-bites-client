import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { crudError } from "../../utils/CrudToast";
import { useLocation, useNavigate } from "react-router-dom";

const FoodForm = ({ onSubmit, style, btnText, header, food = {} }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/foods";
  const { user, loading: authLoading } = useAuth();
  let { foodName, foodImage, category, quantity, price, origin, description } =
    food;

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const foodData = {
      ...Object.fromEntries(formData.entries()),
      _id: food?._id,
    };

    try {
      await onSubmit({
        ...foodData,
        addedBy: { name: user?.displayName, email: user?.email },
      });
      form.reset();
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      crudError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        y: -50,
        opacity: 0,
        color: "#57534e",
      }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`card rounded-none ${style}`}
    >
      {/* 🍽️ Header (Reusable) */}
      {header}

      {/* 📝 Form Section */}
      <form onSubmit={handleForm} className="card-body">
        <fieldset className="fieldset space-y-3">
          {/* 🍔 Food Name */}
          <div>
            <label className="label font-semibold text-sm pb-1">
              🍽️ Food Name
            </label>
            <motion.input
              initial={{ opacity: 0, backgroundColor: "#a8a29E" }}
              animate={{ opacity: 1, backgroundColor: "#ffffff" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileFocus={{
                scale: 1.02,
                backgroundColor: "#57534e",
                color: "#ffffff",
                transition: { duration: 0.2 },
              }}
              id="foodName"
              type="text"
              name="foodName"
              defaultValue={foodName || ""}
              className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
              placeholder="Enter food name"
              required
            />
          </div>

          {/* 🖼️ Food Image */}
          <div>
            <label className="label font-semibold text-sm pb-1">
              📸 Food Image URL
            </label>
            <motion.input
              initial={{ opacity: 0, backgroundColor: "#a8a29E" }}
              animate={{ opacity: 1, backgroundColor: "#ffffff" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileFocus={{
                scale: 1.02,
                backgroundColor: "#57534e",
                color: "#ffffff",
                transition: { duration: 0.2 },
              }}
              id="foodImage"
              type="url"
              name="foodImage"
              defaultValue={foodImage || ""}
              className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* 🍱 Category */}
          <div>
            <label className="label font-semibold text-sm pb-1">
              🍕 Food Category
            </label>
            <motion.select
              initial={{ opacity: 0, backgroundColor: "#a8a29E" }}
              animate={{ opacity: 1, backgroundColor: "#ffffff" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileFocus={{
                scale: 1.02,
                backgroundColor: "#57534e",
                color: "#ffffff",
                transition: { duration: 0.2 },
              }}
              name="category"
              id="category"
              defaultValue={category || ""}
              className="w-full px-1.5 py-3 rounded-none outline-none focus:outline-none shadow-none border-none"
            >
              <option value="">😋 Select a Food</option>
              <option value="Fast Food">🍔 Fast Food</option>
              <option value="Dessert">🍰 Dessert</option>
              <option value="Beverage">🥤 Beverage</option>
            </motion.select>
          </div>

          {/* 🔢 Quantity */}
          <div>
            <label className="label font-semibold text-sm pb-1">
              🔢 Quantity
            </label>
            <motion.input
              initial={{ opacity: 0, backgroundColor: "#a8a29E" }}
              animate={{ opacity: 1, backgroundColor: "#ffffff" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileFocus={{
                scale: 1.02,
                backgroundColor: "#57534e",
                color: "#ffffff",
                transition: { duration: 0.2 },
              }}
              id="quantity"
              type="number"
              name="quantity"
              defaultValue={quantity || ""}
              className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
              placeholder="Enter quantity"
              min="1"
              max="1"
              required
            />
          </div>

          {/* 💰 Price */}
          <div>
            <label className="label font-semibold text-sm pb-1">
              💰 Price ($)
            </label>
            <motion.input
              initial={{ opacity: 0, backgroundColor: "#a8a29E" }}
              animate={{ opacity: 1, backgroundColor: "#ffffff" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileFocus={{
                scale: 1.02,
                backgroundColor: "#57534e",
                color: "#ffffff",
                transition: { duration: 0.2 },
              }}
              id="price"
              type="number"
              name="price"
              defaultValue={price || ""}
              className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
              placeholder="Enter price"
              min="10"
              required
            />
          </div>

          {/* 🌍 Food Origin */}
          <div>
            <label className="label font-semibold text-sm pb-1">
              🌍 Food Origin (Country)
            </label>
            <motion.input
              initial={{ opacity: 0, backgroundColor: "#a8a29E" }}
              animate={{ opacity: 1, backgroundColor: "#ffffff" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileFocus={{
                scale: 1.02,
                backgroundColor: "#57534e",
                color: "#ffffff",
                transition: { duration: 0.2 },
              }}
              id="origin"
              type="text"
              name="origin"
              defaultValue={origin || ""}
              className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
              placeholder="e.g., Bangladesh"
              required
            />
          </div>

          {/* 📖 Description */}
          <div>
            <label className="label font-semibold text-sm pb-1">
              📖 Description
            </label>
            <motion.textarea
              initial={{ opacity: 0, backgroundColor: "#a8a29E" }}
              animate={{ opacity: 1, backgroundColor: "#ffffff" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileFocus={{
                scale: 1.02,
                backgroundColor: "#57534e",
                color: "#ffffff",
                transition: { duration: 0.2 },
              }}
              id="description"
              name="description"
              defaultValue={description || ""}
              className="w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white p-2"
              placeholder="Ingredients, making procedure, etc."
              required
            ></motion.textarea>
          </div>

          {/* 📧 Email (Auto-filled, Not Editable) */}
          <div>
            <label className="label font-semibold text-sm pb-1">
              📧 Your Email
            </label>
            {authLoading ? (
              <div className="skeleton h-12 w-full"></div>
            ) : (
              <motion.input
                initial={{
                  opacity: 0,
                  backgroundColor: "#a8a29E",
                  color: "#57534e",
                }}
                animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                disabled
                type="email"
                name="email"
                defaultValue={user?.email || "arifprodev@gmail.com"}
                className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
                required
                readOnly
              />
            )}
          </div>

          {/* 🛒 Submit Button (Same as AuthForm) */}
          <div className="pt-4">
            <PrimaryBtn
              type="submit"
              color="stone"
              style="w-full"
              disabled={loading}
              btnText={
                loading ? (
                  <span className="loading loading-dots"></span>
                ) : (
                  <span>{btnText} Food 🛒</span>
                )
              }
            />
          </div>
        </fieldset>
      </form>
    </motion.div>
  );
};

export default FoodForm;
