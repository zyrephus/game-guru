from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from scripts.recommend import GameRecommender

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "https://gameguru.vercel.app", # Vercel production
        "https://gameguru-*.vercel.app" # Vercel preview deployments
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize recommender
recommender = GameRecommender()

class GameInput(BaseModel):
    name: str
    description: str
    genres: str
    platforms: str

@app.post("/recommend")
async def get_recommendations(game: GameInput):
    try:
        recommendations = recommender.get_recommendations_by_content(
            name=game.name,
            description=game.description,
            genres=game.genres,
            platforms=game.platforms,
            num_recommendations=10
        )
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))