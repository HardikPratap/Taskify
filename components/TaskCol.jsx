import React from 'react'
import "./TaskCol.css"

const TaskCol = ({taskColName,image}) => {
  return (
    
      <section className='task_col'> 
        <h2 className='task_col_heading'>
            <img className='task_col_icon' src={image} alt="img" /> 
            { taskColName}
        </h2>
      </section>
    
  )
}

export default TaskCol
