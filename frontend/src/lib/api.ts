import { 
  ResearchStation, Expedition, Publication, Dataset, MediaAsset, 
  EducationalModule, AISemanticResult 
} from './types';
import { 
  INITIAL_STATIONS, INITIAL_EXPEDITIONS, INITIAL_PUBLICATIONS, 
  INITIAL_DATASETS, INITIAL_MEDIA, INITIAL_MODULES, INITIAL_ANALYTICS 
} from './data';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

async function fetchWithFallback<T>(url: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    // Graceful fallback to client dataset
    return fallbackData;
  }
}

export const api = {
  // Stations
  async getStations(region?: string): Promise<ResearchStation[]> {
    const url = `${BACKEND_URL}/api/stations${region && region !== 'All' ? `?region=${encodeURIComponent(region)}` : ''}`;
    let data = await fetchWithFallback<ResearchStation[]>(url, INITIAL_STATIONS);
    if (region && region !== 'All') {
      data = data.filter(s => s.region.toLowerCase() === region.toLowerCase());
    }
    return data;
  },

  async getStation(id: string): Promise<ResearchStation | null> {
    const url = `${BACKEND_URL}/api/stations/${id}`;
    const station = await fetchWithFallback<ResearchStation | null>(url, null);
    if (station) return station;
    return INITIAL_STATIONS.find(s => s.id === id || s.name.toLowerCase() === id.toLowerCase()) || null;
  },

  // Expeditions
  async getExpeditions(region?: string, year?: number): Promise<Expedition[]> {
    const url = `${BACKEND_URL}/api/expeditions${region && region !== 'All' ? `?region=${encodeURIComponent(region)}` : ''}`;
    let data = await fetchWithFallback<Expedition[]>(url, INITIAL_EXPEDITIONS);
    if (region && region !== 'All') {
      data = data.filter(e => e.region.toLowerCase() === region.toLowerCase());
    }
    if (year) {
      data = data.filter(e => e.year === year);
    }
    return data;
  },

  async getExpedition(id: string): Promise<Expedition | null> {
    const url = `${BACKEND_URL}/api/expeditions/${id}`;
    const exp = await fetchWithFallback<Expedition | null>(url, null);
    if (exp) return exp;
    return INITIAL_EXPEDITIONS.find(e => e.id === id || e.expedition_number.toLowerCase() === id.toLowerCase()) || null;
  },

  // Publications
  async getPublications(params?: {
    region?: string;
    domain?: string;
    station?: string;
    year?: number;
    sort_by?: string;
    page?: number;
    limit?: number;
  }): Promise<{ items: Publication[]; total: number }> {
    let items = [...INITIAL_PUBLICATIONS];
    if (params?.region && params.region !== 'All') {
      items = items.filter(p => p.region.toLowerCase() === params.region!.toLowerCase());
    }
    if (params?.domain && params.domain !== 'All') {
      items = items.filter(p => p.domain_name.toLowerCase().includes(params.domain!.toLowerCase()));
    }
    if (params?.station && params.station !== 'All') {
      items = items.filter(p => p.station_name?.toLowerCase() === params.station!.toLowerCase());
    }
    if (params?.year) {
      items = items.filter(p => p.year === params.year);
    }
    if (params?.sort_by === 'oldest') {
      items.sort((a, b) => a.year - b.year);
    } else if (params?.sort_by === 'most_viewed') {
      items.sort((a, b) => b.view_count - a.view_count);
    } else if (params?.sort_by === 'most_cited') {
      items.sort((a, b) => b.citations_count - a.citations_count);
    } else {
      items.sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());
    }
    return { items, total: items.length };
  },

  async getPublication(id: string): Promise<Publication | null> {
    return INITIAL_PUBLICATIONS.find(p => p.id === id || p.record_id === id) || null;
  },

  // Datasets
  async getDatasets(region?: string, format_type?: string): Promise<{ items: Dataset[]; total: number }> {
    let items = [...INITIAL_DATASETS];
    if (region && region !== 'All') {
      items = items.filter(d => d.region.toLowerCase() === region.toLowerCase());
    }
    if (format_type && format_type !== 'All') {
      items = items.filter(d => d.format.toLowerCase() === format_type.toLowerCase());
    }
    return { items, total: items.length };
  },

  // Media
  async getMedia(region?: string, media_type?: string): Promise<MediaAsset[]> {
    let items = [...INITIAL_MEDIA];
    if (region && region !== 'All') {
      items = items.filter(m => m.region.toLowerCase() === region.toLowerCase());
    }
    if (media_type && media_type !== 'All') {
      items = items.filter(m => m.media_type.toLowerCase() === media_type.toLowerCase());
    }
    return items;
  },

  // Education
  async getModules(): Promise<EducationalModule[]> {
    return INITIAL_MODULES;
  },

  async getModule(slug: string): Promise<EducationalModule | null> {
    return INITIAL_MODULES.find(m => m.slug === slug || m.id === slug) || null;
  },

  // Semantic Search
  async semanticSearch(query: string): Promise<AISemanticResult> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/search/semantic?query=${encodeURIComponent(query)}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }

    const q = query.toLowerCase();
    const matched_pubs = INITIAL_PUBLICATIONS.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.abstract.toLowerCase().includes(q) || 
      p.keywords.some(k => k.toLowerCase().includes(q))
    );
    const matched_datasets = INITIAL_DATASETS.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.parameters.some(p => p.toLowerCase().includes(q))
    );
    const matched_expeditions = INITIAL_EXPEDITIONS.filter(e => 
      e.name.toLowerCase().includes(q) || 
      e.description.toLowerCase().includes(q)
    );
    const matched_stations = INITIAL_STATIONS.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.location_name.toLowerCase().includes(q)
    );

    let summary = `POLARIS AI synthesized ${matched_pubs.length} publications and ${matched_datasets.length} datasets relevant to "${query}".`;
    if (q.includes('bharati') && q.includes('climate')) {
      summary = "Decadal research at Bharati Station (Larsemann Hills, East Antarctica) tracks fast-ice thickness variations (-4.2 cm/decade) and atmospheric aerosol radiation budgets [1]. In-situ electromagnetic induction sounding datasets document continuous thermodynamic cryosphere changes [2].";
    }

    return {
      query,
      ai_summary: summary,
      citations: [
        { citation_id: 1, title: matched_pubs[0]?.title || "Decadal Trends in Antarctic Fast-Ice", record_id: matched_pubs[0]?.record_id || "POLARIS-PUB-2024-001", type: "Publication" },
        { citation_id: 2, title: "Prydz Bay Sea Ice Dataset", record_id: "POLARIS-DS-2024-001", type: "Dataset" }
      ],
      key_findings: [
        "Fast-ice thinning rate in Prydz Bay: -4.2 cm/decade.",
        "Basal melt accelerated by modified Circumpolar Deep Water (mCDW) accessing continental shelf.",
        "Continuous ground-truth measurements transmitted via direct satellite downlink to NCPOR Goa."
      ],
      matched_publications: matched_pubs.length ? matched_pubs : INITIAL_PUBLICATIONS.slice(0, 3),
      matched_datasets: matched_datasets.length ? matched_datasets : INITIAL_DATASETS.slice(0, 2),
      matched_expeditions: matched_expeditions.length ? matched_expeditions : INITIAL_EXPEDITIONS.slice(0, 2),
      matched_stations: matched_stations.length ? matched_stations : INITIAL_STATIONS.slice(0, 2),
      total_matches: matched_pubs.length + matched_datasets.length + matched_expeditions.length + matched_stations.length || 7,
      confidence_score: 0.94
    };
  },

  // AI Chat
  async aiChat(question: string): Promise<{ answer: string; sources: any[]; suggested_questions: string[] }> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }

    const q = question.toLowerCase();
    if (q.includes("bharati")) {
      return {
        answer: "**Bharati Research Station** is India's third Antarctic facility, commissioned in March 2012 in the Larsemann Hills (-69.41°S, 76.19°E). Constructed from 134 prefabricated ISO containers on aerodynamic stilts, it enforces strict zero-effluent discharge while housing high-speed satellite links to NCPOR Goa.",
        sources: [
          { title: "Bharati Station Profile", type: "Station", id: "stat-bharati" },
          { title: "Decadal Fast-Ice Dynamics", type: "Publication", id: "POLARIS-PUB-2024-001" }
        ],
        suggested_questions: [
          "What research is conducted at Bharati Station?",
          "How is life sustained during the 65-day Polar Night?",
          "What is the difference between Maitri and Bharati?"
        ]
      };
    }

    if (q.includes("expedition")) {
      return {
        answer: "India has conducted **43 scientific expeditions to Antarctica (ISEA)** since 1981, beginning with Operation Gangotri led by Dr. S. Z. Qasim. The most recent 43rd ISEA (2023-24) deployed 48 scientists across Maitri and Bharati stations.",
        sources: [
          { title: "43rd Indian Scientific Expedition", type: "Expedition", id: "exp-isea-43" },
          { title: "1st Historic Expedition", type: "Expedition", id: "exp-isea-01" }
        ],
        suggested_questions: [
          "What are the research domains of the 43rd ISEA?",
          "What vessel does India charter for Antarctic voyages?",
          "Show Arctic scientific expeditions."
        ]
      };
    }

    return {
      answer: `POLARIS analyzed your query: **"${question}"**.\n\nIndia's polar science program connects research stations in Antarctica (Maitri & Bharati), the Arctic (Himadri & IndARC), and the Himalayas (Himansh). Over 1,000 publications and standardized datasets are indexed on the platform.`,
      sources: [
        { title: "Bharati Research Station", type: "Station", id: "stat-bharati" },
        { title: "43rd Indian Scientific Expedition", type: "Expedition", id: "exp-isea-43" }
      ],
      suggested_questions: [
        "What datasets relate to sea ice?",
        "Explain Bharati Station in simple language.",
        "Show Himalayan glacier mass balance findings."
      ]
    };
  },

  // Document Simplifier
  async simplifyDocument(params: { text: string; target_audience: string; item_id?: string }) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }

    const aud = params.target_audience.toLowerCase();
    if (aud === 'school') {
      return {
        original_text: params.text,
        target_audience: "school",
        simplified_text: "Scientists at India's Bharati Station used a special electromagnetic tool (like a metal detector for ice!) to measure how thick the sea ice is over 10 years. They discovered the ice averages about 1.8 meters thick—taller than most adults! But because ocean water from further north is getting a tiny bit warmer, the sea ice is getting about 4 centimeters thinner every ten years. Also, fluffy snow on top acts like a warm blanket, which actually slows down new ice from freezing underneath!",
        key_terms: [
          { term: "Fast-Ice", definition: "Sea ice that is 'fastened' or frozen solid to the shoreline or continental ice shelf." },
          { term: "Electromagnetic Induction", definition: "A technique using magnetic waves to detect how deep the ice goes without drilling holes." },
          { term: "Circumpolar Deep Water", definition: "A layer of slightly warmer, dense salty water circulating deep in the Southern Ocean." }
        ],
        core_takeaways: [
          "Sea ice in Prydz Bay is on average 1.8 meters thick.",
          "Warm ocean currents underneath cause the ice to thin by about 4 cm per decade.",
          "Deep snow acts like a thermal blanket, slowing down new ice formation."
        ],
        visual_analogy: "Imagine wrapping an ice cube in a warm wool scarf. Just like the scarf stops the cold freezer air from freezing more ice, fluffy snow on sea ice traps heat inside the ocean!",
        source_doi: "10.1029/2023JC020491",
        source_title: "Decadal Trends in Antarctic Fast-Ice Thickness"
      };
    } else if (aud === 'college') {
      return {
        original_text: params.text,
        target_audience: "college",
        simplified_text: "This study analyzes a 10-year observational time series (2013–2023) of landfast sea-ice and snow depth in Prydz Bay, East Antarctica using ground-based EM sounding. The empirical results show a net thinning rate of -4.2 cm/decade, driven predominantly by enhanced basal melt caused by modified Circumpolar Deep Water (mCDW) accessing the sub-ice cavity. The paper quantifies thermal conductive damping by the snow cover, showing that thermal insulation reduces negative degree-day ice growth efficiency by ~22%.",
        key_terms: [
          { term: "Negative Degree-Day (NDD)", definition: "A cumulative index measuring the severity of sub-freezing temperatures used to compute thermodynamic ice accretion." },
          { term: "Modified Circumpolar Deep Water (mCDW)", definition: "Subsurface water mass modified through mixing over the continental shelf, a key driver of basal melting." },
          { term: "Conductive Damping", definition: "Reduction of vertical heat flux caused by low thermal conductivity of the overlying snow pack." }
        ],
        core_takeaways: [
          "EM sounding time-series establishes a statistically robust decadal thinning rate of -4.2 cm/decade.",
          "Basal boundary layer heat flux exceeds atmospheric freezing potential during late winter.",
          "Prydz Bay fast-ice dynamics represent a sensitive indicator for East Antarctic shelf water modifications."
        ],
        visual_analogy: "The thermodynamic balance resembles a two-valve heat engine: atmospheric freezing from above is throttled by snow insulation, while oceanic heat flux from below dictates net basal accretion.",
        source_doi: "10.1029/2023JC020491",
        source_title: "Decadal Trends in Antarctic Fast-Ice Thickness"
      };
    } else {
      return {
        original_text: params.text,
        target_audience: "executive",
        simplified_text: "10-year in-situ observation at Bharati Station confirms a -4.2 cm/decade thinning of Prydz Bay fast-ice. Warm deep-water intrusions and snow insulation play pivotal roles in modulating sea-ice thermodynamic growth.",
        key_terms: [
          { term: "Fast-Ice Decadal Trend", definition: "-4.2 cm/decade observed at Bharati." },
          { term: "Key Forcing Mechanism", definition: "mCDW intrusion through deep shelf valleys." },
          { term: "Policy Implication", definition: "Alters logistics runway safety windows and coastal biological breeding grounds." }
        ],
        core_takeaways: [
          "Direct observational proof of oceanic thinning on East Antarctic fast-ice.",
          "Critical input parameter for Coupled Model Intercomparison Project (CMIP6) polar validations.",
          "Requires continued long-term autonomous monitoring via Bharati telemetry."
        ],
        visual_analogy: "East Antarctic ice shelves are experiencing localized oceanic vulnerabilities previously documented primarily in West Antarctica.",
        source_doi: "10.1029/2023JC020491",
        source_title: "Decadal Trends in Antarctic Fast-Ice Thickness"
      };
    }
  },

  // Media Generator
  async generateMedia(params: {
    content_id?: string;
    content_text?: string;
    content_title?: string;
    output_type: string;
    tone?: string;
  }) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/media/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }

    if (params.output_type === 'instagram') {
      return {
        format: "Instagram Post / Carousel",
        headline: "🧊 UNLOCKING ANTARCTICA'S ICE SECRETS: India's Bharati Station Reports!",
        slides: [
          { slide_number: 1, visual: "Hero aerial view of Bharati Station against snowdrifts.", text: "What is happening to the ice at the edge of the world? 🇦🇶 Indian scientists have been tracking it for over a decade. Here is what they found ⬇️" },
          { slide_number: 2, visual: "Glaciologist using electromagnetic sensor on sea ice.", text: "Using electromagnetic sensors (like a metal detector for ice!), Indian researchers measured sea ice thickness across Prydz Bay." },
          { slide_number: 3, visual: "Infographic of -4.2 cm/decade thinning trend.", text: "The finding? Sea ice is thinning by 4.2 cm every ten years, driven by warm deep ocean currents sneaking under the ice shelf." },
          { slide_number: 4, visual: "Scientists near living quarters.", text: "Antarctica's sea ice acts as our planet's reflective shield. Changes here influence weather systems worldwide, including our Indian monsoon!" }
        ],
        caption: "🧊 Deep inside Antarctica, at India's high-tech Bharati Station, our scientists are decoding the future of Earth's climate!\n\nA new decadal study reveals how deep ocean warmth is gradually thinning coastal fast-ice in Prydz Bay at -4.2 cm/decade.\n\n👉 Tap link in bio to read the open-access research paper on POLARIS!\n\n#PolarisScience #IndiaInAntarctica #NCPOR #MoES #AntarcticScience #BharatiStation #ClimateAction",
        hashtags: ["#PolarisScience", "#IndiaInAntarctica", "#NCPOR", "#MoES", "#AntarcticScience", "#BharatiStation", "#ClimateChange"],
        call_to_action: "Share this to celebrate India's polar scientific achievements!"
      };
    } else if (params.output_type === 'linkedin') {
      return {
        format: "LinkedIn Professional Article",
        headline: "Advancing Cryospheric Intelligence: Decadal Observations from India's Bharati Station",
        body: "India's sustained scientific presence in polar research continues to deliver benchmark observational insights into planetary climate systems.\n\nIn a newly indexed study from Bharati Station (Antarctica), Indian researchers have documented multi-year fast-ice thermodynamic variability in Prydz Bay.\n\n🔑 Key Scientific Takeaways:\n• In-situ electromagnetic induction sounding establishes an average fast-ice thickness of 1.84 ± 0.18 m.\n• Decadal data reveals a net thinning trend of -4.2 cm/decade, predominantly driven by modified Circumpolar Deep Water (mCDW) intrusions.\n• Heavy snow cover acts as a critical thermal insulator, suppressing negative degree-day basal freeze efficiency by ~22%.\n\n🌍 Strategic Impact:\nThese continuous observational datasets provide ground-truth calibration for global climate models (CMIP6) and reinforce India's leadership as a Consultative Party to the Antarctic Treaty.\n\nAccess the full publication and calibrated datasets through India's National Polar Knowledge Portal (POLARIS).",
        hashtags: ["#PolarResearch", "#EarthSciences", "#MoES", "#NCPOR", "#AntarcticExpedition", "#ScientificLeadership"],
        call_to_action: "Explore datasets and interactive timelines on POLARIS Portal."
      };
    } else if (params.output_type === 'video_script') {
      return {
        format: "Short Video / Reel Script (60s)",
        headline: "Secrets of the Polar Ice: Inside India's Bharati Station",
        script_scenes: [
          { timecode: "0:00 - 0:08", visual_shot: "Drone sweep over aerodynamic Bharati station in snowy landscape.", audio_narration: "What does it take to survive and do cutting-edge science at minus 40 degrees?", text_overlay: "INDIA IN ANTARCTICA: BHARATI STATION" },
          { timecode: "0:08 - 0:22", visual_shot: "Scientist in bright red thermal suit drilling through ice.", audio_narration: "Meet the Indian scientists stationed in Larsemann Hills. Day and night, they track the pulse of Antarctica's coastal ice.", text_overlay: "MEASURING THE CRYO-PULSE" },
          { timecode: "0:22 - 0:40", visual_shot: "Graphic animation showing warm ocean currents sliding under ice.", audio_narration: "Their 10-year study revealed something alarming: warm currents from deep in the Southern Ocean are thinning coastal ice by 4 centimeters every decade.", text_overlay: "-4.2 CM / DECADE THINNING" },
          { timecode: "0:40 - 0:52", visual_shot: "Montage: penguin waddling past, scientists laughing in laboratory, Indian flag.", audio_narration: "Because what happens at the poles doesn't stay at the poles. It shapes India's monsoon, global sea levels, and our future.", text_overlay: "CONNECTING POLES TO MONSOONS" },
          { timecode: "0:52 - 1:00", visual_shot: "POLARIS logo animation with website link.", audio_narration: "Discover India's polar missions on POLARIS. India's Polar Knowledge, Connected.", text_overlay: "EXPLORE POLARIS PORTAL" }
        ],
        sound_design: "Wind ambiance fading into crisp electronic ambient beat; inspiring crescendo at ending.",
        hashtags: ["#Antarctica", "#ScienceReel", "#IndianScientists", "#Polaris", "#Explorer"]
      };
    } else {
      return {
        format: "Website Press Release",
        headline: "India's Polar Mission Quantifies Decadal Fast-Ice Dynamics at Bharati Station, Antarctica",
        dateline: "GOA / NEW DELHI — MoES / NCPOR",
        lead_paragraph: "Indian scientists deployed at Bharati Station in Larsemann Hills, East Antarctica, have published a landmark decadal evaluation documenting thermodynamic changes in Antarctic landfast sea ice. The study provides crucial observational evidence on how circumpolar ocean warming influences the cryospheric perimeter of East Antarctica.",
        quote: "\"Continuous long-term measurements from Bharati Station demonstrate India's commitment to delivering reliable, peer-reviewed polar observational records that contribute directly to global Intergovernmental Panel on Climate Change (IPCC) assessments,\" stated an official spokesperson from the Ministry of Earth Sciences.",
        public_context: "The research highlights that while atmospheric temperatures fluctuate, deep oceanic heat transport represents the dominant driver of coastal ice shelf thinning. Understanding these interactions is imperative for improving seasonal weather forecasts for the Indian subcontinent.",
        media_contact: "Polaris Outreach Division, National Centre for Polar and Ocean Research (NCPOR), Goa. Email: outreach@polaris.gov.in"
      };
    }
  },

  // Analytics
  async getAnalytics() {
    return INITIAL_ANALYTICS;
  }
};
