import { useEffect, useState } from 'react'

import './HomePage.css'
import axios from 'axios'
import { UserItem } from '../components/UserItem'
import { ResetUsers } from '../components/ResetUsers'

function HomePage() {

  const [users, setUsers] = useState<{ name: string, id: string }[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    // TODO: validate data with zod
    axios.get('http://localhost:3000/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log("Error while fetching users", err)
      })
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log('A name was submitted: ' + input)

    axios.post('http://localhost:3000/users', {
      name: input
    })
      .then(res => {
        // TODO: validate data with zod
        setUsers([...users, { id: res.data.id, name: res.data.name }])
      })
    setInput("")
  }

  function handleDeleteUser(id: string) {
    // TODO: validate data with zod

    console.log('User with id ' + id + ' should be deleted')

    axios.delete('http://localhost:3000/users/' + id)
      .then(res => {
        setUsers(users => users.filter(user => user.id !== res.data))
      }).catch(err => {
        console.log("Error while deleting user", err)
      })
  }

  return (
    <div className="App">

      <h1>Vite + React</h1>
      <h2>Our cool demo project to add and remove user</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <input type="submit" value="Nutzer hinzufügen" />
      </form>

      <ResetUsers />

      {users.map((user, index) => {
        return (
          <UserItem key={index} user={user} handleDeleteUser={handleDeleteUser} />
        )
      })}

    </div>
  )
}

export default HomePage
