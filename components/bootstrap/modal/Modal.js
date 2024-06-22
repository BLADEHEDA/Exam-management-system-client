import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Image } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
    const { data } = props;
    const { courseData } = props;
    const { firstName, lastName, email, phone_number, image, matricule } = data || {};
    const { courseName, courseCode, creditValue } = courseData || {};
    const defaultImage = '/images/avatar/avatar-1.jpg';

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Student Detailed Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data ? (
                    <div>
                        <Image
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                            }}
                            src={image || defaultImage} alt={`${firstName}`} />
                        <div className='my-5' >
                            <p><span className='font-italic' >Name: </span> {`${firstName} ${lastName}`}</p>
                            <p>Email: {email}</p>
                            <p>Phone Number: {phone_number}</p>
                            <p>Matricule: {matricule}</p>
                        </div>
                        {courseData && courseData.length > 0 ? (
                            <div>
                                <h4 className=''>Courses enrolled in</h4>
                                {courseData.map((course, index) => (
                                    <div className='py-3' key={index}>
                                        <p>Course Name: {course.courseName}</p>
                                        <p>Course Code: {course.courseCode}</p>
                                        <p>Credit Value: {course.creditValue}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No courses enrolled.</p>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;
