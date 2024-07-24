import { useState,useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import * as Icon from 'react-bootstrap-icons';
import { useRouter } from "next/router";
import Toaster from "components/bootstrap/toast/Toaster";
import axios from "axios";
import AuthLayout from "layouts/AuthLayout";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  
  const toggleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit:async (values) => {
      toggleToast()
      const loginFormValues = {
        email: values.email,
        password: values.password,
      };
      try{
        const response = await axios.post('http://localhost:5000/login', loginFormValues);
        const { email,role } = response.data.user;
        const userData ={email,role};
        localStorage.setItem('credentials',JSON.stringify(userData));
        setIsAuthenticated(true)
         router.push('/layouts/home');
        window.location.reload();
      }
      catch(error){
        console.error(error)
        setIsAuthenticated(false)
      }
    },
  });

  return (
 
  <div className="position-relative me-0 ">
  <Row className="align-items-center justify-content-center g-0 min-vh-100 my-5">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
          {/* Card */}
          <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-4">
              <p className="mb-6 text-center">Please enter your user information.</p>
            </div>
            {/* Form */}
            <Form onSubmit={formik.handleSubmit}>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email address here"
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
                    style={{ borderColor: '#C4CDD5',
                             borderWidth:'1px',
                             borderStyle:'solid',
                      background: 'transparent' }}
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
             

              {/* Checkbox */}
              <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check 
                  type="checkbox" 
                  id="rememberMe"
                  name="rememberMe"
                  onChange={formik.handleChange}
                  checked={formik.values.rememberMe}
                >
                  <Form.Check.Input 
                    type="checkbox" 
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  />
                  <Form.Check.Label>Remember me</Form.Check.Label>
                </Form.Check>
              </div>
              <div>
                {/* Button */} 
                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                    Sign In
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-up" className="fs-5">
                      Create An Account{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/authentication/forget-password"
                      className="text-inherit fs-5"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
 
      </Col>
  </Row>
  <div class="position-absolute bottom-0 start-0 ms-0 mb-3">
  <Toaster
        message={isAuthenticated?'Login successfully': 'Login Failed, Check Credentials again'}
        showToast={showToast}
        toggleToast={toggleToast}
        />
  </div>
</div>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
