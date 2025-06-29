import { useState, useCallback } from 'react';
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

  const getProductData = useCallback((size: Size | '') => 
    PRODUCT_SIZES.find(ps => ps.size === size),
    []
  );

  const handleNext = useCallback(() => {
    if (config.currentStep === 'size' && config.selectedSize) {
      const productData = getProductData(config.selectedSize as Size);
      const dimensions = productData?.dimensions || [];
      
      // Auto-select dimension if there's only one option
      if (dimensions.length === 1) {
        setConfig(prev => ({
          ...prev,
          currentStep: 'dimension',
          selectedDimension: dimensions[0]
        }));
      } else {
        setConfig(prev => ({ ...prev, currentStep: 'dimension' }));
      }
    }
  }, [config.selectedSize, getProductData]);

  const handleSizeSelect = useCallback((size: Size | '') => {
    const productData = getProductData(size as Size);
    const dimensions = productData?.dimensions || [];
    
    // Auto-select dimension if there's only one option
    const newState: BedConfig = {
      currentStep: 'size',
      selectedSize: size,
      selectedDimension: dimensions.length === 1 ? dimensions[0] : ''
    };
    
    // If there's only one dimension and we're selecting a size, auto-advance
    if (dimensions.length === 1) {
      newState.currentStep = 'dimension';
    }
    
    setConfig(newState);
  }, [getProductData]);

  const handleDimensionSelect = useCallback((dimension: string) => {
    setConfig(prev => ({
      ...prev,
      selectedDimension: dimension
    }));
  }, []);

  const handleAddToCart = useCallback((openCart?: () => void) => {
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
      
      // Open cart after adding item
      if (openCart) {
        openCart();
      }
      
      // Reset configuration
      setConfig({
        currentStep: 'size',
        selectedSize: '',
        selectedDimension: ''
      });
    }
  }, [config.currentStep, config.selectedSize, config.selectedDimension, addToCart, getProductData]);

  return {
    config,
    handleNext,
    handleSizeSelect,
    handleDimensionSelect,
    handleAddToCart
  };
};