import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or key. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Setting up database tables...');

  // Create admin_users table if it doesn't exist
  const { error: usersTableError } = await supabase.rpc('create_admin_users_table');
  
  if (usersTableError) {
    console.error('Error creating admin_users table:', usersTableError);
  } else {
    console.log('✅ admin_users table is ready');
  }

  // Create a default admin user if no users exist
  const { data: existingUsers } = await supabase
    .from('admin_users')
    .select('*')
    .limit(1);

  if (!existingUsers || existingUsers.length === 0) {
    const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';

    console.log('Creating default admin user...');
    
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.error('Error creating default admin user:', signUpError);
    } else if (data.user) {
      // Add user to admin_users table
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          { 
            id: data.user.id, 
            email,
            role: 'admin',
            created_at: new Date().toISOString()
          }
        ]);

      if (insertError) {
        console.error('Error adding user to admin_users:', insertError);
      } else {
        console.log('✅ Default admin user created:');
        console.log(`Email: ${email}`);
        console.log('Please change the password after first login.');
      }
    }
  }

  console.log('Database setup complete!');
}

// Execute the setup
setupDatabase().catch(console.error);
