import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useShiprocket from '@/hooks/useShiprocket';
import { toast } from 'sonner';

const ShiprocketOrderExample: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [courierId, setCourierId] = useState('');
  const [orderData, setOrderData] = useState({
    orderId: '',
    shipmentId: 0,
    awbCode: ''
  });

  const {
    isLoading,
    error,
    checkServiceability,
    createOrder,
    assignCourier,
    generatePickup,
    trackShipment,
  } = useShiprocket({
    onError: (err) => {
      console.error('Shiprocket Error:', err);
      toast.error(`Shiprocket Error: ${err.message}`);
    },
  });

  const handleCheckServiceability = async () => {
    if (!pincode) {
      toast.error('Please enter a pincode');
      return;
    }
    
    try {
      const result = await checkServiceability(pincode);
      console.log('Serviceability Result:', result);
      toast.success('Service available for this pincode!');
    } catch (err) {
      console.error('Serviceability check failed:', err);
    }
  };

  const handleCreateOrder = async () => {
    if (!pincode) {
      toast.error('Please enter a pincode first');
      return;
    }

    try {
      const orderPayload = {
        order_id: `ORDER_${Date.now()}`,
        order_date: new Date().toISOString(),
        pickup_location: 'Primary',
        billing_customer_name: 'Test Customer',
        billing_address: '123 Test St',
        billing_city: 'Mumbai',
        billing_pincode: pincode,
        billing_state: 'Maharashtra',
        billing_country: 'India',
        billing_email: 'test@example.com',
        billing_phone: '9876543210',
        shipping_is_billing: true,
        order_items: [
          {
            name: 'Test Product',
            sku: 'TEST123',
            units: 1,
            selling_price: 1000,
            discount: 0,
            tax: 180,
            hsn: 1234,
          },
        ],
        payment_method: 'prepaid',
        shipping_charges: 0,
        total_discount: 0,
        sub_total: 1000,
      };

      const result = await createOrder(orderPayload);
      setOrderData({
        orderId: result.order_id.toString(),
        shipmentId: result.shipment_id,
        awbCode: result.awb_code || ''
      });
      
      toast.success('Order created successfully!');
      console.log('Order created:', result);
    } catch (err) {
      console.error('Order creation failed:', err);
    }
  };

  const handleAssignCourier = async () => {
    if (!orderData.shipmentId) {
      toast.error('Please create an order first');
      return;
    }

    if (!courierId) {
      toast.error('Please select a courier');
      return;
    }

    try {
      const result = await assignCourier({
        shipment_id: [orderData.shipmentId],
        courier_id: parseInt(courierId, 10)
      });
      
      toast.success('Courier assigned successfully!');
      console.log('Courier assigned:', result);
    } catch (err) {
      console.error('Courier assignment failed:', err);
    }
  };

  const handleGeneratePickup = async () => {
    if (!orderData.shipmentId) {
      toast.error('Please create an order first');
      return;
    }

    try {
      const result = await generatePickup([orderData.shipmentId]);
      toast.success('Pickup generated successfully!');
      console.log('Pickup generated:', result);
    } catch (err) {
      console.error('Pickup generation failed:', err);
    }
  };

  const handleTrackShipment = async () => {
    if (!orderData.awbCode) {
      toast.error('No AWB code available');
      return;
    }

    try {
      const result = await trackShipment(orderData.awbCode);
      console.log('Tracking info:', result);
      toast.success('Tracking information retrieved');
    } catch (err) {
      console.error('Tracking failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">1. Check Serviceability</h3>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Label htmlFor="pincode">Delivery Pincode</Label>
            <Input
              id="pincode"
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter pincode"
              className="mt-1"
            />
          </div>
          <Button 
            onClick={handleCheckServiceability} 
            disabled={isLoading || !pincode}
          >
            Check
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">2. Create Test Order</h3>
        <Button 
          onClick={handleCreateOrder} 
          disabled={isLoading || !pincode}
          className="w-full sm:w-auto"
        >
          Create Test Order
        </Button>
      </div>

      {orderData.orderId && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Order Information</h3>
          <div className="grid gap-2 p-4 bg-gray-50 rounded-md">
            <p><span className="font-medium">Order ID:</span> {orderData.orderId}</p>
            <p><span className="font-medium">Shipment ID:</span> {orderData.shipmentId}</p>
            {orderData.awbCode && (
              <p><span className="font-medium">AWB Code:</span> {orderData.awbCode}</p>
            )}
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="font-medium">3. Assign Courier</h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select onValueChange={setCourierId} value={courierId}>
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="Select courier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Delhivery Surface</SelectItem>
                  <SelectItem value="2">Ecom Express</SelectItem>
                  <SelectItem value="3">XpressBees</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleAssignCourier} 
                disabled={isLoading || !courierId}
                className="w-full sm:w-auto"
              >
                Assign Courier
              </Button>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="font-medium">4. Generate Pickup</h4>
            <Button 
              onClick={handleGeneratePickup} 
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              Generate Pickup
            </Button>
          </div>

          {orderData.awbCode && (
            <div className="space-y-4 pt-2">
              <h4 className="font-medium">5. Track Shipment</h4>
              <Button 
                onClick={handleTrackShipment} 
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                Track Shipment
              </Button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          <h4 className="font-medium">Error</h4>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default ShiprocketOrderExample;
