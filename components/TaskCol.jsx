import React from 'react'
import "./TaskCol.css"
import Taskcard from './Taskcard'

const TaskCol = ({taskColName,image}) => {
  return (
    
      <section className='task_col'> 
        <h2 className='task_col_heading'>
            <img className='task_col_icon' src={image} alt="img" /> 
            { taskColName}
        </h2>

        <Taskcard />
      </section>
    
  )
}

export default TaskCol
