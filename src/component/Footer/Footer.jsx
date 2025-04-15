import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaXTwitter,
  FaGooglePlay,
  FaAppStoreIos,
} from "react-icons/fa6";
import { FaApple, FaFacebook, FaLinkedinIn, FaMicrosoft } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-stone-900 text-stone-100">
      <footer className="footer px-4 md:px-0 md:w-11/12 lg:w-10/12 py-8 md:py-10 lg:py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <h6 className="text-3xl lg:text-4xl text-yellow-400 font-yesterYear">
              Tasty Bites
            </h6>
            <p className="text-stone-300">
              Crafting exceptional dining experiences since 2010
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Link
                to="https://x.com"
                target="_blank"
                className="text-stone-300 hover:text-yellow-400 transition-colors"
              >
                <FaXTwitter size={22} />
              </Link>
              <Link
                to="https://www.facebook.com/iarifhussain"
                target="_blank"
                className="text-stone-300 hover:text-yellow-400 transition-colors"
              >
                <FaFacebook size={22} />
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                className="text-stone-300 hover:text-yellow-400 transition-colors"
              >
                <FaInstagram size={22} />
              </Link>
              <Link
                to="https://www.linkedin.com/in/arifhossenbd/"
                target="_blank"
                className="text-stone-300 hover:text-yellow-400 transition-colors"
              >
                <FaLinkedinIn size={22} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="space-y-2">
            <h6 className="text-lg font-semibold text-yellow-400">
              Quick Links
            </h6>
            {["/menu", "/about", "/gallery", "/events"].map((link, i) => (
              <Link
                key={i}
                to={link}
                className="block text-stone-300 hover:text-yellow-400 transition-colors"
              >
                {link.replace("/", "").replace(/^\w/, (c) => c.toUpperCase())}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="space-y-2">
            <h6 className="text-lg font-semibold text-yellow-400">
              Contact Us
            </h6>
            <p className="text-stone-300">
              📍 123 Tasty Bites Street, Tasty Bites
            </p>
            <Link to="tel:+1234567890" className="text-stone-300 block">
              📞 (123) 456-7890
            </Link>
            <Link
              to="mailto:info@tastybites.com"
              className="text-stone-300 block"
            >
              ✉️ info@tastybites.com
            </Link>
          </div>

          {/* App Store Section */}
          <div className="flex flex-col gap-4">
            <h6 className="text-lg font-semibold text-yellow-400">
              Get Our App
            </h6>
            <p className="text-stone-300">
              Install now for the best experience 📲
            </p>
            <div className="flex flex-wrap w-full gap-4">
              <Link
                to="https://apps.apple.com/app/example/id1234567890"
                className="border rounded-md p-2 flex items-center gap-2 text-stone-300 hover:border-yellow-400 hover:text-yellow-400 transition-colors w-48"
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
                className="border rounded-md p-2 flex items-center gap-2 text-stone-300 hover:border-yellow-400 hover:text-yellow-400 transition-colors w-48"
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
                className="border rounded-md p-2 flex items-center gap-2 text-stone-300 hover:border-yellow-400 hover:text-yellow-400 transition-colors w-48"
                target="_blank"
              >
                <FaMicrosoft className="text-3xl md:text-4xl" />
                <h2 className="font-semibold tracking-wide">Microsoft</h2>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-700 pt-6 text-center text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} Tasty Bites. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
