import React, { useState } from 'react'
import "./TaskForm.css"
import Tag from "./Tag";

const TaskForm = () => {
    const [taskData,setTaskData]=useState({
        task:"",
        status:"Todo",
        tags:[]
    });

    function handleChange(e){
        const{name,value}= e.target; 
        setTaskData(prev=>{
            return {...prev, [name]:value }
            
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(taskData)
    }

    const checkTag=(tag)=>{
        return taskData.tags.some(item => item === tag);
    }

    function selectTag(tag){
        if(taskData.tags.some(item=> item === tag)){
            const filterTag=taskData.tags.filter(item=> item !==tag);
            setTaskData(prev => {
                return  {...prev, tags: filterTag}
            })
        }
        else {
            setTaskData(prev => {
                return  {...prev, tags: [tag]}
            })
        }

    };

    console.log(taskData.tags)


    // const [task,setTask] = useState("");
    // const [status,setStatus] = useState("Todo");
    
    // function handleTaskChange(e){
    //     setTask(e.target.value)
    // }
    // function handleStatusChange(e){
    //     setStatus(e.target.value)
    // } 
  return (
    <div>
      <header className='app_header'>
        <form onSubmit={handleSubmit}>
            <input type="text" className='task_input' placeholder='Enter Task' onChange={handleChange} name='task'/>
            <div className='task_form_bottom_line'>
                <div>
                    <Tag tagName='HTML'selectTag={selectTag} selected={checkTag("HTML")}/>
                    <Tag tagName="CSS" selectTag={selectTag} selected={checkTag("CSS")}/>
                    <Tag tagName="JS" selectTag={selectTag} selected={checkTag("JS")}/>
                    <Tag tagName="REACT" selectTag={selectTag} selected={checkTag("REACT")}/>
                     </div>
                
                <div>
                    <select className="task_status" onChange={handleChange} name='status'>
                        <option value="todo">Todo</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                        <button type='submit' className='task_submit'>+ Add Task </button>
                </div>
            </div> 
        </form>

     </header> 
    </div>
  )
}

export default TaskForm
