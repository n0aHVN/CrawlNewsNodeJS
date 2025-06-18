// Service for API calls related to categories and articles
const API_BASE = 'http://localhost:3000';

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data;
}

export async function fetchArticlesByCategory(categoryName) {
  const res = await fetch(`${API_BASE}/categories/${categoryName}/articles`);
  if (!res.ok) throw new Error('Failed to fetch articles');
  const data = await res.json();
  return data;
}

export async function fetchAllArticles() {
  const res = await fetch(`${API_BASE}/articles`);
  if (!res.ok) throw new Error('Failed to fetch articles');
  const data = await res.json();
  return data.articles;
}