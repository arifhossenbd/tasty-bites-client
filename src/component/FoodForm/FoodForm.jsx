import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { showErrorToast } from "../../utils/CrudToast";
import { useTheme } from "../../hooks/useTheme";

const FoodForm = ({ onSubmit, style, btnText, header, food = {} }) => {
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { currentTheme } = useTheme();

  const {
    cardTextColor,
    inputBgColor,
    inputTextColor,
    inputBorderColor,
    textColor,
  } = currentTheme;

  let { name, image, category, quantity, price, origin, description } = food;

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
    } catch (error) {
      console.error(error);
      showErrorToast(error?.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`${style}`}
      >
        {/* 🍽️ Header (Reusable) */}
        {header}

        {/* 📝 Form Section */}
        <form onSubmit={handleForm} className="card-body">
          <fieldset className="space-y-3">
            {/* 🍔 Food Name */}
            <div>
              <label
                className={`label font-semibold text-sm pb-1 ${textColor}`}
              >
                � Food Name
              </label>
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                id="name"
                type="text"
                name="name"
                defaultValue={name || ""}
                className={`input w-full rounded-md outline-none focus:outline-none ${inputBgColor} ${inputTextColor} border-none`}
                placeholder="Enter food name"
                required
              />
            </div>

            {/* 🖼️ Food Image */}
            <div>
              <label
                className={`label font-semibold text-sm pb-1 ${textColor}`}
              >
                📸 Food Image URL
              </label>
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                id="image"
                type="url"
                name="image"
                defaultValue={image || ""}
                className={`input w-full rounded-md outline-none focus:outline-none ${inputBgColor} ${inputTextColor} border-none`}
                placeholder="Enter image URL"
                required
              />
            </div>

            {/* 🍱 Category */}
            <div>
              <label
                className={`label font-semibold text-sm pb-1 ${textColor}`}
              >
                🍕 Food Category
              </label>
              <motion.select
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                name="category"
                id="category"
                defaultValue={category || ""}
                className={`w-full px-3 py-2 rounded-md outline-none ${inputBgColor} ${inputTextColor} border-none`}
              >
                <option value="">😋 Select a Food</option>
                <option value="Fast Food">🍔 Fast Food</option>
                <option value="Dessert">🍰 Dessert</option>
                <option value="Beverage">🥤 Beverage</option>
              </motion.select>
            </div>

            {/* 🔢 Quantity */}
            <div>
              <label
                className={`label font-semibold text-sm pb-1 ${textColor}`}
              >
                🔢 Quantity
              </label>
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                id="quantity"
                type="number"
                name="quantity"
                defaultValue={quantity || ""}
                className={`input w-full rounded-md outline-none focus:outline-none ${inputBgColor} ${inputTextColor} border-none`}
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>

            {/* 💰 Price */}
            <div>
              <label
                className={`label font-semibold text-sm pb-1 ${textColor}`}
              >
                💰 Price ($)
              </label>
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                id="price"
                type="number"
                name="price"
                defaultValue={price || ""}
                className={`input w-full rounded-md outline-none focus:outline-none ${inputBgColor} ${inputTextColor} border-none`}
                placeholder="Enter price"
                min="10"
                required
              />
            </div>

            {/* 🌍 Food Origin */}
            <div>
              <label
                className={`label font-semibold text-sm pb-1 ${textColor}`}
              >
                🌍 Food Origin (Country)
              </label>
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                id="origin"
                type="text"
                name="origin"
                defaultValue={origin || ""}
                className={`input w-full rounded-md outline-none focus:outline-none ${inputBgColor} ${inputTextColor} border-none`}
                placeholder="e.g., Bangladesh"
                required
              />
            </div>

            {/* 📖 Description */}
            <div>
              <label
                className={`label font-semibold text-sm pb-1 ${textColor}`}
              >
                📖 Description
              </label>
              <motion.textarea
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileFocus={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                id="description"
                name="description"
                defaultValue={description || ""}
                className={`w-full rounded-md outline-none focus:outline-none p-3 ${inputBgColor} ${inputTextColor} border-none`}
                placeholder="Ingredients, making procedure, etc."
                required
              ></motion.textarea>
            </div>

            {/* 📧 Email (Auto-filled, Not Editable) */}
            <div>
              <label
                className={`label font-semibold text-sm pb-1 ${textColor}`}
              >
                📧 Your Email
              </label>
              {authLoading ? (
                <div className={`skeleton h-12 w-full ${inputBgColor}`}></div>
              ) : (
                <motion.input
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  disabled
                  type="email"
                  name="email"
                  defaultValue={user?.email || "arifprodev@gmail.com"}
                  className={`input w-full rounded-md outline-none focus:outline-none ${inputBgColor} ${cardTextColor} border-none`}
                  required
                  readOnly
                />
              )}
            </div>

            {/* 🛒 Submit Button */}
            <div className="pt-4">
              <PrimaryBtn
                type="submit"
                color="primary"
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
    </div>
  );
};

export default FoodForm;
