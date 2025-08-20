import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { OrderConfirmation } from "./components/OrderConfirmation";
import TermsAndConditions from "./pages/terms";
import PrivacyPolicy from "./pages/privacy";
import RefundPolicy from "./pages/refund";
import ShippingPolicy from "./pages/shipping";
import ReturnPolicy from "./pages/returns";
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import BlobBackground from "./components/BlobBackground";
import { useClarity } from "./hooks/useClarity";

const App: React.FC = () => {
  const [queryClient] = useState(() => new QueryClient());
  
  // Initialize Microsoft Clarity
  useClarity('s73b8z0nq5');

  return (
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BlobBackground />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/order" element={<Order />} />
                <Route path="/order/confirmation" element={<OrderConfirmation />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/refund" element={<RefundPolicy />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/returns" element={<ReturnPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
