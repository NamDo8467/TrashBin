from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
from flask_cors import CORS
CORS(app)
# Load the TFLite model and allocate tensors
MODEL_PATH = "model/seq_modelV3_softmaxRelu.tflite"
interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Define class names (adjust based on your model's output)
CLASS_NAMES = ['battery', 'biological', 'cardboard', 'clothes', 'glass', 'metal', 'paper', 'plastic', 'shoes', 'trash']

def preprocess_image(image):
    """
    Preprocess the input image to match the model's input shape.
    """
    input_shape = input_details[0]['shape'][1:3]  # Get input shape (height, width)
    image = image.resize(input_shape, Image.ANTIALIAS)  # Resize image
    image = np.array(image).astype('float32') / 255.0  # Normalize to [0, 1]
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/predict', methods=['POST'])
def predict():
    """
    Handle prediction requests.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Load the image
        image = Image.open(io.BytesIO(file.read())).convert('RGB')

        # Preprocess the image
        input_data = preprocess_image(image)

        # Set the tensor for the input
        interpreter.set_tensor(input_details[0]['index'], input_data)

        # Run inference
        interpreter.invoke()

        # Get the output tensor
        predictions = interpreter.get_tensor(output_details[0]['index'])

        # Apply softmax if needed
        if output_details[0]['dtype'] == np.float32:
            scores = tf.nn.softmax(predictions[0]).numpy()
        else:
            scores = predictions[0]

        # Get the predicted class
        predicted_class = CLASS_NAMES[np.argmax(scores)]
        confidence = float(np.max(scores))

        return jsonify({'prediction': predicted_class})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)