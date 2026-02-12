import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaSpinner, FaCheck } from 'react-icons/fa';
import axios from 'axios';
// visits images
import pricing1 from "../../assets/pricing-1.jpg";
import pricing2 from "../../assets/gallery-7.jpg";
import pricing3 from "../../assets/kids.jpg";
import pricing4 from "../../assets/academic.jpg";
import pricing5 from "../../assets/government.jpg";
//hover imagesx
import s4 from '../../assets/IMG-20251115-WA0002.jpg';
import s5 from '../../assets/IMG-20251115-WA0003.jpg';
import s6 from '../../assets/IMG-20251115-WA0004.jpg';
import s7 from '../../assets/IMG-20251115-WA0006.jpg';
import Imite from '../../assets/kids.jpg';

const PricingCards = () => {
  const { t } = useTranslation();
  const [pricingOptions, setPricingOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    visitDate: '',
    specialRequests: '',
  });
  
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isProcessing, setIsProcessing] = useState(false);

  // const API_BASE_URL = "https://kigalirabbitend.onrender.com/api";
  const API_BASE_URL = "http://localhost:7000/api";

  const normalizeIncludeKey = (item) => {
    if (!item) return '';
    return item.replace(/^includes?:\/\/?/i, '').replace(/^includes?:/i, '').trim();
  };

  const getTranslatedOptionField = (option, field) => {
    const key = `pricing.options.${option.id}.${field}`;
    const translated = t(key);
    if (translated !== key) {
      return translated;
    }

    const fallback = field === 'title'
      ? (option.title || option.name || option.label || option.type)
      : (option.description || option.details || option.summary);

    return fallback || translated;
  };

  const translateInclude = (item) => {
    const cleanedKey = normalizeIncludeKey(item);
    if (!cleanedKey) return '';
    let translated = t(cleanedKey);
    if (translated !== cleanedKey) return translated;

    const prefixedKey = cleanedKey.startsWith('pricing.include.')
      ? cleanedKey
      : `pricing.include.${cleanedKey}`;
    translated = t(prefixedKey);
    if (translated !== prefixedKey) return translated;

    return cleanedKey;
  };

  useEffect(() => {
    const fetchPricingOptions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/visit-options`);
        setPricingOptions(response.data.data.map(option => ({
          id: option.id,
          title: getTranslatedOptionField(option, 'title'),
          numericPrice: option.price,
          price: `${option.price.toLocaleString()} ${t('common.rwf')}`,
          description: getTranslatedOptionField(option, 'description'),
          image: getImageForOption(option.id),
          hoverImage: getHoverImageForOption(option.id),
          requiresPayment: option.price > 0,
          maxVisitors: option.max_visitors,
          includes: option.includes.map(item => translateInclude(item))
        })));
      } catch (error) {
        console.error('Error fetching pricing options:', error);
        setMessage({
          text: t('errors.fetch_options'),
          isError: true
        });
      }
    };
    fetchPricingOptions();
  }, [t]);

  const getImageForOption = (id) => {
    switch(id) {
      case 1: return pricing1;
      case 2: return pricing4;
      case 3: return pricing5;
      case 4: return pricing2;
      case 5: return pricing3;
      default: return pricing1;
    }
  };

  const getHoverImageForOption = (id) => {
    switch(id) {
      case 1: return s7;
      case 2: return s6;
      case 3: return s5;
      case 4: return s4;
      case 5: return Imite;
      default: return s7;
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setFormData(prev => ({
      ...prev,
    }));
    setStep(1);
    setMessage({ text: '', isError: false });
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setMessage({ text: t('errors.required_fields'), isError: true });
      return;
    }

    await handleBooking();
  };

  const handleBooking = async () => {
    try {
      setIsProcessing(true);
      setMessage({ text: t('messages.processing'), isError: false });

      const totalAmount = selectedOption.numericPrice * formData.visitorsCount;

      await axios.post(`${API_BASE_URL}/book-visit`, {
        ...formData,
        visitType: selectedOption.id,
        amount: totalAmount,
        requiresPayment: selectedOption.requiresPayment,
      });
      setStep(2);
    } catch (error) {
      console.error('Booking error:', error);
      setMessage({ 
        text: error.response?.data?.message || t('errors.booking_error'), 
        isError: true 
      });
    } finally {
      setIsProcessing(false);
    }
  };


  const resetForm = () => {
    setSelectedOption(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution: '',
      visitDate: '',
      specialRequests: '',
    });
    setStep(1);
    setMessage({ text: '', isError: false });
    setIsProcessing(false);
  };

  return (
    <section className="py-24 bg-nike-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-nike-5xl sm:text-nike-6xl font-display font-black text-nike-black mb-6">
            {t('pricing.title')}
          </h2>
          <p className="text-nike-xl font-nike font-medium text-nike-gray-600 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Nike-style Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingOptions.map((option) => (
            <div 
              key={option.id} 
              className="group bg-nike-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-nike-gray-200 hover:border-nike-black"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={option.image}
                  alt={option.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                />
                <img
                  src={option.hoverImage}
                  alt={`${option.title} ${t('common.alternate_view')}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-nike-2xl font-display font-bold text-nike-black mb-3 group-hover:text-nike-accent transition-colors duration-300">
                  {option.title}
                </h3>
                <p className="text-nike-base font-nike text-nike-gray-600 mb-6 leading-relaxed">
                  {option.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-nike font-bold text-nike-black mb-3 uppercase tracking-wider">{t('pricing.includes')}:</h4>
                  <ul className="space-y-2">
                    {option.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-nike-accent mt-1 mr-3 flex-shrink-0" />
                        <span className="text-nike-sm font-nike text-nike-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => handleSelectOption(option)}
                  className="w-full bg-nike-black text-nike-white py-3 text-nike-sm font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  {t('common.book_now')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Modal */}
        {selectedOption && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6 relative">
                <button
                  onClick={resetForm}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 h-5" />
                </button>

                {step === 1 && (
                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {t('booking.title', { option: selectedOption.title })}
                    </h3>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.name')} *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.email')} *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.phone')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    </div>
{/*                     
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {t('form.visitors_count')} *
                        {selectedOption.maxVisitors && (
                          <span className="text-sm text-gray-500 ml-2">
                            ({t('common.max')} {selectedOption.maxVisitors})
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={selectedOption.maxVisitors || 100}
                        value={formData.visitorsCount}
                        onChange={(e) => setFormData({...formData, visitorsCount: parseInt(e.target.value) || 1})}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div> */}
                    
                    {(selectedOption.title.includes(t('pricing.academic')) || selectedOption.title.includes(t('pricing.institutional'))) && (
                      <div>
                        <label className="block text-gray-700 mb-1">{t('form.institution')}</label>
                        <input
                          type="text"
                          value={formData.institution}
                          onChange={(e) => setFormData({...formData, institution: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.visit_date')}</label>
                      <input
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.special_requests')}</label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                        className="w-full p-2 border rounded"
                        rows="3"
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="font-semibold text-green-700 mb-2">{t('pricing.includes')}:</h4>
                      <ul className="space-y-1">
                        {selectedOption.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {message.text && (
                      <p className={`mt-2 ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                        {message.text}
                      </p>
                    )}
                    
                    <button
                      type="submit"
                      className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded mt-4 flex items-center justify-center"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          {t('common.processing')}
                        </>
                      ) : (
                        t('form.submit_request')
                      )}
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <FaCheck className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('confirmation.title')}</h3>
                    <p className="text-green-700 font-semibold mb-3">
                      {t('confirmation.contact_success')}
                    </p>
                    <p className="text-gray-600 mb-6">
                      {t('confirmation.contact_note')}
                    </p>
                    <button
                      onClick={resetForm}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                    >
                      {t('common.close')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingCards;
