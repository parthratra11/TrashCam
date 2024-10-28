from fastapi import APIRouter, HTTPException

from database import centralreportdb


async def syncreporttocentralreportsystem(report):
    await centralreportdb["central-reports"].insert_one(report)


router = APIRouter()

@router.get("/central-reports/stats")
async def getcentralreportstats():
    total = await centralreportdb["central-reports"].count_documents({})
    pending = await centralreportdb["central-reports"].count_documents({"status": "pending"})
    invalid = await centralreportdb["central-reports"].count_documents({"status": "invalid"})
    resolved = await centralreportdb["central-reports"].count_documents({"status": "resolved"})

    return {
        "total": total,
        "pending": pending,
        "invalid": invalid,
        "resolved": resolved
    }
