# GNOSIS Server

The **GNOSIS Server** is a **FastAPI-based backend** responsible for powering the GNOSIS mobile client. It processes user claims, runs AI-driven analysis pipelines, returns structured evidence, and serves static assets.

---

## 🖥️ Responsibilities

The server is responsible for:

- Processing user claims  
- Running AI / analysis pipelines  
- Returning structured evidence (text, images, video)  
- Serving static image assets  
- Acting as the API layer for the GNOSIS mobile client  

---

## 🧱 Tech Stack

- FastAPI  
- Uvicorn  
- Pydantic v2  
- python-dotenv  
- Qdrant (vector search)  
- AI pipeline (separate module)  
- Static file serving  

---

## ✅ Prerequisites

Ensure the following are installed:

- Python **3.10+**
- pip
- Virtualenv (recommended)

---

## 🚀 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-org/gnosis-server.git
cd gnosis-server


⚠️ All commands below must be run from the project root.

2️⃣ Create a Virtual Environment
python -m venv venv

Activate the Virtual Environment

Windows

venv\Scripts\activate


Linux / macOS

source venv/bin/activate

3️⃣ Install Dependencies
pip install -r requirements.txt

🔐 Environment Variables

Create a .env file in the server root:

PROJECT_NAME=GNOSIS
VERSION=1.0.0
ENV=development

QDRANT_URL=https://your-qdrant-url
QDRANT_KEY=your-qdrant-api-key


⚠️ Environment variable names must exactly match what Pydantic expects.

▶️ Running the Server (IMPORTANT)

Run from the project root:

uvicorn app.main:app --reload

Recommended for Windows
python -m uvicorn server.app.main:app --host 0.0.0.0 --port 8000 --reload


🌐 Server URLs
Purpose	URL
API Root	http://127.0.0.1:8000

Chat API	http://127.0.0.1:8000/api/v1/chat

Swagger UI	http://127.0.0.1:8000/docs

Images	http://127.0.0.1:8000/static/images/{name}.png
🧠 Architecture Notes

API routes are versioned under /api/v1

Chat endpoint orchestrates AI + vector search pipelines

Evidence is returned in a structured format for the mobile client

Static assets are served via FastAPI’s StaticFiles

Qdrant is used for semantic search and evidence retrieval