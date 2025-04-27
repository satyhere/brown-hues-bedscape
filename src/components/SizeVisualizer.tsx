
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SizeVisualizerProps {
  selectedSize: string;
}

const SizeVisualizer = ({ selectedSize }: SizeVisualizerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={ref} className="py-20 px-4 min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <motion.div
          style={{ rotate, scale }}
          className="w-full max-w-2xl mx-auto aspect-video glass rounded-2xl p-8 relative overflow-hidden"
        >
          <h3 className="text-2xl font-semibold mb-6">
            Visualize Your {selectedSize} Bed
          </h3>
          
          {selectedSize === "double" ? (
            <div className="relative w-full h-[300px] mt-4">
              <img
                src="/lovable-uploads/a6395e88-15da-461e-a21b-13e6bccbaade.png"
                alt="Double Bed Pallet"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-sm">
                72" × 48"
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">
              Select "Double Bed" to view the product image
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SizeVisualizer;
