/**
 * Supabase Client Initialization
 * Public client-side configuration using publishable anon key only.
 */

// Replace these placeholders with your actual Supabase project parameters
const SUPABASE_URL = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

export const isSupabaseConfigured = () => {
  return (
    SUPABASE_URL !== 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co' &&
    SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY'
  );
};

export const getSupabaseClient = () => {
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase library is not loaded from CDN.');
    return null;
  }
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};
