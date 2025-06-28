import { motion, useAnimation } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const InstagramReel = ({ url }: { url: string }) => {
  useEffect(() => {
    // Load Instagram embed script if not already loaded
    if (!window.instgrm) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="w-[280px] flex-shrink-0 snap-center">
      <div className="w-full aspect-[9/16] rounded-lg overflow-hidden bg-secondary/20">
        <blockquote 
          className="instagram-media w-full h-full" 
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            maxWidth: '100%',
            minWidth: '100%',
            margin: 0,
          }}
        ></blockquote>
      </div>
    </div>
  );
};

const ReelCarousel = () => {
  const controls = useAnimation();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const reelUrls = [
    {
      url: 'https://www.instagram.com/reel/DKKB6mSIYdZ/',
      title: 'Customer Review: Love the quality!',
      description: 'Our happy customer showing their new bed frame in action.'
    },
    {
      url: 'https://www.instagram.com/reel/ABC123xyz/',
      title: 'Bedroom Makeover',
      description: 'Transforming a bedroom with our premium bed frames.'
    },
    {
      url: 'https://www.instagram.com/reel/XYZ789abc/',
      title: 'Assembly Guide',
      description: 'Quick and easy assembly of your new bed frame.'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container) {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 1
        );
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      
      <div 
        ref={containerRef}
        className="flex gap-4 overflow-x-auto py-4 px-2 scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {reelUrls.map((reel, index) => (
          <div key={index} className="flex-shrink-0 snap-center w-[300px] md:w-[350px] px-2">
            <div className="rounded-xl overflow-hidden bg-white shadow-lg">
              <div className="relative">
                <InstagramReel url={reel.url} />
                
              </div>
              
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const testimonials = [
  {
    id: 1,
    name: 'Priya M.',
    location: 'Indiranagar, Bangalore',
    rating: 5,
    content: 'The bed frame is absolutely stunning! The quality exceeded my expectations and it was so easy to assemble. Perfect addition to my bedroom.',
    date: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Rahul S.',
    location: 'Koramangala, Bangalore',
    rating: 5,
    content: 'Exceptional craftsmanship and the most comfortable bed I\'ve ever owned. The delivery team was very professional and on time.',
    date: '1 month ago'
  },
  {
    id: 3,
    name: 'Ananya K.',
    location: 'Whitefield, Bangalore',
    rating: 4,
    content: 'Beautiful design and very sturdy. The bed frame was exactly as shown in the pictures. The only reason for 4 stars is the slight delay in delivery.',
    date: '3 weeks ago'
  },
  {
    id: 4,
    name: 'Vikram P.',
    location: 'Jayanagar, Bangalore',
    rating: 5,
    content: 'Absolutely in love with my new bed! The storage space underneath is a game-changer for my small apartment. Highly recommended!',
    date: '1 week ago'
  },
  {
    id: 5,
    name: 'Meera R.',
    location: 'HSR Layout, Bangalore',
    rating: 5,
    content: 'The bed frame is not just functional but also a statement piece in my bedroom. The wood finish is beautiful and the assembly was straightforward.',
    date: '2 months ago'
  },
  {
    id: 6,
    name: 'Arjun M.',
    location: 'Bellandur, Bangalore',
    rating: 4,
    content: 'Great quality and very comfortable. The bed looks exactly like the pictures. The delivery was smooth and the team was very helpful.',
    date: '3 weeks ago'
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto slide every 5 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  return (
    <section className="py-6 md:py-10 px-1 md:px-2">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          What Our Customers Say
        </h2>
        
        <div 
          className="relative mx-auto max-w-4xl px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 sm:-left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <div className="w-full px-4 flex justify-center items-center min-h-[280px]">
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="glass p-6 md:p-8 rounded-xl mx-auto w-full max-w-2xl"
            >
              <div className="flex gap-1 mb-3 md:mb-4">
                {Array(5).fill(null).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'fill-primary text-primary' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6 italic">
                "{testimonials[currentIndex].content}"
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="font-semibold text-sm sm:text-base">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                </div>
              </div>
            </motion.div>
          </div>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 sm:-right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { ReelCarousel };
export default TestimonialSection;
