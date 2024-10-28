
from pydantic import BaseModel, Field
from typing import Optional

class UserModel(BaseModel):
    username: str
    password: str

class ReportModel(BaseModel):
    title: str
    description: str
    status: Optional[str] = "pending"  

class CCTVModel(BaseModel):
    cctv_id: str
    location: str