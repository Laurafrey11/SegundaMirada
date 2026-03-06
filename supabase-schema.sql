-- Run this in your Supabase SQL Editor to set up the database

-- 1. Create the admissions table
CREATE TABLE IF NOT EXISTS public.admissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    id_number TEXT NOT NULL,
    affected_area TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    treatments TEXT NOT NULL,
    questions TEXT NOT NULL,
    decisions TEXT NOT NULL,
    expectations TEXT NOT NULL,
    file_paths TEXT[] DEFAULT '{}'::TEXT[],
    plan TEXT NOT NULL,
    currency TEXT NOT NULL,
    amount_to_pay NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending'::TEXT NOT NULL,
    payment_id TEXT
);

-- 2. Set up row level security (RLS) for the admissions table
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new admissions (for the public form)
CREATE POLICY "Allow anonymous inserts" ON public.admissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow authenticated users (admins) to read all admissions
CREATE POLICY "Allow authenticated reads" ON public.admissions
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated users (admins) to update admissions
CREATE POLICY "Allow authenticated updates" ON public.admissions
    FOR UPDATE
    TO authenticated
    USING (true);

-- 3. Create the storage bucket for medical records
INSERT INTO storage.buckets (id, name, public) 
VALUES ('medical_records', 'medical_records', false)
ON CONFLICT (id) DO NOTHING;

-- 4. Set up storage security policies
-- Allow anonymous users to upload files
CREATE POLICY "Allow anonymous uploads" ON storage.objects
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (bucket_id = 'medical_records');

-- Allow authenticated users (admins) to read files
CREATE POLICY "Allow authenticated reads" ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'medical_records');

-- Allow authenticated users (admins) to delete files
CREATE POLICY "Allow authenticated deletes" ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'medical_records');
