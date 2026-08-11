-- ============================================================
-- SEED DATA for BIG Insurance Website
-- Run AFTER 001_initial_schema.sql
-- ============================================================

-- SERVICES
INSERT INTO services (slug, name, short_description, long_description, icon_name, coverages, meta_title, meta_description, sort_order)
VALUES
(
  'home-insurance',
  'Home Insurance',
  'Protect your biggest investment with comprehensive home coverage tailored for Mississauga homeowners.',
  'Your home is likely your most valuable asset. Sharan compares 30+ insurers to find the coverage that actually fits — whether you own a detached home, condo, or rental property in Mississauga. We go beyond the basics to make sure you''re protected when it matters most.',
  'Home',
  '[
    {"title": "Dwelling Coverage", "description": "Rebuilding costs if your home is damaged by fire, storm, or other covered events"},
    {"title": "Personal Property", "description": "Replacement of furniture, electronics, clothing, and valuables"},
    {"title": "Additional Living Expenses", "description": "Hotel and living costs if your home becomes temporarily uninhabitable"},
    {"title": "Liability Protection", "description": "Coverage if someone is injured on your property"},
    {"title": "Overland Water", "description": "Protection against flooding — now available in most Mississauga policies"},
    {"title": "Earthquake & Sewer Backup", "description": "Optional add-ons Sharan will recommend based on your property"}
  ]',
  'Home Insurance in Mississauga | Sharan Kaur Insurance',
  'Get the best home insurance rates in Mississauga. Sharan compares 30+ insurers for your home, condo, or rental property. Free quote in minutes.',
  1
),
(
  'auto-insurance',
  'Auto Insurance',
  'Ontario''s best auto rates — compared across 30+ carriers so you never overpay for your car insurance.',
  'Auto insurance is mandatory in Ontario, but overpaying isn''t. Sharan analyzes your driving profile across 30+ carriers to find you the best rate with the right coverage. Whether you drive daily in Mississauga traffic or only on weekends, there''s a policy that fits.',
  'Car',
  '[
    {"title": "Third Party Liability", "description": "Mandatory coverage — protects you if you injure someone or damage their property"},
    {"title": "Accident Benefits", "description": "Medical, rehabilitation, and income replacement if you''re injured in an accident"},
    {"title": "Uninsured Automobile", "description": "Protection against uninsured or hit-and-run drivers"},
    {"title": "Collision", "description": "Repair or replacement if your car is in an accident"},
    {"title": "Comprehensive", "description": "Protection against theft, fire, weather, and vandalism"},
    {"title": "OPCF Endorsements", "description": "Custom add-ons like rental vehicle, accident forgiveness, and waiver of depreciation"}
  ]',
  'Auto Insurance in Mississauga | Sharan Kaur Insurance',
  'Find the lowest auto insurance rates in Mississauga. Compare 30+ Ontario insurers with broker Sharan. Save hundreds on your car insurance today.',
  2
),
(
  'life-insurance',
  'Life Insurance',
  'Protect your family''s financial future with the right life insurance — explained simply, without the pressure.',
  'Life insurance is one of the most important financial decisions you''ll make for your family — and one of the most misunderstood. Sharan takes the time to explain your options in plain language and finds coverage that fits your life stage, income, and goals.',
  'Heart',
  '[
    {"title": "Term Life Insurance", "description": "Affordable coverage for a set period — ideal for young families and mortgage protection"},
    {"title": "Whole Life Insurance", "description": "Permanent coverage with a cash value component that grows over time"},
    {"title": "Universal Life", "description": "Flexible premiums and investment options for long-term financial planning"},
    {"title": "Critical Illness", "description": "Lump sum payment if you''re diagnosed with a covered illness like cancer or heart attack"},
    {"title": "Disability Insurance", "description": "Income replacement if you can''t work due to illness or injury"},
    {"title": "Mortgage Protection", "description": "Ensures your mortgage is paid off if something happens to you"}
  ]',
  'Life Insurance in Mississauga | Sharan Kaur Insurance',
  'Get the right life insurance coverage in Mississauga. Sharan explains your options clearly and compares the best policies for your family. Free consultation.',
  3
),
(
  'business-insurance',
  'Business Insurance',
  'Comprehensive commercial coverage for Mississauga small businesses — from startup to scaling.',
  'Running a business in Mississauga means dealing with unique local risks. Sharan understands the commercial insurance landscape and builds custom packages for small businesses, contractors, retailers, and professionals. Protect your livelihood with coverage that works as hard as you do.',
  'Briefcase',
  '[
    {"title": "Commercial General Liability", "description": "Protection if a client is injured or property is damaged in connection with your business"},
    {"title": "Commercial Property", "description": "Coverage for your building, equipment, and inventory"},
    {"title": "Business Interruption", "description": "Revenue replacement if a covered event forces you to temporarily close"},
    {"title": "Professional Liability (E&O)", "description": "Essential for consultants, contractors, and professionals against claims of negligence"},
    {"title": "Commercial Auto", "description": "Vehicle insurance for company cars, delivery vans, or fleets"},
    {"title": "Cyber Liability", "description": "Protection against data breaches and cyber attacks — increasingly important for all businesses"}
  ]',
  'Business Insurance in Mississauga | Sharan Kaur Insurance',
  'Protect your Mississauga business with the right commercial insurance. Sharan builds custom coverage packages for small businesses. Get a free quote today.',
  4
);

-- TESTIMONIALS
INSERT INTO testimonials (client_name, service_type, rating, review_text, source, is_approved, is_featured, display_order)
VALUES
(
  'Priya M.',
  'home',
  5,
  'Sharan saved me over $600 on my home insurance renewal. She took the time to actually explain what I was covered for — something my previous broker never did. I felt like I was talking to a friend who happened to know everything about insurance.',
  'google',
  true,
  true,
  1
),
(
  'David K.',
  'auto',
  5,
  'I''d been with the same auto insurer for 8 years assuming I had a good rate. Sharan compared my options and found me the same coverage for $420 less per year. Wish I''d called her sooner. The whole process took about 20 minutes.',
  'google',
  true,
  true,
  2
),
(
  'Amandeep S.',
  'business',
  5,
  'Setting up business insurance for my restaurant was overwhelming until I contacted Sharan. She was patient, thorough, and made sure I had the right coverage without over-insuring. She''s now handling all three of my locations.',
  'google',
  true,
  true,
  3
),
(
  'Jessica L.',
  'life',
  5,
  'Sharan explained life insurance in a way I finally understood. No jargon, no pressure. She helped me figure out exactly how much coverage my family needed and found a term policy that fit our budget. Highly recommend.',
  'google',
  true,
  false,
  4
),
(
  'Rajan P.',
  'home',
  5,
  'After my basement flooded, I was worried my claim would be a nightmare. Sharan was on the phone with me within the hour, guided me through every step, and advocated for us with the insurer. That''s the difference a broker makes.',
  'google',
  true,
  true,
  5
),
(
  'Sarah T.',
  'auto',
  5,
  'Moved to Mississauga from BC and had no idea how Ontario auto insurance worked. Sharan walked me through everything — mandatory coverages, optional add-ons, accident benefits. Found me a great rate with Intact. 10/10.',
  'google',
  true,
  false,
  6
),
(
  'Michael C.',
  'business',
  5,
  'As a contractor, getting the right liability coverage is essential. Sharan understood my business immediately and put together a package that covers all the scenarios I worry about. Very responsive and professional.',
  'google',
  true,
  false,
  7
),
(
  'Fatima A.',
  'home',
  5,
  'Sharan reviewed my existing policy and found gaps I didn''t know I had — no sewer backup coverage on a 30-year-old house! She fixed everything and actually lowered my premium. I tell everyone in my neighbourhood about her.',
  'google',
  true,
  false,
  8
);

-- SETTINGS (default values)
INSERT INTO settings (key, value, value_type)
VALUES
('business_name', 'Sharan Kaur Insurance', 'string'),
('broker_name', 'Sharan', 'string'),
('phone', '647.501.8013', 'string'),
('email', 'sharan@thebig.ca', 'string'),
('website', 'thebig.ca/Sharan', 'string'),
('address', '105D-135 Matheson Blvd West, Mississauga, ON L5R 3L1', 'string'),
('hours_weekday', 'Monday – Friday: 9:00 AM – 6:00 PM', 'string'),
('hours_saturday', 'Saturday: 10:00 AM – 3:00 PM', 'string'),
('hours_sunday', 'Sunday: By appointment', 'string'),
('google_rating', '4.9', 'number'),
('review_count', '127', 'number'),
('clients_protected', '500', 'number'),
('insurers_compared', '30', 'number'),
('years_experience', '8', 'number'),
('email_new_lead_notify', 'true', 'boolean'),
('email_contact_notify', 'true', 'boolean'),
('tagline', 'Think BIG.', 'string')
ON CONFLICT (key) DO NOTHING;
