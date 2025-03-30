from fastapi import FastAPI, File, UploadFile
import numpy as np
from PIL import Image
import tensorflow as tf
import io

app = FastAPI()

# Load model
interpreter = tf.lite.Interpreter(model_path="modelV1.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

def preprocess_image(image_bytes):
    if image_bytes is not None:
        print("image is not Null")
    print("Preprocess start")
    height, width = input_details[0]['shape'][1:3]  # dynamically get size
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((width, height))
    image = np.array(image, dtype=np.float32) / 255.0
    print("Preprocess done")
    return np.expand_dims(image, axis=0)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print("Predic start")
    contents = await file.read()
    input_data = preprocess_image(contents)

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])

    # Get prediction (index of max value)
    logits = output_data[0]  # shape is [1, num_classes], so take [0]
    predicted_class = int(np.argmax(logits))
    # confidence = float(np.max(logits))
    
    labels = ["Metal", "Glass", "Biological", "Paper", "Battery", "Trash", "Cardboard", "Shoes", "Clothes", "Plastic"]
    predicted_label = labels[predicted_class]
    # print("predicted_class",predicted_class)
    print("Predic end")
    # print(predicted_label)

    return {
        "prediction": predicted_label,
        # "confidence": confidence
    }
