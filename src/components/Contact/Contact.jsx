import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Bgcontact from "../../assets/image_2.jpg";
import axios from "axios";

// Notification component
const Notification = ({ type = "info", message, onClose }) => {
  const colors = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    info: "bg-blue-100 text-blue-700 border-blue-400",
  };

  return (
    <div className={`border px-4 py-3 rounded relative mb-4 ${colors[type]}`}>
      <strong className="font-bold capitalize">{type}:</strong>{" "}
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <span className="text-2xl text-black">&times;</span>
      </button>
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const contactInfo = [
    { icon: "fa-map-marker", label: t('contactus.address'), value: "Nyamirambo, Nyarugenge Kigali, Rwanda" },
    { icon: "fa-phone", label: t('contactus.phone'), value: "(+250) 795880784", link: "tel:+250795880784" },
    { icon: "fa-paper-plane", label: t('contactus.emailLabel'), value: "info@kigalirabbits.org", link: "https://mail.google.com/mail/?view=cm&to=info@kigalirabbits.org" },
    { icon: "fa-globe", label: t('contactus.website'), value: "kigalirabbits.org", link: "https://www.kigalirabbits.org/" }
  ];

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => !field.trim())) {
      setNotification({ type: "error", message: t('contactus.fillAll') });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setNotification({ type: "error", message: t('contactus.invalidEmail') });
      return;
    }

    setIsSubmitting(true);
    setNotification({ type: "", message: "" });

    try {
      const response = await axios.post("https://umuhuza.store/send/contact", formData);
      if (response.status === 201) {
        setNotification({ type: "success", message: t('contactus.success') });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error contacting server:", error.response || error.message);
      setNotification({ type: "error", message: t('contactus.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-nike-white">
      <section className="py-24 bg-nike-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-nike-5xl sm:text-nike-6xl font-display font-black text-nike-black mb-6">
              {t('contactus.title')}
            </h2>
            <p className="text-nike-xl font-nike font-medium text-nike-gray-600 max-w-3xl mx-auto">
              Get in touch with us for all your rabbit farming needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((item, index) => (
              <div key={index} className="group bg-nike-white p-8 shadow-sm hover:shadow-xl transition-all duration-500 text-center border border-nike-gray-200 hover:border-nike-black">
                <div className="w-16 h-16 bg-nike-gray-100 group-hover:bg-nike-accent transition-colors duration-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`fa ${item.icon} text-2xl text-nike-black group-hover:text-nike-white transition-colors duration-300`} aria-hidden="true"></i>
                </div>
                <p className="text-nike-lg font-nike font-bold text-nike-black mb-2 uppercase tracking-wider">{item.label}:</p>
                <p className="text-nike-base font-nike text-nike-gray-600">
                  {item.link ? (
                    <a href={item.link} className="text-nike-accent hover:text-nike-black transition-colors duration-300 font-medium" target="_blank" rel="noopener noreferrer">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="bg-nike-white shadow-xl p-10 border border-nike-gray-200">
              <h3 className="text-nike-4xl font-display font-bold mb-8 text-nike-black">{t('contactus.contactUs')}</h3>

              {notification.message && (
                <Notification
                  type={notification.type}
                  message={notification.message}
                  onClose={() => setNotification({ type: "", message: "" })}
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder={t('contactus.name')} 
                      className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder={t('contactus.email')} 
                      className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder={t('contactus.subject')} 
                    className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300" 
                    value={formData.subject} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div>
                  <textarea 
                    name="message" 
                    placeholder={t('contactus.message')} 
                    className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300 resize-none" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    rows="6" 
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-nike-black text-nike-white px-8 py-5 text-nike-lg font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contactus.sending') : t('contactus.send')}
                </button>
              </form>
            </div>

            <div className="relative overflow-hidden bg-nike-gray-100 h-[600px] border border-nike-gray-200">
              <div 
                className="h-full bg-cover bg-center hover:scale-105 transition-transform duration-700" 
                style={{ backgroundImage: `url(${Bgcontact})` }} 
                aria-label="Contact us visual"
              />
              <div className="absolute inset-0 bg-nike-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
