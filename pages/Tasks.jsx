import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";  // Assuming TaskForm component exists
import TaskCol from "../components/TaskCol";    // Assuming TaskCol component exists
import todoIcon from "../assets/direct-hit.png";  // Import your icons
import doingIcon from "../assets/glowing-star.png";
import doneIcon from "../assets/fire.png";
import axios from "axios";
import "../src/App.css"
function App() {
  const [tasks, setTasks] = useState([]);  // Initialize tasks as an empty array
  const [loading, setLoading] = useState(true);  // To manage loading state
  const [error, setError] = useState(null);  // To handle error state

  // Fetch tasks from the backend and localStorage
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        console.log(token)
        // Fetch tasks from backend if the token exists
        if (token) {
          const response = await axios.get("http://localhost:5001/api/tasks", {
            headers: { authorization: token }
          });
          console.log(response.data)

          if (response.data && response.data.tasks) {
            setTasks(response.data.tasks);  // Set tasks from backend
          } else {
            setError("Invalid response structure.");
          }
        }

        // Load tasks from localStorage if no token or if needed
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
          setTasks(prevTasks => [...prevTasks, ...JSON.parse(savedTasks)]);
        }

      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Handle task deletion
  function handleDelete(taskIndex) {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        
        <TaskCol
          title="To Do"
          image={todoIcon}
          tasks={tasks.filter(task => task.status === "todo")}
          status="todo"
          handleDelete={handleDelete}
        />
        <TaskCol
          title="Doing"
          image={doingIcon}
          tasks={tasks.filter(task => task.status === "doing")}
          status="doing"
          handleDelete={handleDelete}
        />
        <TaskCol
          title="Done"
          image={doneIcon}
          tasks={tasks.filter(task => task.status === "done")}
          status="done"
          handleDelete={handleDelete}
        />
      </main>
      <div style={{ textAlign: "center" }}>
      {error && <div style={{ color: "red" }}>{error}</div>}

      </div>
    </div>
  );
}

export default App;