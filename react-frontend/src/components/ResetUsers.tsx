import axios from 'axios'

export const ResetUsers = () => {
  function handleReset() {
    console.log('Resetting database')
    axios.get('http://localhost:3000/reset')
      .then(res => {
        console.log(res.data)
        window.location.reload()
      })
      .catch(err => {
        console.log("Error while resetting database", err)
      })
  }

  return (
    <input
      type='button'
      value="Datenbank zurücksetzen und Seite neu laden"
      onClick={() => handleReset()}
      style={{
        marginTop: "2em", padding: "1em"
      }} />
  )
}