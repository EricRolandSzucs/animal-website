import React, { useState, useContext } from 'react';
import AuthContext from "./context/AuthProvider";

const Schedule = ({ style }) => {

  const { auth } = useContext(AuthContext);

  const [date, setDate] = useState('');
  const [email, setEmail] = useState(auth ? auth.email : '');
  const [phone, setPhone] = useState(auth ? auth.phone : '');
  const [shelter, setShelter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={style} className="schedule centered form-container">
      <h1>Schedule visit at:<br></br></h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="shelter">Shelter:</label>
        <select value={shelter} onChange={(e) => setShelter(e.target.value)}>
          <option value="1">South Wilmington Street Center</option>
        </select>


        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="phone">Phone number:</label>
        <input
          type="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Schedule;