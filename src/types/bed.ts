export type Size = 'single' | 'double' | 'queen' | 'king' | 'custom';
export type Treatment = 'natural' | 'polished' | 'stained';

export interface ProductSize {
  title: string;
  size: Size;
  price: number;
  dimensions: string[];
}

export type CustomPallet = {
  [key: string]: string | number;
  width: string;
  length: string;
  quantity: string;
};

export interface CartItem {
  id: string;
  size: Size;
  dimension: string;
  treatment: Treatment;
  price: number;
  quantity: number;
  customPallets?: CustomPallet[];
}

export interface BedConfig {
  currentStep: 'size' | 'dimension';
  selectedSize: Size | '';
  selectedDimension: string;
} 