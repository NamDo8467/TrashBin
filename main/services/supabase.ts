import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
//   throw new Error('Missing Supabase environment variables. Please check your .env file.');
// }

export const supabase = createClient(
  'https://argdyuhauvywkwspmjsp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZ2R5dWhhdXZ5d2t3c3BtanNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMzc1OTEsImV4cCI6MjA1ODkxMzU5MX0.jqdS6CTETYXFFCOoaEkhH7nFEdlGekalCqQ8GfukbCQ',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  }
); 