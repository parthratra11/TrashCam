from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class ReportModel(BaseModel):
    userid: str
    location: str
    report_time: datetime = Field(default_factory=datetime.timestamp)
    resolve_time: Optional[datetime]
    status: Optional[str] = "pending"

class UserModel(BaseModel):
    email: str
    username: str
    password: str
    userid: str = Field(default_factory=lambda: str(uuid.uuid4()))
    reports: List[ReportModel] = []

class LoginModel(BaseModel):
    email: str
    password: str

class CCTVModel(BaseModel):
    cctv_id: str
    location: str