import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import AuthProvider from "../contexts/AuthContext/AuthProvider";
import CartProvider from "../contexts/CartContext/CartProvider";

const Main = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <div className="bg-stone-50 pb-6 md:pb-8 lg:pb-12 pt-16">
          <Outlet />
        </div>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default Main;
