import React from "react";
import BannerImg from "../../assets/about-1.jpg"; 
import { MdHealthAndSafety, MdSupportAgent, MdEmergency } from "react-icons/md";
import { GiRabbit } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const bgImage = {
  backgroundColor: "white",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Banner = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <span id="about"></span>
      <div className="bg-nike-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Nike-style Image section */}
            <div data-aos="zoom-in" className="order-2 lg:order-1">
              <div className="relative overflow-hidden bg-nike-gray-100">
                <img
                  src={BannerImg}
                  alt="Kigali Rabbit Center"
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-nike-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Nike-style Text content section */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <h1 data-aos="fade-up" className="text-nike-5xl sm:text-nike-6xl font-display font-black text-nike-black mb-8 leading-tight">
                {t("why_choose")}
              </h1>
              <p data-aos="fade-up" className="text-nike-xl font-nike font-medium text-nike-gray-600 mb-12 leading-relaxed">
                {t("banner_paragraph")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div data-aos="fade-up" className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-nike-gray-100 group-hover:bg-nike-accent transition-colors duration-300 flex items-center justify-center">
                      <MdHealthAndSafety className="text-2xl text-nike-black group-hover:text-nike-white transition-colors duration-300" />
                    </div>
                    <span className="text-nike-lg font-nike font-medium text-nike-black group-hover:text-nike-accent transition-colors duration-300">
                      {t("care_advices")}
                    </span>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="300" className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-nike-gray-100 group-hover:bg-nike-accent transition-colors duration-300 flex items-center justify-center">
                      <MdSupportAgent className="text-2xl text-nike-black group-hover:text-nike-white transition-colors duration-300" />
                    </div>
                    <span className="text-nike-lg font-nike font-medium text-nike-black group-hover:text-nike-accent transition-colors duration-300">
                      {t("customer_supports")}
                    </span>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="500" className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-nike-gray-100 group-hover:bg-nike-accent transition-colors duration-300 flex items-center justify-center">
                      <MdEmergency className="text-2xl text-nike-black group-hover:text-nike-white transition-colors duration-300" />
                    </div>
                    <span className="text-nike-lg font-nike font-medium text-nike-black group-hover:text-nike-accent transition-colors duration-300">
                      {t("emergency_services")}
                    </span>
                  </div>
                </div>

                <div data-aos="slide-left" className="bg-nike-black p-8 text-nike-white">
                  <div className="flex items-center gap-4 mb-6">
                    <GiRabbit className="text-4xl text-nike-accent" />
                    <h2 className="text-nike-2xl font-display font-bold">
                      {t("veterinary_help")}
                    </h2>
                  </div>
                  <p className="text-nike-base font-nike text-nike-gray-300 mb-8 leading-relaxed">
                    {t("veterinary_paragraph")}
                  </p>
                  <Link 
                    to="/about" 
                    onClick={scrollToTop} 
                    className="group inline-flex items-center justify-center px-8 py-4 bg-nike-white text-nike-black text-nike-lg font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-100 transition-all duration-300 transform hover:scale-105"
                  >
                    {t("more_about")}
                    <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
