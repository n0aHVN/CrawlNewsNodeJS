CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE articles (
    data_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT,
    thumbnail TEXT,
    origin_url TEXT NOT NULL UNIQUE,
    published_at TIMESTAMP,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    author TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories(
    name,
    slug
) VALUES(
    'Test Categories',
    'test-categories'
);

INSERT INTO articles (
    data_id,
    title,
    slug,
    content,
    thumbnail,
    origin_url,
    published_at,
    category_id,
    author,
    created_at
)
VALUES (
    'test-001',
    'Test Article Title',
    'test-article-title',
    'This is the content of the test article. It can be long or short.',
    'https://example.com/images/test-thumbnail.jpg',
    'https://tuoitre.vn/test-article-url',
    '2025-06-11 10:30:00',
    1,
    'John Doe',
    NOW()
);

