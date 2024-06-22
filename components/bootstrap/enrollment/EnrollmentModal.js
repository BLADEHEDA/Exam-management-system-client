import React from 'react';
import Modal from 'react-bootstrap/Modal';

function EnrollmentModal({ show, onHide, data }) {
    const { attendanceCount, academicYear, course, student } = data || {};
    const { courseName, courseCode, creditValue, department, has_prerequisite } = course || {};
    const { firstName, lastName, email, phone_number, matricule } = student || {};
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
                    Enrollment Detailed Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data ? (
                    <div>
                        <div className='my-5'>
                            <p>Academic Year: {academicYear} </p>
                            <p>Attendance Count: {attendanceCount}</p>
                            <p>Course Name: {courseName} </p>
                            <p>Course Code: {courseCode}</p>
                            <p>Credit Value: {creditValue}</p>
                            <p>Department: {department}</p>
                            <p>Has Prerequisite: {prerequisites}</p>
                        </div>
                        <div className='mt-2'>
                            <h4 className=''>Student Information</h4>
                            <p>Student Name: {`${firstName} ${lastName}`}</p>
                            <p>Student Email: {email}</p>
                            <p>Student Phone Number: {phone_number}</p>
                            <p>Student Matricule: {matricule}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default EnrollmentModal;
