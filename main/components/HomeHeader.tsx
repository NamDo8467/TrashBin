import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth } from '@/services/AuthProvider';

const HomeHeader = () => {
    const { profile } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hi {profile?.username}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
    },
    greeting: {
        fontSize: 18,
        fontFamily: 'Cursive',
    },
});

export default HomeHeader;
