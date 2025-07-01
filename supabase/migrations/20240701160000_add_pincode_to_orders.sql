-- Add pincode column to orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS pincode TEXT;

-- Update the create_profile_from_order function to include pincode
CREATE OR REPLACE FUNCTION public.create_profile_from_order()
RETURNS TRIGGER AS $$
DECLARE
    existing_profile_id UUID;
BEGIN
    -- Check if a profile with this email already exists
    SELECT id INTO existing_profile_id FROM public.profiles
    WHERE email = NEW.customer_email
    LIMIT 1;
    
    IF existing_profile_id IS NULL THEN
        -- No profile exists, create a new one
        INSERT INTO public.profiles (
            id,
            name,
            email,
            phone,
            address,
            pincode,
            orders_count
        )
        VALUES (
            gen_random_uuid(),
            NEW.customer_name,
            NEW.customer_email,
            NEW.customer_phone,
            NEW.delivery_address,
            NEW.pincode,
            1
        );
    ELSE
        -- Profile exists, update it and increment order count
        UPDATE public.profiles
        SET
            name = COALESCE(name, NEW.customer_name),
            phone = COALESCE(phone, NEW.customer_phone),
            address = COALESCE(address, NEW.delivery_address),
            pincode = COALESCE(NEW.pincode, pincode),
            orders_count = orders_count + 1,
            updated_at = now()
        WHERE id = existing_profile_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add pincode to profiles table if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS pincode TEXT;

-- Update the types.ts file to include pincode in the Orders and Profiles types
