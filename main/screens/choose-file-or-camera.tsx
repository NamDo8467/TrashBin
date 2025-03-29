import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useRouter } from 'expo-router';
import { modelService } from '../services/modelService';

const FileOrCamera = () => {
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
            }
            // Load the model when the component mounts
            try {
                await modelService.loadModel();
            } catch (error) {
                console.error('Error loading model:', error);
                Alert.alert('Error', 'Failed to load the model. Please try again later.');
            }
        })();
    }, []);

    const handleImageSelection = async (imageUri: string) => {
        try {
            setIsLoading(true);
            // Classify the image using the model
            const materialType = await modelService.classifyImage(imageUri);
            console.log(materialType);
            
            // Navigate to disposal advice screen with the image URI and material type
            router.push({
                pathname: '/(main)/camera/disposal-advice',
                params: {
                    imageUri: encodeURIComponent(imageUri),
                    materialType: encodeURIComponent(materialType)
                }
            });
        } catch (error) {
            console.error('Error classifying image:', error);
            Alert.alert('Error', 'Failed to classify the image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                setImage(imageUri);
                await handleImageSelection(imageUri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                setImage(imageUri);
                await handleImageSelection(imageUri);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload a Photo</Text>
            <Text style={styles.subtitle}>Choose an option to upload your photo</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, isLoading && styles.buttonDisabled]} 
                    onPress={pickImage}
                    disabled={isLoading}
                >
                    <Ionicons name="images-outline" size={30} color="white" />
                    <Text style={styles.buttonText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, isLoading && styles.buttonDisabled]} 
                    onPress={takePhoto}
                    disabled={isLoading}
                >
                    <Ionicons name="camera-outline" size={30} color="white" />
                    <Text style={styles.buttonText}>Camera</Text>
                </TouchableOpacity>
            </View>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3A86FF" />
                    <Text style={styles.loadingText}>Analyzing image...</Text>
                </View>
            )}
        </View>
    );
};

export default FileOrCamera;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#F0F0F0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#3A86FF',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8,
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
});
