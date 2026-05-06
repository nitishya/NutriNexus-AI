from datetime import datetime
from typing import List, Dict, Optional
from app.models.schemas import UserProfile, MealLog, AIResponse

class MealDecisionEngine:
    def __init__(self):
        # Rules defined here
        pass

    def get_rule_based_recommendation(self, profile: UserProfile, logs: List[MealLog], context: str) -> Dict:
        hour = datetime.now().hour
        recommendation = {
            "title": "",
            "description": "",
            "warning": None,
            "nutrients": {"protein": 0, "carbs": 0, "fats": 0, "calories": 0}
        }

        # Rule: Time of day
        if 5 <= hour < 11:
            recommendation["title"] = "Healthy Breakfast"
            recommendation["description"] = "Suggested: Oatmeal with nuts and berries."
        elif 11 <= hour < 16:
            recommendation["title"] = "Balanced Lunch"
            recommendation["description"] = "Suggested: Grilled chicken salad or Quinoa bowl."
        elif 16 <= hour < 22:
            recommendation["title"] = "Light Dinner"
            recommendation["description"] = "Suggested: Steamed fish with vegetables."
        else:
            recommendation["title"] = "Late Night Snack"
            recommendation["description"] = "Suggested: A handful of almonds or Greek yogurt."

        # Rule: Health Conditions
        if "diabetes" in [c.lower() for c in profile.healthConditions]:
            recommendation["warning"] = "Low Glycemic Index focus due to Diabetes."
            recommendation["description"] += " Avoid high-sugar fruits."

        # Rule: Goal
        if profile.goal == "weight loss":
            recommendation["nutrients"]["calories"] = 400
            recommendation["description"] += " Focus on high-fiber and low-calorie density."
        elif profile.goal == "muscle gain":
            recommendation["nutrients"]["protein"] = 30
            recommendation["description"] += " Increased protein for muscle synthesis."

        # Rule: Activity Level
        if profile.activityLevel == "active":
            recommendation["nutrients"]["carbs"] += 20
            recommendation["description"] += " Extra carbs suggested for recovery."

        return recommendation

    async def get_ai_enhancement(self, rule_result: Dict, profile: UserProfile, user_query: Optional[str] = None) -> AIResponse:
        # In a real app, this would call Gemini/OpenAI
        # For now, we simulate a smart response
        ai_text = f"Based on your {profile.goal} goal and current time, I recommend {rule_result['title']}. "
        if user_query:
            ai_text += f" Regarding your question: '{user_query}', I've adjusted the plan."
        
        return AIResponse(
            recommendation=ai_text,
            reasoning="Combining your health profile with time-of-day nutritional needs.",
            nutrients=rule_result["nutrients"],
            alternatives=["Greek Yogurt with honey", "Hard-boiled eggs"]
        )

engine = MealDecisionEngine()
