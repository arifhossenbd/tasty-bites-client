import FoodForm from "../../component/FoodForm/FoodForm";
import axios from "axios";
import useApi from "../../hooks/useApi";

const AddFood = () => {
  const { createData } = useApi();
  const date = Date.now();
  const handleAddFood = async (data) => {
    try {
      const response = await createData("/food", {
        ...data,
        createAt: date,
        updateAt: date,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <div>
      <FoodForm onSubmit={handleAddFood} btnText="Add" />
    </div>
  );
};

export default AddFood;
