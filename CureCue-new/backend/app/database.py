# --- DATABASE SETUP (using SQLAlchemy) ---
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Replace with your PostgreSQL connection string
# For now, we will use a simple local SQLite database for ease of setup.
# We will switch to PostgreSQL with Docker later.
SQLALCHEMY_DATABASE_URL = "sqlite:///./curecue.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get a DB session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()