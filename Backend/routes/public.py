

from fastapi import APIRouter, HTTPException
from models import UserModel, ReportModel
from database import public_db
from routes.centralreport import syncreporttocentralreportsystem  

router = APIRouter()

@router.post("/register")
async def registeruser(user: UserModel):
    existing_user = await public_db["users"].find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    await public_db["users"].insert_one(user.dict())
    return {"message": "User registered successfully"}

@router.post("/login")
async def loginuser(user: UserModel):
    db_user = await public_db["users"].find_one({"username": user.username})
    if not db_user or db_user["password"] != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful"}


@router.post("/reports")
async def addreport(report: ReportModel):
  
    await public_db["reports"].insert_one(report.dict())
    
    await syncreporttocentralreportsystem(report.dict())
    
    return {"message": "Report added and synced successfully"}


@router.get("/reports")
async def getreports():
    reports = []
    async for report in public_db["reports"].find():
        reports.append(report)
    return reports


@router.get("/reports/{report_id}")
async def getsinglereport(report_id: str):
    report = await public_db["reports"].find_one({"_id": report_id})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.get("/report_stats")
async def getreportstats():
    total = await public_db["reports"].count_documents({})
    pending = await public_db["reports"].count_documents({"status": "pending"})
    invalid = await public_db["reports"].count_documents({"status": "invalid"})
    resolved = await public_db["reports"].count_documents({"status": "resolved"})
    return {
        "total": total,
        "pending": pending,
        "invalid": invalid,
        "resolved": resolved
    }
