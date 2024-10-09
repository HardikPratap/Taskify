import { useEffect, useState } from 'react'
import './App.css'
import TaskForm from '../components/TaskForm'
import TaskCol from '../components/TaskCol'
import todoIcon from '../assets/direct-hit.png'
import doingIcon from'../assets/glowing-star.png'
import doneIcon from'../assets/check-mark-button.png'

const oldTasks=localStorage.getItem("tasks");
console.log(oldTasks);


function App() {

  const [tasks, setTasks]= useState(JSON.parse(oldTasks));

  useEffect(() => {localStorage.setItem("tasks", JSON.stringify(tasks))
  },[tasks]);


  function handleDelete(taskIndex){
    const newTasks= tasks.filter((task,index )=>index !==taskIndex);
    setTasks(newTasks);
  }
  return (

      <div className='app'>
        <TaskForm setTasks={setTasks}/>
        <main className='app_main'> 
          <TaskCol 
            title="To Do" 
            image={todoIcon} 
            tasks={tasks} 
            status="todo"
             handleDelete={handleDelete}
          />

          <TaskCol title="Doing" image={doingIcon} tasks={tasks} status="doing" handleDelete={handleDelete} />
          <TaskCol title="Done" image={doneIcon} tasks={tasks} status="done" handleDelete={handleDelete} />
        

        </main>
      </div>
  )
}

export default App
