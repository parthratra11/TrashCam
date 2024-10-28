
from motor.motor_asyncio import AsyncIOMotorClient
db_password = 'TrashForLife'
public_client =AsyncIOMotorClient(f"mongodb+srv://TrashCam:{db_password}@trashcam.pe5s3.mongodb.net/mydb?retryWrites=true&w=majority&appName=TRASHCAM") 
public_db = public_client["Trashcam"]

cctv_client = AsyncIOMotorClient(f"mongodb+srv://TrashCam:{db_password}@trashcam.pe5s3.mongodb.net/mydb?retryWrites=true&w=majority&appName=TRASHCAM")
cctv_db = cctv_client["mydb"]

centralreport_client = AsyncIOMotorClient(f"mongodb+srv://TrashCam:{db_password}@trashcam.pe5s3.mongodb.net/mydb?retryWrites=true&w=majority&appName=TRASHCAM")
centralreport_db = centralreport_client["mydb"]
