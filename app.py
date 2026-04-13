"""
Google Cloud Summit 2026 — Conference Website + Event Guide Chatbot
Flask backend serving conference data, venue navigation, and a rule-based chatbot.
"""

from flask import Flask, render_template, jsonify, request, send_file
from datetime import datetime
import random
import io

app = Flask(__name__)

# ============================================================
# SPEAKERS
# ============================================================

SPEAKERS = {
    "sp1":  {"id": "sp1",  "first_name": "Priya",   "last_name": "Sharma",   "role": "Principal Engineer",        "company": "Google Cloud",        "linkedin": "https://www.linkedin.com/in/priyasharma",   "avatar_color": "#6C5CE7"},
    "sp2":  {"id": "sp2",  "first_name": "Arjun",   "last_name": "Patel",    "role": "Director, ML Engineering", "company": "Infosys",             "linkedin": "https://www.linkedin.com/in/arjunpatel",    "avatar_color": "#00B894"},
    "sp3":  {"id": "sp3",  "first_name": "Meera",   "last_name": "Reddy",    "role": "Cloud Solutions Architect","company": "Wipro",               "linkedin": "https://www.linkedin.com/in/meerareddy",    "avatar_color": "#E17055"},
    "sp4":  {"id": "sp4",  "first_name": "Vikram",  "last_name": "Krishnan", "role": "Data Engineering Lead",    "company": "HCL Technologies",    "linkedin": "https://www.linkedin.com/in/vikramkrishnan", "avatar_color": "#0984E3"},
    "sp5":  {"id": "sp5",  "first_name": "Ananya",  "last_name": "Desai",    "role": "Senior Data Scientist",    "company": "Flipkart",            "linkedin": "https://www.linkedin.com/in/ananyadesai",    "avatar_color": "#FDCB6E"},
    "sp6":  {"id": "sp6",  "first_name": "Rohan",   "last_name": "Gupta",    "role": "Head of Cloud Security",   "company": "HDFC Bank",           "linkedin": "https://www.linkedin.com/in/rohangupta",    "avatar_color": "#E84393"},
    "sp7":  {"id": "sp7",  "first_name": "Kavitha", "last_name": "Nair",     "role": "Kubernetes Platform Lead", "company": "Tech Mahindra",       "linkedin": "https://www.linkedin.com/in/kavithanair",    "avatar_color": "#00CEC9"},
    "sp8":  {"id": "sp8",  "first_name": "Sanjay",  "last_name": "Mehta",    "role": "SRE Manager",              "company": "Swiggy",              "linkedin": "https://www.linkedin.com/in/sanjaymehta",   "avatar_color": "#A29BFE"},
    "sp9":  {"id": "sp9",  "first_name": "Deepa",   "last_name": "Iyer",     "role": "AI Product Manager",       "company": "Google",              "linkedin": "https://www.linkedin.com/in/deepaiyer",     "avatar_color": "#55EFC4"},
    "sp10": {"id": "sp10", "first_name": "Rahul",   "last_name": "Verma",    "role": "Network Architect",        "company": "Tata Communications", "linkedin": "https://www.linkedin.com/in/rahulverma",    "avatar_color": "#FAB1A0"},
}

# ============================================================
# TALKS
# ============================================================

TALKS = [
    {
        "id": "talk-1", "slot": 1,
        "title": "Keynote: The Future of AI on Google Cloud",
        "speakers": ["sp1", "sp2"],
        "categories": ["AI & Machine Learning"],
        "description": "Explore the cutting-edge AI capabilities powered by Google Cloud, from Vertex AI to Gemini integrations. Learn how enterprises are leveraging foundation models, AutoML, and MLOps pipelines to transform their businesses at scale.",
        "time_start": "09:00", "time_end": "09:45",
    },
    {
        "id": "talk-2", "slot": 2,
        "title": "Building Serverless Architectures with Cloud Run & Cloud Functions",
        "speakers": ["sp3"],
        "categories": ["Cloud Native", "DevOps"],
        "description": "Dive deep into serverless computing on Google Cloud. This session covers best practices for building event-driven microservices using Cloud Run, Cloud Functions, and Eventarc, with live demonstrations of auto-scaling and cold start optimization.",
        "time_start": "09:50", "time_end": "10:35",
    },
    {
        "id": "talk-3", "slot": 3,
        "title": "Data Engineering at Scale with BigQuery & Dataflow",
        "speakers": ["sp4", "sp5"],
        "categories": ["Data & Analytics"],
        "description": "Discover how to build robust data pipelines using BigQuery, Dataflow, and Pub/Sub. We'll walk through real-world patterns for streaming analytics, data warehousing, and cost optimization strategies for petabyte-scale workloads.",
        "time_start": "10:40", "time_end": "11:25",
    },
    {
        "id": "talk-4", "slot": 4,
        "title": "Securing Your Cloud: Zero Trust with BeyondCorp & Chronicle",
        "speakers": ["sp6"],
        "categories": ["Security"],
        "description": "Learn how Google Cloud's security portfolio—including BeyondCorp Enterprise, Chronicle SIEM, and Security Command Center—enables a zero-trust architecture. This talk covers threat detection, incident response, and compliance automation.",
        "time_start": "11:30", "time_end": "12:15",
    },
    {
        "id": "talk-5", "slot": 5,
        "title": "Mastering GKE: Kubernetes Best Practices for Production",
        "speakers": ["sp7", "sp8"],
        "categories": ["Cloud Native", "DevOps"],
        "description": "Take your Kubernetes skills to the next level. This session covers GKE Autopilot, multi-cluster management with Fleet, service mesh with Cloud Service Mesh, and advanced deployment strategies including canary and blue-green deployments.",
        "time_start": "13:15", "time_end": "14:00",
    },
    {
        "id": "talk-6", "slot": 6,
        "title": "Generative AI Applications with Vertex AI & Gemini API",
        "speakers": ["sp9"],
        "categories": ["AI & Machine Learning"],
        "description": "Hands-on walkthrough of building production-ready generative AI applications. Topics include RAG architectures, prompt engineering, grounding with Google Search, and deploying custom fine-tuned models on Vertex AI endpoints.",
        "time_start": "14:05", "time_end": "14:50",
    },
    {
        "id": "talk-7", "slot": 7,
        "title": "Multi-Cloud Networking & Hybrid Connectivity",
        "speakers": ["sp10", "sp1"],
        "categories": ["Networking", "Cloud Native"],
        "description": "Explore Google Cloud's networking capabilities including Cloud Interconnect, Network Connectivity Center, and Private Service Connect. Learn how to design resilient hybrid and multi-cloud network architectures.",
        "time_start": "14:55", "time_end": "15:40",
    },
    {
        "id": "talk-8", "slot": 8,
        "title": "Platform Engineering & SRE: Building Developer Platforms on GCP",
        "speakers": ["sp3", "sp6"],
        "categories": ["DevOps", "Cloud Native"],
        "description": "Closing talk on building internal developer platforms using Google Cloud. From Cloud Deploy and Artifact Registry to SLO monitoring with Cloud Monitoring—learn the SRE principles and tools that power Google-scale reliability.",
        "time_start": "15:45", "time_end": "16:30",
    },
]

# ============================================================
# CONFERENCE METADATA
# ============================================================

CONFERENCE = {
    "name": "Google Cloud Summit Hyderabad 2026",
    "tagline": "Innovate. Build. Transform.",
    "date": "April 11, 2026",
    "date_iso": "2026-04-11",
    "venue": "HICC (Hyderabad International Convention Centre)",
    "address": "Novotel & HICC Complex, Madhapur, Hyderabad, Telangana 500081",
    "start_time": "09:00 AM",
    "end_time": "04:30 PM",
    "lunch_start": "12:15 PM",
    "lunch_end": "01:15 PM",
    "total_talks": 8,
    "registration_open": True,
}

# ============================================================
# VENUE KNOWLEDGE BASE (for chatbot)
# ============================================================

VENUE_KNOWLEDGE = {
    "restrooms": {
        "locations": [
            "Ground Floor — Left of Registration Desk (near main entrance)",
            "Floor 1 — Right of elevators, near Hall B",
            "Floor 2 — Near Networking Lounge, left of escalators",
        ],
        "map_floor": "ground", "map_zone": "restroom",
    },
    "coffee": {
        "locations": [
            "Ground Floor — Coffee Corner near Sponsor Booths (open all day, 7 AM–5 PM)",
            "Mezzanine Level — Networking Lounge (during scheduled breaks only)",
        ],
        "hours": "7:00 AM – 5:00 PM",
        "map_floor": "ground", "map_zone": "coffee",
    },
    "lunch": {
        "location": "Hall B, Floor 1",
        "time": "12:15 PM – 1:15 PM",
        "details": "Catered buffet — veg & non-veg options, dessert station, beverages included.",
        "map_floor": "floor1", "map_zone": "lunch",
    },
    "water": {
        "locations": [
            "Near elevators on every floor",
            "Coffee Corner (Ground Floor)",
            "Hall B Networking area (Floor 1)",
        ],
    },
    "wifi": {
        "network": "GC-Summit-2026",
        "password": "CloudFirst@2026",
        "note": "5 GHz band recommended for best performance.",
    },
    "parking": {
        "location": "Basement Levels B1 and B2",
        "entry": "Main gate on Cyber Hills Road",
        "note": "Free for all delegates. Show your badge at the parking booth.",
        "map_floor": "basement", "map_zone": "parking",
    },
    "first_aid": {
        "location": "Ground Floor, next to Registration Desk",
        "contact": "+91-98765-43210 (Event Medical Team)",
        "map_floor": "ground", "map_zone": "first_aid",
    },
    "prayer_room": {
        "location": "Room 103, Floor 1",
        "hours": "Open 8 AM – 6 PM",
        "map_floor": "floor1", "map_zone": "prayer",
    },
    "registration": {
        "location": "Main Entrance, Ground Floor",
        "hours": "8:00 AM – 10:30 AM. Help Desk open all day.",
        "map_floor": "ground", "map_zone": "registration",
    },
    "atm": {
        "location": "Lobby, Ground Floor (between cafeteria and main entrance)",
        "map_floor": "ground", "map_zone": "atm",
    },
    "cloakroom": {
        "location": "Ground Floor, left of main entrance — Free service",
        "map_floor": "ground", "map_zone": "cloakroom",
    },
    "emergency_exit": {
        "locations": [
            "Ground Floor — Near main entrance (red signage)",
            "Every floor — Near staircases (follow green EXIT signs)",
        ],
        "assembly_point": "Parking Level B1 — Assembly Point A",
        "map_floor": "ground", "map_zone": "exit",
    },
    "helpdesk": {
        "location": "Ground Floor, near Registration Desk",
        "contact": "+91-87654-32109",
        "hours": "8:00 AM – 5:30 PM",
        "map_floor": "ground", "map_zone": "registration",
    },
}

# ============================================================
# CHATBOT ENGINE
# ============================================================

DEFAULT_QUICK_REPLIES = ["🚻 Restrooms", "☕ Coffee", "🍽️ Lunch", "📶 WiFi", "🅿️ Parking", "🗓️ Schedule"]

INTENT_MAP = {
    "greeting":     ["hi", "hello", "hey", "howdy", "good morning", "good afternoon", "good evening", "sup", "namaste"],
    "help":         ["help", "what can you", "guide me", "what do you know", "options", "capabilities", "assist", "commands"],
    "restroom":     ["restroom", "toilet", "bathroom", "washroom", "loo", "wc", "freshen"],
    "coffee":       ["coffee", "tea", "beverage", "drinks", "cafe", "refreshment", "snack", "chai", "latte"],
    "water":        ["water", "hydrate", "drinking water", "water bottle"],
    "lunch":        ["lunch", "food", "eat", "meal", "dining", "buffet", "hungry", "hungry", "dinner", "breakfast"],
    "wifi":         ["wifi", "wi-fi", "internet", "password", "network", "hotspot", "connect online"],
    "parking":      ["parking", "park", "car", "vehicle", "bike", "two-wheeler", "my vehicle", "where is my car"],
    "first_aid":    ["first aid", "medical", "doctor", "emergency", "sick", "ambulance", "hurt", "injury", "unwell"],
    "schedule":     ["schedule", "agenda", "session", "talk", "keynote", "speaker", "when", "timing", "program", "what time"],
    "registration": ["register", "registration", "badge", "check-in", "checkin", "name tag", "credentials", "my badge"],
    "prayer":       ["prayer", "pray", "namaz", "mosque", "church", "religious", "meditation", "quiet room"],
    "atm":          ["atm", "cash", "money", "bank", "withdraw", "currency"],
    "cloakroom":    ["cloakroom", "cloak", "luggage", "baggage", "bags", "store my", "keep my bag"],
    "exit":         ["exit", "leave", "go out", "outside", "emergency exit", "way out", "how to leave"],
    "helpdesk":     ["helpdesk", "help desk", "organizer", "staff", "support", "contact organizer", "information desk"],
    "lost":         ["lost", "where am i", "direction", "navigate", "find my way", "how to get to", "where is"],
}


def detect_intent(message: str) -> str:
    msg = message.lower()
    for intent, keywords in INTENT_MAP.items():
        if any(k in msg for k in keywords):
            return intent
    return "unknown"


def build_response(intent: str, original_msg: str) -> dict:
    v = VENUE_KNOWLEDGE

    # --- Greeting ---
    if intent == "greeting":
        return {
            "reply": "👋 **Welcome to Google Cloud Summit Hyderabad 2026!**\n\nI'm your venue guide — ask me anything about restrooms, food, WiFi, the schedule, parking, or directions!\n\nWhat can I help you with?",
            "map": None,
            "quick_replies": ["🚻 Restrooms", "☕ Coffee", "🍽️ Lunch", "📶 WiFi", "🗓️ Schedule", "🅿️ Parking"],
        }

    # --- Help menu ---
    elif intent == "help":
        return {
            "reply": "ℹ️ **Here's what I can help with:**\n\n• 🚻 Restrooms & washrooms\n• ☕ Coffee, tea & refreshments\n• 💧 Water stations\n• 🍽️ Lunch & dining\n• 📶 WiFi credentials\n• 🅿️ Parking directions\n• 🗓️ Session schedule & speakers\n• 🆘 First Aid & emergencies\n• 📋 Registration & badge pickup\n• 👜 Cloakroom, ATM, Prayer room\n• 🚪 Emergency exits\n• 🗺️ Interactive venue map\n\nJust ask anything in plain English!",
            "map": None,
            "quick_replies": ["🚻 Restrooms", "☕ Coffee", "📶 WiFi", "🗓️ Schedule"],
        }

    # --- Restroom ---
    elif intent == "restroom":
        locs = "\n".join(f"• {l}" for l in v["restrooms"]["locations"])
        return {
            "reply": f"🚻 **Restrooms** are available on every floor:\n\n{locs}\n\n💡 All are clearly signposted. The ground floor one is the closest from the sessions hall.",
            "map": {"floor": "ground", "zone": "restroom"},
            "quick_replies": ["☕ Coffee", "💧 Water", "🗓️ Schedule", "🅿️ Parking"],
        }

    # --- Coffee / Refreshments ---
    elif intent == "coffee":
        locs = "\n".join(f"• {l}" for l in v["coffee"]["locations"])
        return {
            "reply": f"☕ **Coffee & Tea Stations:**\n\n{locs}\n\n⏰ Hours: **{v['coffee']['hours']}**\n✅ Complimentary for all registered attendees!",
            "map": {"floor": "ground", "zone": "coffee"},
            "quick_replies": ["💧 Water", "🍽️ Lunch", "🚻 Restrooms", "📶 WiFi"],
        }

    # --- Water ---
    elif intent == "water":
        locs = "\n".join(f"• {l}" for l in v["water"]["locations"])
        return {
            "reply": f"💧 **Water Stations** are at:\n\n{locs}\n\nStay hydrated! 😊",
            "map": {"floor": "ground", "zone": "coffee"},
            "quick_replies": ["☕ Coffee", "🍽️ Lunch", "🚻 Restrooms"],
        }

    # --- Lunch / Food ---
    elif intent == "lunch":
        d = v["lunch"]
        return {
            "reply": f"🍽️ **Lunch Details:**\n\n📍 Location: **{d['location']}**\n⏰ Time: **{d['time']}**\n\n{d['details']}\n\n💡 Take the elevator to Floor 1 and follow the signs to Hall B.",
            "map": {"floor": "floor1", "zone": "lunch"},
            "quick_replies": ["☕ Coffee", "💧 Water", "🗓️ Schedule", "🚻 Restrooms"],
        }

    # --- WiFi ---
    elif intent == "wifi":
        w = v["wifi"]
        return {
            "reply": f"📶 **WiFi Credentials:**\n\n🔗 **Network:** `{w['network']}`\n🔒 **Password:** `{w['password']}`\n\n💡 {w['note']}",
            "map": None,
            "quick_replies": ["☕ Coffee", "🗓️ Schedule", "🚻 Restrooms", "🅿️ Parking"],
        }

    # --- Parking ---
    elif intent == "parking":
        p = v["parking"]
        return {
            "reply": f"🅿️ **Parking Info:**\n\n📍 Location: **{p['location']}**\n🚗 Entry: {p['entry']}\n\n✅ {p['note']}",
            "map": {"floor": "basement", "zone": "parking"},
            "quick_replies": ["📋 Registration", "☕ Coffee", "📶 WiFi", "🆘 First Aid"],
        }

    # --- First Aid / Emergency ---
    elif intent == "first_aid":
        fa = v["first_aid"]
        return {
            "reply": f"🆘 **First Aid / Medical:**\n\n📍 Location: **{fa['location']}**\n📞 Contact: **{fa['contact']}**\n\n⚠️ For life-threatening emergencies, call **112** immediately.",
            "map": {"floor": "ground", "zone": "first_aid"},
            "quick_replies": ["📋 Help Desk", "🚻 Restrooms", "☕ Coffee", "ℹ️ Help"],
        }

    # --- Schedule ---
    elif intent == "schedule":
        lines = []
        for t in TALKS[:4]:
            spk = ", ".join(SPEAKERS[s]["first_name"] for s in t["speakers"])
            lines.append(f"• **{t['time_start']}** — {t['title']} _({spk})_")
        schedule_text = "\n".join(lines)
        return {
            "reply": f"🗓️ **Today's Schedule (first 4):**\n\n{schedule_text}\n\n🍽️ Lunch: **12:15 PM – 1:15 PM** (Hall B, Floor 1)\n\n👆 Scroll the main page to see all 8 sessions!",
            "map": {"floor": "ground", "zone": "ballroom"},
            "quick_replies": ["🚻 Restrooms", "☕ Coffee", "🍽️ Lunch", "🗺️ Venue Map"],
        }

    # --- Registration ---
    elif intent == "registration":
        r = v["registration"]
        return {
            "reply": f"📋 **Registration / Badge Pickup:**\n\n📍 Location: **{r['location']}**\n⏰ Hours: {r['hours']}\n\n💡 If you've already checked in, the Help Desk can reprint your badge.",
            "map": {"floor": "ground", "zone": "registration"},
            "quick_replies": ["📶 WiFi", "☕ Coffee", "🗓️ Schedule", "🆘 First Aid"],
        }

    # --- Prayer Room ---
    elif intent == "prayer":
        pr = v["prayer_room"]
        return {
            "reply": f"🕌 **Prayer / Quiet Room:**\n\n📍 Location: **{pr['location']}**\n⏰ Hours: {pr['hours']}\n\nAvailable for all faiths — quiet, peaceful space.",
            "map": {"floor": "floor1", "zone": "prayer"},
            "quick_replies": ["🚻 Restrooms", "☕ Coffee", "💧 Water", "ℹ️ Help"],
        }

    # --- ATM ---
    elif intent == "atm":
        return {
            "reply": f"🏧 **ATM Location:**\n\n📍 {v['atm']['location']}\n\n💡 Most stalls also accept UPI payments.",
            "map": {"floor": "ground", "zone": "atm"},
            "quick_replies": ["☕ Coffee", "🍽️ Lunch", "🚻 Restrooms"],
        }

    # --- Cloakroom ---
    elif intent == "cloakroom":
        return {
            "reply": f"👜 **Cloakroom / Bag Storage:**\n\n📍 {v['cloakroom']['location']}\n\nHand your item to staff, receive a token. Collect on the way out.",
            "map": {"floor": "ground", "zone": "cloakroom"},
            "quick_replies": ["📋 Registration", "☕ Coffee", "🅿️ Parking"],
        }

    # --- Exit ---
    elif intent == "exit":
        exits = "\n".join(f"• {e}" for e in v["emergency_exit"]["locations"])
        return {
            "reply": f"🚪 **Exits & Emergency Exits:**\n\n{exits}\n\n🟢 Follow the **green EXIT signs** throughout the building.\n\n📍 Assembly Point: **{v['emergency_exit']['assembly_point']}**",
            "map": {"floor": "ground", "zone": "exit"},
            "quick_replies": ["🆘 First Aid", "📋 Help Desk", "🅿️ Parking"],
        }

    # --- Help Desk ---
    elif intent == "helpdesk":
        hd = v["helpdesk"]
        return {
            "reply": f"ℹ️ **Help Desk / Organizer Support:**\n\n📍 Location: **{hd['location']}**\n📞 Phone: **{hd['contact']}**\n⏰ Hours: {hd['hours']}\n\nThe team is always happy to help you!",
            "map": {"floor": "ground", "zone": "registration"},
            "quick_replies": ["📶 WiFi", "☕ Coffee", "🗓️ Schedule", "🚻 Restrooms"],
        }

    # --- Lost / Navigation ---
    elif intent == "lost":
        return {
            "reply": "🗺️ **Need directions?**\n\nTap the **Map** tab above to view the interactive floor plan.\n\nOr tell me where you want to go:\n• Restrooms 🚻\n• Coffee Corner ☕\n• Lunch Area 🍽️\n• Sessions (Ballroom A) 🎤\n• Registration 📋\n• Parking 🅿️\n• First Aid 🆘",
            "map": {"floor": "ground", "zone": None},
            "quick_replies": ["🚻 Restrooms", "☕ Coffee", "🍽️ Lunch", "📋 Registration"],
            "open_map": True,
        }

    # --- Unknown / Fallback ---
    else:
        fallbacks = [
            "🤔 I'm not sure about that. Here's what I **can** help with:",
            "❓ I didn't quite catch that. Try one of these options:",
            "Hmm! Let me point you in the right direction:",
        ]
        return {
            "reply": f"{random.choice(fallbacks)}\n\n• 🚻 Restrooms & facilities\n• ☕ Coffee, water & food\n• 📶 WiFi credentials\n• 🗓️ Session schedule\n• 🅿️ Parking directions\n• 🆘 First Aid & emergencies\n\nOr visit the **Help Desk** on the Ground Floor!",
            "map": None,
            "quick_replies": ["🚻 Restrooms", "☕ Coffee", "📶 WiFi", "🗓️ Schedule", "🆘 First Aid"],
        }


# ============================================================
# HELPERS
# ============================================================

def get_all_categories():
    cats = set()
    for talk in TALKS:
        for cat in talk["categories"]:
            cats.add(cat)
    return sorted(list(cats))


def enrich_talk(talk):
    enriched = dict(talk)
    enriched["speaker_details"] = [SPEAKERS[sid] for sid in talk["speakers"]]
    return enriched


# ============================================================
# ROUTES — Existing
# ============================================================

@app.route("/")
def index():
    enriched_talks = [enrich_talk(t) for t in TALKS]
    categories = get_all_categories()
    return render_template(
        "index.html",
        conference=CONFERENCE,
        talks=enriched_talks,
        speakers=SPEAKERS,
        categories=categories,
        now=datetime.now(),
    )


@app.route("/api/talks")
def api_talks():
    q = request.args.get("q", "").strip().lower()
    category = request.args.get("category", "").strip()
    speaker = request.args.get("speaker", "").strip()
    results = TALKS[:]
    if category:
        results = [t for t in results if category in t["categories"]]
    if speaker:
        results = [t for t in results if speaker in t["speakers"]]
    if q:
        filtered = []
        for t in results:
            title_match = q in t["title"].lower()
            desc_match = q in t["description"].lower()
            cat_match = any(q in c.lower() for c in t["categories"])
            speaker_match = any(
                q in (SPEAKERS[sid]["first_name"] + " " + SPEAKERS[sid]["last_name"]).lower()
                for sid in t["speakers"]
            )
            if title_match or desc_match or cat_match or speaker_match:
                filtered.append(t)
        results = filtered
    return jsonify([enrich_talk(t) for t in results])


@app.route("/api/speakers")
def api_speakers():
    return jsonify(list(SPEAKERS.values()))


@app.route("/api/categories")
def api_categories():
    return jsonify(get_all_categories())


# ============================================================
# ROUTES — Chatbot
# ============================================================

@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.get_json(silent=True) or {}
    message = (data.get("message") or "").strip()
    if not message:
        return jsonify({
            "reply": "Please type your question! 😊",
            "map": None,
            "quick_replies": DEFAULT_QUICK_REPLIES,
        })
    intent = detect_intent(message)
    response = build_response(intent, message)
    return jsonify(response)


@app.route("/api/qrcode")
def api_qrcode():
    try:
        import qrcode
        from PIL import Image
        url = request.url_root
        qr = qrcode.QRCode(version=2, box_size=7, border=3,
                            error_correction=qrcode.constants.ERROR_CORRECT_M)
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="#4285F4", back_color="#0d1117")
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        buf.seek(0)
        return send_file(buf, mimetype="image/png")
    except ImportError:
        # Fallback: redirect to a free QR API
        from flask import redirect
        url = request.url_root
        return redirect(f"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={url}&color=4285F4&bgcolor=0d1117")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
