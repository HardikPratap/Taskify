import React, { useState, useEffect, useCallback } from "react";
import TaskForm from "../components/TaskForm";
import TaskCol from "../components/TaskCol";
import todoIcon from "../assets/direct-hit.png";
import doingIcon from "../assets/glowing-star.png";
import doneIcon from "../assets/fire.png";
import axios from "axios";
import "../src/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define fetchTasks using useCallback to prevent recreation
  const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5001/api/tasks", {
        headers: { authorization: token }
      });

      const tasksData = Array.isArray(response.data) ? response.data : response.data.tasks;
      setTasks(tasksData || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = useCallback(async (taskId) => {
    if (!taskId) return;

    // Store original tasks for rollback
    const originalTasks = [...tasks];
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        return;
      }

      // Log the delete request
      console.log("Attempting to delete task:", taskId);
      console.log("Using token:", token);

      // Optimistically remove the task
      setTasks(currentTasks => 
        currentTasks.filter(task => task._id !== taskId)
      );

      const response = await axios.delete(
        `http://localhost:5001/api/tasks/${taskId}`,
        {
          headers: { 
            authorization: token,
            'Content-Type': 'application/json'
          },
        }
      );

      // Log successful deletion
      console.log("Delete response:", response);

      // Clear any existing errors
      setError(null);

    } catch (err) {
      // Log the full error
      console.error("Delete failed:", {
        taskId,
        error: err,
        response: err.response,
        status: err.response?.status
      });

      // Rollback to original state
      setTasks(originalTasks);

      // Handle specific error cases
      if (err.response?.status === 404) {
        setError("Task not found. The page will refresh.");
        await fetchTasks();
      } else if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        // Optionally redirect to login
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(err.response?.data?.message || "Failed to delete task.");
      }
    }
  }, [tasks, fetchTasks]);

  // Early return for loading state
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
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
      
      {error && (
        <div 
          style={{
            padding: "12px",
            margin: "12px",
            backgroundColor: "#fee2e2",
            border: "1px solid #ef4444",
            borderRadius: "4px",
            color: "#dc2626",
            textAlign: "center"
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default App;