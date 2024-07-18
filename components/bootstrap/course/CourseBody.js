import Link from 'next/link';
import { Col, Row, Image } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useEffect, useState } from "react";

const CourseBody = ({ data, handleViewCourse, handleDeleteCourse }) => {
    const { courseName, courseCode, creditValue, _id } = data;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const auth = localStorage.getItem('credentials');
      const userRole = JSON.parse(auth).role
      if (userRole ==='admin') {
        setIsAuthenticated(true);
      }
    }, []);

    return (
        <div className='mx-4'>
            <div className="container">
                <div className="row mb-3">
                      <div className="col-4 d-flex justify-content-start align-items-center">
                      {courseName}
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        {courseCode}
                    </div>
                    <div className="col-2 d-flex justify-content-end align-items-center">
                        {creditValue}
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <div className="align-middle text-dark">
                            <button
                                onClick={handleViewCourse}
                                type="button"
                                className='border bg-primary rounded px-2'
                            >
                                <Icon.Eye className="text-white" />
                            </button>
                            {isAuthenticated && (
                                <>
                                <Link
                            href={{
                                pathname: '/forms/EditCourse',
                                query:{
                                  id: _id 
                                }
                            }}
                            >
                            <button
                                type="button"
                                variant="outline-primary"
                                className='border bg-primary rounded px-2'
                            >
                                <Icon.PencilFill className="text-white" />
                            </button>
                            </Link>
                            <button
                            onClick={handleDeleteCourse}
                                type="button"
                                variant="outline-primary"
                                className='border bg-danger rounded px-2'
                            >
                                <Icon.Trash className="text-white" />
                            </button>
                                </>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseBody;
