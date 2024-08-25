import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "YOUR_ROLL_NUMBER"; // Replace with your actual roll number
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data.data)) {
        throw new Error('Input must contain a "data" array');
      }
      const result = await postData(data);
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const postData = async (data) => {
    const response = await fetch('https://your-backend-url.com/bfhl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  };

  const handleFilterChange = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedFilters(values);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;
    const filteredResponse = {};
    selectedFilters.forEach(filter => {
      filteredResponse[filter] = response[filter];
    });
    return JSON.stringify(filteredResponse, null, 2);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JSON data"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <>
          <select 
            multiple 
            value={selectedFilters} 
            onChange={handleFilterChange}
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          <pre>{renderFilteredResponse()}</pre>
        </>
      )}
    </div>
  );
}

export default App;