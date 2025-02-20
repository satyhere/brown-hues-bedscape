
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  dimensions: string[];
  price: number;
  selected?: boolean;
  onSelect: () => void;
}

const ProductCard = ({ title, dimensions, price, selected, onSelect }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`glass p-6 rounded-xl cursor-pointer transition-all duration-300 ${
        selected ? "ring-2 ring-primary shadow-lg scale-105" : ""
      }`}
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
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-primary font-medium"
        >
          Selected - Click to order
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductCard;
