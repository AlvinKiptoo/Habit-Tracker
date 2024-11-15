import React from 'react';

function Habit({ habit }) {
  return (
    <div>
      <h3>{habit.name}</h3>
      <p>Current Streak: {habit.streak}</p>
    </div>
  );
}

export default Habit;
