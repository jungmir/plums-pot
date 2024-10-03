import React, { useState } from 'react'

function AddUser() {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(data => console.log('New user:', data))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit">Add User</button>
    </form>
  )
}

export default AddUser
