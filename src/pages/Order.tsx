
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OrderForm from "@/components/OrderForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import { useCart } from "@/components/CartSidebar";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ShiprocketOrderExample from "@/components/ShiprocketOrderExample";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState("order");
  
  const fromCart = location.state?.fromCart || false;
  const cartItems = location.state?.cartItems || [];
  
  const selectedSize = location.state?.selectedSize || "";
  const selectedDimension = location.state?.selectedDimension || "";
  const selectedTreatment = location.state?.selectedTreatment || "";

  // If there's no state, we'll use the items currently in the cart
  const items = cartItems.length > 0 ? cartItems : cart;
  
  useEffect(() => {
    // Check if the user came directly to this page without any data
    if (!fromCart && !selectedSize && items.length === 0) {
      navigate('/', { replace: true });
    }
  }, [fromCart, selectedSize, items.length, navigate]);
  
  const handleOrderComplete = () => {
    // Clear the cart after successful order
    if (fromCart) {
      clearCart();
    }
    
    // Redirect to home page
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen w-full py-8 px-4">
      <Header />
      
      <div className="container mx-auto max-w-4xl pt-20">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to {fromCart ? 'Cart' : 'Home'}
        </Button>

        <Tabs 
          defaultValue="order" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
            <TabsTrigger value="order">Place Order</TabsTrigger>
            <TabsTrigger value="shiprocket">Shiprocket Test</TabsTrigger>
          </TabsList>

          <TabsContent value="order">
            <div
            >
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Order</CardTitle>
                  <CardDescription>
                    Please fill in your details to complete your purchase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
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
                  </div>
                  
                  <OrderForm 
                    initialSize={selectedSize} 
                    initialDimension={selectedDimension} 
                    initialTreatment={selectedTreatment}
                    cartItems={items}
                    onOrderComplete={handleOrderComplete}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shiprocket">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Shiprocket Integration Test</CardTitle>
                  <CardDescription>
                    Test the Shiprocket API integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ShiprocketOrderExample />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
