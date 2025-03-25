import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";

const Main = () => {
  return (
    <div>
        <Navbar/>
      <div>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Main;
