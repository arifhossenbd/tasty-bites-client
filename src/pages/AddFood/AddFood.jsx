import { useLocation, useNavigate } from "react-router-dom";
import FoodForm from "../../component/FoodForm/FoodForm";
import PageHeader from "../../component/PageHeader/PageHeader";
import useApi from "../../hooks/useApi";
import { showErrorToast, showSuccessToast } from "../../utils/CrudToast";

const AddFood = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/foods";
  const { createData } = useApi();
  const date = Date.now();
  const handleAddFood = async (data) => {
    const res = await createData("/add/food", {
      ...data,
      createAt: date,
      updateAt: date,
    });
    if (res?.success) {
      showSuccessToast(
        "🍽️ Delicious Addition!",
        {
          image: data?.image,
          category: data?.category,
          name: data?.name,
          price: Number(data?.price),
        },
        res?.message,
        ""
      );
      navigate(from, { replace: true });
    } else {
      showErrorToast("⚠️ Oops! Something went wrong.", res.message);
    }
  };
  return (
    <div>
      <PageHeader
        title="Add New Food Item"
        subtitle="Fill out the form below to add a new menu item to your restaurant"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "All Food", path: "/foods" },
          { name: "My Foods", path: "/my-foods" },
          { name: "Add Food" },
        ]}
        backgroundImage="/tasty-bites-images/banner/banner4.jpg"
      />
      <div className="px-4 md:px-0">
        <FoodForm
          style="card w-full max-w-xl mx-auto shadow-xl hover:shadow-2xl rounded-md bg-stone-50"
          onSubmit={handleAddFood}
          btnText="Add"
        />
      </div>
    </div>
  );
};

export default AddFood;
