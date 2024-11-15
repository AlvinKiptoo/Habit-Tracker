import React, { useState } from 'react';

function HabitForm({ addHabit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHabit = { name, streak: 0 };
    
    fetch('http://localhost:3001/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHabit),
    })
      .then(response => response.json())
      .then(data => {
        addHabit(data);
        setName("");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Habit Name:</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}

export default HabitForm;
