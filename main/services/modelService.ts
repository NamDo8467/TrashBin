import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import { decode as base64Decode } from 'base64-arraybuffer';
import * as ImageManipulator from 'expo-image-manipulator';

// Define the categories your model can classify
const CATEGORIES = [
    'plastic',
    'metal',
    'glass',
    'paper',
    'cardboard',
    'trash',
    'battery',
    'biological',
    'shoes',
    'clothes'
];

export class ModelService {
    private model: tf.LayersModel | null = null;
    private isModelLoaded: boolean = false;

    async loadModel() {
        try {
            if (this.isModelLoaded) return;

            // Initialize TensorFlow
            await tf.ready();
            tf.setBackend('webgl');

            // For now, we'll use a simple mock model that returns random predictions
            // This will be replaced with your actual model later
            this.isModelLoaded = true;
            console.log('Model loaded successfully');
        } catch (error) {
            console.error('Error loading model:', error);
            throw new Error('Failed to load the model');
        }
    }

    async preprocessImage(imageUri: string): Promise<tf.Tensor> {
        try {
            // Resize and normalize the image using expo-image-manipulator
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                imageUri,
                [{ resize: { width: 224, height: 224 } }],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );

            // Read the image file
            const imgB64 = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const imgBuffer = base64Decode(imgB64);

            // Create an Image object from the buffer
            const img = new Image();
            img.src = `data:image/jpeg;base64,${imgB64}`;
            await new Promise((resolve) => {
                img.onload = resolve;
            });

            // Convert the image to a tensor
            const imageTensor = tf.browser.fromPixels(img);
            const normalized = imageTensor.div(255.0);
            const batched = normalized.expandDims(0);
            
            return batched;
        } catch (error) {
            console.error('Error preprocessing image:', error);
            throw new Error('Failed to preprocess image');
        }
    }

    async classifyImage(imageUri: string): Promise<string> {
        try {
            if (!this.isModelLoaded) {
                await this.loadModel();
            }

            // For now, return a random category
            // This will be replaced with actual model inference later
            const randomIndex = Math.floor(Math.random() * CATEGORIES.length);
            return CATEGORIES[randomIndex];
        } catch (error) {
            console.error('Error classifying image:', error);
            throw new Error('Failed to classify image');
        }
    }
}

// Export a singleton instance
export const modelService = new ModelService(); 