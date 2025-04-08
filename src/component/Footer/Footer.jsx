import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/PrimaryBtn";

const Footer = () => {
    return (
      <div className="bg-stone-900 text-stone-100">
        <footer className="footer px-4 md:px-8 lg:px-12 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Restaurant Info */}
            <div className="space-y-4">
              <h6 className="text-xl md:text-2xl lg:text-3xl text-amber-400 font-yesterYear">Tasty Bites</h6>
              <p className="text-stone-300">
                Crafting exceptional dining experiences since 2010
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
  
            {/* Quick Links */}
            <nav className="space-y-2">
              <h6 className="text-lg font-semibold text-amber-400">Quick Links</h6>
              <a href="/menu" className="block text-stone-300 hover:text-amber-400 transition-colors">Our Menu</a>
              <a href="/about" className="block text-stone-300 hover:text-amber-400 transition-colors">About Us</a>
              <a href="/gallery" className="block text-stone-300 hover:text-amber-400 transition-colors">Gallery</a>
              <a href="/events" className="block text-stone-300 hover:text-amber-400 transition-colors">Events</a>
            </nav>
  
            {/* Contact Info */}
            <div className="space-y-2">
              <h6 className="text-lg font-semibold text-amber-400">Contact Us</h6>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p className="text-stone-300">123 Tasty Bites Street, Tasty Bites</p>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <Link to="tel:+123456-7890" className="text-stone-300">(123) 456-7890</Link>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <Link to="mailto:info@tastybites.com" className="text-stone-300">info@tastybites.com</Link>
              </div>
            </div>
  
            {/* Newsletter */}
            <div className="space-y-2">
              <h6 className="text-lg font-semibold text-amber-400">Newsletter</h6>
              <p className="text-stone-300">Subscribe for updates and special offers</p>
              <form className="mt-2 space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 bg-stone-800 border border-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-400 text-stone-100"
                  required
                />
                <PrimaryBtn btnText="Subscribe"/>
              </form>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-stone-700 pt-6 text-center text-stone-400">
            <p>&copy; {new Date().getFullYear()} Tasty Bites. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Footer;