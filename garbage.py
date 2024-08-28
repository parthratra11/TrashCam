from ultralytics import YOLO
import cv2, cvzone
import math, os, csv
import numpy as np
from datetime import datetime

#! MODEL NEEDS MORE TRAINING, 'm' OR 'l' MODEL TO BE CONSIDERED, AND MORE DATASETS

cap = cv2.VideoCapture("Workspace/Test/videos/garbage1.mp4")
# cap = cv2.VideoCapture("http://192.168.76.132:4747/video")

model = YOLO("Workspace/Trained Models/best.pt")
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


while True:
    success, img = cap.read()
    if not success:
        break

    results = model(img, stream=True)

    outputFile = open('output.csv', 'a', newline='')
    csv_writer = csv.writer(outputFile)

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
            if conf >= 0.5:
                # Check if the detection is a duplicate
                new_detection = (x1, y1, x2, y2)
                if not is_duplicate_detection(new_detection, detected_heaps):
                    # If not a duplicate, add to detected heaps list and output file
                    detected_heaps.append(new_detection)
                    csv_writer.writerow([classNames[cls], conf, datetime.now().strftime("%Y-%m-%d %H:%M:%S")])

    # Display the image
    cv2.imshow("image", img)
    cv2.waitKey(1)