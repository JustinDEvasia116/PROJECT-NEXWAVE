import React, { useState } from 'react';

const MedicineForm = () => {
  const [formData, setFormData] = useState([{ medicine: '', morningTime: '', noon: '', night: '' }]);

  const handleInputChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index][field] = value;
      return updatedFormData;
    });
  };

  const handleAddFields = () => {
    setFormData((prevFormData) => [...prevFormData, { medicine: '', morningTime: '', noon: '', night: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Print all the form data in the console
    console.log(formData);

    // Reset the form after submission
    setFormData([{ medicine: '', morningTime: '', noon: '', night: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formData.map((data, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Medicine"
            value={data.medicine}
            onChange={(e) => handleInputChange(index, 'medicine', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder="Morning Time"
            value={data.morningTime}
            onChange={(e) => handleInputChange(index, 'morningTime', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder="Noon"
            value={data.noon}
            onChange={(e) => handleInputChange(index, 'noon', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder="Night"
            value={data.night}
            onChange={(e) => handleInputChange(index, 'night', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddFields} style={{ marginTop: '10px' }}>
        Add
      </button>
      <button type="submit" style={{ marginTop: '10px' }}>
        Submit
      </button>
    </form>
  );
};

export default MedicineForm;
