import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Summer Collection 2025",
    subtitle: "Discover our latest summer essentials that combine style and comfort",
    cta: "Shop Now",
    image: "https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/shop/summer-collection"
  },
  {
    id: 2,
    title: "Premium Essentials",
    subtitle: "Timeless pieces crafted with the finest materials for everyday elegance",
    cta: "Explore",
    image: "https://images.pexels.com/photos/1082527/pexels-photo-1082527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/shop/essentials"
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Be the first to discover our latest styles and limited editions",
    cta: "Shop Collection",
    image: "https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/shop/new-arrivals"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const goToNextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide
              ? 'translate-x-0 opacity-100 z-10'
              : index < currentSlide
              ? '-translate-x-full opacity-0 z-0'
              : 'translate-x-full opacity-0 z-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="text-center text-white max-w-3xl mx-auto">
              <h1 
                className="text-4xl md:text-6xl font-bold mb-4 opacity-0 animate-[fadeInUp_1s_0.3s_forwards]"
                style={{ animationPlayState: index === currentSlide ? 'running' : 'paused' }}
              >
                {slide.title}
              </h1>
              <p 
                className="text-lg md:text-xl mb-8 opacity-0 animate-[fadeInUp_1s_0.5s_forwards]"
                style={{ animationPlayState: index === currentSlide ? 'running' : 'paused' }}
              >
                {slide.subtitle}
              </p>
              <div 
                className="opacity-0 animate-[fadeInUp_1s_0.7s_forwards]"
                style={{ animationPlayState: index === currentSlide ? 'running' : 'paused' }}
              >
                <Link to={slide.link}>
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-200 px-8 py-3"
                  >
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;