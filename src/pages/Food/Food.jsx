import {Link} from "react-router-dom"
const Food = ({ food }) => {
  // console.log(Object.keys(food).join(", "));
  const {
    _id,
    name,
    image,
    category,
    price,
    quantity,
    addedBy,
    origin,
    description,
    purchaseCount,
  } = food;
  return (
    <Link to={`/food/details/${_id}`}>
      <div className="card shadow hover:shadow-md rounded-none">
        <figure className="w-full h-56">
          <img src={image} className="w-full h-full" alt="" />
        </figure>
        <div className="p-4">
          <h2 className="card-title">{name}</h2>
          <p>{category}</p>
          <p>{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Food;
