import React from 'react'
import './TodoList.css'
import TodoItem from '../TodoItem/TodoItem'

function TodoList({todos, editOpen}) {

  return (
    <div className='task'>
      <div className='task-container'>
        <div className='task-inner-container'>
         {todos && todos.length > 0 ? (
            todos.map(item=>(
            <TodoItem  name={item.item} done={item.done} id={item.id} editOpen={editOpen} /> 
          ))
          ): (
            <div className='container-text'>
            <p> Add Your Tasks</p>
            </div>
          )}
      </div>
    </div>
    </div>
  )
}

export default TodoList