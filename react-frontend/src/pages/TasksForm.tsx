import { useEffect, useState } from 'react'
import React, { useRef } from 'react';

import './TasksForm.css'
import axios from 'axios'
import { TaskItem } from '../components/TaskItem'
import { ResetTasks } from '../components/ResetTask'
import { DateTimePicker } from 'react-datetime-picker'


function Dashboard() {

  const [tasks, setTasks] = useState<{ name: string, id: string, time: string }[]>([])
  const [input, setInput] = useState("")
  const [selectedDate, handleDateChange] = useState("")

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
      name: input
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

  /* function handleDateChange(value: string): void {
    throw new Error('Function not implemented.')
  } */

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

      {tasks.map((task, index) => {
        return (
          <TaskItem key={index} task={task} handleDeleteTask={handleDeleteTask} handleAddDetailsTask={function (id: string): void {
                throw new Error('Function not implemented.')
            } } />
        )
      })}

    </div>
  )
}


  

export default Dashboard
