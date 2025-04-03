import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import AddFood from "../pages/AddFood/AddFood";
import AllFood from "../pages/AllFood/AllFood";
import FoodDetails from "../pages/FoodDetails/FoodDetails";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-food",
        element: <AddFood />,
      },
      {
        path: "/foods",
        element: <AllFood />,
      },
      {
        path: "/food/details/:id",
        element: <FoodDetails />,
        loader: ({ params }) => fetch(`data.json/${params.id}`),
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
