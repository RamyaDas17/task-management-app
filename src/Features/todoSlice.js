import { createSlice } from '@reduxjs/toolkit'
import db from '../firebase/firebase'

const todoDB = db.collection("todo-app");

const initialState = { 
  tabList:[
  {
    id: 1, category: "All"
  },
  {
    id: 2, category: "work"
  },
  {
    id: 3, category: "personal" 
  },
  {
    id: 4, category: "Birthday" 
  }
],
  todoList:[],
  selectedTab :  0
}

 const todoSlice = createSlice({
  name: 'todos', 
  initialState,
  reducers: {

  saveTab: (state,action) => {
    state.tabList.push(action.payload)  
  },

  selectTab : (state,action) => {
    state.selectedTab = action.payload
  },
  
  saveTodo: (state,action) => {
    const selectedTabIndex = state.selectedTab;
    const selectedCategory = state.tabList[selectedTabIndex].category;
    const newTodo = {
      ...action.payload,
      category: selectedCategory
    };
      state.todoList.push(newTodo);
      todoDB.add(newTodo)
      .then((docRef)=>{
        console.log("Task added with ID:", docRef.id)
      })
  }, 
   
  deleteTodo: (state, action) => {
    state.todoList = state.todoList.filter(item=> item.id !== action.payload)
  },

  setCheck: (state,action) => {
    state.todoList.map((item)=>{
     if(action.payload === item.id) {
        if(item.done === true) {
         item.done = false 
       }else{
        item.done = true
         }
       } 
     })
   },
   
  }
})
   
export const { setCheck, saveTodo,removeTodo , saveTab, selectTab, deleteTodo, EditTodo} = todoSlice.actions
export const selectTodoList = state => {
  const selectedTabIndex = state.todos.selectedTab;
  const selectedCategory = state.todos.tabList[selectedTabIndex]?.category;
    let filteredTodos;
  
    if (selectedCategory === 'All') {
      filteredTodos = state.todos.todoList;
    } else {
      filteredTodos = state.todos.todoList.filter(task => task.category === selectedCategory);
    }

    filteredTodos = filteredTodos.filter(task => !task.done);
    return filteredTodos;
};

export const selectTabList = state =>state.todos.tabList
export const selectedTabIndex = state => state.todos. selectedTab
export default todoSlice.reducer
