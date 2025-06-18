import React from 'react';

const ArticleList = ({ articles }) => (
  <ul>
    {articles.map(article => (
      <li key={article.id}>{article.title}</li>
    ))}
  </ul>
);

export default ArticleList;
