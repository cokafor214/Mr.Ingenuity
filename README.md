# Mr.Ingenuity — Full Stack Ecommerce with Collaborative Filtering Recommender

This repository contains a scaffold for a full-stack ecommerce platform that demonstrates a simple collaborative-filtering recommendation engine.

Architecture
- Frontend: React.js (frontend/)
- API gateway: Node.js + Express (server/)
- Recommender: Python (FastAPI) microservice using user-based collaborative filtering (recommender/)
- Orchestrated with docker-compose for easy local development.

Quick start (Docker)
1. Install Docker and Docker Compose.
2. From repo root run:
   ```bash
   docker-compose up --build
   ```
3. Frontend: http://localhost:3000
   API server: http://localhost:4000
   Recommender: http://localhost:8000

How it works
- The React frontend fetches product data from the Node API.
- The Node API exposes a `/api/recommend/:user_id` endpoint which proxies to the Python recommender.
- The recommender loads a sample ratings dataset and computes simple user-based collaborative filtering recommendations using cosine similarity.

Notes
- This is a scaffold and demo. For production use add persistent storage, authentication, tests, validation, logging, and proper error handling.
- The recommender currently uses an in-memory CSV dataset (recommender/sample_ratings.csv) for demonstration.

What's next
- If you want, I can commit these files to cokafor214/Mr.Ingenuity. Confirm and I will push them and open a PR (or push directly to main if preferred).