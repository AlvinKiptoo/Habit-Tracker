import React, { useState } from 'react';

function AddHabit({ setHabits }) {
  const [newHabit, setNewHabit] = useState({ name: '', category: '', streak: 0, completed: false });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHabit({ ...newHabit, [name]: value });
  };

  
  const handleAddHabit = (e) => {
    e.preventDefault();

    
    if (!newHabit.name || !newHabit.category) {
      alert('Please fill in all fields');
      return;
    }

    const habitToAdd = {
      ...newHabit,
      streak: 0, 
      completed: false, 
    };

    
    const configObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(habitToAdd),
    };

    fetch('http://localhost:3001/habits', configObj)
      .then((res) => res.json())
      .then((data) => {
        
        setHabits((prevHabits) => [...prevHabits, data]);
        setNewHabit({ name: '', category: '', streak: 0, completed: false }); // Reset the form
      })
      .catch((error) => console.error('Error adding habit:', error));
  };

  return (
    <div>
      <h1>Add a New Habit</h1>
      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          name="name"
          value={newHabit.name}
          onChange={handleChange}
          placeholder="Enter habit name"
          required
        />
        <select
          name="category"
          value={newHabit.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Health">Health</option>
          <option value="Learning">Learning</option>
        </select>
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
}

export default AddHabit;
