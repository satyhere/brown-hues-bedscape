
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface OrderFormProps {
  initialSize?: string;
}

const OrderForm = ({ initialSize = "" }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    size: initialSize,
    quantity: "1",
    notes: "",
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, size: initialSize }));
  }, [initialSize]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Order placed successfully! We'll contact you soon.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      size: initialSize,
      quantity: "1",
      notes: "",
    });
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
        <Label htmlFor="address">Delivery Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="glass"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="size">Bed Size</Label>
          <Input
            id="size"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="glass"
            required
          />
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="glass"
        />
      </div>

      <Button
        type="submit"
        className="w-full glass-button"
      >
        Place Order
      </Button>
    </motion.form>
  );
};

export default OrderForm;
