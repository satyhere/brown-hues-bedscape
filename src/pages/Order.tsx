
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import OrderForm from "@/components/OrderForm";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const selectedSize = location.state?.selectedSize || "";
  const selectedDimension = location.state?.selectedDimension || "";
  const selectedTreatment = location.state?.selectedTreatment || "";

  return (
    <div className="min-h-screen w-full py-8 px-4">
      <Header />
      
      <div className="container mx-auto max-w-2xl pt-20">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Configurator
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
          <p className="text-muted-foreground mb-1">
            Size: {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}
          </p>
          {selectedDimension && (
            <p className="text-muted-foreground mb-1">
              Dimension: {selectedDimension} inches
            </p>
          )}
          {selectedTreatment && (
            <p className="text-muted-foreground">
              Treatment: {selectedTreatment.charAt(0).toUpperCase() + selectedTreatment.slice(1)}
            </p>
          )}
        </motion.div>

        <OrderForm 
          initialSize={selectedSize} 
          initialDimension={selectedDimension} 
          initialTreatment={selectedTreatment}
        />
      </div>
    </div>
  );
};

export default Order;
