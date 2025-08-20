import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PlusCircle, Trash } from "lucide-react";

interface SizeVisualizerProps {
  selectedSize: string;
  currentStep?: string;
  selectedDimension?: string;
}

interface CustomPalletSize {
  width: string;
  length: string;
  quantity: string;
}

const SizeVisualizer = ({ selectedSize, currentStep, selectedDimension }: SizeVisualizerProps) => {
  
  const [customPallets, setCustomPallets] = useState<CustomPalletSize[]>([
    { width: "36", length: "36", quantity: "1" }
  ]);
  
  const addCustomPallet = () => {
    setCustomPallets([...customPallets, { width: "36", length: "36", quantity: "1" }]);
  };
  
  const removeCustomPallet = (index: number) => {
    const newPallets = [...customPallets];
    newPallets.splice(index, 1);
    setCustomPallets(newPallets);
  };
  
  const updatePallet = (index: number, field: keyof CustomPalletSize, value: string) => {
    const newPallets = [...customPallets];
    newPallets[index][field] = value;
    setCustomPallets(newPallets);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="py-4 md:py-12 px-4 flex items-center justify-center"
      >
        <div className="container mx-auto text-center">
          <div className="w-full max-w-2xl mx-auto glass rounded-2xl p-6 md:p-8 relative overflow-visible">
            <motion.h3 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-semibold mb-6"
            >
              {selectedSize === "custom" ? "Customize Your Pallets" : `Visualize Your ${selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)} Bed`}
            </motion.h3>
            
            {selectedSize === "custom" ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {customPallets.map((pallet, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex flex-col gap-2 w-full sm:grid sm:grid-cols-10 sm:gap-2 sm:items-center"
                  >
                    <div className="sm:col-span-3 w-full">
                      <Label htmlFor={`width-${index}`} className="text-xs text-left block mb-1">Width (inches)</Label>
                      <Input 
                        id={`width-${index}`}
                        type="number"
                        min="12" 
                        max="96"
                        value={pallet.width} 
                        onChange={(e) => updatePallet(index, 'width', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="sm:col-span-3 w-full">
                      <Label htmlFor={`length-${index}`} className="text-xs text-left block mb-1">Length (inches)</Label>
                      <Input 
                        id={`length-${index}`}
                        type="number"
                        min="12"
                        max="96" 
                        value={pallet.length} 
                        onChange={(e) => updatePallet(index, 'length', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="sm:col-span-3 w-full">
                      <Label htmlFor={`quantity-${index}`} className="text-xs text-left block mb-1">Quantity</Label>
                      <Input 
                        id={`quantity-${index}`}
                        type="number"
                        min="1" 
                        value={pallet.quantity} 
                        onChange={(e) => updatePallet(index, 'quantity', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="w-full flex justify-end sm:col-span-1 pt-2 sm:pt-6">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeCustomPallet(index)}
                        disabled={customPallets.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addCustomPallet}
                    className="mt-4"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Pallet
                  </Button>
                </motion.div>
                

              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-full flex flex-col items-center justify-center"
                >
                  <div className="w-full max-w-[300px] mx-auto">
                    <img
                      src="/lovable-uploads/4cf8207a-4832-4929-8a39-4e78ee9bb833.png"
                      alt="Bed Pallet"
                      className="w-full h-auto object-contain"
                      style={{ maxHeight: 'min(60vh, 400px)' }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {selectedDimension && (
                      <div className="glass px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap">
                        {selectedDimension.replace('x', '×').replace(/\s/g, '')}
                      </div>
                    )}
                    {selectedSize && ['single', 'double', 'queen', 'king'].includes(selectedSize) && (
                      <div className="glass px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap bg-primary/10 text-primary">
                        {['single', 'double'].includes(selectedSize) 
                          ? '2x Bed pallets'
                          : '4x Bed pallets'}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default SizeVisualizer;
