import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { getDisposalAdvice } from '../../../services/gemini';

interface AdviceSection {
    title: string;
    content: string[];
}

const parseAdviceText = (text: string): AdviceSection[] => {
    // Split the text into lines
    const lines = text.split('\n');
    const sections: AdviceSection[] = [];
    let currentSection: AdviceSection | null = null;

    lines.forEach(line => {
        // Remove markdown formatting
        const cleanLine = line.replace(/\*\*/g, '').trim();
        
        // Check if this is a heading (starts with *)
        if (line.trim().startsWith('*')) {
            // If we have a previous section, add it to sections
            if (currentSection) {
                sections.push(currentSection);
            }
            // Create new section
            currentSection = {
                title: cleanLine,
                content: []
            };
        } else if (currentSection && cleanLine) {
            // Add content to current section
            currentSection.content.push(cleanLine);
        }
    });

    // Add the last section if exists
    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
};

export default function DisposalAdviceScreen() {
    const { imageUri, materialType } = useLocalSearchParams<{ imageUri: string; materialType: string }>();
    const [advice, setAdvice] = useState<AdviceSection[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                setLoading(true);
                const disposalAdvice = await getDisposalAdvice(materialType);
                setAdvice(parseAdviceText(disposalAdvice));
            } catch (err) {
                setError('Failed to get disposal advice. Please try again.');
                console.error('Error fetching disposal advice:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdvice();
    }, [materialType]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Stack.Screen options={{ title: 'Disposal Advice' }} />
                <ActivityIndicator size="large" color="#006ee6" />
                <Text style={styles.loadingText}>Getting disposal advice...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Stack.Screen options={{ title: 'Disposal Advice' }} />
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen 
                options={{ 
                    title: 'Disposal Advice',
                    headerBackTitle: 'Back'
                }} 
            />
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: decodeURIComponent(imageUri) }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Disposal Advice</Text>
                    <Text style={styles.materialType}>Material Type: {materialType}</Text>
                    <View style={styles.adviceContainer}>
                        {advice?.map((section, index) => (
                            <View key={index} style={styles.section}>
                                <Text style={styles.sectionTitle}>{section.title}</Text>
                                {section.content.map((line, lineIndex) => (
                                    <Text key={lineIndex} style={styles.adviceText}>
                                        • {line}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    imageContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#E0E0E0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    materialType: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    adviceContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    adviceText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginLeft: 10,
        marginBottom: 5,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#ff4444',
        textAlign: 'center',
        margin: 20,
    },
}); 