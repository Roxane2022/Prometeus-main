import { useEffect, useState } from 'react'
import './UserItem.css'
import axios from 'axios'

type TaskItemProps = {
  task: { id: string, name: string, time: Date},
  handleDeleteTask: (id: string) => void, handleAddDetailsTask:(id: string) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, handleDeleteTask, handleAddDetailsTask }) => {

  const [rgbColor, setRgbColor] = useState<string>('#00000000')

  useEffect(() => {
    // TODO: validate data with zod
    axios.get(`http://localhost:3000/colors/${task.name}`)
      .then(res => {
        console.log(res.data)
        setRgbColor(res.data.rgb)
      })
      .catch(err => {
        console.log("Error while fetching users", err)
      })
  }, [])

  return (
    <div className='align-text-and-button'>
      <div >
        <p>{task.name}</p><p>{task.time.toString()}</p>
      </div>
      <input type="button" value="Delete Task" onClick={() => handleDeleteTask(task.id)} />
      <div style={{ backgroundColor: rgbColor, width: 20, height: 20 }}></div>
    

</div>
  )

}