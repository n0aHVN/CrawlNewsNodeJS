import React from 'react';
import './CategoryList.css';

const CategoryList = ({ categories, selectedCategory, onSelect }) => (
  <ul className="category-list">
    {categories.map(cat => (
      <li
        key={cat.id}
        className={
          'category-item' +
          (selectedCategory === cat.slug ? ' selected' : '')
        }
        onClick={() => onSelect(cat.slug)}
      >
        {cat.name}
      </li>
    ))}
  </ul>
);

export default CategoryList;
