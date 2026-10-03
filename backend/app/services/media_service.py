"""
POLARIS Media Studio Service: Transforms scientific research into outreach-ready dissemination content.
Supports Instagram, LinkedIn, Press Summaries, Video Scripts, and Educational Infographics.
"""

from typing import Dict, Any, Optional
from app.data.seed_data import PUBLICATIONS

class PolarisMediaService:
    def generate_content(
        self,
        content_id: Optional[str] = None,
        content_text: Optional[str] = None,
        content_title: Optional[str] = None,
        output_type: str = "instagram",
        tone: str = "inspirational"
    ) -> Dict[str, Any]:
        target_pub = None
        if content_id:
            for pub in PUBLICATIONS:
                if pub["id"] == content_id or pub["record_id"] == content_id:
                    target_pub = pub
                    break

        title = content_title or (target_pub["title"] if target_pub else "Antarctic Climate Research at Bharati Station")
        text = content_text or (target_pub["abstract"] if target_pub else "Observations indicate sea ice thinning of 4.2 cm per decade modulated by warm ocean currents.")
        station_name = target_pub.get("station_name", "Bharati") if target_pub else "Bharati Station"
        region = target_pub.get("region", "Antarctica") if target_pub else "Antarctica"

        if output_type.lower() == "instagram":
            return {
                "format": "Instagram Post / Carousel",
                "headline": f"🧊 UNLOCKING ANTARCTICA'S ICE SECRETS: India's {station_name} Reports!",
                "slides": [
                    {
                        "slide_number": 1,
                        "visual": "Hero aerial view of Bharati Station against pristine white snowdrifts and golden Antarctic sunrise.",
                        "text": "What is happening to the ice at the edge of the world? 🇦🇶\n\nIndian scientists have been tracking it for over a decade. Here is what they discovered ⬇️"
                    },
                    {
                        "slide_number": 2,
                        "visual": "Close-up photograph of a glaciologist operating an electromagnetic sounding sensor over sea ice.",
                        "text": "Using electromagnetic induction sensors (like a metal detector for ice!), Indian researchers measured sea ice thickness across Prydz Bay."
                    },
                    {
                        "slide_number": 3,
                        "visual": "Infographic graph illustrating -4.2 cm/decade thinning and ocean currents.",
                        "text": "The finding? Sea ice is thinning by 4.2 cm every ten years, driven by warm deep ocean currents sneaking under the ice shelf."
                    },
                    {
                        "slide_number": 4,
                        "visual": "Scientists in polar windbreakers smiling near Bharati station living quarters.",
                        "text": "Why does this matter? Antarctica's sea ice acts as our planet's reflective shield. Changes here influence weather systems worldwide, including our Indian monsoon!"
                    }
                ],
                "caption": (
                    f"🧊 Deep inside Antarctica, at India's high-tech {station_name}, our scientists are decoding the future of Earth's climate!\n\n"
                    f"A new decadal study reveals how deep ocean warmth is gradually thinning coastal fast-ice in Prydz Bay at -4.2 cm/decade. "
                    f"Understanding these polar dynamics helps safeguard our planet's climate equilibrium.\n\n"
                    f"👉 Tap the link in bio to read the open-access research paper on POLARIS!\n\n"
                    f"#PolarisScience #IndiaInAntarctica #NCPOR #MoES #AntarcticScience #BharatiStation #ClimateAction #Cryosphere #ScienceOutreach"
                ),
                "hashtags": ["#PolarisScience", "#IndiaInAntarctica", "#NCPOR", "#MoES", "#AntarcticScience", "#BharatiStation", "#ClimateChange"],
                "call_to_action": "Share this to celebrate India's polar scientific achievements!"
            }

        elif output_type.lower() == "linkedin":
            return {
                "format": "LinkedIn Professional Article",
                "headline": f"Advancing Cryospheric Intelligence: Decadal Observations from India's {station_name}",
                "body": (
                    f"India's sustained scientific presence in polar research continues to deliver benchmark observational insights into planetary climate systems.\n\n"
                    f"In a newly indexed study from {station_name} ({region}), Indian researchers have documented multi-year fast-ice thermodynamic variability in Prydz Bay.\n\n"
                    f"🔑 Key Scientific Takeaways:\n"
                    f"• In-situ electromagnetic induction sounding establishes an average fast-ice thickness of 1.84 ± 0.18 m.\n"
                    f"• Decadal data reveals a net thinning trend of -4.2 cm/decade, predominantly driven by modified Circumpolar Deep Water (mCDW) intrusions.\n"
                    f"• Heavy snow cover acts as a critical thermal insulator, suppressing negative degree-day basal freeze efficiency by ~22%.\n\n"
                    f"🌍 Strategic Impact:\n"
                    f"These continuous observational datasets provide ground-truth calibration for global climate models (CMIP6) and reinforce India's leadership as a Consultative Party to the Antarctic Treaty.\n\n"
                    f"Congratulations to the research team at NCPOR and collaborating institutions for maintaining rigorous year-round polar telemetry under severe sub-zero environments.\n\n"
                    f"Access the full publication and calibrated datasets through India's National Polar Knowledge Portal (POLARIS)."
                ),
                "hashtags": ["#PolarResearch", "#EarthSciences", "#MoES", "#NCPOR", "#AntarcticExpedition", "#ScientificLeadership", "#ClimateIntelligence"],
                "call_to_action": "Explore datasets and interactive timelines on POLARIS Portal."
            }

        elif output_type.lower() == "video_script":
            return {
                "format": "Short Video / Reel Script (60s)",
                "headline": f"Secrets of the Polar Ice: Inside India's {station_name}",
                "script_scenes": [
                    {
                        "timecode": "0:00 - 0:08",
                        "visual_shot": "Drone sweep over aerodynamic Bharati station glowing orange against vast white ice expanse.",
                        "audio_narration": "What does it take to survive and do cutting-edge science at minus 40 degrees?",
                        "text_overlay": "INDIA IN ANTARCTICA: BHARATI STATION"
                    },
                    {
                        "timecode": "0:08 - 0:22",
                        "visual_shot": "Scientist in bright red thermal suit drilling through ice with steam rising in frigid air.",
                        "audio_narration": "Meet the Indian scientists stationed in Larsemann Hills. Day and night, they track the pulse of Antarctica's coastal ice.",
                        "text_overlay": "MEASURING THE CRYO-PULSE"
                    },
                    {
                        "timecode": "0:22 - 0:40",
                        "visual_shot": "Graphic animation showing warm ocean currents sliding under the frozen shelf.",
                        "audio_narration": "Their 10-year study revealed something alarming: warm currents from deep in the Southern Ocean are thinning coastal ice by 4 centimeters every decade.",
                        "text_overlay": "-4.2 CM / DECADE THINNING"
                    },
                    {
                        "timecode": "0:40 - 0:52",
                        "visual_shot": "Montage: penguin waddling past, scientists laughing in laboratory, tricolor flag fluttering in polar wind.",
                        "audio_narration": "Because what happens at the poles doesn't stay at the poles. It shapes India's monsoon, global sea levels, and our future.",
                        "text_overlay": "CONNECTING POLES TO MONSOONS"
                    },
                    {
                        "timecode": "0:52 - 1:00",
                        "visual_shot": "POLARIS logo animation with website link.",
                        "audio_narration": "Discover India's polar missions on POLARIS. India's Polar Knowledge, Connected.",
                        "text_overlay": "EXPLORE POLARIS PORTAL"
                    }
                ],
                "sound_design": "Wind ambiance fading into crisp electronic ambient beat; inspiring crescendo at ending.",
                "hashtags": ["#Antarctica", "#ScienceReel", "#IndianScientists", "#Polaris", "#Explorer"]
            }

        elif output_type.lower() == "press_summary":
            return {
                "format": "Website Press Release",
                "headline": f"India's Polar Mission Quantifies Decadal Fast-Ice Dynamics at {station_name}, Antarctica",
                "dateline": "GOA / NEW DELHI — MoES / NCPOR",
                "lead_paragraph": (
                    f"Indian scientists deployed at {station_name} in Larsemann Hills, East Antarctica, have published a landmark decadal evaluation "
                    f"documenting thermodynamic changes in Antarctic landfast sea ice. The study provides crucial observational evidence on how "
                    f"circumpolar ocean warming influences the cryospheric perimeter of East Antarctica."
                ),
                "quote": (
                    f"\"Continuous long-term measurements from Bharati Station demonstrate India's commitment to delivering reliable, peer-reviewed "
                    f"polar observational records that contribute directly to global Intergovernmental Panel on Climate Change (IPCC) assessments,\""
                    f" stated an official spokesperson from the Ministry of Earth Sciences."
                ),
                "public_context": (
                    "The research highlights that while atmospheric temperatures fluctuate, deep oceanic heat transport represents the dominant driver "
                    "of coastal ice shelf thinning. Understanding these interactions is imperative for improving seasonal weather forecasts for the Indian subcontinent."
                ),
                "media_contact": "Polaris Outreach Division, National Centre for Polar and Ocean Research (NCPOR), Goa. Email: outreach@polaris.gov.in"
            }

        else: # infographic outline
            return {
                "format": "Educational Infographic Outline",
                "headline": f"Key Facts: Ice Sheet & Fast-Ice Dynamics at {station_name}",
                "infographic_cards": [
                    {"label": "Average Fast-Ice Thickness", "value": "1.84 Meters", "sub": "Recorded via EM sounding in Prydz Bay"},
                    {"label": "Decadal Thinning Trend", "value": "-4.2 cm / decade", "sub": "Modulated by warm deep ocean waters"},
                    {"label": "Snow Insulation Impact", "value": "22% Reduction", "sub": "Suppresses negative degree-day freeze rate"},
                    {"label": "Continuous Monitoring", "value": "10+ Years", "sub": "Operational telemetry transmitted direct to Goa"}
                ],
                "color_palette_recommendation": "Beige base (#F4E9D8), Deep Espresso (#3B261C), Terra Cotta (#A67C5B), Ice White (#FFF8ED)",
                "caption": "Share this visual summary with classrooms and polar science enthusiasts!"
            }

polaris_media = PolarisMediaService()
