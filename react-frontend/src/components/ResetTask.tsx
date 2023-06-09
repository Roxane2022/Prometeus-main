import axios from 'axios'

export const ResetTasks = () => {
  function handleResettask() {
    console.log('Resetting database')
    axios.get('http://localhost:3000/resettasks')
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
      value="Reload Tasks"
      onClick={() => handleResettask()}
      style={{
        marginTop: "2em", padding: "1em"
      }} />
  )
}