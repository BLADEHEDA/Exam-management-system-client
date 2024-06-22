import { useState } from "react";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import * as Icon from 'react-bootstrap-icons';
import AuthLayout from "layouts/AuthLayout";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import Toaster from "components/bootstrap/toast/Toaster";
import { toggleToast } from "util/util";

const AddLecturers = () => {
    const [showToast, setShowToast] = useState(false);
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => { 
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => { 
        setShowConfirmPassword(!showConfirmPassword);
    };

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('First Name is required'),
            lastname: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
            role: Yup.string().required('Department is required'),
        }),
        onSubmit: async (values) => {
            toggleToast(setShowToast);
            const userData = {
                firstName: values.firstname,
                lastName: values.lastname,
                email: values.email,
                password: values.password,
                role: values.role,
            };

            try {
                const response = await axios.post('http://localhost:5000/users', userData);
                router.push('/layouts/lecturers');
                setSuccess(true);
            } catch (error) {
                console.error(error);
                setSuccess(false);
            }
        },
    });
 
    return (
        <div className="position-relative">
            <Row className="align-items-center justify-content-center g-0 min-vh-100 my-10">
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

                                {/* Password */}
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="**************"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            isInvalid={formik.touched.password && formik.errors.password}
                                        />
                                        <button
                                            type="button"
                                            variant="outline-primary"
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                borderColor: '#C4CDD5',
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                background: 'transparent'
                                            }}
                                        >
                                            {showPassword ? (
                                                <Icon.EyeSlash />
                                            ) : (
                                                <Icon.Eye />
                                            )}
                                        </button>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.password}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                    {/*Confirm Password */}
                                    <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="**************"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirmPassword}
                                            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        />
                                        <button
                                            type="button"
                                            variant="outline-primary"
                                            onClick={toggleConfirmPasswordVisibility}
                                            style={{
                                                borderColor: '#C4CDD5',
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                background: 'transparent'
                                            }}
                                        >
                                            {showConfirmPassword ? (
                                                <Icon.EyeSlash />
                                            ) : (
                                                <Icon.Eye />
                                            )}
                                        </button>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                    
                                <Form.Group className="mb-3" controlId="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        name="role"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.role}
                                        isInvalid={formik.touched.role && formik.errors.role}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="admin">Admin</option>
                                        <option value="lecturer">Lecturer</option>
                                        <option value="staff">Administrative Staff</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.department}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div>
                                    {/* Button */}
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit">
                                            Add users
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
                    message={success ? 'Studdent successfully added' : ' Failed to Add student,Check again'}
                    showToast={showToast}
                    toggleToast={toggleToast}
                />
            </div>
        </div>
    );
};

AddLecturers.Layout = AuthLayout;

export default AddLecturers;
