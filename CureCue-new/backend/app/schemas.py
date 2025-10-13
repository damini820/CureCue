# --- PYDANTIC SCHEMAS (Data Validation) ---
# In backend/app/schemas.py

from pydantic import BaseModel, EmailStr
from typing import List, Optional

# ==============================
# ROUTINE SCHEMAS
# ==============================

class RoutineBase(BaseModel):
    name: str
    description: Optional[str] = None
    time: str

class RoutineCreate(RoutineBase):
    pass

# This schema needs to be defined before the main User schema because User references it.
class Routine(RoutineBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


# ==============================
# USER SCHEMAS
# ==============================

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

# This is the main User schema for reading/returning user data.
# It includes the list of routines linked to the user.
class User(UserBase):
    id: int
    is_active: bool
    routines: List[Routine] = []

    class Config:
        from_attributes = True


# ==============================
# TOKEN SCHEMAS
# ==============================

class TokenData(BaseModel):
    email: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str