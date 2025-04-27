
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
          className="w-full max-w-2xl mx-auto aspect-video glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Visualize Your {selectedSize} Bed
          </h3>
          {/* Add 3D bed visualization here */}
        </motion.div>
      </div>
    </section>
  );
};

export default SizeVisualizer;
