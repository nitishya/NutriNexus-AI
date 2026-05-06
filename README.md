# NutriNexus AI
*Eat Smart. Live Better.*

NutriNexus AI is a smart, adaptive solution that helps individuals make better food choices and build healthier eating habits. By leveraging user profiles, behavioral data (e.g., skipped meals), and contextual inputs (e.g., time of day), the system provides personalized, actionable nutritional guidance.

## Key Features

- **Smart Meal Decision Engine**: A hybrid logic system (rule-based + AI) that suggests meals based on time, goals, health conditions, and activity levels.
- **Adaptive Logic**: Detects patterns (e.g., skipping meals) and adjusts recommendations dynamically to keep users on track.
- **AI Chat Assistant**: Ask free-form questions like "Suggest dinner for weight loss" and get context-aware answers.
- **Health-First Approach**: Rules explicitly handle conditions like Diabetes or high blood pressure to ensure safe recommendations.

## Tech Stack

### Backend (Python)
- **FastAPI**: Async, high-performance API.
- **Pydantic**: Robust input validation.
- **Pytest**: For rigorous testing of the decision engine.
- **SlowAPI**: Rate limiting for security.

### Frontend (React)
- **Vite + React (TypeScript)**: Fast and type-safe UI.
- **Tailwind CSS & Framer Motion**: Premium, accessible, and responsive design.
- **Lucide React**: Clean iconography.

### Cloud & Infrastructure
- **Docker**: Containerized backend for easy deployment.
- **Google Cloud Run**: Target production environment.
- **Firebase**: (Prepared for) Authentication and Firestore DB.

## Getting Started

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. `python main.py` (Runs on `http://localhost:8080`)

**Testing**:
Run `pytest` inside the `backend` directory to verify the decision logic.

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Runs on `http://localhost:5173`)

## Deployment
See [deploy_steps.md](./deploy_steps.md) for full instructions on deploying to Google Cloud Run and configuring Firebase.

## Accessibility
The application uses semantic HTML and standard contrast ratios. Ensure screen reader testing is done before full production release.
