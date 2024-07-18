import React from 'react'
import Link from 'next/link';
import { Col, Row, Image } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useEffect, useState } from "react";

const EnrollmentBody = ({ data, handleViewEnrollment }) => {
  const {
    student: { firstName, lastName },
    course: { courseName },
    caMark,examMark,
    _id
  } = data;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('credentials');
    const userRole = JSON.parse(auth).role
    if (userRole === 'admin') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className='mx-4'>
      <div className="container">
        <div className="row mb-3">
          <div className="col-3 d-flex justify-content-center align-items-center">
            {firstName} {lastName}
          </div>
          <div className="col-3 d-flex justify-content-center align-items-center">
            {courseName}
          </div>
          <div className="col-4 d-flex justify-content-center align-items-center borde">
            <div className='col-2 ' >{caMark}</div>
            <div className='col-2 '>{examMark}</div>
          </div>
          <div className="col-2 d-flex justify-content-center border">
            <div className="align-middle text-dark">
              <button
                onClick={handleViewEnrollment}
                type="button"
                className='border bg-primary rounded px-2'
              >
                <Icon.Eye className="text-white" />
              </button>
              {isAuthenticated && (
                <>
                  <Link
                    href={{
                      pathname: '/forms/EditEnrollment',
                      query: {
                        id: _id
                      }
                    }}
                  >

                    <button
                      type="button"
                      className='border bg-primary rounded px-2'
                    >
                      <Icon.PencilFill className="text-white" />
                    </button>

                  </Link>
                </>
              )

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrollmentBody
