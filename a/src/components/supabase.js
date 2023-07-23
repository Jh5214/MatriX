import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jedendeblvtzvmbtgmsv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGVuZGVibHZ0enZtYnRnbXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4MjYyMjksImV4cCI6MjAwMDQwMjIyOX0.lejG0c-0yaUsfd0optvquxA9shNvvFjYHOwzXPX5BS4"
);