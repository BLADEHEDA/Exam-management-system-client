import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import AuthLayout from "layouts/AuthLayout";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import Toaster from "components/bootstrap/toast/Toaster";
import { toggleToast } from "util/util";
import { useSearchParams } from 'next/navigation'

const EditStudents = () => {
    const [showToast, setShowToast] = useState(false);
    const [suceess, setSucess] = useState(false)
    const [student, setStudent] = useState(null);
    const router = useRouter();

    const searchParams = useSearchParams()
    const userId = searchParams.get('id')

    //get all the students 
    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:5000/students/${userId}`)
                .then((response) => {
                    setStudent(response.data);
                    formik.setValues({
                        firstname: response.data.firstName || '',
                        lastname: response.data.lastName || '',
                        email: response.data.email || '',
                        matricule: response.data.matricule || '',
                        phoneNumber: response.data.phone_number || '',
                        image: response.data.image || null,
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
    }, [userId]);

    const formik = useFormik({
        initialValues: {
            firstname: student ? student.firstName : '',
            lastname: student ? student.lastName : '',
            email: student ? student.email : '',
            matricule: student ? student.matricule : '',
            phoneNumber: student ? student.phone_number : '',
            image: student ? student.image : null,
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('First Name is required'),
            lastname: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            matricule: Yup.string().required('Matricule is required'),
            phoneNumber: Yup.string().required('Phone Number is required'),
            image: Yup.string().required('An image is required').required('Image is required')
        }),
        onSubmit: async (values) => {
            toggleToast(setShowToast);
            const studentData = {
                firstName: values.firstname,
                lastName: values.lastname,
                email: values.email,
                matricule: values.matricule,
                phone_number: values.phoneNumber,
                image: values.image,
            };
            try {
                const response = await axios.put(`http://localhost:5000/students/${userId}`, studentData);
                router.push('/layouts/students');
                setSucess(true)
            }
            catch (error) {
                console.error(error)
                setSucess(false)
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue('image', URL.createObjectURL(file));
        }
    };

    return (
        <div className="position-relative me-0 ">
            <Row className="align-items-center justify-content-center g-0 min-vh-100 my-5">
                <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                    {/* Card */}
                    <Card className="smooth-shadow-md">
                        {/* Card body */}
                        <Card.Body className="p-6">
                            <div className="mb-4">
                                <p className="mb-6">Please enter the Student&apos;s information.</p>
                            </div>
                            {/* Form */}
                            <Form onSubmit={formik.handleSubmit}>
                                {/* firstname */}
                                <Form.Group className="mb-3" controlId="firstname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstname"
                                        placeholder="First Name"
                                        required=""
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstname}
                                        isInvalid={formik.touched.firstname && formik.errors.firstname}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.firstname}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* lastname */}
                                <Form.Group className="mb-3" controlId="lastname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastname"
                                        placeholder="Last Name"
                                        required=""
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.lastname}
                                        isInvalid={formik.touched.lastname && formik.errors.lastname}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.lastname}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Email */}
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter address here"
                                        required=""
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        isInvalid={formik.touched.email && formik.errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* matricule */}
                                <Form.Group className="mb-3" controlId="matricule">
                                    <Form.Label>Matricule</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="matricule"
                                        placeholder="Matricule"
                                        required=""
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.matricule}
                                        isInvalid={formik.touched.matricule && formik.errors.matricule}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.matricule}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* phone number */}
                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone number"
                                        required=""
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phoneNumber}
                                        isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.phoneNumber}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* image */}
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        placeholder="Choose an image file"
                                        required
                                        onChange={handleFileChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.image && formik.errors.image}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.image}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        Accepted formats: JPG, PNG, GIF, etc.
                                    </Form.Text>
                                </Form.Group>
                                {/* preview image */}
                                {formik.values.image && (
                                    <div className="mb-3">
                                        <Image src={formik.values.image} alt="Preview" fluid />
                                    </div>
                                )}

                                <div>
                                    {/* Button */}
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit">
                                            Edit Student
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div class="position-absolute bottom-0 start-0 ms-0 mb-3">
                <Toaster
                    message={suceess ? 'Studdent successfully added' : ' Failed to Add student,Check again'}
                    showToast={showToast}
                    toggleToast={toggleToast}
                />
            </div>
        </div>
    );
};

EditStudents.Layout = AuthLayout;

export default EditStudents;
