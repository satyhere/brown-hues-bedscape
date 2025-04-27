
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from 'sonner';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface MapProps {
  onAddressSelected?: (address: string) => void;
}

const Map = ({ onAddressSelected }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<string>('');

  // Bangalore coordinates as default
  const defaultCenter: [number, number] = [77.5946, 12.9716];

  useEffect(() => {
    // Check if mapboxgl is already initialized with a token
    if (!mapboxgl.accessToken && !accessToken) {
      // Ask user to input their Mapbox token
      const storedToken = localStorage.getItem('mapbox_token');
      if (storedToken) {
        setAccessToken(storedToken);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    if (!mapContainer.current || !accessToken) return;
    
    try {
      // Initialize map
      mapboxgl.accessToken = accessToken;
      localStorage.setItem('mapbox_token', accessToken);
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: defaultCenter,
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add a marker for the center of Bangalore
      marker.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat(defaultCenter)
        .addTo(map.current);

      // Update address when marker is dragged
      marker.current.on('dragend', async () => {
        if (marker.current) {
          const lngLat = marker.current.getLngLat();
          const address = await reverseGeocode(lngLat.lng, lngLat.lat);
          setCurrentAddress(address);
          if (onAddressSelected) {
            onAddressSelected(address);
          }
        }
      });

      // When map loads
      map.current.on('load', () => {
        setMapLoaded(true);
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { longitude, latitude } = position.coords;
              map.current?.flyTo({
                center: [longitude, latitude],
                zoom: 15
              });
              if (marker.current) {
                marker.current.setLngLat([longitude, latitude]);
              }
              reverseGeocode(longitude, latitude).then(address => {
                setCurrentAddress(address);
                if (onAddressSelected) {
                  onAddressSelected(address);
                }
              });
            },
            error => {
              console.log("Error getting location:", error);
            }
          );
        }
      });

      // Cleanup
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      toast.error("Failed to initialize map. Please check your Mapbox token.");
    }
  }, [accessToken, onAddressSelected]);

  const reverseGeocode = async (lng: number, lat: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      }
      return "Address not found";
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return "Failed to get address";
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapLoaded || !map.current || !marker.current) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?proximity=${defaultCenter.join(',')}&access_token=${accessToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        map.current.flyTo({
          center: [lng, lat],
          zoom: 15,
          speed: 1.5
        });
        marker.current.setLngLat([lng, lat]);
        const address = data.features[0].place_name;
        setCurrentAddress(address);
        if (onAddressSelected) {
          onAddressSelected(address);
        }
      } else {
        toast.error("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      toast.error("Failed to search location");
    }
  };

  if (!accessToken) {
    return (
      <div className="bg-muted/20 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium">Mapbox Token Required</h3>
        <p className="text-sm text-muted-foreground">
          Please enter your Mapbox public token to use the map feature
        </p>
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="Enter Mapbox token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={() => {
            if (accessToken) {
              localStorage.setItem('mapbox_token', accessToken);
              toast.success("Token saved!");
            }
          }}>
            Save
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Search for an address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>
      
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden border">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
      
      {currentAddress && (
        <div className="flex items-start gap-2 p-2 bg-muted/20 rounded-lg">
          <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
          <div className="text-sm">
            <div className="font-medium">Selected Location</div>
            <div className="text-muted-foreground break-words">{currentAddress}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
