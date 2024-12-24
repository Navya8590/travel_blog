import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import profilepic from '../assets/profile.webp'
import View from '../components/View';
import Header from '../components/Header';
import SERVER_BASE_URL from '../services/serverUrl';
import {updateUserAPI } from '../services/allAPI';

const Dashboard = () => {
  const [username,setUsername] = useState("")
  const [preview,setPreview] = useState("")
  const [existingProfilePic,setExistingProfilePic] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",profilePic:""
  })
  console.log(userDetails);
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,username:user.username,email:user.email,password:user.password,
      })
      setExistingProfilePic(user.profilePic)
    }
  },[])

  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic])

  const handleUserUpdate = async()=>{
    const {username,email,password,profilePic} = userDetails
    if(username&&email){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      preview ? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingProfilePic)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // make api call
        try{
          const result = await updateUserAPI(reqBody,reqHeader)
          if(result.status==200){
            alert("User profile updated successfully!!!")
            sessionStorage.setItem("user",JSON.stringify(result.data))
            handleClose()
          }
        }catch(err){
          console.log(err);
        }
      }
    }else{
      alert("Please fill the form completely!!!")
    }
  }
  

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      setUsername(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
    }
  },[])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Header insideDashboard={true}/>
    <div className="container-fluid py-5">
      <div className="row my-5">
        <div className="col-lg-8">
          <h1 className='text-primary fs-s fw-bold'>Welcome <span className='text-primary'>{username}</span>,</h1>
           <View/>
        </div>
        <div className="col-lg-4">
        <div className='d-flex justify-content-end'>
            <button onClick={handleShow} className='fs-2 me-4 rounded text-primary'><i class="fa-solid fa-user"></i></button>
          </div>
        </div>
      </div>
    </div>
        {/* profile modal */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Body>
          <label className='text-center' >
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} style={{display:'none'}} type="file" />
           {
            existingProfilePic=="" ?
            <img  width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:profilepic} alt="" />
            :
            <img  width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:`${SERVER_BASE_URL}/uploads/${existingProfilePic}`} alt="" />
           }
          </label>
        </Modal.Body>

        </Modal.Header>
        <Modal.Body> <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} placeholder='User name' type="text" className='form-control' /></Modal.Body>
        <Modal.Body> <input value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} placeholder='User email' type="text" className='form-control' /></Modal.Body>

        <Modal.Footer>
          <Button onClick={handleUserUpdate} variant="primary">
           Update
          </Button>
        </Modal.Footer>
      </Modal>
       
    </>
  )
}

export default Dashboard