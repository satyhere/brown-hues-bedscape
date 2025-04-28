import { ProductSize } from '@/types/bed';

export const PRODUCT_SIZES: ProductSize[] = [
  {
    title: "Single Bed",
    size: "single",
    price: 1900,
    dimensions: ["72x36"]
  }, 
  {
    title: "Double Bed",
    size: "double",
    price: 2200,
    dimensions: ["72x48"]
  }, 
  {
    title: "Queen Size",
    size: "queen",
    price: 3400,
    dimensions: ["60x72", "60x75", "60x78"]
  }, 
  {
    title: "King Size",
    size: "king",
    price: 3600,
    dimensions: ["72x72", "72x75", "72x78"]
  },
  {
    title: "Custom",
    size: "custom",
    price: 0,
    dimensions: ["Custom"]
  }
];

export const CONFIGURATION_STEPS = [
  { key: "size", label: "Select Size" },
  { key: "dimension", label: "Select Dimension" },
  { key: "treatment", label: "Select Treatment" }
] as const;

export const TREATMENT_OPTIONS = [
  { value: 'natural', label: 'Natural Finish' },
  { value: 'polished', label: 'Polished Finish' },
  { value: 'stained', label: 'Stained Finish' }
] as const; 