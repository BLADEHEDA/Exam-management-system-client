import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import AuthLayout from "layouts/AuthLayout";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import Toaster from "components/bootstrap/toast/Toaster";
import * as Icon from 'react-bootstrap-icons';

const EditLecturer = () => {
    const [showToast, setShowToast] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userData, setUserData] = useState(null);

    const router = useRouter();
    const { id: userId } = router.query; // Extract id from router query

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`http://localhost:5000/users/${userId}`);
                    const data = response.data;
                    setUserData(data);
                    // Set formik initial values
                    formik.setValues({
                        firstname: data.firstName || "",
                        lastname: data.lastName || "",
                        email: data.email || "",
                        phoneNumber: data.phone_number || "",
                        role: data.role || "",
                        password: "", 
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [userId]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            phoneNumber: "",
            role: "",
            password: "",
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required("First Name is required"),
            lastname: Yup.string().required("Last Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            phoneNumber: Yup.string().required("Phone Number is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters"),
            role: Yup.string().required("Role is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.put(`http://localhost:5000/users/${userId}`, values);
                router.push('/layouts/lecturers');
                setSuccess(true);
            } catch (error) {
                console.error("Error updating user:", error);
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
                                        placeholder="Enter email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        isInvalid={formik.touched.email && formik.errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Phone number */}
                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phoneNumber}
                                        isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.phoneNumber}
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
                                {/* Role */}
                                <Form.Group className="mb-3" controlId="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        name="role"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.role}
                                        isInvalid={formik.touched.role && formik.errors.role}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="lecturer">Lecturer</option>
                                        <option value="staff">Administrative Staff</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.role}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <Button variant="primary" type="submit">
                                        Update User
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Toast Notification */}
            <div className="position-absolute bottom-0 start-0 ms-0 mb-3">
                <Toaster
                    message={success ? 'User successfully updated' : 'Failed to update user'}
                    showToast={showToast}
                    toggleToast={setShowToast}
                />
            </div>
        </div>
    );
};

EditLecturer.Layout = AuthLayout;

export default EditLecturer;
