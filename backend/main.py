import uvicorn
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.models.schemas import UserProfile, MealLog, RecommendationRequest, ChatRequest, AIResponse, HealthStatus
from app.core.logic import engine
import logging

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Rate Limiting
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="NutriNexus AI API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock DB (In production, use Firestore)
profiles_db = {}
meal_logs_db = {}

@app.post("/user/profile", response_model=UserProfile)
@limiter.limit("5/minute")
async def create_profile(profile: UserProfile, request: Request):
    profiles_db[profile.userId] = profile
    logger.info(f"Profile created for user: {profile.userId}")
    return profile

@app.post("/meal/log", response_model=MealLog)
async def log_meal(meal: MealLog, request: Request):
    if meal.userId not in meal_logs_db:
        meal_logs_db[meal.userId] = []
    meal_logs_db[meal.userId].append(meal)
    logger.info(f"Meal logged for user: {meal.userId}")
    return meal

@app.get("/meal/recommendation", response_model=AIResponse)
async def get_recommendation(userId: str, context: str = "home"):
    profile = profiles_db.get(userId)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    logs = meal_logs_db.get(userId, [])
    rule_result = engine.get_rule_based_recommendation(profile, logs, context)
    ai_response = await engine.get_ai_enhancement(rule_result, profile)
    return ai_response

@app.post("/ask", response_model=AIResponse)
async def ask_assistant(chat_req: ChatRequest, request: Request):
    profile = profiles_db.get(chat_req.userId)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    logs = meal_logs_db.get(chat_req.userId, [])
    rule_result = engine.get_rule_based_recommendation(profile, logs, "chat")
    ai_response = await engine.get_ai_enhancement(rule_result, profile, user_query=chat_req.message)
    return ai_response

@app.get("/health", response_model=HealthStatus)
async def health_check():
    return HealthStatus(status="healthy")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
