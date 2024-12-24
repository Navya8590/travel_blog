
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import SERVER_BASE_URL from '../services/serverUrl';

const BlogCard = ({ displayData }) => {
  const [isExpanded, setIsExpanded] = useState(false); 
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const maxLength = 100;  
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img height={"200px"}variant="top"src={`${SERVER_BASE_URL}/uploads/${displayData?.blogImage}`}alt="Blog Image"
        />
        <Card.Body>
          <Card.Title className='text-primary fw-bold'>{displayData?.title}</Card.Title>
          <Card.Text style={{ textAlign: 'justify' }}>
            {isExpanded ? displayData?.discription : displayData?.discription?.substring(0, maxLength) + '...'}
          </Card.Text>
          <Button variant="link" onClick={toggleExpand} style={{ padding: 0 }}>
            {isExpanded ? "Read Less" : "Read More"}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default BlogCard;
