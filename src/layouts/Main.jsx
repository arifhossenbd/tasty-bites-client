import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import AuthProvider from "../contexts/AuthContext/AuthProvider";
import CartProvider from "../contexts/CartContext/CartProvider";
import ScrollToTopButton from "../component/ScrollToTopButton/ScrollToTopButton";
import FloatingThemeButton from "../component/FloatingThemeButton/FloatingThemeButton";

const Main = () => {
  return (
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <div className="min-h-screen">
            <Outlet />
            <ScrollToTopButton />
            <FloatingThemeButton/>
          </div>
          <Footer />
        </CartProvider>
      </AuthProvider>
  );
};

export default Main;
