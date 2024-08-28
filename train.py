from ultralytics import YOLO
import torch, os

if __name__ == '__main__':
    # Clear GPU cache
    torch.cuda.empty_cache()

    # Load a smaller model
    # model = YOLO('yolov8n.pt')  # use a smaller model like 'yolov8n.pt'
    model = YOLO('Workspace/Trained Models/best.pt')  # use a smaller model like 'yolov8n.pt'

    # Train the model with reduced batch size and image size
    # FOR CPU
    model.train(
        # data=os.path.join(os.getcwd(), 'data.yaml'), 
        data = 'Workspace/Datasets/d1/data.yaml',
        epochs=50, 
        imgsz=320,  # reduced image size
        batch=12,  # reduced batch size
        # half=True  # use mixed precision if supported
        device = 'cpu',
        workers = 16,
        # cache = True,
    )

print(os.path.join(os.getcwd(), 'data.yaml'))