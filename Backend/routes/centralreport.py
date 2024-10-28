
from database import centralreport_db


async def syncreporttocentralreportsystem(report):
    await centralreport_db["central-reports"].insert_one(report)
