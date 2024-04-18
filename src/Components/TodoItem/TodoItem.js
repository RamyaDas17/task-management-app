import React from 'react'
import './TodoItem.css'
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { setCheck,deleteTodo } from '../../Features/todoSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import sound from '../../assets/task_completed_sound.mp3'

function TodoItem({name, done, id }) {

  const play =()=>{
   new Audio(sound).play()
  }
  const dispatch= useDispatch()
 
  const handleCheck = () => {
    dispatch(setCheck(id))
  }

  const handleDelete = ()=>{
    dispatch(deleteTodo(id))
  }

  return (
    <div className='todoItem'>
     
    <Checkbox  
     checked={done}
     onClick={play}
     color='primary'
     onChange={handleCheck} inputProps={{ 'aria-label': 'secondary checkbox' }}/>
     <p className={done && 'todoItem--done'} >{name}</p>
    
     <DeleteIcon  className='delete-btn' onClick={()=> handleDelete()}>DELETE</DeleteIcon>

    </div>
  )
}

export default TodoItem
 