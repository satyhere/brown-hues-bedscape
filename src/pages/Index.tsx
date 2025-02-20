
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Shield, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import TestimonialSection from "@/components/TestimonialSection";

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

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] hero-gradient px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <span className="glass px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Premium Bed Pallets in Bangalore
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Customize Your Perfect Bed
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            High-quality, fully customizable pinewood pallets delivered to your doorstep
          </p>

          {/* Steps Indicator */}
          <div className="flex justify-center items-center gap-4 mb-8">
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

      {/* Configurator Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {currentStep === 'size' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
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
              className="space-y-8"
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
              className="space-y-8"
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

          <div className="mt-8 flex justify-center">
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

      {/* Features Section */}
      <section className="py-8 px-4">
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

      {/* Product Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
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
                selected={selectedSize === product.title.toLowerCase()}
                onSelect={() => handleSizeSelect(product.title.toLowerCase())}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />
    </div>
  );
};

export default Index;
