import React from 'react'
import Tag from './Tag'
import Delete from "../assets/delete.png"
import "./TaskCard.css"

const Taskcard = () => {
  return (
    <article className='task_card'>
        <p className='task_text'>
            Simple Text
        </p>

         <div className="task_card_bottom_line">
            <div className="task_card_tags">
                <Tag tagName="Html" />
                <Tag tagName="CSS" />
                <Tag tagName="JS" />
            </div>

            <div className="task_delete">
                <img src={Delete} className='delete_icon'/>

            </div>
         </div>
    </article>
  )
}

export default Taskcard
