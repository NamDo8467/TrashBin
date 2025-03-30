import { ImageSourcePropType } from 'react-native';

export interface User {
    id: string;
    username: string;
    email?: string;
    avatar_url?: string;
    bio?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ArticleProps {
    title: string;
    author: string;
    date: string;
    quote: string;
    image: ImageSourcePropType;
}

