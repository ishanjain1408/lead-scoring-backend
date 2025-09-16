Lead Scoring Backend Service

A production-ready Node.js + Express backend for lead scoring using rule-based logic + AI reasoning (OpenAI API).
Supports CSV lead uploads, scoring pipeline, and JSON/CSV result export. Designed for deployment on free tiers like Render.

✅ Features

Accepts product/offer information.

Upload leads via CSV (name, role, company, industry, location, linkedin_bio).

Runs rule-based + AI scoring:

Rule Layer (0–50 points)

AI Layer (0–50 points)

Final score = rule_score + ai_points

Returns scored leads via JSON or CSV download.

Built with Node.js, Express, MongoDB, Multer, csv-parser, OpenAI SDK.

Includes unit tests with Jest.

Optional Dockerized deployment.

📁 Project Structure
lead-scoring-backend/
├── controllers/
│   ├── offerController.js
│   └── leadController.js
├── models/
│   ├── Lead.js
│   └── Offer.js
├── routes/
│   ├── offerRoutes.js
│   └── leadRoutes.js
├── services/
│   ├── aiService.js
│   └── scoringService.js
├── utils/
│   └── csvParser.js
├── tests/
│   └── scoringService.test.js
├── server.js
├── package.json
├── .env
├── Dockerfile
└── README.md

⚡ Setup
1. Clone Repository
git clone https://github.com/ishanjain1408/lead-scoring-backend.git
cd lead-scoring-backend

2. Install Dependencies
npm install

3. Configure Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=mongodb+srv://ishanjain1408:4D94pryiVUhQYrlZ@cluster0.rm1yz.mongodb.net/lead-scoring-backend?retryWrites=true&w=majority&appName=Cluster0
OPENAI_API_KEY=your_openai_api_key

4. Run Server
npm run dev   # For development with nodemon
npm start     # Production

5. Run Tests
npm test

🌐 API Endpoints
1. POST /offer

Save offer/product context.

Request Body (JSON):

{
  "name": "AI Outreach Automation",
  "value_props": ["24/7 outreach", "6x more meetings"],
  "ideal_use_cases": ["B2B SaaS mid-market"]
}


Response:

{
  "message": "Offer saved",
  "offer": {
    "name": "AI Outreach Automation",
    "value_props": ["24/7 outreach", "6x more meetings"],
    "ideal_use_cases": ["B2B SaaS mid-market"]
  }
}

2. POST /leads/upload

Upload CSV of leads.

CSV Headers:

name,role,company,industry,location,linkedin_bio


cURL Example:

curl -X POST http://localhost:5000/leads/upload \
  -F "file=@leads.csv"


Response:

{
  "message": "Leads uploaded",
  "count": 10
}

3. POST /score

Run rule-based + AI scoring.

cURL Example:

curl -X POST http://localhost:5000/leads/score


Response:

[
  {
    "name": "Ava Patel",
    "role": "Head of Growth",
    "company": "FlowMetrics",
    "intent": "High",
    "score": 85,
    "reasoning": "Fits ICP SaaS mid-market and role is decision maker."
  }
]

4. GET /results

Get scored leads as JSON.

cURL Example:

curl -X GET http://localhost:5000/results

5. GET /results/csv

Download scored leads as CSV.

cURL Example:

curl -X GET http://localhost:5000/results/csv -o scored_leads.csv

🧮 Rule-Based Scoring Logic
Rule	Points
Role relevance: decision maker	+20
Role relevance: influencer	+10
Industry match: exact ICP	+20
Industry match: adjacent	+10
Data completeness (all fields)	+10
AI Layer (0–50 points)

Sends offer + lead to OpenAI API:

"Classify intent (High/Medium/Low) and explain in 1–2 sentences."

Maps intent:

High → 50 points

Medium → 30 points

Low → 10 points

Final Score = rule_score + ai_points

🛠 Deployment (Render/Heroku)

Push to GitHub.

Connect repository to Render/Heroku.

Set environment variables (MONGO_URI, OPENAI_API_KEY).

Deploy → API will be live at base URL (e.g., https://lead-scoring.onrender.com).

🧪 Testing

Unit tests for rule-based scoring implemented in tests/scoringService.test.js.

npm test

💡 Notes

Ensure POST /offer is called before /leads/score.

CSV headers must match exactly.

Leads and offers are persisted in MongoDB to avoid data loss on restart.
