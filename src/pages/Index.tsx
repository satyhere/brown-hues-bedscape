import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Truck, Shield, CheckCircle2, ChevronLeft, ShoppingCart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import TestimonialSection from "@/components/TestimonialSection";
import InstagramSection from "@/components/InstagramSection";
import Header from "@/components/Header";
import SizeVisualizer from "@/components/SizeVisualizer";
import CartSidebar from "@/components/CartSidebar";
import Chatbot from "@/components/Chatbot";
import { useBedConfig } from "@/hooks/useBedConfig";
import { PRODUCT_SIZES, CONFIGURATION_STEPS, ConfigStep } from "@/lib/constants";

// Types
type Size = 'single' | 'double' | 'queen' | 'king' | 'custom';
type Treatment = 'natural' | 'polished' | 'stained';
interface ProductSize {
  title: string;
  size: Size;
  price: number;
  dimensions: string[];
}

const Index = () => {
  const navigate = useNavigate();
  const {
    config,
    handleNext,
    handleSizeSelect,
    handleDimensionSelect,
    handleAddToCart
  } = useBedConfig();

  // Helper for stepper logic
  const getStepIndex = (step: ConfigStep) => CONFIGURATION_STEPS.findIndex(s => s.key === step);
  const currentStepIndex = getStepIndex(config.currentStep as ConfigStep);


  // Helper functions
  const getProductData = (size: Size | "") => PRODUCT_SIZES.find(ps => ps.size === size);
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section 
        className={`relative hero-gradient px-2 py-2 md:py-2 pt-12 md:pt-16`}
        style={{
          paddingBottom: 0
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.67 }}
          className="container mx-auto text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4 mt-5 md:mt-8 inline-block tracking-wide shadow-sm"
          >
            Premium Bed Pallets in Bangalore
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-roboto text-[2rem] sm:text-4xl md:text-5xl mb-2 md:mb-3 text-center font-extralight text-card-foreground"
          >
            Design Your Bed
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 md:mb-6 px-2"
          >
            Custom, high-quality Pinewood Pallets delivered right to your doorstep.
          </motion.p>
          
          {/* Step Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-2 mb-0.5 mt-0.5 md:mt-1 px-2"
          >
            {CONFIGURATION_STEPS.map((step, i) => {
  const isActive = i === currentStepIndex;
  const isCompleted = i < currentStepIndex;
  return (
    <motion.div
      key={step.key}
      className={`flex items-center relative ${i !== 0 ? "ml-2 md:ml-4" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.17 }}
    >
      <div
        className={`relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border-2 transition-all duration-200
          ${isActive ? "bg-primary text-secondary border-primary scale-110 shadow-lg ring-4 ring-primary/30" :
            isCompleted ? "bg-success/90 text-white border-success scale-100 shadow-md" :
            "bg-secondary text-primary border-secondary shadow-none"}
        `}
        style={isActive ? { boxShadow: "0 0 0 6px rgba(180,150,125,0.08)" } : {}}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-success" />
        ) : (
          <span className="text-base md:text-lg font-bold">{i + 1}</span>
        )}
      </div>
      {i < CONFIGURATION_STEPS.length - 1 && (
        <div className={`absolute left-full mx-1 w-2 md:w-6 h-0.5 ${isCompleted ? "bg-success/60" : "bg-primary/20"}`} />
      )}
      <span className={`ml-2 text-[8px] md:text-xs font-semibold uppercase tracking-wide transition-colors duration-200
        ${isActive ? "text-primary drop-shadow-sm" : isCompleted ? "text-success" : "text-muted-foreground"}
      `}>
        {step.label}
      </span>
    </motion.div>
  );
})}


          </motion.div>
        </motion.div>
      </section>

      {/* Size Visualizer */}
      <AnimatePresence>
        {config.selectedSize && (
          <motion.div
            key="visualizer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <SizeVisualizer selectedSize={config.selectedSize} currentStep={config.currentStep} selectedDimension={config.selectedDimension} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Configurator Section */}
      <section className="py-4 md:py-6 px-2 md:px-4" id="configurator">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 13 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Size Selection */}
            {config.currentStep === "size" && (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-center mb-2 md:mb-4">Select Size</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 mb-2 md:mb-4">
                  {PRODUCT_SIZES.map(sizeObj => (
                    <motion.div 
                      key={sizeObj.size}
                      whileHover={{ 
                        scale: 1.065,
                        boxShadow: "0 6px 32px 0 rgba(180,150,125,0.15)" 
                      }}
                      whileTap={{ scale: 0.97 }}
                      className={`glass p-3 md:p-4 rounded-xl card-animate cursor-pointer flex flex-col items-center justify-center hover:shadow-accent transition-all duration-200 ${
                        config.selectedSize === sizeObj.size 
                          ? "ring-2 ring-primary border-primary scale-105 shadow-xl" 
                          : ""
                      }`}
                      onClick={() => handleSizeSelect(sizeObj.size)}
                    >
                      <span className="block text-base md:text-lg font-bold mb-1 capitalize">
                        {sizeObj.title}
                      </span>
                      <span className="text-[10px] md:text-xs mt-0 text-muted-foreground mb-1 md:mb-2">
                        {sizeObj.size === 'custom' 
                          ? 'Multiple sizes' 
                          : `${sizeObj.dimensions.join(", ")} inch`
                        }
                      </span>
                      <span className="block text-primary text-xl md:text-2xl font-semibold">
                        {sizeObj.size === 'custom' ? 'Variable' : `₹${sizeObj.price}`}
                      </span>
                      {config.selectedSize === sizeObj.size && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1 md:mt-2 text-[10px] md:text-xs text-primary font-medium animate-fade-in"
                        >
                          Selected
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {/* Step Navigation Buttons */}
                <div className="flex items-center gap-2 mt-4 mb-2 w-full justify-center">
                  {config.currentStep === "size" && (
                    <Button
                      className="h-12 md:h-14 px-6 py-3 text-base md:text-lg font-semibold rounded-xl bg-primary text-white shadow-xl transition-all duration-200 flex items-center justify-center gap-2 relative group animate-pulse-once"
                      onClick={handleNext}
                      disabled={!config.selectedSize}
                      style={{
                        boxShadow: config.selectedSize ? "0 6px 32px 0 rgba(180,150,125,0.13)" : undefined,
                        opacity: config.selectedSize ? 1 : 0.6,
                        pointerEvents: config.selectedSize ? 'auto' : 'none'
                      }}
                    >
                      Next
                      <span className="inline-flex items-center ml-2">
                        <ChevronRight className="w-5 h-5" />
                      </span>
                      {config.selectedSize && (
                        <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                        <span className="text-xs md:text-sm text-primary/80 bg-white/90 px-2 py-1 rounded-lg shadow-md animate-fade-in">
                          Continue to select dimensions
                        </span>
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </>
            )}

            {/* Dimension Selection */}
            {config.currentStep === "dimension" && config.selectedSize && (
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-center">Select Dimensions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {PRODUCT_SIZES.find(s => s.size === config.selectedSize)?.dimensions.map(dimension => (
                    <motion.div
                      key={dimension}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 md:p-4 rounded-lg border cursor-pointer ${
                        config.selectedDimension === dimension
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleDimensionSelect(dimension)}
                    >
                      <div className="text-center">
                        <span className="text-base md:text-lg font-semibold">{dimension}</span>
                        <p className="text-xs md:text-sm text-muted-foreground">inches</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Step Navigation Buttons */}
                <div className="flex items-center gap-2 mt-4 mb-2 w-full justify-center">
                  {/* Show Back Arrow only after first step */}
                  <button
                    type="button"
                    aria-label="Go back"
                    className="flex items-center justify-center rounded-full p-2 bg-gray-200 hover:bg-primary/10 text-primary transition-all focus:outline-none"
                    onClick={() => {
                      // Move to previous step
                      if (config.currentStep === "dimension") {
                        handleSizeSelect("");
                      }
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {config.currentStep === "dimension" && (
                    <Button
                      className="h-12 md:h-14 px-6 py-3 text-base md:text-lg font-semibold rounded-xl bg-primary text-white shadow-xl transition-all duration-200 flex items-center justify-center gap-2 relative group animate-pulse-once"
                      onClick={handleAddToCart}
                      disabled={!config.selectedDimension}
                      style={{
                        boxShadow: config.selectedDimension ? "0 6px 32px 0 rgba(180,150,125,0.13)" : undefined,
                        opacity: config.selectedDimension ? 1 : 0.6,
                        pointerEvents: config.selectedDimension ? 'auto' : 'none'
                      }}
                    >
                      Add to Cart
                      <span className="inline-flex items-center ml-2">
                        <ShoppingCart className="w-5 h-5" />
                      </span>
                      {config.selectedDimension && (
                        <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                          <span className="text-xs md:text-sm text-primary/80 bg-white/90 px-2 py-1 rounded-lg shadow-md animate-fade-in">
                            Finalize your purchase
                          </span>
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-6 md:py-8 px-2 md:px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { 
                icon: Shield, 
                title: "Premium Quality", 
                description: "AAA+ Grade pinewood with multiple treatment options" 
              },
              { 
                icon: Truck, 
                title: "Pay on Delivery", 
                description: "Only pay when you're satisfied with the product" 
              },
              { 
                icon: MapPin, 
                title: "Bangalore Wide", 
                description: "Delivery available across Bangalore" 
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  delay: index * 0.20, 
                  duration: 0.6,
                  type: "spring"
                }}
                whileHover={{
                  scale: 1.065,
                  rotate: 1.5
                }}
                className="glass p-4 md:p-5 rounded-xl card-animate flex flex-col items-center group cursor-pointer"
              >
                <feature.icon className="w-9 h-9 md:w-11 md:h-11 mb-2 md:mb-3 text-primary group-hover:animate-float group-hover:text-accent transition-all duration-200" />
                <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-1 text-center">{feature.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <TestimonialSection />
      </section>

      {/* Instagram Section */}
      <InstagramSection />

      {/* Contact Section */}
      <section className="py-6 md:py-8 px-2 md:px-4 glass mt-4 md:mt-5" id="contact">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-3 md:mb-4">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-2">brownhues.in</h3>
              <p className="text-sm md:text-base mb-2 md:mb-3">
                Custom, high-quality pinewood pallets delivered to your doorstep in Bangalore.
              </p>
              <p className="text-sm md:text-base mb-2"><strong>Email:</strong> info@brownhues.in</p>
              <p className="text-sm md:text-base mb-2"><strong>Phone:</strong> +91 9876543210</p>
              <p className="text-sm md:text-base"><strong>Address:</strong> Koramangala, Bangalore - 560034</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-4 pb-6 md:pb-8 px-2 text-center">
        <p className="text-sm md:text-base">© 2025 brownhues.in. All rights reserved.</p>
      </footer>

      <main>
      </main>
      <Chatbot />
    </div>
  );
};

export default Index;
