import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [currentOption, setCurrentOption] = useState(null);
  const [optionHistory, setOptionHistory] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/admins/chat-options/');
      setOptions(response.data);
      setCurrentOption(response.data[0]); // Set the root option as the initial current option
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionClick = (option) => {
    setOptionHistory(prevHistory => [...prevHistory, currentOption]); // Save the current option to history
    setCurrentOption(option);
  };

  const handlePreviousOptionClick = () => {
    const previousOption = optionHistory.pop(); // Remove the last option from history
    setCurrentOption(previousOption);
    setOptionHistory([...optionHistory]); // Update the option history state
  };

  const getDirectChildOptions = (parentOptionId) => {
    return options.filter(option => option.parent_option === parentOptionId);
  };

  return (
    <div className="chatbot-container">

      {currentOption && (
        <>
          <div className="question">{currentOption.text}</div>
          <div className="options-container">
            {getDirectChildOptions(currentOption.id).map((option) => (
              <button
                key={option.id}
                className="option-button"
                onClick={() => handleOptionClick(option)}
              >
                {option.text}
              </button>
            ))}
            {optionHistory.length > 0 && (
        <button className="previous-button" onClick={handlePreviousOptionClick}>
          Previous Option
        </button>
      )}
            
          </div>
        </>
      )}

    </div>
  );
};

export default Chatbot;
