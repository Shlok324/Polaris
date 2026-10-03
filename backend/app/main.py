"""
POLARIS: Polar Knowledge, Research, Intelligence & Outreach System
FastAPI Backend Application
Smart India Hackathon 2026 - Problem Statement 26063
"""

from fastapi import FastAPI, Query, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime

from app.schemas.models import (
    ResearchStation, Expedition, Publication, Dataset,
    MediaAsset, EducationalModule, QuizSubmission,
    AIChatRequest, AISimplifyRequest, MediaGenerateRequest
)
from app.data.seed_data import (
    RESEARCH_STATIONS, EXPEDITIONS, PUBLICATIONS,
    DATASETS, MEDIA_ASSETS, EDUCATIONAL_MODULES, ANALYTICS_DATA
)
from app.services.ai_service import polaris_ai
from app.services.media_service import polaris_media

app = FastAPI(
    title="POLARIS API",
    description="Backend API for Polar Knowledge, Research, Intelligence & Outreach System",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage copy for dynamic admin updates during the demo
stations_store = list(RESEARCH_STATIONS)
expeditions_store = list(EXPEDITIONS)
publications_store = list(PUBLICATIONS)
datasets_store = list(DATASETS)
media_store = list(MEDIA_ASSETS)
modules_store = list(EDUCATIONAL_MODULES)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "system": "POLARIS",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

# -------------------------------------------------------------
# Research Stations Endpoints
# -------------------------------------------------------------
@app.get("/api/stations", response_model=List[Dict[str, Any]])
def get_stations(region: Optional[str] = None):
    results = stations_store
    if region and region != "All":
        results = [s for s in results if s["region"].lower() == region.lower()]
    return results

@app.get("/api/stations/{station_id}")
def get_station_detail(station_id: str):
    for s in stations_store:
        if s["id"] == station_id or s["name"].lower() == station_id.lower():
            # Attach related expeditions, publications, and datasets
            related_exps = [e for e in expeditions_store if s["name"].lower() in e["name"].lower() or s["region"].lower() == e["region"].lower()]
            related_pubs = [p for p in publications_store if p.get("station_name", "").lower() == s["name"].lower()]
            related_dsets = [d for d in datasets_store if d.get("station_name", "").lower() == s["name"].lower()]
            related_media = [m for m in media_store if m.get("station_name", "").lower() == s["name"].lower()]
            return {
                **s,
                "related_expeditions": related_exps[:3],
                "related_publications": related_pubs[:4],
                "related_datasets": related_dsets[:3],
                "related_media": related_media[:4]
            }
    raise HTTPException(status_code=404, detail="Station not found")

# -------------------------------------------------------------
# Expeditions Endpoints
# -------------------------------------------------------------
@app.get("/api/expeditions", response_model=List[Dict[str, Any]])
def get_expeditions(region: Optional[str] = None, year: Optional[int] = None):
    results = expeditions_store
    if region and region != "All":
        results = [e for e in results if e["region"].lower() == region.lower()]
    if year:
        results = [e for e in results if e["year"] == year]
    return results

@app.get("/api/expeditions/{expedition_id}")
def get_expedition_detail(expedition_id: str):
    for e in expeditions_store:
        if e["id"] == expedition_id or e["expedition_number"].lower() == expedition_id.lower():
            related_media = [m for m in media_store if m.get("expedition_name", "").lower() == e["expedition_number"].lower()]
            return {
                **e,
                "media": related_media
            }
    raise HTTPException(status_code=404, detail="Expedition not found")

# -------------------------------------------------------------
# Publications Endpoints
# -------------------------------------------------------------
@app.get("/api/publications")
def get_publications(
    region: Optional[str] = None,
    domain: Optional[str] = None,
    station: Optional[str] = None,
    year: Optional[int] = None,
    sort_by: str = "newest",
    page: int = 1,
    limit: int = 20
):
    results = list(publications_store)
    if region and region != "All":
        results = [p for p in results if p["region"].lower() == region.lower()]
    if domain and domain != "All":
        results = [p for p in results if domain.lower() in p["domain_name"].lower()]
    if station and station != "All":
        results = [p for p in results if p.get("station_name", "").lower() == station.lower()]
    if year:
        results = [p for p in results if p["year"] == year]

    if sort_by == "oldest":
        results.sort(key=lambda x: x["year"])
    elif sort_by == "most_viewed":
        results.sort(key=lambda x: x.get("view_count", 0), reverse=True)
    elif sort_by == "most_cited":
        results.sort(key=lambda x: x.get("citations_count", 0), reverse=True)
    else:  # newest
        results.sort(key=lambda x: x["publication_date"], reverse=True)

    total = len(results)
    start = (page - 1) * limit
    paged = results[start:start + limit]
    return {
        "items": paged,
        "total": total,
        "page": page,
        "limit": limit
    }

@app.get("/api/publications/{pub_id}")
def get_publication_detail(pub_id: str):
    for p in publications_store:
        if p["id"] == pub_id or p.get("record_id") == pub_id:
            return p
    raise HTTPException(status_code=404, detail="Publication not found")

# -------------------------------------------------------------
# Datasets Endpoints
# -------------------------------------------------------------
@app.get("/api/datasets")
def get_datasets(
    region: Optional[str] = None,
    format_type: Optional[str] = None,
    page: int = 1,
    limit: int = 20
):
    results = list(datasets_store)
    if region and region != "All":
        results = [d for d in results if d["region"].lower() == region.lower()]
    if format_type and format_type != "All":
        results = [d for d in results if d["format"].lower() == format_type.lower()]
    total = len(results)
    start = (page - 1) * limit
    return {
        "items": results[start:start + limit],
        "total": total,
        "page": page,
        "limit": limit
    }

@app.get("/api/datasets/{dataset_id}")
def get_dataset_detail(dataset_id: str):
    for d in datasets_store:
        if d["id"] == dataset_id or d.get("record_id") == dataset_id:
            return d
    raise HTTPException(status_code=404, detail="Dataset not found")

# -------------------------------------------------------------
# Media Assets Endpoints
# -------------------------------------------------------------
@app.get("/api/media")
def get_media_assets(region: Optional[str] = None, media_type: Optional[str] = None):
    results = media_store
    if region and region != "All":
        results = [m for m in results if m["region"].lower() == region.lower()]
    if media_type and media_type != "All":
        results = [m for m in results if m["media_type"].lower() == media_type.lower()]
    return results

# -------------------------------------------------------------
# Global Repository Search & Suggestions
# -------------------------------------------------------------
@app.get("/api/repository/search")
def global_search(query: str = "", content_type: Optional[str] = "all"):
    q = query.lower().strip()
    pubs = [p for p in publications_store if not q or q in p["title"].lower() or q in p["abstract"].lower() or any(q in k.lower() for k in p["keywords"])]
    dsets = [d for d in datasets_store if not q or q in d["title"].lower() or any(q in p.lower() for p in d["parameters"])]
    exps = [e for e in expeditions_store if not q or q in e["name"].lower() or q in e["description"].lower()]
    stats = [s for s in stations_store if not q or q in s["name"].lower() or q in s["location_name"].lower()]
    media = [m for m in media_store if not q or q in m["title"].lower() or any(q in t.lower() for t in m["tags"])]

    return {
        "query": query,
        "counts": {
            "publications": len(pubs),
            "datasets": len(dsets),
            "expeditions": len(exps),
            "stations": len(stats),
            "media": len(media),
            "total": len(pubs) + len(dsets) + len(exps) + len(stats) + len(media)
        },
        "publications": pubs,
        "datasets": dsets,
        "expeditions": exps,
        "stations": stats,
        "media": media
    }

# -------------------------------------------------------------
# AI Endpoints: Semantic Search, QA Assistant, Document Simplifier
# -------------------------------------------------------------
@app.get("/api/search/semantic")
def semantic_search(query: str = Query(..., min_length=2)):
    return polaris_ai.semantic_search(query)

@app.post("/api/ai/chat")
def ai_chat(req: AIChatRequest):
    return polaris_ai.chat_answer(req.question, req.context_type, req.context_id)

@app.post("/api/ai/summarize")
def ai_summarize(req: AISimplifyRequest):
    return polaris_ai.simplify_document(req.text, req.target_audience, req.item_id)

# -------------------------------------------------------------
# Education Hub & Interactive Quiz
# -------------------------------------------------------------
@app.get("/api/education")
def get_educational_modules():
    return modules_store

@app.get("/api/education/{slug}")
def get_educational_module_detail(slug: str):
    for m in modules_store:
        if m["slug"] == slug or m["id"] == slug:
            return m
    raise HTTPException(status_code=404, detail="Educational module not found")

@app.post("/api/quizzes/submit")
def submit_quiz(submission: QuizSubmission):
    target_module = None
    for m in modules_store:
        if m["id"] == submission.module_id or m["slug"] == submission.module_id:
            target_module = m
            break
    if not target_module:
        raise HTTPException(status_code=404, detail="Module not found")

    quiz_questions = target_module["quiz"]
    total_questions = len(quiz_questions)
    correct_count = 0
    feedback = []

    for q in quiz_questions:
        q_id = q["id"]
        selected = submission.answers.get(q_id)
        is_correct = (selected == q["correct_option_index"])
        if is_correct:
            correct_count += 1
        feedback.append({
            "question_id": q_id,
            "question_text": q["question_text"],
            "selected_option_index": selected,
            "correct_option_index": q["correct_option_index"],
            "is_correct": is_correct,
            "explanation": q["explanation"]
        })

    score_percentage = int((correct_count / total_questions) * 100) if total_questions > 0 else 0
    points_earned = target_module["points_reward"] if score_percentage >= 70 else int(target_module["points_reward"] * (score_percentage / 100))

    badges_unlocked = []
    if score_percentage == 100:
        badges_unlocked.append({"name": "Polar Gold Medalist", "desc": "100% score on Antarctic Knowledge"})
    elif score_percentage >= 70:
        badges_unlocked.append({"name": "Antarctic Apprentice", "desc": "Passed Polar Assessment"})

    return {
        "module_id": submission.module_id,
        "score_percentage": score_percentage,
        "correct_count": correct_count,
        "total_questions": total_questions,
        "is_passed": score_percentage >= 70,
        "points_earned": points_earned,
        "feedback": feedback,
        "badges_unlocked": badges_unlocked
    }

# -------------------------------------------------------------
# Media Studio Generator
# -------------------------------------------------------------
@app.post("/api/media/generate")
def generate_media_outreach(req: MediaGenerateRequest):
    return polaris_media.generate_content(
        content_id=req.content_id,
        content_text=req.content_text,
        content_title=req.content_title,
        output_type=req.output_type,
        tone=req.tone
    )

# -------------------------------------------------------------
# Analytics Dashboard Endpoint
# -------------------------------------------------------------
@app.get("/api/analytics")
def get_analytics():
    return ANALYTICS_DATA

# -------------------------------------------------------------
# Admin Dashboard / Content Management System
# -------------------------------------------------------------
@app.post("/api/admin/publications")
def create_publication(pub: Dict[str, Any] = Body(...)):
    new_id = f"pub-{uuid.uuid4().hex[:6]}"
    record_id = pub.get("record_id") or f"POLARIS-PUB-{datetime.now().year}-{str(len(publications_store)+1).zfill(3)}"
    new_item = {
        "id": new_id,
        "record_id": record_id,
        "title": pub["title"],
        "authors": pub.get("authors", ["Polaris Research Team"]),
        "year": int(pub.get("year", 2026)),
        "publication_date": pub.get("publication_date", datetime.now().strftime("%Y-%m-%d")),
        "journal": pub.get("journal", "Polaris Science Journal"),
        "doi": pub.get("doi", f"10.1029/polaris.{uuid.uuid4().hex[:8]}"),
        "region": pub.get("region", "Antarctica"),
        "station_name": pub.get("station_name", "Bharati"),
        "domain_name": pub.get("domain_name", "Atmospheric Sciences"),
        "abstract": pub.get("abstract", "Scientific field findings and observational summary."),
        "simplified_school": pub.get("simplified_school", "Indian scientists studied polar conditions to safeguard our future climate."),
        "simplified_college": pub.get("simplified_college", "Analysis of long-term cryospheric and atmospheric telemetry."),
        "executive_summary": pub.get("executive_summary", "Field campaign completes mission goals."),
        "keywords": pub.get("keywords", ["polar", "research"]),
        "download_url": pub.get("download_url", f"/api/publications/download/{record_id}.pdf"),
        "citations_count": 0,
        "view_count": 1,
        "status": pub.get("status", "Published")
    }
    publications_store.insert(0, new_item)
    return {"message": "Publication created successfully", "item": new_item}

@app.delete("/api/admin/publications/{pub_id}")
def delete_publication(pub_id: str):
    global publications_store
    publications_store = [p for p in publications_store if p["id"] != pub_id and p.get("record_id") != pub_id]
    return {"message": "Publication removed", "id": pub_id}

@app.post("/api/admin/datasets")
def create_dataset(ds: Dict[str, Any] = Body(...)):
    new_id = f"ds-{uuid.uuid4().hex[:6]}"
    record_id = ds.get("record_id") or f"POLARIS-DS-{datetime.now().year}-{str(len(datasets_store)+1).zfill(3)}"
    new_item = {
        "id": new_id,
        "record_id": record_id,
        "title": ds["title"],
        "region": ds.get("region", "Antarctica"),
        "station_name": ds.get("station_name", "Bharati"),
        "domain_name": ds.get("domain_name", "Glaciology"),
        "year": int(ds.get("year", 2026)),
        "format": ds.get("format", "NetCDF"),
        "file_size_mb": float(ds.get("file_size_mb", 45.0)),
        "temporal_coverage": ds.get("temporal_coverage", "2024–2026"),
        "spatial_coverage": ds.get("spatial_coverage", "Larsemann Hills"),
        "download_url": ds.get("download_url", f"/api/datasets/download/{record_id}"),
        "parameters": ds.get("parameters", ["temperature", "ice_depth"]),
        "status": ds.get("status", "Published")
    }
    datasets_store.insert(0, new_item)
    return {"message": "Dataset created successfully", "item": new_item}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
