import React, { useState, useEffect } from "react";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import DeletedHabits from "./DeletedHabits";
import FavoriteHabits from "./FavoriteHabits";
import emailjs from "emailjs-com";
import CompletedHabits from "./CompletedHabits";
import CategoryDropdown from "./CategoryDropdown";
import RegistrationForm from "./RegistrationForm";
import Chart from "chart.js/auto";
import SkewedNavbar from "./SkewedNavbar";

function App() {
  const [habits, setHabits] = useState([]);
  const [deletedHabits, setDeletedHabits] = useState([]);
  const [showDeletedHabits, setShowDeletedHabits] = useState(false);
  const [showFavoriteHabits, setShowFavoriteHabits] = useState(false);
  const [favoriteHabits, setFavoriteHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [showCompletedHabits, setShowCompletedHabits] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [theme, setTheme] = useState("light");
  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);
  const [completedHabitsData, setCompletedHabitsData] = useState({});
  

  useEffect(() => {
    // Check the theme preference from localStorage if available
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    // Update the theme preference in localStorage when it changes
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
    updateCategories(storedHabits); // Initialize categories with stored habits
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    // Update the completedHabitsData whenever completedHabits change
    const data = {};
    completedHabits.forEach((habit) => {
      if (habit.category) {
        if (!data[habit.category]) {
          data[habit.category] = 1;
        } else {
          data[habit.category] += 1;
        }
      }
    });
    setCompletedHabitsData(data);
  }, [completedHabits]);

  useEffect(() => {
    // Define the showChart function here
    const showChart = (completedHabitsData) => {
      const canvas = document.getElementById("habitsChart");
      const ctx = canvas.getContext("2d");

      // Destroy any existing chart
      if (window.myChart) {
        window.myChart.destroy();
      }
        const tickColor = theme === "light" ? "black" : "white";
      // Create a new chart
      window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(completedHabitsData),
          datasets: [
            {
              label: "Completed Habits by Category",
              data: Object.values(completedHabitsData),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],

              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: tickColor, // Change legend label color based on mode
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: tickColor, // Change x-axis label color
              },
            },
            y: {
              beginAtZero: true,
              stepSize: 1,
              ticks: {
                color: tickColor, // Set y-axis tick color
              },
            },
          },
        },
      });
    };

    // Call showChart when completedHabitsData changes
    if (completedHabitsData) {
      showChart(completedHabitsData);
    }
  }, [completedHabitsData, theme]);

  const addHabit = (habit) => {
    const timestamp = new Date().getTime();
    habit.key = timestamp;
    habit.initialGoalDays = habit.goalDays;

    // Use the functional form of setHabits
    setHabits((prevHabits) => [...prevHabits, habit]);

    // Use the functional form of setCategories
    setCategories((prevCategories) => {
      const uniqueCategories = Array.from(
        new Set([...prevCategories, habit.category])
      );
      return [...uniqueCategories];
    });

    setSelectedCategory(habit.category);

    // Schedule a reminder email when a new habit is added
    const reminderTime = habit.reminderTime;
    if (reminderTime) {
      const [hours, minutes] = reminderTime.split(":");
      const currentDate = new Date();
      const reminderDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes
      );

      if (reminderDate > currentDate) {
        const timeUntilReminder = reminderDate - currentDate;
        setTimeout(() => {
          sendReminderEmail(habit.name); // Define this function
        }, timeUntilReminder);
      }
    }
  };

  const updateCategories = (habits) => {
    const uniqueCategories = Array.from(
      new Set(habits.map((habit) => habit.category))
    );
    setCategories([...uniqueCategories]);
  };

  const sendReminderEmail = (habitName) => {
    // Use emailjs to send a reminder email
    const templateParams = {
      to_email: "zenikibeniki@gmail.com", // Change this to the user's email
      subject: "Reminder: Complete Your Habit",
      message: `Don't forget to complete your habit: ${habitName}`,
    };

    emailjs
      .send(
        "service_1n4gsgx",
        "template_mgjx1fd",
        templateParams,
        "u4-0CXt6mlWQViI6d"
      )
      .then((response) => {
        console.log("Email sent:", response);
      })
      .catch((error) => {
        console.error("Email error:", error);
      });
  };

  const updateHabit = (index, updatedHabit) => {
    const updatedHabits = [...habits];
    updatedHabits[index] = updatedHabit;
    setHabits(updatedHabits);
  };

  const deleteHabit = (index) => {
    const deletedHabit = habits[index];
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
    setDeletedHabits([...deletedHabits, deletedHabit]);

    // Remove the deleted habit from favoriteHabits if it exists
    if (favoriteHabits.includes(deletedHabit)) {
      const updatedFavoriteHabits = favoriteHabits.filter(
        (habit) => habit !== deletedHabit
      );
      setFavoriteHabits(updatedFavoriteHabits);
    }
  };

  const toggleDeletedHabits = () => {
    setShowDeletedHabits(!showDeletedHabits);
  };

  const toggleFavorite = (index) => {
    const habitToFavorite = habits[index];
    if (!favoriteHabits.includes(habitToFavorite)) {
      setFavoriteHabits([...favoriteHabits, habitToFavorite]);
    } else {
      const updatedFavoriteHabits = favoriteHabits.filter(
        (habit) => habit !== habitToFavorite
      );
      setFavoriteHabits(updatedFavoriteHabits);
    }
  };

  const toggleCategoriesDropdown = () => {
    setShowCategoriesDropdown(!showCategoriesDropdown);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    toggleCategoriesDropdown(false);
  };

  const toggleTheme = () => {
    // Toggle between dark and light themes
    setTheme(theme === "light" ? "dark" : "light");
  };

 

  const completeHabit = (index) => {
    const completedHabit = habits[index];
    if (completedHabit.goalDays > 0) {
      // Decrease the goal days by 1
      const updatedGoalDays = completedHabit.goalDays - 1;
      const updatedHabit = { ...completedHabit, goalDays: updatedGoalDays };
      updateHabit(index, updatedHabit);

      if (updatedGoalDays === 0) {
        // Move the habit to completedHabits when the goal is achieved
        setCompletedHabits((prevCompletedHabits) => [
          ...prevCompletedHabits,
          updatedHabit,
        ]);
      }
    }
  };

  const toggleRegistration = () => {
    setIsRegistrationVisible(!isRegistrationVisible);
  };

  const createCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <SkewedNavbar
        onDeleteClick={() => setShowDeletedHabits(!showDeletedHabits)}
        onFavoriteClick={() => setShowFavoriteHabits(!showFavoriteHabits)}
        onCompletedClick={() => setShowCompletedHabits(!showCompletedHabits)}
        onCategoriesClick={toggleCategoriesDropdown}
        onThemeClick={toggleTheme}
        onRegisterClick={toggleRegistration}
      />
      {showCategoriesDropdown && (
        <CategoryDropdown
          showCategoriesDropdown={showCategoriesDropdown}
          onCategorySelect={handleCategorySelect}
          onCreateCategory={createCategory}
          selectedCategory={selectedCategory}
          categories={categories}
        />
      )}
      <div className='nav-menu'>
        {/* <button onClick={() => setShowDeletedHabits(!showDeletedHabits)}>
          Deleted
        </button> */}
        {/* <button onClick={() => setShowFavoriteHabits(!showFavoriteHabits)}>
          Favorite
        </button>
        <button onClick={() => setShowCompletedHabits(!showCompletedHabits)}>
          Completed
        </button> */}
        <div className='dropdown'>
          {/* <button onClick={toggleCategoriesDropdown}>
            Categories {String.fromCharCode(8595)}
          </button> */}

          {/* <CategoryDropdown
            showCategoriesDropdown={showCategoriesDropdown}
            onCategorySelect={handleCategorySelect}
            onCreateCategory={createCategory} // Pass the handler
            selectedCategory={selectedCategory}
            categories={categories}
          /> */}
        </div>

        {/* <button onClick={toggleRegistration}>Register</button> */}
        {/* <button className='theme-toggle' onClick={toggleTheme}>
          {getThemeIcon()}
        </button> */}
        <div className='chart-container'>
          <canvas id='habitsChart'></canvas>
        </div>
      </div>
      {isRegistrationVisible && (
        <RegistrationForm onClose={toggleRegistration} />
      )}
      <h1>Habit Tracker</h1>
      <HabitForm
        addHabit={addHabit}
        setSelectedCategory={setSelectedCategory}
        categories={categories} // Pass the prop
      />
      <HabitList
        habits={habits}
        favoriteHabits={favoriteHabits}
        updateHabit={updateHabit}
        deleteHabit={deleteHabit}
        toggleFavorite={toggleFavorite}
        setCompletedHabits={setCompletedHabits}
        selectedCategory={selectedCategory}
        completeHabit={completeHabit}
        setHabits={setHabits}
      />

      {showDeletedHabits && (
        <DeletedHabits
          deletedHabits={deletedHabits}
          onClose={toggleDeletedHabits}
        />
      )}
      {showFavoriteHabits && (
        <FavoriteHabits
          favoriteHabits={favoriteHabits}
          setShowFavoriteHabits={setShowFavoriteHabits}
        />
      )}
      {showCompletedHabits && (
        <CompletedHabits
          completedHabits={completedHabits}
          onClose={() => setShowCompletedHabits(false)}
        />
      )}
    </div>
  );
}

export default App;
