
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  dimensions: string[];
  price: number;
  onSelect: () => void;
}

const ProductCard = ({ title, dimensions, price, onSelect }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-xl cursor-pointer"
      onClick={onSelect}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-2 mb-4">
        {dimensions.map((dim, index) => (
          <span
            key={index}
            className="block text-sm text-muted-foreground"
          >
            {dim} inches
          </span>
        ))}
      </div>
      <div className="text-2xl font-bold">₹{price}</div>
    </motion.div>
  );
};

export default ProductCard;
