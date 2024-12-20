import { createClient } from '@supabase/supabase-js';

console.log('Environment variables:', {
  url: process.env.REACT_APP_SUPABASE_URL,
  keyExists: !!process.env.REACT_APP_SUPABASE_ANON_KEY
});

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 