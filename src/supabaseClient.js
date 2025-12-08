import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Debugging check:
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("WARNING: Supabase keys are missing! Check your .env file and restart the server.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
