import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaXTwitter,
  FaGooglePlay,
  FaAppStoreIos,
} from "react-icons/fa6";
import { FaFacebook, FaLinkedinIn, FaMicrosoft } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";

const Footer = () => {
  const { currentTheme } = useTheme();
  const {
    footerBgColor,
    footerTextColor,
    navTextColor,
    activeText,
    borderColor,
    inactiveText
  } = currentTheme;

  return (
    <div className={`${footerBgColor} ${footerTextColor}`}>
      <footer className="footer px-4 md:px-0 md:w-11/12 lg:w-10/12 py-8 md:py-10 lg:py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <h6 className={`text-3xl lg:text-4xl ${activeText} font-yesterYear`}>
              Tasty Bites
            </h6>
            <p className={`${navTextColor}`}>
              Crafting exceptional dining experiences since 2010
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Link
                to="https://x.com/arifhossengd"
                target="_blank"
                className={`${inactiveText} transition-colors`}
              >
                <FaXTwitter size={22} />
              </Link>
              <Link
                to="https://www.facebook.com/iarifhussain"
                target="_blank"
                className={`${inactiveText} transition-colors`}
              >
                <FaFacebook size={22} />
              </Link>
              <Link
                to="https://www.instagram.com/arifhussainbd/"
                target="_blank"
                className={`${inactiveText} transition-colors`}
              >
                <FaInstagram size={22} />
              </Link>
              <Link
                to="https://www.linkedin.com/in/arifhossenbd/"
                target="_blank"
                className={`${inactiveText} transition-colors`}
              >
                <FaLinkedinIn size={22} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="space-y-2">
            <h6 className={`text-lg font-semibold ${activeText}`}>
              Quick Links
            </h6>
            {["/foods", "/about", "/gallery", "/events"].map((link, i) => (
              <Link
                key={i}
                to={link}
                className={`block ${inactiveText} transition-colors`}
              >
                {link.replace("/", "").replace(/^\w/, (c) => c.toUpperCase())}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="space-y-2">
            <h6 className={`text-lg font-semibold ${activeText}`}>
              Contact Us
            </h6>
            <p className={`${navTextColor}`}>
              📍 123 Tasty Bites Street, Tasty Bites
            </p>
            <Link to="tel:+1234567890" className={`${navTextColor} block`}>
              📞 (123) 456-7890
            </Link>
            <Link
              to="mailto:info@tastybites.com"
              className={`${navTextColor} block`}
            >
              ✉️ info@tastybites.com
            </Link>
          </div>

          {/* App Store Section */}
          <div className="flex flex-col gap-4">
            <h6 className={`text-lg font-semibold ${activeText}`}>
              Get Our App
            </h6>
            <p className={`${navTextColor}`}>
              Install now for the best experience 📲
            </p>
            <div className="flex flex-wrap w-full gap-4">
              <Link
                to="https://apps.apple.com/app/example/id1234567890"
                className={`border rounded-md p-2 flex items-center gap-2 ${inactiveText} transition-colors w-48`}
                target="_blank"
              >
                <FaGooglePlay className="text-3xl md:text-4xl" />
                <div>
                  <p className="uppercase text-xs font-thin tracking-widest">
                    Get it on
                  </p>
                  <h2 className="font-semibold tracking-wide">Google Play</h2>
                </div>
              </Link>
              <Link
                to="https://play.google.com/store/apps/details?id=com.example"
                className={`border rounded-md p-2 flex items-center gap-2 ${inactiveText} transition-colors w-48`}
                target="_blank"
              >
                <FaAppStoreIos className="text-3xl md:text-4xl" />
                <div>
                  <p className="text-xs font-thin tracking-widest">
                    Download on the
                  </p>
                  <h2 className="font-semibold tracking-wide">App Store</h2>
                </div>
              </Link>
              <Link
                to="https://apps.apple.com/app/example/id1234567890"
                className={`border rounded-md p-2 flex items-center gap-2 ${inactiveText} transition-colors w-48`}
                target="_blank"
              >
                <FaMicrosoft className="text-3xl md:text-4xl" />
                <h2 className="font-semibold tracking-wide">Microsoft</h2>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`border-t ${borderColor} pt-6 text-center ${navTextColor}`}>
          <p>
            &copy; {new Date().getFullYear()} Tasty Bites. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;