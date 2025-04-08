import FoodForm from "../../component/FoodForm/FoodForm";
import useApi from "../../hooks/useApi";

const AddFood = () => {
  const { createData } = useApi();
  const date = Date.now();
  const handleAddFood = async (data) => {
    const result = await createData("/food", {
      ...data,
      createAt: date,
      updateAt: date,
    });
    console.log(result)
  };
  return (
    <div>
      <FoodForm onSubmit={handleAddFood} btnText="Add" />
    </div>
  );
};

export default AddFood;
