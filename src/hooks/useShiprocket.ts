import { useState, useCallback } from 'react';
import { ShiprocketService } from '@/integrations/shiprocket';
import { 
  ServiceabilityResponse, 
  CreateOrderPayload, 
  CreateOrderResponse, 
  AssignCourierPayload, 
  AssignCourierResponse 
} from '@/integrations/shiprocket/types';

interface UseShiprocketProps {
  onError?: (error: Error) => void;
}

const useShiprocket = ({ onError }: UseShiprocketProps = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [service, setService] = useState<ShiprocketService | null>(null);

  // Initialize the Shiprocket service
  const initializeService = useCallback(async () => {
    try {
      const { shiprocketService } = await import('@/integrations/shiprocket');
      setService(shiprocketService);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize Shiprocket service');
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  // Check serviceability for a pincode
  const checkServiceability = useCallback(async (pincode: string) => {
    if (!service) {
      await initializeService();
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await service!.checkServiceability(pincode);
      return result as ServiceabilityResponse;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to check serviceability');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [service, initializeService, onError]);

  // Create a new order
  const createOrder = useCallback(async (orderData: CreateOrderPayload) => {
    if (!service) {
      await initializeService();
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await service!.createOrder(orderData);
      return result as CreateOrderResponse;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create order');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [service, initializeService, onError]);

  // Assign courier to a shipment
  const assignCourier = useCallback(async (assignmentData: AssignCourierPayload) => {
    if (!service) {
      await initializeService();
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await service!.assignCourier(assignmentData);
      return result as AssignCourierResponse;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to assign courier');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [service, initializeService, onError]);

  // Generate pickup for a shipment
  const generatePickup = useCallback(async (shipmentIds: number[]) => {
    if (!service) {
      await initializeService();
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await service!.generatePickup(shipmentIds);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate pickup');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [service, initializeService, onError]);

  // Track a shipment
  const trackShipment = useCallback(async (awbCode: string) => {
    if (!service) {
      await initializeService();
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await service!.trackShipment(awbCode);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to track shipment');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [service, initializeService, onError]);

  return {
    service,
    isLoading,
    error,
    checkServiceability,
    createOrder,
    assignCourier,
    generatePickup,
    trackShipment,
  };
};

export default useShiprocket;
