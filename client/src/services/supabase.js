import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://asmcrxdpkgfqurghvgkv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbWNyeGRwa2dmcXVyZ2h2Z2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwMjY2OTIsImV4cCI6MjAxNzYwMjY5Mn0.XyAnlzZ9TZM2EvrrGE7G4w4MFB9DjXJpK8ENmsY9TAQ";

export default createClient(supabaseUrl, supabaseKey);
