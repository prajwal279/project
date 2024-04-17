import React, { useState } from 'react';

function TextField() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    console.log('Submitted value:', inputValue);
    // You can perform further actions here, like sending the value to a server, etc.
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}ERROR

export default TextField;
