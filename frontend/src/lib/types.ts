export interface StationTelemetry {
  temperature_c: number;
  wind_speed_kmh: number;
  wind_direction: string;
  pressure_hpa: number;
  relative_humidity: number;
  solar_radiation_wm2: number;
  status: string;
  last_updated: string;
}

export interface TimelineEvent {
  year?: number;
  date?: string;
  title: string;
  description?: string;
  desc?: string;
}

export interface ResearchStation {
  id: string;
  name: string;
  alternate_name: string;
  region: 'Antarctica' | 'Arctic' | 'Himalayas / Third Pole' | 'Southern Ocean';
  location_name: string;
  latitude: number;
  longitude: number;
  elevation_m: number;
  established_year: number;
  status: string;
  description: string;
  climate_info: Record<string, any>;
  facilities: string[];
  image_url: string;
  virtual_tour_url?: string;
  telemetry?: StationTelemetry;
  timeline?: TimelineEvent[];
  related_expeditions?: Expedition[];
  related_publications?: Publication[];
  related_datasets?: Dataset[];
  related_media?: MediaAsset[];
}

export interface RoutePoint {
  name: string;
  lat: number;
  lng: number;
}

export interface Expedition {
  id: string;
  expedition_number: string;
  name: string;
  region: string;
  voyage_type: string;
  leader_name: string;
  vessel_name: string;
  start_date: string;
  end_date: string;
  year: number;
  status: string;
  description: string;
  objectives: string[];
  research_domains: string[];
  researchers_count: number;
  publications_count: number;
  datasets_count: number;
  route_coordinates: RoutePoint[];
  timeline_events?: TimelineEvent[];
  media?: MediaAsset[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  publication_date: string;
  journal: string;
  doi: string;
  record_id: string;
  region: string;
  station_id?: string | null;
  station_name?: string;
  domain_id?: string | null;
  domain_name: string;
  abstract: string;
  simplified_school: string;
  simplified_college: string;
  executive_summary: string;
  keywords: string[];
  download_url: string;
  citations_count: number;
  view_count: number;
  status: string;
}

export interface Dataset {
  id: string;
  title: string;
  record_id: string;
  region: string;
  station_id?: string | null;
  station_name?: string;
  domain_name: string;
  year: number;
  format: string;
  file_size_mb: number;
  temporal_coverage: string;
  spatial_coverage: string;
  download_url: string;
  parameters: string[];
  status: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  media_type: string;
  caption: string;
  photographer_author: string;
  year: number;
  region: string;
  station_name?: string | null;
  expedition_name?: string | null;
  file_url: string;
  thumbnail_url: string;
  tags: string[];
  resolution: string;
}

export interface QuizQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
  points?: number;
}

export interface EducationalModule {
  id: string;
  title: string;
  slug: string;
  target_audience: string;
  category: string;
  reading_time_mins: number;
  points_reward: number;
  summary: string;
  thumbnail_url: string;
  is_featured: boolean;
  sections: { title: string; content: string }[];
  quiz: QuizQuestion[];
}

export interface Citation {
  citation_id: number;
  title: string;
  record_id: string;
  type: string;
}

export interface AISemanticResult {
  query: string;
  ai_summary: string;
  citations: Citation[];
  key_findings: string[];
  matched_publications: Publication[];
  matched_datasets: Dataset[];
  matched_expeditions: Expedition[];
  matched_stations: ResearchStation[];
  total_matches: number;
  confidence_score: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'public' | 'student' | 'researcher' | 'educator' | 'admin';
  institution: string;
  knowledge_points: number;
  badges: string[];
  bookmarked_ids: string[];
}
