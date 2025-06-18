import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {fetchArticleBySlug } from '../services/api';

const NewsPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticleBySlug(slug)
      .then(data => setNews(data))
      .catch(err => console.error('Failed to fetch news:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!news) return <div>News not found.</div>;

  return (
    <div>
      <h1>{news.title}</h1>
      <h2>Author: {news.author}</h2>
      <h2>Published At: {news.published_at}</h2>
      {/* This is a html */}
      <div dangerouslySetInnerHTML={{ __html: news.content }} />
      {/* Add more fields as needed */}
    </div>
  );
};

export default NewsPage;