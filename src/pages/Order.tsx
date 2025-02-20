
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import OrderForm from "@/components/OrderForm";
import { ChevronLeft } from "lucide-react";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSize = location.state?.selectedSize || "";

  return (
    <div className="min-h-screen w-full py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Sizes
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
          <p className="text-muted-foreground">
            You selected: {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)} Size
          </p>
        </motion.div>

        <OrderForm initialSize={selectedSize} />
      </div>
    </div>
  );
};

export default Order;
