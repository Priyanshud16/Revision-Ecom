import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, ButtonGroup } from '@chakra-ui/react'

function Home() {
  const navigate=useNavigate()
  const [state,setState]=useState(false)

  const HandleClick=()=>{
  setState(true)
  }
  return (
    <div>
<Button
  size='md'
  height='48px'
  width='400px'
  border='2px'
  borderColor='green.500'
  onClick={()=>{navigate("/products")}}
>
Navigate to product using useNavigate
</Button>
<br />
<br />
      
<Button
  size='md'
  height='48px'
  width='400px'
  border='2px'
  borderColor='green.500'
  onClick={HandleClick}
>
Navigate to product using Navigate component
</Button>
<br />
<br />

      <Link to="/products">

<Button
  size='md'
  height='48px'
  width='200px'
  border='2px'
  borderColor='green.500'
>
Navigate using link
</Button></Link>
      {state && <Navigate to="/products"/>}
    </div>
  )
}

export default Home