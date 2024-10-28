
from motor.motor_asyncio import AsyncIOMotorClient
db_password = 'TrashForLife'
public_client =AsyncIOMotorClient(f"mongodb+srv://TrashCam:{db_password}@trashcam.pe5s3.mongodb.net/mydb?retryWrites=true&w=majority&appName=TRASHCAM") 
publicdb = public_client["Trashcam"]

cctv_client = AsyncIOMotorClient(f"mongodb+srv://TrashCam:{db_password}@trashcam.pe5s3.mongodb.net/mydb?retryWrites=true&w=majority&appName=TRASHCAM")
cctvdb = cctv_client["mydb"]

centralreport_client = AsyncIOMotorClient(f"mongodb+srv://TrashCam:{db_password}@trashcam.pe5s3.mongodb.net/mydb?retryWrites=true&w=majority&appName=TRASHCAM")
centralreportdb = centralreport_client["mydb"]
