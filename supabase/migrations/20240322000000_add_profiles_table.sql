-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    orders_count INTEGER DEFAULT 0
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create function to auto-create profile when user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call function on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to create/update profile from orders
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
        -- No profile exists, create a temporary user and profile
        INSERT INTO public.profiles (
            id,
            name,
            email,
            phone,
            address,
            orders_count
        )
        VALUES (
            gen_random_uuid(),
            NEW.customer_name,
            NEW.customer_email,
            NEW.customer_phone,
            NEW.delivery_address,
            1
        );
    ELSE
        -- Profile exists, update it and increment order count
        UPDATE public.profiles
        SET
            name = COALESCE(name, NEW.customer_name),
            phone = COALESCE(phone, NEW.customer_phone),
            address = COALESCE(address, NEW.delivery_address),
            orders_count = orders_count + 1,
            updated_at = now()
        WHERE id = existing_profile_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call function on order creation
DROP TRIGGER IF EXISTS on_order_created ON public.orders;
CREATE TRIGGER on_order_created
    AFTER INSERT ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.create_profile_from_order(); 