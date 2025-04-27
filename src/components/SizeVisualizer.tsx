
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SizeVisualizerProps {
  selectedSize: string;
}

// 3D Bed Model component
const BedModel = ({ size }: { size: string }) => {
  // Since we don't have an actual 3D model, we'll create a simple box representation
  // In a real application, you would import an actual GLTF model
  
  // Define size multipliers based on bed size
  const sizeMultipliers = {
    single: { width: 1, length: 2 },
    double: { width: 1.35, length: 2 },
    queen: { width: 1.5, length: 2 },
    king: { width: 1.8, length: 2 },
  };
  
  const sizeKey = (size || "queen") as keyof typeof sizeMultipliers;
  const { width, length } = sizeMultipliers[sizeKey];
  
  return (
    <group position={[0, -1.2, 0]}>
      {/* Bed base/pallet */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[width, 0.2, length]} />
        <meshStandardMaterial 
          color="#d2b48c" 
          roughness={0.8} 
          metalness={0.1}
          map={null}
        />
      </mesh>
      
      {/* Slats representing pallet design */}
      {Array(6).fill(0).map((_, i) => (
        <mesh 
          key={i} 
          position={[0, 0.15, (i-2.5) * 0.35]} 
          receiveShadow 
          castShadow
        >
          <boxGeometry args={[width-0.1, 0.06, 0.15]} />
          <meshStandardMaterial 
            color="#c4a484" 
            roughness={0.7} 
            metalness={0.1}
          />
        </mesh>
      ))}
      
      {/* Mattress */}
      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <boxGeometry args={[width-0.1, 0.25, length-0.1]} />
        <meshStandardMaterial 
          color="#f5f5f5" 
          roughness={0.5}
        />
      </mesh>
    </group>
  );
};

const SizeVisualizer = ({ selectedSize }: SizeVisualizerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  // Add a state to track mouse position for subtle hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };
  
  // Transform values based on mouse position for subtle 3D effect
  const rotateX = useTransform(() => -mousePosition.y * 10);
  const rotateY = useTransform(() => mousePosition.x * 10);

  return (
    <section 
      ref={ref} 
      className="py-14 px-4 min-h-screen flex items-center justify-center overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e2d1c3]/20 via-background to-background/60 pointer-events-none" />
      
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          style={{ 
            scale,
            rotateY: rotateY,
            rotateX: rotateX,
          }}
          className="w-full max-w-3xl mx-auto aspect-video glass rounded-2xl p-8 border-t border-l border-white/20 shadow-xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none" />
          
          <h3 className="text-2xl font-semibold mb-6 relative">
            Visualize Your {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)} Bed
          </h3>
          
          {/* 3D Bed Visualization */}
          <div className="w-full h-64 sm:h-80 relative rounded-xl overflow-hidden border border-white/10">
            <Canvas shadows dpr={[1, 2]} className="w-full h-full">
              <color attach="background" args={['#f8f5f1']} />
              <fog attach="fog" args={['#f8f5f1', 8, 25]} />
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={45} />
              <motion.group
                rotation={[0, rotate.get() * (Math.PI / 180), 0]}
              >
                <BedModel size={selectedSize} />
              </motion.group>
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2.2}
              />
            </Canvas>
          </div>
          
          {/* Caption */}
          <p className="text-sm text-muted-foreground mt-4">
            * Scroll to rotate the bed model. Drag to adjust the view angle.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SizeVisualizer;
