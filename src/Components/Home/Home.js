import React from 'react'
import './Home.css';
import  { useState } from 'react'
import NavigationIcon from '@mui/icons-material/Navigation';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {Button, Input,  MenuItem, Select, FormControl, Box, Typography, Modal,} from '@mui/material';
import { saveTodo, saveTab, selectTab} from '../../Features/todoSlice';
import {  selectTodoList , selectTabList, selectedTabIndex } from '../../Features/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from '../TodoList/TodoList';
import TabList from '../TabList/TabList';

const style = { 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24, 
  p: 4,
};

function Home() {
  const[open,setOpen]=useState(false)  
  const[subOpen, setSubOpen]=useState(false)
  const[todo,setTodo]=useState()
  const[category, setCategory]=useState()

  const todoList = useSelector ( selectTodoList)
  const tabList = useSelector ( selectTabList)
  const selectedTab = useSelector (selectedTabIndex)
  const dispatch = useDispatch()

  const setActiveTab=(index)=>{
    dispatch(selectTab(index))
  };
  
  const addTab= ()=>{         
    const newTab={
      id: tabList.length + 1,
      category: category,
    };
    dispatch(saveTab(newTab))
    dispatch(selectTab(tabList.length))
    setCategory('')
    } 

    const addTodo = (event) => {
      event.preventDefault();
      const newTodos={
         id : Date.now(),
         item: todo, 
         done: false,
    };
       dispatch(saveTodo(newTodos))
       console.log(newTodos)
      setTodo('')
    }
   
    const handleModOpen =()=>{
      setOpen(true);         
    }
  
    const handleClose = () => setOpen(false);
  
    const handleSubModOpen = () => {
      setSubOpen(true);
    };

    const handleSubModClose = () => setSubOpen(false);
    
  return (
    <div className='home-container'>
      <div className='todo-app'>
        <header className='header'>
          <TabList data={tabList} activeIndex={selectedTab} handleTabChange={setActiveTab} />
        </header>
        <body className='body'>
          <TodoList todos={todoList} />
        </body>
        <div className='modal'>
          <div className='modal-content'>
            <Modal  open={open} onClose={handleClose}>
              <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">Add your Todo</Typography>
              <div className='input-box'>
                <Input value={todo} onChange={(e)=>setTodo(e.target.value)} placeholder='write something..' ></Input>
                <NavigationIcon sx={{ fontSize: 40 }} className="add-todo-icon"  onClick={addTodo}>Todo</NavigationIcon>
              </div>
              <div className='select-section'>
                <FormControl sx={{ m: 1, minWidth: 120 }} >
                  <Box >
                  <Select  className='selectItem' value={selectedTab} displayEmpty onChange={(e)=>setActiveTab(e.target.value)}>
                    {tabList.map ((tab, index)=>(
                    <MenuItem key={index} value={index} >
                      {tab.category}
                    </MenuItem>
                    ))}
                    <Button className='add-cat' onClick={handleSubModOpen}>Create New</Button>
                  </Select >
                  <Modal open={subOpen} onClose={handleSubModClose}>
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Add your Category</Typography>
                    <Input type="text"  value={category} onChange={(e) => setCategory(e.target.value)} placeholder="New Category" />
                    <Button  type=" submit " disabled={!category} onClick={addTab}>Add Category</Button>
                    </Box>
                  </Modal>
                  </Box>
                </FormControl>
              </div>
              </Box>
            </Modal >
          </div>
        </div>
        <AddOutlinedIcon className="add-icon" onClick={handleModOpen} fontSize='large'/>
      
      </div>
  
    </div>

  )
}

export default Home
