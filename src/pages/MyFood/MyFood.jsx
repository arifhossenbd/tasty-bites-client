import useApi from "../../hooks/useApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "../../utils/Modal";
import { useState } from "react";
import {
  confirmToast,
  showErrorToast,
  showSuccessToast,
} from "../../utils/CrudToast";
import { useTheme } from "../../hooks/useTheme";

const MyFood = ({ food, setAllFoods, allFoods }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteData, updateData } = useApi();
  const { _id, image, name, category, price } = food || {};
  const { currentTheme } = useTheme();
  const {
    textColor,
    dangerColor,
    dangerBgColor,
    warningColor,
    cardBgColor,
    borderColor,
    primaryTextColor,
    secondaryBgColor
  } = currentTheme;

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleUpdateSuccess = async (updatedFood) => {
    setAllFoods(
      allFoods?.map((f) => (f?._id === updatedFood?._id ? updatedFood : f))
    );
    const res = await updateData(
      `/update/food/${updatedFood?._id}`,
      updatedFood,
      {}
    );
    if (res?.success) {
      showSuccessToast(
        "🔄 Menu Updated Successfully!",
        {
          image: image,
          category: category,
          name: name,
          price: Number(price),
        },
        res?.message,
        ""
      );
      setAllFoods(allFoods?.filter((food) => food._id !== _id));
    } else {
      showErrorToast("⚠️ Update Failed", res?.message);
    }
  };

  const handleDelete = (id) => {
    confirmToast({
      message: (
        <span className={textColor}>
          Are you sure you want to delete{" "}
          <span className={`font-semibold ${warningColor}`}>{name}</span>?
        </span>
      ),
      confirmText: "Yes, delete",
      cancelText: "No, keep it",
      onConfirm: async () => {
        const res = await deleteData(`/delete/food/${id}`);
        if (res?.success) {
          showSuccessToast(
            "🗑️ Food Item Removed",
            {
              image: image,
              category: category,
              name: name,
              price: Number(price),
            },
            res?.message,
            ""
          );
          setAllFoods(allFoods?.filter((food) => food._id !== id));
        } else {
          showErrorToast("⚠️ Couldn't Delete Item", res?.message);
        }
      },
      confirmButtonStyle: `${dangerBgColor} ${dangerColor}`,
      cancelButtonStyle: `${secondaryBgColor} ${primaryTextColor}`
    });
  };

  return (
    <tr className={`${cardBgColor} transition-colors border-b ${borderColor}`}>
      <td className="py-4 px-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td className="py-4 px-4 font-medium">
        <Link
          to={`/food/details/${_id}`}
          className={`${primaryTextColor} hover:underline transition-colors`}
        >
          {name}
        </Link>
      </td>
      <td className={`py-4 px-4 ${textColor}`}>{category}</td>
      <td className={`py-4 px-4 ${textColor}`}>
        {price ? `$${parseFloat(price).toFixed(2)}` : "$0.00"}
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-4">
          <button
            onClick={() => handleEdit()}
            className={`hover:text-teal-600 text-teal-500 transition-colors`}
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className={`hover:text-red-600 text-red-500 transition-colors`}
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
        <div className="">
          <Modal
            food={food}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
      </td>
    </tr>
  );
};

export default MyFood;