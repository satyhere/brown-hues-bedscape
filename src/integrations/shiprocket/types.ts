// Configuration types
export interface ShiprocketConfig {
  email: string;
  password: string;
  warehousePincode: string;
  channelId: string;
  baseUrl?: string;
}

// Auth response
export interface AuthResponse {
  token: string;
  token_expiry: number;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

// Serviceability types
export interface ServiceabilityResponse {
  status: number;
  data: {
    available_courier_companies: Array<{
      courier_company_id: number;
      courier_name: string;
      courier_company_name: string;
      est_delivery_days: string;
      rate: number;
      cod: 0 | 1;
      is_air: boolean;
      is_surface: boolean;
      etd: string;
    }>;
  };
}

// Order creation types
export interface OrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount: number;
  tax: number;
  hsn: number;
  product_id?: string;
  weight?: number;
  length?: number;
  breadth?: number;
  height?: number;
}

export interface CreateOrderPayload {
  order_id: string;
  order_date: string;
  pickup_location: string;
  channel_id?: string;
  billing_customer_name: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  order_items: OrderItem[];
  payment_method: 'prepaid' | 'COD' | 'bank_transfer' | 'upi' | 'card' | 'wallet' | 'net_banking' | 'emi' | 'paylater' | 'cardless_emi' | 'gift_card' | 'paypal' | 'amazon_pay' | 'phonepe' | 'google_pay' | 'other';
  shipping_charges: number;
  total_discount: number;
  sub_total: number;
  weight?: number;
  length?: number;
  breadth?: number;
  height?: number;
}

export interface CreateOrderResponse {
  order_id: number;
  shipment_id: number;
  status: string;
  status_code: number;
  awb_code: string | null;
  courier_company_id: string | null;
  courier_name: string | null;
}

// Courier assignment types
export interface AssignCourierPayload {
  shipment_id: number[];
  courier_id: number;
  status?: string;
}

export interface AssignCourierResponse {
  response: {
    status: number;
    message: string;
  };
  assigned_shipments: number[];
  unassigned_shipments: number[];
  failed_shipments: number[];
  failed_errors: Record<number, string>;
}

// Pickup generation types
export interface GeneratePickupResponse {
  pickup_status: number;
  pickup_success: number;
  pickup_failed: number;
  pickup_token_number: string;
  pickup_scheduled_date: string;
  pickup_generated: boolean;
  pickup_id: number;
  pickup_label_url: string;
}

// Label generation types
export interface GenerateLabelResponse {
  label_created: boolean;
  label_url: string;
  label_pdf_url: string;
}

// Invoice generation types
export interface GenerateInvoiceResponse {
  invoice_created: boolean;
  invoice_url: string;
  invoice_pdf_url: string;
}

// Manifest generation types
export interface GenerateManifestResponse {
  manifest_created: boolean;
  manifest_url: string;
  manifest_pdf_url: string;
}

// Shipment tracking types
export interface TrackingInfo {
  track_status: number;
  shipment_track: Array<{
    id: number;
    awb_code: string;
    courier_company_id: string;
    courier_name: string;
    status: string;
    updated_date: string;
    updated_time: string;
    current_status: string;
    current_status_description: string;
    current_status_time: string;
    current_status_location: string;
    delivered_date: string | null;
  }>;
}

export type TrackShipmentResponse = TrackingInfo;
