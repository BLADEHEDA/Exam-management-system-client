import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import Link from "next/link";
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Head from "components/bootstrap/student/Head";
import LecturerBody from "components/bootstrap/lecturer/LecturerBody";
import axios from "axios";
import { useEffect, useState } from "react";
import LecturerModal from "components/bootstrap/modal/LecturerModal";
import ConfirmModal from "components/bootstrap/modal/ConfirmModal";

const LayoutVertical = () => {
  const router = useRouter();
  const [lecturers, setLecturers] = useState([]); 

  const [students, setStudents] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState()
  const [courseDetails, setCourseDetails] = useState([]);
  const [ShowModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const addLecturers = () => {
    router.push('/forms/addLecturers');
  }

  // Fetch all the lecturers
  const handleFetchRequest = () => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setLecturers(response.data); 
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

  useEffect(() => {
    handleFetchRequest();
  }, []);

    const handleViewLecturer = async (id) => {
      const chosenStudent = lecturers.find((lecturer) => lecturer._id == id);
      setSelectedStudent(chosenStudent);
      
      try {
        if (chosenStudent && chosenStudent.courses && chosenStudent.courses.length > 0) {
          const coursesTaught = await Promise.all(
            chosenStudent.courses.map(courseId => axios.get(`http://localhost:5000/courses/${courseId}`))
          );
          const courseData = coursesTaught.map(course => course.data);
          console.log(courseData);
          setCourseDetails(courseData);
          setModalShow(true);
        } else {
          // Handle case where no courses are found
          setCourseDetails([]);
          setModalShow(true);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Handle error condition here, such as setting an error state or showing a message
      }
    };
    
  
    // deletet he student
    const handleDeleteLecturer = (id) => {
      setStudentToDelete(id)
      setShowModal(true)
    }
    // confirm delete 
    const handleDeleteConfirm= async()=>{
      try {
        const deletedStudents = axios.delete(`http://localhost:5000/students/${studentToDelete}`)
        setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentToDelete));
        setStudentToDelete(null)
      }
      catch (error) {
        console.error("Error fetching courses:", error);
      }
      setShowModal(false)
    }
  
console.log('====================================');
console.log(courseDetails);
console.log('====================================');
  return (
    <>
      <LayoutHeader
        header='Lecturers'
        buttonText='Lecturer'
        onClick={addLecturers}
      />
      <Head
        name='Lecturer'
        number='phone Number'
        value=' email'
      />
      {lecturers.length > 0 ? (
        lecturers.map((lecturer, id) => (
          lecturer.role === 'lecturer' && 
          <LecturerBody
            key={id}
            id={lecturer._id}
            data={lecturer}
            handleViewStudent={() => { handleViewLecturer(lecturer._id) }} 
            handleDeleteStudent={() => handleDeleteLecturer(lecturer._id)} 
          />
        ))
      ) : (
        <h4 className="p-7">No lecturer is available</h4> 
      )}
<LecturerModal
     show={modalShow}
     onHide={() => setModalShow(false)}
     data={selectedStudent}
     courseData={courseDetails}
/>
{ShowModal &&
      <ConfirmModal
      value='Student'
      onClose={()=> setShowModal(false)}
      OnConfirm={()=> handleDeleteConfirm()}
      />
    }

    </>
  );
};

export default LayoutVertical;
