
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

export interface CartItem {
  id: string;
  size: string;
  dimension: string;
  treatment: string;
  price: number;
  quantity: number;
  customPallets?: {
    width: string;
    length: string;
    quantity: string;
  }[];
}

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

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);
  
  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (item: Omit<CartItem, "id">) => {
    setCart(prev => {
      const newItem = {
        ...item,
        id: crypto.randomUUID(),
        price: item.price || getPriceForSize(item.size)
      };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
    toast.success("Item added to cart!");
  };
  
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast("Item removed from cart");
  };
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cart.reduce((sum, item) => {
    return sum + calculateItemPrice(item);
  }, 0);
  
  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen
  };
};

const CartSidebar = ({ isOpen, onOpenChange }: CartSidebarProps) => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    subtotal, 
    clearCart,
    isCartOpen,
    setIsCartOpen
  } = useCart();
  
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    navigate("/order", { 
      state: { 
        fromCart: true,
        cartItems: cart 
      } 
    });
    
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsCartOpen(false);
    }
  };
  
  const open = isOpen !== undefined ? isOpen : isCartOpen;
  const setOpen = onOpenChange || setIsCartOpen;
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md w-[90vw]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>
        
        {cart.length === 0 ? (
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
                {cart.map((item) => (
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
                          onClick={() => removeFromCart(item.id)}
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
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Separator />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">₹{subtotal.toFixed(0)}</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button onClick={proceedToCheckout} className="w-full">
                  Checkout
                </Button>
                <Button variant="outline" onClick={clearCart} className="w-full">
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
