-- Create the 'views' table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.views (
  slug TEXT PRIMARY KEY,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Check if Row Level Security is enabled, if not enable it
ALTER TABLE public.views ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read views (SELECT)
CREATE POLICY "Allow public read access"
ON public.views
FOR SELECT
TO public
USING (true);

-- Create policy to allow anyone to insert/update views (UPSERT)
-- Note: In a stricter production environment, you might restrict this to service roles or specific logic
CREATE POLICY "Allow public upsert access"
ON public.views
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update access"
ON public.views
FOR UPDATE
TO public
USING (true);

-- Grant access to public role (anon key)
GRANT SELECT, INSERT, UPDATE ON public.views TO anon;
GRANT SELECT, INSERT, UPDATE ON public.views TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.views TO service_role;
