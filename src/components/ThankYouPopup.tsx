import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ThankYouPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThankYouPopup = ({ isOpen, onClose }: ThankYouPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Order Confirmed!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for your purchase. We'll be in touch soon with delivery updates.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ThankYouPopup;
