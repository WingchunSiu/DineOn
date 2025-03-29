import { createClient } from '@supabase/supabase-js';

// Ensure the environment variables are explicitly typed as strings
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY as string;


if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or API Key. Check your environment variables.');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


