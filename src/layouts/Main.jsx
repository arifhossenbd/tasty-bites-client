import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import AuthProvider from "../contexts/AuthContext/AuthProvider";

const Main = () => {
  return (
    <AuthProvider>
        <Navbar/>
      <div className="bg-stone-50 py-6 md:py-8 lg:py-12">
        <Outlet />
      </div>
      <Footer/>
    </AuthProvider>
  );
};

export default Main;
