import React, { useEffect, useState } from 'react';
import CategoryList from '../components/CategoryList';
import ArticleList from '../components/ArticleList';
import { fetchCategories, fetchArticlesTitleByCategory, fetchAllArticles } from '../services/api';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchArticlesTitleByCategory(selectedCategory)
        .then(setArticles)
        .catch(err => console.error('Failed to fetch articles:', err));
    } else {
      fetchAllArticles()
        .then(setArticles)
        .catch(err => console.error('Failed to fetch articles:', err));
    }
  }, [selectedCategory]);

  return (
    <div>
      <h1>Categories</h1>
      <CategoryList categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      <h2>Articles</h2>
      <ArticleList articles={articles} />
    </div>
  );
}

export default HomePage;
