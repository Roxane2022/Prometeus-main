import { useEffect, useState } from 'react'
import './UserItem.css'
import axios from 'axios'

type UserItemProps = {
  user: { id: string, name: string },
  handleDeleteUser: (id: string) => void
}

export const UserItem: React.FC<UserItemProps> = ({ user, handleDeleteUser }) => {

  const [rgbColor, setRgbColor] = useState<string>('#00000000')

  useEffect(() => {
    // TODO: validate data with zod
    axios.get(`http://localhost:3000/colors/${user.name}`)
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
        <p>{user.name}</p>
      </div>
      <input type="button" value="Delete User" onClick={() => handleDeleteUser(user.id)} />
      <div style={{ backgroundColor: rgbColor, width: 20, height: 20 }}></div>
    </div>
  )

}