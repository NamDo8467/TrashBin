import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { blogs } from '@/constants';
import BlogPost from './BlogPost';

type Props = {};

const TipsSection = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.post}>
                <Text style={styles.heading}>Tips</Text>
                <Text>View All</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {blogs.map((blog, index) => (
                    <View key={index} style={styles.blogWrapper}>
                        <BlogPost
                            category={blog.category}
                            title={blog.title}
                            imageUrl={blog.imageUrl}
                            onPress={() => console.log(`Tapped on: ${blog.title}`)}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default TipsSection;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginBottom: 8,
    },
    blogWrapper: {
        marginHorizontal: 8,
    },
    post: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
