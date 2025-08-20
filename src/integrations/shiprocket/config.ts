interface ShiprocketConfig {
  email: string;
  password: string;
  warehousePincode: string;
  channelId: string;
  baseUrl: string;
}

// Load configuration from environment variables
const loadConfig = (): ShiprocketConfig => {
  const email = import.meta.env.VITE_SHIPROCKET_EMAIL;
  const password = import.meta.env.VITE_SHIPROCKET_PASSWORD;
  const warehousePincode = import.meta.env.VITE_SHIPROCKET_WAREHOUSE_PINCODE;
  const channelId = import.meta.env.VITE_SHIPROCKET_CHANNEL_ID || '';
  
  if (!email || !password || !warehousePincode) {
    throw new Error('Missing required Shiprocket configuration. Please check your environment variables.');
  }

  return {
    email,
    password,
    warehousePincode,
    channelId,
    baseUrl: import.meta.env.VITE_SHIPROCKET_BASE_URL || 'https://apiv2.shiprocket.in/v1/external',
  };
};

const config = loadConfig();

export default config;
