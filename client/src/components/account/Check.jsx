import React from 'react'
import axios from 'axios'
const Check = () => {
    const handleClick = async() => {
        try {
            const res = await axios.get('http://localhost:8000/')
            console.log(res)
            
        } catch (error) {
            console.log(error)
        }   
    }
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default Check
