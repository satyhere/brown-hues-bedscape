
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Shield, Star } from "lucide-react";
import Map from "@/components/Map";
import ProductCard from "@/components/ProductCard";
import SizeVisualizer from "@/components/SizeVisualizer";
import TestimonialSection from "@/components/TestimonialSection";
import OrderForm from "@/components/OrderForm";

const Index = () => {
  const [selectedSize, setSelectedSize] = useState("queen");

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen hero-gradient px-4 py-20 md:py-32">
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-button px-8 py-4 rounded-lg inline-block text-lg font-medium"
          >
            Explore Sizes
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your Size
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                onSelect={() => setSelectedSize(product.title.toLowerCase())}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Size Visualizer */}
      <SizeVisualizer selectedSize={selectedSize} />

      {/* Map Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            We Deliver Here
          </h2>
          <div className="h-[500px] rounded-2xl overflow-hidden">
            <Map />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Order Form */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Place Your Order
          </h2>
          <OrderForm />
        </div>
      </section>
    </div>
  );
};

export default Index;
