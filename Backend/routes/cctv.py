

from fastapi import APIRouter, HTTPException
from models import CCTVModel, ReportModel
from database import cctvdb
from routes.centralreport import syncreporttocentralreportsystem  

router = APIRouter()


@router.post("/register_cctv")
async def registercctv(cctv: CCTVModel):
    await cctvdb["cctvs"].insert_one(cctv.dict())
    return {"message": "CCTV registered successfully"}

@router.post("/reports")
async def addreport(report: ReportModel):
    
    await cctvdb["reports"].insert_one(report.dict())
    

    await syncreporttocentralreportsystem(report.dict())
    
    return {"message": "Report added and synced successfully"}


@router.get("/reports")
async def getreports():
    reports = []
    async for report in cctvdb["reports"].find():
        reports.append(report)
    return reports


@router.get("/reports/{report_id}")
async def getsinglereport(report_id: str):
    report = await cctvdb["reports"].find_one({"_id": report_id})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.get("/report_stats")
async def getcctvreport_stats():
    total = await cctvdb["reports"].count_documents({})
    pending = await cctvdb["reports"].count_documents({"status": "pending"})
    invalid = await cctvdb["reports"].count_documents({"status": "invalid"})
    resolved = await cctvdb["reports"].count_documents({"status": "resolved"})
    return {
        "total": total,
        "pending": pending,
        "invalid": invalid,
        "resolved": resolved
    }
