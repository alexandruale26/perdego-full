import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qmuiviehgtbgqimgrjak.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtdWl2aWVoZ3RiZ3FpbWdyamFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxMDMzMDYsImV4cCI6MjAzNTY3OTMwNn0.t-bvTPPx_kJKp5YtjAI4_IMQKmXzFokPmPzn1l8H-4U"; // is safe to expose the Public Key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
