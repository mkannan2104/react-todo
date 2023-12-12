import React, { useState , useEffect } from 'react'
import './App.css'
import { FaTrash } from "react-icons/fa";

function App() {

  const [list,setList]= useState([])
  const [input,setInput] = useState('')

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todo_list'));
    setList(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todo_list', JSON.stringify(list));
  }, [list]);

  const handleAddTask=()=>{
    if(input.trim() !==''){
      setList([...list,{id: list.length+1,title : input,checked : false}])
      setInput('')
      localStorage.setItem("todo_list",JSON.stringify(setList))
    }
  }

  const handleChecked=(id)=>{
    const lists = list.map((item)=>
      item.id === id ? {...item,checked:!item.checked} : item
    )
    setList(lists)
    localStorage.setItem("todo_list",JSON.stringify(lists))
  }

  const handleDelete=(id)=>{
    const lists = list.filter((item)=>
      item.id !== id
    )
    setList(lists)
    localStorage.setItem("todo_list",JSON.stringify(lists))
  }

  return (

      <div className='app'>
        
        <h3>Todo List</h3>

        <div className="task-input">

          <input 
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)}  
          />

        </div>

        {(list.length)?
        (<ul className='task-list'>
        {list.map(item=>

          <li>

            <input 
              type='checkbox' 
              checked={item.checked} 
              onChange={()=>handleChecked(item.id)}
            />

            <label 
              className='title'
              style={(item.checked)?{color: '#34a853'}:null}
            >
              {item.title}
            </label>

            <FaTrash 
              key={item.id}
              tabIndex={0}
              onClick={()=>handleDelete(item.id)}
            />

          </li>
        )}
      </ul>):<p>No Task Found</p>}

        <div className="add-task">
          <button onClick={()=>handleAddTask()}>Add Task</button>
        </div>

      </div>

  )
}

export default App



