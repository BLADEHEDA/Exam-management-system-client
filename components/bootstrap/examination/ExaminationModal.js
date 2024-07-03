import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ExaminationModal({ show, onHide, data }) {
    const { caMark, examMark, academicYear, course, student,semester } = data || {};
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
                            <h4 className=''>Course Information</h4>
                            <p>Semester: {semester === 'resit_semester' ?'Resit semester'
                            :semester==='first_semester' ? 'First semester':
                             'Second semester' }</p>
                            <p>Academic Year: {academicYear}</p>
                            <p>CA Mark: {caMark} </p>
                            <p>Exam Mark: {examMark}</p>
                        </div>
                        <div className='my-5'>
                            <h4 className=''>Course Information</h4>
                            <p>Course Name: {courseName} </p>
                            <p>Course Code: {courseCode}</p>
                            <p>Credit Value: {creditValue}</p>
                        </div>
                        <div className='mt-2'>
                            <h4 className=''>Student Information</h4>
                            <p>Student Name: {`${firstName} ${lastName}`}</p>
                            <p>Student Email: {email}</p>
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

export default ExaminationModal;

