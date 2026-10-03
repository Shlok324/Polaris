-- ====================================================================
-- POLARIS: Polar Knowledge, Research, Intelligence & Outreach System
-- Smart India Hackathon 2026 - Problem Statement 26063
-- Database Schema: PostgreSQL / Supabase Compatible
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL, -- 'public', 'student', 'researcher', 'educator', 'admin'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    full_name VARCHAR(150) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    organization VARCHAR(200),
    designation VARCHAR(150),
    avatar_url TEXT,
    knowledge_points INTEGER DEFAULT 0,
    badges JSONB DEFAULT '[]'::jsonb,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Institutions Table
CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    acronym VARCHAR(50) NOT NULL,
    location VARCHAR(200),
    website_url TEXT,
    description TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Researchers Table
CREATE TABLE IF NOT EXISTS researchers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
    full_name VARCHAR(200) NOT NULL,
    specialization VARCHAR(255),
    orcid_id VARCHAR(50),
    biography TEXT,
    expeditions_count INTEGER DEFAULT 0,
    publications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Research Stations Table
CREATE TABLE IF NOT EXISTS research_stations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    alternate_name VARCHAR(100),
    region VARCHAR(100) NOT NULL, -- 'Antarctica', 'Arctic', 'Himalayas / Third Pole', 'Southern Ocean'
    location_name VARCHAR(200) NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    elevation_m INTEGER DEFAULT 0,
    established_year INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'Active', -- 'Active', 'Decommissioned', 'Seasonal'
    description TEXT,
    climate_info JSONB DEFAULT '{}'::jsonb,
    facilities JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    virtual_tour_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Expeditions Table
CREATE TABLE IF NOT EXISTS expeditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expedition_number VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL,
    voyage_type VARCHAR(100), -- 'Antarctic Scientific Expedition', 'Arctic Summer', 'Southern Ocean Expedition'
    leader_name VARCHAR(150),
    vessel_name VARCHAR(150),
    start_date DATE,
    end_date DATE,
    year INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'Completed',
    description TEXT,
    objectives JSONB DEFAULT '[]'::jsonb,
    route_coordinates JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Expedition Members Table
CREATE TABLE IF NOT EXISTS expedition_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expedition_id UUID REFERENCES expeditions(id) ON DELETE CASCADE,
    researcher_id UUID REFERENCES researchers(id) ON DELETE CASCADE,
    role_in_expedition VARCHAR(150),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Research Domains Table
CREATE TABLE IF NOT EXISTS research_domains (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    color_hex VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Publications Table
CREATE TABLE IF NOT EXISTS publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    authors TEXT[] NOT NULL,
    year INTEGER NOT NULL,
    publication_date DATE,
    journal VARCHAR(255),
    doi VARCHAR(100),
    record_id VARCHAR(50) UNIQUE,
    region VARCHAR(100) NOT NULL,
    station_id UUID REFERENCES research_stations(id) ON DELETE SET NULL,
    domain_id UUID REFERENCES research_domains(id) ON DELETE SET NULL,
    abstract TEXT,
    simplified_school TEXT,
    simplified_college TEXT,
    executive_summary TEXT,
    keywords TEXT[] DEFAULT '{}',
    download_url TEXT,
    citations_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Datasets Table
CREATE TABLE IF NOT EXISTS datasets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    record_id VARCHAR(50) UNIQUE NOT NULL,
    region VARCHAR(100) NOT NULL,
    station_id UUID REFERENCES research_stations(id) ON DELETE SET NULL,
    domain_id UUID REFERENCES research_domains(id) ON DELETE SET NULL,
    year INTEGER NOT NULL,
    format VARCHAR(50) NOT NULL, -- NetCDF, CSV, GeoTIFF, HDF5, ASCII
    file_size_mb DECIMAL(10, 2),
    temporal_coverage VARCHAR(150),
    spatial_coverage VARCHAR(150),
    download_url TEXT,
    metadata_json JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(50) DEFAULT 'Published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Media Assets Table
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    media_type VARCHAR(50) NOT NULL, -- 'Photograph', 'Video', 'Audio', 'Infographic'
    caption TEXT,
    photographer_author VARCHAR(150),
    year INTEGER NOT NULL,
    region VARCHAR(100) NOT NULL,
    station_id UUID REFERENCES research_stations(id) ON DELETE SET NULL,
    expedition_id UUID REFERENCES expeditions(id) ON DELETE SET NULL,
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    tags TEXT[] DEFAULT '{}',
    resolution VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Institutional Activities Table
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    activity_type VARCHAR(100) NOT NULL, -- 'Outreach', 'Scientific Workshop', 'Expedition Flag-off', 'MoU'
    date DATE NOT NULL,
    description TEXT,
    organizer VARCHAR(150),
    participants_count INTEGER DEFAULT 0,
    region VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Tags Table
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Content Tags Table
CREATE TABLE IF NOT EXISTS content_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_type VARCHAR(50) NOT NULL, -- 'publication', 'dataset', 'media', 'expedition'
    content_id UUID NOT NULL,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE
);

-- 16. Bookmarks Table
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. Educational Modules Table
CREATE TABLE IF NOT EXISTS educational_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    target_audience VARCHAR(50) NOT NULL, -- 'School', 'College', 'Researchers', 'General Public'
    category VARCHAR(100) NOT NULL,
    reading_time_mins INTEGER DEFAULT 10,
    points_reward INTEGER DEFAULT 100,
    summary TEXT,
    content_markdown TEXT NOT NULL,
    thumbnail_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES educational_modules(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL, -- 'A', 'B', 'C', 'D'
    explanation TEXT,
    points INTEGER DEFAULT 25
);

-- 19. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    module_id UUID REFERENCES educational_modules(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    is_passed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 20. AI Conversations Table
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 21. AI Messages Table
CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant', 'system'
    content TEXT NOT NULL,
    sources_json JSONB DEFAULT '[]'::jsonb,
    tokens_used INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 22. Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL, -- 'search', 'view', 'download', 'ai_query', 'quiz_completed', 'media_generated'
    entity_type VARCHAR(50), -- 'publication', 'dataset', 'station', 'expedition', 'module'
    entity_id VARCHAR(100),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    metadata_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Performance Indexes
CREATE INDEX IF NOT EXISTS idx_publications_region ON publications(region);
CREATE INDEX IF NOT EXISTS idx_publications_station ON publications(station_id);
CREATE INDEX IF NOT EXISTS idx_publications_domain ON publications(domain_id);
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year);
CREATE INDEX IF NOT EXISTS idx_datasets_region ON datasets(region);
CREATE INDEX IF NOT EXISTS idx_datasets_format ON datasets(format);
CREATE INDEX IF NOT EXISTS idx_expeditions_year ON expeditions(year);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);
