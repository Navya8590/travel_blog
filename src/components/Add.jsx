
import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Uploadimg from '../assets/uploadimg.jpg';
import { addBlogAPI } from '../services/allAPI';
import { addBlogContext } from '../contexts/ContextShare';

const Add = () => {
  const { addBlogResponse, setAddBlogResponse } = useContext(addBlogContext);
  const [preview, setPreview] = useState('');
  const [uploadFileStatus, setUploadFileStatus] = useState(false);
  const [blogDetails, setBlogDetails] = useState({ title: '', discription: '', blogImage: '' });

  const [show, setShow] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB file size limit

  useEffect(() => {
    if (blogDetails.blogImage) {
      const file = blogDetails.blogImage;
      if (file.size > MAX_FILE_SIZE) {
        setUploadFileStatus(false);
        alert('File size exceeds the maximum limit of 5MB.');
      } else if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
        setUploadFileStatus(true);
        setPreview(URL.createObjectURL(file));
      } else {
        setUploadFileStatus(false);
        alert('Upload only jpeg, jpg, png file!');
      }
    }
  }, [blogDetails.blogImage]);

  const handleClose = () => {
    setShow(false);
    setPreview('');
    setUploadFileStatus(false);
    setBlogDetails({ title: '', discription: '', blogImage: '' });
  };

  const handleShow = () => setShow(true);

  const handleAddBlog = async () => {
    const { title, discription, blogImage } = blogDetails;
    if (title && discription && blogImage) {
      // api call
      const reqBody = new FormData();
      reqBody.append('title', title);
      reqBody.append('discription', discription);
      reqBody.append('blogImage', blogImage);

      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        };
        try {
          const result = await addBlogAPI(reqBody, reqHeader);
          if (result.status === 200) {
            alert(`${result.data.title} uploaded successfully!!`);
            handleClose();
            setAddBlogResponse(result);
          } else {
            if (result.response.status === 406) {
              alert(result.response.data);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert('Please fill the form completely!');
    }
  };

  return (
    <>
      <button style={{ marginLeft: '100px' }} onClick={handleShow} className="btn btn-primary">
        + Create your own legacy
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Body>
            <label className="text-center mb-2">
              <input
                onChange={(e) => setBlogDetails({ ...blogDetails, blogImage: e.target.files[0] })}
                style={{ display: 'none' }}
                type="file"
              />
              <img
                className="img-fluid"
                height={'100px'}
                src={preview ? preview : Uploadimg}
                alt="Preview"
              />
              {!uploadFileStatus && (
                <div className="text-danger fw-bold">Upload only jpeg, jpg, png file!</div>
              )}
            </label>
            <div className="mb-2">
              <input
                value={blogDetails.title}
                onChange={(e) => setBlogDetails({ ...blogDetails, title: e.target.value })}
                type="text"
                className="form-control"
                placeholder="Title"
              />
            </div>
            <div className="mb-2">
              <textarea
                value={blogDetails.discription}
                onChange={(e) => setBlogDetails({ ...blogDetails, discription: e.target.value })}
                className="form-control"
                style={{ textAlign: 'justify', height: '150px' }}
                placeholder="Write your legacy"
              />
            </div>
          </Modal.Body>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddBlog} variant="primary">
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Add;
