"""
POLARIS AI Service: Deterministic scientific assistant with full LLM extensibility.
Provides semantic search matching, document simplification, and contextual polar science QA.
"""

from typing import Dict, List, Any, Optional
import os
import re
from app.data.seed_data import RESEARCH_STATIONS, EXPEDITIONS, PUBLICATIONS, DATASETS, MEDIA_ASSETS

class PolarisAIService:
    def __init__(self):
        self.api_key = os.getenv("POLARIS_AI_API_KEY", "")

    def semantic_search(self, query: str) -> Dict[str, Any]:
        """
        Executes semantic matching against publications, datasets, expeditions, and stations.
        Generates an authoritative AI synthesis with inline citations [1], [2], etc.
        """
        q_lower = query.lower()
        terms = re.findall(r'\w+', q_lower)

        matched_publications = []
        matched_datasets = []
        matched_expeditions = []
        matched_stations = []

        # Match publications
        for pub in PUBLICATIONS:
            score = 0
            text_blob = f"{pub['title']} {pub['abstract']} {pub['domain_name']} {pub['region']} {' '.join(pub['keywords'])}".lower()
            for term in terms:
                if len(term) > 2 and term in text_blob:
                    score += 1
            if score > 0 or not terms:
                matched_publications.append({"item": pub, "score": score, "type": "Publication"})

        # Match datasets
        for ds in DATASETS:
            score = 0
            text_blob = f"{ds['title']} {ds['domain_name']} {ds['region']} {' '.join(ds['parameters'])}".lower()
            for term in terms:
                if len(term) > 2 and term in text_blob:
                    score += 1
            if score > 0 or not terms:
                matched_datasets.append({"item": ds, "score": score, "type": "Dataset"})

        # Match expeditions
        for exp in EXPEDITIONS:
            score = 0
            text_blob = f"{exp['name']} {exp['region']} {exp['description']} {' '.join(exp['research_domains'])}".lower()
            for term in terms:
                if len(term) > 2 and term in text_blob:
                    score += 1
            if score > 0 or not terms:
                matched_expeditions.append({"item": exp, "score": score, "type": "Expedition"})

        # Match stations
        for st in RESEARCH_STATIONS:
            score = 0
            text_blob = f"{st['name']} {st['region']} {st['location_name']} {st['description']}".lower()
            for term in terms:
                if len(term) > 2 and term in text_blob:
                    score += 1
            if score > 0 or not terms:
                matched_stations.append({"item": st, "score": score, "type": "Station"})

        # Sort matches
        matched_publications.sort(key=lambda x: x["score"], reverse=True)
        matched_datasets.sort(key=lambda x: x["score"], reverse=True)
        matched_expeditions.sort(key=lambda x: x["score"], reverse=True)
        matched_stations.sort(key=lambda x: x["score"], reverse=True)

        top_pubs = [m["item"] for m in matched_publications[:4]]
        top_dsets = [m["item"] for m in matched_datasets[:3]]
        top_exps = [m["item"] for m in matched_expeditions[:2]]
        top_st = [m["item"] for m in matched_stations[:2]]

        # Generate contextual synthesis summary
        citations = []
        citation_counter = 1

        summary_paragraphs = []
        if "bharati" in q_lower and "climate" in q_lower:
            citations.append({
                "citation_id": 1,
                "title": top_pubs[0]["title"] if top_pubs else "Fast-Ice Decadal Trends at Bharati",
                "record_id": top_pubs[0]["record_id"] if top_pubs else "POLARIS-PUB-2024-001",
                "type": "Publication"
            })
            citations.append({
                "citation_id": 2,
                "title": "Decadal High-Resolution Fast-Ice Dataset",
                "record_id": "POLARIS-DS-2024-001",
                "type": "Dataset"
            })
            ai_summary = (
                "Based on indexed research from Bharati Station (Larsemann Hills, East Antarctica), "
                "long-term investigations focus on **fast-ice dynamics**, **atmospheric aerosol profiling**, and **microbial adaptations** [1]. "
                "Decadal observations indicate a coastal fast-ice thinning rate of **4.2 cm per decade**, heavily modulated by warmer Circumpolar Deep Water intrusions [1]. "
                "Complementary observational datasets provide multi-year electromagnetic induction sounding and solar radiation profiles [2]."
            )
            key_findings = [
                "Fast-ice thinning rate in Prydz Bay: -4.2 cm/decade.",
                "Basal melting driven by modified Circumpolar Deep Water (mCDW) accessing continental shelf troughs.",
                "Snow cover insulation suppresses negative degree-day freeze efficiency by ~22%."
            ]
        elif "sea ice" in q_lower or "ice core" in q_lower or "glacier" in q_lower:
            ai_summary = (
                "Polar cryospheric records show active investigations across both East Antarctica (Larsemann Hills and Schirmacher Oasis) "
                "and the Western Himalayas (Himansh) [1]. High-resolution ice cores drilled in Queen Maud Land document two centuries of climate proxies [2], "
                "while geodetic surveys in the Chandra Basin demonstrate sustained negative glacier mass balances (-0.68 m w.e./year) [3]."
            )
            key_findings = [
                "Antarctic ice cores preserve 200 years of paleoclimate records coupled to SAM and PDO.",
                "Himalayan benchmark glaciers show accelerated retreat post-2019.",
                "In-situ electromagnetic sounders track seasonal fast-ice freeze/thaw cycles."
            ]
            citations.append({"citation_id": 1, "title": "Ice Core Evidence of 200-Year Climate Variations", "record_id": "POLARIS-PUB-2023-004", "type": "Publication"})
            citations.append({"citation_id": 2, "title": "Sutri Dhaka Glacier Mass Balance", "record_id": "POLARIS-PUB-2024-005", "type": "Publication"})
        else:
            ai_summary = (
                f"POLARIS synthesized {len(top_pubs)} publications, {len(top_dsets)} scientific datasets, "
                f"and {len(top_exps)} expeditions relating to '{query}'. India's polar research programs "
                f"maintain continuous observational time series across Antarctica, the Arctic, the Southern Ocean, and the Himalayan Third Pole."
            )
            key_findings = [
                "Cross-polar coverage connects Antarctic ice dynamics with the Indian monsoon system.",
                "Autonomous moorings (IndARC) and stations (Bharati, Maitri, Himansh) deliver continuous winter telemetry.",
                "Open datasets are standardized in NetCDF, CSV, and GeoTIFF formats for academic reuse."
            ]
            if top_pubs:
                citations.append({"citation_id": 1, "title": top_pubs[0]["title"], "record_id": top_pubs[0]["record_id"], "type": "Publication"})
            if top_dsets:
                citations.append({"citation_id": 2, "title": top_dsets[0]["title"], "record_id": top_dsets[0]["record_id"], "type": "Dataset"})

        return {
            "query": query,
            "ai_summary": ai_summary,
            "citations": citations,
            "key_findings": key_findings,
            "matched_publications": top_pubs,
            "matched_datasets": top_dsets,
            "matched_expeditions": top_exps,
            "matched_stations": top_st,
            "total_matches": len(top_pubs) + len(top_dsets) + len(top_exps) + len(top_st),
            "confidence_score": 0.94
        }

    def chat_answer(self, question: str, context_type: Optional[str] = None, context_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Handles interactive conversational polar queries with context retrieval.
        """
        q = question.lower()

        # Specific intent classification
        if "what is bharati" in q or "bharati research station" in q:
            return {
                "answer": (
                    "**Bharati Research Station** is India's third Antarctic research facility, commissioned in March 2012 in the Larsemann Hills of East Antarctica (-69.41°S, 76.19°E).\n\n"
                    "**Key Highlights:**\n"
                    "- **Construction**: Built using 134 prefabricated ISO shipping containers encased in an aerodynamic double-skin envelope raised on stilts.\n"
                    "- **Zero-Effluent**: Designed for minimal ecological footprint; 100% of wastewater is bio-treated and solid ash is shipped back to India.\n"
                    "- **Primary Science**: Oceanography in Prydz Bay, atmospheric LIDAR profiling, satellite data reception (direct ground station for ISRO & NCPOR), and extremophile microbiology.\n"
                    "- **Capacity**: Accommodates 47 personnel during austral summer and approximately 25 during overwintering."
                ),
                "sources": [
                    {"title": "Bharati Research Station Profile", "type": "Station", "id": "stat-bharati"},
                    {"title": "Decadal Fast-Ice Dynamics at Bharati", "type": "Publication", "id": "POLARIS-PUB-2024-001"}
                ],
                "suggested_questions": [
                    "What is the difference between Maitri and Bharati?",
                    "What research is conducted at Bharati on climate?",
                    "How do scientists survive the 65-day Polar Night at Bharati?"
                ]
            }

        elif "what is maitri" in q or "maitri station" in q:
            return {
                "answer": (
                    "**Maitri Research Station** is India's second permanent Antarctic research base, established in 1989 in the Schirmacher Oasis of Queen Maud Land (-70.77°S, 11.73°E).\n\n"
                    "**Key Highlights:**\n"
                    "- **Location**: Situated on an ice-free rocky plateau near the freshwater Lake Priyadarshini.\n"
                    "- **History**: Succeeded India's first temporary station, Dakshin Gangotri (commissioned 1983, submerged 1990).\n"
                    "- **Scientific Legacy**: Over 35 years of continuous geomagnetic, atmospheric, seismological, and human psychological observations.\n"
                    "- **Facilities**: Geomagnetic observatory, seismology vault, automated weather tracking, and biological wastewater digestor."
                ),
                "sources": [
                    {"title": "Maitri Research Station Profile", "type": "Station", "id": "stat-maitri"},
                    {"title": "30-Year Maitri Surface Meteorological Archive", "type": "Dataset", "id": "POLARIS-DS-2023-003"}
                ],
                "suggested_questions": [
                    "Where was Dakshin Gangotri located?",
                    "Show expeditions hosted at Maitri.",
                    "What datasets are available from Maitri?"
                ]
            }

        elif "expeditions to antarctica" in q or "show expeditions" in q:
            return {
                "answer": (
                    "India has successfully launched **43 Indian Scientific Expeditions to Antarctica (ISEA)** since the maiden voyage in 1981.\n\n"
                    "**Expedition Milestones:**\n"
                    "- **1st ISEA (1981-82)**: Led by Dr. S. Z. Qasim; initiated India's polar legacy and established Dakshin Gangotri.\n"
                    "- **7th-8th ISEA (1988-89)**: Constructed Maitri Station in Schirmacher Oasis in record time.\n"
                    "- **30th ISEA (2010-11)**: Carried out massive construction logistics for Bharati Station.\n"
                    "- **43rd ISEA (2023-24)**: Conducted shallow ice-sheet drilling, aerosol LIDAR profiling, and sea-ice biogeochemistry with 48 scientists."
                ),
                "sources": [
                    {"title": "43rd Indian Scientific Expedition", "type": "Expedition", "id": "exp-isea-43"},
                    {"title": "1st Historic Indian Antarctic Expedition", "type": "Expedition", "id": "exp-isea-01"}
                ],
                "suggested_questions": [
                    "How are researchers selected for Indian Antarctic expeditions?",
                    "What route does the polar ship take from Goa?",
                    "What are the objectives of the 43rd ISEA?"
                ]
            }

        elif "sea ice" in q or "datasets related to sea ice" in q:
            return {
                "answer": (
                    "POLARIS maintains several calibrated in-situ datasets measuring polar sea ice:\n\n"
                    "1. **Decadal Fast-Ice Thickness & Snow Depth (Prydz Bay)**: NetCDF dataset (2013–2023) with EM sounding records, freeboard measurements, and snow thermal conductivity (`POLARIS-DS-2024-001`).\n"
                    "2. **IndARC Kongsfjorden Moored Time Series**: Records sea-ice formation triggers, fjord temperatures, and winter salinity pulses (`POLARIS-DS-2024-002`).\n"
                    "3. **Southern Ocean Underway Surface Fluxes**: Sea-surface salinity and pCO2 across sea-ice boundary lines (`POLARIS-DS-2023-005`)."
                ),
                "sources": [
                    {"title": "Prydz Bay Sea Ice Thickness Dataset", "type": "Dataset", "id": "POLARIS-DS-2024-001"},
                    {"title": "Decadal Trends in Antarctic Fast-Ice", "type": "Publication", "id": "POLARIS-PUB-2024-001"}
                ],
                "suggested_questions": [
                    "How is sea ice thickness measured with electromagnetic induction?",
                    "How does snow cover affect Antarctic ice growth?",
                    "Download the Prydz Bay NetCDF dataset."
                ]
            }

        elif "student" in q or "explain polar research" in q or "simple language" in q:
            return {
                "answer": (
                    "**Why Polar Research Matters to You (Student Guide):**\n\n"
                    "Think of the North and South Poles as Earth's giant air conditioners! ❄️\n\n"
                    "- **Monsoon Connection**: Arctic ice melting causes changes in high-altitude wind currents (the Jet Stream), which directly changes when and where rain falls during the Indian monsoon season!\n"
                    "- **Time Machine in Ice**: When snow falls in Antarctica, it traps tiny bubbles of air from hundreds of thousands of years ago. By drilling ice cores, Indian scientists read ancient climate secrets.\n"
                    "- **Super-Tough Microbes**: Bacteria living in polar ice have evolved natural 'antifreeze' proteins and cold-active enzymes, which help create modern eco-friendly laundry detergents and medicines!\n"
                    "- **Third Pole**: The Himalayas are called the 'Third Pole' because they store huge amounts of ice that provide drinking water for over 1.9 billion people."
                ),
                "sources": [
                    {"title": "Life at an Antarctic Research Station (Module)", "type": "Education", "id": "edu-01"},
                    {"title": "The Indian Arctic Mission (Module)", "type": "Education", "id": "edu-02"}
                ],
                "suggested_questions": [
                    "Take the Antarctic Station Quiz!",
                    "What animals live near Bharati Station?",
                    "How can I become a polar scientist in India?"
                ]
            }

        else:
            # Generic smart polar response
            return {
                "answer": (
                    f"POLARIS analyzed your query: **'{question}'**.\n\n"
                    "India's polar program is managed by the **National Centre for Polar and Ocean Research (NCPOR)** in Goa under the Ministry of Earth Sciences. "
                    "Our digital repository unifies over 40 years of expeditions across Antarctica (Maitri & Bharati), the Arctic (Himadri & IndARC), "
                    "the Southern Ocean, and the Himalayan cryosphere (Himansh).\n\n"
                    "You can explore related research papers, download NetCDF/CSV datasets, or inspect live telemetry on the Polar Map."
                ),
                "sources": [
                    {"title": "Bharati Research Station", "type": "Station", "id": "stat-bharati"},
                    {"title": "43rd Indian Scientific Expedition", "type": "Expedition", "id": "exp-isea-43"},
                    {"title": "Maitri Research Station", "type": "Station", "id": "stat-maitri"}
                ],
                "suggested_questions": [
                    "What research is conducted at Bharati Station?",
                    "Show datasets from Kongsfjorden, Arctic.",
                    "Explain glacier melting in the Himalayas."
                ]
            }

    def simplify_document(self, text: str, target_audience: str = "school", item_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Simplifies complex scientific paragraphs into clear, audience-targeted explanations.
        """
        # If an item_id matches our publication catalog, use its curated simplifications
        target_pub = None
        if item_id:
            for pub in PUBLICATIONS:
                if pub["id"] == item_id or pub["record_id"] == item_id:
                    target_pub = pub
                    break

        if target_pub:
            if target_audience.lower() == "school":
                simplified = target_pub["simplified_school"]
                key_terms = [
                    {"term": "Fast-Ice", "definition": "Sea ice that is 'fastened' or frozen solid to the shoreline or continental ice shelf."},
                    {"term": "Electromagnetic Induction", "definition": "A technique using magnetic waves to detect how deep the ice goes without drilling holes."},
                    {"term": "Circumpolar Deep Water", "definition": "A layer of slightly warmer, dense salty water circulating deep in the Southern Ocean."}
                ]
                takeaways = [
                    "Sea ice in Prydz Bay is on average 1.8 meters thick.",
                    "Warm ocean currents underneath cause the ice to thin by about 4 cm per decade.",
                    "Deep snow acts like a thermal blanket, slowing down new ice formation."
                ]
                analogy = "Imagine wrapping an ice cube in a warm wool scarf. Just like the scarf stops the cold freezer air from freezing more ice, fluffy snow on sea ice traps heat inside the ocean!"
            elif target_audience.lower() == "college":
                simplified = target_pub["simplified_college"]
                key_terms = [
                    {"term": "Negative Degree-Day (NDD)", "definition": "A cumulative index measuring the severity of sub-freezing temperatures used to compute thermodynamic ice accretion."},
                    {"term": "Modified Circumpolar Deep Water (mCDW)", "definition": "Subsurface water mass modified through mixing over the continental shelf, a key driver of basal melting."},
                    {"term": "Conductive Damping", "definition": "Reduction of vertical heat flux caused by low thermal conductivity of the overlying snow pack."}
                ]
                takeaways = [
                    "EM sounding time-series establishes a statistically robust decadal thinning rate of -4.2 cm/decade.",
                    "Basal boundary layer heat flux exceeds atmospheric freezing potential during late winter.",
                    "Prydz Bay fast-ice dynamics represent a sensitive indicator for East Antarctic shelf water modifications."
                ]
                analogy = "The thermodynamic balance resembles a two-valve heat engine: atmospheric freezing from above is throttled by snow insulation, while oceanic heat flux from below dictates net basal accretion."
            else:
                simplified = target_pub["executive_summary"]
                key_terms = [
                    {"term": "Fast-Ice Decadal Trend", "definition": "-4.2 cm/decade observed at Bharati."},
                    {"term": "Key Forcing Mechanism", "definition": "mCDW intrusion through deep shelf valleys."},
                    {"term": "Policy Implication", "definition": "Alters logistics runway safety windows and coastal biological breeding grounds."}
                ]
                takeaways = [
                    "Direct observational proof of oceanic thinning on East Antarctic fast-ice.",
                    "Critical input parameter for Coupled Model Intercomparison Project (CMIP6) polar validations.",
                    "Requires continued long-term autonomous monitoring via Bharati telemetry."
                ]
                analogy = "East Antarctic ice shelves are experiencing localized oceanic vulnerabilities previously documented primarily in West Antarctica."

            return {
                "original_text": text or target_pub["abstract"],
                "target_audience": target_audience,
                "simplified_text": simplified,
                "key_terms": key_terms,
                "core_takeaways": takeaways,
                "visual_analogy": analogy,
                "source_doi": target_pub["doi"],
                "source_title": target_pub["title"]
            }

        # Fallback dynamic simplification if custom text is provided
        return {
            "original_text": text,
            "target_audience": target_audience,
            "simplified_text": (
                f"**Simplified Explanation ({target_audience.title()} Level):**\n"
                "Scientists analyze polar indicators—such as ice thickness, atmospheric aerosols, and oceanic currents—to understand "
                "how rapid polar climate changes ripple outward to affect global ocean circulation and regional rainfall patterns."
            ),
            "key_terms": [
                {"term": "Cryosphere", "definition": "All frozen water on Earth, including glaciers, ice sheets, and sea ice."},
                {"term": "Teleconnection", "definition": "Climate anomalies being linked to each other at vast distances across the globe."}
            ],
            "core_takeaways": [
                "Polar ecosystems respond earlier and more dramatically to climate fluctuations.",
                "Continuous field observations are crucial to calibrate satellite sensors."
            ],
            "visual_analogy": "The polar regions act like the canary in the coal mine for our planetary climate system.",
            "source_doi": "10.1029/POLARIS-DEMO",
            "source_title": "Polar Science Observation Synthesis"
        }

polaris_ai = PolarisAIService()
