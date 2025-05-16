import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Map from "./Map";
import { MapPin } from "lucide-react";
import { createGuestOrderWithProfile } from "../integrations/supabase/services";
import { CartItem } from "../types/bed";
import { useAuth } from "../contexts/AuthContext";

interface OrderFormProps {
  initialSize?: string;
  initialDimension?: string;
  initialTreatment?: string;
  cartItems?: CartItem[];
  onOrderComplete?: () => void;
}

const OrderForm = ({ 
  initialSize = "", 
  initialDimension = "", 
  initialTreatment = "natural",
  cartItems = [],
  onOrderComplete
}: OrderFormProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    size: initialSize,
    dimension: initialDimension,
    treatment: initialTreatment,
    quantity: "1",
    notes: "",
  });

  const [useMap, setUseMap] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ 
      ...prev, 
      size: initialSize,
      dimension: initialDimension,
      treatment: initialTreatment
    }));
  }, [initialSize, initialDimension, initialTreatment]);

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleAddressSelected = (address: string) => {
    setFormData(prev => ({
      ...prev,
      address
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Calculate total amount
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);

      // Create the order
      const order = {
        customer_name: formData.name,
        customer_email: user?.email || formData.email,
        customer_phone: formData.phone,
        delivery_address: formData.address,
        notes: formData.notes,
        total_amount: totalAmount,
        status: 'pending' as const
      };

      // Create order items
      const items = cartItems.map(item => ({
        size: item.size,
        dimension: item.dimension,
        treatment: item.treatment,
        price: item.price,
        quantity: item.quantity,
        custom_pallets: item.customPallets ? JSON.stringify(item.customPallets) : null
      }));

      // Submit the order with profile creation
      await createGuestOrderWithProfile(order, items);
      
      toast.success("Order placed successfully! We'll contact you soon for delivery.");
      
      // Reset the form
      setFormData({
        name: "",
        phone: "",
        email: user?.email || "",
        address: "",
        size: initialSize,
        dimension: initialDimension,
        treatment: initialTreatment,
        quantity: "1",
        notes: "",
      });
      
      // Call the callback if provided
      if (onOrderComplete) {
        onOrderComplete();
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="glass p-8 rounded-xl space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="glass"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="glass"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="glass"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="address">Delivery Address</Label>
          <button 
            type="button"
            className="text-xs text-primary hover:underline flex items-center"
            onClick={() => setUseMap(!useMap)}
          >
            <MapPin className="h-3 w-3 mr-1" />
            {useMap ? "Hide map" : "Use map"}
          </button>
        </div>
        
        {useMap ? (
          <Map onAddressSelected={handleAddressSelected} />
        ) : (
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="glass"
            required
          />
        )}
      </div>

      {!cartItems || cartItems.length === 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="size">Bed Size</Label>
              <Input
                id="size"
                value={formData.size}
                readOnly
                className="glass bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimension">Dimension</Label>
              <Input
                id="dimension"
                value={formData.dimension}
                readOnly
                className="glass bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="glass"
              required
            />
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <Label>Order Summary</Label>
          <div className="rounded-lg bg-muted/30 p-4">
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <span className="font-medium">{item.size.charAt(0).toUpperCase() + item.size.slice(1)} Bed Pallet</span>
                    <span className="text-muted-foreground ml-2">
                      {item.customPallets 
                        ? `${item.customPallets.length} custom size(s)` 
                        : `${item.dimension} • ${item.treatment}`}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">₹{item.price}</span>
                    <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="glass"
        />
      </div>

      <div className="pt-4">
        <p className="text-sm text-muted-foreground mb-4 flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          Pay on delivery - No advance payment required
        </p>
        <Button
          type="submit"
          className="w-full glass-button"
        >
          Place Order
        </Button>
      </div>
    </motion.form>
  );
};

export default OrderForm;
