import React, { useContext } from 'react'
import { useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SERVER_BASE_URL from '../services/serverUrl';
import { editBlogContext } from '../contexts/ContextShare';
import { updateBlogAPI } from '../services/allAPI';

const Edit = ({blog}) => {
  const {editBlogResponse,setEditBlogResponse} = useContext(editBlogContext)
 const [preview,setPreview] = useState("")
  const [uploadFileStatus,setUploadFileStatus] = useState(false)
  const [blogDetails,setBlogDetails] = useState({
   id:blog?._id,title:blog?.title,discription:blog?.discription,blogImage:""
  })
  console.log(blogDetails);

  const [show, setShow] = useState(false);

  useEffect(()=>{
      if(blogDetails.blogImage.type=="image/png"||blogDetails.blogImage.type=="image/jpg"||blogDetails.blogImage.type=="image/jpeg"){
        setUploadFileStatus(true)
        setPreview(URL.createObjectURL(blogDetails.blogImage))
      }else{
        setUploadFileStatus(false)
        setBlogDetails({...blogDetails,blogImage:""})
      }
     },[blogDetails.blogImage])
    
      const handleClose = () =>{
         setShow(false);
         setBlogDetails({
          id:blog?._id,title:blog?.title,discription:blog?.discription,blogImage:""

         })
        }
      const handleShow = () =>{
         setShow(true);
         setBlogDetails({
          id:blog?._id,title:blog?.title,discription:blog?.discription,blogImage:""

         })
        }

        const handleUpdateProject = async ()=>{
          const {id,title,discription,blogImage} = blogDetails
          if(title&&discription){
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("discription",discription)
             preview?reqBody.append("blogImage",blogImage):reqBody.append("blogImage",blog?.blogImage)
             const token = sessionStorage.getItem("token")
             if(token){
               const reqHeader = {
                 "Content-Type":"multipart/form-data",
                 "Authorization":`Bearer ${token}`
               }
               // make api call
               try{
                const result = await updateBlogAPI(id,reqBody,reqHeader)
                if(result.status==200){
                  alert("Blog updated successfully!!!")
                  handleClose()
                  setEditBlogResponse(result)
                }
               }catch(err){
                console.log(err);
                
               }
              }
          }else{
            alert("Please fill the form completely!!!")
          }
        }
  return (
    <>
      <button onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Body>
          <label className='text-center mb-2' >
            <input onChange={e=>setBlogDetails({...blogDetails,blogImage:e.target.files[0]})} style={{display:'none'}} type="file" />
            <img className='img-fluid' height={'100px'}src={preview?preview:`${SERVER_BASE_URL}/uploads/${blog?.blogImage}`}alt="" />
            {
              !uploadFileStatus &&
              <div className="text-danger fw-blod">Upload only jpeg, jpg, png file!!</div>
            }
          </label>
          <div className="mb-2">
                <input value={blogDetails.title} onChange={e=>setBlogDetails({...blogDetails,title:e.target.value})} type="text" className='form-control' placeholder='Title' />
              </div>
              <div className="mb-2">
              <textarea
                value={blogDetails.discription}
                onChange={(e) => setBlogDetails({ ...blogDetails, discription: e.target.value })}
                className="form-control modal-input"
                style={{
                  textAlign: 'justify', 
                  height: '150px',
                  padding: '10px',
                }}
                placeholder="Write your legacy"
              />
              </div>
        </Modal.Body>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateProject}>
           Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit