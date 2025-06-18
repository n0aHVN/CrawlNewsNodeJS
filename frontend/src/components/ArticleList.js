import React from 'react';

const ArticleList = ({ articles }) => (
  <>
    {console.log('Rendering ArticleList with articles:', articles)}
    <ul>
      {articles.map(article => (
        <li key={article.data_id}>{article.title}</li>
      ))}
    </ul>
  </>
);

export default ArticleList;
