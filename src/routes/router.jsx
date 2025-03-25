import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage/>,
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }
        ]
    }
])

export default router;