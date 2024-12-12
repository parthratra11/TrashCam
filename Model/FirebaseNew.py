import boto3
import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
import time

source_bucket_trashcam = "trashcambucket"
source_folder_trashcam = "userDetected/"  # Folder containing already processed files

source_bucket_camdetected = "trashcambucket"
source_folder_camdetected = "Camdetected/"  # Folder containing already processed files

firebase_cred_path = r"D:\trashcam\trashcam-7ec3f-firebase-adminsdk-1cvbd-2bd1a3aa2c.json"


s3_client = boto3.client("s3")

# Firebase Admin SDK
if not firebase_admin._apps:  # Check if Firebase app is already initialized
    cred = credentials.Certificate(firebase_cred_path)
    firebase_admin.initialize_app(cred)

# Initialize Firestore 
firestore_client = firestore.client()

# already processed files
processed_files_trashcam = set()
processed_files_camdetected = set()

def process_trashcam_files():
    global processed_files_trashcam

   
    s3_objects = s3_client.list_objects_v2(Bucket=source_bucket_trashcam, Prefix=source_folder_trashcam)

    if "Contents" in s3_objects:
        for obj in s3_objects["Contents"]:
            file_key = obj["Key"]

           
            if file_key.endswith("/") or file_key in processed_files_trashcam:
                continue

            file_name = os.path.basename(file_key)  
            file_name_without_ext = os.path.splitext(file_name)[0]  

          
            if file_name.endswith(".json"):
                try:
                   
                    s3_object = s3_client.get_object(Bucket=source_bucket_trashcam, Key=file_key)
                    file_data = s3_object["Body"].read()

                   
                    json_data = json.loads(file_data.decode("utf-8"))

                    
                    username = json_data.get("user_metadata", {}).get("username")
                    if not username:
                        print(f"Skipping JSON file {file_name}: 'username' field is missing.")
                        continue

                
                    doc_ref = (
                        firestore_client.collection("UserJson")
                        .document(username)
                        .collection("reports")
                        .document(file_name_without_ext)
                    )
                    doc_ref.set(json_data)

                    
                    processed_files_trashcam.add(file_key)

                    print(f"Uploaded JSON file {file_name} to Firestore under 'jsonFiles/{username}/reports'.")
                except json.JSONDecodeError:
                    print(f"Skipping invalid JSON file: {file_name}")
                except Exception as e:
                    print(f"Error processing file {file_name}: {e}")
            else:
                print(f"Skipping non-JSON file: {file_name}")
    else:
        print("No files found in the specified S3 folder.")

def process_camdetected_files():
    global processed_files_camdetected

  
    s3_objects = s3_client.list_objects_v2(Bucket=source_bucket_camdetected, Prefix=source_folder_camdetected)

    if "Contents" in s3_objects:
        
        sorted_objects = sorted(
            s3_objects["Contents"],
            key=lambda obj: obj["LastModified"],
            reverse=True
        )

        for obj in sorted_objects:
            file_key = obj["Key"]

            if file_key.endswith("/") or file_key in processed_files_camdetected:
                continue

            file_name = os.path.basename(file_key)  
            file_name_without_ext = os.path.splitext(file_name)[0] 

            try:
                
                s3_object = s3_client.head_object(Bucket=source_bucket_camdetected, Key=file_key)
                metadata = s3_object.get("Metadata", {})  # Retrieve user-defined metadata

                metadata["LastModified"] = s3_object.get("LastModified").isoformat() if s3_object.get("LastModified") else None
                metadata["ContentType"] = s3_object.get("ContentType", "unknown")
                metadata["ContentLength"] = s3_object.get("ContentLength", 0)

                
                camid = metadata.get("camid", "unknown_camid")

                
                doc_ref = (
                    firestore_client.collection("Camjson")
                    .document(camid)
                    .collection("reports")
                    .document(file_name_without_ext)
                )
                doc_ref.set(metadata)

               
                processed_files_camdetected.add(file_key)

                print(f"Uploaded metadata for the latest image {file_name} to Firestore under 'Camjson/{camid}/reports/{file_name_without_ext}'.")
                break  
            except Exception as e:
                print(f"Error processing image {file_name}: {e}")
    else:
        print("No files found in the specified S3 folder.")




def main():
    while True:
        print("Checking for new files in Trashcam...")
        process_trashcam_files()
        print("Checking for new files in Camdetected...")
        process_camdetected_files()

if __name__ == "__main__":
    main()
