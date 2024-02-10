import React, { useState } from 'react';

const Schedule = () => {
  const [date, setDate] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const shelterName = "Miami Shelter"

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Date:', date);
    console.log('Input 1:', input1);
    console.log('Input 2:', input2);
  };

  return (
    <div className="form-container">
      <h1>Schedule a visit at:<br></br> { shelterName }</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="input1">Email:</label>
        <input
          type="text"
          id="input1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />

        <label htmlFor="input2">Phone number:</label>
        <input
          type="phone"
          id="input2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Schedule;