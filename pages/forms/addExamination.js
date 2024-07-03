import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import AuthLayout from "layouts/AuthLayout";
import Toaster from "components/bootstrap/toast/Toaster";
import { toggleToast } from "util/util";
import { useSearchParams } from 'next/navigation'

const AddExamination = () => {
    const [showToast, setShowToast] = useState(false);
    const [success, setSuccess] = useState(false);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [exams, setExams] = useState([]);
    const router = useRouter();

    const searchParams = useSearchParams()
    const userId = searchParams.get('id')
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

    // Get the exam sessions 
    const handleFetchExams = () => {
        axios
            .get("http://localhost:5000/exams")
            .then((response) => {
                setExams(response.data);
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
    //get all the students 
    const handleFetcRequest = () => {
        axios
            .get("http://localhost:5000/students")
            .then((response) => {
                setStudents(response.data)
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

    useEffect(() => {
        handleFetchCourses();
        handleFetcRequest()
        handleFetchExams()
    }, []);

    const formik = useFormik({
        initialValues: {
            student: '',
            course: '',
            exam: '',
            examMark: '',
            cAMark: ''
        },
        validationSchema: Yup.object({
            student: Yup.string().required('student is required'),
            course: Yup.string().required('course is required'),
            exam: Yup.string().required('exam is required'),
            examMark: Yup.string().required('Exam mark is required'),
            cAMark: Yup.string().required('Exam mark is required'),
        }),
        onSubmit: async (values) => {
            toggleToast(setShowToast);
            const enrollmentData = {
                matricule: values.student,
                courseCode: values.course,
                examId: values.exam,
                examMark: values.examMark,
                caMark: values.cAMark,
            };
            try {
                const response = await axios.post('http://localhost:5000/examinations', enrollmentData);
                router.push('/layouts/examinations');
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
                                    <Form.Select
                                        name="student"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.student}
                                        isInvalid={formik.touched.student && formik.errors.student}
                                    >
                                        <option value="">Select Student</option>
                                        {students && (
                                            students.map((student, id) => (
                                                <option key={id} value={student.matricule}>
                                                    {student.firstName} {student.lastName}
                                                </option>
                                            ))
                                        )}

                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.student}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* select course */}
                                <Form.Group className="mb-3" controlId="course">
                                    <Form.Label>Course</Form.Label>
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
                                                <option key={id} value={course.courseCode}>
                                                    {course.courseName}
                                                </option>
                                            ))
                                        )}
                                        {/* Add more department options as needed */}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.course}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Examination period*/}
                                <Form.Group className="mb-3" controlId="exam">
                                    <Form.Label>Exam Session</Form.Label>
                                    <Form.Select
                                        name="exam"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.exam}
                                        isInvalid={formik.touched.exam && formik.errors.exam}
                                    >
                                        <option value="">Select Exam session</option>
                                        {exams && (
                                            exams.map((exam, id) => (
                                                <option key={id} value={exam._id}>
                                                    {exam.semester}
                                                </option>
                                            ))
                                        )}
                                        {/* Add more department options as needed */}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.exam}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                {/* Ca */}
                                <Form.Group className="mb-3" controlId="cAMark">
                                    <Form.Label>Continous Assessment Marks</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cAMark"
                                        placeholder="Enter CA marks"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.cAMark}
                                        isInvalid={formik.touched.cAMark && formik.errors.cAMark}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.cAMark}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* exams */}
                                <Form.Group className="mb-3" controlId="examMark">
                                    <Form.Label>Exam Marks</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="examMark"
                                        placeholder="Enter Exams Marks"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.examMark}
                                        isInvalid={formik.touched.examMark && formik.errors.examMark}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.examMark}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit">
                                        Add Exams info
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

AddExamination.Layout = AuthLayout;

export default AddExamination;

