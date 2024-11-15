import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HabitList from './components/HabitList';
import AddHabit from './components/AddHabit';

function App() {
  const [habits, setHabits] = useState([]); 
  const [categoryFilter, setCategoryFilter] = useState('All'); 

  
  useEffect(() => {
    fetch('http://localhost:3001/habits')
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((error) => console.error('Error fetching habits:', error));
  }, []);

  
  const filteredHabits = categoryFilter === 'All' ? habits : habits.filter(h => h.category === categoryFilter);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          
          <Route path="/" element={
            <div>
              <h1>Habit Tracker</h1>

              <div>
                <select onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Health">Health</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>

              {filteredHabits.length > 0 ? (
                <HabitList habits={filteredHabits} setHabits={setHabits} />
              ) : (
                <p>No habits found. Add some habits!</p>
              )}
             
            </div>
          } />

          <Route path="/add-habit" element={<AddHabit setHabits={setHabits} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
