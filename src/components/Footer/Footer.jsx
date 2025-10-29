import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from '../../assets/vite.svg'; // Replace with your actual logo path

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-nike-black text-nike-white relative">
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-nike-white text-nike-black p-4 shadow-lg transition-all duration-300 z-50 hover:bg-nike-gray-100 transform hover:scale-110"
          aria-label={t("footer.scrollTop")}
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img src={logo} alt="KRC Logo" className="w-12 h-12 mr-3" />
              <span className="text-nike-2xl font-display font-bold text-nike-white">KRC</span>
            </div>
            <p className="text-nike-base font-nike text-nike-gray-300 mb-6 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="mb-6">
              <h3 className="text-nike-lg font-nike font-bold text-nike-white mb-4 uppercase tracking-wider">
                {t("footer.joinUs")}
              </h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/share/1CcbvjuHKw/" 
                   className="text-nike-gray-400 hover:text-nike-white transition-colors duration-300">
                  <FaFacebook className="text-nike-xl" />
                </a>
                <a href="https://wa.me/250795880784" 
                   className="text-nike-gray-400 hover:text-nike-white transition-colors duration-300">
                  <FaWhatsapp className="text-nike-xl" />
                </a>
                <a href="https://instagram.com" 
                   className="text-nike-gray-400 hover:text-nike-white transition-colors duration-300">
                  <FaInstagram className="text-nike-xl" />
                </a>
                <a href="https://x.com/kigalirabbit?s=11" 
                   className="text-nike-gray-400 hover:text-nike-white transition-colors duration-300">
                  <FaTwitter className="text-nike-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-nike-lg font-nike font-bold text-nike-white mb-6 uppercase tracking-wider">
              {t("footer.quickLinks")}
            </h2>
            <ul className="space-y-3">
              <li>
                <Link to='/' onClick={scrollToTop} 
                      className="text-nike-base font-nike text-nike-gray-300 hover:text-nike-white transition-colors duration-300">
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link to='/About' onClick={scrollToTop} 
                      className="text-nike-base font-nike text-nike-gray-300 hover:text-nike-white transition-colors duration-300">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link to='/Contact' onClick={scrollToTop} 
                      className="text-nike-base font-nike text-nike-gray-300 hover:text-nike-white transition-colors duration-300">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h2 className="text-nike-lg font-nike font-bold text-nike-white mb-6 uppercase tracking-wider">
              {t("footer.moreLinks")}
            </h2>
            <ul className="space-y-3">
              <li>
                <Link to='/products' onClick={scrollToTop} 
                      className="text-nike-base font-nike text-nike-gray-300 hover:text-nike-white transition-colors duration-300">
                  {t("footer.products")}
                </Link>
              </li>
              <li>
                <Link to='/Gallery' onClick={scrollToTop} 
                      className="text-nike-base font-nike text-nike-gray-300 hover:text-nike-white transition-colors duration-300">
                  {t("footer.gallery")}
                </Link>
              </li>
              <li>
                <Link to='/Tour' onClick={scrollToTop} 
                      className="text-nike-base font-nike text-nike-gray-300 hover:text-nike-white transition-colors duration-300">
                  {t("footer.visits")}
                </Link>
              </li>
              <li>
                <Link to='/Training' onClick={scrollToTop} 
                      className="text-nike-base font-nike text-nike-gray-300 hover:text-nike-white transition-colors duration-300">
                  {t("footer.training")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-nike-lg font-nike font-bold text-nike-white mb-6 uppercase tracking-wider">
              {t("footer.haveQuestion")}
            </h2>
            <ul className="space-y-4">
              <li className="text-nike-base font-nike text-nike-gray-300">
                {t("footer.address")}
              </li>
              <li>
                <a href="tel:+250795880784" 
                   className="text-nike-base font-nike text-nike-gray-300 hover:text-nike-white transition-colors duration-300">
                  +250 795880784
                </a>
              </li>
              <li>
                <a href="https://mail.google.com/mail/?view=cm&to=info@kigalirabbits.org" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-nike-base font-nike text-nike-gray-300 hover:text-nike-white transition-colors duration-300 inline-flex items-center gap-2">
                  {t("footer.emailUs")}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M12 13.065L1.5 6.375V17.25c0 .966.784 1.75 1.75 1.75h17.5c.966 0 1.75-.784 1.75-1.75V6.375l-10.5 6.69zM12 10.935L22.5 4.25H1.5L12 10.935z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nike-style Bottom Bar */}
      <div className="border-t border-nike-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-nike-sm font-nike text-nike-gray-400">
              © {new Date().getFullYear()} {t("footer.companyName")}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Add CSS for animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-fade-in { animation: fadeIn 0.6s ease-in-out; }
  .animate-slide-up { animation: slideUp 0.6s ease-in-out; }
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
`;

export default Footer;