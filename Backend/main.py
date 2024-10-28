from fastapi import FastAPI
from routes import public, cctv, centralreport


app = FastAPI(
    title="TrashCam API",
    description="API for managing users, CCTV, and reports",

)


app.include_router(public.router, prefix="/public", tags=["Cluster 1 - User & Reports"])
app.include_router(cctv.router, prefix="/cctv", tags=["Cluster 2 - CCTV & Reports"])
app.include_router(centralreport.router, prefix="/centralreport", tags=["Cluster 3 - centralreport & Reports"])



@app.get("/")
async def root():
    return {"message": "Welcome to the TrashCam API"}


