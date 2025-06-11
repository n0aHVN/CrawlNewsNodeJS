export interface CategoryDto {
    id: number;
    name: string;
    slug: string;
    created_at: string; // ISO date string
}

export interface ArticleDto {
    data_id: string;
    title: string;
    slug: string;
    content: string | null;
    thumbnail: string | null;
    origin_url: string;
    published_at: string | null; // ISO date string or null
    category_id: number | null;
    author: string | null;
    created_at: string; // ISO date string
}
