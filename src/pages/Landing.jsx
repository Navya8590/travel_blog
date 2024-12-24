import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingimg from '../assets/landingimg.jpg'


const Landing = () => {
  const navigate = useNavigate()
  const [isLogin,setIsLogin] = useState(false)
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[])

  const handleNavigateBlog = async()=>{
    if(sessionStorage.getItem("token")){
      navigate('./home')
    }else{
      alert("Please login to get full access to our blog collection!")
    }
  }
  return (
    <>
    <div style={{minHeight:'100vh'}} className="d-flex justify-content-center align-items-center rounded shadow w-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 style={{fontSize:'70px'}} className='text-primary fw-bold'><i class="fa-solid fa-earth-americas me-2"></i>Epic Footprints</h1>
            <p style={{textAlign:'justify'}}>Welcome to Epic Footprints, where every step you take becomes part of something greater. Just like trailblazers and visionaries who have left their legendary marks throughout history.
            </p>
          
           { isLogin ?
           <Link to={'/dashboard'} className='btn btn-primary'>MANAGE YOUR BLOGS</Link>
            :
            <Link to={'/login'} className='btn btn-primary'>STARTS TO EXPLORE</Link>
          }
          </div>
          <div className="col-lg-6">
           <img className='img-fluid' src='https://cdn.dribbble.com/users/449035/screenshots/5612222/mr_worldwide.gif' alt="" /> 
          </div>
        </div>
      </div>
      </div>

      <div className='my-5 text-center'> <button onClick={handleNavigateBlog} className='btn btn-primary'>View the latest legacy...</button></div>

      {/* about */}
      <div className="container d-flex justify-content-center align-items-center rounded shadow w-100">
      <div className="row align-items-center">
          <div className="col-lg-6">
          <img width={'300px'} className='img-fluid p-2' src={landingimg} alt="" /> 
          </div>
          <div className="col-lg-6">
          <h1 style={{fontSize:'50px'}} className='text-primary fw-bold'>About Us</h1>
            <p style={{textAlign:'justify'}}>Welcome to Epic Footprints, where adventure meets sustainability and every step leaves a lasting. <br />
            At Epic Footprints, we believe that the world is a canvas waiting to be explored. Whether it's trekking through the heart of untamed forests, climbing towering peaks, or discovering hidden gems, we are here to inspire the explorer in you. But we also believe in exploring with purpose. Our mission is to combine the thrill of adventure with a deep commitment to environmental stewardship, ensuring that every journey we embark on helps protect and preserve the natural world for generations to come.

            </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Landing