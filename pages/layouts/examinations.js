import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import EnrollmentBody from "components/bootstrap/enrollment/EnrollmentBody";
import HeadExams from "components/bootstrap/student/HeadExams";
import ExaminationModal from "components/bootstrap/examination/ExaminationModal";

const LayoutVertical = () => {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState([]);
  const [specificEnrollment, setSpecificEnrollment] = useState(null); 
  const [modalShow, setModalShow] = useState(false);
  const [semester, setSemester] = useState('first_semester');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const addExaminations = () => {
    router.push('/forms/addExamination');
  }
  // Fetch all enrollments
  const fetchEnrollments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/examinations");
      setEnrollments(response.data);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching enrollments:", error.message);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Handle view specific enrollment details
  const handleViewEnrollment = (id) => {
    const selectedEnrollment = enrollments.find(enrollment => enrollment._id === id);
    setSpecificEnrollment(selectedEnrollment);
    setModalShow(true);
  };

  // Filter enrollments based on selected semester and status
  const filterEnrollments = () => {
    let filteredEnrollments = enrollments.filter(enrollment => {
      const semesterCondition = semester === '' || enrollment.semester === semester;
      const statusCondition = status === '' || (status === '1' && enrollment.caMark + enrollment.examMark < 50) || (status === '2' && enrollment.caMark + enrollment.examMark >= 50);
      return semesterCondition && statusCondition;
    });
    return filteredEnrollments;
  };

  // Handle semester selection
  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  // Handle status selection
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <LayoutHeader
        header='Examinations'
        buttonText='Examination'
        onClick={addExaminations}
      />
      <div>
        <div className="d-flex w-50">
          <div>
            <select value={semester} onChange={handleSemesterChange} className="form-select mb-3 w-100 ms-6" aria-label="Select Semester">
              <option value="first_semester">First Semester</option>
              <option value="second_semester">Second Semester</option>
              <option value="resit_semester">Resit Semester</option>
            </select>
          </div>
          <div>
            <select value={status} onChange={handleStatusChange} className="form-select mb-3 w-100 ms-7" aria-label="Select Status">
              <option value="">All Statuses</option>
              <option value="1">Failed</option>
              <option value="2">Passed</option>
            </select>
          </div>
        </div>

        <HeadExams
          name='Student'
          number='CA '
          value='Course'
        />

        <div className="mt-2">
          {loading ? ( 
            <h4 className="p-7">Loading...</h4>
          ) : filterEnrollments().length > 0 ? (
            filterEnrollments().map((enrollment, id) => (
              <EnrollmentBody
                key={id}
                data={enrollment}
                handleViewEnrollment={() => handleViewEnrollment(enrollment._id)}
              />
            ))
          ) : (
            <h4 className="p-7">No Results</h4>
          )}
        </div>
      </div>

      {/* Modal for displaying detailed information */}
      <ExaminationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={specificEnrollment}
      />
    </>
  );
};

export default LayoutVertical;

