import FoodForm from "../../component/FoodForm/FoodForm";
import { useAuth } from "../../hooks/useAuth";

const AddFood = () => {
    const {user} = useAuth();
    console.log(user)
    return (
        <div>
            <FoodForm user={user}/>
        </div>
    );
};

export default AddFood;