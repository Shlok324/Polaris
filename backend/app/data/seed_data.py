"""
POLARIS: Polar Knowledge, Research, Intelligence & Outreach System
Realistic DEMO Seed Data for Smart India Hackathon 2026.
All records are structured for production testing and marked as DEMO.
"""

from typing import List, Dict, Any

RESEARCH_STATIONS: List[Dict[str, Any]] = [
    {
        "id": "stat-bharati",
        "name": "Bharati",
        "alternate_name": "Bharati Antarctic Research Station",
        "region": "Antarctica",
        "location_name": "Larsemann Hills, East Antarctica",
        "latitude": -69.407778,
        "longitude": 76.187222,
        "elevation_m": 35,
        "established_year": 2012,
        "status": "Active",
        "description": "India's third Antarctic research facility and primary state-of-the-art laboratory hub, constructed using 134 prefabricated ISO containers encased in an aerodynamic double-skin envelope. Designed for minimum environmental footprint with zero-effluent discharge, combined heat-and-power cogenerators, and dedicated satellite broadband.",
        "climate_info": {
            "mean_temp_c": -12.5,
            "min_temp_c": -41.2,
            "max_wind_kmh": 210,
            "polar_night_days": 65,
            "polar_day_days": 68
        },
        "facilities": [
            "Oceanography & Marine Biology Lab",
            "Atmospheric LIDAR & Aerosol Shelter",
            "Continuous Satellite Telemetry Uplink (NCPOR Goa direct)",
            "Automated Weather Station (IMD)",
            "Clean Water Reverse Osmosis Plant",
            "Bio-filter Waste Treatment Plant",
            "Hydroponic Green House",
            "Medical Operating Theater & Telemedicine"
        ],
        "image_url": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
        "virtual_tour_url": "/explore/virtual-tour#bharati",
        "telemetry": {
            "temperature_c": -18.4,
            "wind_speed_kmh": 38.6,
            "wind_direction": "ESE",
            "pressure_hpa": 984.2,
            "relative_humidity": 68.0,
            "solar_radiation_wm2": 142.5,
            "status": "Operational - Normal",
            "last_updated": "2026-09-28T18:30:00Z"
        },
        "timeline": [
            {"year": 2006, "title": "Site Survey", "description": "National Expedition site selection committee finalizes promontory between Thala Fjord and Quilty Bay."},
            {"year": 2010, "title": "Construction Commencement", "description": "Foundation laid by 29th Indian Scientific Expedition using prefabricated thermal containers."},
            {"year": 2012, "title": "Official Commissioning", "description": "Bharati officially dedicated to the nation on 18 March 2012."},
            {"year": 2015, "title": "High-Speed Satellite Uplink", "description": "Dedicated Ka-band satellite ground terminal commissioned with direct secure pipeline to NCPOR Goa."},
            {"year": 2019, "title": "Clean Air Observatory", "description": "State-of-the-art trace gas and black carbon monitoring laboratory installed."},
            {"year": 2024, "title": "Laser LIDAR Cryosphere Profiler", "description": "Installation of dual-polarization atmospheric lidar for polar stratospheric cloud investigations."}
        ]
    },
    {
        "id": "stat-maitri",
        "name": "Maitri",
        "alternate_name": "Maitri Research Base",
        "region": "Antarctica",
        "location_name": "Schirmacher Oasis, Queen Maud Land",
        "latitude": -70.766111,
        "longitude": 11.730556,
        "elevation_m": 117,
        "established_year": 1989,
        "status": "Active",
        "description": "India's venerable second permanent Antarctic research base, operating continuously for over three decades on the rocky, ice-free plateau of Schirmacher Oasis adjacent to freshwater Lake Priyadarshini. Acts as the primary anchor for long-term geomagnetic, geological, and physiological research.",
        "climate_info": {
            "mean_temp_c": -10.2,
            "min_temp_c": -38.4,
            "max_wind_kmh": 195,
            "polar_night_days": 55,
            "polar_day_days": 58
        },
        "facilities": [
            "Geomagnetic Observatory (IIG)",
            "Lake Priyadarshini Water Intake System",
            "Seismology Vault & Broadband Seismometer",
            "Atmospheric Ozone & Greenhouse Gas Lab",
            "Central Boiler Heating System",
            "Helipad & Ice-Runway Link",
            "Workshop & Mechanical Depot"
        ],
        "image_url": "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80",
        "virtual_tour_url": "/explore/virtual-tour#maitri",
        "telemetry": {
            "temperature_c": -14.2,
            "wind_speed_kmh": 26.4,
            "wind_direction": "SE",
            "pressure_hpa": 991.8,
            "relative_humidity": 54.0,
            "solar_radiation_wm2": 180.0,
            "status": "Operational - Normal",
            "last_updated": "2026-09-28T18:30:00Z"
        },
        "timeline": [
            {"year": 1988, "title": "Construction Launch", "description": "Construction executed in record 40 days by Indian Army Corps of Engineers during the 7th ISEA."},
            {"year": 1989, "title": "Operational Handover", "description": "Commissioned in 1989, replacing Dakshin Gangotri which was submerged under snow."},
            {"year": 2004, "title": "Geodetic Super-Site", "description": "Permanent GPS receiver and absolute gravimeter installed for continental drift measurement."},
            {"year": 2018, "title": "Eco-Friendly Waste Retrofit", "description": "Advanced biological digestion system installed protecting Lake Priyadarshini catchment."}
        ]
    },
    {
        "id": "stat-himadri",
        "name": "Himadri",
        "alternate_name": "Himadri Arctic Research Station",
        "region": "Arctic",
        "location_name": "Ny-Ålesund, Spitsbergen, Svalbard, Norway",
        "latitude": 78.923611,
        "longitude": 11.922222,
        "elevation_m": 15,
        "established_year": 2008,
        "status": "Active",
        "description": "India's permanent Arctic research facility situated at 78°55'N in Ny-Ålesund, Svalbard—the northernmost permanent scientific community on Earth. Focuses on Arctic amplification, fjord biological cycles, atmospheric trace chemistry, and teleconnections between Arctic warming and the Indian summer monsoon.",
        "climate_info": {
            "mean_temp_c": -4.8,
            "min_temp_c": -29.6,
            "max_wind_kmh": 140,
            "polar_night_days": 115,
            "polar_day_days": 120
        },
        "facilities": [
            "Marine Ecology & Fjord Wet Laboratory",
            "Multi-Wavelength Sun Photometer",
            "Microbial Extremophile Incubation Suite",
            "High-Volume Aerosol Sampler",
            "Kings Bay Marine Sampling Boat Station"
        ],
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "virtual_tour_url": "/explore/virtual-tour#himadri",
        "telemetry": {
            "temperature_c": -2.1,
            "wind_speed_kmh": 18.2,
            "wind_direction": "NNE",
            "pressure_hpa": 1008.5,
            "relative_humidity": 79.0,
            "solar_radiation_wm2": 85.0,
            "status": "Operational - Normal",
            "last_updated": "2026-09-28T18:30:00Z"
        },
        "timeline": [
            {"year": 2007, "title": "First Indian Arctic Team", "description": "Initiation of Arctic science campaign in Svalbard archipelago."},
            {"year": 2008, "title": "Himadri Inauguration", "description": "Formal dedication on 2 July 2008, making India the 11th country to establish a dedicated Arctic station."},
            {"year": 2014, "title": "IndARC Mooring Deployment", "description": "Deployment of the nation's first sub-surface moored Arctic observatory."},
            {"year": 2023, "title": "Year-Round Overwintering", "description": "First successful winter overwintering research conducted by Indian scientists."}
        ]
    },
    {
        "id": "stat-himansh",
        "name": "Himansh",
        "alternate_name": "Himansh High-Altitude Field Station",
        "region": "Himalayas / Third Pole",
        "location_name": "Chandra Basin, Spiti Valley, Himachal Pradesh",
        "latitude": 32.418056,
        "longitude": 77.618611,
        "elevation_m": 4080,
        "established_year": 2016,
        "status": "Active",
        "description": "India's highest remote cryospheric observatory, established by NCPOR in the remote Chandra Basin at over 4,000 meters altitude. It tracks the health and discharge dynamics of benchmark glaciers including Sutri Dhaka, Batal, Samudra Tapu, and Gepang Gath to secure water resource models for the Indian subcontinent.",
        "climate_info": {
            "mean_temp_c": -1.2,
            "min_temp_c": -34.0,
            "max_wind_kmh": 120,
            "annual_snowfall_m": 4.5
        },
        "facilities": [
            "Ground Penetrating Glacier Radar Hub",
            "Automatic Weather & Precipitation Gauges",
            "Hydrological Discharge Weirs",
            "High-Altitude Solar Power Battery Array",
            "Emergency Satellite Telecommunication Dome"
        ],
        "image_url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        "virtual_tour_url": "/explore/virtual-tour#himansh",
        "telemetry": {
            "temperature_c": -6.5,
            "wind_speed_kmh": 14.5,
            "wind_direction": "WNW",
            "pressure_hpa": 625.0,
            "relative_humidity": 42.0,
            "solar_radiation_wm2": 620.0,
            "status": "Operational - Normal",
            "last_updated": "2026-09-28T18:30:00Z"
        },
        "timeline": [
            {"year": 2014, "title": "Cryospheric Field Trials", "description": "Preliminary mass balance profiling on Sutri Dhaka glacier."},
            {"year": 2016, "title": "Himansh Dedication", "description": "Formally inaugurated by Earth Sciences Minister to serve as Third Pole research headquarters."},
            {"year": 2021, "title": "Glacial Lake Outburst Early Warning", "description": "Autonomous water-level sensors integrated along high-risk moraine dams."}
        ]
    },
    {
        "id": "stat-indarc",
        "name": "IndARC",
        "alternate_name": "IndARC Sub-surface Moored Observatory",
        "region": "Arctic",
        "location_name": "Kongsfjorden Fjord, Svalbard (Submerged at 192m depth)",
        "latitude": 78.983333,
        "longitude": 12.016667,
        "elevation_m": -192,
        "established_year": 2014,
        "status": "Active",
        "description": "India's premier deep-ocean polar underwater observatory, tethered 192 meters beneath the icy waters of Kongsfjorden midway between Norway and the North Pole. Equipped with 10 state-of-the-art oceanographic sensors collecting salinity, temperature, currents, and chlorophyll continuously through the harsh polar winter.",
        "climate_info": {
            "depth_m": 192,
            "water_temp_c": 1.4,
            "salinity_psu": 34.8,
            "tidal_current_ms": 0.35
        },
        "facilities": [
            "Acoustic Doppler Current Profiler (ADCP)",
            "Sea-Bird SBE 37 MicroCAT CTD Array",
            "Aanderaa Dissolved Oxygen Optode",
            "WetLabs ECO Chlorophyll Fluorometer",
            "Dual Acoustic Release Transponders"
        ],
        "image_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
        "virtual_tour_url": "/explore/virtual-tour#indarc",
        "telemetry": {
            "temperature_c": 1.8,
            "wind_speed_kmh": 0.0,
            "wind_direction": "Subsurface Current 0.28 m/s NW",
            "pressure_hpa": 1012.0,
            "relative_humidity": 100.0,
            "solar_radiation_wm2": 0.0,
            "status": "Subsurface Active - Mooring Stable",
            "last_updated": "2026-09-28T18:30:00Z"
        },
        "timeline": [
            {"year": 2014, "title": "Maiden Deployment", "description": "IndARC successfully lowered to seabed in Kongsfjorden by Indian oceanographers."},
            {"year": 2015, "title": "First Full Annual Cycle", "description": "Recovered with 100% complete wintertime thermodynamic data revealing Atlantic water pulses."},
            {"year": 2022, "title": "Next-Gen Sensor Upgrade", "description": "High-accuracy nitrate and marine soundscape sensors integrated into the mooring harness."}
        ]
    }
]

EXPEDITIONS: List[Dict[str, Any]] = [
    {
        "id": "exp-isea-43",
        "expedition_number": "43rd ISEA",
        "name": "43rd Indian Scientific Expedition to Antarctica",
        "region": "Antarctica",
        "voyage_type": "Antarctic Scientific Expedition",
        "leader_name": "Dr. Yogesh Ray (Bharati) & Dr. Vipin M. (Maitri)",
        "vessel_name": "MV Vasiliy Golovnin (Chartered Ice-Class Vessel)",
        "start_date": "2023-11-23",
        "end_date": "2024-04-10",
        "year": 2024,
        "status": "Completed",
        "description": "Comprehensive summer and winter-over expedition deploying 48 scientists across Maitri and Bharati. Conducted deep ice sheet drilling, aerosol LIDAR profiling, and sea-ice biogeochemistry in Prydz Bay.",
        "objectives": [
            "Drill 120m shallow ice core at Polar Plateau to analyze volcanic ash and industrial aerosols.",
            "Deploy autonomous seismic nodes across Schirmacher Oasis to map deep crustal thickness.",
            "Sample fast-ice microbial communities during the transition from austral autumn to winter.",
            "Complete ecological survey of adelie and emperor penguin colonies near Haswell Island."
        ],
        "research_domains": ["Glaciology", "Atmospheric Sciences", "Oceanography", "Geophysics"],
        "researchers_count": 48,
        "publications_count": 14,
        "datasets_count": 9,
        "route_coordinates": [
            {"name": "Goa (NCPOR HQ)", "lat": 15.39, "lng": 73.81},
            {"name": "Cape Town (Bunkering Hub)", "lat": -33.92, "lng": 18.42},
            {"name": "Prydz Bay (Bharati Station)", "lat": -69.41, "lng": 76.19},
            {"name": "Princess Astrid Coast (Maitri Base)", "lat": -70.77, "lng": 11.73}
        ],
        "timeline_events": [
            {"date": "2023-11-23", "title": "Voyage Departure", "desc": "Flag-off from Mormugao Port, Goa with 48 scientific and logistics personnel."},
            {"date": "2023-12-14", "title": "Cape Town Port Call", "desc": "Bunkering, fuel loading, and final polar safety drills in South Africa."},
            {"date": "2024-01-02", "title": "Ice Shelf Arrival", "desc": "Reached Larsemann Hills shelf; sling operations by Kamov helicopters commenced."},
            {"date": "2024-03-28", "title": "Wintering Handover", "desc": "Winter team locked in; summer personnel departed for voyage home."}
        ]
    },
    {
        "id": "exp-isea-42",
        "expedition_number": "42nd ISEA",
        "name": "42nd Indian Scientific Expedition to Antarctica",
        "region": "Antarctica",
        "voyage_type": "Antarctic Scientific Expedition",
        "leader_name": "Dr. Shailendra Saini",
        "vessel_name": "MV Vasiliy Golovnin",
        "start_date": "2022-12-05",
        "end_date": "2023-04-18",
        "year": 2023,
        "status": "Completed",
        "description": "Focused on atmospheric boundary-layer physics, Southern Ocean eddy profiling, and geological mapping of previously unsurveyed nunataks in Queen Maud Land.",
        "objectives": [
            "Install automatic weather stations on inland blue ice areas.",
            "Recover long-term ocean sediment traps from Prydz Bay continental slope.",
            "Study human physiological adaptations to prolonged isolation under cold stress."
        ],
        "research_domains": ["Atmospheric Sciences", "Oceanography", "Geology", "Polar Biology"],
        "researchers_count": 42,
        "publications_count": 18,
        "datasets_count": 11,
        "route_coordinates": [
            {"name": "Goa", "lat": 15.39, "lng": 73.81},
            {"name": "Cape Town", "lat": -33.92, "lng": 18.42},
            {"name": "Larsemann Hills", "lat": -69.41, "lng": 76.19}
        ]
    },
    {
        "id": "exp-isea-41",
        "expedition_number": "41st ISEA",
        "name": "41st Indian Scientific Expedition to Antarctica",
        "region": "Antarctica",
        "voyage_type": "Antarctic Scientific Expedition",
        "leader_name": "Dr. K. P. Krishnan",
        "vessel_name": "MV Vasiliy Golovnin",
        "start_date": "2021-11-15",
        "end_date": "2022-04-05",
        "year": 2022,
        "status": "Completed",
        "description": "Crucial post-pandemic mission restoring critical scientific installations, conducting whiteout navigation trials, and initiating environmental soil remediation protocols.",
        "objectives": [
            "Re-commission automated atmospheric sampling equipment at Maitri and Bharati.",
            "Survey permafrost core boreholes in Larsemann Hills.",
            "Analyze microplastic contamination in Antarctic coastal surface waters."
        ],
        "research_domains": ["Environmental Sciences", "Glaciology", "Atmospheric Sciences"],
        "researchers_count": 39,
        "publications_count": 12,
        "datasets_count": 8,
        "route_coordinates": [
            {"name": "Goa", "lat": 15.39, "lng": 73.81},
            {"name": "Cape Town", "lat": -33.92, "lng": 18.42},
            {"name": "Maitri", "lat": -70.77, "lng": 11.73}
        ]
    },
    {
        "id": "exp-arctic-2024",
        "expedition_number": "Arctic-2024",
        "name": "Indian Arctic Scientific Expedition 2024",
        "region": "Arctic",
        "voyage_type": "Arctic Summer & Winter Campaign",
        "leader_name": "Dr. Avinash Kumar",
        "vessel_name": "MS Teisten / Research Vessel Lance",
        "start_date": "2024-03-01",
        "end_date": "2024-10-15",
        "year": 2024,
        "status": "Completed",
        "description": "Year-round multidisciplinary Arctic investigation focusing on fjord oceanography in Kongsfjorden, glacio-marine interactions at Kronebreen glacier, and atmospheric black carbon depositions.",
        "objectives": [
            "Continuous recovery and re-deployment of IndARC moored underwater observatory.",
            "Aerosol chemistry sampling during Arctic haze phenomenon.",
            "Investigation of marine psychrophilic bacteriophages in glacial meltwater plumes."
        ],
        "research_domains": ["Oceanography", "Polar Biology", "Atmospheric Sciences"],
        "researchers_count": 28,
        "publications_count": 15,
        "datasets_count": 10,
        "route_coordinates": [
            {"name": "New Delhi", "lat": 28.61, "lng": 77.20},
            {"name": "Oslo", "lat": 59.91, "lng": 10.75},
            {"name": "Longyearbyen", "lat": 78.22, "lng": 15.65},
            {"name": "Ny-Ålesund (Himadri)", "lat": 78.92, "lng": 11.92}
        ]
    },
    {
        "id": "exp-isoe-12",
        "expedition_number": "12th ISOE",
        "name": "12th Indian Southern Ocean Expedition",
        "region": "Southern Ocean",
        "voyage_type": "Southern Ocean Expedition",
        "leader_name": "Dr. Rohit Srivastava",
        "vessel_name": "ORV Sagar Kanya",
        "start_date": "2023-01-10",
        "end_date": "2023-03-05",
        "year": 2023,
        "status": "Completed",
        "description": "Cross-sectional oceanographic transect from subtropical waters to the Antarctic Divergence along 57°30'E meridian. Investigated biological carbon pump efficiency, trace metal biogeochemistry, and ocean acidification.",
        "objectives": [
            "Deploy 18 deep Argo profiling floats across the Antarctic Polar Front.",
            "Sample phytoplankton floristics and primary productivity across frontal zones.",
            "Quantify atmospheric dimethyl sulfide (DMS) emissions and cloud condensation nuclei."
        ],
        "research_domains": ["Oceanography", "Biogeochemistry", "Climate Modeling"],
        "researchers_count": 34,
        "publications_count": 16,
        "datasets_count": 12,
        "route_coordinates": [
            {"name": "Port Louis (Mauritius)", "lat": -20.16, "lng": 57.50},
            {"name": "Subtropical Front (40°S)", "lat": -40.00, "lng": 57.50},
            {"name": "Polar Front (50°S)", "lat": -50.00, "lng": 57.50},
            {"name": "Antarctic Continental Margin (66°S)", "lat": -66.50, "lng": 57.50}
        ]
    },
    {
        "id": "exp-himalaya-2024",
        "expedition_number": "ThirdPole-2024",
        "name": "Western Himalayan Cryospheric Research Campaign 2024",
        "region": "Himalayas / Third Pole",
        "voyage_type": "High Altitude Glacier Expedition",
        "leader_name": "Dr. Parmanand Sharma",
        "vessel_name": "Overland High-Altitude Field Convoy",
        "start_date": "2024-06-01",
        "end_date": "2024-09-30",
        "year": 2024,
        "status": "Completed",
        "description": "Intensive glaciological mass balance monitoring across six benchmark glaciers in Lahaul-Spiti valley using ground-penetrating radar, differential GPS, and automated ablation stakes.",
        "objectives": [
            "Measure seasonal net mass balance of Sutri Dhaka and Samudra Tapu glaciers.",
            "Survey glacier ice thickness using deep radar sounding to calibrate water volume reserves.",
            "Collect snow and supraglacial debris samples for black carbon and mineral dust quantification."
        ],
        "research_domains": ["Glaciology", "Hydrology", "Climate Change"],
        "researchers_count": 22,
        "publications_count": 11,
        "datasets_count": 8,
        "route_coordinates": [
            {"name": "NCPOR Field Base Manali", "lat": 32.24, "lng": 77.19},
            {"name": "Rohtang Pass", "lat": 32.37, "lng": 77.24},
            {"name": "Himansh Research Base (Spiti)", "lat": 32.42, "lng": 77.62}
        ]
    },
    {
        "id": "exp-isea-01",
        "expedition_number": "1st ISEA",
        "name": "1st Historic Indian Scientific Expedition to Antarctica",
        "region": "Antarctica",
        "voyage_type": "Antarctic Scientific Expedition",
        "leader_name": "Dr. S. Z. Qasim",
        "vessel_name": "MV Polar Circle (Norwegian Charter)",
        "start_date": "1981-12-06",
        "end_date": "1982-02-21",
        "year": 1982,
        "status": "Completed",
        "description": "The historic maiden mission code-named 'Operation Gangotri'. Commanded by Dr. Syed Zahoor Qasim, 21 brave Indian scientists landed on Queen Maud Land, hoisted the Indian tricolor on Antarctic ice, and established India as an Antarctic Treaty consultative party.",
        "objectives": [
            "Land first Indian scientific contingent safely on the frozen continent.",
            "Establish continuous automated unmanned meteorological station 'Dakshin Gangotri I'.",
            "Collect maiden rock, ice, and marine biological specimens for Indian laboratories."
        ],
        "research_domains": ["Pioneering Polar Science", "Geology", "Meteorology"],
        "researchers_count": 21,
        "publications_count": 25,
        "datasets_count": 6,
        "route_coordinates": [
            {"name": "Goa Port", "lat": 15.39, "lng": 73.81},
            {"name": "Mauritius", "lat": -20.16, "lng": 57.50},
            {"name": "Antarctic Ice Shelf (70°03'S)", "lat": -70.05, "lng": 12.00}
        ]
    },
    {
        "id": "exp-isea-30",
        "expedition_number": "30th ISEA",
        "name": "30th Indian Scientific Expedition to Antarctica (Bharati Construction)",
        "region": "Antarctica",
        "voyage_type": "Antarctic Scientific Expedition",
        "leader_name": "Dr. Rajesh Asthana",
        "vessel_name": "MV Ivan Papanin",
        "start_date": "2010-11-20",
        "end_date": "2011-04-12",
        "year": 2011,
        "status": "Completed",
        "description": "Landmark engineering and scientific expedition that transported over 1,500 metric tons of specialized building materials, heavy machinery, and containers to erect India's futuristic Bharati station in Larsemann Hills.",
        "objectives": [
            "Erect steel structural columns on bedrock foundation at promontory site.",
            "Assemble aerodynamic ISO modular residential and laboratory containers.",
            "Complete marine bathymetry of approaches into Thala Fjord for resupply vessels."
        ],
        "research_domains": ["Polar Engineering", "Oceanography", "Environmental Baseline"],
        "researchers_count": 56,
        "publications_count": 15,
        "datasets_count": 7,
        "route_coordinates": [
            {"name": "Cape Town", "lat": -33.92, "lng": 18.42},
            {"name": "Larsemann Hills (Bharati)", "lat": -69.41, "lng": 76.19}
        ]
    }
]

PUBLICATIONS: List[Dict[str, Any]] = [
    {
        "id": "pub-01",
        "title": "Decadal Trends in Antarctic Fast-Ice Thickness and Snow Cover in Prydz Bay from In-Situ Electromagnetic Induction Sounding",
        "authors": ["Dr. Anoop Kumar", "Dr. Shailendra Saini", "Dr. Thamban Meloth", "Dr. Rasik Ravindra"],
        "year": 2024,
        "publication_date": "2024-02-15",
        "journal": "Journal of Geophysical Research: Oceans (AGU)",
        "doi": "10.1029/2023JC020491",
        "record_id": "POLARIS-PUB-2024-001",
        "region": "Antarctica",
        "station_id": "stat-bharati",
        "station_name": "Bharati",
        "domain_id": "33333333-3333-3333-3333-333333333303",
        "domain_name": "Southern Ocean & Polar Oceanography",
        "abstract": "Continuous electromagnetic induction sounding measurements collected near Bharati Station between 2013 and 2023 reveal significant interannual variability in coastal fast-ice thickness within Prydz Bay. Mean thermodynamically grown ice thickness peaked at 1.84 ± 0.18 m, with an overall decadal thinning trend of 4.2 cm/decade correlated with warmer circumpolar deep water intrusions into the continental shelf troughs. Snow cover insulation was observed to suppress basal growth by up to 22% during late winter blizzards.",
        "simplified_school": "Scientists at India's Bharati Station used a special electromagnetic tool (like a metal detector for ice!) to measure how thick the sea ice is over 10 years. They discovered the ice averages about 1.8 meters thick—taller than most adults! But because ocean water from further north is getting a tiny bit warmer, the sea ice is getting about 4 centimeters thinner every ten years. Also, fluffy snow on top acts like a warm blanket, which actually slows down new ice from freezing underneath!",
        "simplified_college": "This study analyzes a 10-year observational time series (2013–2023) of landfast sea-ice and snow depth in Prydz Bay, East Antarctica using ground-based EM sounding. The empirical results show a net thinning rate of -4.2 cm/decade, driven predominantly by enhanced basal melt caused by modified Circumpolar Deep Water (mCDW) accessing the sub-ice cavity. The paper quantifies thermal conductive damping by the snow cover, showing that thermal insulation reduces negative degree-day ice growth efficiency by ~22%.",
        "executive_summary": "10-year in-situ observation at Bharati Station confirms a -4.2 cm/decade thinning of Prydz Bay fast-ice. Warm deep-water intrusions and snow insulation play pivotal roles in modulating sea-ice thermodynamic growth.",
        "keywords": ["fast-ice", "electromagnetic sounding", "Prydz Bay", "Bharati Station", "basal melt", "sea-ice thermodynamics"],
        "download_url": "/api/publications/download/POLARIS-PUB-2024-001.pdf",
        "citations_count": 34,
        "view_count": 2840,
        "status": "Published"
    },
    {
        "id": "pub-02",
        "title": "Aerosol Optical Properties and Radiative Forcing Over Schirmacher Oasis: Observations from Maitri Station",
        "authors": ["Dr. Rohit Srivastava", "Dr. Manoj Kumar", "Dr. S. K. Peshin"],
        "year": 2023,
        "publication_date": "2023-08-10",
        "journal": "Atmospheric Environment",
        "doi": "10.1016/j.atmosenv.2023.119854",
        "record_id": "POLARIS-PUB-2023-002",
        "region": "Antarctica",
        "station_id": "stat-maitri",
        "station_name": "Maitri",
        "domain_id": "33333333-3333-3333-3333-333333333301",
        "domain_name": "Atmospheric Sciences & Meteorology",
        "abstract": "Sun-photometer measurements of Aerosol Optical Depth (AOD) at 500 nm were conducted at Maitri Station during the 41st and 42nd Indian Antarctic Expeditions. Extremely pristine background conditions were recorded with mean baseline AOD values of 0.024 ± 0.008. Episodic spikes up to 0.082 were linked to long-range transboundary transport of Southern Hemisphere biomass-burning smoke and oceanic sea spray during circumpolar cyclonic passages.",
        "simplified_school": "The air over Antarctica is among the cleanest air in the entire world! Indian scientists at Maitri base measured microscopic particles in the sky called aerosols. Most days the sky is crystal clear. However, during giant polar storms, winds blow tiny particles of smoke and salt all the way from distant continents and oceans thousands of kilometers away!",
        "simplified_college": "Spectral AOD measurements across 380–1020 nm over Schirmacher Oasis quantify baseline continental Antarctic aerosols (mean AOD_500 = 0.024). Backward trajectory analysis demonstrates episodic enrichment via mid-latitude marine cyclones carrying aerosol plumes from South American and African fires across the Antarctic polar vortex boundary.",
        "executive_summary": "Antarctic air at Maitri remains benchmark pristine (AOD ~0.024), but trans-oceanic storm tracks intermittently inject mid-latitude biomass smoke and marine salts into the polar troposphere.",
        "keywords": ["aerosols", "AOD", "Maitri Station", "radiative forcing", "Schirmacher Oasis", "long-range transport"],
        "download_url": "/api/publications/download/POLARIS-PUB-2023-002.pdf",
        "citations_count": 22,
        "view_count": 1950,
        "status": "Published"
    },
    {
        "id": "pub-03",
        "title": "Winter Hydrography and Atlantic Water Inflow in Kongsfjorden: Insights from the IndARC Mooring Observatory",
        "authors": ["Dr. K. P. Krishnan", "Dr. Sanjeev Kumar", "Dr. Arnab Dey", "Dr. M. Ravichandran"],
        "year": 2024,
        "publication_date": "2024-01-22",
        "journal": "Polar Science",
        "doi": "10.1016/j.polar.2023.100987",
        "record_id": "POLARIS-PUB-2024-003",
        "region": "Arctic",
        "station_id": "stat-indarc",
        "station_name": "IndARC",
        "domain_id": "33333333-3333-3333-3333-333333333303",
        "domain_name": "Southern Ocean & Polar Oceanography",
        "abstract": "Continuous multi-year mooring data collected by India's IndARC observatory in Kongsfjorden at 192 m depth documents intense pulses of warm, saline Transformed Atlantic Water (TAW) intruding into the inner fjord during mid-winter. These pulses elevate bottom water temperatures by +2.8°C above freezing, completely preventing inner-fjord fast-ice formation and accelerating the basal melting of Kronebreen tidewater glacier.",
        "simplified_school": "Deep underwater in the Arctic, India placed an automated sensor called IndARC. It found that even in the freezing dark Arctic winter, pulses of warm salty water from the Atlantic Ocean sneak into the icy bay like a warm underwater river. This warm water stops the sea from freezing over and melts glaciers from below!",
        "simplified_college": "IndARC moored time-series observations demonstrate that atmospheric dipole pressure anomalies force pulsed cross-shelf intrusions of warm Transformed Atlantic Water into Svalbard fjords during November-February. This process, termed 'Atlantification', shifts the fjord thermal regime from polar to sub-polar conditions with major ramifications for cryospheric stability.",
        "executive_summary": "IndARC's year-round underwater data reveals winter Atlantic water surges raising fjord temperatures by +2.8°C, proving that Kongsfjorden's sea ice decline is heavily driven by oceanic advection rather than atmospheric warming alone.",
        "keywords": ["IndARC", "Kongsfjorden", "Atlantification", "Svalbard", "ocean mooring", "glacier melt"],
        "download_url": "/api/publications/download/POLARIS-PUB-2024-003.pdf",
        "citations_count": 47,
        "view_count": 3410,
        "status": "Published"
    },
    {
        "id": "pub-04",
        "title": "Ice Core Evidence of 200-Year Climate and Sea-Ice Variations from Coastal Dronning Maud Land, East Antarctica",
        "authors": ["Dr. Thamban Meloth", "Dr. C. M. Laluraj", "Dr. Mahalinganathan K."],
        "year": 2023,
        "publication_date": "2023-05-18",
        "journal": "The Cryosphere",
        "doi": "10.5194/tc-17-2105-2023",
        "record_id": "POLARIS-PUB-2023-004",
        "region": "Antarctica",
        "station_id": "stat-maitri",
        "station_name": "Maitri",
        "domain_id": "33333333-3333-3333-3333-333333333302",
        "domain_name": "Glaciology & Cryospheric Studies",
        "abstract": "High-resolution stable water isotope (δ18O, δD) and methanesulfonic acid (MSA) records from a 101 m ice core drilled in coastal Dronning Maud Land provide a continuous proxy reconstruction of local temperature and Weddell Sea sea-ice extent from 1810 to 2020. Results indicate significant multi-decadal variability coupled to the Southern Annular Mode (SAM) and Pacific Decadal Oscillation (PDO).",
        "simplified_school": "Scientists drilled a 100-meter deep cylinder of ice out of Antarctica—like taking a core out of a giant frozen tree! Because each layer of snow falls year after year, it traps bubbles of ancient air. By testing this ice, Indian researchers could look back 200 years in time to see how cold Antarctica was and how much sea ice existed before cars and factories were invented.",
        "simplified_college": "Isotopic and chemical profiling of the IND-101 ice core reconstructs climate proxies over two centuries in coastal East Antarctica. δ18O records show an overall warming trend of 0.18°C/century, while MSA proxy correlations with satellite sea-ice data validate its utility as a historical indicator for Weddell Sea ice-edge position.",
        "executive_summary": "101m ice core from Queen Maud Land unlocks 200 years of paleoclimate records, confirming modest warming and demonstrating teleconnections between polar ice and global oscillations like SAM and PDO.",
        "keywords": ["ice core", "paleoclimate", "stable isotopes", "SAM", "methanesulfonic acid", "cryosphere"],
        "download_url": "/api/publications/download/POLARIS-PUB-2023-004.pdf",
        "citations_count": 52,
        "view_count": 4120,
        "status": "Published"
    },
    {
        "id": "pub-05",
        "title": "Geodetic Mass Balance and Runoff Estimation for Sutri Dhaka Glacier, Western Himalayas (2015–2023)",
        "authors": ["Dr. Parmanand Sharma", "Dr. Lavkush Patel", "Dr. Bhanu Pratap"],
        "year": 2024,
        "publication_date": "2024-03-30",
        "journal": "Journal of Glaciology",
        "doi": "10.1017/jog.2024.12",
        "record_id": "POLARIS-PUB-2024-005",
        "region": "Himalayas / Third Pole",
        "station_id": "stat-himansh",
        "station_name": "Himansh",
        "domain_id": "33333333-3333-3333-3333-333333333302",
        "domain_name": "Glaciology & Cryospheric Studies",
        "abstract": "Using high-altitude differential GPS, UAV photogrammetry, and hydrological discharge measurements from the Himansh Observatory, we evaluate the 8-year mass balance of Sutri Dhaka Glacier in Chandra Basin. The glacier experienced an average mass loss rate of -0.68 ± 0.12 m water equivalent per year, accelerating after 2019 due to prolonged summer heat spells and reduced winter snowfall.",
        "simplified_school": "From India's mountain station Himansh, researchers climbed high onto the Sutri Dhaka glacier with drones and GPS tools. They found the glacier is losing about 68 centimeters of ice thickness every single year! Because glaciers feed rivers that millions of people drink from, tracking this melt is vital for water supplies.",
        "simplified_college": "High-resolution DEM differencing combined with glaciological stake networks over 2015–2023 reveals sustained negative mass balance (-0.68 m w.e./yr) on Sutri Dhaka Glacier. Equilibrium line altitude (ELA) shifted upvalley by 140 m, corroborating elevated runoff in the upper Chandra river basin.",
        "executive_summary": "Himansh station monitoring proves Sutri Dhaka glacier has lost 0.68 m w.e./year over 2015-2023, with summer melt spikes accelerating downstream runoff and altering regional water security.",
        "keywords": ["Himansh", "Sutri Dhaka", "glacier mass balance", "Third Pole", "Himalayan hydrology", "UAV photogrammetry"],
        "download_url": "/api/publications/download/POLARIS-PUB-2024-005.pdf",
        "citations_count": 29,
        "view_count": 2650,
        "status": "Published"
    },
    {
        "id": "pub-06",
        "title": "Diversity and Cold-Active Enzyme Potential of Psychrophilic Bacteria Isolated from Larsemann Hills Soil",
        "authors": ["Dr. K. P. Krishnan", "Dr. Archana Singh", "Dr. S. Shivaji"],
        "year": 2023,
        "publication_date": "2023-11-04",
        "journal": "Frontiers in Microbiology",
        "doi": "10.3389/fmicb.2023.1287654",
        "record_id": "POLARIS-PUB-2023-006",
        "region": "Antarctica",
        "station_id": "stat-bharati",
        "station_name": "Bharati",
        "domain_id": "33333333-3333-3333-3333-333333333304",
        "domain_name": "Polar Biology & Extremophile Microbiology",
        "abstract": "We isolated 64 psychrophilic and psychrotolerant bacterial strains from ice-free soil samples collected around Bharati Station. Taxonomic identification using 16S rRNA gene sequencing revealed dominant phyla including Pseudomonadota, Actinomycetota, and Bacteroidota. Several isolates demonstrated high protease and lipase enzyme activity at 4°C, presenting promising bio-industrial applications for cold-wash detergents and eco-friendly biocatalysis.",
        "simplified_school": "Even in freezing Antarctic soil, tiny microscopic life survives! Indian scientists scooped up soil near Bharati station and discovered super-tough bacteria that produce special natural chemicals that work even at freezing temperatures. These 'cold-loving' enzymes could help make laundry detergents that clean clothes perfectly in cold water, saving huge amounts of electricity!",
        "simplified_college": "Characterization of 64 psychrophiles from Larsemann Hills permafrost active layers revealed novel cold-active hydrolytic enzymes exhibiting catalytic peaks between 4°C and 15°C with high conformational flexibility. Isolates such as Polaribacter and Psychrobacter species offer green biotechnology applications for cold biocatalysis.",
        "executive_summary": "Discovery of 64 extremophile bacterial strains in Larsemann Hills soils capable of high-efficiency catalytic digestion at 4°C, providing valuable candidates for industrial biotechnology.",
        "keywords": ["psychrophiles", "cold-active enzymes", "Bharati Station", "extremophiles", "biotechnology", "polar biology"],
        "download_url": "/api/publications/download/POLARIS-PUB-2023-006.pdf",
        "citations_count": 38,
        "view_count": 3100,
        "status": "Published"
    },
    {
        "id": "pub-07",
        "title": "Lithospheric Structure and Crustal Evolution of Queen Maud Land: Insights from Maitri Broadband Seismic Station",
        "authors": ["Dr. O. P. Mishra", "Dr. G. Suresh", "Dr. Rajesh Asthana"],
        "year": 2022,
        "publication_date": "2022-09-14",
        "journal": "Precambrian Research",
        "doi": "10.1016/j.precamres.2022.106743",
        "record_id": "POLARIS-PUB-2022-007",
        "region": "Antarctica",
        "station_id": "stat-maitri",
        "station_name": "Maitri",
        "domain_id": "33333333-3333-3333-3333-333333333305",
        "domain_name": "Geology, Geophysics & Paleomagnetism",
        "abstract": "Receiver function analysis using teleseismic earthquake recordings from the permanent broadband seismometer at Maitri Station determines the Moho depth beneath Schirmacher Oasis to be 38.5 ± 1.5 km. The crustal Poisson ratio (0.27) confirms a felsic-to-intermediate upper-to-middle crust, supporting geological reconstructions linking East Antarctica with Eastern Ghats of peninsular India during the supercontinent Gondwana.",
        "simplified_school": "Did you know that hundreds of millions of years ago, India and Antarctica were joined together in one giant continent called Gondwana? By listening to deep earthquake vibrations with a sensitive instrument at Maitri station, scientists mapped the deep rocks 38 kilometers under the ice. The rock layers match rocks found in Eastern India, proving they were once next-door neighbors!",
        "simplified_college": "Teleseismic receiver function inversion from Maitri broadband seismic records establishes a 38.5 km Moho discontinuity. Comparative geochemical and seismic anisotropy signatures align with the Eastern Ghats Mobile Belt of India, reinforcing Proterozoic collisional suture models between India and Dronning Maud Land.",
        "executive_summary": "Maitri seismic observatory identifies a 38.5 km crustal thickness beneath Schirmacher Oasis, providing geophysical evidence tying East Antarctica to Eastern India under ancient Gondwana.",
        "keywords": ["seismology", "Moho depth", "Gondwana", "Maitri Station", "crustal structure", "geophysics"],
        "download_url": "/api/publications/download/POLARIS-PUB-2022-007.pdf",
        "citations_count": 41,
        "view_count": 2180,
        "status": "Published"
    },
    {
        "id": "pub-08",
        "title": "Air-Sea CO2 Fluxes and Ocean Acidification Metrics Across the Indian Sector of the Southern Ocean",
        "authors": ["Dr. Rohit Srivastava", "Dr. V. Venkataramana", "Dr. N. Anilkumar"],
        "year": 2024,
        "publication_date": "2024-04-12",
        "journal": "Global Biogeochemical Cycles",
        "doi": "10.1029/2023GB007954",
        "record_id": "POLARIS-PUB-2024-008",
        "region": "Southern Ocean",
        "station_id": None,
        "station_name": "Southern Ocean Transect",
        "domain_id": "33333333-3333-3333-3333-333333333303",
        "domain_name": "Southern Ocean & Polar Oceanography",
        "abstract": "Underway high-precision pCO2 and pH observations obtained aboard ORV Sagar Kanya along the 57°30'E meridian quantify the carbon sink strength of the Southern Ocean. The Subtropical Front acts as a robust CO2 sink (-2.4 mmol C m⁻² d⁻¹), whereas the Polar Front Zone exhibits seasonal outgassing driven by intense upwelling of carbon-rich Deep Water.",
        "simplified_school": "The wild Southern Ocean surrounding Antarctica is one of the Earth's greatest carbon sponges! On an Indian research ship, scientists sailed through 10-meter-high waves to measure how much carbon dioxide gas the ocean drinks up from the air. In some zones, the ocean absorbs huge amounts of carbon, helping fight global warming, while in other zones, deep bubbling waters release it.",
        "simplified_college": "High-resolution underway pCO2 mapping along 57.5°E across multiple frontal boundaries distinguishes biological uptake zones from upwelling-dominated outgassing regimes. Aragonite saturation states decrease sharply south of 55°S (Ω_arag < 1.3), highlighting early vulnerabilities of pteropods to ocean acidification.",
        "executive_summary": "12th ISOE findings quantify Southern Ocean carbon uptake dynamics, identifying the Subtropical Front as an intense sink while southern upwelling fronts show declining aragonite saturation.",
        "keywords": ["Southern Ocean", "carbon sink", "pCO2", "ocean acidification", "Sagar Kanya", "biogeochemistry"],
        "download_url": "/api/publications/download/POLARIS-PUB-2024-008.pdf",
        "citations_count": 31,
        "view_count": 2490,
        "status": "Published"
    }
]

DATASETS: List[Dict[str, Any]] = [
    {
        "id": "ds-01",
        "title": "Decadal High-Resolution Fast-Ice Thickness & Snow Depth Time Series (Prydz Bay, Antarctica)",
        "record_id": "POLARIS-DS-2024-001",
        "region": "Antarctica",
        "station_id": "stat-bharati",
        "station_name": "Bharati",
        "domain_name": "Southern Ocean & Polar Oceanography",
        "year": 2024,
        "format": "NetCDF",
        "file_size_mb": 142.5,
        "temporal_coverage": "2013-01-01 to 2023-12-31",
        "spatial_coverage": "69°20'S–69°35'S, 75°50'E–76°30'E",
        "download_url": "/api/datasets/download/POLARIS-DS-2024-001.nc",
        "parameters": ["ice_thickness_m", "snow_depth_cm", "freeboard_m", "surface_temp_k", "em_conductivity"],
        "status": "Published"
    },
    {
        "id": "ds-02",
        "title": "Year-Round Moored Oceanographic Physical & Biogeochemical Time Series (IndARC, Kongsfjorden)",
        "record_id": "POLARIS-DS-2024-002",
        "region": "Arctic",
        "station_id": "stat-indarc",
        "station_name": "IndARC",
        "domain_name": "Southern Ocean & Polar Oceanography",
        "year": 2024,
        "format": "NetCDF",
        "file_size_mb": 286.0,
        "temporal_coverage": "2014-07-01 to 2023-09-30",
        "spatial_coverage": "78°59'N, 12°01'E (192m depth)",
        "download_url": "/api/datasets/download/POLARIS-DS-2024-002.nc",
        "parameters": ["potential_temperature_c", "practical_salinity", "current_u_ms", "current_v_ms", "dissolved_o2_umol", "turbidity_ntu"],
        "status": "Published"
    },
    {
        "id": "ds-03",
        "title": "30-Year Maitri Station Surface Meteorological & Surface Radiation Archive",
        "record_id": "POLARIS-DS-2023-003",
        "region": "Antarctica",
        "station_id": "stat-maitri",
        "station_name": "Maitri",
        "domain_name": "Atmospheric Sciences & Meteorology",
        "year": 2023,
        "format": "CSV",
        "file_size_mb": 68.4,
        "temporal_coverage": "1990-01-01 to 2023-12-31",
        "spatial_coverage": "70°45'S, 11°44'E",
        "download_url": "/api/datasets/download/POLARIS-DS-2023-003.csv",
        "parameters": ["surface_air_temp_c", "wind_speed_ms", "wind_direction_deg", "station_pressure_hpa", "direct_solar_radiation_wm2", "total_ozone_dobson"],
        "status": "Published"
    },
    {
        "id": "ds-04",
        "title": "Himalayan Glacier Geodetic Mass Balance & Surface Velocity Grids (Chandra Basin)",
        "record_id": "POLARIS-DS-2024-004",
        "region": "Himalayas / Third Pole",
        "station_id": "stat-himansh",
        "station_name": "Himansh",
        "domain_name": "Glaciology & Cryospheric Studies",
        "year": 2024,
        "format": "GeoTIFF",
        "file_size_mb": 512.0,
        "temporal_coverage": "2015-06-01 to 2023-10-31",
        "spatial_coverage": "32°10'N–32°35'N, 77°20'E–77°45'E",
        "download_url": "/api/datasets/download/POLARIS-DS-2024-004.tif",
        "parameters": ["surface_elevation_change_m", "glacier_velocity_m_yr", "ice_thickness_radar_m", "snow_water_equivalent_mm"],
        "status": "Published"
    },
    {
        "id": "ds-05",
        "title": "Underway Continuous Surface Ocean pCO2 and Atmospheric CO2 (12th Southern Ocean Expedition)",
        "record_id": "POLARIS-DS-2023-005",
        "region": "Southern Ocean",
        "station_id": None,
        "station_name": "Southern Ocean Transect",
        "domain_name": "Southern Ocean & Polar Oceanography",
        "year": 2023,
        "format": "CSV",
        "file_size_mb": 34.2,
        "temporal_coverage": "2023-01-10 to 2023-03-05",
        "spatial_coverage": "20°S to 66.5°S along 57.5°E",
        "download_url": "/api/datasets/download/POLARIS-DS-2023-005.csv",
        "parameters": ["pco2_sea_uatm", "pco2_air_uatm", "sea_surface_temp_c", "sea_surface_salinity", "dissolved_inorganic_carbon"],
        "status": "Published"
    },
    {
        "id": "ds-06",
        "title": "Antarctic Continental Ice Core IND-101 Chemistry & Stable Water Isotope Profiles",
        "record_id": "POLARIS-DS-2023-006",
        "region": "Antarctica",
        "station_id": "stat-maitri",
        "station_name": "Maitri",
        "domain_name": "Glaciology & Cryospheric Studies",
        "year": 2023,
        "format": "ASCII",
        "file_size_mb": 18.5,
        "temporal_coverage": "1810-01-01 to 2020-12-31",
        "spatial_coverage": "70°51'S, 11°32'E (Depth: 0–101 m)",
        "download_url": "/api/datasets/download/POLARIS-DS-2023-006.dat",
        "parameters": ["depth_m", "water_equivalent_year", "delta_18o_permil", "delta_d_permil", "d_excess_permil", "msa_ppb", "sea_salt_na_ppb"],
        "status": "Published"
    }
]

MEDIA_ASSETS: List[Dict[str, Any]] = [
    {
        "id": "med-01",
        "title": "Bharati Research Station during Austral Summer Midnight Sun",
        "media_type": "Photograph",
        "caption": "Panoramic high-resolution capture of the aerodynamic Bharati Station standing on stilts over Larsemann Hills bedrock, East Antarctica, under the golden glow of 24-hour polar sunlight.",
        "photographer_author": "NCPOR Expedition Photography Unit",
        "year": 2024,
        "region": "Antarctica",
        "station_name": "Bharati",
        "expedition_name": "43rd ISEA",
        "file_url": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=85",
        "thumbnail_url": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80",
        "tags": ["Bharati", "Architecture", "Midnight Sun", "Antarctica", "Larsemann Hills"],
        "resolution": "5472 x 3648"
    },
    {
        "id": "med-02",
        "title": "Glaciologist Drilling Ice Core on the Polar Plateau",
        "media_type": "Photograph",
        "caption": "Indian cryospheric researchers operating an electromechanical thermal drill to extract paleoclimate ice cores in Queen Maud Land.",
        "photographer_author": "Dr. Thamban Meloth",
        "year": 2023,
        "region": "Antarctica",
        "station_name": "Maitri",
        "expedition_name": "42nd ISEA",
        "file_url": "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1600&q=85",
        "thumbnail_url": "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=600&q=80",
        "tags": ["Glaciology", "Ice Core", "Science in Action", "Queen Maud Land"],
        "resolution": "4896 x 3264"
    },
    {
        "id": "med-03",
        "title": "Himadri Arctic Research Station in Ny-Ålesund Under Midnight Glow",
        "media_type": "Photograph",
        "caption": "India's permanent scientific base in Ny-Ålesund, Svalbard, with majestic snow-covered peaks and Kongsfjorden fjord in the background.",
        "photographer_author": "NCPOR Arctic Division",
        "year": 2024,
        "region": "Arctic",
        "station_name": "Himadri",
        "expedition_name": "Arctic-2024",
        "file_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
        "thumbnail_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        "tags": ["Himadri", "Arctic", "Svalbard", "Ny-Alesund", "Fjord"],
        "resolution": "6000 x 4000"
    },
    {
        "id": "med-04",
        "title": "Himansh Observatory Facing Sutri Dhaka Glacier in Spiti",
        "media_type": "Photograph",
        "caption": "High-altitude research outpost Himansh (4,080m) in the Chandra Basin, monitoring glaciological mass balance in the Western Himalayas.",
        "photographer_author": "Himalayan Cryosphere Team",
        "year": 2023,
        "region": "Himalayas / Third Pole",
        "station_name": "Himansh",
        "expedition_name": "ThirdPole-2024",
        "file_url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
        "thumbnail_url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
        "tags": ["Himansh", "Third Pole", "Spiti", "Himalayas", "Glaciers"],
        "resolution": "5184 x 3456"
    },
    {
        "id": "med-05",
        "title": "Deployment of the IndARC Deep Moored Oceanographic Sensor Array",
        "media_type": "Photograph",
        "caption": "Marine technicians lowering the multi-sensor IndARC mooring frame into the frigid depths of Kongsfjorden from the research vessel.",
        "photographer_author": "Dr. K. P. Krishnan",
        "year": 2022,
        "region": "Arctic",
        "station_name": "IndARC",
        "expedition_name": "Arctic-2024",
        "file_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85",
        "thumbnail_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        "tags": ["IndARC", "Underwater", "Oceanography", "Sensors", "Kongsfjorden"],
        "resolution": "4000 x 3000"
    },
    {
        "id": "med-06",
        "title": "Southern Ocean Storm Navigation Aboard ORV Sagar Kanya",
        "media_type": "Photograph",
        "caption": "Indian oceanographic research vessel braving the Roaring Forties and Furious Fifties during the 12th Indian Southern Ocean Expedition.",
        "photographer_author": "Dr. Rohit Srivastava",
        "year": 2023,
        "region": "Southern Ocean",
        "station_name": None,
        "expedition_name": "12th ISOE",
        "file_url": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=85",
        "thumbnail_url": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80",
        "tags": ["Sagar Kanya", "Southern Ocean", "Waves", "Oceanography", "Navigation"],
        "resolution": "4500 x 3000"
    },
    {
        "id": "med-07",
        "title": "Adelie Penguin Colony on Sea-Ice Edge Near Larsemann Hills",
        "media_type": "Photograph",
        "caption": "Curious group of Adelie penguins resting on fast ice near Bharati Station during the spring ice break-up.",
        "photographer_author": "Polar Biology Observation Unit",
        "year": 2024,
        "region": "Antarctica",
        "station_name": "Bharati",
        "expedition_name": "43rd ISEA",
        "file_url": "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1600&q=85",
        "thumbnail_url": "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=600&q=80",
        "tags": ["Penguins", "Wildlife", "Biodiversity", "Fast Ice", "Larsemann Hills"],
        "resolution": "5000 x 3333"
    },
    {
        "id": "med-08",
        "title": "Historical Hoisting of the Indian Tricolor at Dakshin Gangotri (1981)",
        "media_type": "Photograph",
        "caption": "Dr. S. Z. Qasim and the pioneer scientists of the 1st Indian Expedition hoisting the national flag on Antarctic ice shelf.",
        "photographer_author": "Historic Expedition Archives (MoES/NCPOR)",
        "year": 1982,
        "region": "Antarctica",
        "station_name": None,
        "expedition_name": "1st ISEA",
        "file_url": "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=1600&q=85",
        "thumbnail_url": "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=600&q=80",
        "tags": ["History", "First Expedition", "Dr. S.Z. Qasim", "Pioneers", "1981"],
        "resolution": "3200 x 2400"
    }
]

EDUCATIONAL_MODULES: List[Dict[str, Any]] = [
    {
        "id": "edu-01",
        "title": "Life at an Antarctic Research Station: Surviving & Working at Bharati",
        "slug": "life-at-antarctic-station",
        "target_audience": "School & College Students",
        "category": "Polar Exploration & Living",
        "reading_time_mins": 12,
        "points_reward": 100,
        "summary": "Step inside Bharati, India's high-tech Antarctic laboratory on stilts! Explore how 25 Indian scientists survive sub-zero temperatures, manage water and fuel, cook fresh meals, run experiments in 24-hour darkness, and stay mentally strong.",
        "thumbnail_url": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
        "is_featured": True,
        "sections": [
            {
                "title": "1. Introduction: The White Continent",
                "content": "Antarctica is the coldest, windiest, and driest continent on Earth. It holds about 70% of the world's freshwater and 90% of its ice. India has been an active consultative member of the Antarctic Treaty System since 1983. Bharati, constructed in 2012 in the Larsemann Hills of East Antarctica, is India's most modern scientific fortress."
            },
            {
                "title": "2. The Architecture of Bharati",
                "content": "Bharati is built like a spacecraft! It is constructed from 134 prefabricated ISO shipping containers, enclosed in a high-tech aerodynamic double shell that lets freezing 200 km/h blizzard winds glide smoothly around it. The entire base is raised on stilts so drifting snow blows underneath rather than burying the building."
            },
            {
                "title": "3. Daily Life in Extreme Isolation",
                "content": "A typical day begins at 7:00 AM. Scientists check computerized environmental controls, eat breakfast prepared by the team chef in the central galley, and hold a morning briefing. Outside work requires heavy thermal suits, polar goggles, and buddy systems. Even a short walk to the atmospheric LIDAR hut requires radio sign-out."
            },
            {
                "title": "4. Green Technologies and Zero Effluent",
                "content": "Under the strict Antarctic Environmental Protocol (Madrid Protocol), nothing can be left behind. Bharati purifies seawater through reverse osmosis and processes all wastewater using biological bioreactors. Purified graywater is recycled, and all solid ash is safely compacted and shipped back to India for responsible disposal."
            },
            {
                "title": "5. The Psychological Challenge of Polar Night",
                "content": "During the austral winter, the sun disappears below the horizon for over 60 consecutive days! The crew experiences perpetual darkness. To combat Seasonal Affective Disorder (SAD), scientists use full-spectrum circadian light therapy, maintain daily gym routines, and hold community movie nights and celebrations on Indian festivals like Diwali."
            }
        ],
        "quiz": [
            {
                "id": "q1",
                "question_text": "Why is India's Bharati Station constructed on elevated stilts?",
                "options": [
                    "To prevent polar bears from climbing inside",
                    "To allow howling blizzard snowdrifts to blow beneath without burying the station",
                    "To get closer to satellite signals",
                    "To keep the building warm with volcanic steam"
                ],
                "correct_option_index": 1,
                "explanation": "Elevating the station on stilts allows fierce katabatic blizzard winds to pass under the building, preventing snowdrifts from accumulating and burying the living quarters."
            },
            {
                "id": "q2",
                "question_text": "What is the environmental rule for waste management at Indian Antarctic stations?",
                "options": [
                    "Waste is burned in open pits",
                    "Waste is dumped into the deep ocean",
                    "Zero-effluent discharge; wastewater is bio-treated and solid residue is packed and shipped back to India",
                    "Trash is frozen inside glaciers"
                ],
                "correct_option_index": 2,
                "explanation": "Under the Madrid Protocol, India enforces strict zero-effluent discharge protocols. All non-organic waste and bio-digested ash are containerized and repatriated to India."
            },
            {
                "id": "q3",
                "question_text": "How many days does the sun remain below the horizon (Polar Night) at Bharati Station?",
                "options": [
                    "About 10 days",
                    "Exactly 365 days",
                    "Approximately 65 days",
                    "Zero days; Antarctica is always sunny"
                ],
                "correct_option_index": 2,
                "explanation": "Because of Bharati's high southern latitude (-69.4°S), the sun stays completely below the horizon for approximately 65 continuous days during mid-winter (June–July)."
            },
            {
                "id": "q4",
                "question_text": "Which Indian organization is the nodal agency responsible for managing India's polar expeditions?",
                "options": [
                    "ISRO (Indian Space Research Organisation)",
                    "NCPOR (National Centre for Polar and Ocean Research, Goa)",
                    "DRDO (Defence Research and Development Organisation)",
                    "ICAR (Indian Council of Agricultural Research)"
                ],
                "correct_option_index": 1,
                "explanation": "The National Centre for Polar and Ocean Research (NCPOR) located in Vasco da Gama, Goa, under the Ministry of Earth Sciences, coordinates all Antarctic, Arctic, Southern Ocean, and Himalayan expeditions."
            }
        ]
    },
    {
        "id": "edu-02",
        "title": "The Indian Arctic Mission: Science at 79° North (Himadri & IndARC)",
        "slug": "indian-arctic-mission",
        "target_audience": "School & College Students",
        "category": "Arctic Science & Teleconnections",
        "reading_time_mins": 10,
        "points_reward": 80,
        "summary": "Explore why Indian scientists travel nearly 8,000 kilometers north to Svalbard to understand how Arctic melting directly alters India's monsoon rainfall, and discover IndARC—India's underwater deep-ocean observatory.",
        "thumbnail_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "is_featured": True,
        "sections": [
            {
                "title": "1. Why Does India Study the Arctic?",
                "content": "The Arctic is warming nearly four times faster than the global average—a phenomenon known as 'Arctic Amplification'. Changes in Arctic sea ice destabilize the Northern Hemisphere Jet Stream, which directly influences the timing, strength, and spatial distribution of the Indian Summer Monsoon that feeds over a billion people."
            },
            {
                "title": "2. Himadri Station in Ny-Ålesund",
                "content": "Established in 2008 in Ny-Ålesund (Spitsbergen Island, Svalbard), Himadri is India's northernmost scientific base. Here, Indian scientists work alongside researchers from Norway, Germany, France, the UK, Japan, and Korea to analyze long-range atmospheric pollutants and glacier retreat."
            },
            {
                "title": "3. IndARC: The Submerged Sentinel",
                "content": "In 2014, Indian marine researchers deployed IndARC, an underwater mooring tethered 192 meters down on the floor of Kongsfjorden fjord. It records ocean salinity, water temperatures, and plankton year-round, even when the surface of the fjord is covered in jagged ice."
            }
        ],
        "quiz": [
            {
                "id": "qa1",
                "question_text": "What is the primary scientific reason India studies the Arctic region?",
                "options": [
                    "To mine gold and diamonds",
                    "Because Arctic sea ice loss alters the jet stream and impacts the Indian summer monsoon",
                    "To establish tourist hotels",
                    "To search for woolly mammoths"
                ],
                "correct_option_index": 1,
                "explanation": "Climate teleconnections connect polar ice dynamics with tropical weather patterns. Rapid Arctic warming modifies planetary wave patterns, affecting India's monsoon rainfall predictability."
            },
            {
                "id": "qa2",
                "question_text": "Where is India's underwater moored observatory 'IndARC' located?",
                "options": [
                    "Bay of Bengal",
                    "Kongsfjorden Fjord, Svalbard (Arctic)",
                    "Lake Priyadarshini (Antarctica)",
                    "Spiti Valley"
                ],
                "correct_option_index": 1,
                "explanation": "IndARC is deployed at a depth of 192 meters in Kongsfjorden fjord, Svalbard, in the high Arctic."
            }
        ]
    },
    {
        "id": "edu-03",
        "title": "Himalayan Cryosphere: Protecting India's Third Pole",
        "slug": "himalayan-cryosphere",
        "target_audience": "All Audiences",
        "category": "Third Pole Glaciology",
        "reading_time_mins": 9,
        "points_reward": 75,
        "summary": "The Himalayas contain the largest concentration of ice outside the polar regions, earning the title 'The Third Pole'. Discover how NCPOR's Himansh station guards glacier reserves that feed the Indus, Ganges, and Brahmaputra rivers.",
        "thumbnail_url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        "is_featured": True,
        "sections": [
            {
                "title": "1. The Third Pole and India's Water Towers",
                "content": "Himalayan glaciers feed ten major Asian river systems that support more than 1.9 billion people. Because of their immense elevation and volume, the Hindu Kush Himalayas are internationally designated as the 'Third Pole'."
            },
            {
                "title": "2. Himansh Station at 4,000+ Meters",
                "content": "Set up in 2016 in the high Chandra Basin of Himachal Pradesh, Himansh allows scientists to camp right beside retreating glaciers. Using ground-penetrating radar (GPR) and automated weather stations, researchers measure how quickly snow and ice are retreating."
            }
        ],
        "quiz": [
            {
                "id": "qh1",
                "question_text": "Why are the Himalayas often referred to as Earth's 'Third Pole'?",
                "options": [
                    "Because they have the magnetic north pole inside them",
                    "Because they hold the largest volume of permanent ice and snow outside the Arctic and Antarctic",
                    "Because polar bears live there",
                    "Because it is the third coldest country"
                ],
                "correct_option_index": 1,
                "explanation": "The Hindu Kush Himalayan region contains more glacial ice than anywhere else on Earth outside the Arctic and Antarctic, giving it the title 'Third Pole'."
            }
        ]
    }
]

ANALYTICS_DATA: Dict[str, Any] = {
    "summary_metrics": {
        "total_repository_views": 142890,
        "total_search_queries": 38420,
        "publications_indexed": 1248,
        "datasets_downloaded": 12980,
        "student_lessons_completed": 8740,
        "ai_queries_answered": 19310,
        "active_research_stations": 5,
        "expeditions_documented": 44
    },
    "monthly_access_trend": [
        {"month": "Apr", "views": 8400, "downloads": 720, "ai_queries": 1100},
        {"month": "May", "views": 9800, "downloads": 890, "ai_queries": 1340},
        {"month": "Jun", "views": 11200, "downloads": 1050, "ai_queries": 1680},
        {"month": "Jul", "views": 12600, "downloads": 1180, "ai_queries": 1920},
        {"month": "Aug", "views": 14100, "downloads": 1340, "ai_queries": 2210},
        {"month": "Sep", "views": 16800, "downloads": 1590, "ai_queries": 2780},
        {"month": "Oct", "views": 15400, "downloads": 1420, "ai_queries": 2450},
        {"month": "Nov", "views": 18200, "downloads": 1780, "ai_queries": 2990},
        {"month": "Dec", "views": 21500, "downloads": 2100, "ai_queries": 3480},
        {"month": "Jan", "views": 24300, "downloads": 2400, "ai_queries": 3950},
        {"month": "Feb", "views": 22100, "downloads": 2150, "ai_queries": 3600},
        {"month": "Mar", "views": 23400, "downloads": 2290, "ai_queries": 3720}
    ],
    "regional_distribution": [
        {"region": "Antarctica", "percentage": 58, "count": 724, "color": "#523528"},
        {"region": "Arctic", "percentage": 24, "count": 298, "color": "#76543F"},
        {"region": "Himalayas / Third Pole", "percentage": 12, "count": 150, "color": "#A67C5B"},
        {"region": "Southern Ocean", "percentage": 6, "count": 76, "color": "#B49A82"}
    ],
    "content_type_breakdown": [
        {"type": "Research Publications", "count": 1248, "color": "#523528"},
        {"type": "Scientific Datasets", "count": 542, "color": "#76543F"},
        {"type": "Expedition Reports", "count": 184, "color": "#8C6747"},
        {"type": "Photographs & Media", "count": 1120, "color": "#A67C5B"},
        {"type": "Educational Modules", "count": 48, "color": "#B49A82"}
    ],
    "top_searched_keywords": [
        {"keyword": "Bharati climate", "searches": 4820},
        {"keyword": "Maitri ice core", "searches": 3910},
        {"keyword": "Svalbard IndARC mooring", "searches": 3240},
        {"keyword": "Sutri Dhaka mass balance", "searches": 2890},
        {"keyword": "Prydz Bay fast ice", "searches": 2450},
        {"keyword": "Southern Ocean CO2 flux", "searches": 2180},
        {"keyword": "Antarctic extremophiles", "searches": 1940}
    ],
    "station_activity_levels": [
        {"station": "Bharati", "active_projects": 34, "scientists_field": 24, "data_streams": 18, "status": "Peak Austral Campaign"},
        {"station": "Maitri", "active_projects": 28, "scientists_field": 18, "data_streams": 14, "status": "Continuous Monitoring"},
        {"station": "Himadri", "active_projects": 19, "scientists_field": 8, "data_streams": 9, "status": "Active Fjord Season"},
        {"station": "Himansh", "active_projects": 14, "scientists_field": 6, "data_streams": 7, "status": "Melt Season Profiling"},
        {"station": "IndARC", "active_projects": 8, "scientists_field": 0, "data_streams": 10, "status": "Autonomous Underwater Transmission"}
    ]
}
