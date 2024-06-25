import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "components/bootstrap/student/Head";
import axios from "axios";
import EnrollmentBody from "components/bootstrap/enrollment/EnrollmentBody";
import EnrollmentModal from "components/bootstrap/enrollment/EnrollmentModal";
import ConfirmModal from "components/bootstrap/modal/ConfirmModal";

const LayoutVertical = () => {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState([]);
  const [specificEnrollments, setspecificEnrollments] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const addEnrollments = () => {
    router.push('/forms/addEnrollment');
  }

  // Get all the enrollments
  const handleFetchEnrollments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/enrollments");
      setEnrollments(response.data);
    } catch (error) {
      if (error.response) {
        console.error(`HTTP error: ${error.response.status}`);
      } else if (error.request) {
        console.error("Request error: No response received");
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  useEffect(() => {
    handleFetchEnrollments();
  }, []);

  const handleViewEnrollment = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/enrollments/${id}`);
      setspecificEnrollments(response.data);
    } catch (error) {
      if (error.response) {
        console.error(`HTTP error: ${error.response.status}`);
      } else if (error.request) {
        console.error("Request error: No response received");
      } else {
        console.error("Error:", error.message);
      }
    }
    setModalShow(true);
  };

  return (
    <>
      <LayoutHeader
        header='Enrollments'
        buttonText='Enrollment'
        onClick={addEnrollments}
      />
      <Head
        name='Student'
        number='Attendance Count'
        value='Course'
      />

      <div className="mt-2">
        {enrollments && enrollments.length > 0 ? (
          enrollments.map((enrollment, id) => (
            <EnrollmentBody
              key={id}
              data={enrollment}
              handleViewEnrollment={() => handleViewEnrollment(enrollment._id)}
            />
          ))
        ) : (
          <h4 className="p-7">No courses are available</h4>
        )}
      </div>
    {/* Modal for displaying detailed information */}
    <EnrollmentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={enrollments.length > 0 ? specificEnrollments : null}
      />
    </>
  );
};

export default LayoutVertical;
