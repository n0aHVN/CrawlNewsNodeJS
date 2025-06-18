import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:slug" element={<NewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
