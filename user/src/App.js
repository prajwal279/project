// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './components/styles.css';
import ProductInput from './components/ProductInput';
import ReviewPage from './components/ReviewPage/ReviewPage';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<ProductInput />} /> 
        <Route path="/reviews" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;


