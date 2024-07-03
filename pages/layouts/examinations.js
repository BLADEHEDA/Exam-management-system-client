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
  const [semester,setSemester] = useState('first_semester');

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

  const handleOptions = (e)=>{
    const selctedOption = e.target.value;
    if(selctedOption ==='1'){
      setSemester('first_semester')
    }
    else if(selctedOption ==='2') {
      setSemester('second_semester')
    }
    else{
      setSemester('resit_semester')
    }
    
  }
  return (
    <>
      <LayoutHeader
        header='Examinations'
        buttonText='Examination'
        onClick={addExaminations}
      />
      <div>
        {/* <h3 className="ms-6 my-2" >First Semester </h3> */}
        {/* select */}
        <select onChange={handleOptions} class="form-select mb-3 w-30 ms-6" aria-label="Default select example">
          <option selected>Select Semester</option>
          <option value="1" >First Semester</option>
          <option value="2">Second Semester</option>
          <option value="3">Resit Semester</option>
        </select>
        {/* end of select */}
        <HeadExams
          name='Student'
          number='CA '
          value='Course'
        />
        {/* <div className="mt-2">
          {enrollments && enrollments.length > 0 ? (
            enrollments.map((enrollment, id) => (
              enrollment.semester === semester && (
                enrollment.length < 0 ? (
                  <EnrollmentBody
                  key={id}
                  data={enrollment}
                  handleViewEnrollment={() => handleViewExaminations(enrollment._id)}
                />
                ):(
                  <h4 className="p-7">No No Results for this Semester</h4>
                )
              )
          
            ))
          ) : (
            <h4 className="p-7">No Results are available</h4>
          )}
        </div> */}

<div className="mt-2">
          {enrollments.length > 0 ? (
            enrollments.map((enrollment, id) => (
              enrollment.semester === semester ? (
                <EnrollmentBody
                  key={id}
                  data={enrollment}
                  handleViewEnrollment={() => handleViewExaminations(enrollment._id)}
                />
              ) : null
            ))
          ) : (
            <h4 className="p-7">No Results are available</h4>
          )}
          {enrollments.length > 0 && enrollments.filter(enrollment => enrollment.semester === semester).length === 0 && (
            <h4 className="p-7">No Results for this Semester</h4>
          )}
        </div>
        
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
