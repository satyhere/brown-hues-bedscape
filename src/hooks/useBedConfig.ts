import { useState } from 'react';
import { toast } from 'sonner';
import { BedConfig, Size, Treatment } from '@/types/bed';
import { PRODUCT_SIZES } from '@/lib/constants';
import { useCartContext } from '@/contexts/CartContext';

export const useBedConfig = () => {
  const [config, setConfig] = useState<BedConfig>({
    currentStep: 'size',
    selectedSize: '',
    selectedDimension: ''
  });

  const { addToCart } = useCartContext();

  const getProductData = (size: Size | '') => 
    PRODUCT_SIZES.find(ps => ps.size === size);

  const handleNext = () => {
    if (config.currentStep === 'size' && config.selectedSize) {
      setConfig(prev => ({ ...prev, currentStep: 'dimension' }));
    }
  };

  const handleSizeSelect = (size: Size) => {
    setConfig({
      currentStep: 'size',
      selectedSize: size,
      selectedDimension: ''
    });
  };

  const handleDimensionSelect = (dimension: string) => {
    setConfig(prev => ({
      ...prev,
      selectedDimension: dimension
    }));
  };

  const handleAddToCart = () => {
    if (config.currentStep === 'dimension' && config.selectedDimension) {
      const productData = getProductData(config.selectedSize as Size);
      const defaultTreatment: Treatment = 'natural';
      
      if (config.selectedSize === 'custom') {
        // For custom sizes
        const customPallets = JSON.parse(localStorage.getItem('customPallets') || '[]');
        
        // Generate a consistent ID based on product properties
        const productId = `custom-${defaultTreatment}`;
        
        addToCart({
          id: productId,
          size: config.selectedSize,
          dimension: 'Custom',
          treatment: defaultTreatment,
          price: 0, // Will be calculated based on dimensions
          quantity: 1,
          customPallets: customPallets
        });
      } else {
        // For standard sizes
        // Generate a consistent ID based on product properties
        const productId = `${config.selectedSize}-${config.selectedDimension}-${defaultTreatment}`;
        
        addToCart({
          id: productId,
          size: config.selectedSize as Size,
          dimension: config.selectedDimension,
          treatment: defaultTreatment,
          price: productData?.price || 0,
          quantity: 1
        });
      }
      
      toast.success('Item added to cart!');
      
      // Reset configuration
      setConfig({
        currentStep: 'size',
        selectedSize: '',
        selectedDimension: ''
      });
    }
  };

  return {
    config,
    handleNext,
    handleSizeSelect,
    handleDimensionSelect,
    handleAddToCart
  };
}; 