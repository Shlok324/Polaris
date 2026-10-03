# POLARIS Deployment Master Guide
## Smart India Hackathon 2026 — Problem Statement 26063

This guide provides three reliable paths to deploy **POLARIS** live for your hackathon presentation or production showcase.

---

## ⚡ Method 1: Instant Cloud Deployment (Recommended for SIH)
**Cost:** 100% Free  
**Time to live:** ~5 minutes  
**Stack:** Vercel (Frontend) + Render (FastAPI Backend) + Supabase (PostgreSQL)

```
       ┌────────────────────────┐         ┌────────────────────────┐
       │     VERCEL (CDN)       │ ──────> │     RENDER (API)       │
       │  Next.js 16 Frontend   │  JSON   │    FastAPI Backend     │
       │ (polaris.vercel.app)   │         │ (polaris-api.onrender) │
       └────────────────────────┘         └───────────┬────────────┘
                                                      │
                                                      ▼
                                          ┌────────────────────────┐
                                          │  SUPABASE / POSTGRES   │
                                          │ 22 Relational Tables   │
                                          └────────────────────────┘
```

### Step 1: Deploy Frontend on Vercel (2 Minutes)
1. Push your project to a GitHub repository:
   ```bash
   cd c:\Users\shlok\Downloads\polaris
   git init
   git add .
   git commit -m "feat: complete POLARIS SIH 2026 platform"
   git branch -M main
   # Create a repository on github.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/polaris.git
   git push -u origin main
   ```
2. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
3. Click **"Add New Project"** and select your `polaris` repository.
4. Configure Project:
   - **Root Directory**: Select `frontend`
   - **Framework Preset**: `Next.js` (automatically detected)
5. Under **Environment Variables**, add:
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://polaris-api.onrender.com
   ```
   *(Or leave blank initially to run in resilient standalone demo mode!)*
6. Click **Deploy**. Your frontend will be live at `https://polaris-xxx.vercel.app` in under 60 seconds!

---

### Step 2: Deploy Backend on Render (3 Minutes)
1. Go to **[render.com](https://render.com)** and sign in with GitHub.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository `polaris`.
4. Configure Web Service:
   - **Name**: `polaris-api`
   - **Region**: Singapore or Frankfurt
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`
5. Under **Environment Variables**, add:
   ```env
   POLARIS_DEMO_MODE=true
   ```
6. Click **Create Web Service**. Your API will be live at `https://polaris-api.onrender.com`!
   - Test it at: `https://polaris-api.onrender.com/docs` (interactive Swagger UI).

---

### Step 3: Setup Managed Database on Supabase (Optional)
1. Go to **[supabase.com](https://supabase.com)** and create a free project.
2. In Supabase Dashboard, open the **SQL Editor**.
3. Copy the contents of [`database/schema.sql`](file:///c:/Users/shlok/Downloads/polaris/database/schema.sql) and click **Run**.
4. Copy the contents of [`database/seed.sql`](file:///c:/Users/shlok/Downloads/polaris/database/seed.sql) and click **Run**.
5. Copy your database connection string from **Project Settings → Database** and paste it into Render environment variable `DATABASE_URL`.

---

## 🐳 Method 2: Single-Command Docker Deployment (Local / VPS)
**Ideal for:** Self-hosting on AWS EC2, DigitalOcean Droplet, Ubuntu Server, or offline jury laptop demo.

A production-ready `docker-compose.yml` is already included in your root directory.

### Quickstart:
```bash
cd c:\Users\shlok\Downloads\polaris
docker compose up -d --build
```

### What this starts:
1. `polaris-database`: PostgreSQL 16 on port `5432` with preloaded `schema.sql` and `seed.sql`.
2. `polaris-backend`: FastAPI server on port `8000`.
3. `polaris-frontend`: Production Next.js server on port `3000`.

### Access:
- **Frontend Web App**: `http://localhost:3000`
- **Backend API & Docs**: `http://localhost:8000/docs`
- **PostgreSQL**: `localhost:5432` (User: `polaris_user`, DB: `polaris_db`)

To stop:
```bash
docker compose down
```

---

## ⚡ Method 3: Instant Standalone Vercel Deploy (Zero Backend Needed)
POLARIS has been specifically architected with a **dual-layer client data mirror** (`frontend/src/lib/api.ts`).

If you need a live URL in **2 minutes** without deploying any backend:
1. Deploy only `frontend` to Vercel.
2. Do not set any backend URL.
3. The platform automatically activates its calibrated client dataset:
   - ✅ Interactive Polar Map works
   - ✅ 3D Virtual Station works
   - ✅ Semantic AI Search works
   - ✅ Knowledge Simplifier (*School / College / Executive*) works
   - ✅ Quizzes & Confetti work
   - ✅ Media Studio outreach generator works
   - ✅ Recharts analytics work
   - ✅ Admin CMS works

---

## 🔒 Verification Checklist Before Jury Presentation

1. [ ] Test the live frontend URL in an incognito window.
2. [ ] Open **Explore** and verify the 3D station rotates smoothly.
3. [ ] Open **Repository**, type `"Bharati climate"`, and check that the AI synthesis with citations renders.
4. [ ] Open **Learn**, take the **Antarctic Station Assessment**, and verify score & confetti trigger.
5. [ ] Open **Media**, click **Generate Dissemination Asset**, and verify Instagram and Video Script generation.
6. [ ] Click the Role Switcher in the top right and test switching between **Student**, **Researcher**, and **Admin**.
