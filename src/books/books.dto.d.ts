export declare class CreateBookDto {
    title: string;
    author: string;
    coverImage?: string;
    description?: string;
    authorBio?: string;
    storyOutline?: string;
    genres?: string[];
    publishedYear?: number;
    isbn?: string;
}
export declare class SuggestBookDto {
    title: string;
    author: string;
    description?: string;
    authorBio?: string;
    storyOutline?: string;
}
export declare class UpdateBookDto {
    title?: string;
    author?: string;
    rating?: number;
    isPopular?: boolean;
    isTopRated?: boolean;
    authorBio?: string;
    storyOutline?: string;
}
