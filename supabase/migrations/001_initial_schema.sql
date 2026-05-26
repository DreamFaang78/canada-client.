-- ============================================================
-- BIG Insurance Broker — Supabase Database Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ADMINS
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL CHECK (service_type IN ('home', 'auto', 'life', 'business')),
  source TEXT NOT NULL DEFAULT 'organic' CHECK (source IN ('organic', 'direct', 'referral', 'google_ads', 'social', 'other')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'follow_up', 'won', 'lost', 'dormant')),
  notes_count INTEGER NOT NULL DEFAULT 0,
  follow_up_date DATE,
  won_at TIMESTAMPTZ,
  lost_reason TEXT,
  assigned_to UUID REFERENCES admins(id) ON DELETE SET NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
CREATE INDEX IF NOT EXISTS leads_service_type_idx ON leads(service_type);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_follow_up_date_idx ON leads(follow_up_date);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- CUSTOMERS
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT DEFAULT 'Mississauga',
  postal_code TEXT,
  current_insurer TEXT,
  renewal_date DATE,
  policy_types TEXT[] DEFAULT '{}',
  preferred_contact TEXT DEFAULT 'email' CHECK (preferred_contact IN ('email', 'phone', 'text')),
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CONTACT SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  service_type TEXT,
  page_source TEXT DEFAULT 'contact',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LEAD NOTES
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LEAD ACTIVITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'status_change', 'note_added', 'email_sent', 'call_logged',
    'quote_sent', 'follow_up_set', 'lead_created'
  )),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- COOKIE CONSENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS cookie_consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  analytics_consent BOOLEAN NOT NULL DEFAULT false,
  marketing_consent BOOLEAN NOT NULL DEFAULT false,
  preference_consent BOOLEAN NOT NULL DEFAULT false,
  consent_version TEXT NOT NULL DEFAULT '1.0',
  ip_hash TEXT,
  user_agent_hash TEXT,
  consented_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '12 months')
);

-- ============================================================
-- USER EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  page TEXT,
  properties JSONB DEFAULT '{}',
  device_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT,
  icon_name TEXT NOT NULL,
  coverages JSONB DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  service_type TEXT CHECK (service_type IN ('home', 'auto', 'life', 'business', 'general')),
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'google' CHECK (source IN ('google', 'manual')),
  is_approved BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- GALLERY ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  value_type TEXT NOT NULL DEFAULT 'string' CHECK (value_type IN ('string', 'number', 'boolean', 'json')),
  updated_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookie_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Helper: check if request is from authenticated admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (SELECT COUNT(*) > 0 FROM admins WHERE id = auth.uid() AND is_active = true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ADMINS: only admins can read/write
DROP POLICY IF EXISTS "admins_select" ON admins;
DROP POLICY IF EXISTS "admins_update" ON admins;
CREATE POLICY "admins_select" ON admins FOR SELECT USING (is_admin());
CREATE POLICY "admins_update" ON admins FOR UPDATE USING (is_admin());

-- LEADS: admin-only
DROP POLICY IF EXISTS "leads_select" ON leads;
DROP POLICY IF EXISTS "leads_insert" ON leads;
DROP POLICY IF EXISTS "leads_update" ON leads;
DROP POLICY IF EXISTS "leads_delete" ON leads;
CREATE POLICY "leads_select" ON leads FOR SELECT USING (is_admin());
CREATE POLICY "leads_insert" ON leads FOR INSERT WITH CHECK (true); -- API routes insert
CREATE POLICY "leads_update" ON leads FOR UPDATE USING (is_admin());
CREATE POLICY "leads_delete" ON leads FOR DELETE USING (is_admin());

-- CUSTOMERS: admin-only
DROP POLICY IF EXISTS "customers_select" ON customers;
DROP POLICY IF EXISTS "customers_insert" ON customers;
DROP POLICY IF EXISTS "customers_update" ON customers;
CREATE POLICY "customers_select" ON customers FOR SELECT USING (is_admin());
CREATE POLICY "customers_insert" ON customers FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "customers_update" ON customers FOR UPDATE USING (is_admin());

-- CONTACT SUBMISSIONS: public INSERT, admin read
DROP POLICY IF EXISTS "contacts_insert" ON contact_submissions;
DROP POLICY IF EXISTS "contacts_select" ON contact_submissions;
CREATE POLICY "contacts_insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "contacts_select" ON contact_submissions FOR SELECT USING (is_admin());

-- LEAD NOTES: admin-only
DROP POLICY IF EXISTS "notes_select" ON lead_notes;
DROP POLICY IF EXISTS "notes_insert" ON lead_notes;
DROP POLICY IF EXISTS "notes_update" ON lead_notes;
CREATE POLICY "notes_select" ON lead_notes FOR SELECT USING (is_admin());
CREATE POLICY "notes_insert" ON lead_notes FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "notes_update" ON lead_notes FOR UPDATE USING (is_admin());

-- LEAD ACTIVITIES: admin-only
DROP POLICY IF EXISTS "activities_select" ON lead_activities;
DROP POLICY IF EXISTS "activities_insert" ON lead_activities;
CREATE POLICY "activities_select" ON lead_activities FOR SELECT USING (is_admin());
CREATE POLICY "activities_insert" ON lead_activities FOR INSERT WITH CHECK (is_admin() OR true); -- API routes too

-- COOKIE CONSENTS: public INSERT, admin read
DROP POLICY IF EXISTS "consents_insert" ON cookie_consents;
DROP POLICY IF EXISTS "consents_select" ON cookie_consents;
CREATE POLICY "consents_insert" ON cookie_consents FOR INSERT WITH CHECK (true);
CREATE POLICY "consents_select" ON cookie_consents FOR SELECT USING (is_admin());

-- USER EVENTS: public INSERT, admin read
DROP POLICY IF EXISTS "events_insert" ON user_events;
DROP POLICY IF EXISTS "events_select" ON user_events;
CREATE POLICY "events_insert" ON user_events FOR INSERT WITH CHECK (true);
CREATE POLICY "events_select" ON user_events FOR SELECT USING (is_admin());

-- SERVICES: public read, admin write
DROP POLICY IF EXISTS "services_select" ON services;
DROP POLICY IF EXISTS "services_insert" ON services;
DROP POLICY IF EXISTS "services_update" ON services;
CREATE POLICY "services_select" ON services FOR SELECT USING (true);
CREATE POLICY "services_insert" ON services FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "services_update" ON services FOR UPDATE USING (is_admin());

-- TESTIMONIALS: public read (approved only), admin all
DROP POLICY IF EXISTS "testimonials_public_select" ON testimonials;
DROP POLICY IF EXISTS "testimonials_insert" ON testimonials;
DROP POLICY IF EXISTS "testimonials_update" ON testimonials;
DROP POLICY IF EXISTS "testimonials_delete" ON testimonials;
CREATE POLICY "testimonials_public_select" ON testimonials FOR SELECT USING (is_approved = true OR is_admin());
CREATE POLICY "testimonials_insert" ON testimonials FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "testimonials_update" ON testimonials FOR UPDATE USING (is_admin());
CREATE POLICY "testimonials_delete" ON testimonials FOR DELETE USING (is_admin());

-- GALLERY: public read (active only), admin all
DROP POLICY IF EXISTS "gallery_public_select" ON gallery_items;
DROP POLICY IF EXISTS "gallery_insert" ON gallery_items;
DROP POLICY IF EXISTS "gallery_update" ON gallery_items;
DROP POLICY IF EXISTS "gallery_delete" ON gallery_items;
CREATE POLICY "gallery_public_select" ON gallery_items FOR SELECT USING (is_active = true OR is_admin());
CREATE POLICY "gallery_insert" ON gallery_items FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "gallery_update" ON gallery_items FOR UPDATE USING (is_admin());
CREATE POLICY "gallery_delete" ON gallery_items FOR DELETE USING (is_admin());

-- SETTINGS: public read, admin write
DROP POLICY IF EXISTS "settings_select" ON settings;
DROP POLICY IF EXISTS "settings_insert" ON settings;
DROP POLICY IF EXISTS "settings_update" ON settings;
CREATE POLICY "settings_select" ON settings FOR SELECT USING (true);
CREATE POLICY "settings_insert" ON settings FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "settings_update" ON settings FOR UPDATE USING (is_admin());
