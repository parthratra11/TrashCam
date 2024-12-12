from ultralytics import YOLO
import cv2
import cvzone
import math
import boto3
import time
import datetime
import os
import geopandas as gpd
from shapely.geometry import Point,shape
import json


S3_BUCKET_NAME = "trashcambucket"


model = YOLO(r"D:\\trashcam\\latest.pt")
s3_client = boto3.client("s3")

classNames = ["garbage"]



def capture_image():
    cap = cv2.VideoCapture("rtsp://192.168.137.191:5543/1876a3e7e10f6a15143690a6886a1610/live/channel1", cv2.CAP_FFMPEG)

    cap.set(3, 1280)
    cap.set(4, 720)

    success, img = cap.read()
    if success:
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        img_path = f"captured_image_{timestamp}.jpg"
        cv2.imwrite(img_path, img)
        cap.release()
        return img, img_path
    else:
        cap.release()
        raise Exception("Failed to capture image from webcam")


def upload_to_s3(file_path, bucket_name, metadata=None):
    try:
        file_name = os.path.basename(file_path)
        s3_folder = "Camdetected/"
        s3_key = os.path.join(s3_folder, file_name)

        extra_args = {"Metadata": metadata} if metadata else {}
        extra_args["ContentDisposition"] = "inline"

        
        extra_args = {"Metadata": metadata} if metadata else {}
        s3_client.upload_file(file_path, bucket_name, s3_key, ExtraArgs=extra_args)
        print(f"Uploaded {file_name} to S3 bucket {bucket_name} in folder {s3_folder}")
        return s3_key
    except Exception as e:
        print(f"Error uploading file to S3: {e}")



while True:
    try:
        print("Capturing image...")
        img, img_path = capture_image()
        print(f"Image saved at {img_path}")

       
        results = model(img, stream=True)
        detections = False  

        for r in results:
            boxes = r.boxes
            for box in boxes:
                
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                
                cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

                
                conf = math.ceil((box.conf[0] * 100)) / 100
                print(f"Confidence: {conf}")

               
                cls = int(box.cls[0])
                cvzone.putTextRect(img, f'{classNames[cls]} {conf}', (max(0, x1), max(35, y1)))

                
                detections = True

        if detections:
            
            detected_image_path = f"detected_{os.path.basename(img_path)}"
            cv2.imwrite(detected_image_path, img)
            print(f"Processed image saved at {detected_image_path}")

            
            s3_key = upload_to_s3(detected_image_path, S3_BUCKET_NAME)

           
            metadata = {
                "timestamp": datetime.datetime.now().isoformat(),
                "type": "camera",
                "camid": "cam1",
                "lat": "77.171984469442194",
                "lon": "28.7693611987503",
                "status": "False",
                "locality": "malka ganj",
                "ContentType": "image/jpeg",
                "zone": "central",
                "id": "1",
                
                "image_url": f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{s3_key}"
            }

            
            upload_to_s3(detected_image_path, S3_BUCKET_NAME, metadata=metadata)

        
        time.sleep(86400)  


    except Exception as e:
        print(f"Error: {e}")
        break
