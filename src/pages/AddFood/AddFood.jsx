import FoodForm from "../../component/FoodForm/FoodForm";
import useApi from "../../hooks/useApi";
import { createToast, crudError } from "../../utils/CrudToast";

const AddFood = () => {
  const { createData } = useApi();
  const date = Date.now();
  const handleAddFood = async (data) => {
    try {
      const result = await createData("/food", {
        ...data,
        createAt: date,
        updateAt: date,
      });
      if (result?.insertedId) {
        createToast(data?.foodName);
      }
    } catch (error) {
      console.error(error);
      crudError(error);
    }
  };
  return (
    <div>
      <FoodForm
        style="card w-full max-w-lg mx-auto shadow-xl hover:shadow-2xl rounded-none bg-stone-50"
        onSubmit={handleAddFood}
        btnText="Add"
      />
    </div>
  );
};

export default AddFood;
