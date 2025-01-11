import requests
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(r'D:\TrashCam\Dashboard\work\key2.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

USERID = 'z9a76DQyXwg5ZPRlZxyw58ik0sr1' 
USERNAME = ''

def getBadge():
    user_ref = db.collection('users').document(USERID)
    user_doc = user_ref.get()


    if user_doc.exists:
        user_data = user_doc.to_dict()['analytics']
        USERNAME = user_doc.to_dict()['username']
        print(user_data)
        if 'badge' in user_data:
            return user_data['badge']
        else:
            return None
    else:
        return None
    
# print(getBadge())
if getBadge() == 'gold':

    ACCESS_TOKEN = ""  # Replace with your actual access token
    FB_PAGE_ID = "457120094155881"      # FACEBOOK ID
    IG_USER_ID = "17841470441624256"    # INSTAGRAM BUSINESS ACCOUNT ID
    IMAGE_URL = "https://trashcambucket.s3.us-east-1.amazonaws.com/userDetected/a567940c61eb580455d8f886f55d21b1.jpg"  # Replace with your image URL
    CAPTION = f"""🎉 Congratulations {USERNAME} on earning the Gold Badge! 🏆
Thank you for your outstanding contribution towards building a cleaner and greener society! 🌱 Your dedication to waste management makes a real difference in our community. 🌍
Keep up the amazing work! 💪 Together, we're creating a more sustainable future. ♻"""

    def validate_ig_account():
        url = f"https://graph.facebook.com/v15.0/{FB_PAGE_ID}?fields=instagram_business_account&access_token={ACCESS_TOKEN}"
        response = requests.get(url)
        if response.status_code == 200:
            ig_account = response.json().get("instagram_business_account", {}).get("id")
            if ig_account == IG_USER_ID:
                print("Instagram Business Account is correctly linked.")
                return True
            else:
                print("Instagram Business Account ID mismatch!")
                return False
        else:
            print("Failed to validate Instagram Business Account:", response.json())
            return False

    def create_media():
        url = f"https://graph.facebook.com/v15.0/{IG_USER_ID}/media"
        payload = {
            "image_url": IMAGE_URL,
            "caption": CAPTION,
            "access_token": ACCESS_TOKEN
        }
        response = requests.post(url, data=payload)
        if response.status_code == 200:
            print("Media object created successfully.")
            media_id = response.json().get("id")
            return media_id
        else:
            print("Failed to create media object:", response.json())
            return None

    def publish_media(media_id):
        url = f"https://graph.facebook.com/v15.0/{IG_USER_ID}/media_publish"
        payload = {
            "creation_id": media_id,
            "access_token": ACCESS_TOKEN
        }
        response = requests.post(url, data=payload)
        if response.status_code == 200:
            print("Media published successfully:", response.json())
        else:
            print("Failed to publish media:", response.json())

    if __name__ == "__main__":
        print("Starting Instagram automation...")
        if validate_ig_account():
            media_id = create_media()
            if media_id:
                publish_media(media_id)
