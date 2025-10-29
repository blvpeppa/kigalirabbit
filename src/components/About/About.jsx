import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { 
  MdHealthAndSafety, 
  MdSupportAgent, 
  MdEmergency,
  MdCheckCircle,
  MdPeople,
  MdLocalHospital,
  MdTour
} from "react-icons/md";
import { GiRabbit } from "react-icons/gi";
import { FaVideo, FaQuestionCircle, FaCalendarAlt, FaPlay, FaTimes } from "react-icons/fa";

// Import your images
import BgImage from "../../assets/bg_4.jpg";
import CEOImage from "../../assets/CEO.jpg";
import AboutMain from "../../assets/about.jpg";
import AboutImg2 from "../../assets/about-2.jpg";
import AboutImg3 from "../../assets/about-3.jpg";
import BannerImg from "../../assets/about-1.jpg"; 
import Video from "../../assets/sample-video.mp4";

// Fallback data for safe rendering
const FALLBACK_FAQ_ITEMS = [
  {
    question: "What services do you offer?",
    answer: [
      "Rabbit farming consultations",
      "Farm tours and education",
      "Veterinary services",
      "Product sales"
    ]
  },
  {
    question: "How do I book a tour?",
    answer: "Contact us via email at info@kigalirabbit.com or call +250 795880784 to schedule your tour."
  },
  {
    question: "What makes your rabbits special?",
    answer: [
      "Premium breed quality",
      "Organic feeding practices",
      "Regular health monitoring",
      "Sustainable farming methods"
    ]
  }
];

const FALLBACK_NEWS_ITEMS = [
  {
    title: "New Training Program Launched",
    date: "Sep 15, 2025",
    content: "We're excited to announce our new rabbit farming training program starting next month."
  },
  {
    title: "Farm Expansion Complete",
    date: "Aug 28, 2025",
    content: "Our farm expansion project has been successfully completed, increasing our capacity by 40%."
  },
  {
    title: "Sustainable Farming Award",
    date: "Jul 12, 2025",
    content: "Kigali Rabbit Center wins the 2025 Sustainable Farming Award for innovative practices."
  }
];

const FALLBACK_TAB_FEATURES = {
  mission: ["Sustainable farming", "Community empowerment", "Quality breeding"],
  vision: ["Global leadership", "Innovation focus", "Environmental stewardship"],
  values: ["Integrity", "Excellence", "Sustainability", "Community"]
};

const About = () => {
  const { t } = useTranslation();
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');
  const [stats, setStats] = useState({
    outgrowers: 0,
    vets: 0,
    workers: 0,
    tours: 0
  });

  const toggleNewsModal = () => setShowNewsModal(!showNewsModal);
  const toggleVideoModal = () => setShowVideoModal(!showVideoModal);

  // Safe translation getter
  const safeTranslate = (key, options = {}) => {
    try {
      const result = t(key, options);
      // Check if it's an array or object array
      if (options.returnObjects && Array.isArray(result)) {
        return result;
      }
      // For features, try to parse as array
      if (key.includes('features')) {
        const parsed = result.split(',').map(item => item.trim());
        return parsed.length > 1 ? parsed : [result];
      }
      return result;
    } catch (error) {
      console.warn(`Translation failed for key: ${key}`, error);
      return key; // Fallback to key itself
    }
  };

  // Safe array getter for FAQ items
  const getFaqItems = () => {
    try {
      const items = safeTranslate('about.faq.items', { returnObjects: true });
      return Array.isArray(items) ? items : FALLBACK_FAQ_ITEMS;
    } catch (error) {
      console.warn('Failed to get FAQ items, using fallback');
      return FALLBACK_FAQ_ITEMS;
    }
  };

  // Safe array getter for news items
  const getNewsItems = () => {
    try {
      const items = safeTranslate('about.modals.news.items', { returnObjects: true });
      return Array.isArray(items) ? items : FALLBACK_NEWS_ITEMS;
    } catch (error) {
      console.warn('Failed to get news items, using fallback');
      return FALLBACK_NEWS_ITEMS;
    }
  };

  // Safe array getter for tab features
  const getTabFeatures = (tab) => {
    try {
      const features = safeTranslate(`about.tabs.${tab}.features`, { returnObjects: true });
      return Array.isArray(features) ? features : FALLBACK_TAB_FEATURES[tab] || [];
    } catch (error) {
      console.warn(`Failed to get features for tab ${tab}, using fallback`);
      return FALLBACK_TAB_FEATURES[tab] || [];
    }
  };

  // Animate stats on mount
  useEffect(() => {
    const animateStats = () => {
      const targets = {
        outgrowers: 128,
        vets: 16,
        workers: 34,
        tours: 10
      };

      const duration = 2000;
      const increment = 20;

      Object.keys(targets).forEach(key => {
        const target = targets[key];
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setStats(prev => ({ ...prev, [key]: current }));
        }, duration / (target / increment));
      });
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  const statsData = [
    {
      icon: MdPeople,
      number: stats.outgrowers,
      label: safeTranslate('about.stats.outgrowers'),
      color: 'text-nike-green'
    },
    {
      icon: MdLocalHospital,
      number: stats.vets,
      label: safeTranslate('about.stats.vets'),
      color: 'text-nike-orange'
    },
    {
      icon: MdPeople,
      number: stats.workers,
      label: safeTranslate('about.stats.workers'),
      color: 'text-nike-blue'
    },
    {
      icon: MdTour,
      number: stats.tours,
      label: safeTranslate('about.stats.tours'),
      color: 'text-nike-black'
    }
  ];

  const tabData = [
    {
      id: 'mission',
      title: safeTranslate('about.tabs.mission.title'),
      content: safeTranslate('about.tabs.mission.content'),
      icon: GiRabbit,
      color: 'border-nike-green'
    },
    {
      id: 'vision',
      title: safeTranslate('about.tabs.vision.title'),
      content: safeTranslate('about.tabs.vision.content'),
      icon: MdHealthAndSafety,
      color: 'border-nike-orange'
    },
    {
      id: 'values',
      title: safeTranslate('about.tabs.values.title'),
      content: safeTranslate('about.tabs.values.content'),
      icon: MdCheckCircle,
      color: 'border-nike-blue'
    }
  ];

  const currentTab = tabData.find(tab => tab.id === activeTab) || tabData[0];

  const renderIcon = (IconComponent, className = "w-6 h-6") => {
    return <IconComponent className={className} />;
  };

  // Get FAQ items safely
  const faqItems = getFaqItems();
  const newsItems = getNewsItems();

  return (
    <>
      <Helmet>
        <title>{safeTranslate('about.meta.title')}</title>
        <meta name="description" content={safeTranslate('about.meta.description')} />
        <link rel="canonical" href="https://kigalirabbits.org/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Kigali Rabbit Center",
            "url": "https://kigalirabbits.org",
            "logo": "https://kigalirabbits.org/logo.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kigali",
              "addressCountry": "RW"
            },
            "description": "Rabbit farming tours and sales in Kigali, Rwanda"
          })}
        </script>
      </Helmet>

      {/* Nike-style Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-nike-black">
        <div 
          className="absolute inset-0 bg-nike-black"
          style={{ 
            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%), url(${BgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-nike-black/40 via-transparent to-nike-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          
          <h1 className="text-nike-4xl md:text-nike-5xl lg:text-nike-6xl font-display font-black text-nike-white mb-6 leading-none tracking-tight">
            {safeTranslate('about.hero.title', 'About')} 
            <span className="block text-nike-white mt-2">KRC</span>
          </h1>
          
          <p className="text-nike-lg md:text-nike-xl font-nike text-nike-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            {safeTranslate('about.hero.subtitle', 'Leading sustainable rabbit farming in Kigali, Rwanda')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link 
              to="/tour" 
              className="group inline-flex items-center justify-center px-12 py-6 bg-nike-white text-nike-black text-nike-xl font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl rounded-lg"
            >
              <span className="flex items-center">
                {safeTranslate('about.hero.button', 'Book Tour')} 
                <svg className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-12 py-6 border-2 border-nike-white text-nike-white text-nike-xl font-nike font-bold uppercase tracking-wider hover:bg-nike-white hover:text-nike-black transition-all duration-300 rounded-lg backdrop-blur-sm"
            >
              {safeTranslate('about.hero.cta', 'Contact Us')}
            </Link>
          </div>
        </div>
      </section>

      {/* Nike-style Our Story Section */}
      <section className="py-24 bg-nike-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-nike-4xl md:text-nike-5xl font-display font-black text-nike-black mb-4">
              {safeTranslate('about.ceo.section_title', 'Our Story')}
            </h2>
            <p className="text-nike-xl text-nike-gray-600 max-w-3xl mx-auto">
              {safeTranslate('about.ceo.subtitle', 'Leading sustainable agriculture in Rwanda')}
            </p>
          </div>

          {/* Nike-style Story Cards */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Story Content Card */}
            <div className="space-y-8">
              <div className="bg-nike-white rounded-2xl p-8 shadow-lg border border-nike-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-nike-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-nike-white font-nike font-bold text-nike-sm">KRC</span>
                  </div>
                  <div>
                    <h3 className="text-nike-2xl font-display font-bold text-nike-black mb-2">
                      {safeTranslate('about.ceo.name', 'Dieudonne Musoni')}
                    </h3>
                    <p className="text-nike-gray-600 font-nike font-bold text-nike-sm uppercase tracking-wider">
                      {safeTranslate('about.ceo.title', 'Founder & CEO')}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6 text-nike-gray-600">
                  <p className="text-nike-lg font-nike font-medium leading-relaxed">
                    {safeTranslate('about.ceo.intro', 'Founded in 2018, Kigali Rabbit Center has been at the forefront of sustainable agriculture in Rwanda.')}
                  </p>
                  
                  <div className="p-6 bg-nike-gray-50 border border-nike-gray-200 rounded-xl">
                    <p className="text-nike-lg font-nike font-bold text-nike-black mb-3">
                      {safeTranslate('about.ceo.mission', 'Our mission is to empower local farmers')}
                    </p>
                    <p className="text-nike-lg font-nike font-medium">
                      <span className="font-bold text-nike-black">
                        {safeTranslate('about.ceo.highlight', 'through sustainable rabbit farming practices')}
                      </span>
                    </p>
                  </div>
                  
                  <p className="text-nike-lg font-nike font-medium leading-relaxed">
                    {safeTranslate('about.ceo.ai', 'We leverage modern agricultural techniques to ensure')}{" "}
                    <span className="font-bold text-nike-black">
                      {safeTranslate('about.ceo.ai_highlight', 'optimal health and productivity')}
                    </span>{" "}
                    {safeTranslate('about.ceo.rest', 'for our rabbits and farmers alike.')}
                  </p>
                </div>
              </div>

              <div className="bg-nike-gray-50 rounded-2xl p-6 border border-nike-gray-200">
                <p className="text-nike-base font-nike text-nike-black">
                  <span className="font-bold text-nike-gray-700">{safeTranslate('about.ceo.contact', 'Get in touch:')}</span>{" "}
                  <a href="mailto:info@kigalirabbit.com" className="text-nike-black hover:text-nike-gray-600 transition-colors duration-300 font-bold">
                    info@kigalirabbit.com
                  </a>
                </p>
              </div>
            </div>

            {/* CEO Image Card */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="w-full bg-nike-gray-100 shadow-xl overflow-hidden border border-nike-gray-200 rounded-2xl">
                  <img 
                    src={CEOImage} 
                    alt={safeTranslate('about.ceo.name', 'CEO Name')} 
                    className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-nike-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nike-style Stats Section */}
      <section className="py-24 bg-nike-black relative overflow-hidden">
        <div className="absolute inset-0 bg-nike-black" />
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: `url(${AboutMain})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-nike-4xl md:text-nike-5xl font-display font-black text-nike-white mb-4">
              {safeTranslate('about.stats.title', 'Our Impact')}
            </h2>
            <p className="text-nike-xl text-nike-gray-300 max-w-2xl mx-auto">
              {safeTranslate('about.stats.subtitle', 'Transforming lives through sustainable agriculture')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-nike-white/5 backdrop-blur-xl rounded-2xl p-8 border border-nike-white/10 hover:border-nike-white/20 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-nike-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-nike-white/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-nike-white/20 transition-colors">
                    {renderIcon(stat.icon, "w-8 h-8 text-nike-white")}
                  </div>
                  
                  <div className="text-4xl font-display font-black text-nike-white mb-3">
                    {stat.number.toLocaleString()}
                  </div>
                  
                  <p className="text-nike-gray-300 text-nike-sm font-nike font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nike-style Story Section */}
      <section className="py-24 bg-nike-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-nike-4xl md:text-nike-5xl font-display font-black text-nike-black mb-4">
              {safeTranslate('about.story.title', 'Our Journey')}
            </h2>
            <p className="text-nike-xl text-nike-gray-600 max-w-3xl mx-auto">
              {safeTranslate('about.story.subtitle', 'From vision to reality - our commitment to excellence')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Tab Navigation */}
            <div className="space-y-8">
              <div className="flex space-x-1 bg-nike-gray-100 rounded-xl p-1">
                {tabData.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-6 text-nike-sm font-nike font-medium rounded-lg transition-all duration-300 relative ${
                      activeTab === tab.id
                        ? 'bg-nike-white text-nike-black shadow-lg' 
                        : 'text-nike-gray-600 hover:text-nike-black hover:bg-nike-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {renderIcon(tab.icon, "w-4 h-4")}
                      <span>{tab.title}</span>
                    </div>
                    {activeTab === tab.id && (
                      <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 rounded-full w-8 ${tab.color}`} />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="bg-nike-white rounded-2xl p-8 shadow-lg border border-nike-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 ${currentTab.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      {renderIcon(currentTab.icon, "w-6 h-6 text-nike-white")}
                    </div>
                    <div>
                      <h3 className="text-nike-2xl font-display font-bold text-nike-black">
                        {currentTab.title}
                      </h3>
                      <p className="text-nike-sm text-nike-gray-500 uppercase tracking-wider font-nike">
                        {safeTranslate('about.story.tab_subtitle', 'Our Commitment')}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-nike-lg text-nike-gray-700 leading-relaxed font-nike">
                    {currentTab.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 pt-4">
                    {getTabFeatures(activeTab).map((feature, idx) => (
                      <span key={idx} className="inline-flex items-center px-4 py-2 bg-nike-gray-50 text-nike-gray-700 text-nike-sm font-nike font-medium rounded-full border border-nike-gray-200">
                        <MdCheckCircle className="w-4 h-4 mr-2 text-nike-accent" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual */}
            <div className="relative">
              <div className="relative w-full h-96 bg-nike-gray-100 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={BannerImg} 
                  alt="Our Story" 
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nike-black/20 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 bg-nike-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-nike-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-nike-accent rounded-lg flex items-center justify-center">
                      <GiRabbit className="w-5 h-5 text-nike-white" />
                    </div>
                    <div>
                      <p className="text-nike-sm font-nike font-medium text-nike-black">Since 2018</p>
                      <p className="text-nike-xs text-nike-gray-600 font-nike uppercase tracking-wider">Pioneering Rabbit Farming</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nike-style Why Choose Us */}
      <section className="py-24 bg-nike-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-nike-4xl md:text-nike-5xl font-display font-black text-nike-white mb-4">
              {safeTranslate('about.why.title', 'Why Choose Us')}
            </h2>
            <p className="text-nike-xl text-nike-gray-300 max-w-3xl mx-auto">
              {safeTranslate('about.why.subtitle', 'Excellence in every aspect of rabbit farming')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              {[
                { 
                  icon: MdHealthAndSafety, 
                  title: safeTranslate('about.why.services.care', 'Premium Care'), 
                  color: 'bg-nike-green', 
                  desc: safeTranslate('about.why.services.care_desc', '24/7 veterinary monitoring and care') 
                },
                { 
                  icon: MdSupportAgent, 
                  title: safeTranslate('about.why.services.support', 'Expert Support'), 
                  color: 'bg-nike-orange', 
                  desc: safeTranslate('about.why.services.support_desc', 'Dedicated team of agricultural experts') 
                },
                { 
                  icon: MdEmergency, 
                  title: safeTranslate('about.why.services.emergency', 'Emergency Response'), 
                  color: 'bg-nike-red', 
                  desc: safeTranslate('about.why.services.emergency_desc', 'Rapid response veterinary services') 
                }
              ].map((service, index) => (
                <div key={index} className="group flex items-start space-x-4 p-6 bg-nike-white/5 rounded-xl backdrop-blur-sm border border-nike-white/10 hover:border-nike-white/20 transition-all duration-300">
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    {renderIcon(service.icon, "w-6 h-6 text-nike-white")}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-nike font-semibold text-nike-white mb-2 group-hover:text-nike-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-nike-gray-300 text-nike-sm font-nike leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl border border-nike-white/10">
                <img 
                  src={AboutMain} 
                  alt="Why Choose Us" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nike-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Vet Services Highlight */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-nike-white rounded-2xl p-8 text-center shadow-xl border border-nike-gray-200">
              <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-nike-accent/10 rounded-full">
                <GiRabbit className="w-6 h-6 text-nike-accent" />
                <span className="text-nike-lg font-nike font-bold text-nike-accent uppercase tracking-wider">
                  {safeTranslate('about.why.services.vet.title', 'Veterinary Excellence')}
                </span>
              </div>
              <p className="text-nike-lg text-nike-gray-700 mb-8 leading-relaxed font-nike max-w-2xl mx-auto">
                {safeTranslate('about.why.services.vet.content', 'Comprehensive veterinary care with state-of-the-art facilities and expert staff ensuring the highest standards of animal welfare.')}
              </p>
              <button
                onClick={toggleNewsModal}
                className="inline-flex items-center space-x-3 bg-nike-black text-nike-white px-8 py-4 rounded-full font-nike font-bold uppercase tracking-wider hover:bg-nike-gray-800 transition-all duration-300"
              >
                <span>{safeTranslate('about.why.news_button', 'Latest News')}</span>
                <FaCalendarAlt className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Nike-style Media & FAQ */}
      <section className="py-24 bg-nike-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Media Gallery */}
            <div className="space-y-6">
              <div className="bg-nike-white rounded-2xl p-6 shadow-lg border border-nike-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <FaVideo className="w-6 h-6 text-nike-accent" />
                  <h3 className="text-nike-2xl font-display font-bold text-nike-black">
                    {safeTranslate('about.media.title', 'See Our Work')}
                  </h3>
                </div>
                
                <div className="relative group cursor-pointer overflow-hidden rounded-xl" onClick={toggleVideoModal}>
                  <div 
                    className="relative w-full aspect-video bg-nike-gray-100 rounded-xl overflow-hidden"
                    style={{ backgroundImage: `url(${AboutMain})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div className="absolute inset-0 bg-nike-black/40 group-hover:bg-nike-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-nike-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FaPlay className="w-6 h-6 text-nike-black ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Gallery Thumbnails */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[AboutImg2, AboutImg3].map((img, idx) => (
                    <div key={idx} 
                         className="relative group cursor-pointer rounded-xl overflow-hidden h-40 bg-nike-gray-100" 
                         style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="absolute inset-0 bg-nike-black/20 group-hover:bg-nike-black/40 transition-colors duration-300" />
                      <div className="absolute top-3 right-3 bg-nike-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <svg className="w-4 h-4 text-nike-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* FAQ */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <FaQuestionCircle className="w-7 h-7 text-nike-accent" />
                <div>
                  <h3 className="text-nike-2xl font-display font-bold text-nike-black">
                    {safeTranslate('about.faq.title', 'Frequently Asked Questions')}
                  </h3>
                  <p className="text-nike-gray-600 text-nike-base font-nike">
                    {safeTranslate('about.faq.subtitle', 'Everything you need to know about our services')}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                {faqItems.slice(0, 3).map((item, index) => (
                  <details key={index} className="group bg-nike-white rounded-xl shadow-sm border border-nike-gray-200">
                    <summary className="cursor-pointer p-6 flex items-center justify-between font-nike font-medium text-nike-lg text-nike-black hover:bg-nike-gray-50 rounded-xl transition-colors duration-300">
                      <span className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-nike-accent rounded-full" />
                        <span>{item.question || `Question ${index + 1}`}</span>
                      </span>
                      <svg className="w-5 h-5 text-nike-gray-400 group-open:-rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                      {Array.isArray(item.answer) ? (
                        <ul className="space-y-2 ml-6">
                          {item.answer.map((point, i) => (
                            <li key={i} className="flex items-start space-x-3 text-nike-gray-700 font-nike text-nike-sm">
                              <MdCheckCircle className="w-5 h-5 text-nike-accent flex-shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-nike-gray-700 font-nike text-nike-sm leading-relaxed">{item.answer}</p>
                      )}
                    </div>
                  </details>
                ))}
                
                {faqItems.length > 3 && (
                  <Link 
                    to="/faq" 
                    className="block w-full text-center py-4 px-6 bg-nike-black text-nike-white font-nike font-bold rounded-xl hover:bg-nike-gray-800 transition-all duration-300 uppercase tracking-wider"
                  >
                    {safeTranslate('about.faq.view_all', 'View All Questions')}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nike-style News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 bg-nike-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-nike-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 bg-nike-black text-nike-white">
              <div className="flex items-center space-x-3">
                <FaCalendarAlt className="w-6 h-6" />
                <div>
                  <h2 className="text-nike-2xl font-display font-bold">{safeTranslate('about.modals.news.title', 'Latest News')}</h2>
                  <p className="text-nike-sm text-nike-gray-300 font-nike">Updates from Kigali Rabbit Center</p>
                </div>
              </div>
              <button 
                onClick={toggleNewsModal}
                className="p-2 hover:bg-nike-white/20 rounded-full transition-colors duration-300"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="divide-y divide-nike-gray-100">
                {newsItems.map((item, index) => (
                  <div key={index} className="p-6 hover:bg-nike-gray-50 transition-colors duration-300">
                    <div className="flex items-start space-x-4 mb-3">
                      <div className="w-12 h-12 bg-nike-accent rounded-xl flex items-center justify-center flex-shrink-0">
                        <GiRabbit className="w-6 h-6 text-nike-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-nike-lg font-display font-bold text-nike-black truncate">{item.title}</h3>
                        <p className="text-nike-sm text-nike-gray-500 font-nike">{item.date}</p>
                      </div>
                    </div>
                    <p className="text-nike-gray-700 font-nike leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-nike-gray-50 border-t border-nike-gray-200">
              <button
                onClick={toggleNewsModal}
                className="w-full bg-nike-black hover:bg-nike-gray-800 text-nike-white py-4 px-6 rounded-xl font-nike font-bold uppercase tracking-wider transition-all duration-300"
              >
                {safeTranslate('about.modals.close', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nike-style Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-nike-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh]">
            <button 
              onClick={toggleVideoModal}
              className="absolute -top-12 right-0 text-nike-white hover:text-nike-gray-300 text-3xl font-bold p-3 rounded-full bg-nike-black/50 hover:bg-nike-black/70 transition-colors duration-300 z-10"
            >
              ×
            </button>
            
            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl border border-nike-white/20">
              <video 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
                onError={(e) => console.error('Video error:', e)}
              >
                <source src={Video} type="video/mp4" />
                <div className="absolute inset-0 flex items-center justify-center bg-nike-black text-nike-white">
                  <div className="text-center p-8">
                    <FaVideo className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-nike-base font-nike">{safeTranslate('about.modals.video.not_supported', 'Your browser does not support video playback')}</p>
                  </div>
                </div>
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;