import { useState } from 'react'
import './App.css'
import TaskForm from '../components/TaskForm'
import TaskCol from '../components/TaskCol'
import todoIcon from '../assets/direct-hit.png'
import doingIcon from'../assets/glowing-star.png'
import doneIcon from'../assets/check-mark-button.png'


function App() {

  const [tasks, setTasks]= useState([]);
  console.log("tasks",tasks)
  return (

      <div className='app'>
        <TaskForm setTasks={setTasks}/>
        <main className='app_main'> 
          <TaskCol 
            title="To do" 
            image={todoIcon} 
            tasks={tasks} 
            status="todo"
          />

          <TaskCol title="Doing" image={doingIcon} tasks={tasks} status="doing"/>
          <TaskCol title="Done" image={doneIcon} tasks={tasks} status="done"/>
        

        </main>
      </div>
  )
}

export default App
