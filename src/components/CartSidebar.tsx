import { ShoppingCart, X, Plus, Minus, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "./ui/sheet";
import { useState, useEffect } from "react";
import { Separator } from "./ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/bed";
import { useCartContext } from "@/contexts/CartContext";

interface CartSidebarProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const calculateItemPrice = (item: CartItem): number => {
  if (item.customPallets) {
    return item.customPallets.reduce((total, pallet) => {
      // Base price of ₹45 per square inch
      const basePrice = 45;
      const area = Number(pallet.width) * Number(pallet.length);
      const quantity = Number(pallet.quantity);
      return total + (basePrice * area * quantity) / 100;
    }, 0);
  }
  
  return item.price * item.quantity;
};

const getPriceForSize = (size: string): number => {
  switch (size) {
    case "single": return 1900;
    case "double": return 2200;
    case "queen": return 3400;
    case "king": return 3600;
    default: return 2200;
  }
};

// Export the existing CartContext's useCartContext as useCart for backward compatibility
export const useCart = useCartContext;

const CartSidebar = ({ isOpen, onOpenChange }: CartSidebarProps) => {
  const navigate = useNavigate();
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart
  } = useCartContext();
  
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.total;

  const handleQuantityDecrease = (item: CartItem) => {
    if (item.quantity === 1) {
      removeFromCart(item.id, item.size, item.treatment);
    } else {
      updateQuantity(item.id, item.quantity - 1, item.size, item.treatment);
    }
  };

  const handleQuantityIncrease = (item: CartItem) => {
    updateQuantity(item.id, item.quantity + 1, item.size, item.treatment);
  };

  const proceedToCheckout = () => {
    if (cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    navigate("/order", { 
      state: { 
        fromCart: true,
        cartItems: cart.items 
      } 
    });
    
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setLocalIsOpen(false);
    }
  };
  
  const open = isOpen !== undefined ? isOpen : localIsOpen;
  const setOpen = onOpenChange || setLocalIsOpen;
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative glass-button p-2 rounded-full shadow">
          <ShoppingCart className="h-6 w-6 text-primary" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md w-[90vw]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>
        
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <SheetClose asChild>
              <Button className="mt-4">Continue Shopping</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mt-6 max-h-[60vh] overflow-auto pr-1">
              <AnimatePresence>
                {cart.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-2 pb-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">
                          {item.size.charAt(0).toUpperCase() + item.size.slice(1)} Bed Pallet
                        </h4>
                        {item.customPallets ? (
                          <div className="text-sm text-muted-foreground">
                            {item.customPallets.map((pallet, index) => (
                              <div key={index}>
                                {pallet.width}×{pallet.length}" × {pallet.quantity} pc(s)
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {item.dimension} • {item.treatment}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{calculateItemPrice(item).toFixed(0)}</p>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size, item.treatment)}
                          className="text-xs text-destructive hover:underline mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center border rounded-md w-max">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleQuantityDecrease(item)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleQuantityIncrease(item)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Separator />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-auto pt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-4">
                <Button 
                  onClick={proceedToCheckout}
                  className="w-full"
                >
                  Checkout
                </Button>
                <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>Free delivery in Bangalore</span>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
