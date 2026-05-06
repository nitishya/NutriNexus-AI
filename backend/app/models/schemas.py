from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class UserProfile(BaseModel):
    userId: str
    name: str
    age: int
    goal: str  # weight loss, muscle gain, maintenance
    dietaryPreference: str  # veg, vegan, high protein, any
    healthConditions: List[str] = []
    activityLevel: str  # sedentary, active, very active
    dailyCalorieTarget: Optional[int] = None

class MealLog(BaseModel):
    userId: str
    mealName: str
    calories: int
    protein: float
    carbs: float
    fats: float
    timestamp: datetime = Field(default_factory=datetime.now)
    mealType: str  # breakfast, lunch, dinner, snack

class RecommendationRequest(BaseModel):
    userId: str
    currentTime: datetime = Field(default_factory=datetime.now)
    locationContext: str = "home"  # home, office, travel

class ChatRequest(BaseModel):
    userId: str
    message: str

class AIResponse(BaseModel):
    recommendation: str
    reasoning: str
    nutrients: Optional[Dict[str, float]] = None
    alternatives: List[str] = []

class HealthStatus(BaseModel):
    status: str
    timestamp: datetime = Field(default_factory=datetime.now)
