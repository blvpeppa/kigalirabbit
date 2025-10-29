import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const ServicesData = [
    {
      id: 1,
      icon: "flaticon-blind",
      name: t("service1_title"),
      description: t("service1_description"),
      aosDelay: "100",
      modalContent: {
        title: t("service1_title"),
        details: "Our expert team provides comprehensive visual impairment support, including personalized assessments and adaptive technology solutions to enhance accessibility and independence.",
        features: [
          "Personalized vision assessments",
          "Adaptive technology training",
          "Accessibility consultations"
        ]
      }
    },
    {
      id: 2,
      icon: "flaticon-dog-eating",
      name: t("service2_title"),
      description: t("service2_description"),
      aosDelay: "300",
      modalContent: {
        title: t("service2_title"),
        details: "We offer tailored nutrition plans and feeding guidance to ensure your pet's health and vitality, crafted with premium ingredients and expert care.",
        features: [
          "Customized nutrition plans",
          "Premium pet food options",
          "Feeding behavior consultations"
        ]
      }
    },
    {
      id: 3,
      icon: "flaticon-grooming",
      name: t("service3_title"),
      description: t("service3_description"),
      aosDelay: "500",
      modalContent: {
        title: t("service3_title"),
        details: "Our professional grooming services keep your pet looking and feeling their best, with a focus on comfort, style, and hygiene using top-quality products.",
        features: [
          "Full grooming sessions",
          "Skin and coat care",
          "Specialized styling options"
        ]
      }
    },
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <span id="services"></span>
      <div className="py-24 bg-nike-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Nike-style Heading section */}
          <div className="text-center mb-20">
            <h1 className="text-nike-5xl sm:text-nike-6xl font-display font-black text-nike-black mb-6">
              {t("services_title")}
            </h1>
            <p className="text-nike-xl font-nike font-medium text-nike-gray-600 max-w-3xl mx-auto">
              {t("services_paragraph")}
            </p>
          </div>

          {/* Nike-style Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ServicesData.map((service) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={service.aosDelay}
                className="group bg-nike-white rounded-none shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-nike-gray-200 hover:border-nike-black"
              >
                {/* Nike-style Card Content */}
                <div className="p-8">
                  <div className="text-nike-accent text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className={service.icon}></span>
                  </div>
                  
                  <h3 className="text-nike-2xl font-display font-bold text-nike-black mb-4 group-hover:text-nike-accent transition-colors duration-300">
                    {service.name}
                  </h3>
                  
                  <p className="text-nike-base font-nike text-nike-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Nike-style CTA */}
                  <button
                    onClick={() => openModal(service)}
                    className="group/btn inline-flex items-center text-nike-black font-nike font-bold uppercase tracking-wider hover:text-nike-accent transition-colors duration-300"
                  >
                    Learn More
                    <svg className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-nike-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-nike-white max-w-lg w-full mx-4 p-8 rounded-none shadow-xl border border-nike-gray-200">
            <h2 className="text-nike-3xl font-display font-bold text-nike-black mb-4">
              {selectedService.modalContent.title}
            </h2>
            <p className="text-nike-base font-nike text-nike-gray-600 mb-6 leading-relaxed">
              {selectedService.modalContent.details}
            </p>
            <ul className="list-disc list-inside text-nike-base font-nike text-nike-gray-600 mb-8">
              {selectedService.modalContent.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-nike-black font-nike font-bold uppercase tracking-wider hover:text-nike-accent transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;