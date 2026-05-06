import pytest
from app.core.logic import engine
from app.models.schemas import UserProfile, MealLog

def test_rule_based_recommendation_diabetic():
    profile = UserProfile(
        userId="user_1",
        name="Test",
        age=30,
        goal="maintenance",
        dietaryPreference="any",
        healthConditions=["diabetes"],
        activityLevel="sedentary"
    )
    logs = []
    
    result = engine.get_rule_based_recommendation(profile, logs, "home")
    
    assert "Low Glycemic Index focus due to Diabetes" in result["warning"]
    assert "Avoid high-sugar fruits" in result["description"]

def test_rule_based_recommendation_weight_loss():
    profile = UserProfile(
        userId="user_2",
        name="Test",
        age=30,
        goal="weight loss",
        dietaryPreference="any",
        healthConditions=[],
        activityLevel="sedentary"
    )
    logs = []
    
    result = engine.get_rule_based_recommendation(profile, logs, "home")
    
    assert result["nutrients"]["calories"] == 400
    assert "high-fiber and low-calorie" in result["description"]

def test_rule_based_recommendation_active():
    profile = UserProfile(
        userId="user_3",
        name="Test",
        age=30,
        goal="maintenance",
        dietaryPreference="any",
        healthConditions=[],
        activityLevel="active"
    )
    logs = []
    
    result = engine.get_rule_based_recommendation(profile, logs, "home")
    
    assert result["nutrients"]["carbs"] == 20
    assert "Extra carbs suggested" in result["description"]
