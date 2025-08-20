import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  ShiprocketConfig,
  AuthResponse,
  ServiceabilityResponse,
  CreateOrderPayload,
  CreateOrderResponse,
  AssignCourierPayload,
  AssignCourierResponse,
  GenerateLabelResponse,
  GenerateInvoiceResponse,
  GenerateManifestResponse,
  TrackShipmentResponse,
} from './types';

class ShiprocketService {
  private http: AxiosInstance;
  private config: ShiprocketConfig;
  private token: string | null = null;
  private tokenExpiry: number = 0;
  private refreshTimeout: NodeJS.Timeout | null = null;

  constructor(config: ShiprocketConfig) {
    this.config = config;
    
    this.http = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for auth token
    this.http.interceptors.request.use(
      async (config) => {
        // If token is expired or about to expire in the next 5 minutes, refresh it
        if (this.token && this.tokenExpiry - Date.now() < 300000) {
          await this.refreshToken();
        }
        
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<void> {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }

    try {
      const response = await axios.post<AuthResponse>(
        `${this.config.baseUrl}/auth/login`,
        {
          email: this.config.email,
          password: this.config.password,
        }
      );

      this.token = response.data.token;
      this.tokenExpiry = Date.now() + (response.data.token_expiry - 300) * 1000; // 5 min buffer

      // Set up refresh before token expires
      const refreshTime = (response.data.token_expiry - 300) * 1000; // 5 min before expiry
      this.refreshTimeout = setTimeout(() => this.refreshToken(), refreshTime);
    } catch (error) {
      console.error('Failed to refresh Shiprocket token:', error);
      this.token = null;
      this.tokenExpiry = 0;
      throw error;
    }
  }

  public async checkServiceability(pincode: string): Promise<ServiceabilityResponse> {
    const response = await this.http.get<ServiceabilityResponse>(
      '/courier/serviceability',
      {
        params: {
          pickup_postcode: this.config.warehousePincode,
          delivery_postcode: pincode,
          weight: 1, // Default weight in kg
          cod: 0, // Not cash on delivery
        },
      }
    );
    return response.data;
  }

  public async createOrder(orderData: CreateOrderPayload): Promise<CreateOrderResponse> {
    const response = await this.http.post<CreateOrderResponse>('/orders/create/adhoc', orderData);
    return response.data;
  }

  public async assignCourier(assignmentData: AssignCourierPayload): Promise<AssignCourierResponse> {
    const response = await this.http.post<AssignCourierResponse>(
      '/courier/assign/awb',
      assignmentData
    );
    return response.data;
  }

  public async generatePickup(shipmentIds: number[]): Promise<any> {
    const response = await this.http.post('/courier/generate/pickup', {
      shipment_id: shipmentIds,
    });
    return response.data;
  }

  public async generateLabel(shipmentId: number): Promise<GenerateLabelResponse> {
    const response = await this.http.get<GenerateLabelResponse>(
      '/courier/generate/label',
      {
        params: { shipment_id: shipmentId },
      }
    );
    return response.data;
  }

  public async generateInvoice(shipmentId: number): Promise<GenerateInvoiceResponse> {
    const response = await this.http.get<GenerateInvoiceResponse>(
      '/orders/print/invoice',
      {
        params: { ids: shipmentId },
      }
    );
    return response.data;
  }

  public async generateManifest(shipmentId: number): Promise<GenerateManifestResponse> {
    const response = await this.http.get<GenerateManifestResponse>(
      '/manifests/generate',
      {
        params: { shipment_id: shipmentId },
      }
    );
    return response.data;
  }

  public async trackShipment(awbCode: string): Promise<TrackShipmentResponse> {
    const response = await this.http.get<TrackShipmentResponse>(
      '/courier/track/awb',
      {
        params: { awb_code: awbCode },
      }
    );
    return response.data;
  }

  // Clean up resources
  public cleanup(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }
}

// Export a singleton instance
export const shiprocketService = new ShiprocketService({
  email: import.meta.env.VITE_SHIPROCKET_EMAIL || '',
  password: import.meta.env.VITE_SHIPROCKET_PASSWORD || '',
  warehousePincode: import.meta.env.VITE_SHIPROCKET_WAREHOUSE_PINCODE || '',
  channelId: import.meta.env.VITE_SHIPROCKET_CHANNEL_ID || '',
  baseUrl: import.meta.env.VITE_SHIPROCKET_BASE_URL || 'https://apiv2.shiprocket.in/v1/external',
});

export default shiprocketService;
