from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv
import uvicorn
import asyncio
from supabase import create_client, Client
from firecrawl import FirecrawlApp
import logging
from typing import List, Dict
import numpy as np
import json
import faiss

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

fcapp = FirecrawlApp(api_key=os.getenv("FIRECRAWL_KEY"))
genai.configure(api_key=os.getenv("GEMINI_KEY"))
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@app.get("/status/")
async def status():
    return {"status":"ok"}

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain"
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
    system_instruction= """You are Gemini, a highly capable AI assistant created by Google. Your role is to help users by:

    1. Providing clear, accurate, and helpful responses while maintaining high ethical standards
    2. Focusing on delivering practical solutions and actionable insights
    3. Being direct and concise while remaining friendly and professional
    4. Acknowledging your limitations and being transparent about uncertainties
    5. Prioritizing user privacy and data security
    6. Avoiding harmful, illegal, or unethical content
    7. Adapting your communication style to match the user's technical expertise level

    You aim to empower users while ensuring responsible AI usage. When handling code or technical questions, you provide well-documented solutions with clear explanations. You maintain a balance between being helpful and promoting user autonomy.

    Please format responses appropriately and indicate when you're making assumptions or need clarification.

    Role & Purpose:
    You are an AI co-founder, specialized in assisting solo entrepreneurs with business strategy, validation, fundraising, and automation. Your responses should be insightful, practical, and tailored to early-stage startup needs.

    Core Functions:
    Business Idea Validation - Analyze market feasibility, competition, and potential demand for startup ideas.
    Strategic Advice - Provide actionable insights on growth hacking, marketing, and scaling strategies.
    Fundraising Support - Assist with pitch deck refinement, investor targeting, and funding strategies.
    Daily Founder Support - Help with decision-making, productivity, and overcoming entrepreneurial challenges.
    Workflow Optimization - Suggest automation tools and processes to enhance efficiency.
    Response Guidelines:
    Be concise but insightful - Avoid generic responses, focus on business-specific advice.
    Use real-world examples - Reference industry trends, case studies, and best practices.
    Encourage action - Provide clear next steps based on the founder's query.
    Adapt to context - Consider business stage, industry, and market conditions when providing recommendations.
    Maintain a professional yet supportive tone - Act as an experienced mentor rather than a generic chatbot.
    Example Queries & Expected Outputs:
    Question: "How can I validate my SaaS idea?"
    Response: "To validate your SaaS idea, start with competitor analysis using tools like Crunchbase. Conduct customer interviews to refine your problem statement. Use a no-code MVP to test demand before full development."

    Question: "What's the best fundraising strategy for a B2B startup?"
    Response: "For a B2B startup, focus on revenue-based funding or strategic angel investors. Create a strong sales pipeline before pitching VCs, as they prioritize revenue traction. Consider accelerators like Y Combinator if your product has high growth potential."""
)

@app.post("/ai/")
async def search(userquery: Request):
    try:
        request = await userquery.json()
        query_text = request.get("query")

        if not query_text:
            raise HTTPException(status_code=400, detail="Query text is required")

        response = model.generate_content(query_text)

        return {
            "success": True,
            "response": response.text,
            "query": query_text
        }

    except Exception as e:
        logging.error(f"Error during search: {e}")
        raise HTTPException(status_code=500, detail=f"Error during search: {str(e)}")

@app.post("/login/")
async def login(request: Request):
    try:
        data = await request.json()
        id_token = data.get("id_token")

        if not id_token:
            raise HTTPException(status_code=400, detail="ID token required")

        auth_response = supabase.auth.sign_in_with_id_token({
            "provider": "google",
            "id_token": id_token
        })

        user = auth_response.user

        result = supabase.table("users").select("*").eq("id", user.id).execute()

        if not result.data:
            result = supabase.table("users").insert({
                "id": user.id,
                "email": user.email,
                "name": user.user_metadata.get("full_name"),
                "avatar_url": user.user_metadata.get("avatar_url"),
                "created_at": "now()"
            }).execute()

        return {
            "success": True,
            "user": result.data[0],
            "session": auth_response.session
        }

    except Exception as e:
        logging.error(f"Google auth error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/signup/")
async def refresh_session(request: Request):
    try:
        data = await request.json()
        refresh_token = data.get("refresh_token")

        if not refresh_token:
            raise HTTPException(status_code=400, detail="Refresh token required")

        auth_response = supabase.auth.refresh_session(refresh_token)

        return {
            "success": True,
            "session": auth_response.session
        }

    except Exception as e:
        logging.error(f"Session refresh error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/pitch/generate/")
async def generate_pitch(request: Request):
    try:
        data = await request.json()
        business_info = data.get("business_info")

        if not business_info:
            raise HTTPException(status_code=400, detail="Business info required")

        prompt = f"""Generate a compelling pitch deck outline for the following business, the response should be 150 words or less dont exceed that limit, MAKE SURE THE RESPONSE IS 150 WORDS OR LESSER, IT CANNOT EXCEED 150 WORDS AT ALL IT IS ABSOLUTELY IMPORTANT THAT IT IS LESS THAN 150 WORDS:
        {business_info}

        Include the following sections:
        1. Problem Statement
        2. Solution
        3. Market Opportunity
        4. Business Model
        5. Financial Projections

        (the response should be 150 words or less) dont exceed that limit
        don't mention keeping it under 150 words in the response
        """

        response = model.generate_content(prompt)
        pitch_content = response.text

        return {
            "success": True,
            "pitch": pitch_content,
            "pitch_id": "temp-id-123" 
        }
    except Exception as e:
        logging.error(f"Pitch generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/validate_idea/")
async def validate_idea(request: Request):
    try:
        data = await request.json()
        logging.info(f"Received data: {data}") 
        idea = data.get("idea")

        if not idea:
            raise HTTPException(status_code=400, detail="Business idea is required")

        prompt = f"Validate the following idea: '{idea}'. Provide insights on feasibility, competition, and potential demand."
        response = model.generate_content(prompt)
        analysis = response.text 

        return {
            "success": True,
            "analysis": analysis,
        }
    except Exception as e:
        logging.error(f"Idea validation error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/pitch/review/")
async def review_pitch(request: Request):
    try:
        data = await request.json()
        pitch_content = data.get("pitch_content")

        if not pitch_content:
            raise HTTPException(status_code=400, detail="Pitch content required")

        prompt = f"Review and provide detailed feedback on this pitch: {pitch_content} MAKE SURE THE RESPONSE IS 200 WORDS OR LESSER, IT CANNOT EXCEED 200 WORDS AT ALL IT IS ABSOLUTELY IMPORTANT THAT IT IS LESS THAN 200 WORDS don't mention keeping it under 200 words in the response"
        response = model.generate_content(prompt)
        review = response.text

        return {
            "success": True,
            "review": review,
        }
    except Exception as e:
        logging.error(f"Pitch review error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/match_investors/")
async def match_investors(request: Request):
    try:
        data = await request.json()
        pitch_content = data.get("pitch_content")

        if not pitch_content:
            raise HTTPException(status_code=400, detail="Pitch content required")

        prompt = f"Based on this pitch content: {pitch_content}, suggest ideal investors including their industry focus, investment stage, typical check size, geographic preferences, and key value-adds needed. (the response should be 200 words or less) dont exceed that limit,MAKE SURE THE RESPONSE IS 200 WORDS OR LESSER, IT CANNOT EXCEED 200 WORDS AT ALL IT IS ABSOLUTELY IMPORTANT THAT IT IS LESS THAN 200 WORDS don't mention keeping it under 200 words in the response"
        response = model.generate_content(prompt)
        matching_criteria = response.text

        return {
            "success": True,
            "matching_criteria": matching_criteria,
        }
    except Exception as e:
        logging.error(f"Investor matching error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/strategic_advice/")
async def get_strategic_advice(request: Request):
    try:
        data = await request.json()
        business_idea = data.get("business_idea")

        if not business_idea:
            raise HTTPException(status_code=400, detail="Business idea required")

        prompt = f"Provide tailored strategic advice for the business idea '{business_idea}'."
        response = model.generate_content(prompt)
        advice = response.text

        return {
            "success": True,
            "advice": advice,
        }
    except Exception as e:
        logging.error(f"Strategic advice error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/scaling/")
async def get_scaling_advice(request: Request):
    try:
        data = await request.json()
        business_idea = data.get("business_idea")

        if not business_idea:
            raise HTTPException(status_code=400, detail="Business idea required")

        prompt = f"Provide a detailed scaling plan for the business idea '{business_idea}'."
        response = model.generate_content(prompt)
        scaling_plan = response.text

        return {
            "success": True,
            "scaling_plan": scaling_plan,
        }
    except Exception as e:
        logging.error(f"Scaling advice error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)