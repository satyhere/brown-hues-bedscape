import React, { useRef, useEffect } from "react";

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (value: string, pincode: string) => void;
  placeholder?: string;
  className?: string;
}

export const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Search address...",
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;
    if (!inputRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "in" },
    });
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      let pincode = "";
      if (place && place.formatted_address) {
        // Try to extract pincode from address_components
        if (place.address_components) {
          const pinComp = place.address_components.find((comp: any) =>
            comp.types.includes("postal_code")
          );
          if (pinComp) {
            pincode = pinComp.long_name;
          }
        }
        onChange(place.formatted_address, pincode);
      } else if (inputRef.current) {
        onChange(inputRef.current.value, pincode);
      }
    });
    // Clean up
    return () => {
      window.google.maps.event.clearInstanceListeners(inputRef.current);
    };
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={e => onChange(e.target.value, "")}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
    />
  );
};
