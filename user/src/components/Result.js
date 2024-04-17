// Result.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const url = new URLSearchParams(location.search).get("url");

  return (
    <div>
      <h1>Result Page</h1>
      <p>You entered: {url}</p>
    </div>
  );
}

export default Result;
