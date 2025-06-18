import React from 'react';

const CategoryList = ({ categories, selectedCategory, onSelect }) => (
  <ul>
    {categories.map(cat => (
      <li
        key={cat.id}
        style={{ cursor: 'pointer', fontWeight: selectedCategory === cat.id ? 'bold' : 'normal' }}
        onClick={() => onSelect(cat.slug)}
      >
        {cat.name}
      </li>
    ))}
  </ul>
);

export default CategoryList;
