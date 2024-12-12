import firebase_admin
from firebase_admin import credentials, firestore
import random

# INITIALIZE FIREBASE ADMIN
cred = credentials.Certificate(r'D:\TrashCam\Dashboard\work\key2.json')  # REPLACE WITH YOUR FIREBASE CREDENTIALS
firebase_admin.initialize_app(cred)
db = firestore.client()

# DEFINE ZONES AND BADGES
ZONES = ["north", "south", "east", "west"]
BADGES = ["gold", "silver", "bronze"]

# FUNCTION TO GENERATE RANDOM USER DATA
def generateUserData():
   username = f"User_{random.randint(1, 1000)}"
   analytics = {
       "badge": random.choice(BADGES),
       "falseReports": random.randint(0, 5),
       "penalties": random.randint(0, 3),
       "posted": bool(random.getrandbits(1)),
       "rating": round(random.uniform(3.0, 5.0), 1),
       "totalReports": random.randint(0, 10),
       "zone": random.choice(ZONES),
   }
   return {
       "username": username,
       "userId": f"user_{random.randint(1000, 9999)}",
       "analytics": analytics,
   }

# ADD 15 DUMMY USERS TO FIRESTORE
def populateUsers():
   usersRef = db.collection("users")
   for _ in range(15):
       userData = generateUserData()
       usersRef.document().set(userData)
       print(f"Added user: {userData['username']}")

# EXECUTE THE FUNCTION
if __name__ == "__main__":
   populateUsers()