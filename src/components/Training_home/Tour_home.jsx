import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import l from "../../assets/pure-julia-uLoWIMCeodM-unsplash.jpg";
import g17 from '../../assets/G3.jpg';
import g7 from '../../assets/gallery-7.jpg';
import g21 from '../../assets/g215.jpg';


const Training = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleMoreTrainingClick = () => {
    navigate('/training');
    window.scrollTo(0, 0);
  };

  const trainingPrograms = [
    {
      id: 1,
      title: t("training_program_1_title"),
      description: t("training_program_1_description"),
      duration: "2 days",
      image: g21,
    },
    {
      id: 2,
      title: t("training_program_2_title"),
      description: t("training_program_2_description"),
      duration: "3 days",
      image: l,
    },
    {
      id: 3,
      title: t("training_program_3_title"),
      description: t("training_program_3_description"),
      duration: "2 days",
      image: g7,
    },
    {
      id: 4,
      title: t("training_program_4_title"),
      description: t("training_program_4_description"),
      duration: "3 days",
      image: g17,
    }
  ];

  return (
    <section className="py-24 bg-nike-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-nike-5xl sm:text-nike-6xl font-display font-black text-nike-black mb-6">
            {t("training_title")}
          </h2>
          <p className="text-nike-xl font-nike font-medium text-nike-gray-600 max-w-3xl mx-auto">
            {t("training_paragraph")}
          </p>
        </div>

        {/* Nike-style Training Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trainingPrograms.map((program) => (
            <div key={program.id} className="group bg-nike-gray-50 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-nike-gray-200 hover:border-nike-black">
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                  style={{ backgroundImage: `url(${program.image})` }}
                />
                <div className="absolute inset-0 bg-nike-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 bg-nike-white px-3 py-1 text-nike-sm font-nike font-bold uppercase tracking-wider">
                  {program.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-nike-xl font-display font-bold text-nike-black mb-3 group-hover:text-nike-accent transition-colors duration-300">
                  {program.title}
                </h3>
                <p className="text-nike-sm font-nike text-nike-gray-600 mb-4 leading-relaxed">
                  {program.description}
                </p>
                <div className="group/btn">
                  <span className="inline-flex items-center text-nike-black font-nike font-bold uppercase tracking-wider hover:text-nike-accent transition-colors duration-300 text-nike-sm">
                    Learn More
                    <svg className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            onClick={handleMoreTrainingClick}
            className="group inline-flex items-center justify-center px-10 py-5 bg-nike-black text-nike-white text-nike-lg font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t("training_apply_button")}
            <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Training;
