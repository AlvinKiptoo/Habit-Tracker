import React from 'react';

function HabitList({ habits, setHabits }) {
  
  const handleDeleteHabit = (id) => {
    fetch(`http://localhost:3001/habits/${id}`, { method: 'DELETE' })
      .then(() => {
        
        setHabits(habits.filter(habit => habit.id !== id));
      })
      .catch((error) => console.error('Error deleting habit:', error));
  };

  return (
    <ul>
      {habits.map((habit) => (
        <li key={habit.id}>
          <h2>{habit.name}</h2>
          <p>Category: {habit.category}</p>
          <p>Streak: {habit.streak} days</p>
          <button onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default HabitList;
