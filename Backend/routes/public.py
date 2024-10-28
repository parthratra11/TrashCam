from fastapi import APIRouter, HTTPException
from models import UserModel, ReportModel, LoginModel
from database import publicdb
from routes.centralreport import syncreporttocentralreportsystem
from typing import List

router = APIRouter()

@router.post("/register")
async def registeruser(user: UserModel):
    existing_user = await publicdb["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    await publicdb["users"].insert_one(user.model_dump())
    return {"message": "User registered successfully", "userid": user.userid}

@router.post("/login")
async def loginuser(user: LoginModel):
    db_user = await publicdb["users"].find_one({"email": user.email})
    if not db_user or db_user["password"] != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful", "userid": db_user["userid"]}

@router.post("/reports")
async def addreport(userid: str, report: ReportModel):
    user_doc = await publicdb["users"].find_one({"userid": userid})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    
    
    user_doc["reports"].append(report.model_dump())
    await publicdb["users"].update_one({"userid": userid}, {"$set": user_doc})
    
    
    await syncreporttocentralreportsystem(report.model_dump())
    
    return {"message": "Report added and synced successfully"}

@router.get("/reports/{userid}")
async def getuserreports(userid: str):
    user_doc = await publicdb["users"].find_one({"userid": userid})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    return user_doc["reports"]

@router.get("/reportstatsofusers")
async def getreportstats():
    total = 0
    pending = 0
    invalid = 0
    resolved = 0
    async for user_doc in publicdb["users"].find():
        for report in user_doc["reports"]:
            total += 1
            if report["status"] == "pending":
                pending += 1
            elif report["status"] == "invalid":
                invalid += 1
            elif report["status"] == "resolved":
                resolved += 1
    return {
        "total": total,
        "pending": pending,
        "invalid": invalid,
        "resolved": resolved
    }