
import { useEffect, useState } from 'react'
import './App.css'
import { Todoprovider } from './contexts'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'


function App() {
  const [todos,setTodos]=useState([])

  //add todo functionality
  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }
//updateTodo functionality
  const updatedTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?
      todo :prevTodo)))
}
//delete Functionality
const deleteTodo=(id)=>{
  setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
}
//togglecomplete
const toggleComplete=(id)=>{
setTodos((prev)=>prev.map((prevTodo)=>prevTodo===
id?{...prevTodo,completed:!prevTodo.completed}:prevTodo))
}


//now local storage part starts from here


//when application is loading for the first time
useEffect(()=>{
  const todos=JSON.parse(localStorage.getItem("todos"))

  if(todos && todos.length>0){
    setTodos(todos)
  }
},[])

//Adding the values in th elocal system
useEffect(()=>{
  localStorage.setItem('todos',JSON.stringify(todos))
},[todos])
   

  return (
    <Todoprovider value={{todos,addTodo,updatedTodo,deleteTodo,toggleComplete}}>
     <div className='bg-[#172842] min-h-screen8
      py-8'>
      <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg
      px-4 py-3 text-white'>
        <h1 className='text-2xl font -bold text-center mb-8
        mt-2'>Manage Your Todos</h1>
        <div className='mb-4'>
          {/*todo form goes here*/}
          <TodoForm/>
        </div>
        <div className='flex flex-wrap gap-y-3'>
          {/* Loops and Add TodoItem here */}
          {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
        </div>
      </div>
     </div>
    </Todoprovider>
  )
}

export default App
