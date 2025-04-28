import { useState } from 'react';
import { toast } from 'sonner';
import { BedConfig, Size, Treatment } from '@/types/bed';
import { PRODUCT_SIZES } from '@/lib/constants';
import { useCart } from '@/components/CartSidebar';

export const useBedConfig = () => {
  const [config, setConfig] = useState<BedConfig>({
    currentStep: 'size',
    selectedSize: '',
    selectedDimension: '',
    selectedTreatment: ''
  });

  const { addToCart } = useCart();

  const getProductData = (size: Size | '') => 
    PRODUCT_SIZES.find(ps => ps.size === size);

  const handleNext = () => {
    if (config.currentStep === 'size' && config.selectedSize) {
      setConfig(prev => ({ ...prev, currentStep: 'dimension' }));
    } else if (config.currentStep === 'dimension' && config.selectedDimension) {
      setConfig(prev => ({ ...prev, currentStep: 'treatment' }));
    }
  };

  const handleSizeSelect = (size: Size) => {
    setConfig({
      currentStep: 'size',
      selectedSize: size,
      selectedDimension: '',
      selectedTreatment: ''
    });
  };

  const handleDimensionSelect = (dimension: string) => {
    setConfig(prev => ({
      ...prev,
      selectedDimension: dimension
    }));
  };

  const handleTreatmentSelect = (treatment: Treatment) => {
    setConfig(prev => ({
      ...prev,
      selectedTreatment: treatment
    }));
  };

  const handleAddToCart = () => {
    if (config.currentStep === 'treatment' && config.selectedTreatment) {
      const productData = getProductData(config.selectedSize as Size);
      
      if (config.selectedSize === 'custom') {
        // For custom sizes
        const customPallets = JSON.parse(localStorage.getItem('customPallets') || '[]');
        
        addToCart({
          size: config.selectedSize,
          dimension: 'Custom',
          treatment: config.selectedTreatment,
          price: 0, // Will be calculated based on dimensions
          quantity: 1,
          customPallets: customPallets
        });
      } else {
        // For standard sizes
        addToCart({
          size: config.selectedSize as Size,
          dimension: config.selectedDimension,
          treatment: config.selectedTreatment,
          price: productData?.price || 0,
          quantity: 1
        });
      }
      
      toast.success('Item added to cart!');
      
      // Reset configuration
      setConfig({
        currentStep: 'size',
        selectedSize: '',
        selectedDimension: '',
        selectedTreatment: ''
      });
    }
  };

  return {
    config,
    handleNext,
    handleSizeSelect,
    handleDimensionSelect,
    handleTreatmentSelect,
    handleAddToCart
  };
}; 