from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import date, datetime

class StationTelemetry(BaseModel):
    temperature_c: float
    wind_speed_kmh: float
    wind_direction: str
    pressure_hpa: float
    relative_humidity: float
    solar_radiation_wm2: float
    status: str
    last_updated: str

class ResearchStation(BaseModel):
    id: str
    name: str
    alternate_name: str
    region: str
    location_name: str
    latitude: float
    longitude: float
    elevation_m: int
    established_year: int
    status: str
    description: str
    climate_info: Dict[str, Any]
    facilities: List[str]
    image_url: str
    virtual_tour_url: Optional[str] = None
    telemetry: Optional[StationTelemetry] = None
    timeline: Optional[List[Dict[str, Any]]] = None

class Expedition(BaseModel):
    id: str
    expedition_number: str
    name: str
    region: str
    voyage_type: str
    leader_name: str
    vessel_name: str
    start_date: str
    end_date: str
    year: int
    status: str
    description: str
    objectives: List[str]
    research_domains: List[str]
    researchers_count: int
    publications_count: int
    datasets_count: int
    route_coordinates: List[Dict[str, float]]
    timeline_events: Optional[List[Dict[str, Any]]] = None

class Publication(BaseModel):
    id: str
    title: str
    authors: List[str]
    year: int
    publication_date: str
    journal: str
    doi: str
    record_id: str
    region: str
    station_id: Optional[str] = None
    station_name: Optional[str] = None
    domain_id: Optional[str] = None
    domain_name: str
    abstract: str
    simplified_school: str
    simplified_college: str
    executive_summary: str
    keywords: List[str]
    download_url: str
    citations_count: int
    view_count: int
    status: str

class Dataset(BaseModel):
    id: str
    title: str
    record_id: str
    region: str
    station_id: Optional[str] = None
    station_name: Optional[str] = None
    domain_name: str
    year: int
    format: str
    file_size_mb: float
    temporal_coverage: str
    spatial_coverage: str
    download_url: str
    parameters: List[str]
    status: str

class MediaAsset(BaseModel):
    id: str
    title: str
    media_type: str  # Photograph, Video, Audio, Infographic
    caption: str
    photographer_author: str
    year: int
    region: str
    station_name: Optional[str] = None
    expedition_name: Optional[str] = None
    file_url: str
    thumbnail_url: str
    tags: List[str]
    resolution: str

class QuizQuestion(BaseModel):
    id: str
    question_text: str
    options: List[str]
    correct_option_index: int
    explanation: str
    points: int = 25

class EducationalModule(BaseModel):
    id: str
    title: str
    slug: str
    target_audience: str  # School, College, Researchers, General Public
    category: str
    reading_time_mins: int
    points_reward: int
    summary: str
    sections: List[Dict[str, Any]]
    quiz: List[QuizQuestion]
    thumbnail_url: str
    is_featured: bool

class QuizSubmission(BaseModel):
    module_id: str
    user_id: Optional[str] = "demo-student-01"
    answers: Dict[str, int]  # question_id -> selected_option_index

class AIChatRequest(BaseModel):
    question: str
    conversation_id: Optional[str] = None
    context_type: Optional[str] = None  # general, station, publication, dataset
    context_id: Optional[str] = None

class AISimplifyRequest(BaseModel):
    text: str
    target_audience: str = "school"  # school, college, executive
    item_id: Optional[str] = None

class MediaGenerateRequest(BaseModel):
    content_id: Optional[str] = None
    content_text: Optional[str] = None
    content_title: Optional[str] = None
    output_type: str = "instagram"  # instagram, linkedin, article, video_script, infographic, press_summary
    tone: Optional[str] = "inspirational"  # inspirational, academic, youth-focused
