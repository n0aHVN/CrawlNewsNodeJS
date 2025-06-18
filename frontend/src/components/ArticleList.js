import React from 'react';

const ArticleList = ({ articles }) => (
  <>
    <ul>
      {articles.map(article => (
        <li key={article.data_id}>
        <a href={`/articles/${article.slug}`}>{article.title}</a></li>
      ))}
    </ul>
  </>
);

export default ArticleList;
