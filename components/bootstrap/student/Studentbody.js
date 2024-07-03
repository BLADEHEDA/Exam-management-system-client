import Link from 'next/link';
import { Col, Row,Image } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useEffect, useState } from "react";

const Student = ({ data , handleViewStudent,handleDeleteStudent}) => {
    const { firstName, lastName, email, phone_number, image, matricule, _id} = data
    const name = `${firstName} ${lastName}`;

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const auth = localStorage.getItem('credentials');
      const userRole = JSON.parse(auth).role
      if (userRole ==='admin') {
        setIsAuthenticated(true);
      }
    }, []);

    return (
        <div className='mx-6' >
            <div className="container">
                <div className="row">
                    <div className="col-3 d-flex justify-content-start">
                        <div className="d-flex align-items-center w-100">
                            <div>
                                <div>
                                    <div className={`icon-shape icon-md p-4 rounded-1 bg-white`}>
                                    <Image 
                                            style={{
                                                width: '40px', 
                                                height: '40px', 
                                                objectFit: 'cover', 
                                                borderRadius: '50%'
                                            }} 
                                            src={image} 
                                            alt="" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ms-3 lh-1">
                                <h5 className="mb-1 text-truncate">
                                    <Link href="#" className="text-inherit">{name}</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 d-flex justify-content-center align-items-center">
                        {matricule}
                    </div>
                    <div className="col-3 d-flex justify-content-end  align-items-center">
                        {phone_number}
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                        <div className="align-middle text-dark">
                            <button
                            onClick={handleViewStudent}
                                type="button"
                                variant="outline-primary"
                                className='border bg-primary rounded px-2'
                            >
                                <Icon.Eye className="text-white" />
                            </button>
                            {isAuthenticated && (
                                <>
                                <Link
                            href={{
                                pathname:'/forms/EditStudent',
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
                            onClick={handleDeleteStudent}
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
    )
}

export default Student
