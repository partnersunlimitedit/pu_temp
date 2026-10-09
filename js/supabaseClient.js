/**
 * Supabase Client Initializer
 * Uses official publishable anon key for direct client-to-database communication.
 */

const SUPABASE_URL = 'https://dopczkttxflbvlizctrl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcGN6a3R0eGZsYnZsaXpjdHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NzkyNzIsImV4cCI6MjEwNjE1NTI3Mn0.LZq4sm0gVBMI1AQSu7YVru5_pDhPtFJoXRDoEIh2OWw';

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

export const getSupabaseClient = () => {
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase CDN library not detected.');
    return null;
  }
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};
