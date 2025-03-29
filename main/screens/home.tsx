import { StyleSheet, View } from 'react-native';
import React from 'react';
import HomeHeader from '@/components/HomeHeader';
import SummaryCard from '@/components/SummaryCard';
import TipsSection from '@/components/TipsSection';

type Props = {};

const HomeScreen = (props: Props) => {
    return (
        <View>
            <HomeHeader />
            <View style={styles.summary}>
                <SummaryCard />
            </View>
            <View style={styles.tipsection}>
                <TipsSection />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    summary: {
        paddingHorizontal: 10
    },
    tipsection: {
        paddingLeft: 10
    }
});
