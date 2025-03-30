import * as tf from '@tensorflow/tfjs';

let classnames: string[]=['battery','biological','cardboard','clothes','glass','metal','paper','plastic','shoes','trash'];

// Load a pre-trained model
async function loadModel() {
    const model = await tf.loadLayersModel('/main/assets/seqModelV3.tflite');
    console.log('Model loaded successfully');
    return model;
}

// Make a prediction
async function classifyImage(imageUri: string) {
    const model = await loadModel();
    const imageArray = await preprocessImage(imageUri)
    const predictions = model.predict(imageArray);
    return predictions;
}

// Example: Preprocess an image and make a prediction
async function preprocessImage(imageUri: string) {
    const imageTensor = tf.browser.fromPixels(imageUri)
        .resizeNearestNeighbor([180, 180]) // Resize to model's input shape
        .toFloat()
        .div(tf.scalar(255.0)) // Normalize to [0, 1]
        .expandDims(); // Add batch dimension
    return imageTensor;
}