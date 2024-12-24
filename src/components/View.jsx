import React, { useContext, useEffect, useState } from 'react'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { deleteBlogAPI, userBlogsAPI } from '../services/allAPI'
import { addBlogContext, editBlogContext } from '../contexts/ContextShare'

const View = () => {
  const {editBlogResponse,setEditBlogResponse} = useContext(editBlogContext)
  const {addBlogResponse,setAddBlogResponse} = useContext(addBlogContext)
  const [userBlogs,setUserBlogs] = useState([])
  console.log(userBlogs);
  useEffect(()=>{
    getUserBlog()
  },[addBlogResponse,editBlogResponse])
  const getUserBlog = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      try{
        const result = await userBlogsAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          setUserBlogs(result.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  const removeBlog = async (id)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await deleteBlogAPI(id,reqHeader)
        if(result.status==200){
          getUserBlog()
        }
      }catch(err){
        console.log(err);
        
      }
    }
  }
  
  return (
    <>
      <div className="d-flex justify-content-between mt-3">
      <h2 className='text-primary fw-bold'>All blogs</h2>
      <div> <Add/> </div>
    </div>
    <div className="mt-2">
        {
          userBlogs.length>0?
          userBlogs?.map(blogs=>(
            <div key={blogs?._id} className="border rounded p-2 d-flex justify-content-between mb-3">
            <h3>{blogs?.title}</h3>
            <div className="d-flex align-items-center">
              <div> <Edit blog={blogs}/> </div>
              <button onClick={()=>removeBlog(blogs?._id)} className='btn'> <i className='fa-solid fa-trash text-danger'></i></button>
            </div>
          </div>
          ))
          :
          <div className="fw-bold fs-3 text-danger">You haven't uploaded any blog yet.. add your blogs!!</div>
          }
    </div>
    </>
  )
}

export default View