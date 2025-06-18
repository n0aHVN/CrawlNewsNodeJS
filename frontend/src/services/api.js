// Service for API calls related to categories and articles
const API_BASE = '';

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchArticlesByCategory(categoryId) {
  const res = await fetch(`${API_BASE}/categories/${categoryId}/articles`);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}
