from sqlalchemy import Column, Integer, String, JSON
from database import Base

class Candidate(Base):
    __tablename__ = "candidates"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    skills = Column(JSON)
    experience = Column(JSON)
    matching_score = Column(Integer)

