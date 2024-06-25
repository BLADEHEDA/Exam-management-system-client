import React from 'react'
import Link from 'next/link';
import { Col, Row, Image } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const AppointmentBody = ({ data, handleViewAppointment}) => {
  const {
    lecturer: { firstName, lastName ,email},
    course: { courseName },
    _id
  } = data;

  return (
    <div className='mx-4'>
      <div className="container">
        <div className="row">
          <div className="col-3 d-flex justify-content-center align-items-center">
            {firstName} {lastName}
          </div>
          <div className="col-3 d-flex justify-content-center  align-items-center">
            {email}
          </div>
          <div className="col-3 d-flex justify-content-center align-items-center">
            {courseName}
          </div>
          <div className="col-3 d-flex justify-content-center">
            <div className="align-middle text-dark">
              <button
                onClick={handleViewAppointment}
                type="button"
                className='border bg-primary rounded px-2'
              >
                <Icon.Eye className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentBody

