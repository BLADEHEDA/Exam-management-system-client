import React from 'react';
import Modal from 'react-bootstrap/Modal';

function AppointmentModel({ show, onHide, data }) {
    const {course, lecturer ,academicYear} = data || {};
    const { courseName, courseCode, creditValue, department, has_prerequisite } = course || {};
    const { firstName, lastName, email} = lecturer || {};
    const prerequisites = has_prerequisite ? 'True' : 'False';

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Appointment Detailed Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data ? (
                    <div>

                        <div className='my-5'>
                        <h4 className=''>Course Information</h4>
                        <p>Academic Year: {academicYear} </p>
                            <p>Course Name: {courseName} </p>
                            <p>Course Code: {courseCode}</p>
                            <p>Credit Value: {creditValue}</p>
                            <p>Department: {department}</p>
                            <p>Has Prerequisite: {prerequisites}</p>
                        </div>
                        <div className='mt-2'>
                            <h4 className=''>Lecturer Information</h4>
                            <p>Lecturer Name: {`${firstName} ${lastName}`}</p>
                            <p>Lecturer Email: {email}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default AppointmentModel;

