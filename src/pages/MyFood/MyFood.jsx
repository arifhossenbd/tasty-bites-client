import useApi from "../../hooks/useApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import {
  confirmToast,
  crudError,
  deleteToast,
  updateToast,
} from "../../utils/CrudToast";
import Modal from "../../utils/Modal";
import { useState } from "react";

const MyFood = ({ food, setAllFoods, allFoods }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const { deleteData, updateData } = useApi();
  const { _id, foodImage, foodName, category, price } = food || {};

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleUpdateSuccess = async (updatedFood) => {
    try {
      setAllFoods(
        allFoods?.map((f) => (f?._id === updatedFood?._id ? updatedFood : f))
      );
      const result = await updateData(`/food/${updatedFood?._id}`, updatedFood);
      if (result?.modifiedCount > 0) {
        updateToast(updatedFood?.foodName);
        setIsModalOpen(false);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error(error);
      crudError(error);
    }
  };

  const handleDelete = (id) => {
    confirmToast({
      message: (
        <span>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-yellow-500">{foodName}</span>?
        </span>
      ),
      confirmText: "Yes, delete",
      cancelText: "No, keep it",
      onConfirm: async () => {
        try {
          await deleteData(`/food/${id}`);
          setAllFoods(allFoods?.filter((food) => food._id !== id));
          deleteToast(foodName);
        } catch (error) {
          crudError(error);
        }
      },
    });
  };

  return (
    <tr key={_id} className="hover:bg-yellow-50 transition-colors">
      <td className="py-4 px-4">
        <img
          src={foodImage}
          alt={foodName}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td className="py-4 px-4 font-medium">
        <Link
          to={`/food/details/${_id}`}
          className="text-yellow-600 hover:text-yellow-800 hover:underline transition-colors"
        >
          {foodName}
        </Link>
      </td>
      <td className="py-4 px-4">{category}</td>
      <td className="py-4 px-4">
        {price ? `$${parseFloat(price).toFixed(2)}` : "$0.00"}
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-4">
          <button
            onClick={() => handleEdit()}
            className="text-yellow-600 hover:text-yellow-800 hover:underline transition-colors"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="text-red-600 hover:text-red-800 hover:underline transition-colors"
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
