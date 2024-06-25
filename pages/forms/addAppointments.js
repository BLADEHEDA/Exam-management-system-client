import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import AuthLayout from "layouts/AuthLayout";
import Toaster from "components/bootstrap/toast/Toaster";
import { toggleToast } from "util/util";

const AddEnrollments = () => {
    const [showToast, setShowToast] = useState(false);
    const [success, setSuccess] = useState(false);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [errorMessage,setErrorMessage] = useState('')
    const router = useRouter();

    // get the courses
    const handleFetchCourses = () => {
        axios
            .get("http://localhost:5000/courses")
            .then((response) => {
                setCourses(response.data);
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
    };

    //get all the lecturers 
    const handleFetchLecturers = () => {
        axios
            .get("http://localhost:5000/users")
            .then((response) => {
                setStudents(response.data);
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
    };

    useEffect(() => {
        handleFetchCourses();
        handleFetchLecturers();
    }, []);

    const formik = useFormik({
        initialValues: {
            lecturer: '',
            course: '',
            academicYearStart: '',
            academicYearEnd: ''
        },
        validationSchema: Yup.object({
            lecturer: Yup.string().required('Lecturer is required'),
            course: Yup.string().required('Course is required'),
            academicYearStart: Yup.number().required('Start year is required').min(2021, 'Invalid year').max(2099, 'Invalid year'),
            academicYearEnd: Yup.number().required('End year is required').min(2021, 'Invalid year').max(2099, 'Invalid year')
        }),
        onSubmit: async (values) => {
            toggleToast(setShowToast);
            const academicYear = `${values.academicYearStart}-${values.academicYearEnd}`;
            const enrollmentData = {
                lecturerId: values.lecturer,
                courseId: values.course,
                academicYear: academicYear
            };
            try {
                const response = await axios.post('http://localhost:5000/lecturercourse', enrollmentData);
                router.push('/layouts/courses');
                setSuccess(true);
            } catch (error) {
                setSuccess(false);
                if (error.response && error.response.status === 400) {
                    setErrorMessage('Appointment already exists')
                } else {
                    setErrorMessage('Failed to add enrollment, please try again')  
                }   
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
                                <p className="mb-6">Please enter the Enrollment information</p>
                            </div>
                            <Form onSubmit={formik.handleSubmit}>
                                {/* select lecturer */}
                                <Form.Group className="mb-3" controlId="lecturer">
                                    <Form.Label>Lecturers</Form.Label>
                                    <Form.Select
                                        name="lecturer"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.lecturer}
                                        isInvalid={formik.touched.lecturer && formik.errors.lecturer}
                                    >
                                        <option value="">Select Lecturer</option>
                                        {students && (
                                            students.map((student, id) => (
                                                student.role === 'lecturer' &&
                                                <option key={id} value={student._id}>
                                                    {student.firstName} {student.lastName}
                                                </option>
                                            ))
                                        )}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.lecturer}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* select course */}
                                <Form.Group className="mb-3" controlId="course">
                                    <Form.Label>Courses</Form.Label>
                                    <Form.Select
                                        name="course"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.course}
                                        isInvalid={formik.touched.course && formik.errors.course}
                                    >
                                        <option value="">Select Course</option>
                                        {courses && (
                                            courses.map((course, id) => (
                                                <option key={id} value={course._id}>
                                                    {course.courseName}
                                                </option>
                                            ))
                                        )}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.course}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Academic year */}
                                <Form.Group className="mb-3" controlId="academicYear">
                                    <Form.Label>Academic Year</Form.Label>
                                    <div>
                                        <Form.Control
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
                                        Add Appointment
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="position-absolute bottom-0 start-0 ms-0 mb-3">
                <Toaster
                    message={`${success ? 'Appointment successfully added' : errorMessage}`}
                    showToast={showToast}
                    toggleToast={toggleToast}
                />
            </div>
        </div>
    );
};

AddEnrollments.Layout = AuthLayout;

export default AddEnrollments;
