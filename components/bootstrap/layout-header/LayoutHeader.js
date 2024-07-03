import React from 'react'
import { Col, Row, Container, Image ,Button} from "react-bootstrap";
import { useEffect, useState } from "react";

const LayoutHeader = ({header, buttonText,onClick }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('credentials');
    const userRole = JSON.parse(auth).role
    if (userRole ==='admin') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Container fluid className="px-6 py-4">
    <div className="d-flex justify-content-between align-items-center">
 <div className="mb-2 mb-lg-0">
   <h3 className="mb-0  black">{header}</h3>
 </div>
 <div>
  { isAuthenticated && 
   <div className="d-grid">
   <Button 
   onClick={onClick}
   variant="primary" type="submit">
     Add {buttonText}
   </Button>
</div>

  }

 </div>
</div>
</Container>
  )
}

export default LayoutHeader
