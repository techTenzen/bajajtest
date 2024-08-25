import React, { useState } from 'react';

function MyComp() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setResponse(null);
      setSelectedOptions([]);

      let parsedInput;
      try {
        parsedInput = JSON.parse(jsonInput);
      } catch (e) {
        throw new Error('Invalid JSON format');
      }



      const res = await fetch('https://bhealth-be.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }

      const data = await res.json();

      setResponse({
        isSuccess: data.is_success,
        userId: data.user_id,
        email: data.email,
        rollNumber: data.roll_number,
        numbers: data.numbers,
        alphabets: data.alphabets,
        highestLowercaseAlphabet: data.highest_lowercase_alphabet,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDropdownChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedValues);
  };

  const renderSelectedOptions = () => {
    if (!response) return null;

    return selectedOptions.map((option) => {
      let key = '';
      switch (option) {
        case 'Alphabets':
          key = 'alphabets';
          break;
        case 'Numbers':
          key = 'numbers';
          break;
        case 'HighestLowercaseAlphabet':
          key = 'highestLowercaseAlphabet';
          break;
        default:
          return null;
      }

      return (
        <div key={key}>
          <h3>{option}:</h3>
          <p>{response[key].join(', ')}</p>
        </div>
      );
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>JSON Input</h1>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        rows="10"
        cols="50"
        placeholder="Enter valid JSON here"
        style={{ marginBottom: '10px', padding: '10px', fontFamily: 'monospace' }}
      />
      <br />
      <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
        Submit
      </button>
      <div style={{ marginTop: '20px' }}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {response && (
          <div>
            <h2>Response:</h2>
            <p><strong>Is Success:</strong> {response.isSuccess ? 'Yes' : 'No'}</p>
            <p><strong>User ID:</strong> {response.userId}</p>
            <p><strong>Email:</strong> {response.email}</p>
            <p><strong>Roll Number:</strong> {response.rollNumber}</p>

            {/* Multi-Select Dropdown */}
            <div style={{ marginTop: '20px' }}>
              <label htmlFor="optionsDropdown"><strong>Select Options:</strong></label>
              <select
                id="optionsDropdown"
                multiple
                onChange={handleDropdownChange}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="Alphabets">Alphabets</option>
                <option value="Numbers">Numbers</option>
                <option value="HighestLowercaseAlphabet">Highest Lowercase Alphabet</option>
              </select>
            </div>

            {/* Display Selected Options */}
            <div style={{ marginTop: '20px' }}>
              <h3>Selected Options:</h3>
              {renderSelectedOptions()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComp;
