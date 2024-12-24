import React from 'react'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center flex-column py-5'>
      <h1 style={{fontSize:'80px'}} className='mt-5 text-primary'>404!</h1>
      <img style={{width:'300px'}} className='img-fluid' src="https://i.pinimg.com/originals/db/b8/f9/dbb8f986409cbba56912fa3fc54ee41d.gif" alt="" />
      <h1 className='text-primary fw-bold'>Look Like You're Lost</h1>
      <p>The Page your looking for is not available!</p>
      <Link to={'/'} className='btn btn-primary'>Go To Home</Link>
    </div>
  )
}

export default Pnf