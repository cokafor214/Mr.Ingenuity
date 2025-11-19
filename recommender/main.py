from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from typing import List
import os

app = FastAPI(title="Recommender")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

RATINGS_PATH = os.path.join(os.path.dirname(__file__), "sample_ratings.csv")

def load_data():
    df = pd.read_csv(RATINGS_PATH)
    return df

def build_user_item_matrix(df: pd.DataFrame):
    pivot = df.pivot_table(index='user_id', columns='item_id', values='rating').fillna(0)
    return pivot

def recommend_for_user(user_id: str, df: pd.DataFrame, top_k: int = 5) -> List[str]:
    pivot = build_user_item_matrix(df)
    if user_id not in pivot.index:
        # cold-start: return popular items
        popular = df.groupby('item_id')['rating'].mean().sort_values(ascending=False).index.tolist()
        return popular[:top_k]

    user_vec = pivot.loc[user_id].values.reshape(1, -1)
    similarity = cosine_similarity(user_vec, pivot.values)[0]  # similarity to all users
    sim_series = pd.Series(similarity, index=pivot.index)
    sim_series[user_id] = 0  # exclude self
    # weighted sum of other users' ratings
    weighted = (pivot.T * sim_series).T.sum(axis=0)
    # mask items the user already rated
    rated = pivot.loc[user_id] > 0
    weighted[rated.index[rated]] = -1
    recommendations = weighted.sort_values(ascending=False).index.tolist()
    return recommendations[:top_k]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/recommend/{user_id}")
def recommend_endpoint(user_id: str, top_k: int = 5):
    df = load_data()
    try:
        recs = recommend_for_user(user_id, df, top_k=top_k)
        return {"user_id": user_id, "recommendations": recs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
