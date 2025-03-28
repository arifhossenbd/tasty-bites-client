import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import SecondaryBtn from "../Buttons/SecondaryBtn";

const FoodForm = ({
  onSubmit,
  btnText = "Add Food",
  header,
  defaultValues = {},
  user,
}) => {
  const [loading, setLoading] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const foodData = Object.fromEntries(formData.entries());

    try {
      await onSubmit({
        ...foodData,
        addedBy: { name: user?.name, email: user?.email },
      });
      toast.success("🍕 Food item successfully added!");
      e.target.reset();
    } catch (error) {
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 md:py-10 lg:py-12">
      <motion.div
        initial={{ y: -50, opacity: 0, backgroundColor: "#f5f5f4" }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="card w-full max-w-lg mx-auto shadow-xl hover:shadow-2xl rounded-none"
      >
        {/* 🍽️ Header (Reusable) */}
        {header}

        {/* 📝 Form Section */}
        <form onSubmit={handleForm} className="card-body">
          <fieldset className="fieldset space-y-3">
            {/* 🍔 Food Name */}
            <div>
              <label className="label font-semibold">🍽️ Food Name</label>
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
                defaultValue={defaultValues.foodName || ""}
                className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
                placeholder="Enter food name"
                required
              />
            </div>

            {/* 🖼️ Food Image */}
            <div>
              <label className="label font-semibold">📸 Food Image URL</label>
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
                defaultValue={defaultValues.foodImage || ""}
                className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
                placeholder="Enter image URL"
                required
              />
            </div>

            {/* 🍱 Category */}
            <div>
              <label className="label font-semibold">🍕 Food Category</label>
              <select name="category" className="w-full p-2 border rounded-md">
                <option value="Fast Food">🍔 Fast Food</option>
                <option value="Dessert">🍰 Dessert</option>
                <option value="Beverage">🥤 Beverage</option>
              </select>
            </div>

            {/* 🔢 Quantity */}
            <div>
              <label className="label font-semibold">🔢 Quantity</label>
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
                defaultValue={defaultValues.quantity || ""}
                className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>

            {/* 💰 Price */}
            <div>
              <label className="label font-semibold">💰 Price ($)</label>
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
                defaultValue={defaultValues.price || ""}
                className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
                placeholder="Enter price"
                min="1"
                required
              />
            </div>

            {/* 🌍 Food Origin */}
            <div>
              <label className="label font-semibold">
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
                defaultValue={defaultValues.origin || ""}
                className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
                placeholder="e.g., Italy"
                required
              />
            </div>

            {/* 📖 Description */}
            <div>
              <label className="label font-semibold">📖 Description</label>
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
                name="description"
                defaultValue={defaultValues.description || ""}
                className="w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white p-2"
                placeholder="Ingredients, making procedure, etc."
                required
              ></motion.textarea>
            </div>

            {/* 📧 Email (Auto-filled, Not Editable) */}
            <div>
              <label className="label font-semibold">📧 Your Email</label>
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
                disabled
                type="email"
                name="email"
                value={user?.email}
                className="input w-full rounded-none outline-none focus:outline-none shadow-none border-none focus:placeholder:text-white"
                required
                readOnly
              />
            </div>

            {/* 🛒 Submit Button (Same as AuthForm) */}
            <div className="pt-4">
              <SecondaryBtn>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <span>{btnText} 🛒</span>
                )}
              </SecondaryBtn>
            </div>
          </fieldset>
        </form>
      </motion.div>
    </div>
  );
};

export default FoodForm;
