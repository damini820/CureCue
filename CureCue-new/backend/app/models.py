# --- DATABASE MODELS (Table Schemas) ---
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# This is our existing User class
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    
    # This creates the relationship from the User side
    routines = relationship("Routine", back_populates="owner")

# --- ADD THIS NEW CLASS ---
class Routine(Base):
    __tablename__ = "routines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    time = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    # This creates the relationship from the Routine side
    owner = relationship("User", back_populates="routines")