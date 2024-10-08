import { useState } from 'react'
import './App.css'
import TaskForm from '../components/TaskForm'
import TaskCol from '../components/TaskCol'
import todoIcon from '../assets/direct-hit.png'
import doingIcon from'../assets/glowing-star.png'
import doneIcon from'../assets/check-mark-button.png'


function App() {

  return (

      <div className='app'>
        <TaskForm />
        <main className='app_main'> 
          <TaskCol taskColName="To do" image={todoIcon}/>
          <TaskCol taskColName="Doing" image={doingIcon}/>
          <TaskCol taskColName="Done" image={doneIcon}/>
        

        </main>
      </div>
  )
}

export default App
