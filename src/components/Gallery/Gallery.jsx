import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your images
import g1 from '../../assets/gallery-1.jpg';
import g2 from '../../assets/gallery-2.jpg';
import g3 from '../../assets/gallery-3.jpg';
import g5 from '../../assets/gallery-5.jpg';
import g6 from '../../assets/gallery-6.jpg';
import g7 from '../../assets/gallery-7.jpg';
import g8 from '../../assets/gallery-8.jpg';
import g9 from '../../assets/gallery-9.jpg';
import g10 from '../../assets/gallery-10.jpg';
import g11 from '../../assets/gallery-11.jpg';
import g12 from '../../assets/gallery-12.jpg';
import g13 from '../../assets/gallery-13.jpg';
import g14 from '../../assets/gallery-14.jpg';
import g15 from '../../assets/G1.jpg';
import g16 from '../../assets/G2.jpg';
import g17 from '../../assets/G3.jpg';
import g18 from '../../assets/G4.jpg';
import g19 from '../../assets/G5.jpg';
import g20 from '../../assets/G6.jpg';
import g21 from '../../assets/g21.jpg';
import g22 from '../../assets/IMG-20250707-WA0010.jpg';
import g23 from '../../assets/IMG-20250707-WA0012.jpg';
import g24 from '../../assets/IMG-20250707-WA0013.jpg';
import g25 from '../../assets/IMG-20250707-WA0014.jpg';
import g26 from '../../assets/IMG-20250707-WA0015.jpg';
import g27 from '../../assets/IMG-20250707-WA0016.jpg';
import g28 from '../../assets/IMG-20250707-WA0017.jpg';
import g29 from '../../assets/IMG-20250707-WA0018.jpg';
import g30 from '../../assets/IMG-20250707-WA0020.jpg';
import g31 from '../../assets/IMG-20250707-WA0021.jpg';
import g32 from '../../assets/IMG-20250707-WA0022.jpg';
import g33 from '../../assets/IMG-20251115-WA0002.jpg';
import g34 from '../../assets/IMG-20251115-WA0003.jpg';
import g35 from '../../assets/IMG-20251115-WA0004.jpg';
import g36 from '../../assets/IMG-20251115-WA0006.jpg';
import g37 from '../../assets/IMG-20251115-WA0007.jpg';
// Import new images from New folder
import new1 from '../../assets/New folder/IMG-20250730-WA0001.jpg';
import new2 from '../../assets/New folder/IMG-20250730-WA0002.jpg';
import new3 from '../../assets/New folder/IMG-20250730-WA0003.jpg';
import new4 from '../../assets/New folder/IMG-20250730-WA0004.jpg';
import new5 from '../../assets/New folder/IMG-20250730-WA0005.jpg';

// Import video from New folder
import video1 from '../../assets/New folder/VID-20250730-WA0001.mp4';
import video2 from '../../assets/New folder/VID-20250730-WA0002.mp4';

const Gallery = ({ columns = { sm: 2, md: 3, lg: 3, xl: 4 }, gap = 6, showTitle = true }) => {
  const allGalleryItems = [
    { img: g1, alt: "Gallery image 1" },
    { img: g2, alt: "Gallery image 2" },
    { img: g3, alt: "Gallery image 3" },
    { img: g5, alt: "Gallery image 5" },
    { img: g6, alt: "Gallery image 6" },
    { img: g7, alt: "Gallery image 7" },
    { img: g8, alt: "Gallery image 8" },
    { img: g9, alt: "Gallery image 9" },
    { img: g10, alt: "Gallery image 10" },
    { img: g11, alt: "Gallery image 11" },
    { img: g12, alt: "Gallery image 12" },
    { img: g13, alt: "Gallery image 13" },
    { img: g14, alt: "Gallery image 14" },
    { img: g15, alt: "Gallery image 15" },
    { img: g16, alt: "Gallery image 16" },
    { img: g17, alt: "Gallery image 17" },
    { img: g18, alt: "Gallery image 18" },
    { img: g19, alt: "Gallery image 19" },
    { img: g20, alt: "Gallery image 20" },
    { img: g21, alt: "Gallery image 21" },
    { img: g22, alt: "Gallery image 22" },
    { img: g23, alt: "Gallery image 23" },
    { img: g24, alt: "Gallery image 24" },
    { img: g25, alt: "Gallery image 25" },
    { img: g26, alt: "Gallery image 26" },
    { img: g27, alt: "Gallery image 27" },
    { img: g28, alt: "Gallery image 28" },
    { img: g29, alt: "Gallery image 29" },
    { img: g30, alt: "Gallery image 30" },
    { img: g31, alt: "Gallery image 31" },
    { img: g32, alt: "Gallery image 32" },
    { img: g33, alt: "Gallery image 33" },
    { img: g34, alt: "Gallery image 34" },
    { img: g35, alt: "Gallery image 35" },
    { img: g36, alt: "Gallery image 36" },
    { img: g37, alt: "Gallery image 37" },
    // Add new images from New folder
    { img: new1, alt: "New Gallery image 1" },
    { img: new2, alt: "New Gallery image 2" },
    { img: new3, alt: "New Gallery image 3" },
    { img: new4, alt: "New Gallery image 4" },
    { img: new5, alt: "New Gallery image 5" },
    // Add video from New folder
    { video: video1, alt: "Rabbit Farm Video", type: "video" },
    { video: video2, alt: "Rabbit Farm Video2", type: "video" },

  ];

  const [selectedType, setSelectedType] = useState('all');
  const filteredItems = allGalleryItems.filter(item => 
    selectedType === 'all' || 
    (selectedType === 'images' && !item.type) || 
    (selectedType === 'videos' && item.type === 'video')
  );

  const [currentIndex, setCurrentIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (currentIndex !== null) {
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          showPrev(e);
          break;
        case 'ArrowRight':
          showNext(e);
          break;
        case 'f':
          setIsFullscreen(!isFullscreen);
          break;
        case ' ':
        case 'z':
          setIsZoomed(!isZoomed);
          break;
      }
    }
  }, [currentIndex, isFullscreen, isZoomed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const showPrev = (e) => {
    e?.stopPropagation();
    setDirection(-1);
    setImageLoaded(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    setIsZoomed(false);
  };

  const showNext = (e) => {
    e?.stopPropagation();
    setDirection(1);
    setImageLoaded(false);
    setCurrentIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  const closeModal = () => {
    setCurrentIndex(null);
    setIsFullscreen(false);
    setIsZoomed(false);
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsFullscreen(false);
    setIsZoomed(false);
    setImageLoaded(false);
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const imageVariants = {
    enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } })
  };

  const zoomVariants = {
    normal: { scale: 1 },
    zoomed: { scale: 2 }
  };

  return (
    <section className="px-4 py-16 mx-auto max-w-7xl bg-white">
      {/* Nike-style Gallery Title */}
      {showTitle && (
        <div className="w-full mx-auto text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-black mb-4"
          >
            Image Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our state-of-the-art rabbit farming facilities and breeding programs
          </motion.p>
        </div>
      )}

      {/* Nike Product Listing Style Layout */}
      <div className="flex">
        {/* Sidebar Filters like Nike */}
        <aside className="w-48 pr-6 flex-shrink-0">
          <div className="mb-6">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </div>
              <span>Pick Up Today</span>
            </label>
          </div>
          <h3 className="text-base font-semibold mb-2 text-black">Media Type</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <button
                onClick={() => setSelectedType('all')}
                className={`text-left hover:underline ${selectedType === 'all' ? 'font-bold' : 'text-gray-600'}`}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedType('images')}
                className={`text-left hover:underline ${selectedType === 'images' ? 'font-bold' : 'text-gray-600'}`}
              >
                Images
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedType('videos')}
                className={`text-left hover:underline ${selectedType === 'videos' ? 'font-bold' : 'text-gray-600'}`}
              >
                Videos
              </button>
            </li>
          </ul>
          {/* Additional Nike-like filters (customize as needed) */}
          <h3 className="text-base font-semibold mt-6 mb-2 text-black">Categories</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="hover:underline cursor-pointer">Facilities</li>
            <li className="hover:underline cursor-pointer">Breeding</li>
            <li className="hover:underline cursor-pointer">Animals</li>
            <li className="hover:underline cursor-pointer">Equipment</li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Gallery ({filteredItems.length})</h2>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-black flex items-center">
                Hide Filters <span className="ml-1">≡</span>
              </button>
              <div className="relative">
                <select className="text-sm appearance-none bg-transparent border-none cursor-pointer">
                  <option>Sort By</option>
                  <option>Featured</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <span className="absolute right-0 top-0 pointer-events-none">▼</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white cursor-pointer"
                onClick={() => openModal(index)}
              >
                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden mb-3">
                  {item.type === 'video' ? (
                    <video
                      src={item.video}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={item.alt}
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={item.img}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={item.alt}
                      loading="lazy"
                    />
                  )}
                </div>
                {/* Product Information - Nike Style */}
                <div className="px-1">
                  {/* Product Name */}
                  <h3 className="text-sm font-medium text-black mb-1 leading-tight">
                    {item.alt}
                  </h3>
                  {/* Category */}
                  <p className="text-sm text-gray-600 mb-1">
                    {item.type === 'video' ? 'Video' : 'Image'}
                  </p>
                  {/* Additional Info */}
                  <p className="text-sm text-gray-600 mb-2">High Quality</p>
                  {/* Price/Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">View Details</span>
                    {index < 2 && (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">Best Seller</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence custom={direction}>
        {currentIndex !== null && (
          <motion.div
            key="modal"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={closeModal}
          >
            <div className={`relative ${isFullscreen ? 'w-screen h-screen' : 'w-full h-full max-w-6xl max-h-[90vh]'}`}>
              {/* Navigation Arrows */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); showPrev(e); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              {/* Image Container */}
              <div className="flex items-center justify-center w-full h-full p-4">
                <AnimatePresence custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`absolute w-full h-full ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                    onClick={(e) => {
                      if (!isZoomed) e.stopPropagation();
                      setIsZoomed(!isZoomed);
                    }}
                  >
                    {filteredItems[currentIndex].type === 'video' ? (
                      <video
                        src={filteredItems[currentIndex].video}
                        className="object-contain w-full h-full select-none"
                        autoPlay
                        loop
                        playsInline
                        controls
                        preload="auto"
                      />
                    ) : (
                      <motion.img
                        src={filteredItems[currentIndex].img}
                        alt={filteredItems[currentIndex].alt}
                        className="object-contain w-full h-full select-none"
                        variants={zoomVariants}
                        animate={isZoomed ? "zoomed" : "normal"}
                        transition={{ type: "spring", damping: 20 }}
                        onLoad={() => setImageLoaded(true)}
                      />
                    )}
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); showNext(e); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); }}
                  className="bg-black/50 text-white p-3 rounded-full shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isFullscreen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    )}
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                  className="bg-black/50 text-white p-3 rounded-full shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); closeModal(); }}
                  className="bg-black/50 text-white p-3 rounded-full shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
              {/* Image Counter */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm shadow-xl"
              >
                {currentIndex + 1} / {filteredItems.length}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;