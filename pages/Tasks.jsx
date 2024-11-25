import React, { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // To handle error messages

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You must be logged in to view tasks.");
          return;
        }

        const response = await axios.get("http://localhost:5001/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the tasks array is in the response
        if (response.data && Array.isArray(response.data.tasks)) {
          setTasks(response.data.tasks);
        } else {
          setError("Invalid response structure.");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      {error ? (
        <div style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      ) : (
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task, index) => <li key={index}>{task}</li>)
          ) : (
            <li>No tasks found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Tasks;