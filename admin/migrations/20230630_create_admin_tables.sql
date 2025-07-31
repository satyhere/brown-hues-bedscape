-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Enable read access for admins" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for admins" ON admin_users
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for admins" ON admin_users
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM admin_users 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to create the admin_users table
CREATE OR REPLACE FUNCTION create_admin_users_table()
RETURNS void AS $$
BEGIN
  -- Table creation is handled by the SQL above
  -- This function is a no-op that can be called from the setup script
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
