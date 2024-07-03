import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import EnrollmentBody from "components/bootstrap/enrollment/EnrollmentBody";
import ConfirmModal from "components/bootstrap/modal/ConfirmModal";
import HeadExams from "components/bootstrap/student/HeadExams";
import ExaminationModal from "components/bootstrap/examination/ExaminationModal";

const LayoutVertical = () => {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState([]);
  const [specificEnrollments, setspecificEnrollments] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const addExaminations = () => {
    router.push('/forms/addExamination');
  }

  // Get all the enrollments
  const handleFetchExaminations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/examinations");
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
    handleFetchExaminations();
  }, []);

  const handleViewExaminations = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/examinations/${id}`);
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
        header='Examinations'
        buttonText='Examination'
        onClick={addExaminations}
      />
      <HeadExams
          name='Student'
          number='CA '
          value='Course'
      />

      <div className="mt-2">
        {enrollments && enrollments.length > 0 ? (
          enrollments.map((enrollment, id) => (
            <EnrollmentBody
              key={id}
              data={enrollment}
              handleViewEnrollment={() => handleViewExaminations(enrollment._id)}
            />
          ))
        ) : (
          <h4 className="p-7">No Enrolments are available</h4>
        )}
      </div>
    {/* Modal for displaying detailed information */}
    <ExaminationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={enrollments.length > 0 ? specificEnrollments : null}
      /> 
    </>
  );
};

export default LayoutVertical;
