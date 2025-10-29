import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import pricing5 from "../../assets/government.jpg";
import g17 from '../../assets/G3.jpg';
import g20 from '../../assets/G6.jpg';


const Training_home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleMoreVisitsClick = () => {
    navigate('/tour');
    window.scrollTo(0, 0);
  };

  const pricingOptions = [
    {
      id: 1,
      title: t("visit_professional_title"),
      description: t("visit_professional_description"),
      image: g20,
    },
    {
      id: 2,
      title: t("visit_academic_title"),
      description: t("visit_academic_description"),
      image: g17,
    },
    {
      id: 3,
      title: t("visit_institutional_title"),
      description: t("visit_institutional_description"),
      image: pricing5,
    }
  ];

  return (
    <section className="py-24 bg-nike-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-nike-5xl sm:text-nike-6xl font-display font-black text-nike-black mb-6">
            {t("visit_title")}
          </h2>
          <p className="text-nike-xl font-nike font-medium text-nike-gray-600 max-w-3xl mx-auto">
            {t("visit_paragraph")}
          </p>
        </div>

        {/* Nike-style Visit Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingOptions.map((option) => (
            <div key={option.id} className="group bg-nike-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-nike-gray-200 hover:border-nike-black">
              <div className="relative h-80 overflow-hidden">
                <div 
                  className="h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                  style={{ backgroundImage: `url(${option.image})` }}
                />
                <div className="absolute inset-0 bg-nike-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="text-nike-2xl font-display font-bold text-nike-black mb-4 group-hover:text-nike-accent transition-colors duration-300">
                  {option.title}
                </h3>
                <p className="text-nike-base font-nike text-nike-gray-600 mb-6 leading-relaxed">
                  {option.description}
                </p>
                <div className="group/btn">
                  <span className="inline-flex items-center text-nike-black font-nike font-bold uppercase tracking-wider hover:text-nike-accent transition-colors duration-300">
                    Learn More
                    <svg className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nike-style CTA Button */}
        <div className="text-center">
          <button 
            onClick={handleMoreVisitsClick}
            className="group inline-flex items-center justify-center px-10 py-5 bg-nike-black text-nike-white text-nike-lg font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t("visit_apply_button")}
            <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Training_home;
