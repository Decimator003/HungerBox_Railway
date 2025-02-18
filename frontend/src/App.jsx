import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const[jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
    .then(res => {
      setJokes(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  })

  return (
    <>
      <h1>Decimator</h1>
      <p>JOKES : {jokes.length}</p>

      {
        jokes.map((joke) => (
          <div key={joke.id}>
            <h2>{joke.title}</h2>
            <p>{joke.body}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
