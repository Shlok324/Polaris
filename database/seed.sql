-- ====================================================================
-- POLARIS: Polar Knowledge, Research, Intelligence & Outreach System
-- Seed Data for Smart India Hackathon Demonstration
-- ====================================================================

-- 1. Roles
INSERT INTO roles (id, name, description) VALUES
('11111111-1111-1111-1111-111111111101', 'admin', 'System Administrator with full management rights'),
('11111111-1111-1111-1111-111111111102', 'researcher', 'Polar Scientist / Researcher with contribution rights'),
('11111111-1111-1111-1111-111111111103', 'educator', 'Teacher/Curator for educational polar modules'),
('11111111-1111-1111-1111-111111111104', 'student', 'Student learner with progress tracking & quizzes'),
('11111111-1111-1111-1111-111111111105', 'public', 'General public visitor with discovery access')
ON CONFLICT (name) DO NOTHING;

-- 2. Institutions
INSERT INTO institutions (id, name, acronym, location, website_url, description) VALUES
('22222222-2222-2222-2222-222222222201', 'National Centre for Polar and Ocean Research', 'NCPOR', 'Vasco da Gama, Goa', 'https://ncpor.res.in', 'Premier nodal agency under MoES for Antarctic, Arctic, Southern Ocean and Himalayan research.'),
('22222222-2222-2222-2222-222222222202', 'Ministry of Earth Sciences', 'MoES', 'New Delhi', 'https://moes.gov.in', 'Government ministry overseeing India atmospheric, oceanic and polar expeditions.'),
('22222222-2222-2222-2222-222222222203', 'India Meteorological Department', 'IMD', 'New Delhi', 'https://mausam.imd.gov.in', 'National meteorological agency providing long-term Antarctic atmospheric monitoring.'),
('22222222-2222-2222-2222-222222222204', 'Geological Survey of India', 'GSI', 'Kolkata, West Bengal', 'https://gsi.gov.in', 'Geological investigations in Queen Maud Land and Schirmacher Oasis.'),
('22222222-2222-2222-2222-222222222205', 'Survey of India', 'SOI', 'Dehradun, Uttarakhand', 'https://surveyofindia.gov.in', 'Geodetic observations, GPS tracking, and topographic mapping of polar bases.')
ON CONFLICT DO NOTHING;

-- 3. Research Domains
INSERT INTO research_domains (id, name, slug, description, icon_name, color_hex) VALUES
('33333333-3333-3333-3333-333333333301', 'Atmospheric Sciences & Meteorology', 'atmospheric-sciences', 'Upper atmosphere dynamics, ozone depletion, greenhouse gas fluxes, and extreme blizzard tracking.', 'CloudSun', '#76543F'),
('33333333-3333-3333-3333-333333333302', 'Glaciology & Cryospheric Studies', 'glaciology', 'Ice sheet mass balance, ice core paleoclimate drilling, and glacier velocity radar surveys.', 'MountainSnow', '#523528'),
('33333333-3333-3333-3333-333333333303', 'Southern Ocean & Polar Oceanography', 'oceanography', 'Circumpolar deep water, sea-ice thermodynamics, and Antarctic Bottom Water formation.', 'Waves', '#3B261C'),
('33333333-3333-3333-3333-333333333304', 'Polar Biology & Extremophile Microbiology', 'biology', 'Psychrophilic bacteria, lichen biodiversity, moss ecosystems, and penguin ecology.', 'Leaf', '#A67C5B'),
('33333333-3333-3333-3333-333333333305', 'Geology, Geophysics & Paleomagnetism', 'geology', 'Gondwanaland reconstruction, lithospheric crustal structure, and tectonic evolution.', 'Layers', '#8C6747'),
('33333333-3333-3333-3333-333333333306', 'Space Weather & Geomagnetism', 'space-weather', 'Auroral observations, geomagnetic pulsation recording, and ionospheric scintillation.', 'Radio', '#B49A82')
ON CONFLICT DO NOTHING;

-- 4. Research Stations
INSERT INTO research_stations (id, name, alternate_name, region, location_name, latitude, longitude, elevation_m, established_year, status, description, climate_info, facilities) VALUES
('44444444-4444-4444-4444-444444444401', 'Bharati', 'Bharati Research Station', 'Antarctica', 'Larsemann Hills, East Antarctica', -69.407778, 76.187222, 35, 2012, 'Active', 'India third Antarctic research facility and primary state-of-the-art laboratory hub constructed using 134 prefabricated shipping containers. Features year-round high-speed satellite connectivity, optical cleanroom, LIDAR facility, and zero-effluent discharge eco-treatment.', '{"mean_temp_c": -12.5, "min_temp_c": -41.2, "max_wind_kmh": 210, "polar_night_days": 65}'::jsonb, '["Oceanography Lab", "Atmospheric LIDAR Shelter", "Satellite Telemetry Dish", "Automated Weather Station", "Greenhouse Unit", "Infirmary"]'::jsonb),
('44444444-4444-4444-4444-444444444402', 'Maitri', 'Maitri Research Station', 'Antarctica', 'Schirmacher Oasis, Queen Maud Land', -70.766111, 11.730556, 117, 1989, 'Active', 'India second permanent Antarctic research base, situated on an ice-free rocky plateau near Lake Priyadarshini. Operating continuously for over 35 years supporting geomagnetic, meteorological, and medical physiology studies.', '{"mean_temp_c": -10.2, "min_temp_c": -38.4, "max_wind_kmh": 195, "polar_night_days": 55}'::jsonb, '["Geomagnetic Observatory", "Priyadarshini Water Treatment", "Seismology Vault", "Meteorological Mast", "Living Quarters", "Helipad"]'::jsonb),
('44444444-4444-4444-4444-444444444403', 'Himadri', 'Himadri Arctic Station', 'Arctic', 'Ny-Ålesund, Spitsbergen, Svalbard, Norway', 78.923611, 11.922222, 15, 2008, 'Active', 'India permanent Arctic research station located at the world northernmost scientific settlement in Svalbard, investigating Arctic amplification, fjord hydrology, and long-range atmospheric pollutants.', '{"mean_temp_c": -4.8, "min_temp_c": -29.6, "max_wind_kmh": 140, "polar_night_days": 115}'::jsonb, '["Marine Biology Wet Lab", "Aerosol Sampler", "Long-term UV Spectrometer", "Cryosphere Field Depot"]'::jsonb),
('44444444-4444-4444-4444-444444444404', 'Himansh', 'Himansh High-Altitude Station', 'Himalayas / Third Pole', 'Chandra Basin, Spiti Valley, Himachal Pradesh', 32.418056, 77.618611, 4080, 2016, 'Active', 'India dedicated high-altitude Himalayan research outpost monitoring Sutlej and Indus basin glaciers, permafrost thaw, avalanche forecasting, and snow-melt hydrology.', '{"mean_temp_c": -1.2, "min_temp_c": -34.0, "max_wind_kmh": 120, "annual_snowfall_m": 4.5}'::jsonb, '["Deep Glacier Radar", "Automatic Snow Gauges", "Solar Power Array", "Satellite Uplink Base"]'::jsonb),
('44444444-4444-4444-4444-444444444405', 'IndARC', 'IndARC Underwater Observatory', 'Arctic', 'Kongsfjorden, Svalbard (Depth: 192m)', 78.983333, 12.016667, -192, 2014, 'Active', 'India first underwater multisensor moored observatory deployed in Kongsfjorden fjord to record real-time year-round oceanographic data and seasonal deep inflow of Atlantic waters.', '{"depth_m": 192, "water_temp_c": 1.4, "salinity_psu": 34.8}'::jsonb, '["Acoustic Doppler Current Profiler", "CTD Sensors", "Dissolved Oxygen Optode", "Fluorescence Turbidity Meter"]'::jsonb)
ON CONFLICT DO NOTHING;
