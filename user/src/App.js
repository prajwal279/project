// App.js
import { UserContext, LoadingContext } from "./Contexts/UserContext";
import BackdropLoading from "./components/BackdropLoading";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './components/styles.css';
import ProductInput from './components/ProductInput';
import ReviewPage from './components/ReviewPage/ReviewPage';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider value={{loading, setLoading }}>
    <Router>
      <Routes> 
        <Route path="/" element={<ProductInput />} /> 
        <Route path="/reviews" element={<ReviewPage />} />
      </Routes>
    </Router>
    <BackdropLoading/>
    </UserContext.Provider>
  );
}

export default App;


