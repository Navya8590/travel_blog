import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import { allBlogsAPI } from '../services/allAPI';
import { Col, Row } from 'react-bootstrap';

const Home = () => {
  const [allBlogs,setAllBlogs] = useState([])

  console.log(allBlogs);
  useEffect(()=>{
    getAllBlogs()
  },[])
  const getAllBlogs = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      try{
        const result = await allBlogsAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          sessionStorage.setItem("allBlogs",JSON.stringify(result.data.allBlogs))
          setAllBlogs(result.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }
  
  return (
    <div className='p-5'>
      <h1 className='py-5 fw-bold text-primary fs-2'>Explore Travel Insights</h1>
    <Row>
     {
      allBlogs.length>0?
      allBlogs?.map(blogs=>(
        <Col key={blogs?._id} className="mb-3" sm={12} md={6} lg={4}>
      <BlogCard displayData={blogs}/>
      </Col>
      ))
      :
      <div className='fw-bold text-danger'>Blog not found!!</div>
     }
      </Row>
    </div>
  )
}

export default Home