import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import g5 from '../../assets/gallery-5.jpg';
import s2 from '../../assets/S3.jpg';
import s3 from '../../assets/gallery-1.jpg';
import s5 from '../../assets/kit.jpg';
import s6 from '../../assets/IMG-20250707-WA0022.jpg';
import s7 from '../../assets/rabbits.jpg';
import Imite from '../../assets/Imite.jpg';
import s8 from '../../assets/bleeding.jpg';
import s4 from '../../assets/bleeding7.jpg';
import s from '../../assets/WhatsApp Image 2025-05-28 at 08.54.48_0cb807a8.jpg';

const Products = () => {
  const { t } = useTranslation();
  const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:7000'
    : 'https://kigalirabbitend.onrender.com';
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', message: '' });
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [ticket, setTicket] = useState(null);
  const fallbackImages = [s8, s2, s3, Imite, g5];
  const fallbackHoverImages = [s4, s5, s6, s7, s];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const { data } = await response.json();
        const normalized = Array.isArray(data) ? data.map((item, index) => ({
          ...item,
          image: item.image || item.image_url || item.photo || fallbackImages[index % fallbackImages.length],
          hoverImage: item.hoverImage || item.hover_image || item.image_hover || fallbackHoverImages[index % fallbackHoverImages.length],
          category: item.category || item.type || 'Product'
        })) : [];
        setProducts(normalized);
      } catch (error) {
        setProducts([
          { id: 1, name: 'Premium Breeding Rabbits', description: 'Healthy, pedigreed breeding stock.', image: s8, hoverImage: s4, category: 'Live Stock' },
          { id: 2, name: 'Rabbit Hutch Kit', description: 'Complete DIY hutch kit.', image: s2, hoverImage: s5, category: 'Equipment' },
          { id: 3, name: 'Organic Rabbit Pellets', description: 'Nutritionally balanced feed.', image: s3, hoverImage: s6, category: 'Feed' },
          { id: 4, name: 'Farming Starter Guide', description: 'Comprehensive manual.', image: Imite, hoverImage: s7, category: 'Resources' },
          { id: 5, name: 'Organic Fertilizer', description: 'High-quality organic fertilizer.', image: g5, hoverImage: s, category: 'Manure' }
        ]);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setFormData({ name: '', email: '', phone: '', address: '', message: '' });
    setTicket(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please provide at least your name and email');
      return;
    }

    setIsLoading(true);
    try {
      const contactPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        message: formData.message,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity
      };

      const postJson = async (url, payload) => {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        let data = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }
        return { response, data };
      };

      let data = null;
      let response = null;
      try {
        const result = await postJson(`${API_BASE_URL}/api/contact-product`, contactPayload);
        response = result.response;
        data = result.data;
        if (!response.ok) {
          if (![404, 405].includes(response.status)) {
            throw new Error(data?.message || 'Request failed');
          }
          throw new Error('Fallback to send/contact');
        }
      } catch (primaryError) {
        const subject = `Product Inquiry: ${selectedProduct.name}`;
        const messageLines = [
          `Product: ${selectedProduct.name}`,
          `Quantity: ${quantity}`,
          formData.phone ? `Phone: ${formData.phone}` : null,
          formData.address ? `Address: ${formData.address}` : null,
          formData.message ? `Message: ${formData.message}` : null,
        ].filter(Boolean);
        const message = messageLines.join('\n');

        const fallback = await postJson(`${API_BASE_URL}/send/contact`, {
          name: formData.name,
          email: formData.email,
          subject,
          message
        });
        response = fallback.response;
        data = fallback.data;
        if (!response.ok) throw new Error(data?.message || 'Request failed');
      }

      setTicket(data?.ticket || { reference: `KRC-PROD-${Date.now()}` });

      try {
        await postJson(`${API_BASE_URL}/api/lead-events`, {
          source: 'products',
          event_type: 'contact_submit',
          payload: {
            productId: selectedProduct.id,
            productName: selectedProduct.name,
            quantity
          }
        });
      } catch {
        // Optional tracking; ignore failures
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit contact request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetOrder = () => {
    setSelectedProduct(null);
    setTicket(null);
  };

  return (
    <section className="py-24 bg-nike-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-nike-5xl sm:text-nike-6xl font-display font-black text-nike-black mb-6">
            {t('products.title')}
          </h2>
          <p className="text-nike-xl font-nike font-medium text-nike-gray-600 max-w-3xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-nike-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-nike-gray-200 hover:border-nike-black">
              <div className="relative h-80 overflow-hidden">
                <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                <img src={product.hoverImage} alt={`${product.name} alternate view`} className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-nike-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 bg-nike-white px-3 py-1 text-nike-sm font-nike font-bold uppercase tracking-wider border border-nike-gray-200">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-nike-xl font-display font-bold text-nike-black mb-3 group-hover:text-nike-accent transition-colors duration-300">
                  {product.name}
                </h3>
                <button 
                  onClick={() => handleOrder(product)} 
                  className="w-full bg-nike-black text-nike-white py-3 text-nike-sm font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  {t('products.contact')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 bg-nike-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="bg-nike-white rounded-none max-w-lg w-full p-8 relative border border-nike-gray-200 max-h-[90vh] overflow-y-auto">
              <button onClick={resetOrder} className="absolute top-6 right-6 text-nike-gray-400 hover:text-nike-black transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              {!ticket ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-nike-3xl font-display font-bold text-nike-black mb-6">Contact About {selectedProduct.name}</h3>

                  <div>
                    <label className="block text-nike-lg font-nike font-bold text-nike-black mb-3 uppercase tracking-wider">{t('products.quantity')}</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                      className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300" 
                    />
                  </div>

                  <div className="space-y-4">
                    <input 
                      type="text" 
                      required 
                      placeholder="Full Name *" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300" 
                    />
                    <input 
                      type="email" 
                      required 
                      placeholder="Email *" 
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                      className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300" 
                    />
                    <input 
                      type="tel" 
                      placeholder={t('form.phone')} 
                      value={formData.phone} 
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                      className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300" 
                    />
                    <input 
                      type="text" 
                      placeholder="Delivery Address (optional)" 
                      value={formData.address} 
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
                      className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300" 
                    />
                    <textarea
                      placeholder="Message / Details (optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-6 py-4 border border-nike-gray-300 focus:outline-none focus:border-nike-black focus:ring-2 focus:ring-nike-gray-200 text-nike-base font-nike transition-all duration-300 resize-none"
                      rows="4"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-nike-black text-nike-white py-4 text-nike-lg font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none" 
                    disabled={isLoading}
                  >
                    {isLoading ? t('products.submitting') : t('products.submit')}
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <h3 className="text-nike-2xl font-display font-bold text-nike-black mb-4">{t('products.submitted')}</h3>
                  <p className="text-nike-base font-nike text-nike-gray-600 mb-6">{t('products.reference')}: <span className="font-bold text-nike-accent">{ticket.reference}</span></p>
                  <button 
                    onClick={resetOrder} 
                    className="w-full bg-nike-black text-nike-white py-4 text-nike-lg font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-800 transition-all duration-300 transform hover:scale-105"
                  >
                    {t('products.close')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
