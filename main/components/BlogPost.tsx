import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    category: string;
    title: string;
    imageUrl: string;
    onPress?: () => void;
};

const BlogPost = ({ category, title, imageUrl, onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{category}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>{title}</Text>
                <Ionicons name="arrow-forward-outline" size={16} color="black" />
            </View>
        </TouchableOpacity>
    );
};

export default BlogPost;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e5e7eb', // light gray
        borderRadius: 12,
        padding: 8,
        width: 260,
    },
    image: {
        width: '100%',
        height: 140,
        borderRadius: 10,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
    },
    footer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    title: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
});
