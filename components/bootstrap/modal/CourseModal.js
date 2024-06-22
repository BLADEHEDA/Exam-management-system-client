import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Image } from 'react-bootstrap';

function CourseModal(props) {
    const { data } = props;
     const { studentData } = props;
    const { courseName, courseCode, creditValue,department,has_prerequisite } = data || {};
    const { firstName, lastName, email, phone_number, image, matricule } = studentData || {};
    const prerequisites =  has_prerequisite ?'True': 'False'
   
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Course Detailed Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data ? (
                    <div>
                        <div className='my-5' >
                            <p>Course Name: {courseName} </p>
                            <p>Course Code: {courseCode}</p>
                            <p>Credit Value: {creditValue}</p>
                            <p>Department: {department}</p>  
                            <p>Has Prerequisite: {prerequisites}</p>
                        </div>
                        {studentData && studentData.length > 0 ? (
                            <div className='mt-2' >
                                <h4 className=''>Students enrolled in this course</h4>
                                {studentData.map((student, index) => ( 
                                    <div className='py-3 borde' key={index}>
                                        <p>Student Name: {`${student.firstName} ${student.lastName}`}</p>
                                        <p>Student Email: {student.email}</p>
                                        <p>Student Phone Number: {student.phone_number}</p>
                                        <p>Student Matricule: {student.matricule}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No Student enrolled in this Course.</p>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default CourseModal;
