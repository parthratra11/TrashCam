import boto3
from ultralytics import YOLO
import cv2
import cvzone
import math
import numpy as np
from io import BytesIO
import json
import time
import firebase_admin
from firebase_admin import credentials, firestore
import geopandas as gpd
from shapely.geometry import Point,shape

# AWS S3 CONFIGURATION
S3_BUCKET_NAME = "trashcambucket"
S3_FOLDER_NAME = "users/" 
PROCESSED_FOLDER_NAME = "userDetected/" 

with open(r"D:\trashcam\delhi-zones.json", "r") as f:  

    geojson_data = json.load(f)

def find_ward(lat, lon):
    point = Point(lon, lat)  

    for index, feature in enumerate(geojson_data, start=1):  
        polygon = shape(feature["geometry"])  

        if polygon.contains(point):  
            ward_name = feature["properties"]["WARD_2017_"]
            return ward_name, index  

    return "other",None

s3_client = boto3.client('s3')

cred = credentials.Certificate(r"D:\\trashcam\\trashcam-7ec3f-firebase-adminsdk-1cvbd-2bd1a3aa2c.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

model = YOLO(r"D:\\trashcam\\latest.pt")

classNames = ["garbage"]

def get_metrics():
    try:
        doc_ref = db.collection('metrics').document('counts')
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            return {"total_count": 0, "detected_count": 0, "undetected_count": 0}
    except Exception as e:
        print(f"Error fetching metrics: {e}")
        return {"total_count": 0, "detected_count": 0, "undetected_count": 0}

def update_metrics(total_count, detected_count, undetected_count):
    try:
        doc_ref = db.collection('metrics').document('counts')
        doc_ref.set({
            'total_count': total_count,
            'detected_count': detected_count,
            'undetected_count': undetected_count
        })
        print(f"Updated metrics: total_count={total_count}, detected_count={detected_count}, undetected_count={undetected_count}")
    except Exception as e:
        print(f"Error updating metrics in Firebase: {e}")

def get_latest_s3_object(prefix):
    """Retrieve the latest file from an S3 bucket folder."""
    try:
        response = s3_client.list_objects_v2(Bucket=S3_BUCKET_NAME, Prefix=prefix)
        if 'Contents' not in response:
            print("No files found in S3 folder.")
            return None

        latest_file = max(response['Contents'], key=lambda x: x['LastModified'])
        return latest_file['Key']
    except Exception as e:
        print(f"Error retrieving latest file from S3: {e}")
        return None

def process_image_from_s3(key, metrics):
    """Process the image from S3 using YOLO and save detected images and metadata."""
    try:
        total_count = metrics['total_count'] + 1
        detected_count = metrics['detected_count']
        undetected_count = metrics['undetected_count']

        metadata_response = s3_client.head_object(Bucket=S3_BUCKET_NAME, Key=key)
        user_metadata = metadata_response.get('Metadata', {})

        lat = float(user_metadata.get('lat', 0))
        lon = float(user_metadata.get('lon', 0))

        wardname = find_ward(lat,lon)

        response = s3_client.get_object(Bucket=S3_BUCKET_NAME, Key=key)
        image_data = response['Body'].read()

        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        results = model(img, stream=True)
        detected_objects = []

        for r in results:
            boxes = r.boxes
            for box in boxes:
 
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

                conf = math.ceil((box.conf[0] * 100)) / 100

                cls = int(box.cls[0])
                label = classNames[cls]
                detected_objects.append({"label": label, "confidence": conf, "box": [x1, y1, x2, y2]})

                cvzone.putTextRect(img, f'{label} {conf}', (max(0, x1), max(35, y1)))

        if detected_objects:
            detected_count += 1

            _, encoded_img = cv2.imencode('.jpg', img)
            result_bytes = BytesIO(encoded_img)

            detected_image_key = key.replace(S3_FOLDER_NAME, PROCESSED_FOLDER_NAME)

           
            metadata = {
                "source_image": key,
                "detected_objects": detected_objects,
                "user_metadata": user_metadata,
                "zone":wardname[0],
                "id":wardname[1],
                
                "image_url": f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{detected_image_key}" 
                

            }
           
            detected_metadata_key = detected_image_key.replace(".jpg", ".json")

            s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=detected_image_key, Body=result_bytes.getvalue(), ContentType="image/jpeg")
            s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=detected_metadata_key, Body=json.dumps(metadata), ContentType="application/json")

            print(f"Processed image and metadata saved: {detected_image_key}, {detected_metadata_key}")
        else:
            undetected_count += 1
            print(f"No garbage detected in image: {key}. Deleting the image.")

            s3_client.delete_object(Bucket=S3_BUCKET_NAME, Key=key)

        update_metrics(total_count, detected_count, undetected_count)

        return {"total_count": total_count, "detected_count": detected_count, "undetected_count": undetected_count}

    except Exception as e:
        print(f"Error processing image: {e}")
        return metrics


def main():
    """Continuously check for new images in S3 and process them."""
    processed_files = set()

    
    metrics = get_metrics()

    while True:
        latest_key = get_latest_s3_object(S3_FOLDER_NAME)
        if latest_key and latest_key not in processed_files:
            print(f"New file detected: {latest_key}")
            metrics = process_image_from_s3(latest_key, metrics)
            processed_files.add(latest_key)
        else:
            print("No new files to process.")

if __name__ == "__main__":
    main()
