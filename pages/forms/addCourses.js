import { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import AuthLayout from "layouts/AuthLayout";
import Toaster from "components/bootstrap/toast/Toaster";
import { toggleToast } from "util/util";

const AddCourses = () => {
    const [showToast, setShowToast] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            coursename: '',
            coursecode: '',
            creditvalue: '',
            department: '',
            hasprerequisites: '',
        },
        validationSchema: Yup.object({
            coursename: Yup.string().required('Course Name is required'),
            coursecode: Yup.string().required('Course Code is required'),
            creditvalue: Yup.number().required('Credit Value is required'),
            department: Yup.string().required('Department is required'),
            hasprerequisites: Yup.string().required('Select whether the course has prerequisites'),
        }),
        onSubmit: async (values) => {
            toggleToast(setShowToast); 
            const courseData = {
                courseName: values.coursename,
                courseCode: values.coursecode,
                creditValue: values.creditvalue,
                department: values.department,
                has_prerequisite: values.hasprerequisites,
            };
            try {
                const response = await axios.post('http://localhost:5000/courses', courseData);
                router.push('/layouts/courses');
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
                                <p className="mb-6">Please enter the Course&apos;s information.</p>
                            </div>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group className="mb-3" controlId="coursename">
                                    <Form.Label>Course Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="coursename"
                                        placeholder="Course Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.coursename}
                                        isInvalid={formik.touched.coursename && formik.errors.coursename}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.coursename}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="coursecode">
                                    <Form.Label>Course Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="coursecode"
                                        placeholder="Course Code"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.coursecode}
                                        isInvalid={formik.touched.coursecode && formik.errors.coursecode}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.coursecode}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="creditvalue">
                                    <Form.Label>Credit Value</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="creditvalue"
                                        placeholder="Enter Credit value"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.creditvalue}
                                        isInvalid={formik.touched.creditvalue && formik.errors.creditvalue}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.creditvalue}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* department */}
                                <Form.Group className="mb-3" controlId="department">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Select
                                        name="department"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.department}
                                        isInvalid={formik.touched.department && formik.errors.department}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Computer Engineering">Computer Engineering</option>
                                        {/* Add more department options as needed */}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.department}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="hasprerequisites">
                                    <Form.Label>Has prerequisites?</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            label="Yes"
                                            id="hasPrerequisitesYes"
                                            name="hasprerequisites"
                                            value="true"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            checked={formik.values.hasprerequisites === "true"}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            id="hasPrerequisitesNo"
                                            name="hasprerequisites"
                                            value="false"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            checked={formik.values.hasprerequisites === "false"}
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.hasprerequisites}
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

AddCourses.Layout = AuthLayout;

export default AddCourses;
