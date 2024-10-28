from fastapi import FastAPI
from routes import public, cctv


app = FastAPI(
    title="TrashCam API",
    description="API for managing users, CCTV, and reports",

)


app.include_router(public.router, prefix="/cluster1", tags=["Cluster 1 - User & Reports"])
app.include_router(cctv.router, prefix="/cluster2", tags=["Cluster 2 - CCTV & Reports"])


@app.get("/")
async def root():
    return {"message": "Welcome to the TrashCam API"}


