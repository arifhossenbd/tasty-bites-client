import FoodForm from "../../component/FoodForm/FoodForm";
import axios from "axios";

const AddFood = () => {
  const date = Date.now();
  const handleAddFood = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/food`, {
        ...data,
        createAt: date,
        updateAt: date,
      });
      return response.data
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
