import React from "react";

const CompletedHabits = ({ completedHabits, onClose }) => {
  return (
    <div className='completed-habits-modal'>
      <div className='completed-habits-content'>
        <h2>Completed Habits</h2>
        <ul>
          {completedHabits.map((habit, index) => (
            <li key={index}>
              Habit: {habit.name} -{" "}
              {habit.name !== undefined
                ? ` achieved in ${habit.initialGoalDays} days`
                : "No goal set"}
              {habit.category && (
                <span className='category-name'>
                  Category: {habit.category}{" "}
                </span>
              )}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CompletedHabits;
