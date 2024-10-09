import React from 'react'
import "./TaskCol.css"
import Taskcard from './Taskcard'

const TaskCol = ({title,image , tasks , status , handleDelete}) => {
  return (
    
      <section className='task_col'> 
        <h2 className='task_col_heading'>
            <img className='task_col_icon' src={image} alt="img" /> 
            {title}
        </h2>
 
        {
            tasks.map(
                (task ,index) => 
                    task.status === status && (
                    <Taskcard 
                        key={index}     
                        title={task.task}
                        tags={task.tags}
                        handleDelete={handleDelete}
                        index={index}
                    />)
       )}
      </section>
    
  )
}

export default TaskCol
