# --- MAIN FASTAPI APP ---
# Updated version (simplified auth for frontend linking and testing)

from fastapi import FastAPI, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas, database

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# --- CORS MIDDLEWARE ---
origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROOT ROUTE ---
@app.get("/")
def read_root():
    """Root endpoint to verify server is running."""
    return {"message": "Welcome to the QRQ (Student Wellness Paradox) API!"}


# ==============================================================
# TEMPORARY AUTH ENDPOINTS (for testing / frontend integration)
# ==============================================================

@app.post("/register")
def fake_register(user: schemas.UserCreate):
    """
    TEMPORARY REGISTER ENDPOINT
    Always succeeds and doesn't check duplicates or save to DB.
    Allows frontend testing before final auth setup.
    """
    return {"email": user.email, "message": "User registered successfully"}


@app.post("/login")
def fake_login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    TEMPORARY LOGIN ENDPOINT
    Accepts any email/password and returns a fake token.
    Works with frontend's form-data based request.
    """
    return {"access_token": "dummy_token", "token_type": "bearer"}


# ==============================================================
# ROUTINE ENDPOINTS (for dashboard testing)
# ==============================================================

@app.post("/routines/", response_model=schemas.Routine, status_code=status.HTTP_201_CREATED)
def create_routine_for_user(
    routine: schemas.RoutineCreate,
    db: Session = Depends(database.get_db)
):
    """Creates a routine (test mode: hardcoded user_id=1)."""
    db_routine = models.Routine(**routine.dict(), user_id=1)
    db.add(db_routine)
    db.commit()
    db.refresh(db_routine)
    return db_routine


@app.get("/routines/", response_model=List[schemas.Routine])
def read_routines_for_user(db: Session = Depends(database.get_db)):
    """Fetches all routines for hardcoded test user (ID=1)."""
    routines = db.query(models.Routine).filter(models.Routine.user_id == 1).all()
    return routines


# ==============================================================
# HEALTH CHECK ENDPOINT
# ==============================================================

@app.get("/health")
def health_check():
    """Simple endpoint to verify backend is reachable."""
    return {"status": "ok"}
# In backend/app/main.py

# import os
# from fastapi import FastAPI, Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordRequestForm
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session
# from datetime import timedelta
# from typing import List
# from pydantic import BaseModel

# # Import our project modules
# from . import models, schemas, auth, database

# # Import Google Dialogflow
# from google.cloud import dialogflow

# # --- SETUP ---

# # This command tells SQLAlchemy to create all the database tables
# models.Base.metadata.create_all(bind=database.engine)

# # Set the environment variable for Google Cloud authentication
# # This MUST be done before creating the app instance
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "app/google-credentials.json"

# app = FastAPI()

# # --- CORS MIDDLEWARE ---
# origins = [
#     "http://localhost:3000",
#     "http://localhost:5173",
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --- Pydantic Models for incoming requests ---
# class ChatMessage(BaseModel):
#     text: str
#     session_id: str

# # --- API ENDPOINTS ---

# @app.get("/")
# def read_root():
#     return {"message": "Welcome to the CureCue API!"}

# # ==============================
# # AUTHENTICATION ENDPOINTS
# # ==============================

# @app.post("/register", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
# def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
#     db_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     try:
#         hashed_password = auth.get_password_hash(user.password)
#     except ValueError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Password is too long. Please use a password with 72 characters or less."
#         )
#     new_user = models.User(email=user.email, hashed_password=hashed_password)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return new_user

# @app.post("/login", response_model=schemas.Token)
# def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
#     user = db.query(models.User).filter(models.User.email == form_data.username).first()
#     try:
#         if not user or not auth.verify_password(form_data.password, user.hashed_password):
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Incorrect email or password",
#             )
#     except ValueError:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect email or password",
#         )
#     access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = auth.create_access_token(
#         data={"sub": user.email}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}

# # ==============================
# # ROUTINES ENDPOINTS (SECURITY TEMPORARILY DISABLED)
# # ==============================

# @app.post("/routines/", response_model=schemas.Routine, status_code=status.HTTP_201_CREATED)
# def create_routine_for_user(routine: schemas.RoutineCreate, db: Session = Depends(database.get_db)):
#     db_routine = models.Routine(**routine.dict(), user_id=1)
#     db.add(db_routine)
#     db.commit()
#     db.refresh(db_routine)
#     return db_routine

# @app.get("/routines/", response_model=List[schemas.Routine])
# def read_routines_for_user(db: Session = Depends(database.get_db)):
#     routines = db.query(models.Routine).filter(models.Routine.user_id == 1).all()
#     return routines

# # ==============================
# # AI MYSTIC (CHATBOT) ENDPOINT
# # ==============================

# @app.post("/mystic-chat/")
# def talk_to_mystic(message: ChatMessage):
#     """Proxy endpoint to talk to the Dialogflow agent."""
#     project_id = "curecue-YOUR_PROJECT_ID" # <-- IMPORTANT: REPLACE THIS
#     session_id = message.session_id
#     text = message.text
#     language_code = "en-US"

#     session_client = dialogflow.SessionsClient()
#     session = session_client.session_path(project_id, session_id)
    
#     text_input = dialogflow.TextInput(text=text, language_code=language_code)
#     query_input = dialogflow.QueryInput(text=text_input)

#     try:
#         response = session_client.detect_intent(
#             request={"session": session, "query_input": query_input}
#         )
#         return {"reply": response.query_result.fulfillment_text}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error communicating with AI agent: {e}")