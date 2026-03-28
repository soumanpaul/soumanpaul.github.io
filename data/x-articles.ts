export interface XArticle {
    id: string;
    title: string;
    description: string;
    url: string;
    date: string;
    tags: string[];
    image: string;
}

export const xArticles: XArticle[] = [];
