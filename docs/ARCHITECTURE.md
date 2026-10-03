# POLARIS Architecture Specification
## Smart India Hackathon 2026 — Problem Statement 26063
### "Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal"

```
                              ┌────────────────────────────────────────┐
                              │        PUBLIC USERS / STUDENTS         │
                              │   RESEARCHERS / EDUCATORS / ADMINS     │
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                        ┌──────────────────────────────────────────────────┐
                        │              NEXT.JS 16 FRONTEND                 │
                        │       (TypeScript, Tailwind CSS, Recharts)       │
                        ├──────────────────────────────────────────────────┤
                        │ • Expedition Journal Aesthetic (Warm Earth Tones)│
                        │ • Interactive Polar Stereographic Map (Leaflet)  │
                        │ • Virtual Station Isometric 3D Visualizer        │
                        │ • Full Semantic AI Search & QA Assistant         │
                        │ • Interactive Education Academy & Quiz Engine    │
                        │ • Automated Media Outreach Generator             │
                        │ • Real-Time Role Switcher for Jury Demonstration │
                        └─────────┬──────────────────────────────┬─────────┘
                                  │                              │
                    REST API JSON │                              │ Direct SSR /
                     (Port 8000)  ▼                              │ Client Fallback
                        ┌──────────────────────────────────┐     │
                        │      FASTAPI PYTHON BACKEND      │     │
                        ├──────────────────────────────────┤     │
                        │ • Pydantic V2 Request Validation │     │
                        │ • Deterministic AI & Citations   │◄────┘
                        │ • Document Simplifier (3 levels) │
                        │ • Media Studio Generator Engine  │
                        │ • Telemetry Ingestion Pipeline   │
                        │ • Admin Content CRUD Management  │
                        └─────────────────┬────────────────┘
                                          │
                                          ▼
                        ┌──────────────────────────────────┐
                        │      POSTGRESQL / SUPABASE       │
                        ├──────────────────────────────────┤
                        │ 22 Normalized Relational Tables: │
                        │ • stations, expeditions, members │
                        │ • publications, datasets, media  │
                        │ • quiz_questions, attempts, XP   │
                        │ • bookmarks, ai_conversations    │
                        │ • analytics_events & telemetry   │
                        └──────────────────────────────────┘
```

---

## 1. System Design Principles

1. **Expedition Journal + Modern Knowledge Platform Aesthetic**:
   - Styled using custom warm earth tones (`#F4E9D8`, `#FFF8ED`, `#3B261C`, `#76543F`, `#A67C5B`, `#B49A82`).
   - Integrated topographic contours, nautical lat/long graticules, and clean serif editorial typography (DM Serif Display + Inter + IBM Plex Mono).
2. **Deterministic Offline Demo Resiliency**:
   - The application does not break when external paid AI or mapping API keys are missing.
   - Built-in calibrated local knowledge embeddings and realistic data models guarantee 100% feature availability during jury judging.
3. **Decoupled Full-Stack Architecture**:
   - High-throughput Python FastAPI microservices handle complex AI matching, document transformation, and outreach synthesis.
   - Next.js 16 provides instant server-side page generation, reactive state management, and smooth responsive animations.
