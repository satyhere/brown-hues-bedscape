import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Shield, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import TestimonialSection from "@/components/TestimonialSection";
import Header from "@/components/Header";

type Step = 'size' | 'dimension' | 'treatment';
type Size = 'single' | 'double' | 'queen' | 'king';
type Treatment = 'natural' | 'polished' | 'stained';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('size');
  const [selectedSize, setSelectedSize] = useState<Size | ''>('');
  const [selectedDimension, setSelectedDimension] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | ''>('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === 'size' && selectedSize) {
      setCurrentStep('dimension');
    } else if (currentStep === 'dimension' && selectedDimension) {
      setCurrentStep('treatment');
    } else if (currentStep === 'treatment' && selectedTreatment) {
      handleOrder();
    }
  };

  const handleOrder = () => {
    toast.success("Configuration complete!");
    navigate('/order', { 
      state: { 
        selectedSize, 
        selectedDimension, 
        selectedTreatment 
      } 
    });
  };

  const getDimensionsForSize = (size: Size) => {
    const dimensions = {
      single: ["72x36"],
      double: ["72x48"],
      queen: ["60x72", "60x75", "60x78"],
      king: ["72x72", "72x75", "72x78"]
    };
    return dimensions[size] || [];
  };

  // Add the handleSizeSelect function
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size as Size);
    setCurrentStep('size');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      
      {/* Hero Section - Reduced top padding to account for header */}
      <section className="relative min-h-[65vh] hero-gradient px-4 py-8 md:py-16 pt-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <span className="glass px-4 py-1 rounded-full text-sm font-medium mb-3 inline-block">
            Premium Bed Pallets in Bangalore
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Customize Your Perfect Bed
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            High-quality, fully customizable pinewood pallets delivered to your doorstep
          </p>

          {/* Steps Indicator */}
          <div className="flex justify-center items-center gap-4 mb-6">
            {['size', 'dimension', 'treatment'].map((step, index) => (
              <motion.div
                key={step}
                className={`flex items-center ${index !== 0 ? 'ml-8' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${currentStep === step ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}>
                  {index + 1}
                  {index !== 2 && (
                    <div className="absolute left-full w-6 h-0.5 bg-secondary"></div>
                  )}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Configurator Section - Reduced padding */}
      <section className="py-6 px-4" id="products">
        <div className="container mx-auto max-w-4xl">
          {currentStep === 'size' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-center">Select Size</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['single', 'double', 'queen', 'king'].map((size) => (
                  <div
                    key={size}
                    className={`glass p-6 rounded-xl cursor-pointer transition-all ${
                      selectedSize === size ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedSize(size as Size)}
                  >
                    <h3 className="text-xl font-semibold mb-2 capitalize">{size} Bed</h3>
                    {selectedSize === size && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'dimension' && selectedSize && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-center">Select Dimension</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getDimensionsForSize(selectedSize).map((dimension) => (
                  <div
                    key={dimension}
                    className={`glass p-6 rounded-xl cursor-pointer transition-all ${
                      selectedDimension === dimension ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedDimension(dimension)}
                  >
                    <h3 className="text-xl font-semibold mb-2">{dimension} inches</h3>
                    {selectedDimension === dimension && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'treatment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-center">Select Treatment</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'natural', name: 'Natural Finish', description: 'Classic wood texture' },
                  { id: 'polished', name: 'Polished', description: 'Smooth glossy finish' },
                  { id: 'stained', name: 'Stained', description: 'Rich dark color' },
                ].map((treatment) => (
                  <div
                    key={treatment.id}
                    className={`glass p-6 rounded-xl cursor-pointer transition-all ${
                      selectedTreatment === treatment.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedTreatment(treatment.id as Treatment)}
                  >
                    <h3 className="text-xl font-semibold mb-2">{treatment.name}</h3>
                    <p className="text-sm text-muted-foreground">{treatment.description}</p>
                    {selectedTreatment === treatment.id && (
                      <CheckCircle2 className="w-5 h-5 text-primary mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="mt-6 flex justify-center">
            {currentStep !== 'size' && (
              <Button
                variant="outline"
                className="mr-4"
                onClick={() => setCurrentStep(currentStep === 'treatment' ? 'dimension' : 'size')}
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 'size' && !selectedSize) ||
                (currentStep === 'dimension' && !selectedDimension) ||
                (currentStep === 'treatment' && !selectedTreatment)
              }
            >
              {currentStep === 'treatment' ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Reduced padding */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Shield,
                title: "Premium Quality",
                description: "AAA+ Grade pinewood with multiple treatment options",
              },
              {
                icon: Truck,
                title: "Pay on Delivery",
                description: "Only pay when you're satisfied with the product",
              },
              {
                icon: MapPin,
                title: "Bangalore Wide",
                description: "Delivery available across Bangalore",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="glass p-6 rounded-xl"
              >
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section - Reduced padding */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Choose Your Size
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              {
                title: "Queen Size",
                dimensions: ["60x72", "60x75", "60x78"],
                price: 3400,
              },
              {
                title: "King Size",
                dimensions: ["72x72", "72x75", "72x78"],
                price: 3600,
              },
              {
                title: "Double Bed",
                dimensions: ["72x48"],
                price: 2200,
              },
              {
                title: "Single Bed",
                dimensions: ["72x36"],
                price: 1900,
              },
            ].map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                selected={selectedSize === product.title.toLowerCase().split(' ')[0]}
                onSelect={() => handleSizeSelect(product.title.toLowerCase().split(' ')[0])}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - with id for navigation */}
      <section id="testimonials">
        <TestimonialSection />
      </section>

      {/* Contact Section */}
      <section className="py-8 px-4 glass mt-6" id="contact">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">BrandHues</h3>
              <p className="mb-4">High-quality, fully customizable pinewood pallets delivered to your doorstep in Bangalore.</p>
              <p className="mb-2"><strong>Email:</strong> info@brandhues.com</p>
              <p className="mb-2"><strong>Phone:</strong> +91 9876543210</p>
              <p><strong>Address:</strong> Koramangala, Bangalore - 560034</p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" className="w-full p-3 glass rounded-md" />
                </div>
                <div>
                  <input type="email" placeholder="Your Email" className="w-full p-3 glass rounded-md" />
                </div>
                <div>
                  <textarea placeholder="Your Message" className="w-full p-3 glass rounded-md" rows={4}></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center">
        <p>© 2025 BrandHues. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
