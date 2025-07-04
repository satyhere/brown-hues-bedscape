import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { GooglePlacesAutocomplete } from "./GooglePlacesAutocomplete";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    flatHouseNumber: "",
    floor: "",
    size: initialSize,
    dimension: initialDimension,
    treatment: initialTreatment,
    quantity: "1",
    notes: "",
  });

  // Shipping is handled by Porter based on actuals
  const shippingCost = 0; // Will be calculated by Porter based on actuals

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

  // Handle address selection
  const handleAddressSelected = useCallback((address: string) => {
    setFormData(prev => ({
      ...prev,
      address
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Calculate total amount including shipping
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0) + (shippingCost || 0);

      // Create the order
      const order = {
        customer_name: formData.name,
        customer_email: user?.email || formData.email,
        customer_phone: formData.phone,
        delivery_address: [
          formData.flatHouseNumber,
          formData.floor,
          formData.address
        ].filter(Boolean).join(', '),
        pincode: formData.pincode || '',
        notes: formData.notes,
        total_amount: totalAmount,
        status: 'pending' as const,
        created_at: new Date().toISOString()
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
      const { order: createdOrder } = await createGuestOrderWithProfile(order, items);
      
      // Clear the cart
      if (onOrderComplete) {
        onOrderComplete();
      }
      
      // Navigate to confirmation page with order data
      navigate('/order/confirmation', {
        state: {
          orderData: {
            order: createdOrder,
            items: cartItems.map(item => ({
              size: item.size,
              dimension: item.dimension,
              treatment: item.treatment,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error("Failed to place order. Please try again.");
    }
  };



  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-xl space-y-6 relative"
        onSubmit={handleSubmit}
      >
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="glass"
          required
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="glass"
          required
        />
      </div>

      {/* Email */}
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

      {/* Flat/House Number (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="flatHouseNumber">Flat/House Number (Optional)</Label>
        <Input
          id="flatHouseNumber"
          value={formData.flatHouseNumber}
          onChange={(e) => setFormData({ ...formData, flatHouseNumber: e.target.value })}
          className="glass"
          placeholder="e.g., 101, A Wing"
        />
      </div>

      {/* Floor (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="floor">Floor (Optional)</Label>
        <Input
          id="floor"
          value={formData.floor}
          onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
          className="glass"
          placeholder="e.g., 2nd Floor, Wing B"
        />
      </div>

      {/* Delivery Address */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="address">Delivery Address *</Label>
          <button
            type="button"
            className="text-xs text-primary hover:underline flex items-center"
            onClick={async () => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                  const { latitude, longitude } = position.coords;
                  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                  const data = await res.json();
                  setFormData(prev => ({
                    ...prev,
                    address: data.display_name || prev.address
                  }));
                }, () => {
                  toast.error('Unable to detect location.');
                });
              } else {
                toast.error('Geolocation is not supported.');
              }
            }}
          >
            <MapPin className="h-3 w-3 mr-1" />
            Detect Location
          </button>
        </div>
        <GooglePlacesAutocomplete
          value={formData.address}
          onChange={(val, pincode) => {
            setFormData(prev => ({
              ...prev,
              address: val,
              // Only update pincode if we got a valid one from the address
              ...(pincode ? { pincode } : {})
            }));
          }}
          placeholder="Start typing your address..."
          className="glass w-full px-3 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Pincode */}
      <div className="space-y-2">
        <Label htmlFor="pincode">Pin Code *</Label>
        <Input
          id="pincode"
          maxLength={6}
          pattern="[0-9]{6}"
          value={formData.pincode || ""}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
            setFormData(prev => ({ ...prev, pincode: value }));
          }}
          className="glass"
          required
        />
        <p className="text-sm text-muted-foreground mt-1">
          Shipping charges will be calculated by Porter based on actuals
        </p>
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
              <div className="flex justify-between text-sm pt-2 border-t border-muted mt-2">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  Based on Porter Actuals
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-muted mt-2">
                <span>Total</span>
                <span>
                  ₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + (shippingCost || 0)}
                </span>
              </div>
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
        <p className="text-sm text-muted-foreground mb-4">
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
    </>
  );
};

export default OrderForm;
