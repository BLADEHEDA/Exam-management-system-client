import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import AuthLayout from "layouts/AuthLayout";
import Toaster from "components/bootstrap/toast/Toaster";
import { toggleToast } from "util/util";
import { useSearchParams } from 'next/navigation';

const AddEnrollments = () => {
    const [showToast, setShowToast] = useState(false);
    const [success, setSuccess] = useState(false);
    const [enrollments, setEnrollments] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const enrolllmentId = searchParams.get('id');

    //get all the enrollments
    useEffect(() => {
        if (enrolllmentId) {
            axios
                .get(`http://localhost:5000/enrollments/${enrolllmentId}`)
                .then((response) => {
                    setEnrollments(response.data);
                    const { attendanceCount, academicYear, course, student, _id: enrollmentId } = response.data || {};
                    const { courseName, courseCode, creditValue, department, has_prerequisite, _id: courseId } = course || {};
                    const { firstName, lastName, email, phone_number, matricule, _id: studentId } = student || {};

                    formik.setValues({
                        student: `${firstName} ${lastName}` || '',
                        course: courseName || '',
                        attendanceCount: attendanceCount || '',
                        academicYearStart: academicYear?.split('-')[0] || '',
                        academicYearEnd: academicYear?.split('-')[1] || ''
                    });
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(`HTTP error: ${error.response.status}`);
                    } else if (error.request) {
                        console.error("Request error: No response received");
                    } else {
                        console.error("Error:", error.message);
                    }
                });
        }
    }, [enrolllmentId]);

    const formik = useFormik({
        initialValues: {
            student: '',
            course: '',
            attendanceCount: '',
            academicYearStart: '',
            academicYearEnd: ''
        },
        validationSchema: Yup.object({
            student: Yup.string().required('student is required'),
            course: Yup.string().required('course is required'),
            attendanceCount: Yup.string().required('attendance count is required'),
            academicYearStart: Yup.number().required('Start year is required').min(2021, 'Invalid year').max(2099, 'Invalid year'),
            academicYearEnd: Yup.number().required('End year is required').min(2021, 'Invalid year').max(2099, 'Invalid year')
        }),
        onSubmit: async (values) => {
            toggleToast(setShowToast);
            const academicYear = `${values.academicYearStart}-${values.academicYearEnd}`;
            const enrollmentData = {
                matricule: values.student,
                courseCode: values.course,
                attendanceCount: values.attendanceCount,
                academicYear: academicYear
            };
            try {
                const response = await axios.put(`http://localhost:5000/enrollments/${enrolllmentId}`, enrollmentData);
                router.push('/layouts/enrollments');
                setSuccess(true);
            } catch (error) {
                console.error(error);
                setSuccess(false);
            }
        },
    });

    return (
        <div className="position-relative">
            <Row className="align-items-center justify-content-center g-0 min-vh-100 my-5">
                <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                    <Card className="smooth-shadow-md">
                        <Card.Body className="p-6">
                            <div className="mb-4">
                                <p className="mb-6">Please enter the Enrollment informations</p>
                            </div>
                            <Form onSubmit={formik.handleSubmit}>
                                {/* selct student */}
                                <Form.Group className="mb-3" controlId="student">
                                    <Form.Label>Student</Form.Label>
                                    <Form.Control
                                        disabled
                                        type="text"
                                        name="student"
                                        placeholder="Enter Student"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.student}
                                        isInvalid={formik.touched.student && formik.errors.student}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.student}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* select student */}
                                <Form.Group className="mb-3" controlId="course">
                                    <Form.Label>Course</Form.Label>
                                    <Form.Control
                                        disabled
                                        type="text"
                                        name="course"
                                        placeholder="Enter Course"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.course}
                                        isInvalid={formik.touched.course && formik.errors.course}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.course}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Attendance count */}
                                <Form.Group className="mb-3" controlId="attendanceCount">
                                    <Form.Label>Attendance</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="attendanceCount"
                                        placeholder="Enter Attendance Count"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.attendanceCount}
                                        isInvalid={formik.touched.attendanceCount && formik.errors.attendanceCount}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.attendanceCount}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Academic year */}
                                <Form.Group className="mb-3" controlId="academicYear">
                                    <Form.Label>Academic Year</Form.Label>
                                    <div>
                                        <Form.Control
                                            disabled
                                            type="number"
                                            placeholder="Enter start year"
                                            name="academicYearStart"
                                            min="2021"
                                            max="2099"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.academicYearStart}
                                            isInvalid={!!formik.errors.academicYearStart}
                                        />
                                        <Form.Control
                                            disabled
                                            type="number"
                                            placeholder="Enter end year"
                                            name="academicYearEnd"
                                            min="2021"
                                            max="2099"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.academicYearEnd}
                                            isInvalid={!!formik.errors.academicYearEnd}
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.academicYearStart || formik.errors.academicYearEnd}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit">
                                        Add Course
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="position-absolute bottom-0 start-0 ms-0 mb-3">
                <Toaster
                    message={success ? 'Course successfully added' : 'Failed to add course, please check again'}
                    showToast={showToast}
                    toggleToast={toggleToast}
                />
            </div>
        </div>
    );
};

AddEnrollments.Layout = AuthLayout;

export default AddEnrollments;
