import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

type OrderData = {
  order: {
    id: string;
    customer_name: string;
    created_at: string;
    total_amount: number;
    status: string;
  };
  items: Array<{
    size: string;
    dimension: string;
    treatment: string;
    quantity: number;
    price: number;
  }>;
};

export function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData as OrderData | undefined;

  useEffect(() => {
    // If there's no order data, redirect to home
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null; // Or a loading spinner
  }

  const { order, items } = orderData;
  const orderDate = new Date(order.created_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order, {order.customer_name}! We've received your order and will process it shortly, deliver it to your doorsteps within 3-5 days.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
              <p className="text-sm text-gray-600">Order #: {order.id}</p>
              <p className="text-sm text-gray-600">Date: {orderDate}</p>
              <p className="text-sm text-gray-600">Status: 
                <span className="ml-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {order.status}
                </span>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Total</h3>
              <p className="text-2xl font-bold text-gray-900">
                ₹{order.total_amount.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Shipping: ₹300 - ₹600 (Porter 3-Wheeler Van)
              </p>
              <p className="text-xs text-gray-500 mt-1">Final charges will be confirmed via WhatsApp</p>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Items Ordered</h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.size.charAt(0).toUpperCase() + item.size.slice(1)} Bed
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.dimension} • {item.treatment}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">
                      {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Shipping Information */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                    <p className="text-xs text-gray-500">Porter 3-Wheeler Van (Actuals)</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    To be confirmed via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
            className="w-full sm:w-auto"
          >
            Continue Shopping
          </Button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            For any order-related queries, please email us at:
          </p>
          <div className="text-center">
            <a 
              href="mailto:contact@brownhues.com" 
              className="text-sm font-medium text-primary hover:underline"
            >
              contact@brownhues.in
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
