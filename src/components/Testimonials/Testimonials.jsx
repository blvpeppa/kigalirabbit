import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import t from '../../assets/t.jpg';
import tt from '../../assets/tt.jpg';
import ttt from '../../assets/ttt.jpg';

const Testimonials = () => {
  const { t: translate } = useTranslation();

  const TestimonialData = [
    {
      id: 1,
      name: translate("testimonials.1.name"),
      text: translate("testimonials.1.text"),
      img: tt,
    },
    {
      id: 2,
      name: translate("testimonials.2.name"),
      text: translate("testimonials.2.text"),
      img: t,
    },
    {
      id: 3,
      name: translate("testimonials.3.name"),
      text: translate("testimonials.3.text"),
      img: "https://picsum.photos/104/104",
    },
    {
      id: 4,
      name: translate("testimonials.4.name"),
      text: translate("testimonials.4.text"),
      img: ttt,
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      { breakpoint: 10000, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="py-24 bg-nike-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Nike-style header section */}
        <div className="text-center mb-20">
          <h1 data-aos="fade-up" className="text-nike-5xl sm:text-nike-6xl font-display font-black text-nike-black mb-6">
            {translate("testimonials.title")}
          </h1>
          <p data-aos="fade-up" className="text-nike-xl font-nike font-medium text-nike-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied customers and partners
          </p>
        </div>

        {/* Nike-style Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="group bg-nike-white shadow-sm hover:shadow-xl transition-all duration-500 py-12 px-8 mx-4 border border-nike-gray-200 hover:border-nike-black relative overflow-hidden">
                  {/* Nike-style Quote Mark */}
                  <div className="absolute top-6 right-6 text-nike-gray-200 text-8xl font-display font-black opacity-20">
                    "
                  </div>
                  
                  <div className="flex flex-col items-center text-center relative z-10">
                    {/* Nike-style Profile Image */}
                    <div className="mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-nike-gray-200 group-hover:border-nike-accent transition-colors duration-300">
                        <img src={data.img} alt={data.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    {/* Nike-style Testimonial Content */}
                    <div className="space-y-4 max-w-md">
                      <p className="text-nike-base font-nike text-nike-gray-600 leading-relaxed italic">
                        "{data.text}"
                      </p>
                      <div className="border-t border-nike-gray-200 pt-4">
                        <h3 className="text-nike-lg font-display font-bold text-nike-black uppercase tracking-wider">
                          {data.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
