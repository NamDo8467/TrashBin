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
    height, width = input_details[0]['shape'][1:3]  # dynamically get size
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((width, height))
    image = np.array(image, dtype=np.float32) / 255.0
    return np.expand_dims(image, axis=0)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    input_data = preprocess_image(contents)

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])

    return {"prediction": output_data.tolist()}
