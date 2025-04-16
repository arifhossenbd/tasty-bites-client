import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import AddFood from "../pages/AddFood/AddFood";
import AllFood from "../pages/AllFood/AllFood";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import PrivateRoutes from "./PrivateRoutes";
import MyFoods from "../pages/MyFoods/MyFoods";
import MyOrders from "../pages/MyOrders/MyOrders";
import Gallery from "../pages/Gallery/Gallery";
import Wishlist from "../pages/Wishlist/Wishlist";
import Profile from "../pages/Profile/Profile";

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
        element: (
          <PrivateRoutes>
            <AddFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/foods",
        element: <AllFood />,
      },
      {
        path: "/my-foods",
        element: (
          <PrivateRoutes>
            <MyFoods />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoutes>
            <MyOrders />
          </PrivateRoutes>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoutes>
            <Wishlist />
          </PrivateRoutes>
        ),
      },
      {
        path: "/food/details/:id",
        element: (
          <PrivateRoutes>
            <FoodDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/gallery",
        element: <Gallery />,
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
