import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Shield, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import TestimonialSection from "@/components/TestimonialSection";
import Header from "@/components/Header";

// Types
type Size = 'single' | 'double' | 'queen' | 'king';
type Treatment = 'natural' | 'polished' | 'stained';
interface ProductSize {
  title: string;
  size: Size;
  price: number;
  dimensions: string[];
}
const PRODUCT_SIZES: ProductSize[] = [{
  title: "Single Bed",
  size: "single",
  price: 1900,
  dimensions: ["72x36"]
}, {
  title: "Double Bed",
  size: "double",
  price: 2200,
  dimensions: ["72x48"]
}, {
  title: "Queen Size",
  size: "queen",
  price: 3400,
  dimensions: ["60x72", "60x75", "60x78"]
}, {
  title: "King Size",
  size: "king",
  price: 3600,
  dimensions: ["72x72", "72x75", "72x78"]
}];
const Index = () => {
  const [currentStep, setCurrentStep] = useState<"size" | "dimension" | "treatment">("size");
  const [selectedSize, setSelectedSize] = useState<Size | "">("");
  const [selectedDimension, setSelectedDimension] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | "">("");
  const navigate = useNavigate();

  // Helper functions
  const getProductData = (size: Size | "") => PRODUCT_SIZES.find(ps => ps.size === size);
  const handleNext = () => {
    if (currentStep === "size" && selectedSize) {
      setCurrentStep("dimension");
    } else if (currentStep === "dimension" && selectedDimension) {
      setCurrentStep("treatment");
    } else if (currentStep === "treatment" && selectedTreatment) {
      toast.success("Configuration complete!");
      navigate("/order", {
        state: {
          selectedSize,
          selectedDimension,
          selectedTreatment
        }
      });
    }
  };

  // 3D Cover (static image for now, can be swapped for a 3D viewer)
  const Cover = () => <div className="w-full flex justify-center items-center mb-0 mt-8 animate-fade-in">
      <img src="/bed-3d-render.png" alt="3D Bed Pallet Design" className="rounded-2xl drop-shadow-xl max-w-[350px] md:max-w-[420px] sm:max-h-[300px] object-contain border border-accent" style={{
      background: "linear-gradient(135deg,#fff,#eee 55%,#e2d1c3 100%)"
    }} />
    </div>;
  return <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] hero-gradient px-2 py-3 md:py-9 pt-14 md:pt-20" style={{
      paddingBottom: 0
    }}>
        <motion.div initial={{
        opacity: 0,
        y: 18
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.67
      }} className="container mx-auto text-center">
          <span className="glass px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block tracking-wide shadow-sm">
            Premium Bed Pallets in Bangalore
          </span>
          <h1 className="font-bhues text-[2.6rem] sm:text-5xl font-bold mb-2">Design Your Bed</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3">
            Custom, high-quality Pinewood Pallets delivered right to your doorstep.
          </p>
          <Cover />
          {/* Step Navigation */}
          <div className="flex justify-center items-center gap-2 mb-0 mt-3">
            {[{
            key: "size",
            label: "Select Size"
          }, {
            key: "dimension",
            label: "Select Dimension"
          }, {
            key: "treatment",
            label: "Select Treatment"
          }].map((step, i) => <motion.div key={step.key} className={`flex items-center ${i !== 0 ? "ml-4" : ""}`} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: i * 0.17
          }}>
                <div className={"relative flex items-center justify-center w-9 h-9 rounded-full border-2 " + (currentStep === step.key ? "bg-primary text-secondary border-primary scale-110 shadow-lg" : "bg-secondary text-primary border-secondary shadow-none") + (i !== 2 ? " mr-2" : "")}>
                  <span className="text-lg font-bold">{i + 1}</span>
                </div>
                {i !== 2 && <div className="absolute left-full mx-1 w-6 h-0.5 bg-primary/20" />}
                <span className={"ml-2 text-xs font-semibold uppercase tracking-wide" + (currentStep === step.key ? " text-primary" : " text-muted-foreground")}>
                  {step.label}
                </span>
              </motion.div>)}
          </div>
        </motion.div>
      </section>

      {/* Configurator (merged Section) */}
      <section className="py-2 px-1 md:px-4" id="configurator">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{
          opacity: 0,
          y: 13
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-4">
            {/* ======= Select Size (with prices) ======= */}
            {currentStep === "size" && <>
                <h2 className="text-2xl font-bold text-center mb-1">Select Size</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-1">
                  {PRODUCT_SIZES.map(sizeObj => <motion.div key={sizeObj.size} whileHover={{
                scale: 1.065,
                boxShadow: "0 6px 32px 0 rgba(180,150,125,0.15)"
              }} whileTap={{
                scale: 0.97
              }} className={`glass p-4 md:p-5 rounded-xl card-animate cursor-pointer flex flex-col items-center justify-center hover:shadow-accent transition-all duration-200 ${selectedSize === sizeObj.size ? "ring-2 ring-primary border-primary scale-105 shadow-xl" : ""}`} onClick={() => {
                setSelectedSize(sizeObj.size);
                setSelectedDimension("");
                setSelectedTreatment("");
              }}>
                      <span className="block text-lg font-bold mb-1 capitalize">{sizeObj.title}</span>
                      <span className="text-xs mt-0 text-muted-foreground mb-2">
                        {sizeObj.dimensions.join(", ")} inch
                      </span>
                      <span className="block text-primary text-2xl font-semibold">₹{sizeObj.price}</span>
                      {selectedSize === sizeObj.size && <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} className="mt-2 text-xs text-primary font-medium animate-fade-in">
                          Selected
                        </motion.div>}
                    </motion.div>)}
                </div>
                <div className="mt-1 flex justify-end">
                  <Button className="h-9 px-3 py-2" onClick={handleNext} disabled={!selectedSize}>
                    Next
                  </Button>
                </div>
              </>}

            {/* ======= Select Dimension ======= */}
            {currentStep === "dimension" && selectedSize && <>
                <h2 className="text-2xl font-bold text-center mb-1">Select Dimension</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-1">
                  {(getProductData(selectedSize)?.dimensions ?? []).map(dimension => <motion.div key={dimension} whileHover={{
                scale: 1.07,
                boxShadow: "0 8px 28px 0 rgba(180,150,125,0.10)"
              }} whileTap={{
                scale: 0.92
              }} className={`glass p-4 md:p-4 rounded-xl card-animate cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${selectedDimension === dimension ? "ring-2 ring-primary border-primary scale-105 shadow-xl" : ""}`} onClick={() => setSelectedDimension(dimension)}>
                      <span className="block text-lg font-semibold mb-1">{dimension} inch</span>
                      {selectedDimension === dimension && <CheckCircle2 className="w-7 h-7 text-primary mt-2 animate-fade-in" />}
                    </motion.div>)}
                </div>
                <div className="mt-1 flex justify-between">
                  <Button variant="outline" className="h-9 px-4 py-2" onClick={() => setCurrentStep("size")}>
                    Back
                  </Button>
                  <Button className="h-9 px-3 py-2" onClick={handleNext} disabled={!selectedDimension}>
                    Next
                  </Button>
                </div>
              </>}

            {/* ======== Select Treatment ======= */}
            {currentStep === "treatment" && <>
                <h2 className="text-2xl font-bold text-center mb-1">Select Treatment</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-1">
                  {[{
                id: "natural",
                name: "Natural Finish",
                description: "Classic wood texture"
              }, {
                id: "polished",
                name: "Polished",
                description: "Smooth glossy finish"
              }, {
                id: "stained",
                name: "Stained",
                description: "Rich dark color"
              }].map(treatment => <motion.div key={treatment.id} whileHover={{
                scale: 1.07,
                boxShadow: "0 8px 28px 0 rgba(180,150,125,0.08)"
              }} whileTap={{
                scale: 0.95
              }} className={`glass p-5 rounded-xl card-animate cursor-pointer transition-all duration-200 flex flex-col items-center ${selectedTreatment === treatment.id ? "ring-2 ring-primary border-primary scale-105 shadow-xl" : ""}`} onClick={() => setSelectedTreatment(treatment.id as Treatment)}>
                      <span className="block text-lg font-bold mb-1">{treatment.name}</span>
                      <span className="text-xs text-muted-foreground mb-2">
                        {treatment.description}
                      </span>
                      {selectedTreatment === treatment.id && <CheckCircle2 className="w-7 h-7 text-primary mt-2 animate-fade-in" />}
                    </motion.div>)}
                </div>
                <div className="mt-1 flex justify-between">
                  <Button variant="outline" className="h-9 px-4 py-2" onClick={() => setCurrentStep("dimension")}>
                    Back
                  </Button>
                  <Button className="h-9 px-3 py-2" onClick={handleNext} disabled={!selectedTreatment}>
                    Complete
                  </Button>
                </div>
              </>}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-4 px-2 md:px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[{
            icon: Shield,
            title: "Premium Quality",
            description: "AAA+ Grade pinewood with multiple treatment options"
          }, {
            icon: Truck,
            title: "Pay on Delivery",
            description: "Only pay when you're satisfied with the product"
          }, {
            icon: MapPin,
            title: "Bangalore Wide",
            description: "Delivery available across Bangalore"
          }].map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 14
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.20,
            duration: 0.6,
            type: "spring"
          }} whileHover={{
            scale: 1.065,
            rotate: 1.5
          }} className="glass p-5 rounded-xl card-animate flex flex-col items-center group cursor-pointer">
                <feature.icon className="w-11 h-11 mb-3 text-primary group-hover:animate-float group-hover:text-accent transition-all duration-200" />
                <h3 className="text-lg md:text-xl font-semibold mb-1 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <TestimonialSection />
      </section>

      {/* Contact Section */}
      <section className="py-6 px-2 glass mt-5" id="contact">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-3">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">brownhues.co</h3>
              <p className="mb-3">
                Custom, high-quality pinewood pallets delivered to your doorstep in Bangalore.
              </p>
              <p className="mb-2"><strong>Email:</strong> info@brownhues.co</p>
              <p className="mb-2"><strong>Phone:</strong> +91 9876543210</p>
              <p><strong>Address:</strong> Koramangala, Bangalore - 560034</p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3">Send Us a Message</h3>
              <form className="space-y-3">
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
      <footer className="pt-4 pb-8 px-2 text-center">
        <p>© 2025 brownhues.co. All rights reserved.</p>
      </footer>
    </div>;
};
export default Index;