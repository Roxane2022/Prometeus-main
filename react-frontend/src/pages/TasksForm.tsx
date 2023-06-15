import { useEffect, useState } from 'react'
import React, { useRef } from 'react'
import './TasksForm.css'
import axios from 'axios'
import { TaskItem } from '../components/TaskItem'
import { ResetTasks } from '../components/ResetTask'

import  SearchBox from '../components/SearchBox'
import Maps from '../components/Maps'
 


function Dashboard() {

  const [tasks, setTasks] = useState<{ name: string, id: string, time: Date }[]>([])
  const [input, setInput] = useState("")
  const [selectedDate, handleDateChange] = useState("")
  const [selectTask, loadtask] = useState([]);
  const [selectPosition, setSelectPosition] = useState(null)
  const divref=useRef<HTMLDivElement>(null)
  ;
  useEffect(() => {
    // TODO: validate data with zod
    axios.get('http://localhost:3000/tasks')
      .then(res => {
        setTasks(res.data)
      })
      .catch(err => {
        console.log("Error while fetching tasks", err)
      })
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log('A name was submitted: ' + input)

    axios.post('http://localhost:3000/tasks', {
      name: input,
      time: selectedDate
    })
      .then(res => {
        // TODO: validate data with zod
        setTasks([...tasks, { id: res.data.id, name: res.data.name, time: res.data.time }])
      })
    setInput("")
  }

  function handleDeleteTask(id: string) {
    // TODO: validate data with zod

    console.log('task with id ' + id + ' should be deleted')

    axios.delete('http://localhost:3000/tasks/' + id)
      .then(res => {
        setTasks(tasks => tasks.filter(task => task.id !== res.data))
      }).catch(err => {
        console.log("Error while deleting task", err)
      })
  }
// set the transition between the main Dashboard and the details vue
  async function handleAddDetailsTask() {
     const loadtask= await axios.get('http://localhost:3000/task/${id}' )
    .then(res=>{
   setTasks(res.data)})
   return(
  
       <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "50vw", height: "100%" }}>
        <Maps selectPosition={selectPosition} />
      </div>
      <div style={{ width: "50vw" }}>
        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
      </div>
      <div style={{ width: "50vw" }}>
        <SearchBox selectPosition={selectTask} setSelectPosition={loadtask}/>
      </div>
    </div>
  ) 

}


  return (
    <div className="App">

      <h1>Routine App-Dashboard</h1>
      <h2>Manage your Daily Tasks</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <input type='text' id ='textEingabe' value={input} onChange={(e) => setInput(e.target.value)} />
          
        </label>
        
         <label>
          <input type="datetime-local" id ='time' value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} />
 
        </label> 
        <input type="submit" value="Add A Task" />
      </form>

      <ResetTasks />


  
<div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "50vw", height: "100%" }}>
        <Maps selectPosition={selectPosition} />
      </div>
      <div style={{ width: "50vw" }}>
        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
      </div>
      <div style={{ width: "50vw" }}>
        <SearchBox selectPosition={selectTask} setSelectPosition={loadtask}/>
      </div>
    </div>
  

      {tasks.map((task, index) => {
        return (
          <TaskItem key={index} task={task}  handleDeleteTask={handleDeleteTask} handleAddDetailsTask={handleAddDetailsTask} />
        )
      })}

    </div>
  )
}


  

export default Dashboard
