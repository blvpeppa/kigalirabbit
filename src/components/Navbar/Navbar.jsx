import React, { useState, useEffect } from "react";
import {
  FaFacebook, FaTwitter, FaInstagram, FaPhone, FaPaperPlane,
  FaBars, FaTimes, FaWhatsapp, FaGlobe
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import logo from '../../assets/vite.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isActive = (path) => location.pathname === path ? "font-bold" : "";

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const Menu = [
    { id: 1, key: "home", link: "/" },
    { id: 2, key: "aboutus", link: "/about" },
    { id: 3, key: "service", link: "/products" },
    { id: 4, key: "visits", link: "/tour" },
    { id: 5, key: "trainings", link: "/training" },
    { id: 6, key: "archive", link: "/archive" },
    { id: 7, key: "contact", link: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Kigali Rabbit Center" className="h-6 md:h-8 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 text-base font-medium">
            {Menu.slice(0, -1).map((menu) => (
              <Link 
                key={menu.id}
                to={menu.link} 
                className={`text-black hover:text-gray-600 transition-colors ${isActive(menu.link)}`}
              >
                {t(menu.key)}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <a href="https://mailto:info@kigalirabbits.org" className="text-black hover:text-gray-600">
              <FaPaperPlane className="text-2xl" />
            </a>
            <select 
              onChange={(e) => changeLanguage(e.target.value)} 
              className="bg-transparent text-base text-black border-none outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="rw">RW</option>
            </select>
            <a href="https://www.facebook.com/share/1CcbvjuHKw/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="https://x.com/kigalirabbit?s=11" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://wa.me/250795880784" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-black"
          >
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-6">
          <ul className="space-y-6">
            {Menu.map((menu) => (
              <li key={menu.id}>
                <Link 
                  to={menu.link} 
                  className={`block text-lg font-medium text-black ${isActive(menu.link)}`}
                  onClick={() => setIsOpen(false)}
                >
                  {t(menu.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex space-x-4 justify-center">
            <a href="https://mailto:info@kigalirabbits.org" className="text-black">
              <FaPaperPlane className="text-2xl" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;