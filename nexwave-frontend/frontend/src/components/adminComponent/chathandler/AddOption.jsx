import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddOption.css';

const AddOption = () => {
  const [parentOption, setParentOption] = useState('');
  const [childOption, setChildOption] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/admins/chat-options/');
      setOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleParentOptionChange = (event) => {
    setParentOption(event.target.value);
  };

  const handleChildOptionChange = (event) => {
    setChildOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("parent id: ",parentOption)
    console.log("option: ",childOption)
    try {
      await axios.post(`http://127.0.0.1:8000/admins/options/${parentOption}/child/`, {
        text: childOption,
      });
      setChildOption('');
      fetchOptions(); // Refresh options after adding a new one
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="option-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="parentOption">Parent Option:</label>
        <select id="parentOption" value={parentOption} onChange={handleParentOptionChange}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="childOption">Child Option:</label>
        <input
          type="text"
          id="childOption"
          value={childOption}
          onChange={handleChildOptionChange}
        />
      </div>
      <button type="submit">Add Option</button>
    </form>
  );
};

export default AddOption;
