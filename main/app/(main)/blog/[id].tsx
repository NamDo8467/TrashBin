import { useLocalSearchParams } from 'expo-router';
import { Text, ScrollView, Image, StyleSheet } from 'react-native';
import { articles

 } from '@/constants';
export default function ArticleScreen() {
    const { id } = useLocalSearchParams();
    const article = articles[Number(id)];

    if (!article) {
        return <Text>Article not found</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: article.image }} style={styles.image} />
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.meta}>By {article.author} • {article.date}</Text>
            {article.content.map((para, index) => (
                <Text key={index} style={styles.paragraph}>{para}</Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8
    },
    meta: {
        color: '#555',
        marginBottom: 16
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 24
    }
});
