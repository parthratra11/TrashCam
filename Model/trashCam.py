from ultralytics import YOLO
import cv2, cvzone
import math, os, csv, geocoder, folium 
import numpy as np
from datetime import datetime

# cap = cv2.VideoCapture("Workspace/Test/videos/garbage7.mp4")
# cap = cv2.VideoCapture(0)
# cap = cv2.VideoCapture("http://192.168.76.132:4747/video")
cap = cv2.VideoCapture("http://192.168.137.18:8000")

model = YOLO(r"D:/TrashCam/Workspace/Trained Models/bests.pt")
# model = YOLO(os.path.join(os.getcwd(), 'best.pt')) # ANOTHER METHOD
model.to('cpu')

classNames = ["garbage"]

# List to store detected garbage heap coordinates
detected_heaps = []

# Function to check if a detection is already recorded
def is_duplicate_detection(new_detection, detected_heaps, threshold=20):
    for heap in detected_heaps:
        # Calculate the Euclidean distance between the centers of the bounding boxes
        heap_center = ((heap[0] + heap[2]) / 2, (heap[1] + heap[3]) / 2)
        new_center = ((new_detection[0] + new_detection[2]) / 2, (new_detection[1] + new_detection[3]) / 2)
        distance = np.linalg.norm(np.array(heap_center) - np.array(new_center))
        
        if distance < threshold:
            return True
    return False

detectedLocations = [] # List to store all the already detected locations

try:
    with open('output.csv', 'r') as locationFile:
        reader = csv.reader(locationFile)

        for row in reader:
            lat, lng = row[3].strip('[]').split(', ')
            detectedLocations.append([float(lat), float(lng)])

except FileNotFoundError:
    print("output.csv not found")

outputFile = open('output.csv', 'a', newline='')
csv_writer = csv.writer(outputFile)

while True:
    success, img = cap.read()
    if not success:
        break

    results = model(img, stream=True)

    for r in results:
        boxes = r.boxes

        for box in boxes:
            # Get bounding box coordinates
            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # Draw the bounding box on the image
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

            # Get confidence
            conf = math.ceil((box.conf[0] * 100)) / 100

            # Get class
            cls = int(box.cls[0])
            label = f'{classNames[cls]} {conf}'
            cvzone.putTextRect(img, label, (max(0, x1), max(35, y1)))

            # Only consider detections with confidence above threshold
            if conf >= 0.4:
                # Check if the detection is a duplicate
                new_detection = (x1, y1, x2, y2)
                if not is_duplicate_detection(new_detection, detected_heaps):
                    # If not a duplicate, fetch location, add to detected heaps list and output file
                    currentLoc = geocoder.ip('me')

                    if currentLoc.latlng not in detectedLocations:
                        latitude, longitude = currentLoc.latlng

                        if latitude and longitude:
                            csv_writer.writerow([classNames[cls], conf, datetime.now().strftime("%Y-%m-%d %H:%M:%S"), [latitude, longitude]])
                            detected_heaps.append(new_detection)
                            detectedLocations.append(currentLoc.latlng)

    # Display the image
    cv2.imshow("image", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

outputFile.close()
