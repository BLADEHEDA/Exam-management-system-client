import React from 'react'
import Link from 'next/link';
import { Col, Row, Image } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const EnrollmentBody = ({ data, handleViewEnrollment}) => {
  const {
    student: { firstName, lastName },
    course: { courseName },
    attendanceCount,
    _id
  } = data;

  return (
    <div className='mx-4'>
      <div className="container">
        <div className="row">
          <div className="col-4 d-flex justify-content-start align-items-center">
            {firstName} {lastName}
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            {courseName}
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            {attendanceCount}
          </div>
          <div className="col-4 d-flex justify-content-end">
            <div className="align-middle text-dark">
              <button
                onClick={handleViewEnrollment}
                type="button"
                className='border bg-primary rounded px-2'
              >
                <Icon.Eye className="text-white" />
              </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrollmentBody
