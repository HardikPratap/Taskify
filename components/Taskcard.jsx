import React, { useState } from 'react'
import Tag from './Tag'
import Delete from "../assets/delete.png"
import "./TaskCard.css"

const Taskcard = ({title,tags}) => { 

  return (
    <article className='task_card'>
        <p className='task_text'>
            {title}
        </p>

         <div className="task_card_bottom_line">
            <div className="task_card_tags">
                {tags.map((tag, index) => (
                    <Tag key={index} tagName={tag} selected/>
                    )) }
            </div>

            <div className="task_delete">
                <img src={Delete} className='delete_icon'/>

            </div>
         </div>
    </article>
  )
}

export default Taskcard
