import { useLoaderData, useParams } from "react-router-dom";

const FoodDetails = () => {
  const paramsId = useParams();
  const id = Number(paramsId.id);
  return <div></div>;
};

export default FoodDetails;
