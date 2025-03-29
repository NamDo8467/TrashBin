import { ActivityIndicator } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/services/AuthProvider';

const index = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!session) {
        return <Redirect href={'/(auth)/login'} />;
    }

    return (
        <Redirect href={'/(main)/(tabs)'} />
    );
};

export default index;
