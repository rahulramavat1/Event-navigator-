# ☁️Event Navigator 

A dynamic web platform with schedule navigation, smart search, speaker profiles, venue maps, and an AI assistant. Built on a lightweight Python/Flask backend with a glassmorphism dark mode frontend, it delivers a fast, premium event experience without heavy frameworks.

---

## 🖥️ Features

| Feature | Description |
|---|---|
| **Conference Home** | Hero section with date, location, time, and call-to-action buttons |
| **8 Expert Sessions** | Full timetable with talk details, descriptions, and speaker info |
| **60-Minute Lunch Break** | Clearly displayed between sessions 4 and 5 (12:15 PM – 1:15 PM) |
| **Search** | Real-time search across talk titles, descriptions, speaker names, and categories |
| **Category Filtering** | Filter by AI & ML, Cloud Native, Data & Analytics, DevOps, Networking, Security |
| **Speaker Cards** | Click a speaker card to filter schedule to their talks |
| **LinkedIn Links** | Each speaker has a clickable LinkedIn profile link |
| **Venue & Map** | Embedded Google Maps with full address and event details |
| **Responsive Design** | Works on desktop, tablet, and mobile devices |
| **Dark Mode UI** | Premium glassmorphism design with smooth micro-animations |

---

## 📁 Project Structure

```
react hyderabad/
├── app.py                    # Flask application (routes, data models, API)
├── README.md                 # This file
├── requirements.txt          # Python dependencies
├── templates/
│   └── index.html            # Main HTML template (Jinja2)
└── static/
    ├── css/
    │   └── style.css         # All styles (dark theme, animations, responsive)
    └── js/
        └── main.js           # Search, filtering, navigation, animations
```

---

## 🚀 Setup & Run

### Prerequisites

- **Python 3.8+** installed ([download](https://www.python.org/downloads/))
- `pip` package manager (comes with Python)

### 1. Install Dependencies

```bash
pip install flask
```

Or use the requirements file:

```bash
pip install -r requirements.txt
```

### 2. Run the Application

```bash
python app.py
```

The server starts at: **http://127.0.0.1:5000**

### 3. Open in Browser

Navigate to `http://127.0.0.1:5000` in your browser.

---

## 🔧 How to Make Changes

### Modify Conference Data

All conference data is defined in **`app.py`**. You can edit:

#### Speakers (`SPEAKERS` dict)
```python
"sp1": {
    "id": "sp1",
    "first_name": "Priya",
    "last_name": "Sharma",
    "linkedin": "https://www.linkedin.com/in/priyasharma",
    "avatar_color": "#6C5CE7"   # Color for avatar circle
}
```

#### Talks (`TALKS` list)
```python
{
    "id": "talk-1",
    "title": "Keynote: The Future of AI on Google Cloud",
    "speakers": ["sp1", "sp2"],        # 1 or 2 speaker IDs
    "categories": ["AI & Machine Learning"],  # 1 or 2 categories
    "description": "Talk description...",
    "time_start": "09:00",
    "time_end": "09:45",
    "slot": 1                          # Session number (1–8)
}
```

#### Conference Metadata (`CONFERENCE` dict)
```python
CONFERENCE = {
    "name": "Google Cloud Summit Hyderabad 2026",
    "date": "April 11, 2026",
    "venue": "HICC (Hyderabad International Convention Centre)",
    "address": "...",
    "start_time": "09:00 AM",
    "end_time": "04:30 PM",
    "lunch_start": "12:15 PM",
    "lunch_end": "01:15 PM",
    "total_talks": 8,
}
```

### Add a New Category

1. Add the category string to a talk's `categories` list in `app.py`
2. Add a CSS class in `style.css` following the naming pattern:
   ```css
   .cat-your-category { background: rgba(r, g, b, 0.15); color: #hex; }
   ```
   The class name is auto-generated as: lowercase, spaces → hyphens, `&` removed.

### Modify Styling

All styles are in **`static/css/style.css`**. Key sections:
- **CSS Variables** (`:root`) — colors, fonts, shadows, border-radius
- **Hero** — `.hero-*` classes
- **Timeline** — `.timeline-*`, `.talk-card`, `.lunch-*` classes
- **Speakers** — `.speaker-card`, `.speaker-grid` classes
- **Responsive** — `@media` queries at the bottom

### Modify JavaScript Behavior

All client-side logic is in **`static/js/main.js`**:
- `initSearch()` — search input handling with debounce
- `initCategoryFilters()` — chip/category click handling
- `applyFilters()` — main filtering logic combining search and category
- `initSpeakerCardFilter()` — click speaker card → filter schedule
- `initNavbar()` — scroll-based navbar background

---

## 📐 Schedule Layout

| Time | Session |
|---|---|
| 09:00 – 09:45 | Session 1: Keynote – AI on Google Cloud |
| 09:50 – 10:35 | Session 2: Serverless with Cloud Run |
| 10:40 – 11:25 | Session 3: BigQuery & Dataflow |
| 11:30 – 12:15 | Session 4: Zero Trust Security |
| **12:15 – 01:15** | **🍽️ Lunch Break & Networking (60 min)** |
| 01:15 – 02:00 | Session 5: Kubernetes on GKE |
| 02:05 – 02:50 | Session 6: Generative AI & Gemini |
| 02:55 – 03:40 | Session 7: Multi-Cloud Networking |
| 03:45 – 04:30 | Session 8: Platform Engineering & SRE |

---

## 🛠️ API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Main conference page |
| `/api/talks` | GET | JSON list of all talks (supports `?q=`, `?category=`, `?speaker=` query params) |
| `/api/speakers` | GET | JSON list of all speakers |
| `/api/categories` | GET | JSON list of all category names |

### Example API Usage

```bash
# Get all talks
curl http://127.0.0.1:5000/api/talks

# Search talks by keyword
curl "http://127.0.0.1:5000/api/talks?q=kubernetes"

# Filter by category
curl "http://127.0.0.1:5000/api/talks?category=Security"

# Filter by speaker
curl "http://127.0.0.1:5000/api/talks?speaker=sp1"
```



