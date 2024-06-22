import React from 'react'
import { Toast } from 'react-bootstrap';

const Toaster = ({showToast,toggleToast,message}) => {
  return (
    <div>
              <Toast 
        show={showToast} onClose={toggleToast}
        >
          <Toast.Header>
            <strong className="me-auto"></strong>
            <small></small>
          </Toast.Header>
          <Toast.Body className='fw-bold'>
           {message}
          </Toast.Body>
        </Toast>
    </div>
  )
}

export default Toaster
