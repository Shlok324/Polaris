# POLARIS: Polar Knowledge, Research, Intelligence & Outreach System

> **"India's Polar Knowledge, Connected."**  
> **Smart India Hackathon 2026 — Problem Statement 26063**  
> *"Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal"*

---

## 🌟 Executive Summary

**POLARIS** is a production-quality centralized digital ecosystem designed to connect, preserve, interpret, and disseminate over four decades of India's pioneering polar scientific research. Developed under the mandate of the **Ministry of Earth Sciences (MoES)** and the **National Centre for Polar and Ocean Research (NCPOR)**, POLARIS brings together:

- **Antarctica**: Bharati Station (Larsemann Hills), Maitri Base (Schirmacher Oasis), and Dakshin Gangotri memorial.
- **Arctic**: Himadri Research Station (Ny-Ålesund, Svalbard) and IndARC moored deep-ocean observatory (Kongsfjorden).
- **Himalayas / Third Pole**: Himansh High-Altitude Observatory (Chandra Basin, Spiti Valley, 4,080m).
- **Southern Ocean**: Multi-disciplinary oceanic cruise transects aboard ORV Sagar Kanya and chartered polar ice vessels.

---

## 🧭 The Central Philosophy

$$\text{DISCOVER} \longrightarrow \text{ORGANIZE} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{EXPLORE} \longrightarrow \text{LEARN} \longrightarrow \text{DISSEMINATE}$$

1. **DISCOVER**: Unified search index across 44 expedition reports, 1,000+ publications, and 500+ datasets.
2. **ORGANIZE**: Standardized OGC/ISO metadata schemas in NetCDF, CSV, GeoTIFF, and DOI preprints.
3. **UNDERSTAND**: Multi-level AI Knowledge Simplification for School Students, College Students, and Researchers.
4. **EXPLORE**: Interactive polar stereographic maps and 3D isometric station inspection.
5. **LEARN**: Curriculum-aligned educational modules with an interactive, scored quiz system.
6. **DISSEMINATE**: 1-click transformation of scientific research into Instagram carousels, 60-second video scripts, and press releases.

---

## 🎨 Visual Design Direction: Polar Expedition Journal

POLARIS strictly departs from generic SaaS dashboard aesthetics, implementing a **warm, tactile Antarctic Expedition Journal aesthetic**:
- **Background**: `#F4E9D8` (Warm polar parchment)
- **Cards**: `#FFF8ED` (Crisp snow white)
- **Headings**: `#523528` (Deep seal brown)
- **Body Text**: `#3B261C` (Dark espresso)
- **Accents**: `#A67C5B` (Terracotta expedition leather)
- **Borders**: `#B49A82` (Muted brass compass trim)
- **Typography**: Editorial serif headings (`DM Serif Display`), clean readable body (`Inter`), and monospaced geodetic coordinates (`IBM Plex Mono`).

---

## 🚀 Key Features & Capabilities

| Module | Feature Description |
| :--- | :--- |
| **Landing Page** | Stylized celestial Hero Globe, animated voyage tracks from Goa, snow particles, challenge cards, and national impact metrics. |
| **Knowledge Repository** | Filterable catalog by Region, Domain, Station, Format, and Year with sorting and citation previews. |
| **Semantic AI Search** | Natural-language query engine that returns structured syntheses with inline citations `[1]`, `[2]` linked to content cards. |
| **POLARIS AI Assistant** | Floating chat drawer with conversational scientific QA, source attribution, and contextual suggested questions. |
| **Knowledge Simplifier** | 3-tier difficulty transformer (*School*, *College*, *Executive*) complete with analogies and terminology glossaries. |
| **Interactive Polar Map** | Polar stereographic graticule projection with interactive markers for Bharati, Maitri, Himadri, Himansh, and IndARC with live sensor telemetry. |
| **Virtual Station Explorer** | Isometric 3D visualizer of Bharati station with 360° rotation and clickable zone hotspots (Lab, Living, Comms, Weather Mast, Power). |
| **Expedition Explorer** | Detailed voyage tracks, leader profiles, mission objectives, and chronological timeline view of 44 Indian expeditions. |
| **Education Academy** | Structured lessons, gamified knowledge points (+XP), badges, and a working interactive quiz with confetti animation. |
| **Media Studio** | Generates Instagram carousel slides, 60s video storyboards, LinkedIn professional articles, and official press releases from papers. |
| **Analytics Dashboard** | Interactive Recharts area and donut charts tracking repository usage, regional distributions, and telemetry health. |
| **Admin CMS** | Full CRUD interface to draft, review, publish, and delete research publications and datasets in real-time. |
| **Role Switcher** | 1-click switcher between *Public User*, *Student*, *Researcher*, *Educator*, and *Admin* for seamless jury demonstrations. |

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Lucide React, Recharts, Canvas Confetti.
- **Backend**: Python 3.11+, FastAPI, Uvicorn, Pydantic v2.
- **Database**: PostgreSQL / Supabase Compatible (Normalized 22-table schema in `database/schema.sql`).
- **Resilience**: Zero external API dependencies required for demo mode; includes calibrated local knowledge layers.

---

## 📁 Monorepo Structure

```
polaris/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI REST application & routing
│   │   ├── data/
│   │   │   └── seed_data.py     # Calibrated scientific demo dataset
│   │   ├── schemas/
│   │   │   └── models.py        # Pydantic v2 data models
│   │   └── services/
│   │       ├── ai_service.py    # Semantic search & QA engine
│   │       └── media_service.py # Outreach & social media generator
│   └── requirements.txt         # FastAPI, Uvicorn, Pydantic
├── database/
│   ├── schema.sql               # Complete 22-table PostgreSQL schema
│   └── seed.sql                 # SQL seed data for stations & expeditions
├── docs/
│   ├── ARCHITECTURE.md          # Full system architecture specification
│   └── JURY_DEMO_GUIDE.md       # 5-minute hackathon demonstration script
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js 16 App Router pages
│   │   │   ├── admin/           # Content Management System
│   │   │   ├── analytics/       # Institutional analytics
│   │   │   ├── expeditions/     # Expedition logs & voyages
│   │   │   ├── explore/         # Virtual station explorer
│   │   │   ├── learn/           # Education academy & quizzes
│   │   │   ├── map/             # Interactive polar map
│   │   │   ├── media/           # Media dissemination studio
│   │   │   ├── repository/      # Knowledge repository & AI search
│   │   │   ├── stations/        # Station detailed profiles
│   │   │   ├── layout.tsx       # Root layout & providers
│   │   │   └── page.tsx         # Comprehensive landing page
│   │   ├── components/          # Reusable UI components
│   │   └── lib/                 # Auth context, types, and API client
│   └── package.json
├── .env.example                 # Environment configuration template
└── README.md                    # Project documentation
```

---

## ⚡ Quickstart & Installation

### 1. Prerequisites
- **Node.js**: v18+ (Node.js 22 tested)
- **Python**: 3.10+ (Python 3.11 tested)

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Backend Setup (FastAPI)
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation (Swagger UI): **[http://localhost:8000/docs](http://localhost:8000/docs)**.

> *Note: If you run the frontend alone without launching the backend, POLARIS automatically activates its built-in client data mirror, ensuring 100% of features remain functional.*

---

## 🧪 5-Minute SIH Jury Demo Walkthrough

Refer to [`docs/JURY_DEMO_GUIDE.md`](file:///c:/Users/shlok/Downloads/polaris/docs/JURY_DEMO_GUIDE.md) for the complete step-by-step walkthrough:
1. **Hero & Problem**: Show Antarctica, Arctic, and Third Pole projections with animated expedition routes.
2. **Repository & Semantic Search**: Click *"What research was conducted at Bharati Station related to climate?"* and view the AI summary with citations.
3. **Explain Simply**: Click *"Explain Simply"* on any publication to switch between School, College, and Executive summaries.
4. **Polar Map**: Click Bharati or Maitri on the interactive stereographic map to review live sensor telemetry.
5. **Virtual Station**: Rotate the 3D isometric Bharati model and inspect laboratory and clean energy zones.
6. **Education Quiz**: Complete the Antarctic station assessment, celebrate the confetti trigger, and collect XP badges.
7. **Media Studio**: Generate a 60-second video script or Instagram carousel from a research paper in 1 click.
8. **Admin CMS**: Switch role to *Admin* in the top right to manage publications and review institutional analytics.

---

## 🏛️ Acknowledgements

Developed for **Smart India Hackathon 2026** under Problem Statement **26063**.  
Data references and mission parameters inspired by official documentation from the **National Centre for Polar and Ocean Research (NCPOR)** and the **Ministry of Earth Sciences (MoES)**, Government of India.
