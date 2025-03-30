import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { blogs } from '@/constants';
import BlogPost from './BlogPost';
import { useRouter } from 'expo-router';

const TipsSection = () => {
    const router = useRouter();

    const openArticle = (id: number) => {
        router.push(`/blog/${id}`);
    };

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
                            id={blog.id}
                            onPress={() => openArticle(blog.id)}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 8,
    }
});
