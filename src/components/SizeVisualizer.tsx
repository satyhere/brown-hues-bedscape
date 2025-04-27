import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PlusCircle, Trash } from "lucide-react";

interface SizeVisualizerProps {
  selectedSize: string;
}

interface CustomPalletSize {
  width: string;
  length: string;
  quantity: string;
}

const SizeVisualizer = ({ selectedSize }: SizeVisualizerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
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
    <section ref={ref} className="py-20 px-4 min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <motion.div
          style={{ scale }}
          className="w-full max-w-2xl mx-auto aspect-video glass rounded-2xl p-8 relative overflow-hidden"
        >
          <h3 className="text-2xl font-semibold mb-6">
            {selectedSize === "custom" ? "Customize Your Pallets" : `Visualize Your ${selectedSize} Bed`}
          </h3>
          
          {selectedSize === "double" ? (
            <div className="relative w-full h-[300px] mt-4">
              <img
                src="/lovable-uploads/4cf8207a-4832-4929-8a39-4e78ee9bb833.png"
                alt="Double Bed Pallet"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-sm">
                72" × 48"
              </div>
            </div>
          ) : selectedSize === "custom" ? (
            <div className="space-y-4">
              {customPallets.map((pallet, index) => (
                <div key={index} className="grid grid-cols-10 gap-2 items-center">
                  <div className="col-span-3">
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
                  <div className="col-span-3">
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
                  <div className="col-span-3">
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
                  <div className="col-span-1 pt-6">
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
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addCustomPallet}
                className="mt-4"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Another Pallet
              </Button>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Custom sizes available: 36×36", 36×48", 30×36", and more. 
                  Add multiple pallets with different dimensions as needed.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">
              Select "Double Bed" to view the product image or "Custom" for multiple pallets
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SizeVisualizer;
