import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BlobBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f4f1] via-[#e2d1c3] to-[#c8a992] opacity-40"></div>
      
      {/* Animated blobs */}
      <div className="relative h-full w-full">
        <motion.div 
          className="absolute rounded-[100%] bg-gradient-radial from-[#d4b79e] to-[#96745e] opacity-20 blur-3xl"
          style={{ width: '40%', height: '40%', top: '10%', left: '15%' }}
          animate={{
            x: [0, 30, -10, 20, 0],
            y: [0, -40, 20, -20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
            rotate: [0, 10, -5, 7, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        
        <motion.div 
          className="absolute rounded-[100%] bg-gradient-radial from-[#decabf] to-[#b89585] opacity-30 blur-3xl"
          style={{ width: '35%', height: '35%', bottom: '15%', right: '12%' }}
          animate={{
            x: [0, -40, 20, -30, 0],
            y: [0, 30, -20, 10, 0],
            scale: [1, 0.9, 1.1, 0.95, 1],
            rotate: [0, -10, 5, -8, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        
        <motion.div 
          className="absolute rounded-[100%] bg-gradient-radial from-[#e8ddd6] to-[#c2ab9c] opacity-25 blur-3xl"
          style={{ width: '30%', height: '30%', top: '60%', left: '25%' }}
          animate={{
            x: [0, 25, -15, 10, 0],
            y: [0, -20, 30, -15, 0],
            scale: [1, 1.05, 0.95, 1.1, 1],
            rotate: [0, 5, -10, 8, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        
        <motion.div 
          className="absolute rounded-[100%] bg-gradient-radial from-[#a2816c] to-[#75574a] opacity-15 blur-3xl"
          style={{ width: '25%', height: '25%', top: '30%', right: '30%' }}
          animate={{
            x: [0, -15, 25, -20, 0],
            y: [0, 25, -15, 20, 0],
            scale: [1, 1.15, 0.9, 1, 1],
            rotate: [0, -8, 12, -5, 0],
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
};

export default BlobBackground; 