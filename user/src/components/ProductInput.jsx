import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductInput = () => {
  const [productLink, setProductLink] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/reviews?url=${productLink}`); 
  };

  return (
    <div  className='box'>
      <h1>User Review Summerisation System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
          placeholder="Enter product link"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductInput;

